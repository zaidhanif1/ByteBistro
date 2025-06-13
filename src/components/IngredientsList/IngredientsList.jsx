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
    milk: "🥛",
    onion: "🧅",
    pepper: "🌶️",
    cheese: "🧀",
    yogurt: "🥛",
    spices: "🌶️",
    lettuce: "🥬",
    spinach: "🥬",
    broccoli: "🥦",
    carrot: "🥕",
    corn: "🌽",
    potato: "🥔",
    cucumber: "🥒",
    mushroom: "🍄",
    garlic: "🧄",
    shrimp: "🦐",
    turkey: "🦃",
    sausage: "🌭",
    egg: "🥚",
    tofu: "🍱",
    apple: "🍎",
    banana: "🍌",
    lemon: "🍋",
    orange: "🍊",
    avocado: "🥑",
    bread: "🍞",
    flour: "🌾",
    cereal: "🥣",
    icecream: "🍨",
    soup: "🍲",
    stew: "🥘",
    salad: "🥗",
    sandwich: "🥪",
    pizza: "🍕",
    taco: "🌮",
    steak: "🥩",
    default: "🥘",
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
    return <div className = 'specific-ingredient' key={i}>
        <li  className='list-element'>
             {getIcon(ingredient)} {ingredient} <button className = "delete-ingredient-btn" onClick={()=> props.deleteIngredient(i)}>x</button>
        
        </li>
        </div>
    })

    return(
        
            <section className='ingredientslist-section'>
                <div className='ingredients-on-hand-container'>
                    <h1 className='ingredients-on-hand-h1'>Ingredients on hand:</h1>
                    <ol className="ingredients-list" aria-live="polite">{listItems}</ol>

                    {props.ingredients.length > 2  &&
                    <div className='generate-recipe-main'>
                        <button className='get-a-recipe-button' onClick={props.getRecipe}>Get a recipe!</button>    
                        {props.loading && <span className='loader'></span>}
                    </div>
                    }

                </div>
                    
                    
                    </section>

                
      
    )
}