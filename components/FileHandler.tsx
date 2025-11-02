
import React, { useRef } from 'react';
import { Expense, Category } from '../types';
import UploadIcon from './icons/UploadIcon';
import DownloadIcon from './icons/DownloadIcon';

interface FileHandlerProps {
    expenses: Expense[];
    onFileUpload: (expenses: Expense[]) => void;
}

const FileHandler: React.FC<FileHandlerProps> = ({ expenses, onFileUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            try {
                const parsedExpenses = parseCSV(text);
                onFileUpload(parsedExpenses);
            } catch (error) {
                alert('Failed to parse CSV file. Please ensure it has headers: description,amount,category,date');
                console.error(error);
            }
        };
        reader.readAsText(file);
        // Reset file input to allow uploading the same file again
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    
    const parseCSV = (csvText: string): Expense[] => {
        const lines = csvText.trim().split('\n');
        const header = lines[0].split(',').map(h => h.trim().toLowerCase());
        const requiredHeaders = ['description', 'amount', 'category', 'date'];

        if (!requiredHeaders.every(h => header.includes(h))) {
            throw new Error('CSV must contain description, amount, category, and date columns.');
        }

        return lines.slice(1).map(line => {
            const values = line.split(',');
            const expenseData: any = {};
            header.forEach((col, index) => {
                expenseData[col] = values[index].trim();
            });

            const categoryValue = expenseData.category as keyof typeof Category;
            if (!Object.values(Category).includes(expenseData.category)) {
                console.warn(`Invalid category "${expenseData.category}" found, defaulting to 'Other'.`);
                expenseData.category = Category.Other;
            }

            return {
                id: crypto.randomUUID(),
                description: expenseData.description,
                amount: parseFloat(expenseData.amount),
                category: expenseData.category as Category,
                date: expenseData.date,
            };
        }).filter(e => e.description && !isNaN(e.amount) && e.date);
    };


    const exportToCSV = () => {
        if (expenses.length === 0) {
            alert("No expenses to export.");
            return;
        }

        const headers = ['id', 'description', 'amount', 'category', 'date'];
        const csvContent = [
            headers.join(','),
            ...expenses.map(e => [e.id, e.description, e.amount, e.category, e.date].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'expenses.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="space-y-4">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".csv"
                className="hidden"
            />
            <button
                onClick={triggerFileUpload}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-500 transition-colors"
            >
                <UploadIcon className="w-5 h-5 mr-2" />
                Import from CSV
            </button>
            <button
                onClick={exportToCSV}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-200 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-brand-500 transition-colors"
            >
                <DownloadIcon className="w-5 h-5 mr-2" />
                Export to CSV
            </button>
        </div>
    );
};

export default FileHandler;

