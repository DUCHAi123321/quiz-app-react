import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { useQuiz } from '@/hooks/useQuiz';
import type { QuizRequest } from '@/types/quiz';
import toast, { Toaster } from 'react-hot-toast';

const QuizManagementPage = () => {
  const { loading, quizzes, fetchQuizzes, createQuiz, updateQuiz, deleteQuiz } = useQuiz();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');

  // Fetch quizzes on mount and page change
  useEffect(() => {
    loadQuizzes();
  }, [currentPage, itemsPerPage]);

  const loadQuizzes = () => {
    fetchQuizzes({ 
      page: currentPage - 1, 
      size: itemsPerPage, 
      sort: 'createdAt', 
      direction: 'DESC' 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const quizData: QuizRequest = {
      title,
      description,
      durationMinutes: parseInt(durationMinutes),
    };

    try {
      if (editingId) {
        await updateQuiz(editingId, quizData);
      } else {
        await createQuiz(quizData);
      }
      resetForm();
      loadQuizzes();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEdit = (id: string) => {
    const quiz = quizzes?.content.find(q => q.id === id);
    if (quiz) {
      setTitle(quiz.title);
      setDescription(quiz.description);
      setDurationMinutes(quiz.durationMinutes.toString());
      setEditingId(id);
      setIsFormOpen(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      try {
        await deleteQuiz(id);
        loadQuizzes();
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDurationMinutes('');
    setEditingId(null);
    setIsFormOpen(false);
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Quiz Management</h1>
          <Button 
            variant="primary" 
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            {isFormOpen ? 'Close Form' : '+ Add New Quiz'}
          </Button>
        </div>

        {/* Create/Edit Form */}
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingId ? 'Edit Quiz' : 'Create New Quiz'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <Input
                  label="Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title"
                  required
                />
                
                <Textarea
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter quiz description"
                  rows={3}
                />
                
                <Input
                  label="Duration (minutes)"
                  type="number"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                  placeholder="Enter duration in minutes"
                  min="1"
                  required
                />
              </div>

              <div className="flex gap-4 mt-6">
                <Button type="submit" variant="primary" disabled={loading}>
                  {loading ? 'Saving...' : editingId ? 'Update Quiz' : 'Create Quiz'}
                </Button>
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Quizzes Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Questions
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
              ) : quizzes && quizzes.content.length > 0 ? (
                quizzes.content.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quiz.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {quiz.description || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.durationMinutes}m
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.questions.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quiz.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {quiz.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(quiz.id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(quiz.id)}
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
                    No quizzes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {quizzes && quizzes.totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={quizzes.totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuizManagementPage;
