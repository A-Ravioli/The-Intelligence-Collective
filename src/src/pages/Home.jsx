import { useState, useEffect } from 'react';
import PaperCard from '../components/PaperCard';

function Home() {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    // Fetch papers from the backend
    fetch('/api/papers')
      .then(response => response.json())
      .then(data => setPapers(data));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Recent Papers</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map(paper => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
}

export default Home;