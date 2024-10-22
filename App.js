import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { firestore, collection, addDoc, deleteDoc, doc, query, getDocs, orderBy, ITEMS } from './firebase/Config';
import { serverTimestamp } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ShoppingList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const q = query(collection(firestore, ITEMS), orderBy('created', 'desc'));
    const snapshot = await getDocs(q);
    const fetchedItems = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setItems(fetchedItems);
  };

  const addItem = async () => {
    if (newItem.trim()) {
      await addDoc(collection(firestore, ITEMS), {
        name: newItem,
        created: serverTimestamp(),
      });
      setNewItem('');
      fetchItems();
    }
  };

  const deleteItem = async (id) => {
    await deleteDoc(doc(firestore, ITEMS, id));
    fetchItems();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping list</Text>
      
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Add new item..." 
          value={newItem} 
          onChangeText={text => setNewItem(text)} 
          style={styles.input} 
        />
        <Button title="Save" onPress={addItem} />
      </View>
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => deleteItem(item.id)}>
              <Icon name="trash" size={24} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginRight: 10,
    padding: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
