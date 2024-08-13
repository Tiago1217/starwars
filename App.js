import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, ImageBackground, StyleSheet, Text, View } from 'react-native';

// Função assíncrona para buscar dados da API
const request = async (callback) => {
  try {
    const response = await fetch('https://swapi.dev/api/starships/');
    const parsed = await response.json();
    callback(parsed.results);
  } catch (error) {
    console.error("Erro ao buscar dados da API: ", error);
  }
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);

  // Função para renderizar cada item da lista
  const renderItem = ({ item }) => (
    <ImageBackground
      source={require('./assets/star.jpg')} // Caminho para a imagem de fundo
      style={styles.itemContainer}
    >
      <Text style={styles.itemText}>Name: {item.name}</Text>
      <Text style={styles.itemText}>Model: {item.model}</Text>
      <Text style={styles.itemText}>Manufacturer: {item.manufacturer}</Text>
    </ImageBackground>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usando API do STAR WARS</Text>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 20,
    alignContent:'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop: 15,
    color: 'white',
  },
  itemContainer: {
    width: '100%', // Ajuste o tamanho conforme necessário
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'center', // Centraliza o conteúdo dentro do ImageBackground
    alignItems: '', // Centraliza o conteúdo horizontalmente
    height: 150, // Defina uma altura para o contêiner do item
  },
  itemText: {
    fontSize: 16,
    color: 'white', // Certifique-se de que o texto seja legível sobre a imagem de fundo
  },
});
