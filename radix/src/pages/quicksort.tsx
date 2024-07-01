import React, { useState, useEffect } from 'react';

type StackElement = { low: number; high: number };

const QuicksortVisualization = () => {
  const [array, setArray] = useState<number[]>([]);
  const [input, setInput] = useState('');
  const [pivotIndex, setPivotIndex] = useState(-1);
  const [i, setI] = useState(-1);
  const [j, setJ] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [low, setLow] = useState(-1);
  const [high, setHigh] = useState(-1);
  const [stack, setStack] = useState<StackElement[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    loadArray(e.target.value);
  };

  const loadArray = (inputValue: string) => {
    const newArray = inputValue.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));
    setArray(newArray);
    setStack([{ low: 0, high: newArray.length - 1 }]);
    setI(-1);
    setJ(-1);
    setPivotIndex(-1);
    setLow(-1);
    setHigh(-1);
    setIsRunning(false);
  };

  const partitionStep = () => {
    if (stack.length === 0) {
      return;
    }

    let { low, high } = stack[0];
    let arrayCopy = [...array];
    let pivot = arrayCopy[high];

    if (i === -1 && j === -1) {
      setI(low - 1);
      setJ(low);
      setPivotIndex(high);
    } else if (j < high) {
      if (arrayCopy[j] <= pivot) {
        setI(i + 1);
        [arrayCopy[i + 1], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i + 1]];
        setArray(arrayCopy);
      }
      setJ(j + 1);
    } else {
      [arrayCopy[i + 1], arrayCopy[high]] = [arrayCopy[high], arrayCopy[i + 1]];
      setArray(arrayCopy);
      setPivotIndex(i + 1);
      setStack([
        { low, high: i },
        { low: i + 2, high },
        ...stack.slice(1)
      ]);
      setLow(-1);
      setHigh(-1);
      setI(-1);
      setJ(-1);
    }
  };

  const quicksortStep = () => {
    if (stack.length === 0) {
      setIsRunning(false);
      return;
    }

    let { low, high } = stack[0];

    if (low < high) {
      if (low !== -1 && high !== -1) {
        setLow(low);
        setHigh(high);
        if (i === -1 && j === -1) {
          setPivotIndex(high);
          setI(low - 1);
          setJ(low);
        }
      }
      partitionStep();
    } else {
      setStack(stack.slice(1));
      setLow(-1);
      setHigh(-1);
      setI(-1);
      setJ(-1);
      setPivotIndex(-1);
    }
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setTimeout(quicksortStep, 1000 / speed);
    }
    return () => clearTimeout(timer);
  }, [isRunning, array, stack, speed, i, j, pivotIndex, low, high]);

  const toggleSimulation = () => {
    if (!isRunning && array.length === 0) {
      loadArray(input);
    }
    setIsRunning(!isRunning);
  };

  const stepQuicksort = () => {
    quicksortStep();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-black">Quick Sort Visualization</h2>
        <div className="p-4 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter array as comma-separated list"
            className="mb-4 p-2 w-4/5 border rounded"
          />

          <div className="mb-4">
            <div className="flex justify-center overflow-x-auto">
              {array.map((num, index) => (
                <div key={index} className="flex flex-col items-center mx-1">
                  <div className={`w-10 h-10 border text-black flex items-center justify-center ${
                    (index >= low && index <= high) ? 'bg-yellow-100' : ''
                  }`}>
                    {num}
                  </div>
                  <div className="h-6 flex items-start mt-1">
                    {index === i && <span className="text-red-500">↑i</span>}
                    {index === j && <span className="text-blue-500">↑j</span>}
                    {index === pivotIndex && <span className="text-green-500">↑p</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-4">
            <button onClick={toggleSimulation} className="px-4 py-2 bg-blue-500 text-white rounded">
              {isRunning ? 'Stop' : 'Start'}
            </button>
            <button onClick={stepQuicksort} className="px-4 py-2 bg-yellow-500 text-white rounded">
              Step
            </button>
            <input
              type="range"
              min="1"
              max="10"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-48"
            />
            <span className="text-black">Speed: {speed}x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuicksortVisualization;