import React, { useState, useEffect } from 'react';
import './styles/Results.css';
import { Link } from 'react-router-dom';  
import Ref from '../Components/Assets/bookmark.svg';
import Next from '../Components/Assets/arrowNext.svg';
import axios from 'axios';

const Results = () => {
    const [selectedPrompt, setSelectedPrompt] = useState('');
    const [articles, setArticles] = useState([]);
    const [translatedText, setTranslatedText] = useState({});
    const [language, setLanguage] = useState(localStorage.getItem('LANG'));
    const [formData, setFormData] = useState({
        username: '',
        reference: ''
    });

    const translateText = async (textsToTranslate) => {
        try {
            const response = await axios.post('http://localhost:8800/translate', {
                text: Object.values(textsToTranslate).join('\n'),
                targetLang: language,
            });
            const translations = response.data.translations[0].text.split('\n');
            const translatedObject = Object.keys(textsToTranslate).reduce((acc, key, index) => {
                acc[key] = translations[index];
                return acc;
            }, {});
            setTranslatedText(translatedObject);
        } catch (error) {
            console.error('Error al traducir:', error);
        }
    };

    useEffect(() => {
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
                console.log(convertedResults)

                const textToTranslate = {
                    title: localStorage.getItem('selectedPrompt'),
                    references: "Lista de referencias",
                    f1t: convertedResults[0]?.title,
                    f1s: convertedResults[0]?.summary,
                    f2t: convertedResults[1]?.title,
                    f2s: convertedResults[1]?.summary,
                    f3t: convertedResults[2]?.title,
                    f3s: convertedResults[2]?.summary,
                    f4t: convertedResults[3]?.title,
                    f4s: convertedResults[3]?.summary,
                    f5t: convertedResults[4]?.title,
                    f5s: convertedResults[4]?.summary,
                    summary: "No se encontró un resumen, podría ser un artículo nuevo o una preimpresión"
                };

                await translateText(textToTranslate);

                console.log(convertedResults)

                setArticles(convertedResults);
            }
        };

        fetchData();
    }, [language]);

    useEffect(() => {
        if (Object.keys(translatedText).length > 0) {
            setArticles(prevArticles => 
                prevArticles.map((article, index) => ({
                    ...article,
                    title: translatedText[`f${index + 1}t`] || article.title,
                    summary: translatedText[`f${index + 1}s`] || article.summary
                }))
            );
        }
    }, [translatedText]);

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
            .replace(/{\\~N}/g, 'Ñ')
            .replace(/{\\"u}/g, 'ü')
            .replace(/{\\"U}/g, 'Ü');
    };

    const handleArticleClick = (article) => {
        localStorage.setItem('selectedArticle', JSON.stringify(article));
    };

    const handleArticleSave = async (article) => {
        localStorage.setItem('savedArticle', JSON.stringify(article));

        const username = localStorage.getItem('username');
        const savedArticle = localStorage.getItem('savedArticle');

        const data = {
            username: username || '',
            reference: savedArticle || ''
        };

        setFormData({
            username: username || '',
            reference: savedArticle || ''
        });

        try {
            const response = await axios.post('http://localhost:8800/add-reference', data);
            console.log('Response:', response.data);
            alert('Reference added successfully!');
            localStorage.removeItem('savedArticle');  // Clear the saved article
        } catch (error) {
            console.error('Error adding reference:', error.response ? error.response.data : error.message);
            alert('Failed to add reference');
        }
    };

    return (
        <div className='results'>
            <div className="results-results">
                <h1>{translatedText.title}</h1>
                <div className="results-container">
                    {articles.map((article, index) => (
                        <div key={index} className="results-card">
                            <Link 
                                to='/source'
                                style={{ textDecoration: 'none' }}
                                onClick={() => handleArticleClick(article)}
                            >
                                <h2>{article.title}</h2>
                            </Link>
                            <div className="results-content">
                                <div className="results-summary">
                                    <p>{article.summary || translatedText.summary}</p>
                                </div>
                                <button onClick={() => handleArticleSave(article)}>
                                    <img src={Ref} alt="" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="results-reflist">
                <Link style={{ textDecoration: 'none' }} to='/references'>
                    <button id='results-reflist'>
                        <h3>{translatedText.references}</h3>
                        <img src={Next} alt="" />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Results;
