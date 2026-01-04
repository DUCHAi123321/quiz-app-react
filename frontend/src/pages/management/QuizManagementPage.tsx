import { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import Input from '@/components/Input';
import Textarea from '@/components/Textarea';
import { useQuiz } from '@/hooks/useQuiz';
import type { QuizRequest } from '@/types/quiz';
import toast, { Toaster } from 'react-hot-toast';
import editIcon from '@/assets/icons/edit-icon.png';
import deleteIcon from '@/assets/icons/delete-icon.png';
import plusIcon from '@/assets/icons/plus-icon.png';
import reloadIcon from '@/assets/icons/reload-icon.png';
import searchIcon from '@/assets/icons/search-icon.png';
import saveIcon from '@/assets/icons/save-icon.png';

const QuizManagementPage = () => {
  const { loading, quizzes, fetchQuizzes, createQuiz, updateQuiz, deleteQuiz } = useQuiz();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showQuestionList, setShowQuestionList] = useState(false);
  
  // Search filters
  const [searchName, setSearchName] = useState('');
  const [filterActive, setFilterActive] = useState(true);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [active, setActive] = useState(true);

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
      active,
      thumbnailUrl: thumbnailUrl || undefined,
      questionIds: [],
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
      setThumbnailUrl(quiz.thumbnailUrl || '');
      setDurationMinutes(quiz.durationMinutes.toString());
      setActive(quiz.active);
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
    setThumbnailUrl('');
    setDurationMinutes('');
    setActive(true);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleClearSearch = () => {
    setSearchName('');
    setFilterActive(true);
    setCurrentPage(1);
    loadQuizzes();
  };

  const handleSearch = () => {
    setCurrentPage(1);
    // TODO: Implement search functionality when backend API is ready
    console.log('Search:', { searchName, filterActive });
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6">
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Quiz Management</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter quiz title to search"
                className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <label className="flex items-center gap-2 h-9 px-4 rounded-md w-full">
                <input
                  type="checkbox"
                  checked={filterActive}
                  onChange={(e) => setFilterActive(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-between gap-3">
            <Button 
              variant="primary" 
              onClick={() => setIsFormOpen(!isFormOpen)}
              icon={plusIcon}
              iconAlt="Create"
              size="md"
            >
              Create
            </Button>
            
            <div className="flex gap-3">
              <Button 
                variant="secondary"
                onClick={handleClearSearch}
                icon={reloadIcon}
                iconAlt="Clear"
                size="md"
              >
                Clear
              </Button>
              <Button 
                variant="primary"
                onClick={handleSearch}
                icon={searchIcon}
                iconAlt="Search"
                size="md"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz List Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quiz List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Thumbnail
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-3 px-4 text-center text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : quizzes && quizzes.content.length > 0 ? (
                quizzes.content.map((quiz, index) => (
                  <tr key={quiz.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {quiz.thumbnailUrl ? (
                        <img src={quiz.thumbnailUrl} alt={quiz.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {quiz.title}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {quiz.description || '-'}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {quiz.durationMinutes}m
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      ?
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {quiz.active ? 'Yes' : 'No'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(quiz.id)}
                          className="text-blue-500 hover:text-blue-700"
                          title="Edit"
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(quiz.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-3 px-4 text-center text-sm text-gray-500">
                    No quizzes found
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={quizzes?.totalPages || 0}
            totalItems={quizzes?.totalElements || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        {/* Create/Edit Form */}
        {isFormOpen && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingId ? 'Edit Quiz' : 'Add Quiz'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter quiz description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    placeholder="Enter duration in minutes"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="Enter thumbnail URL"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={(e) => setActive(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
              </div>

              {/* Buttons - Show Question, Cancel and Save */}
              <div className="flex justify-between gap-3 mt-6">
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={() => setShowQuestionList(!showQuestionList)}
                  icon={plusIcon}
                  iconAlt="Show Question"
                  size="md"
                >
                  Show Question
                </Button>
                
                <div className="flex gap-3">
                  <Button type="button" variant="secondary" onClick={resetForm} icon={reloadIcon} iconAlt="Cancel" size="md">
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" disabled={loading} icon={saveIcon} iconAlt="Save" size="md">
                    {loading ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Question List Section */}
        {isFormOpen && showQuestionList && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Question List</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-50">
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Content</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Answers</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Order</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Sample data - replace with actual questions from quiz */}
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">Who is the inventor of the airplane?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">MultipleChoice</td>
                    <td className="py-3 px-4 text-sm text-gray-700">4</td>
                    <td className="py-3 px-4 text-sm text-gray-700">1</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Yes</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">Who is the inventor of the World Wide Web?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">MultipleChoice</td>
                    <td className="py-3 px-4 text-sm text-gray-700">4</td>
                    <td className="py-3 px-4 text-sm text-gray-700">2</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Yes</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">Where is Viet Nam?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">MultipleChoice</td>
                    <td className="py-3 px-4 text-sm text-gray-700">4</td>
                    <td className="py-3 px-4 text-sm text-gray-700">3</td>
                    <td className="py-3 px-4 text-sm text-gray-700">Yes</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">What is the capital of France?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">SingleChoice</td>
                    <td className="py-3 px-4 text-sm text-gray-700">4</td>
                    <td className="py-3 px-4 text-sm text-gray-700">4</td>
                    <td className="py-3 px-4 text-sm text-gray-700">cell</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                      </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">Who is the inventor of the alternating current?</td>
                    <td className="py-3 px-4 text-sm text-gray-700">MultipleChoice</td>
                    <td className="py-3 px-4 text-sm text-gray-700">4</td>
                    <td className="py-3 px-4 text-sm text-gray-700">5</td>
                    <td className="py-3 px-4 text-sm text-gray-700">cell</td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* Question List Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <Button 
                type="button" 
                variant="primary" 
                icon={plusIcon}
                iconAlt="Add"
                size="md"
              >
                Add
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                icon={saveIcon}
                iconAlt="Save"
                size="md"
              >
                Save
              </Button>
            </div>
          </div>
        )}

        {/* Add Quiz Section */}
        {isFormOpen && showQuestionList && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Add Quiz</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Question Type</option>
                  <option value="single">Single Choice</option>
                  <option value="multiple">Multiple Choice</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="text"
                  placeholder="Order"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Add Quiz Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <Button 
                type="button" 
                variant="secondary" 
                icon={reloadIcon}
                iconAlt="Cancel"
                size="lg"
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="primary" 
                icon={plusIcon}
                iconAlt="Add"
                size="lg"
              >
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuizManagementPage;
