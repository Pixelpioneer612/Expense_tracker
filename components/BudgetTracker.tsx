
import React, { useState, useEffect } from 'react';

interface BudgetTrackerProps {
    totalExpenses: number;
    budget: number;
    setBudget: (budget: number) => void;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ totalExpenses, budget, setBudget }) => {
    const [localBudget, setLocalBudget] = useState(budget.toString());

    useEffect(() => {
        setLocalBudget(budget.toString());
    }, [budget]);

    const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalBudget(e.target.value);
    };

    const handleBudgetSet = () => {
        const newBudget = parseFloat(localBudget);
        if (!isNaN(newBudget) && newBudget > 0) {
            setBudget(newBudget);
        } else {
            setLocalBudget(budget.toString()); // Reset to old value if invalid
        }
    };
    
    const handleBlur = () => {
      handleBudgetSet();
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBudgetSet();
            (e.target as HTMLInputElement).blur();
        }
    }

    const percentage = budget > 0 ? (totalExpenses / budget) * 100 : 0;
    const remaining = budget - totalExpenses;

    let progressBarColor = 'bg-green-500';
    if (percentage > 75 && percentage <= 100) {
        progressBarColor = 'bg-yellow-500';
    } else if (percentage > 100) {
        progressBarColor = 'bg-red-500';
    }

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-200 mb-4">Budget Overview</h2>
            <div className="mb-4">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-400">Set Monthly Budget</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 sm:text-sm">$</span>
                    </div>
                    <input
                        type="number"
                        id="budget"
                        className="focus:ring-brand-500 focus:border-brand-500 block w-full pl-7 pr-12 sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white"
                        placeholder="0.00"
                        value={localBudget}
                        onChange={handleBudgetChange}
                        onBlur={handleBlur}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between font-medium">
                    <span className="text-gray-300">Spent:</span>
                    <span className="text-white">${totalExpenses.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-300">Remaining:</span>
                    <span className={remaining >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {remaining >= 0 ? `$${remaining.toFixed(2)}` : `-$${Math.abs(remaining).toFixed(2)}`}
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                        className={`${progressBarColor} h-2.5 rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                </div>
                {percentage > 100 && (
                    <p className="text-red-400 text-sm mt-2 text-center font-medium">
                        You've exceeded your budget by ${Math.abs(remaining).toFixed(2)}!
                    </p>
                )}
            </div>
        </div>
    );
};

export default BudgetTracker;
