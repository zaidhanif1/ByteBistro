import { pool } from '../config/database.js';
import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config();

export const generateAndSaveImage = async (req, res) => {
    try {
        console.log('=== Starting image generation ===');
        console.log('Request body:', req.body);
        
        const { recipe_id } = req.body;
        if(!recipe_id) {
            console.log('ERROR: No recipe_id provided');
            return res.status(400).json({error : "Recipe ID required"});
        }

        console.log('Checking for existing image for recipe_id:', recipe_id);
        // First, check if we already have an image for this recipe
        const existing = await pool.query(
            'SELECT image_url FROM saved_images WHERE recipe_id = $1',
            [recipe_id]
        );
        if (existing.rows.length > 0) {
            console.log('Found existing image, returning cached URL');
            return res.json({ imageUrl: existing.rows[0].image_url});
        }

        console.log('No existing image found, looking up recipe...');
        // Get the recipe title from the recipes table
        const recipeQuery = await pool.query(
            'SELECT title FROM recipes WHERE id = $1',
            [recipe_id]
        );
        
        if (recipeQuery.rows.length === 0) {
            console.log('ERROR: Recipe not found for ID:', recipe_id);
            return res.status(404).json({error: "Recipe not found"});
        }
        
        const title = recipeQuery.rows[0].title;
        console.log('Found recipe title:', title);

        // Check if HF_API_KEY exists
        if (!process.env.HF_API_KEY) {
            console.log('ERROR: HF_API_KEY not found in environment variables');
            return res.status(500).json({error: "API key not configured"});
        }

        console.log('Calling Hugging Face API...');
        // Generate image using Hugging Face API
        const hfResponse = await axios.post(
            'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers',
            {
                inputs : title
            }, 
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HF_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                responseType: 'arraybuffer',
                timeout: 30000 // 30 second timeout
            }
        );

        console.log('HF API response status:', hfResponse.status);
        console.log('HF API response size:', hfResponse.data.length);

        // Convert to base64
        const imageBuffer = Buffer.from(hfResponse.data);
        const base64Image = imageBuffer.toString('base64');
        const imageUrl = `data:image/png;base64,${base64Image}`;

        console.log('Saving image to database...');
        // Save to database with recipe_id
        await pool.query(
            'INSERT INTO saved_images (recipe_id, image_url) VALUES ($1, $2)',
            [recipe_id, imageUrl]
        );

        console.log('Image generation completed successfully');
        res.json({ imageUrl });
    } catch (error) {
        console.error('=== ERROR in generateAndSaveImage ===');
        console.error('Error type:', error.constructor.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        if (error.response) {
            console.error('API Response status:', error.response.status);
            console.error('API Response data:', error.response.data);
        }
        
        res.status(500).json({ error: 'Failed to generate image', details: error.message });
    }
};