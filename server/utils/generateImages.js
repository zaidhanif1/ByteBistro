import { pool } from '../config/database.js';
import axios from 'axios';
import dotenv from 'dotenv'
import path from 'path';
import fs from 'fs/promises';

dotenv.config();

export const generateAndSaveImage = async (req, res) => {
    try {

        const { recipe_id } = req.body;
        if(!recipe_id) {
            console.log('ERROR: No recipe_id provided');
            return res.status(400).json({error : "Recipe ID required"});
        }

        const existing = await pool.query(
            'SELECT image_url FROM saved_images WHERE recipe_id = $1',
            [recipe_id]
        );
        
        if (existing.rows.length > 0) {
            return res.json({ imageUrl: existing.rows[0].image_url});
        }
        const recipeQuery = await pool.query(
            'SELECT title FROM recipes WHERE id = $1',
            [recipe_id]
        );
        
        if (!recipeQuery.rows.length) {
            console.log('ERROR: Recipe not found for ID:', recipe_id);
            return res.status(404).json({error: "Recipe not found"});
        }
        
        let title = recipeQuery.rows[0].title;
        title = title.replace(/^ByteBistro[']s\s+/i, '');


        const cartoonPrompt = `Cartoon-style food illustration of "${title}".`
        console.log(cartoonPrompt)
        

        const hfResponse = await axios.post(
            'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-3-medium-diffusers',
            {
                inputs: cartoonPrompt
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HF_API_KEY}`,
                    'Content-Type': 'application/json',
                    'Accept': 'image/png'
                },
                responseType: 'arraybuffer',
                timeout: 30000 
            }
        );

        const imageBuffer = Buffer.from(hfResponse.data);
        const filename = `recipe_${recipe_id}_${Date.now()}.png`;
        
        // Option A: Save to file system (current approach)
        const imageDir = path.join(process.cwd(), 'public', 'generated-images');
        try {
            await fs.mkdir(imageDir, { recursive: true });
        } catch (dirError) {
            console.error('Directory creation error:', dirError);
        }
        
        const filePath = path.join(imageDir, filename);
        await fs.writeFile(filePath, imageBuffer);
        console.log('File written to:', filePath);
        
        // Check if file actually exists
        try {
            await fs.access(filePath);
            console.log('File exists and is accessible');
        } catch (accessError) {
            console.error('File access error:', accessError);
        }
        
        const imageUrl = `/generated-images/${filename}`;
        console.log('Image URL:', imageUrl);

        await pool.query(
            `INSERT INTO saved_images (recipe_id, image_url) VALUES ($1, $2)`,
            [recipe_id, imageUrl]
        );

        res.json({ imageUrl });

//error catching -------------------------------------------------------------------------------------

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

//end post ----------------------------------------------------------------------------------------------

export const deleteRecipeImages = async (req, res) => {
    try {
        const { recipe_id } = req.params;
        
        if (!recipe_id) {
            return res.status(400).json({ error: "Recipe ID required" });
        }

        // Get image URLs before deleting
        const imageRows = await pool.query(
            'SELECT image_url FROM saved_images WHERE recipe_id = $1',
            [recipe_id]
        );
        
        // Delete physical image files from file system
        for (const row of imageRows.rows) {
            try {
                const filename = row.image_url.split('/').pop();
                const filepath = path.join(process.cwd(), 'public', 'generated-images', filename);
                await fs.unlink(filepath); // Delete the file
            } catch (fileError) {
                console.warn('Could not delete image file:', row.image_url, fileError.message);
            }
        }
        
        // Delete image records from database
        const deleteResult = await pool.query(
            'DELETE FROM saved_images WHERE recipe_id = $1',
            [recipe_id]
        );

        res.json({ 
            message: 'Images deleted successfully',
            deletedCount: deleteResult.rowCount,
            recipeId: recipe_id
        });
    } catch (error) {
        console.error('Error deleting images:', error);
        res.status(500).json({ error: 'Failed to delete images', details: error.message });
    }
};

//end delete ----------------------------------------------------------------------------------------------