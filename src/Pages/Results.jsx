// import React, { useState, useEffect } from 'react';
// import './styles/Results.css';
// import { Link } from 'react-router-dom';
// import Globe from '../Components/Assets/globe-beish.svg';
// import Ref from '../Components/Assets/bookmark.svg';
// import Next from '../Components/Assets/arrowNext.svg';

// const latexToUnicode = (text) => {
//     const latex_to_unicode = {
//         "{\\'{a}}": "á", "{\\'{e}}": "é", "{\\'{i}}": "í", "{\\'{o}}": "ó", "{\\'{u}}": "ú",
//         "{\\~{n}}": "ñ", "{\\'{A}}": "Á", "{\\'{E}}": "É", "{\\'{I}}": "Í", "{\\'{O}}": "Ó",
//         "{\\'{U}}": "Ú", "{\\~{N}}": "Ñ", "{\\'{\\i}}": "í", "{\\'{\\o}}": "ó",
//         "{\\'{\\a}}": "á", "{\\~{\\n}}": "ñ"
//     };

//     return text.replace(/({\\'.{1,2}}|{\\~{n}})/g, match => latex_to_unicode[match] || match);
// };

// const Results = () => {
//     const [selectedPrompt, setSelectedPrompt] = useState('');
//     const [articles, setArticles] = useState([]);

//     useEffect(() => {
//         const prompt = localStorage.getItem('selectedPrompt');
//         if (prompt) {
//             const cleanedPrompt = prompt.replace(/['"]+/g, '');
//             setSelectedPrompt(cleanedPrompt);
//         }

//         const fetchData = async () => {
//             const results = localStorage.getItem('scholarlyResults');
//             if (results) {
//                 const parsedResults = JSON.parse(results);
//                 setArticles(parsedResults.map(article => ({
//                     ...article,
//                     title: latexToUnicode(article.title),
//                     authors: article.authors.map(latexToUnicode)
//                 })));
//             }
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
              setArticles(parsedResults);
            }
            // setLoading(false);
        };
        fetchData();
    }, []);

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