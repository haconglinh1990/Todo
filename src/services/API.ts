import axios from 'axios';
import ITodo from '../models/ITodo';

export const API_URL = 'https://jsonplaceholder.typicode.com/todos';
export const PAGE_SIZE = 15;

export const fetchTodos = async ({pageParam = 1}) => {
  const response = await axios.get(
    `${API_URL}?_page=${pageParam}&_limit=${PAGE_SIZE}`,
  );
  const result: ITodo[] = response.data;
  return result;
};

export const getNextPageParam = (lastPage: ITodo[], allPages: ITodo[][]) => {
  if (lastPage.length < PAGE_SIZE) {
    return undefined;
  }
  return allPages.length + 1;
};
