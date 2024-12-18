import instance from '.';

// Get all quiz questions
export const getAllQuizQuestions = async () => {
  const response = await instance.get('/question/getall');
  return response.data;
};

// Get quiz question by ID
export const getQuizQuestionById = async (questionId) => {
  const response = await instance.get('/question/get', {
    data: { question_id: questionId },
  });
  return response.data;
};

// Add quiz question (parent only)
export const addQuizQuestion = async (questionData) => {
  const response = await instance.post('/question/add', questionData);
  return response.data;
};

// Submit quiz attempt (child only)
export const submitQuizAttempt = async (questionId, selectedOption) => {
  const response = await instance.post('/attempt/submit', {
    question_id: questionId,
    selectedOption,
  });
  return response.data;
};

// Get attempts by question ID
export const getAttemptsByQuestionId = async (questionId) => {
  const response = await instance.get(`/attempt/question/${questionId}`);
  return response.data;
};

// Get all attempts
export const getAllAttempts = async () => {
  const response = await instance.get('/attempt/all');
  return response.data;
};

// Get success rate for question
export const getQuestionSuccessRate = async (questionId) => {
  const response = await instance.get(`/attempt/stats/success-rate/${questionId}`);
  return response.data;
};

// Get total rewards from quizzes
export const getTotalQuizRewards = async () => {
  const response = await instance.get('/attempt/stats/total-rewards');
  return response.data;
};
