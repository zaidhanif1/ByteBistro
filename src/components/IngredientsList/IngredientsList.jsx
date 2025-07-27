import './IngredientsList.css'
import ByteClipboard from '../../assets/byte-clipboard.png'
export default function IngredientsList(props)

{
    const ingredientIcons = {
        // Meats & Proteins
        chicken: "🍗",
        beef: "🥩",
        pork: "🥓",
        turkey: "🦃",
        lamb: "🥩",
        veal: "🥩",
        venison: "🦌",
        duck: "🦆",
        goose: "🦆",
        bison: "🐂",
        rabbit: "🐇",
        liver: "🥩",
        kidney: "🥩",
        tripe: "🥩",
        sausage: "🌭",
        bacon: "🥓",
        ham: "🍖",
        salami: "🥓",
        prosciutto: "🥓",
        pepperoni: "🍕",
        hot_dog: "🌭",
        ground_beef: "🥩",
        ground_turkey: "🥩",
        meatballs: "🥩",
      
        // Seafood
        fish: "🐟",
        salmon: "🐟",
        tuna: "🐟",
        cod: "🐟",
        halibut: "🐟",
        tilapia: "🐟",
        mackerel: "🐟",
        sardine: "🐟",
        anchovy: "🐟",
        trout: "🐟",
        shrimp: "🦐",
        prawn: "🦐",
        crab: "🦀",
        lobster: "🦞",
        mussels: "🦪",
        clams: "🦪",
        oysters: "🦪",
        scallops: "🦪",
        octopus: "🐙",
        squid: "🦑",
        roe: "🟠",
      
        // Eggs & Dairy
        egg: "🥚",
        egg_white: "🥚",
        egg_yolk: "🥚",
        milk: "🥛",
        cream: "🥛",
        heavy_cream: "🥛",
        sour_cream: "🥛",
        yogurt: "🥛",
        butter: "🧈",
        cheese: "🧀",
        mozzarella: "🧀",
        cheddar: "🧀",
        parmesan: "🧀",
        blue_cheese: "🧀",
        cream_cheese: "🧀",
        goat_cheese: "🧀",
        feta: "🧀",
        ghee: "🧈",
        condensed_milk: "🥛",
        evaporated_milk: "🥛",
      
        // Grains & Breads
        rice: "🍚",
        brown_rice: "🍚",
        white_rice: "🍚",
        wild_rice: "🍚",
        quinoa: "🌾",
        barley: "🌾",
        couscous: "🌾",
        farro: "🌾",
        bulgur: "🌾",
        oats: "🥣",
        oatmeal: "🥣",
        flour: "🌾",
        cornmeal: "🌽",
        polenta: "🌽",
        tortilla: "🌮",
        pita: "🍞",
        naan: "🍞",
        bread: "🍞",
        baguette: "🥖",
        ciabatta: "🍞",
        brioche: "🍞",
        sourdough: "🍞",
        rye_bread: "🍞",
        crackers: "🥨",
        pasta: "🍝",
        spaghetti: "🍝",
        penne: "🍝",
        macaroni: "🍝",
        lasagna: "🍝",
        noodles: "🍜",
        ramen: "🍜",
        udon: "🍜",
        soba: "🍜",
      
        // Vegetables
        lettuce: "🥬",
        romaine: "🥬",
        kale: "🥬",
        spinach: "🥬",
        arugula: "🥬",
        cabbage: "🥬",
        red_cabbage: "🥬",
        bok_choy: "🥬",
        chard: "🥬",
        collard_greens: "🥬",
        broccoli: "🥦",
        cauliflower: "🥦",
        brussels_sprouts: "🥬",
        green_beans: "🟢",
        peas: "🟢",
        asparagus: "🌿",
        zucchini: "🥒",
        squash: "🎃",
        pumpkin: "🎃",
        cucumber: "🥒",
        tomato: "🍅",
        cherry_tomato: "🍅",
        onion: "🧅",
        red_onion: "🧅",
        shallot: "🧅",
        leek: "🧅",
        garlic: "🧄",
        bell_pepper: "🫑",
        chili_pepper: "🌶️",
        jalapeno: "🌶️",
        habanero: "🌶️",
        potato: "🥔",
        sweet_potato: "🍠",
        yam: "🍠",
        corn: "🌽",
        carrot: "🥕",
        radish: "🔴",
        beet: "🟣",
        mushroom: "🍄",
        portobello: "🍄",
        enoki: "🍄",
      
        // Fruits
        apple: "🍎",
        pear: "🍐",
        banana: "🍌",
        orange: "🍊",
        lemon: "🍋",
        lime: "🍋",
        grapefruit: "🍊",
        strawberry : "🍓",
        strawberries : "🍓",
        blueberry: "🫐",
        raspberry: "🫐",
        blackberry: "🫐",
        cherry: "🍒",
        grape: "🍇",
        watermelon: "🍉",
        cantaloupe: "🍈",
        honeydew: "🍈",
        mango: "🥭",
        pineapple: "🍍",
        peach: "🍑",
        plum: "🟣",
        kiwi: "🥝",
        fig: "🟤",
        date: "🟤",
        coconut: "🥥",
        avocado: "🥑",
        pomegranate: "🔴",
      
        // Nuts, Seeds & Legumes
        almond: "🥜",
        peanut: "🥜",
        walnut: "🥜",
        pecan: "🥜",
        cashew: "🥜",
        pistachio: "🥜",
        sunflower_seed: "🌻",
        pumpkin_seed: "🎃",
        chia_seed: "⚫",
        flaxseed: "🟤",
        sesame_seed: "⚪",
        hemp_seed: "⚫",
        bean: "🫘",
        black_bean: "🫘",
        pinto_bean: "🫘",
        kidney_bean: "🫘",
        navy_bean: "🫘",
        lentil: "🫘",
        chickpea: "🫘",
        edamame: "🟢",
      
        // Herbs & Spices
        salt: "🧂",
        black_pepper: "🧂",
        paprika: "🌶️",
        cumin: "🌿",
        turmeric: "🌿",
        chili_powder: "🌶️",
        cinnamon: "🌿",
        nutmeg: "🌰",
        clove: "🌿",
        allspice: "🌿",
        ginger: "🌿",
        basil: "🌿",
        oregano: "🌿",
        thyme: "🌿",
        rosemary: "🌿",
        sage: "🌿",
        dill: "🌿",
        parsley: "🌿",
        cilantro: "🌿",
        mint: "🌿",
        curry_powder: "🍛",
        bay_leaf: "🌿",
      
        // Condiments, Sauces & Oils
        ketchup: "🍅",
        mustard: "🌭",
        mayo: "🥪",
        soy_sauce: "🧂",
        sriracha: "🌶️",
        hot_sauce: "🌶️",
        bbq_sauce: "🥩",
        ranch: "🥗",
        vinaigrette: "🧴",
        hummus: "🥣",
        tahini: "🥣",
        pesto: "🌿",
        tomato_sauce: "🍅",
        gravy: "🥣",
        olive_oil: "🫒",
        vegetable_oil: "🛢️",
        coconut_oil: "🥥",
        
      
        // Sweets, Baked Goods & Misc
        sugar: "🍚",
        honey: "🍯",
        maple_syrup: "🍁",
        jam: "🍓",
        chocolate: "🍫",
        cocoa: "🍫",
        cookie: "🍪",
        cake: "🍰",
        brownie: "🍫",
        donut: "🍩",
        muffin: "🧁",
        croissant: "🥐",
        pie: "🥧",
        pancake: "🥞",
        waffle: "🧇",
        granola: "🥣",
      
        // Drinks
        water: "💧",
        coffee: "☕",
        espresso: "☕",
        tea: "🍵",
        matcha: "🍵",
        juice: "🧃",
        soda: "🥤",
        milkshake: "🥤",
        smoothie: "🧃",
        wine: "🍷",
        beer: "🍺",
        champagne: "🍾",
      
        // Utility
        ice: "🧊",
        broth: "🍲",
        stock: "🍲",
        soup: "🍲",
        stew: "🥘",
      
        // Fallback
        default: "🍴"
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

                
                {props.ingredients.length === 0 ? (<div className='no-ingredients-yet'>
                    <img src={ByteClipboard} alt="Byte Holding Clipboard" className = 'byte-clipboard' />
                    <h1 className='no-ingredients-yet-h1'>No ingredients yet</h1>
                    <p>Add some ingredients to begin!

                    </p>
                </div>) : (
                <div className='ingredients-on-hand-container'>
                    <div className='ingredients-on-hand-header'>
                    <h1 className='ingredients-on-hand-h1'>Ingredients on hand:</h1>
                    <button className='delete-all-ingredients-btn' onClick={props.deleteAllIngredients}>Delete all 🗑️</button>

                    </div>
                    <ol className="ingredients-list" aria-live="polite">{listItems}</ol>
                    {props.ingredients.length > 1  &&
                    <div className='generate-recipe-main'>
                        <button className='get-a-recipe-button' onClick={props.getRecipe}>Get a recipe!</button>    
                        {props.loading && <span className='loader'></span>}
                    </div>
                    }

                </div>
                    )}
                    
                    </section>

                
      
    )
}