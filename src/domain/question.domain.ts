import { Document } from 'mongoose';

export interface IQuestion extends Document {
    id: string;
    answer: string[];
    className: string;
    question: string;
    correctAnswer: string;
    chapter?: string;
}

export interface IQueryQuestion {
    className?: string;
    chapter?: string;
}

export interface IResponAddQuestion {
    success: boolean;
    total: number;
}
