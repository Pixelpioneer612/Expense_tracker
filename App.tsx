
import React, { useState, useMemo } from 'react';
import { Expense, Category } from './types';
import Header from './components/Header';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import BudgetTracker from './components/BudgetTracker';
import CategoryPieChart from './components/CategoryPieChart';
import MonthlyBarChart from './components/MonthlyBarChart';
import FileHandler from './components/FileHandler';
import Card from './components/Card';

// Sample data for initial state
const getInitialExpenses = (): Expense[] => [
    { id: crypto.randomUUID(), description: 'Groceries', amount: 75.50, category: Category.Food, date: '2024-07-01' },
    { id: crypto.randomUUID(), description: 'Gas', amount: 40.00, category: Category.Transport, date: '2024-07-03' },
    { id: crypto.randomUUID(), description: 'Movie Tickets', amount: 30.00, category: Category.Entertainment, date: '2024-07-05' },
    { id: crypto.randomUUID(), description: 'T-shirt', amount: 25.00, category: Category.Shopping, date: '2024-07-06' },
    { id: crypto.randomUUID(), description: 'Internet Bill', amount: 60.00, category: Category.Bills, date: '2024-06-10' },
    { id: crypto.randomUUID(), description: 'Dinner Out', amount: 120.00, category: Category.Food, date: '2024-06-15' },
    { id: crypto.randomUUID(), description: 'Train pass', amount: 85.00, category: Category.Transport, date: '2024-06-20' },
];

const App: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>(getInitialExpenses());
    const [budget, setBudget] = useState<number>(1000);

    const addExpense = (expense: Omit<Expense, 'id'>) => {
        setExpenses(prevExpenses => [{ ...expense, id: crypto.randomUUID() }, ...prevExpenses]);
    };

    const deleteExpense = (id: string) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
    };
    
    const handleFileUpload = (newExpenses: Expense[]) => {
        setExpenses(prev => [...newExpenses, ...prev]);
    };

    const totalExpenses = useMemo(() => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    }, [expenses]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
            <Header />
            <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-8">
                        <BudgetTracker totalExpenses={totalExpenses} budget={budget} setBudget={setBudget} />
                        <Card title="Add New Expense">
                            <ExpenseForm addExpense={addExpense} />
                        </Card>
                        <Card title="Data Management">
                            <FileHandler expenses={expenses} onFileUpload={handleFileUpload} />
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Card title="Expenses by Category">
                                <CategoryPieChart expenses={expenses} />
                            </Card>
                            <Card title="Monthly Spending">
                                <MonthlyBarChart expenses={expenses} />
                            </Card>
                        </div>
                        <Card title="Recent Transactions">
                            <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;
