import { pool } from '../config/database.js'

export const savedRecipe = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    if(!userId){
        return res.status(401).json({ error : 'Unauthorized: User ID not found'})
    }

    try {
        const result = await pool.query(
            `INSERT INTO recipes (user_id, title, content, created_at)
            VALUES ($1, $2, $3, NOW()) RETURNING id`,
            [userId, title, content]
        );

        res.status(201).json({ message : 'Recipe saved', recipeId: result.rows[0].id });
       } catch (error){
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to save recipe'});
       }
}

//end post ----------------------------------------------------------------------------------



export const getSavedRecipes = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: User ID not found' });
    }
    try {
        const result = await pool.query(
            `SELECT r.id, r.title, r.content, r.created_at, saved_images.image_url as "imageUrl" 
            FROM recipes r
            LEFT JOIN saved_images ON r.id = saved_images.recipe_id
            WHERE r.user_id = $1
            ORDER BY r.created_at DESC`,
            [userId]
        );
        res.status(200).json({ recipes: result.rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to fetch saved recipes' });
    }
};

//end get ----------------------------------------------------------------------------------

export const deleteSavedRecipe = async (req,res) => {
    const userId = req.user.id;
    const recipeId = req.params.id;
    
    
    if(!userId) {
        return res.status(401).json({ error : "Unauthorized"});
    }

    try {
        const deleteResult = await pool.query(
            `DELETE FROM saved_images WHERE recipe_id = $1`,
            [recipeId]
        )
        const result = await pool.query(
            'DELETE FROM recipes WHERE id = $1 AND user_id = $2 RETURNING id',
            [recipeId, userId]
        );

        if(!result.rowCount) {
            return res.status(404).json({ error: "Recipe not found"});
        }
        if(!deleteResult.rowCount) {
            return res.status(404).json({error: 'No image found'})
        }
        
        res.status(200).json({ 
            message: 'Recipe deleted successfully',
            deletedRecipeId: recipeId
        });
    }
    catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ error: error.message || 'Failed to delete recipe'})
    };
}
//end delete ----------------------------------------------------------------------------------