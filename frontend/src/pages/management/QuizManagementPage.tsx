import { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import Button from '@/components/Button';
import Pagination from '@/components/Pagination';
import plusIcon from '@/assets/icons/plus-icon.png';
import reloadIcon from '@/assets/icons/reload-icon.png';
import searchIcon from '@/assets/icons/search-icon.png';
import editIcon from '@/assets/icons/edit-icon.png';
import deleteIcon from '@/assets/icons/delete-icon.png';
import saveIcon from '@/assets/icons/save-icon.png';
import map1 from '@/assets/images/map.png';
import map2 from '@/assets/images/map2.png';
import map3 from '@/assets/images/map3.png';

interface Quiz {
  id: string;
  number: string;
  image: string;
  title: string;
  description: string;
  duration: string;
  questions: number;
  status: boolean;
}

interface Question {
  id: string;
  content: string;
  type: string;
  answers: number;
  order: number;
  status: string;
}

const QuizManagementPage = () => {
  const [searchName, setSearchName] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Form states
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDetail, setQuizDetail] = useState('');
  const [quizDuration, setQuizDuration] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [status, setStatus] = useState(false);

  // Question form states
  const [questionType, setQuestionType] = useState('');
  const [questionOrder, setQuestionOrder] = useState('');

  // Sample quiz data
  const quizzes: Quiz[] = [
    {
      id: '1',
      number: '1',
      image: map1,
      title: 'Capitals of Country',
      description: 'Test your knowledge of country capitals',
      duration: '15m',
      questions: 7,
      status: true,
    },
    {
      id: '2',
      number: '2',
      image: map2,
      title: 'Inventors and Inventions',
      description: 'Test your knowledge of inventors and their inventions',
      duration: '20m',
      questions: 10,
      status: true,
    },
    {
      id: '3',
      number: '3',
      image: map3,
      title: 'Countries of the World',
      description: 'Test your knowledge of countries',
      duration: '15m',
      questions: 10,
      status: true,
    },
  ];

  // Sample question data
  const questions: Question[] = [
    { id: '1', content: 'Who is the founder of the airplane?', type: 'Multiple Choice', answers: 4, order: 1, status: 'Yes' },
    { id: '2', content: 'Who is the founder of the first virus After?', type: 'Multiple Choice', answers: 4, order: 2, status: 'Yes' },
    { id: '3', content: 'Where is Viet Nam?', type: 'Multiple Choice', answers: 4, order: 3, status: 'Yes' },
    { id: '4', content: 'What is the capital of France?', type: 'True/False', answers: 4, order: 4, status: 'null' },
    { id: '5', content: 'Who is the founder of the alternating current?', type: 'Multiple Choice', answers: 4, order: 5, status: 'null' },
    { id: '6', content: 'Where is Australia?', type: 'Multiple Choice', answers: 4, order: 6, status: 'null' },
    { id: '7', content: 'Who is the founder of the X-Ray?', type: 'Multiple Choice', answers: 4, order: 7, status: 'null' },
    { id: '8', content: 'Where is Taiwan?', type: 'Multiple Choice', answers: 4, order: 8, status: 'null' },
    { id: '9', content: 'Where is the United States?', type: 'Multiple Choice', answers: 4, order: 9, status: 'null' },
    { id: '10', content: 'Who is the founder of the scanning electron?', type: 'Multiple Choice', answers: 4, order: 10, status: 'null' },
  ];

  const handleSearch = () => {
    console.log('Searching:', { searchName, searchStatus });
  };

  const handleClear = () => {
    setSearchName('');
    setSearchStatus(false);
  };

  const handleSaveQuestions = () => {
    console.log('Saving questions');
  };

  const handleSave = () => {
    console.log('Saving quiz:', {
      quizTitle,
      quizDetail,
      quizDuration,
      thumbnailUrl,
      status,
    });
  };

  const handleCancel = () => {
    setQuizTitle('');
    setQuizDetail('');
    setQuizDuration('');
    setThumbnailUrl('');
    setStatus(false);
  };

  const handleAddQuestion = () => {
    console.log('Adding question:', { questionType, questionOrder });
  };

  const handleCancelQuestion = () => {
    setQuestionType('');
    setQuestionOrder('');
  };

  const handleEdit = (quizId: string) => {
    console.log('Edit quiz:', quizId);
  };

  const handleDelete = (quizId: string) => {
    console.log('Delete quiz:', quizId);
  };

  const handleDeleteQuestion = (questionId: string) => {
    console.log('Delete question:', questionId);
  };

  const totalPages = Math.ceil(quizzes.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Quiz Management Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Quiz Management</h1>

          {/* Search Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter quiz name to search"
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
                  checked={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between gap-3">
            <Button icon={plusIcon} iconAlt="Create" size="md">
              Create
            </Button>
            <div className="flex gap-3">
              <Button onClick={handleClear} variant="secondary" icon={reloadIcon} iconAlt="Clear" size="md">
                Clear
              </Button>
              <Button onClick={handleSearch} icon={searchIcon} iconAlt="Search" size="md">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz List Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quiz List</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Number
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
                {quizzes.map((quiz) => (
                  <tr key={quiz.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <img src={quiz.image} alt={quiz.title} className="w-12 h-12 object-cover rounded" />
                        <span>{quiz.number}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">{quiz.title}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{quiz.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{quiz.duration}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{quiz.questions}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {quiz.status ? 'Yes' : 'No'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(quiz.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(quiz.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={quizzes.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        {/* Add Quiz Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Quiz</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Info Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Info
              </label>
              <input
                type="text"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Enter quiz title"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <input
                type="text"
                value={quizDetail}
                onChange={(e) => setQuizDetail(e.target.value)}
                placeholder="Enter quiz detail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Banner Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner
              </label>
              <input
                type="text"
                value={quizDuration}
                onChange={(e) => setQuizDuration(e.target.value)}
                placeholder="Enter quiz duration"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
              />
              <input
                type="text"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Enter quiz thumbnail URL"
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
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>

          {/* Save Questions Button */}
          <div className="flex justify-start gap-3 mt-6">
            <Button onClick={handleSaveQuestions} icon={saveIcon} iconAlt="Save Questions" size="md">
              Save Questions
            </Button>
          </div>
        </div>

        {/* Question List Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Question List</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Content
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Answers
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Order
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
                {questions.map((question) => (
                  <tr key={question.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{question.content}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{question.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{question.answers}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{question.order}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{question.status}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <img src={deleteIcon} alt="Delete" className="w-5 h-5" style={{ filter: 'invert(27%) sepia(98%) saturate(7426%) hue-rotate(358deg) brightness(95%) contrast(118%)' }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <Button icon={plusIcon} iconAlt="Add" size="md">
              Add
            </Button>
            <Button onClick={handleSave} icon={saveIcon} iconAlt="Save" size="md">
              Save
            </Button>
          </div>
        </div>

        {/* Add Quiz Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Quiz</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Question Type</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="short-answer">Short Answer</option>
              </select>
            </div>

            {/* Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="text"
                value={questionOrder}
                onChange={(e) => setQuestionOrder(e.target.value)}
                placeholder="Enter order of question in quiz"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={handleCancelQuestion} variant="secondary" icon={reloadIcon} iconAlt="Cancel" size="lg">
              Cancel
            </Button>
            <Button onClick={handleAddQuestion} icon={plusIcon} iconAlt="Add" size="lg">
              Add
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuizManagementPage;
