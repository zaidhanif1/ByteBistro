import React from 'react'
import './Main.css'
import ByteBistro from '../ByteBistro/ByteBistro'
import IngredientsList from '../IngredientsList/IngredientsList'
import { getRecipeFromGemini} from '../../ai'

export default function Main()
{
    const [ingredients, setIngredients] = React.useState([])
    const [recipe, setRecipe] = React.useState("");
    const [loading, setLoading] = React.useState(false);
 


    

async function getRecipe(e)
{
    setLoading(true);
    if (!ingredients.length) return;
    const generatedRecipe = await getRecipeFromGemini(ingredients);
    setRecipe(generatedRecipe);
    setLoading(false);
}

React.useEffect(() => {
    if (recipe)
    {
        const recipeContainer = document.getElementById('suggested-recipe-container')
        recipeContainer.scrollIntoView({behavior: 'smooth'})
    }

}, [recipe])


    function addIngredient(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const newIngredient = formData.get("ingredient")?.trim();
        if (newIngredient){
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
        e.target.reset();
    }

    const deleteIngredient = (indexToDelete) => {
        setIngredients(ingredients.filter((_, i) => i !== indexToDelete))
    }

    const deleteAllIngredients = () => {
        setIngredients([])
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
            <IngredientsList 
            loading = {loading}
            ingredients = {ingredients}
            getRecipe = {getRecipe}
            setIngredients = {setIngredients}
            deleteIngredient = {deleteIngredient}
            deleteAllIngredients = {deleteAllIngredients}
            />
        </div>
            <ByteBistro     
            ingredients = {ingredients}
            recipe = {recipe}
            />
        </>
    )
}