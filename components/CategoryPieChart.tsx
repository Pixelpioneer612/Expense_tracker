import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense, Category } from '../types';

interface CategoryPieChartProps {
    expenses: Expense[];
}

const COLORS = ['#0ea5e9', '#0284c7', '#38bdf8', '#7dd3fc', '#a855f7', '#d946ef', '#f472b6'];

const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ expenses }) => {
    const data = useMemo(() => {
        const categoryTotals = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {} as Record<Category, number>);

        return Object.entries(categoryTotals)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [expenses]);

    if (expenses.length === 0) {
        return <div className="flex items-center justify-center h-64 text-gray-400">No data to display</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1f2937', // bg-gray-800
                            borderColor: '#4b5563', // border-gray-600
                            color: '#d1d5db' // text-gray-300
                        }}
                        // Fix: The value from recharts Tooltip formatter can be a string.
                        // Coercing to a number before calling toFixed() makes it more robust and fixes the type error.
                        formatter={(value: any) => `$${Number(value).toFixed(2)}`}
                    />
                    <Legend iconType="circle" />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryPieChart;