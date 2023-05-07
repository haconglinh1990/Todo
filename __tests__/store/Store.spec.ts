import {renderHook, act} from '@testing-library/react-hooks';
import {useTodoStore} from '../../src/store/Store';

describe('useTodoStore', () => {
  it('should initialize todos to an empty array', () => {
    const {result} = renderHook(() => useTodoStore());
    expect(result.current.todos).toEqual([]);
  });

  it('should add a todo to the list', () => {
    const {result} = renderHook(() => useTodoStore());
    act(() => {
      const todo = {
        id: 1,
        userId: 1,
        title: 'Test Todo',
        completed: false,
        createdAt: '2023-05-07',
      };
      result.current.addTodo(todo);
    });
    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].title).toBe('Test Todo');
  });

  it('should update a todo in the list', () => {
    const {result} = renderHook(() => useTodoStore());
    act(() => {
      const todo = {
        id: 2,
        userId: 2,
        title: 'Test Todo 2',
        completed: false,
        createdAt: '2023-05-08',
      };
      result.current.addTodo(todo);
    });
    const [todo] = result.current.todos;
    act(() => {
      result.current.updateTodo({
        ...todo,
        title: 'Test Todo 2 Update',
        createdAt: '2023-05-09',
      });
    });
    expect(result.current.todos[0].title).toBe('Test Todo 2 Update');
    expect(result.current.todos[0].createdAt).toBe('2023-05-09');
  });

  it('should delete a todo from the list', () => {
    const {result} = renderHook(() => useTodoStore());
    act(() => {
      const todo = {
        id: 3,
        userId: 3,
        title: 'Test Todo 3',
        completed: false,
        createdAt: '2023-05-10',
      };
      result.current.addTodo(todo);
    });
    act(() => {
      result.current.deleteTodo(3);
    });
    expect(result.current.todos.find(td => td.id === 3)).toBe(undefined);
  });
});
