import { FlatList, Button, Alert, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

import DataTable from './src/components/table.component';

//import HomePage from './src/pages/homepage.page';
//import DetailPage from './src/pages/detailpage';

const Separator = () => (
  <View style={styles.separator} />
  );

function HomePage({navigation}: any) {

  const[datos, setDatos] = useState([]);
  const[cargando, setCargando] = useState(true);

  const solicitud = async() => {
      var respuesta = await fetch("http://127.0.0.1:5000/");
      setDatos(await respuesta.json());
      setCargando(false);
  }

  useEffect (() => {
      solicitud();
  },[])
  
  return (
    <View style={styles.container1}>
      <Text>Taylor Swift's Albums</Text>
          {cargando && <Text>CARGANDO...</Text>}
          { datos && <FlatList
              data={datos}
              renderItem={({item}: any) => <View><Button 
              title={item.name} 
              color={item.color} 
              onPress={() => {
                navigation.navigate('Detail', {id_num: item.id});}}/>
              <Separator/></View>}
            /> }
    </View>
  );
}

function DetailPage({navigation, route}: any) {

  const[detalles, setDetalles] = useState([]);
  const[cargando, setCargando] = useState(true);

  const solicitud = async() => {
      const url = "http://127.0.0.1:5000/" + route.params.id_num
      var respuesta = await fetch(url);
      setDetalles(await respuesta.json());
      setCargando(false);
  }

  useEffect (() => {
      solicitud();
  },[])
  
  return (
      <View style={styles.container}>
          <Text>Details</Text>
          {cargando && <Text>CARGANDO...</Text>}
          {!cargando && <DataTable detalles={detalles} />  }
          <Button 
              title='BACK'
              onPress={() => {
                navigation.navigate('HomePage');}}/>
      </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name="HomePage"
          component={HomePage}
        />
        <Stack.Screen 
          name="Detail"
          component={DetailPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
  },
  container1: {
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
