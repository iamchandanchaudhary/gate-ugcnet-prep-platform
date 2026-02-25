import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineClock,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineExclamationCircle,
  HiX,
} from 'react-icons/hi';

// ── 10 GATE CS MCQ Questions ──
const questions = [
  {
    id: 1,
    question:
      'What is the time complexity of searching for an element in a balanced Binary Search Tree (BST)?',
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    answer: 1,
  },
  {
    id: 2,
    question:
      'Which of the following sorting algorithms has the best average-case time complexity?',
    options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'],
    answer: 2,
  },
  {
    id: 3,
    question:
      'In the context of operating systems, what does a "deadlock" refer to?',
    options: [
      'A situation where a process is terminated unexpectedly',
      'A situation where two or more processes are waiting indefinitely for resources held by each other',
      'A situation where the CPU utilization is 100%',
      'A situation where the memory is completely full',
    ],
    answer: 1,
  },
  {
    id: 4,
    question:
      'Which of the following is NOT a valid page replacement algorithm?',
    options: ['FIFO', 'LRU', 'Optimal', 'LIFO'],
    answer: 3,
  },
  {
    id: 5,
    question:
      'What is the worst-case time complexity of QuickSort?',
    options: ['O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'],
    answer: 1,
  },
  {
    id: 6,
    question:
      'Which data structure is used for implementing a priority queue efficiently?',
    options: ['Stack', 'Queue', 'Heap', 'Linked List'],
    answer: 2,
  },
  {
    id: 7,
    question:
      'In a relational database, a "foreign key" is used to:',
    options: [
      'Uniquely identify each record in a table',
      'Establish a link between data in two tables',
      'Index the table for faster queries',
      'Encrypt sensitive data in a table',
    ],
    answer: 1,
  },
  {
    id: 8,
    question:
      'Which of the following is true about TCP (Transmission Control Protocol)?',
    options: [
      'It is connectionless',
      'It does not guarantee delivery of packets',
      'It provides reliable, ordered delivery of data',
      'It is faster than UDP in all cases',
    ],
    answer: 2,
  },
  {
    id: 9,
    question:
      'The number of edges in a complete graph with n vertices is:',
    options: ['n', 'n(n-1)', 'n(n-1)/2', '2n'],
    answer: 2,
  },
  {
    id: 10,
    question:
      'Which normal form eliminates transitive dependency?',
    options: ['1NF', '2NF', '3NF', 'BCNF'],
    answer: 2,
  },
];

const TOTAL_TIME = 20 * 60; // 20 minutes in seconds

function TestPage() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const handleFinish = useCallback(() => {
    // Calculate results
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const details = questions.map((q, i) => {
      const sel = selected[i];
      if (sel === null) {
        unanswered++;
        return { ...q, selected: null, isCorrect: false };
      }
      if (sel === q.answer) {
        correct++;
        return { ...q, selected: sel, isCorrect: true };
      }
      wrong++;
      return { ...q, selected: sel, isCorrect: false };
    });

    const result = {
      total: questions.length,
      correct,
      wrong,
      unanswered,
      score: correct * 10,
      maxScore: questions.length * 10,
      timeTaken: TOTAL_TIME - timeLeft,
      details,
    };

    // Store result and navigate
    sessionStorage.setItem('testResult', JSON.stringify(result));
    navigate('/test-report', { replace: true });
  }, [selected, timeLeft, navigate]);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, handleFinish]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const handleSelect = (optionIndex) => {
    const copy = [...selected];
    copy[currentQ] = optionIndex;
    setSelected(copy);
  };

  const answeredCount = selected.filter((s) => s !== null).length;
  const isLowTime = timeLeft <= 120; // less than 2 min

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h1 className="text-lg font-bold text-gray-800">
            GATE CS 2026 — Practice Test
          </h1>
          <p className="text-xs text-gray-500">
            Question {currentQ + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-6">
          {/* Timer */}
          <div
            className={`flex items-center gap-2 text-lg font-mono font-bold px-4 py-2 rounded-lg ${
              isLowTime
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-blue-50 text-[#3475d9]'
            }`}
          >
            <HiOutlineClock className="text-xl" />
            {formatTime(timeLeft)}
          </div>
          <button
            onClick={() => setShowSubmitConfirm(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Submit Test
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Question Navigation Panel */}
        <aside className="w-56 bg-white border-r border-gray-200 p-4 fixed top-15.25 bottom-0 left-0 overflow-y-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase mb-3">
            Questions
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  currentQ === i
                    ? 'bg-[#3475d9] text-white'
                    : selected[i] !== null
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-green-100 border border-green-300 inline-block" />
              Answered ({answeredCount})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-gray-100 inline-block" />
              Not Answered ({questions.length - answeredCount})
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-[#3475d9] inline-block" />
              Current
            </div>
          </div>
        </aside>

        {/* Main Question Area */}
        <main className="ml-56 flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Question */}
              <div className="mb-6">
                <span className="text-xs font-semibold text-[#3475d9] bg-blue-50 px-2.5 py-1 rounded-full">
                  Question {currentQ + 1}
                </span>
                <h2 className="text-lg font-semibold text-gray-800 mt-3 leading-relaxed">
                  {questions[currentQ].question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQ].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-5 py-4 rounded-lg border-2 transition-all duration-150 cursor-pointer ${
                      selected[currentQ] === idx
                        ? 'border-[#3475d9] bg-blue-50 text-[#3475d9]'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="font-semibold mr-3">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              {/* Clear selection */}
              {selected[currentQ] !== null && (
                <button
                  onClick={() => {
                    const copy = [...selected];
                    copy[currentQ] = null;
                    setSelected(copy);
                  }}
                  className="mt-4 text-sm text-red-500 hover:text-red-700 font-medium cursor-pointer"
                >
                  Clear Selection
                </button>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setCurrentQ((c) => Math.max(0, c - 1))}
                disabled={currentQ === 0}
                className="flex items-center gap-1 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <HiOutlineChevronLeft />
                Previous
              </button>
              {currentQ < questions.length - 1 ? (
                <button
                  onClick={() => setCurrentQ((c) => c + 1)}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-[#3475d9] hover:bg-blue-700 text-white font-medium transition-colors cursor-pointer"
                >
                  Next
                  <HiOutlineChevronRight />
                </button>
              ) : (
                <button
                  onClick={() => setShowSubmitConfirm(true)}
                  className="flex items-center gap-1 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors cursor-pointer"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-green-600 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Submit Test</h3>
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <HiX className="text-xl" />
              </button>
            </div>
            <div className="px-6 py-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-100 p-2 rounded-full shrink-0 mt-0.5">
                  <HiOutlineExclamationCircle className="text-2xl text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium mb-2">
                    Are you sure you want to submit the test?
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    Answered: <strong className="text-green-600">{answeredCount}</strong> / {questions.length}
                  </p>
                  {answeredCount < questions.length && (
                    <p className="text-sm text-amber-600">
                      You have {questions.length - answeredCount} unanswered question(s).
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowSubmitConfirm(false)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={handleFinish}
                className="px-5 py-2.5 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors cursor-pointer"
              >
                Yes, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestPage;
