// import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

PaperCard.propTypes = {
    paper: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        abstract: PropTypes.string.isRequired,
    }).isRequired,
};

function PaperCard({ paper }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          <Link to={`/paper/${paper.id}`} className="hover:underline">
            {paper.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {paper.authors.join(', ')}
        </p>
        <p className="text-sm text-gray-500 line-clamp-3">
          {paper.abstract}
        </p>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6">
        <Link
          to={`/paper/${paper.id}`}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View Paper and Notes
        </Link>
      </div>
    </div>
  );
}

export default PaperCard;