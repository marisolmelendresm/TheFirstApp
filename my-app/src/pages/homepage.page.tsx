import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import List from '../components/list.component'

export default function HomePage() {

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
        <View style={styles.container}>
            <Text>Taylor Swift's Albums</Text>
            {cargando && <Text>CARGANDO...</Text>}
            { datos && <List items={datos} /> }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

