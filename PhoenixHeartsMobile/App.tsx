import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

// Импортируем экраны
import UniverseScreen from './src/screens/UniverseScreen';
import ChatScreen from './src/screens/ChatScreen';
import ProfileScreen from 

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor="#000814" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: '#000814',
              borderTopColor: '#00FF88',
              height: 70,
              paddingBottom: 10,
              paddingTop: 10,
            },
            tabBarActiveTintColor: '#00FF88',
            tabBarInactiveTintColor: '#94A3B8',
            headerStyle: {
              backgroundColor: '#000814',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: '#00FF88',
            headerTitleStyle: {
              fontWeight: '700',
            },
            headerShown: false,
          }}
        >
          <Tab.Screen 
            name="Вселенная" 
            component={UniverseScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>🌐</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="Чат" 
            component={ChatScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>💬</Text>
              ),
            }}
          />
          <Tab.Screen 
            name="Профиль" 
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Text style={{ fontSize: size, color }}>👤</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}