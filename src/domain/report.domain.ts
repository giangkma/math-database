import { Document } from 'mongoose';

export interface IReport extends Document {
    id: string;
    questionId: string;
    senders: string[];
}

export interface IPayloadCreate {
    senders: string[];
    questionId: string;
}

export interface IPayloadUpdate {
    senders: string[];
}
