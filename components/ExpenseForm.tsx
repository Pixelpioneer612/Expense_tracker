
import React, { useState } from 'react';
import { Expense, Category } from '../types';
import PlusIcon from './icons/PlusIcon';

interface ExpenseFormProps {
    addExpense: (expense: Omit<Expense, 'id'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ addExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<Category>(Category.Food);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount || !date) {
            setError('All fields are required.');
            return;
        }
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid positive amount.');
            return;
        }

        addExpense({ description, amount: parsedAmount, category, date });
        setDescription('');
        setAmount('');
        setCategory(Category.Food);
        setDate(new Date().toISOString().split('T')[0]);
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400">Description</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm text-white"
                    placeholder="e.g. Coffee"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-400">Amount</label>
                <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm text-white"
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-400">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm text-white"
                >
                    {Object.values(Category).map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-400">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm text-white"
                />
            </div>
            <button
                type="submit"
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-500 transition-colors"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                Add Expense
            </button>
        </form>
    );
};

export default ExpenseForm;
