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


    function addIngredient(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredient")?.trim();
        if (newIngredient){
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        e.target.reset();
    }

    return(
        <main>
            <form onSubmit = {addIngredient} className="add-ingredient-form">

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