import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import db from '../database/ContenedorDB';

export default function DetalleContenedor({ route, navigation }) {
  const { contenedor } = route.params;
  const [objetos, setObjetos] = useState([]);

  function cargarObjetos() {
    const resultado = db.getAllSync('SELECT * FROM objeto WHERE id_contenedor = ?', [contenedor.id]);
    setObjetos(resultado);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarObjetos);
    return unsubscribe;
  }, [navigation]);

  function eliminarObjeto(id) {
    Alert.alert('Eliminar objeto', '¿Estás seguro?', [
      { text: 'Cancelar' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        db.runSync('DELETE FROM objeto WHERE id = ?', [id]);
        cargarObjetos();
      }}
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{contenedor.nombre}</Text>
      <Text>{contenedor.descripcion}</Text>
      <Text style={{ color: '#777', marginBottom: 16 }}> {contenedor.ubicacion}</Text>

      {objetos.length === 0 ? (
        <Text> Contenedor vacío </Text>
      ) : (
        <FlatList
          data={objetos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, backgroundColor: '#f9f9f9', marginBottom: 6, borderRadius: 8 }}>
              <View>
                <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
                <Text>{item.descripcion}</Text>
              </View>
              <TouchableOpacity onPress={() => eliminarObjeto(item.id)}>
                <Text style={{ color: 'red', fontSize: 18 }}>✕</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Pressable
        onPress={() => navigation.navigate('FormObjeto', { id_contenedor: contenedor.id })}
        style={{ position: 'absolute', bottom: 24, right: 24, backgroundColor: '#0319e4', padding: 16, borderRadius: 50 }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>+</Text>
      </Pressable>
    </View>
  );
}