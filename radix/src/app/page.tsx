"use client";

import React, { useState } from 'react';
import QuickSortVisualizer from "../pages/quicksort";
import RadixSortVisualization from "../pages/radix-sort-visualization";
import NavBar from './components/navbar';
import { Analytics } from '@vercel/analytics/react';

export default function Home() {
  const [page, setPage] = useState('quicksort');

  return (
    <div>
      <Analytics />
      <NavBar setPage={setPage} />
      {page === 'quicksort' && <QuickSortVisualizer />}
      {page === 'radixsort' && <RadixSortVisualization />}
    </div>
  );
}
