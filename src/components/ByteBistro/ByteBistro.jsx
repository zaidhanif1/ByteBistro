import ReactMarkdown from 'react-markdown';
import './ByteBistro.css'

export default function ByteBistro(props) {
return (
props.recipe ? <section className="recipe-output">
    
    <div id="suggested-recipe-container" aria-live="polite">
      <h1 className='byte-bistro-h1'>ByteBistro Recommends:</h1>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </div>
  </section> : null 
  )

}
