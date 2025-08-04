import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './ByteBistro.css'
import { apiCall } from '../../utils/api.js';

function parseTitle(markdown) {
    const lines = markdown.split('\n');
    const firstLine = lines[0]?.trim();

    if(firstLine?.startsWith('#')){
         return firstLine.substring(firstLine.indexOf(' ') + 1).trim();
    }
    return 'Untitled Recipe'
}

export default function ByteBistro(props) {
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');

    async function handleSave() {
        setSaving(true);
        setSaveMsg('');
        try {
            const title = parseTitle(props.recipe);
            await apiCall('/saved-recipe', {
                method: 'POST',
                body: JSON.stringify({ title, content: props.recipe })
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
                    {saving ? (
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            Saving...
                            <span className='loader' style={{width: '20px', height: '20px', marginLeft: '8px'}}></span>
                        </div>
                    ) : 'Save Recipe'}
                </button>
                {saveMsg && <p style={{marginTop: '2rem', textAlign: 'center'}}>{saveMsg}</p>}
            </div>
        </section> : null
    )
}
