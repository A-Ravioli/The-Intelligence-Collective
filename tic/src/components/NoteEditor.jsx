// import React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';

NotesEditor.propTypes = {
    notes: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    };

function NotesEditor({ notes, onChange }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <ReactMarkdown className="prose max-w-none">
          {notes}
        </ReactMarkdown>
      </div>
      <textarea
        className="w-full h-64 p-2 border border-gray-300 rounded mt-4"
        value={notes}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add your notes here..."
      />
    </div>
  );
}

export default NotesEditor;