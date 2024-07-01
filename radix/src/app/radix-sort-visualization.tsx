
"use client";
import React, { useState, useEffect } from 'react';
import { Play, Pause, StepForward } from 'lucide-react';

const RadixSortVisualization = () => {
  const [inputArray, setInputArray] = useState('752,11111,12,160');
  const [baseB, setBaseB] = useState(8);
  const [baseInputError, setBaseInputError] = useState('');
  const [mainQueue, setMainQueue] = useState([]);
  const [subQueues, setSubQueues] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [n, setN] = useState(0);
  const [d, setD] = useState(0);
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [currentElement, setCurrentElement] = useState(null);
  const [phase, setPhase] = useState('decomposition');

  const validateAndSetBase = (value: any) => {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue) || parsedValue < 2) {
      setBaseInputError('Base must be an integer greater than 1');
      return;
    }
    setBaseInputError('');
    setBaseB(parsedValue);
  };

  useEffect(() => {
    if (baseInputError) return;  // Don't update if there's an error

    const array = inputArray.split(',').map(Number).filter(n => !isNaN(n));
    setMainQueue(array);
    setN(array.length);
    setD(array.length > 0 ? Math.max(...array.map(num => Math.floor(Math.log(Math.max(1, num)) / Math.log(baseB)) + 1)) : 0);
    setSubQueues(Array(baseB).fill(NaN).map(() => []));
    setI(0);
    setJ(0);
    setPhase('decomposition');
    setCurrentStep(0);
    setIsRunning(false);
  }, [inputArray, baseB, baseInputError]);

  const runStep = () => {
    if (currentStep === 0) {
      setI(0);
      setJ(0);
      setPhase('decomposition');
    } else if (i < d) {
      if (phase === 'decomposition') {
        if (mainQueue.length > 0) {
          const x = mainQueue.shift();
          setCurrentElement(x);

          let numberString = x.toString();
          // Calculate the index from the right
          console.log('numberString:', numberString);
          // const digit = Math.floor(x / Math.pow(baseB, i)) % baseB;
          const digit = parseInt(i <= numberString.length - 1 ? numberString[i] : 0);
          console.log('digit:', digit);
          const newSubQueues = [...subQueues];
          newSubQueues[digit].push(x);
          setSubQueues(newSubQueues);
          setMainQueue([...mainQueue]);
        } else {
          setPhase('collection');
          setJ(0);
        }
      } else { // collection phase
        if (j < baseB) {
          if (subQueues[j].length > 0) {
            const x = subQueues[j].shift();
            setMainQueue([...mainQueue, x]);
            setSubQueues([...subQueues]);
          } else {
            setJ(j + 1);
          }
        } else {
          setI(i + 1);
          setPhase('decomposition');
        }
      }
    } else {
      setIsRunning(false);
    }
    setCurrentStep(currentStep + 1);
  };

  useEffect(() => {
    let timer;
    if (isRunning && !baseInputError) {
      timer = setTimeout(runStep, 1000 / speed);
    }
    return () => clearTimeout(timer);
  }, [isRunning, currentStep, speed, baseInputError]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Radix Sort Visualization</h2>
        <div className="mb-4">
          <input
            type="text"
            value={inputArray}
            onChange={(e) => setInputArray(e.target.value)}
            placeholder="Input array (comma-separated)"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
          />
          <input
            type="number"
            value={baseB}
            onChange={(e) => validateAndSetBase(e.target.value)}
            placeholder="Base (b)"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 ${baseInputError ? 'border-red-500' : ''}`}
          />
          {baseInputError && <p className="text-red-500 text-xs italic">{baseInputError}</p>}
        </div>
        <div className="mb-4 flex items-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            disabled={!!baseInputError}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={runStep}
            disabled={isRunning || !!baseInputError}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
          >
            <StepForward size={24} />
          </button>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="w-32 mr-2"
          />
          <span>Speed: {speed}x</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">Main Queue (Q)</h3>
            <div className="border p-2 min-h-[50px]">
              {mainQueue.join(', ')}
            </div>
          </div>
          <div>
            <h3 className="font-bold">Sub Queues</h3>
            {subQueues.map((queue, index) => (
              <div key={index} className="border p-1 mb-1">
                Q{index}: {queue.join(', ')}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <p>n: {n}, d: {d}, i: {i}, j: {j}</p>
          <p>Current Element: {currentElement !== null ? currentElement : 'N/A'}</p>
          <p>Phase: {phase}</p>
        </div>
      </div>
    </div>
  );
};

export default RadixSortVisualization;
