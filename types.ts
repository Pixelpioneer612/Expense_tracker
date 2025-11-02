
export enum Category {
    Food = 'Food',
    Transport = 'Transport',
    Shopping = 'Shopping',
    Bills = 'Bills',
    Entertainment = 'Entertainment',
    Health = 'Health',
    Other = 'Other',
}

export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: Category;
    date: string; // YYYY-MM-DD
}
