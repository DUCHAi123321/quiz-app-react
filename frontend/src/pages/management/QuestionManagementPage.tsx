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

interface Question {
  id: string;
  content: string;
  type: string;
  answers: number;
  status: string;
}

interface Answer {
  id: string;
  content: string;
  isCorrect: string;
  status: string;
}

const QuestionManagementPage = () => {
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Form states
  const [questionContent, setQuestionContent] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [questionStatus, setQuestionStatus] = useState(false);

  // Answer form states
  const [answerDescription, setAnswerDescription] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(false);

  // Sample question data
  const questions: Question[] = [
    { id: '1', content: 'Who is the founder of the airplane?', type: 'Multiple Choice', answers: 4, status: 'Yes' },
    { id: '2', content: 'Who is the founder of the first virus After?', type: 'Multiple Choice', answers: 4, status: 'Yes' },
    { id: '3', content: 'Where is Viet Nam?', type: 'Multiple Choice', answers: 4, status: 'Yes' },
    { id: '4', content: 'What is the capital of France?', type: 'Single Choice', answers: 4, status: 'null' },
    { id: '5', content: 'Who is the founder of the alternating current?', type: 'Multiple Choice', answers: 4, status: 'null' },
    { id: '6', content: 'Where is Australia?', type: 'Multiple Choice', answers: 4, status: 'null' },
    { id: '7', content: 'Who is the founder of the X-Ray?', type: 'Multiple Choice', answers: 4, status: 'null' },
    { id: '8', content: 'Where is Taiwan?', type: 'Multiple Choice', answers: 4, status: 'null' },
    { id: '9', content: 'Where is the United States?', type: 'Multiple Choice', answers: 4, status: 'null' },
    { id: '10', content: 'Who is the founder of the scanning electron?', type: 'Multiple Choice', answers: 4, status: 'null' },
  ];

  // Sample answer data
  const answers: Answer[] = [
    { id: '1', content: 'Wright brothers', isCorrect: 'True', status: 'Yes' },
    { id: '2', content: 'Alexander Graham Bell', isCorrect: 'False', status: 'Yes' },
    { id: '3', content: 'Albert Einstein', isCorrect: 'False', status: 'Yes' },
    { id: '4', content: 'Charles Babbage', isCorrect: 'False', status: 'null' },
  ];

  const handleSearch = () => {
    console.log('Searching:', { searchName, searchType, searchStatus });
  };

  const handleClear = () => {
    setSearchName('');
    setSearchType('');
    setSearchStatus(false);
  };

  const handleShowAnswers = () => {
    console.log('Showing answers');
  };

  const handleSave = () => {
    console.log('Saving question:', {
      questionContent,
      questionType,
      questionStatus,
    });
  };

  const handleCancel = () => {
    setQuestionContent('');
    setQuestionType('');
    setQuestionStatus(false);
  };

  const handleSaveAnswer = () => {
    console.log('Saving answer:', {
      answerDescription,
      isCorrect,
      answerStatus,
    });
  };

  const handleCancelAnswer = () => {
    setAnswerDescription('');
    setIsCorrect(false);
    setAnswerStatus(false);
  };

  const handleEdit = (questionId: string) => {
    console.log('Edit question:', questionId);
  };

  const handleDelete = (questionId: string) => {
    console.log('Delete question:', questionId);
  };

  const handleEditAnswer = (answerId: string) => {
    console.log('Edit answer:', answerId);
  };

  const handleDeleteAnswer = (answerId: string) => {
    console.log('Delete answer:', answerId);
  };

  const totalPages = Math.ceil(questions.length / itemsPerPage);

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Question Management Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Question Management</h1>

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
                placeholder="Enter role name to search"
                className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select item</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="single-choice">Single Choice</option>
                <option value="true-false">True/False</option>
              </select>
            </div>
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={searchStatus}
                onChange={(e) => setSearchStatus(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
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
                    <td className="py-3 px-4 text-sm text-gray-700">{question.status}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(question.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
                        </button>
                        <button
                          onClick={() => handleDelete(question.id)}
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
            totalItems={questions.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>

        {/* Add Question Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Question</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <input
                type="text"
                value={questionContent}
                onChange={(e) => setQuestionContent(e.target.value)}
                placeholder="Enter question content"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Question Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Type
              </label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select question type</option>
                <option value="multiple-choice">Multiple Choice</option>
                <option value="single-choice">Single Choice</option>
                <option value="true-false">True/False</option>
              </select>
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
                checked={questionStatus}
                onChange={(e) => setQuestionStatus(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
          </div>

          {/* Show Answers Button */}
          <div className="flex justify-start gap-3 mt-6">
            <Button onClick={handleShowAnswers} icon={plusIcon} iconAlt="Show Answers" size="md">
              Show Answers
            </Button>
          </div>
        </div>

        {/* Answer List Table */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Answer List</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Content
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Is Correct
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
                {answers.map((answer) => (
                  <tr key={answer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-700">{answer.content}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{answer.isCorrect}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{answer.status}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditAnswer(answer.id)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <img src={editIcon} alt="Edit" className="w-5 h-5" style={{ filter: 'invert(47%) sepia(87%) saturate(2659%) hue-rotate(193deg) brightness(95%) contrast(101%)' }} />
                        </button>
                        <button
                          onClick={() => handleDeleteAnswer(answer.id)}
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

          {/* Add Button */}
          <div className="flex justify-end gap-3 mt-6">
            <Button icon={plusIcon} iconAlt="Add" size="md">
              Add
            </Button>
          </div>
        </div>

        {/* Add Answer Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Answer</h2>

          <div className="grid grid-cols-1 gap-4">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={answerDescription}
                onChange={(e) => setAnswerDescription(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Is Correct and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Is Correct
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isCorrect}
                  onChange={(e) => setIsCorrect(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={answerStatus}
                  onChange={(e) => setAnswerStatus(e.target.checked)}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={handleCancelAnswer} variant="secondary" icon={reloadIcon} iconAlt="Cancel" size="lg">
              Cancel
            </Button>
            <Button onClick={handleSaveAnswer} icon={saveIcon} iconAlt="Save" size="lg">
              Save
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default QuestionManagementPage;
