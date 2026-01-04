import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { useQuestion } from '@/hooks/useQuestion';
import { QuestionType } from '@/types/question';
import type { QuestionRequest, AnswerRequest } from '@/types/question';
import toast, { Toaster } from 'react-hot-toast';

const QuestionManagementPage = () => {
  const { loading, questions, fetchQuestions, createQuestion, updateQuestion, deleteQuestion } = useQuestion();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [content, setContent] = useState('');
  const [type, setType] = useState<QuestionType>(QuestionType.SINGLE_CHOICE);
  const [score, setScore] = useState('1');
  const [answers, setAnswers] = useState<AnswerRequest[]>([
    { content: '', isCorrect: false },
    { content: '', isCorrect: false },
  ]);

  // Fetch questions on mount and page change
  useEffect(() => {
    loadQuestions();
  }, [currentPage, itemsPerPage]);

  const loadQuestions = () => {
    fetchQuestions({ 
      page: currentPage - 1, 
      size: itemsPerPage, 
      sort: 'createdAt', 
      direction: 'DESC' 
    });
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { content: '', isCorrect: false }]);
  };

  const handleRemoveAnswer = (index: number) => {
    if (answers.length > 2) {
      setAnswers(answers.filter((_, i) => i !== index));
    } else {
      toast.error('At least 2 answers are required');
    }
  };

  const handleAnswerChange = (index: number, field: 'content' | 'isCorrect', value: string | boolean) => {
    const newAnswers = [...answers];
    newAnswers[index] = { ...newAnswers[index], [field]: value };
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (answers.length < 2) {
      toast.error('At least 2 answers are required');
      return;
    }

    const hasCorrectAnswer = answers.some(a => a.isCorrect);
    if (!hasCorrectAnswer) {
      toast.error('At least one answer must be marked as correct');
      return;
    }

    const questionData: QuestionRequest = {
      content,
      type,
      score: parseInt(score),
      answers: answers.filter(a => a.content.trim() !== ''),
    };

    try {
      if (editingId) {
        await updateQuestion(editingId, questionData);
      } else {
        await createQuestion(questionData);
      }
      resetForm();
      loadQuestions();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEdit = (id: string) => {
    const question = questions?.content.find(q => q.id === id);
    if (question) {
      setContent(question.content);
      setType(question.type);
      setScore(question.score.toString());
      setAnswers(question.answers.map(a => ({ content: a.content, isCorrect: a.isCorrect })));
      setEditingId(id);
      setIsFormOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(id);
        loadQuestions();
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  const resetForm = () => {
    setContent('');
    setType(QuestionType.SINGLE_CHOICE);
    setScore('1');
    setAnswers([
      { content: '', isCorrect: false },
      { content: '', isCorrect: false },
    ]);
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Question Management</h1>
          <Button 
            variant="primary" 
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? 'Close Form' : '+ Add New Question'}
          </Button>
        </div>

        {/* Create/Edit Form */}
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Question' : 'Create New Question'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Textarea
                  label="Question Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter question content"
                  rows={3}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as QuestionType)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value={QuestionType.SINGLE_CHOICE}>Single Choice</option>
                      <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
                    </select>
                  </div>
                  
                  <Input
                    label="Score"
                    type="number"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="Enter score"
                    min="1"
                    required
                  />
                </div>

                {/* Answers Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Answers (min 2 required)
                    </label>
                    <Button type="button" variant="secondary" onClick={handleAddAnswer}>
                      + Add Answer
                    </Button>
                  </div>

                  {answers.map((answer, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={answer.content}
                        onChange={(e) => handleAnswerChange(index, 'content', e.target.value)}
                        placeholder={`Answer ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                      <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                        <input
                          type="checkbox"
                          checked={answer.isCorrect}
                          onChange={(e) => handleAnswerChange(index, 'isCorrect', e.target.checked)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-gray-700">Correct</span>
                      </label>
                      {answers.length > 2 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAnswer(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Saving...' : editingId ? 'Update Question' : 'Create Question'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Questions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Answers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : questions && questions.content.length > 0 ? (
                questions.content.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md truncate">
                      {question.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.score}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.answers.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        question.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {question.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(question.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No questions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {questions && questions.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={questions.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuestionManagementPage;
