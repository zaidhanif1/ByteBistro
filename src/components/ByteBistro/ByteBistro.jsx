import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ByteBistro.css'
import { apiCall } from '../../utils/api.js';

function parseRecipeMarkdown(markdown) {
    
    const lines = markdown.split('\n');
    let title = '';
    let ingredients = [];
    let instructions = '';
    let inIngredients = false;
    let inInstructions = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (i === 0 && line.startsWith('#')) {
            title = line.replace(/^#+\s*/, '');
            continue;
        }
        if (/ingredients[:]?/i.test(line)) {
            inIngredients = true;
            inInstructions = false;
            continue;
        }
        if (/instructions[:]?/i.test(line)) {
            inIngredients = false;
            inInstructions = true;
            continue;
        }
        if (inIngredients && (line.startsWith('-') || line.startsWith('*'))) {
            ingredients.push(line.replace(/^[-*]\s*/, ''));
        } else if (inInstructions) {
            instructions += line + '\n';
        }
    }

    if (!ingredients.length && lines.length > 1) {
        instructions = lines.slice(1).join('\n');
    }
    return {
        title: title || 'Untitled Recipe',
        ingredients,
        instructions: instructions.trim() || markdown.trim(),
    };
}

export default function ByteBistro(props) {
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    async function handleSave() {
        setSaving(true);
        setSaveMsg('');
        try {
            const { title, ingredients } = parseRecipeMarkdown(props.recipe);
            await apiCall('/saved-recipe', {
                method: 'POST',
                body: JSON.stringify({ title, ingredients, content: props.recipe })
            });
            setSaveMsg('Recipe saved!');
        } catch (err) {
            setSaveMsg('Failed to save recipe: ' + (err.message || 'Unknown error'));
        } finally {
            setSaving(false);
        }
    }

    return (
        props.recipe ? <section className="recipe-output">
            <div id="suggested-recipe-container" aria-live="polite">
                <h1 className='byte-bistro-h1'>ByteBistro Recommends:</h1>
                <ReactMarkdown>{props.recipe}</ReactMarkdown>
                <button className="save-recipe-btn" onClick={handleSave} disabled={saving} >
                    {saving ? 'Saving...' : 'Save Recipe'}
                </button>
                {saveMsg && <p style={{marginTop: '0.5rem'}}>{saveMsg}</p>}
            </div>
        </section> : null
    )
}
