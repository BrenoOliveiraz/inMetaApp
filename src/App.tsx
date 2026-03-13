import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkOrdersScreen from './screens/WorkOrdersScreen';
import WorkOrderFormScreen from './screens/WorkOrderFormScreen';
import { useSync } from "./hooks/useSync"
import WorkOrderEditScreen from './screens/WorkOrderEditScreen';


const Stack = createNativeStackNavigator();

function App() {

  useSync()
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WorkOrders"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#1976D2"
            },

            headerTintColor: "#fff",

            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "700"
            },

            headerShadowVisible: false,

            headerTitleAlign: "center"
          }}
        >
          <Stack.Screen
            name="WorkOrders"
            component={WorkOrdersScreen}
            options={{ title: 'Ordens de Serviço' }}
          />
          <Stack.Screen
            name="WorkOrderForm"
            component={WorkOrderFormScreen}
            options={{ title: 'Abrir Ticket' }}
          />
          <Stack.Screen
            name="WorkOrderEditScreen"
            component={WorkOrderEditScreen}
            options={{ title: 'Editar Ticket' }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;