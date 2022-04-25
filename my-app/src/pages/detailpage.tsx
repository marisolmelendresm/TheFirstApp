import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

import DataTable from '../components/table.component';

export default function DetailPage({id}: any) {

    const[detalles, setDetalles] = useState([]);
    const[cargando, setCargando] = useState(true);

    const solicitud = async() => {
        var respuesta = await fetch("http://127.0.0.1:5000/" + {id});
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
            { detalles && <DataTable />  }
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