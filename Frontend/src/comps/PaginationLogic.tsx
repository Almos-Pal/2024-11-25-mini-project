import React, { useState } from 'react';
import { Pagination } from '@mui/material';

const PaginatedList = (items ) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Compute the items for the current page
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      {/* Render Current Items */}
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {/* Render Pagination */}
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
};

export default PaginatedList;
