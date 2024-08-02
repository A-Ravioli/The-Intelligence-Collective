import requests
import arxiv

def fetch_paper_info(arxiv_id):
    search = arxiv.Search(id_list=[arxiv_id])
    paper = next(search.results())
    
    return {
        'id': arxiv_id,
        'title': paper.title,
        'authors': [author.name for author in paper.authors],
        'abstract': paper.summary,
        'url': paper.pdf_url
    }

def generate_markdown_content(paper_info):
    return f"""# {paper_info['title']}

Authors: {', '.join(paper_info['authors'])}

## Abstract

{paper_info['abstract']}

## Notes

[Add your notes here]
"""