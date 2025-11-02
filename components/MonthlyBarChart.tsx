
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense } from '../types';

interface MonthlyBarChartProps {
    expenses: Expense[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ expenses }) => {
    const data = useMemo(() => {
        const monthlyTotals: { [key: string]: number } = {};
        
        expenses.forEach(expense => {
            const date = new Date(expense.date);
            const month = date.toLocaleString('default', { month: 'short', year: '2-digit' });
            monthlyTotals[month] = (monthlyTotals[month] || 0) + expense.amount;
        });

        const sortedMonths = Object.keys(monthlyTotals).sort((a, b) => {
            const [monthA, yearA] = a.split(' ');
            const [monthB, yearB] = b.split(' ');
            const dateA = new Date(`01 ${monthA} 20${yearA}`);
            const dateB = new Date(`01 ${monthB} 20${yearB}`);
            return dateA.getTime() - dateB.getTime();
        });

        return sortedMonths.map(month => ({
            name: month,
            spending: monthlyTotals[month],
        }));

    }, [expenses]);

    if (expenses.length === 0) {
        return <div className="flex items-center justify-center h-64 text-gray-400">No data to display</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
                    <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                    <Tooltip
                        cursor={{ fill: 'rgba(107, 114, 128, 0.2)' }}
                        contentStyle={{
                            backgroundColor: '#1f2937',
                            borderColor: '#4b5563',
                        }}
                        formatter={(value: number) => `$${value.toFixed(2)}`}
                    />
                    <Legend />
                    <Bar dataKey="spending" fill="#0ea5e9" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyBarChart;
