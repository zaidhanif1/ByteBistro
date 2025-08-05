import { useState, useEffect} from 'react'
import './Main.css'
import ByteBistro from '../ByteBistro/ByteBistro'
import IngredientsList from '../IngredientsList/IngredientsList'
import { getRecipeFromGemini} from '../../ai'
import byteThinking from '../../assets/bytethinking.png'
export default function Main()
{
    const [ingredients, setIngredients] = useState([])
    const [recipe, setRecipe] = useState("");
    const [loading, setLoading] = useState(false);
 


    

async function getRecipe(e)
{
    setLoading(true);
    if (!ingredients.length) return;
    const generatedRecipe = await getRecipeFromGemini(ingredients);
    setRecipe(generatedRecipe);
    setLoading(false);
}

useEffect(() => {
    if (recipe){
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
            <div className='is-in-kitchen-div'>
            <h1 className='question-header'>What's in your kitchen?</h1>
            <img src={byteThinking} alt="Byte Thinking" className='byte-thinking'/>
            </div>
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