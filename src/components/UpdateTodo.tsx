import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import moment from 'moment';
import ITodo from '../models/ITodo';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useTodoStore} from '../store/Store';

interface UpdateTodoProps {
  type: 'Add' | 'Edit';
  atDate?: string;
  todo?: ITodo;
  onDone: () => void;
}

const UpdateTodo = ({type, atDate, todo, onDone}: UpdateTodoProps) => {
  const {title, createdAt} = todo || {};
  const todos = useTodoStore(state => state.todos);
  const updateTodo = useTodoStore(state => state.updateTodo);
  const addTodo = useTodoStore(state => state.addTodo);
  const [newTitle, setNewTitle] = useState(title || 'New Todo');
  const [newDate, setNewDate] = useState(createdAt || atDate);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleConfirm = (date: Date) => {
    setShowDatePicker(false);
    setNewDate(date.toString());
  };
  const onDoneClick = () => {
    if (type === 'Edit') {
      if (todo && newTitle && newDate) {
        updateTodo({...todo, title: newTitle, createdAt: newDate});
      }
    } else {
      addTodo({
        id: todos.length > 0 ? Math.max(...todos.map(td => td.id)) + 1 : 1,
        userId: todos.length > 0 ? todos[todos.length - 1].userId + 1 : 1,
        title: newTitle,
        createdAt: newDate || new Date().toString(),
        completed: false,
      });
    }
    onDone();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{type} Todo</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.editView}>
          <Text style={styles.contentTitle}>Name:</Text>
          <TextInput
            style={styles.editName}
            value={newTitle}
            onChangeText={setNewTitle}
          />
        </View>

        <View style={styles.editView}>
          <Text style={styles.contentTitle}>Date:</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateView}>
            <Text style={styles.date}>
              {moment(newDate).format('h:mm a, DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Button title={'Done'} onPress={onDoneClick} />

      <DateTimePickerModal
        isVisible={showDatePicker}
        date={atDate ? new Date(atDate) : undefined}
        mode={type === 'Edit' ? 'datetime' : 'time'}
        onConfirm={handleConfirm}
        onCancel={() => setShowDatePicker(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E5E8',
    padding: 10,
  },
  headerTitle: {
    flexGrow: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 10,
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E5E8',
  },

  contentTitle: {
    fontSize: 12,
    width: 50,
  },

  editView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editName: {
    fontSize: 12,
    borderWidth: 1,
    flexGrow: 1,
    color: 'gray',
    borderColor: '#E6E5E8',
    padding: 8,
  },
  dateView: {
    borderWidth: 1,
    borderColor: '#E6E5E8',
    flexGrow: 1,
    padding: 8,
  },

  date: {
    fontSize: 12,
    color: 'blue',
  },
});

export default UpdateTodo;
