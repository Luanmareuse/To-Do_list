
import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, FlatList, Image, TouchableOpacity} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('tarefas').then(dados => {
      if (dados) setTarefas(JSON.parse(dados));
    });
  }, []);

  const salvar = async (lista) => {
    setTarefas(lista);
    await AsyncStorage.setItem('tarefas', JSON.stringify(lista));
  };

  const adicionar = () => {
    if (!input.trim()) return;

    salvar([
      ...tarefas,
      { id: Date.now().toString(), texto: input }
    ]);

    setInput('');
  };

  const excluir = (id) => {
    salvar(tarefas.filter(tarefa => tarefa.id !== id));
  };

  return (
    <View style={{ padding: 30, marginTop: 30 }}>
      <Text style={{ fontSize: 25 }}>To-Do List</Text>

      <TextInput
        placeholder="Digite uma tarefa"
        value={input}
        onChangeText={setInput}
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10
        }}
      />

      <Button title="Adicionar" onPress={adicionar} />

      <FlatList
        data={tarefas}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10
            }}
          >
            <Text>{item.texto}</Text>

            <TouchableOpacity
              onPress={() => excluir(item.id)}
            >
              <Image
                source={require('./Fotos/Calixto.png')}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
