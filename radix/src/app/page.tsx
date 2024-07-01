"use client";

import React, { useState } from 'react';
import QuickSortVisualizer from "../pages/quicksort";
import RadixSortVisualization from "../pages/radix-sort-visualization";
import NavBar from './components/navbar';

export default function Home() {
  const [page, setPage] = useState('quicksort');

  return (
    <div>
      <NavBar setPage={setPage} />
      {page === 'quicksort' && <QuickSortVisualizer />}
      {page === 'radixsort' && <RadixSortVisualization />}
      (c) Lukas Sterbenz
    </div>
  );
}
