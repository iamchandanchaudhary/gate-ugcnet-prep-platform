import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineAcademicCap,
  HiOutlineExclamationCircle,
  HiOutlinePlay,
  HiX,
} from 'react-icons/hi';
import Sidebar from '../components/Sidebar';

function StartTestPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleStartTest = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigate('/test');
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="ml-56 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Start New Test</h1>
          <p className="text-gray-500 mt-1">
            Get ready for your GATE CS practice test
          </p>
        </div>

        {/* Test Info Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <HiOutlineAcademicCap className="text-3xl text-[#3475d9]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  GATE CS 2026 — Practice Test
                </h2>
                <p className="text-gray-500 text-sm">Computer Science & Information Technology</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                <HiOutlineClipboardList className="text-2xl text-[#3475d9]" />
                <div>
                  <p className="text-sm text-gray-500">Questions</p>
                  <p className="text-lg font-bold text-gray-800">10 MCQs</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                <HiOutlineClock className="text-2xl text-[#3475d9]" />
                <div>
                  <p className="text-sm text-gray-500">Time Limit</p>
                  <p className="text-lg font-bold text-gray-800">20 Minutes</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-8">
              <h3 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
                <HiOutlineExclamationCircle className="text-xl" />
                Instructions
              </h3>
              <ul className="text-sm text-amber-700 space-y-2 list-disc list-inside">
                <li>Each question carries equal marks.</li>
                <li>There is no negative marking in this practice test.</li>
                <li>The test will auto-submit when the timer runs out.</li>
                <li>You can navigate between questions freely.</li>
                <li>Make sure you have a stable internet connection.</li>
                <li>Do not refresh the page during the test.</li>
              </ul>
            </div>

            {/* Start Button */}
            <button
              onClick={handleStartTest}
              className="w-full flex items-center justify-center gap-2 bg-[#3475d9] hover:bg-blue-700 text-white font-semibold px-6 py-4 rounded-lg text-lg transition-colors duration-200 cursor-pointer"
            >
              <HiOutlinePlay className="text-xl" />
              Start Test
            </button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-0 overflow-hidden animate-in">
              {/* Modal Header */}
              <div className="bg-[#3475d9] px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Confirm Start Test</h3>
                <button
                  onClick={handleCancel}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <HiX className="text-xl" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-6">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-2 rounded-full shrink-0 mt-0.5">
                    <HiOutlineExclamationCircle className="text-2xl text-amber-600" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium mb-2">
                      Are you sure you want to start the test?
                    </p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      <li>• The timer (20 min) will begin immediately.</li>
                      <li>• You cannot pause once started.</li>
                      <li>• The test will auto-submit when the timer expires.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-5 py-2.5 rounded-lg bg-[#3475d9] text-white font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <HiOutlinePlay className="text-lg" />
                  Yes, Start Test
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default StartTestPage;
