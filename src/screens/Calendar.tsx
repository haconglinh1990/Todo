import React, {useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {Calendar as CalendarView} from 'react-native-calendars';
import UpdateTodo from '../components/UpdateTodo';
import Modal from 'react-native-modal';
import {useTodoStore} from '../store/Store';
import {MarkedDates} from 'react-native-calendars/src/types';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const todos = useTodoStore(state => state.todos);

  const markedDates: MarkedDates = useMemo(
    () =>
      todos
        .map(todo => todo.createdAt)
        .filter(date => date)
        .reduce((acc: MarkedDates, date) => {
          acc[date] = {marked: true, dotColor: 'blue'};
          return acc;
        }, {}),
    [todos],
  );

  const handleDayPress = useCallback((day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <View>
      <CalendarView onDayPress={handleDayPress} markedDates={markedDates} />
      {modalVisible && (
        <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
          <UpdateTodo type={'Add'} onDone={closeModal} atDate={selectedDate} />
        </Modal>
      )}
    </View>
  );
};

export default Calendar;
