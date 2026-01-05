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
import editIcon from '@/assets/icons/edit-icon.png';
import deleteIcon from '@/assets/icons/delete-icon.png';
import plusIcon from '@/assets/icons/plus-icon.png';
import reloadIcon from '@/assets/icons/reload-icon.png';
import searchIcon from '@/assets/icons/search-icon.png';
import saveIcon from '@/assets/icons/save-icon.png';

const QuestionManagementPage = () => {
  const { loading, questions, fetchQuestions, createQuestion, updateQuestion, deleteQuestion } = useQuestion();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  
  // Search fields
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchActive, setSearchActive] = useState(true);
  
  // Question form fields
  const [questionContent, setQuestionContent] = useState('');
  const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.SINGLE_CHOICE);
  const [questionActive, setQuestionActive] = useState(true);
  const [showAnswerList, setShowAnswerList] = useState(false);
  
  // Answer form fields
  const [answerDescription, setAnswerDescription] = useState('');
  const [answerEmail, setAnswerEmail] = useState('');
  const [answerIsCorrect, setAnswerIsCorrect] = useState(true);
  const [answerActive, setAnswerActive] = useState(true);
  
  // Mock answers data (will be replaced with real data)
  const [answers, setAnswers] = useState<AnswerRequest[]>([
    { content: 'Wright Brothers', isCorrect: true },
    { content: 'Alexander Graham Bell', isCorrect: false },
    { content: 'Albert Einstein', isCorrect: false },
    { content: 'Charles Babbage', isCorrect: false },
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

  const handleSearch = () => {
    setCurrentPage(1);
    const searchParams: any = {
      page: 0,
      size: itemsPerPage,
      sort: 'createdAt',
      direction: 'DESC'
    };
    
    if (searchName && searchName.trim()) {
      searchParams.content = searchName.trim();
    }
    
    if (searchType) {
      searchParams.type = searchType;
    }
    
    searchParams.isActive = searchActive;
    
    fetchQuestions(searchParams);
  };

  const handleClearSearch = () => {
    setSearchName('');
    setSearchType('');
    setSearchActive(true);
    loadQuestions();
  };

  const handleEditQuestion = (id: string) => {
    const question = questions?.content.find(q => q.id === id);
    if (question) {
      setQuestionContent(question.content);
      setQuestionType(question.type);
      setQuestionActive(question.isActive);
      setEditingQuestionId(id);
      // Load answers if available
      if (question.answers && question.answers.length > 0) {
        setAnswers(question.answers.map(a => ({ content: a.content, isCorrect: a.isCorrect })));
        setShowAnswerList(true);
      }
    }
  };

  const handleCreateQuestion = async () => {
    if (!questionContent.trim()) {
      toast.error('Question content is required');
      return;
    }

    const questionData: QuestionRequest = {
      content: questionContent,
      type: questionType,
      score: 1,
      answers: answers,
    };

    try {
      if (editingQuestionId) {
        await updateQuestion(editingQuestionId, questionData);
      } else {
        await createQuestion(questionData);
      }
      resetQuestionForm();
      loadQuestions();
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (confirm('Are you sure you want to delete this question?')) {
      try {
        await deleteQuestion(id);
        loadQuestions();
      } catch (error) {
        // Error handled in hook
      }
    }
  };

  const handleSaveAnswer = () => {
    if (!answerDescription.trim()) {
      toast.error('Answer content is required');
      return;
    }
    
    const newAnswer: AnswerRequest = {
      content: answerDescription,
      isCorrect: answerIsCorrect,
    };
    setAnswers([...answers, newAnswer]);
    resetAnswerForm();
    toast.success('Answer added successfully');
  };

  const handleEditAnswer = (index: number) => {
    const answer = answers[index];
    setAnswerDescription(answer.content);
    setAnswerIsCorrect(answer.isCorrect || false);
  };

  const handleDeleteAnswer = (index: number) => {
    setAnswers(answers.filter((_, i) => i !== index));
  };

  const resetQuestionForm = () => {
    setQuestionContent('');
    setQuestionType(QuestionType.SINGLE_CHOICE);
    setQuestionActive(true);
    setEditingQuestionId(null);
    setShowAnswerList(false);
  };

  const resetAnswerForm = () => {
    setAnswerDescription('');
    setAnswerEmail('');
    setAnswerIsCorrect(true);
    setAnswerActive(true);
  };

  return (
    <AdminLayout>
      <Toaster position="top-right" />
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Question Management</h1>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Enter role name to search"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              >
                <option value="">Select type</option>
                <option value={QuestionType.SINGLE_CHOICE}>Single Choice</option>
                <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={searchActive}
                onChange={(e) => setSearchActive(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-sm font-medium text-gray-700">Status</span>
            </label>
          </div>

          <div className="flex justify-between">
            <Button 
              variant="primary" 
              onClick={handleSearch}
              icon={plusIcon}
              iconAlt="Create"
            >
              Create
            </Button>
            
            <div className="flex gap-2">
              <Button 
                variant="secondary" 
                onClick={handleClearSearch}
                icon={reloadIcon}
                iconAlt="Clear"
              >
                Clear
              </Button>
              <Button 
                variant="primary" 
                onClick={handleSearch}
                icon={searchIcon}
                iconAlt="Search"
              >
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Question List Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <h2 className="text-lg font-semibold p-4 border-b">Question List</h2>
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
                  Answers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : questions && questions.content.length > 0 ? (
                questions.content.map((question) => (
                  <tr key={question.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                      {question.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.type.replace('_', ' ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {question.answers.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={question.isActive ? 'text-green-600' : 'text-red-600'}>
                        {question.isActive ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditQuestion(question.id)}
                        className="inline-block mr-2"
                      >
                        <img 
                          src={editIcon} 
                          alt="Edit" 
                          className="w-5 h-5"
                          style={{ filter: 'invert(38%) sepia(95%) saturate(1789%) hue-rotate(193deg) brightness(95%) contrast(101%)' }}
                        />
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="inline-block"
                      >
                        <img 
                          src={deleteIcon} 
                          alt="Delete" 
                          className="w-5 h-5"
                          style={{ filter: 'invert(19%) sepia(98%) saturate(7466%) hue-rotate(359deg) brightness(95%) contrast(119%)' }}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No questions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {questions && questions.totalElements > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={questions?.totalPages || 0}
              totalItems={questions?.totalElements || 0}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          )}
        </div>

        {/* Add Question Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Add Question</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Textarea
                label="Content"
                value={questionContent}
                onChange={(e) => setQuestionContent(e.target.value)}
                placeholder="Enter question content"
                rows={3}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select question type</option>
                  <option value={QuestionType.SINGLE_CHOICE}>Single Choice</option>
                  <option value={QuestionType.MULTIPLE_CHOICE}>Multiple Choice</option>
                </select>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={questionActive}
                  onChange={(e) => setQuestionActive(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <Button 
                variant="primary" 
                onClick={() => setShowAnswerList(!showAnswerList)}
                icon={plusIcon}
                iconAlt="Show Answers"
                size="md"
              >
                Show Answers
              </Button>
              
              <div className="flex gap-2">
                <Button 
                  variant="secondary" 
                  onClick={resetQuestionForm}
                  size="md"
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleCreateQuestion}
                  icon={saveIcon}
                  iconAlt="Save"
                  size="md"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Answer List Table - Show when button clicked */}
        {showAnswerList && (
          <>
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">Answer List</h2>
                <Button 
                  variant="primary" 
                  onClick={() => {}}
                  icon={plusIcon}
                  iconAlt="Add"
                  size="sm"
                >
                  Add
                </Button>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Is Correct
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {answers.map((answer, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {answer.content}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                          {answer.isCorrect ? 'True' : 'False'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="text-green-600">Yes</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditAnswer(index)}
                          className="inline-block mr-2"
                        >
                          <img 
                            src={editIcon} 
                            alt="Edit" 
                            className="w-5 h-5"
                            style={{ filter: 'invert(38%) sepia(95%) saturate(1789%) hue-rotate(193deg) brightness(95%) contrast(101%)' }}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteAnswer(index)}
                          className="inline-block"
                        >
                          <img 
                            src={deleteIcon} 
                            alt="Delete" 
                            className="w-5 h-5"
                            style={{ filter: 'invert(19%) sepia(98%) saturate(7466%) hue-rotate(359deg) brightness(95%) contrast(119%)' }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Add Answer Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Add Answer</h2>
              <div className="space-y-4">
                <Textarea
                  label="Description"
                  value={answerDescription}
                  onChange={(e) => setAnswerDescription(e.target.value)}
                  placeholder="Enter your email"
                  rows={3}
                />

                <Input
                  label=""
                  value={answerEmail}
                  onChange={(e) => setAnswerEmail(e.target.value)}
                  placeholder="Enter your email"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={answerIsCorrect}
                        onChange={(e) => setAnswerIsCorrect(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Is Correct</span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={answerActive}
                        onChange={(e) => setAnswerActive(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="text-sm font-medium text-gray-700">Status</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button 
                    variant="secondary" 
                    onClick={resetAnswerForm}
                    size="md"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSaveAnswer}
                    icon={saveIcon}
                    iconAlt="Save"
                    size="md"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default QuestionManagementPage;
