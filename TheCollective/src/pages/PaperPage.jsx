import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PaperViewer from '../components/PaperViewer';
import NotesEditor from '../components/NotesEditor';

function PaperPage() {
  const { id } = useParams();
  const [paper, setPaper] = useState(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    // Fetch paper details and notes from the backend
    fetch(`/api/papers/${id}`)
      .then(response => response.json())
      .then(data => {
        setPaper(data.paper);
        setNotes(data.notes);
      });
  }, [id]);

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
    // Send updated notes to the backend
    fetch(`/api/papers/${id}/notes`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes: newNotes }),
    });
  };

  if (!paper) return <div>Loading...</div>;

  return (
    <div className="flex h-screen">
      <div className="w-1/2 p-4">
        <PaperViewer paperUrl={paper.url} />
      </div>
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">{paper.title}</h2>
        <NotesEditor notes={notes} onChange={handleNotesChange} />
      </div>
    </div>
  );
}

export default PaperPage;