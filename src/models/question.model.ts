import mongoose, { Model } from 'mongoose';
import { IQuestion } from '../domain/question.domain';

const QuestionSchema = new mongoose.Schema(
    {
        className: {
            type: String,
            required: true,
            trim: true,
        },
        chapter: {
            type: String,
            trim: true,
        },
        question: {
            type: String,
            required: true,
        },
        correctAnswer: {
            type: String,
            required: true,
        },
        answer: {
            type: Array,
            required: true,
        },
    },
    { versionKey: false },
);

QuestionSchema.set('toJSON', {
    transform: function (doc: Document, ret: any) {
        ret.id = ret._id;
        delete ret._id;
    },
});

const Question: Model<IQuestion> = mongoose.model('Question', QuestionSchema);

export default Question;
