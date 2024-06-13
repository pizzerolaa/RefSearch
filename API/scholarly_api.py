from flask import Flask, request, jsonify
from scholarly import scholarly, ProxyGenerator
#import time
from flask_cors import CORS
import re
import os
from dotenv import load_dotenv, dotenv_values

load_dotenv()

app = Flask(__name__)

ApiKey = os.getenv("SCRAPER_API_KEY")

db = ProxyGenerator()
db.ScraperAPI(ApiKey)
scholarly.use_proxy(db)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

def decode_latex(text):
    if not text:
        return text
    latex_to_unicode = {
        "{\\'{a}}": "á", "{\\'{e}}": "é", "{\\'{i}}": "í", "{\\'{o}}": "ó", "{\\'{u}}": "ú",
        "{\\~{n}}": "ñ", "{\\'{A}}": "Á", "{\\'{E}}": "É", "{\\'{I}}": "Í", "{\\'{O}}": "Ó",
        "{\\'{U}}": "Ú", "{\\~{N}}": "Ñ", "{\\'{\\i}}": "í", "{\\'{\\o}}": "ó"
    }
    for latex, unicode in latex_to_unicode.items():
        text = re.sub(re.escape(latex), unicode, text)
    return text

@app.route('/scholarly', methods=['GET'])
def search_pubs():
    try:
        query = request.args.get('q', '')
        app.logger.info(f"Searching for: {query}")
        results = search_with_fallback(query)
        app.logger.info(f"Total results found: {len(results)}")
        return jsonify(results)
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": str(e)}), 500
    
def search_with_fallback(query):
    results = []
    for result in scholarly.search_pubs(query):
        full_paper = scholarly.fill(result)
        # print("Full paper structure:", full_paper)
        # print("Bib structure:", full_paper.get('bib', {}))
        # print("EDoc structure:", full_paper.get('eprint', {}).get('eprint_url'))
        authors = full_paper['bib'].get('author', [])
        if isinstance(authors, str):
            authors = [authors]  # Convertir a lista si es una cadena
        
        title = decode_latex(full_paper['bib']['title'])
        authors = [decode_latex(author) for author in authors]
        year = full_paper['bib'].get('year')
        summary = (
            decode_latex(full_paper.get('bib', {}).get('abstract')) or 
            decode_latex(full_paper.get('abstact')) or 
            'No summary available'
        )
        link = full_paper.get('pub_url') or full_paper.get('eprint', {}).get('eprint_url') or full_paper.get('scholar_url') or full_paper.get('pdf_url') or None
            
        #link = eprint_url or pub_url or scholar_url or pdf_url or None

        results.append({
            'title': title,
            'authors': authors,
            'year': year,
            'summary': summary,
            'link': link
        })
            
        if len(results) >= 5:
            break
            
        # time.sleep(random.uniform(1, 3))  # Espera entre 1 y 3 segundos
        #app.logger.info(f"Found article: {title}")
    if not results:
        app.logger.info("No results found for the original query. Performing broader search.")
        broader_query = ' '.join(query.split()[:4])
        results = search_with_fallback(broader_query)
    return results


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
