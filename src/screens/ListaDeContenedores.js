import { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, Text, TouchableOpacity, View } from 'react-native';
import db from '../database/ContenedorDB';

export default function ListaContenedores({ navigation }) {
  const [contenedores, setContenedores] = useState([]);

  function cargarContenedores() {
    const resultado = db.getAllSync('SELECT * FROM contenedor');
    setContenedores(resultado);
  }
  function eliminarContenedor(id) {
    Alert.alert('Eliminar contenedor', '¿Estás seguro de eliminar este contenedor y todos los objetos guardados?', [
      { text: 'Cancelar' },
      {
        text: 'Eliminar', style: 'destructive', onPress: () => {
          db.runSync('DELETE FROM contenedor WHERE id = ?', [id]);
          cargarContenedores();
        }
      }
    ]);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarContenedores);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {contenedores.length === 0 ? (
        <Text>No hay contenedores</Text>
      ) : (
        <FlatList
          data={contenedores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 8 }}>

              <TouchableOpacity onPress={() => navigation.navigate('Detalle', { contenedor: item })}>
                <View style={{ padding: 12, backgroundColor: '#f2f2f2', borderRadius: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
                  <Text>{item.descripcion}</Text>
                  <Text style={{ color: '#777' }}>{item.ubicacion}</Text>
                </View>
              </TouchableOpacity>

              <Pressable
                onPress={() => eliminarContenedor(item.id)}
                style={{ backgroundColor: 'red', padding: 8, borderRadius: 6, marginTop: 4 }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Eliminar</Text>
              </Pressable>

            </View>
          )}
        />
      )}
      <Pressable
        onPress={() => navigation.navigate('FormContenedor')}
        style={{ position: 'absolute', bottom: 24, right: 24, backgroundColor: '#0319e4', padding: 16, borderRadius: 50 }}>
        <Text style={{ color: '#fff', fontSize: 24 }}>+</Text>
      </Pressable>
    </View>
  );
}