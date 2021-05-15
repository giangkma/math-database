const mongoose = require('mongoose');

const ReportSchema = mongoose.Schema({
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

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
