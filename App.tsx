import React from 'react';
import TodoList from './src/screens/TodoList';
import Calendar from './src/screens/Calendar';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/AntDesign';
const Tab = createBottomTabNavigator();

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="TodoList"
            component={TodoList}
            options={{
              headerTitleAlign: 'center',
              tabBarIcon: ({focused}) => (
                <Icon
                  name={'bars'}
                  size={22}
                  color={focused ? '#00A859' : 'grey'}
                />
              ),
            }}
          />
          <Tab.Screen
            name="CalendarView"
            component={Calendar}
            options={{
              headerTitleAlign: 'center',
              tabBarIcon: ({focused}) => (
                <Icon
                  name={'calendar'}
                  size={22}
                  color={focused ? '#00A859' : 'grey'}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
