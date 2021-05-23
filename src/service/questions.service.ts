import {
    IQuestion,
    IQueryQuestion,
    IResponAddQuestion,
} from '../domain/question.domain';
import Question from '../models/question.model';

const getAllQuestions = async (query: IQueryQuestion): Promise<IQuestion[]> => {
    const result = Question.find(query);
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const getQuestionById = async (id: string): Promise<IQuestion> => {
    const result = Question.findById(id);
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const addQuestion = async (
    arrayQuestion: IQuestion[],
): Promise<IResponAddQuestion> => {
    const result = [];
    arrayQuestion.map((item) => {
        const { className, question, correctAnswer, answer, chapter } = item;
        const res = Question.create({
            className: className,
            question: question,
            correctAnswer: correctAnswer,
            answer: answer,
            chapter: chapter || undefined,
        });
        result.push(res);
    });
    if (result.length === 0) throw 'Lỗi! Hãy kiểm tra lại các câu hỏi !';
    return { success: true, total: result.length };
};

const addQuestionsXlsx = async (
    arrayQuestion: IQuestion[],
): Promise<IResponAddQuestion> => {
    const result = [];
    arrayQuestion.map((question) => {
        const res = Question.create({
            question: question.question,
            answer: question.answer,
            correctAnswer: question.correctAnswer,
            className: question.className,
            chapter: question.chapter || undefined,
        });
        result.push(res);
    });
    if (result.length === 0) throw 'Lỗi! Hãy kiểm tra lại các câu hỏi !';
    return { success: true, total: result.length };
};

const editQuestion = async (
    id: string,
    payload: IQuestion,
): Promise<IQuestion> => {
    const result = Question.findByIdAndUpdate(id, payload, {
        new: true,
    });
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

const removeQuestion = async (id: string): Promise<IQuestion> => {
    const result = Question.findByIdAndDelete(id);
    if (!result) throw 'Đã xảy ra lỗi !';
    return result;
};

export default {
    getAllQuestions,
    getQuestionById,
    addQuestion,
    addQuestionsXlsx,
    editQuestion,
    removeQuestion,
};
