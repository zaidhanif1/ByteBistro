import React from 'react'
import './Main.css'
import ByteBistro from '../ByteBistro/ByteBistro'
import IngredientsList from '../IngredientsList/IngredientsList'
import { getRecipeFromGemini} from '../../ai'

export default function Main()
{
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("");
 


    

async function getRecipe(e)
{
   
    if (!ingredients.length) return;
    const generatedRecipe = await getRecipeFromGemini(ingredients);
    setRecipe(generatedRecipe);
     e.preventDefault()
    const recipeContainer = document.getElementById('suggested-recipe-container')
    recipeContainer.scrollIntoView({behavior: 'smooth'})

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
        <>
        <main>
            <div className='direction-text'>
            <h1 className='question-header'>What's in your kitchen?</h1>
            <h3 className='add-ingredients-h3'>Add ingredients below!</h3>
            </div>
            <form onSubmit = {addIngredient} className="add-ingredient-form">

                <input 
                className='ingredient-input'
                type="text"
                placeholder="e.g. chicken, rice, tomatoes" 
                aria-label="Add ingredient" 
                name='ingredient'
                />
                <button className='add-ingredients-btn'>Add</button>
                 
            </form>
            

        </main>
        <div>
        {ingredients.length > 0 && 
            <IngredientsList 
            ingredients = {ingredients}
            getRecipe = {getRecipe}

            />}
        </div>
            <ByteBistro 
            recipe = {recipe}
            />
        </>
    )
}