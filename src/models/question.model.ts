import mongoose, { Model } from 'mongoose';
import { IQuestion } from '../domain/question.domain';

const QuestionSchema = new mongoose.Schema({
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
});

QuestionSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

const Question: Model<IQuestion> = mongoose.model('Question', QuestionSchema);

export default Question;
