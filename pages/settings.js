import React, { useState } from 'react';
import Layout from "@/components/Layout";
import { useMode } from '@/contexts/ModeContext';

export default function Settings() {
  const { mode, updateMode } = useMode();
  const [selectedMode, setSelectedMode] = useState(mode);

  const handleModeChange = (event) => {
    const newMode = event.target.value;
    setSelectedMode(newMode);
    updateMode(newMode);
  };

  return (
    <Layout>
      <h1 className="text-3xl mb-4">Settings</h1>
      
      <div className="mb-4">
        <h2 className="text-xl mb-2">Mode</h2>
        <div className='flex flex-col gap-1 md:gap-4 md:flex-row'>
          <label className={`flex items-center bg-blue-800 text-white w-fit p-4 h-[13vw] md:h-[5vw] rounded-md cursor-pointer mb-2 ${selectedMode === 'Interval Monitoring' ? 'bg-yellow-500' : ''}`}>
            <input
              type="radio"
              value="Interval Monitoring"
              checked={selectedMode === 'Interval Monitoring'}
              onChange={handleModeChange}
              className="mr-2"
            />
            Interval Monitoring
          </label>
          <label className={`flex items-center bg-blue-800 text-white w-fit p-4 h-[13vw] md:h-[5vw] rounded-md cursor-pointer ${selectedMode === 'Real-Time Monitoring' ? 'bg-yellow-500' : ''}`}>
            <input
              type="radio"
              value="Real-Time Monitoring"
              checked={selectedMode === 'Real-Time Monitoring'}
              onChange={handleModeChange}
              className="mr-2"
            />
            Real-Time Monitoring
          </label>
        </div>
      </div>
    </Layout>
  );
}
