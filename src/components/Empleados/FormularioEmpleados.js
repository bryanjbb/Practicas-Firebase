import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FormularioEmpleados = ({ nuevoEmpleado, manejoCambio, guardarEmpleado, actualizarEmpleado, modoEdicion }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{modoEdicion ? 'Editar Empleado' : 'Agregar Empleado'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nuevoEmpleado.Nombre}
        onChangeText={(text) => manejoCambio('Nombre', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={nuevoEmpleado.Apellido}
        onChangeText={(text) => manejoCambio('Apellido', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Salario"
        value={nuevoEmpleado.Salario}
        onChangeText={(text) => manejoCambio('Salario', text)}
        keyboardType="numeric"
      />
      <Button
        title={modoEdicion ? 'Actualizar' : 'Guardar'}
        onPress={modoEdicion ? actualizarEmpleado : guardarEmpleado}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { padding: 10 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 10 },
});

export default FormularioEmpleados;