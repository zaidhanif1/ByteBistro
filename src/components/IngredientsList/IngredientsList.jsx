import './IngredientsList.css'
export default function IngredientsList(props)

{
        const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return(
        
            <section>
                    <div>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                    </div>
                    {props.ingredients.length > 3  &&
                    <div className='generate-recipe-main'>
                        <div className='generate-recipe-text'>
                            <h3>Ready for a recipe?</h3>
                            <p>Generate a recipe from you list of ingredients.</p>
                        </div>

                            <button className='get-a-recipe-button' onClick={props.getRecipe}>Get a recipe!</button>
                            
                    </div>
}

                </section>

    )
}