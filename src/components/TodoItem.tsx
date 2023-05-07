import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';
import ITodo from '../models/ITodo';
import UpdateTodo from './UpdateTodo';
import Modal from 'react-native-modal';
import {useTodoStore} from '../store/Store';

type TodoItemProps = {
  todo: ITodo;
};

const TodoItem = ({todo}: TodoItemProps) => {
  const {id, title, completed, createdAt, userId} = todo;
  const [modalVisible, setModalVisible] = useState(false);
  const updateTodo = useTodoStore(state => state.updateTodo);
  const deleteTodo = useTodoStore(state => state.deleteTodo);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onMarkCompleted = useCallback(() => {
    updateTodo({...todo, completed: !completed});
  }, [completed, todo]);

  const onDeleteTodo = useCallback(() => {
    deleteTodo(id);
  }, [id]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.checkedBtn} onPress={onMarkCompleted}>
        <Icon
          name={completed ? 'checkcircle' : 'checkcircleo'}
          size={22}
          color={completed ? '#00A859' : '#999'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[styles.headerTitle, completed && styles.completed]}
          numberOfLines={2}>
          {`${title.charAt(0).toUpperCase() + title.slice(1)}`}
        </Text>

        {createdAt && (
          <Text style={styles.date}>
            {moment(createdAt).format('h:mm a, DD/MM/YYYY')}
          </Text>
        )}

        <Text style={styles.date}>User: {userId}</Text>

        {modalVisible && (
          <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
            <UpdateTodo type={'Edit'} todo={todo} onDone={closeModal} />
          </Modal>
        )}
      </View>
      <View style={styles.right}>
        <TouchableOpacity style={styles.closeBtn} onPress={openModal}>
          <Icon name={'edit'} size={14} color={'#999'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeBtn} onPress={onDeleteTodo}>
          <Icon name="delete" size={14} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    height: 70,
    borderRadius: 8,
    marginBottom: 8,
    marginHorizontal: 8,

    borderWidth: 1,
    borderColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 4,
    width: '100%',
    flexShrink: 1,
  },
  right: {
    flexDirection: 'row',
  },
  completed: {
    textDecorationLine: 'line-through',
  },
  checkedBtn: {
    justifyContent: 'center',
    padding: 12,
  },
  closeBtn: {
    justifyContent: 'flex-start',
    padding: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  editName: {
    backgroundColor: '#e6e0e0',
    fontSize: 14,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default TodoItem;
