from flask import Flask, request, jsonify
from github import Github
import os
from utils import fetch_paper_info, generate_markdown_content

app = Flask(__name__)

# Initialize GitHub client
g = Github(os.environ.get('GITHUB_TOKEN'))
repo = g.get_repo(os.environ.get('GITHUB_REPO'))

@app.route('/api/papers', methods=['GET'])
def get_papers():
    # Fetch list of papers from GitHub repo
    papers = []
    contents = repo.get_contents("")
    for content in contents:
        if content.path.endswith('.md'):
            paper_info = fetch_paper_info(content.path.replace('.md', ''))
            papers.append(paper_info)
    return jsonify(papers)

@app.route('/api/papers/<paper_id>', methods=['GET'])
def get_paper(paper_id):
    # Fetch paper details and notes from GitHub repo
    paper_info = fetch_paper_info(paper_id)
    notes_content = repo.get_contents(f"{paper_id}.md").decoded_content.decode()
    return jsonify({'paper': paper_info, 'notes': notes_content})

@app.route('/api/papers', methods=['POST'])
def add_paper():
    data = request.json
    paper_id = data['arxiv_id']
    paper_info = fetch_paper_info(paper_id)
    markdown_content = generate_markdown_content(paper_info)
    
    # Create new file in GitHub repo
    repo.create_file(f"{paper_id}.md", f"Add notes for {paper_info['title']}", markdown_content)
    
    return jsonify(paper_info), 201

@app.route('/api/papers/<paper_id>/notes', methods=['PUT'])
def update_notes(paper_id):
    data = request.json
    new_notes = data['notes']
    
    # Update file in GitHub repo
    file = repo.get_contents(f"{paper_id}.md")
    repo.update_file(file.path, f"Update notes for {paper_id}", new_notes, file.sha)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)