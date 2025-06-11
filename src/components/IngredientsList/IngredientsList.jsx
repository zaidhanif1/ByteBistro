import './IngredientsList.css'
export default function IngredientsList(props)

{
const ingredientIcons = {
  chicken: "🍗",
  beef: "🥩",
  pork: "🥓",
  fish: "🐟",
  rice: "🌾",
  pasta: "🍝",
  tomato: "🍅",
  onion: "🧅",
  pepper: "🌶️",
  cheese: "🧀",
  yogurt: "🥛",
  spices: "🌶️",
  default: "🥘"
};

function getIcon(ingredient)
{
    const toLower = ingredient.toLowerCase()
    for (const key in ingredientIcons)
    {
        if (toLower.includes(key))
        {
            return ingredientIcons[key]
        }
    }
    return ingredientIcons.default
}

const listItems = props.ingredients.map((ingredient, i) => {
    return <li key={i}> {getIcon(ingredient)} {ingredient}</li>
})





    return(
        <>
            <section className='ingredientslist-section'>
                    <div className='ingredients-on-hand-container'>
                    <h1 className='ingredients-on-hand-h1'>Ingredients on hand:</h1>
                    <ol className="ingredients-list" aria-live="polite">{listItems}</ol>
                    </div>
                    </section>
                    {props.ingredients.length > 3  &&
                    <div className='generate-recipe-main'>
                        <div className='generate-recipe-text'>
                            <h3 className='generate-recipe-h3'>Ready for a recipe?</h3>
                            <p className='generate-recipe-p'>Generate a recipe from you list of ingredients.</p>
                        </div>

                            <button className='get-a-recipe-button' onClick={props.getRecipe}>Get a recipe!</button>
                            
                    </div>
}

                
        </>
    )
}