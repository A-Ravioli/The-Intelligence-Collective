import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PropTypes from 'prop-types';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

PaperViewer.propTypes = {
    paperUrl: PropTypes.string.isRequired,
    };

function PaperViewer({ paperUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="h-full overflow-auto">
      <Document
        file={paperUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{ workerSrc: '/pdf.worker.js' }}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={450}
          />
        ))}
      </Document>
      <p className="text-center mt-4">
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PaperViewer;