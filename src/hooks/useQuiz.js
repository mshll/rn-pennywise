import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllQuizQuestions,
  getQuizQuestionById,
  addQuizQuestion,
  submitQuizAttempt,
  getAttemptsByQuestionId,
  getAllAttempts,
  getQuestionSuccessRate,
  getTotalQuizRewards,
} from '../api/quiz';
import { useToast } from '../components/Toast';

// Get all quiz questions
export const useQuizQuestions = () => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['quizQuestions'],
    queryFn: getAllQuizQuestions,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch quiz questions', 'error');
    },
  });
};

// Get quiz question by ID
export const useQuizQuestion = (questionId) => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['quizQuestion', questionId],
    queryFn: () => getQuizQuestionById(questionId),
    enabled: !!questionId,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch quiz question', 'error');
    },
  });
};

// Add quiz question (parent only)
export const useAddQuizQuestion = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: addQuizQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries(['quizQuestions']);
      showToast('Quiz question added successfully!');
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to add quiz question', 'error');
    },
  });
};

// Submit quiz attempt (child only)
export const useSubmitQuizAttempt = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: ({ questionId, selectedOption }) => submitQuizAttempt(questionId, selectedOption),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['quizAttempts']);
      queryClient.invalidateQueries(['childProfile']); // Refresh balance
      // if (data.correct) {
      //   showToast(`Correct! You earned ${data.rewardAmount} coins! 🎉`);
      // } else {
      //   showToast(`Incorrect. The correct answer was ${data.correctOption}. Try again!`, 'error');
      // }
      return data;
    },
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to submit quiz attempt', 'error');
      console.log(error);
    },
  });
};

// Get attempts by question ID
export const useQuestionAttempts = (questionId) => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['quizAttempts', questionId],
    queryFn: () => getAttemptsByQuestionId(questionId),
    enabled: !!questionId,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch quiz attempts', 'error');
    },
  });
};

// Get all attempts
export const useAllAttempts = () => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['quizAttempts'],
    queryFn: getAllAttempts,
    staleTime: 0, // Always fetch fresh data
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch quiz attempts', 'error');
    },
  });
};

// Get success rate for question
export const useQuestionSuccessRate = (questionId) => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['quizSuccessRate', questionId],
    queryFn: () => getQuestionSuccessRate(questionId),
    enabled: !!questionId,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch success rate', 'error');
    },
  });
};

// Get total rewards from quizzes
export const useTotalQuizRewards = () => {
  const { showToast } = useToast();

  return useQuery({
    queryKey: ['quizTotalRewards'],
    queryFn: getTotalQuizRewards,
    onError: (error) => {
      showToast(error?.response?.data?.message || 'Failed to fetch total rewards', 'error');
    },
  });
};
