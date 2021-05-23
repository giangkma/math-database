import mongoose, { Model } from 'mongoose';
import { IReport } from '../domain/report.domain';

const ReportSchema = new mongoose.Schema({
    senders: {
        type: Array,
        required: true,
    },
    questionId: {
        type: String,
        required: true,
        trim: true,
    },
});

ReportSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    },
});

const Report: Model<IReport> = mongoose.model('Report', ReportSchema);

export default Report;
