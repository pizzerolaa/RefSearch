import React, { useState, useEffect } from 'react';
import './styles/Results.css';
import { Link } from 'react-router-dom';
import Globe from '../Components/Assets/globe-beish.svg';
import Ref from '../Components/Assets/bookmark.svg';
import Next from '../Components/Assets/arrowNext.svg';

const Results = () => {

    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Recuperar el prompt del local storage y eliminar las comillas
        const prompt = localStorage.getItem('selectedPrompt');
        if (prompt) {
            const cleanedPrompt = prompt.replace(/['"]+/g, '');
            setSelectedPrompt(cleanedPrompt);
        }

        const fetchData = async () => {
            const results = localStorage.getItem('scholarlyResults');
            if (results) {
              const parsedResults = JSON.parse(results);
              const convertedResults = parsedResults.map(article => ({
                  ...article,
                  title: convertSpecialCharacters(article.title),
                  summary: convertSpecialCharacters(article.summary),
                  authors: article.authors.map(author => convertSpecialCharacters(author))
              }));
              setArticles(convertedResults);
            }
            // setLoading(false);
        };
        fetchData();
    }, []);

    const convertSpecialCharacters = (text) => {
        if (!text) return '';
        return text.replace(/\\u00e1/g, 'á')
                   .replace(/\\u00e9/g, 'é')
                   .replace(/\\u00ed/g, 'í')
                   .replace(/\\u00f3/g, 'ó')
                   .replace(/\\u00fa/g, 'ú')
                   .replace(/\\u00f1/g, 'ñ')
                   .replace(/\\u00c1/g, 'Á')
                   .replace(/\\u00c9/g, 'É')
                   .replace(/\\u00cd/g, 'Í')
                   .replace(/\\u00d3/g, 'Ó')
                   .replace(/\\u00da/g, 'Ú')
                   .replace(/\\u00d1/g, 'Ñ')
                   .replace(/\\u00fc/g, 'ü')
                   .replace(/\\u00dc/g, 'Ü')
                   .replace(/{\\'\\i}/g, 'í')
                   .replace(/{\\'a}/g, 'á')
                   .replace(/{\\'e}/g, 'é')
                   .replace(/{\\'o}/g, 'ó')
                   .replace(/{\\'u}/g, 'ú')
                   .replace(/{\\~n}/g, 'ñ')
                   .replace(/{\\'A}/g, 'Á')
                   .replace(/{\\'E}/g, 'É')
                   .replace(/{\\'I}/g, 'Í')
                   .replace(/{\\'O}/g, 'Ó')
                   .replace(/{\\'U}/g, 'Ú')
                   .replace(/{\\~N}/g, 'Ñ');
    };

    const handleArticleClick = (article) => {
        localStorage.setItem('selectedArticle', JSON.stringify(article));
    }
    
    return (
        <div className='results'>
            <div className="results-idioma">
                <button id='results-idioma'>
                    <img src={Globe} alt="" />
                    <span>Idioma</span>
                </button>
            </div>
            <div className="results-results">
                <h1>{selectedPrompt}</h1>
                <div className="results-container">
                    {articles.map((article, index) => (
                        <div key={index} className="results-card">
                            <Link 
                                to='/source'
                                style={{textDecoration:'none'}}
                                onClick={() => handleArticleClick(article)}
                            >
                                <h2>{article.title}</h2>
                            </Link>
                            <div className="results-content">
                                <div className="results-sumary">
                                    <p>{article.summary || 'Not summary available. This might be a recent paper or preprint.'}</p>
                                </div>
                                <button>
                                    <img src={Ref} alt="" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="results-reflist">
                <Link style={{textDecoration:'none'}} to='/references'>
                    <button id='results-reflist'>
                        <span>Lista de Referencias</span>
                        <img src={Next} alt="" />
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Results;



// import React, { useState, useEffect } from 'react';
// import './styles/Results.css';
// import { Link } from 'react-router-dom';
// import Globe from '../Components/Assets/globe-beish.svg';
// import Ref from '../Components/Assets/bookmark.svg';
// import Next from '../Components/Assets/arrowNext.svg';

// const Results = () => {

//     const [selectedPrompt, setSelectedPrompt] = useState('');
//     const [articles, setArticles] = useState([]);

//     useEffect(() => {
//         // Recuperar el prompt del local storage y eliminar las comillas
//         const prompt = localStorage.getItem('selectedPrompt');
//         if (prompt) {
//             const cleanedPrompt = prompt.replace(/['"]+/g, '');
//             setSelectedPrompt(cleanedPrompt);
//         }

//         const fetchData = async () => {
//             const results = localStorage.getItem('scholarlyResults');
//             if (results) {
//               const parsedResults = JSON.parse(results);
//               setArticles(parsedResults);
//             }
//             // setLoading(false);
//         };
//         fetchData();
//     }, []);

//     const handleArticleClick = (article) => {
//         localStorage.setItem('selectedArticle', JSON.stringify(article));
//     }
    
//     return (
//         <div className='results'>
//             <div className="results-idioma">
//                 <button id='results-idioma'>
//                     <img src={Globe} alt="" />
//                     <span>Idioma</span>
//                 </button>
//             </div>
//             <div className="results-results">
//                 <h1>{selectedPrompt}</h1>
//                 <div className="results-container">
//                     {articles.map((article, index) => (
//                         <div key={index} className="results-card">
//                             <Link 
//                                 to='/source'
//                                 style={{textDecoration:'none'}}
//                                 onClick={() => handleArticleClick(article)}
//                             >
//                                 <h2>{article.title}</h2>
//                             </Link>
//                             <div className="results-content">
//                                 <div className="results-sumary">
//                                     <p>{article.summary || 'Not summary available. This might be a recent paper or preprint.'}</p>
//                                 </div>
//                                 <button>
//                                     <img src={Ref} alt="" />
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="results-reflist">
//                 <Link style={{textDecoration:'none'}} to='/references'>
//                     <button id='results-reflist'>
//                         <span>Lista de Referencias</span>
//                         <img src={Next} alt="" />
//                     </button>
//                 </Link>
//             </div>
//         </div>
//     );
// }

// export default Results;

// // {/* 
// //     <div className="results-card">
// //         <Link style={{textDecoration:'none'}} to='/source'>
// //             <h2>Titulo del articulo</h2>
// //         </Link>
// //         <div className="results-content">
// //             <div className="results-sumary">
// //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque mollitia adipisci quis vel autem architecto! Odit, pariatur enim quia aspernatur nam nobis! Ab reiciendis dignissimos quas recusandae impedit aliquam quia.</p>
// //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque mollitia adipisci quis vel autem architecto! Odit, pariatur enim quia aspernatur nam nobis! Ab reiciendis dignissimos quas recusandae impedit aliquam quia.</p>
// //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque mollitia adipisci quis vel autem architecto! Odit, pariatur enim quia aspernatur nam nobis! Ab reiciendis dignissimos quas recusandae impedit aliquam quia.</p>
// //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque mollitia adipisci quis vel autem architecto! Odit, pariatur enim quia aspernatur nam nobis! Ab reiciendis dignissimos quas recusandae impedit aliquam quia.</p>
// //                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque mollitia adipisci quis vel autem architecto! Odit, pariatur enim quia aspernatur nam nobis! Ab reiciendis dignissimos quas recusandae impedit aliquam quia.</p>
// //             </div>
// //             <button>
// //                 <img src={Ref} alt="" />
// //             </button>
// //         </div>
// //     </div>
// // */}

// // {articles.map((article, index) => (
// //     <div key={index} className="article-card">
// //         <h3>{article.title}</h3>
// //         <p><strong>Authors:</strong> {article.authors.join(', ')}</p>
// //         <p><strong>Year:</strong> {article.year || 'Not available'}</p>
// //         <p><strong>Summary:</strong> {article.summary || 'Not summary available. This might be a recent paper or preprint.'}</p>
// //         <h3>
// //           {article.link ? (
// //             <a href={article.link} target="_blank" rel="noopener noreferrer">{article.title}</a>
// //           ) : (
// //             article.title
// //           )}
// //         </h3>
// //     </div>
// // ))}