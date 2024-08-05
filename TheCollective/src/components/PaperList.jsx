// import React from 'react';
import PaperCard from './PaperCard';
import PropTypes from 'prop-types';

PaperList.propTypes = {
    papers: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        authors: PropTypes.arrayOf(PropTypes.string).isRequired,
        abstract: PropTypes.string.isRequired,
        })
    ).isRequired,
    };

function PaperList({ papers }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {papers.map(paper => (
        <PaperCard key={paper.id} paper={paper} />
      ))}
    </div>
  );
}

export default PaperList;