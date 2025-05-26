import ReactMarkdown from 'react-markdown';
import './ByteBistro.css'

export default function ByteBistro(props) {
return (
props.recipe ? <section className="recipe-output">
    <h1 className='byte-bistro-h1'>ByteBistro Recommends:</h1>
    <div className="suggested-recipe-container" aria-live="polite">
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </div>
  </section> : null 
  )

}
