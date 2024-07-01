import React from 'react';

const NavBar = ({ setPage }) => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Sorting Visualizer</h1>
        <div>
          <button
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white mr-2"
            onClick={() => setPage('quicksort')}
          >
            QuickSort
          </button>
          <button
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-500 hover:text-white"
            onClick={() => setPage('radixsort')}
          >
            RadixSort
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
