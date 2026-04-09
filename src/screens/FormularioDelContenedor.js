import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import db from '../database/ContenedorDB';

export default function FormContenedor({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');

  function guardar() {
    if (!nombre || !descripcion || !ubicacion) {
      Alert.alert('Campos incompletos', 'Todos los campos son obligatorios.');
      return;
    }
    db.runSync(
      'INSERT INTO contenedor (nombre, descripcion, ubicacion) VALUES (?, ?, ?)',
      [nombre, descripcion, ubicacion]
    );
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput placeholder="Nombre" value={nombre} onChangeText={setNombre} style={inputStyle} />
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={inputStyle} />
      <TextInput placeholder="Ubicación" value={ubicacion} onChangeText={setUbicacion} style={inputStyle} />
      <Pressable onPress={guardar} style={{ backgroundColor: '#2bff00', padding: 14, borderRadius: 8 }}>
        <Text style={{ color: '#000000', textAlign: 'center' }}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16
};