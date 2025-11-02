
import React from 'react';
import { Expense } from '../types';
import TrashIcon from './icons/TrashIcon';

interface ExpenseListProps {
    expenses: Expense[];
    deleteExpense: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, deleteExpense }) => {
    return (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {expenses.length === 0 ? (
                <p className="text-gray-400 text-center">No expenses recorded yet.</p>
            ) : (
                [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(expense => (
                    <div key={expense.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <span className="text-xs font-mono bg-brand-900 text-brand-300 px-2 py-1 rounded">{new Date(expense.date).toLocaleDateString('en-CA')}</span>
                            </div>
                            <div>
                                <p className="font-medium text-white">{expense.description}</p>
                                <p className="text-sm text-gray-400">{expense.category}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <p className="font-semibold text-lg text-white">${expense.amount.toFixed(2)}</p>
                            <button
                                onClick={() => deleteExpense(expense.id)}
                                className="text-gray-400 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 rounded-full p-1 transition-colors"
                                aria-label={`Delete ${expense.description}`}
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ExpenseList;
