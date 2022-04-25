import React from 'react';
import { FlatList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../../App';

const styles = StyleSheet.create({
  container: {
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    alignSelf: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
  },
});

// const items = [
//     {id: 1, name: 'Taylor Swift', year: 2006, color: 'teal'},
//     {id: 2, name: 'Fearless', year: 2008, color: 'gold'},
//     {id: 3, name: 'Speak Now', year: 2010, color: 'purple'},
//     {id: 4, name: 'Red', year: 2012, color: 'red'},
//     {id: 5, name: '1989', year: 2014, color: 'lightblue'},
//     {id: 6, name: 'Reputation', year: 2017, color: 'black'}
//   ]

const Separator = () => (
    <View style={styles.separator} />
    );

const List = ({items, navigation}: any) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({item}) => <View><Button title={item.name} color={item.color} 
                                          onPress={() => {
                                              navigation.navigate("Detail");
                                          }}/>
        <Separator/></View>}
      />
    </View>
  );
}

export default List;