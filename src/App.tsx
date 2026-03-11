import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WorkOrdersScreen from './screens/WorkOrdersScreen';

// Importando suas telas

// Nota: Crie um arquivo temporário para o Form ou aponte para o correto


const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="WorkOrders"
          screenOptions={{
            headerStyle: { backgroundColor: '#1976D2' },
            headerTintColor: '#fff',
          }}
        >
          <Stack.Screen 
            name="WorkOrders" 
            component={WorkOrdersScreen} 
            options={{ title: 'Ordens de Serviço' }}
          />
          {/* <Stack.Screen 
            name="WorkOrderForm" 
            component={WorkOrderForm} 
            options={{ title: 'Nova Ordem' }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;