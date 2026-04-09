import { useState } from 'react';
import { Alert, Pressable, Text, TextInput, View } from 'react-native';
import db from '../database/ContenedorDB';

export default function FormObjeto({ route, navigation }) {
  const { id_contenedor } = route.params;
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  function guardar() {
    if (!nombre || !descripcion) {
      Alert.alert('Campos incompletos', 'Todos los campos son obligatorios.');
      return;
    }
    db.runSync(
      'INSERT INTO objeto (nombre, descripcion, id_contenedor) VALUES (?, ?, ?)',
      [nombre, descripcion, id_contenedor]
    );
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput placeholder="Nombre del objeto" value={nombre} onChangeText={setNombre} style={inputStyle} />
      <TextInput placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} style={inputStyle} />
      <Pressable onPress={guardar} style={{ backgroundColor: '#2cda00', padding: 14, borderRadius: 8 }}>
        <Text style={{ color: '#000000', textAlign: 'center' }}>Guardar </Text>
      </Pressable>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, fontSize: 16
};