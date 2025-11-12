import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BotonEliminarEmpleado from './BotonEliminarEmpleado.js';

const TablaEmpleados = ({ Empleados, eliminarEmpleado, editarEmpleado }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Empleados</Text>
      {Empleados.map((Empleado) => (
        <View key={Empleado.id} style={styles.row}>
          <Text style={styles.cell}>{Empleado.Nombre}</Text>
          <Text style={styles.cell}>{Empleado.Salario}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => editarEmpleado(Empleado)}
            >
              <Text style={styles.editButtonText}>Editar</Text>
            </TouchableOpacity>
            <BotonEliminarEmpleado id={Empleado.id} eliminarEmpleado={eliminarEmpleado} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  cell: { flex: 1, padding: 5 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
  editButton: { backgroundColor: '#007bff', padding: 8, borderRadius: 5, marginRight: 10 },
  editButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default TablaEmpleados;