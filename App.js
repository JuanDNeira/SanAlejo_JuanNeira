import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { initDB } from './src/database/ContenedorDB';
import DetalleContenedor from './src/screens/DetallesDelContenedor';
import FormObjeto from './src/screens/FormObjeto';
import FormContenedor from './src/screens/FormularioDelContenedor';
import ListaContenedores from './src/screens/ListaDeContenedores';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => { initDB(); }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista" component={ListaContenedores} options={{ title: 'San Alejo' }} />
        <Stack.Screen name="FormContenedor" component={FormContenedor} options={{ title: 'Nuevo contenedor' }} />
        <Stack.Screen name="Detalle" component={DetalleContenedor} options={{ title: 'Detalle' }} />
        <Stack.Screen name="FormObjeto" component={FormObjeto} options={{ title: 'Nuevo objeto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}