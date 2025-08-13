import { pool } from '../config/database.js';
import axios from 'axios';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY
);

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
            return res.json({ imageUrl: existing.rows[0].image_url });
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
        const objectPath = `recipes/${recipe_id}/${filename}`;
        
        const { error: upErr } = await supabase
        .storage
        .from('generated-images')
        .upload(objectPath, imageBuffer, {
          contentType: 'image/png'
        });

        if (upErr) throw upErr;
        
        const { data: pub } = supabase
        .storage
        .from('generated-images')
        .getPublicUrl(objectPath);

        const imageUrl = pub.publicUrl;


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
