import React, {useCallback, useEffect} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text} from 'react-native';
import TodoItem from '../components/TodoItem';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useTodoStore} from '../store/Store';
import {fetchTodos, getNextPageParam, PAGE_SIZE} from '../services/API';
import ITodo from '../models/ITodo';

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);
  const setTodos = useTodoStore(state => state.setTodos);
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery(['todos'], fetchTodos, {getNextPageParam});

  useEffect(() => {
    setTodos(data?.pages.flatMap(page => page) || []);
  }, [data, setTodos]);

  const renderFooter = () => {
    if (!isFetchingNextPage) {
      return null;
    }
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  };

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderItem = ({item}: {item: ITodo}) => <TodoItem todo={item} />;
  const keyExtractor = (item: ITodo, index: number) =>
    item.id.toString() + item.userId.toString() + index;

  return (
    <>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.7}
        ListFooterComponent={renderFooter}
        initialNumToRender={PAGE_SIZE}
        windowSize={PAGE_SIZE}
      />
      <Text style={styles.total}>Total in list: {todos.length}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
  },
  loadingIndicator: {
    flex: 1,
  },
  total: {
    padding: 8,
    backgroundColor: 'white',
  },
});
export default TodoList;
