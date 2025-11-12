
import React, { useState } from 'react';

interface GameAssetCardProps {
  gameName: string;
  currencyName: string;
  value: number;
  onAdd: (amount: number) => void;
  Icon: React.FC<{ className?: string }>;
  theme: {
    primary: string;
    secondary: string;
  };
}

export const GameAssetCard: React.FC<GameAssetCardProps> = ({ gameName, currencyName, value, onAdd, Icon, theme }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAdd = () => {
    const amount = parseInt(inputValue, 10);
    if (!isNaN(amount) && amount > 0) {
      onAdd(amount);
      setInputValue('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const themeClasses = {
    border: `border-${theme.primary}-500/50`,
    shadow: `shadow-${theme.primary}-500/10`,
    text: `text-${theme.primary}-400`,
    buttonBg: `bg-${theme.primary}-600`,
    buttonHoverBg: `hover:bg-${theme.primary}-500`,
    ring: `focus:ring-${theme.primary}-500`,
  };

  return (
    <div className={`bg-gray-900 border ${themeClasses.border} rounded-xl p-6 shadow-2xl ${themeClasses.shadow} flex flex-col transition-all duration-300 hover:shadow-lg hover:shadow-${theme.primary}-500/20`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-bold ${themeClasses.text}`}>{gameName}</h2>
        <Icon className={`w-10 h-10 ${themeClasses.text}`} />
      </div>

      <div className="my-auto text-center">
        <p className="text-6xl font-black text-white tracking-tighter break-all">
          {new Intl.NumberFormat().format(value)}
        </p>
        <p className={`text-lg text-${theme.secondary}-400`}>{currencyName}</p>
      </div>

      <div className="mt-8">
        <label htmlFor={`add-${currencyName}`} className="block text-sm font-medium text-gray-400 mb-2">
          Simulate Add Value
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id={`add-${currencyName}`}
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Enter amount..."
            className={`flex-grow bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none ${themeClasses.ring} focus:ring-2 focus:border-transparent transition-colors`}
            min="1"
          />
          <button
            onClick={handleAdd}
            className={`w-full sm:w-auto ${themeClasses.buttonBg} ${themeClasses.buttonHoverBg} text-white font-bold py-2 px-6 rounded-md transition-transform duration-200 active:scale-95 disabled:bg-gray-600 disabled:cursor-not-allowed`}
            disabled={!inputValue || parseInt(inputValue, 10) <= 0}
          >
            Save Value
          </button>
        </div>
      </div>
    </div>
  );
};
