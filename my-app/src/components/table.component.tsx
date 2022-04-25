import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const DataTable = ({detalles}: any) => {

    const[cargando, setCargando] = useState(true);

    

    const tableHead = ['ID', 'NOMBRE', 'AÑO']
    console.log(detalles);
    const tableData = [detalles[0].id, detalles[0].name, detalles[0].year]

    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
          <Row data={tableData} textStyle={styles.text}/>
        </Table>
      </View>
    )
  }

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', width: '90%'},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 }
});

export default DataTable;