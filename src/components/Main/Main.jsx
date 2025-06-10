import React from 'react'
import './Main.css'
import ByteBistro from '../ByteBistro/ByteBistro'
import IngredientsList from '../IngredientsList/IngredientsList'
import { getRecipeFromGemini} from '../../ai'

export default function Main()
{
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("");


    

async function getRecipe()
{
    if (!ingredients.length) return;
    const generatedRecipe = await getRecipeFromGemini(ingredients);
    setRecipe(generatedRecipe);

}


    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return(
        <main>
            <form action = {addIngredient} className="add-ingredient-form">

                <input
                type="text"
                placeholder="e.g. oregano" 
                aria-label="Add ingredient" 
                name='ingredient'
                />
                <button className='add-ingredients-btn'>Add ingredient</button>
                 
            </form>
            {ingredients.length > 0 && 
                <IngredientsList 
                ingredients = {ingredients}
                getRecipe = {getRecipe}
                />
                    }
                    <ByteBistro 

                    recipe = {recipe}
                    />

        </main>
    )
}