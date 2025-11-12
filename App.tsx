
import React, { useState, useCallback, useEffect } from 'react';
import { GameAssetCard } from './components/GameAssetCard';
import { RobuxIcon, DiamondIcon } from './components/Icons';
import { FloatingWindow } from './components/FloatingWindow';

const App: React.FC = () => {
  const [robux, setRobux] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('robux');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [diamonds, setDiamonds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('diamonds');
      return saved ? JSON.parse(saved) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem('robux', JSON.stringify(robux));
  }, [robux]);

  useEffect(() => {
    localStorage.setItem('diamonds', JSON.stringify(diamonds));
  }, [diamonds]);

  const [windowState, setWindowState] = useState({
    isOpen: true,
    isMinimized: false,
    position: { x: window.innerWidth / 2 - 450, y: 50 },
  });

  const handleAddRobux = useCallback((amount: number) => {
    setRobux(prev => prev + amount);
  }, []);

  const handleAddDiamonds = useCallback((amount: number) => {
    setDiamonds(prev => prev + amount);
  }, []);
  
  const handlePositionChange = useCallback((newPos: { x: number; y: number }) => {
    setWindowState(prev => ({ ...prev, position: newPos }));
  }, []);

  const handleClose = useCallback(() => {
    setWindowState(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleOpen = () => {
    setWindowState(prev => ({...prev, isOpen: true}));
  }

  const handleMinimizeToggle = useCallback(() => {
    setWindowState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono flex flex-col items-center justify-center p-4 overflow-hidden">
       {!windowState.isOpen && (
         <div className="text-center animate-pulse">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-green-400 tracking-wider mb-4">
              Game Asset Simulator
            </h1>
            <button
              onClick={handleOpen}
              className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-md transition-all duration-200 active:scale-95 text-lg shadow-lg shadow-green-500/30"
            >
              Open Control Panel
            </button>
         </div>
      )}
      <FloatingWindow
        title="[System_Panel] Asset_Manager"
        isOpen={windowState.isOpen}
        isMinimized={windowState.isMinimized}
        position={windowState.position}
        onClose={handleClose}
        onMinimizeToggle={handleMinimizeToggle}
        onPositionChange={handlePositionChange}
      >
          <div className="w-full">
            <header className="text-center mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-green-400 tracking-wider">
                Asset Control
              </h1>
              <p className="mt-1 text-xs text-yellow-500">
                <span className="font-bold">DISCLAIMER:</span> Simulation only. Not real.
              </p>
            </header>

            <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GameAssetCard
                gameName="Roblox"
                currencyName="Robux"
                value={robux}
                onAdd={handleAddRobux}
                Icon={RobuxIcon}
                theme={{
                  primary: 'cyan',
                  secondary: 'blue',
                }}
              />
              <GameAssetCard
                gameName="Free Fire"
                currencyName="Diamonds"
                value={diamonds}
                onAdd={handleAddDiamonds}
                Icon={DiamondIcon}
                theme={{
                  primary: 'blue',
                  secondary: 'purple',
                }}
              />
            </main>

            <footer className="text-center mt-8 text-xs text-gray-600">
                <p>Values saved on this device.</p>
            </footer>
          </div>
      </FloatingWindow>
    </div>
  );
};

export default App;
