import axios from 'axios';
import {
  API_URL,
  fetchTodos,
  getNextPageParam,
  PAGE_SIZE,
} from '../../src/services/API';

jest.mock('axios');

describe('fetchTodos', () => {
  const mockResponse = [
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
    },
    {
      userId: 1,
      id: 4,
      title: 'et porro tempora',
      completed: true,
    },
    {
      userId: 1,
      id: 5,
      title: 'laboriosam mollitia et enim quasi adipisci quia provident illum',
      completed: false,
    },
    {
      userId: 1,
      id: 6,
      title: 'qui ullam ratione quibusdam voluptatem quia omnis',
      completed: false,
    },
    {
      userId: 1,
      id: 7,
      title: 'illo expedita consequatur quia in',
      completed: false,
    },
    {
      userId: 1,
      id: 8,
      title: 'quo adipisci enim quam ut ab',
      completed: true,
    },
    {
      userId: 1,
      id: 9,
      title: 'molestiae perspiciatis ipsa',
      completed: false,
    },
    {
      userId: 1,
      id: 10,
      title: 'illo est ratione doloremque quia maiores aut',
      completed: true,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch todos from the API', async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: mockResponse});
    const result = await fetchTodos({pageParam: 1});
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${API_URL}?_page=1&_limit=${PAGE_SIZE}`,
    );
    expect(result).toEqual(mockResponse);
  });
});

describe('getNextPageParam', () => {
  it('returns undefined when lastPage length is less than PAGE_SIZE', () => {
    const lastPage = [
      {
        id: 1,
        userId: 1,
        title: 'Test',
        completed: false,
        createdAt: '2022-05-07T00:00:00Z',
      },
    ];
    const allPages = [lastPage];
    const result = getNextPageParam(lastPage, allPages);
    expect(result).toBeUndefined();
  });

  it('returns next page number when lastPage length is equal to PAGE_SIZE', () => {
    const lastPage = new Array(PAGE_SIZE).fill({
      id: 1,
      userId: 1,
      title: 'Test',
      completed: false,
      createdAt: '2022-05-07T00:00:00Z',
    });
    const allPages = [lastPage];
    const result = getNextPageParam(lastPage, allPages);
    expect(result).toBe(2);
  });
});
