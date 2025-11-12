import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseconfig.js";
import { collection, addDoc } from "firebase/firestore";

const FormularioProductos = ({ cargarDatos }) => {
  const [Nombre, setNombre] = useState("");
  const [Precio, setPrecio] = useState("");

  const guardarProducto = async () => {
    if (Nombre && Precio) {
      try {
        await addDoc(collection(db, "Productos"), {
          Nombre: Nombre,
          Precio: parseFloat(Precio),
        });

        setNombre("");
        setPrecio("");
        cargarDatos(); // Volver a cargar la lista
      } catch (error) {
        console.error("Error al registrar producto:", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };


return (
  <View style={styles.container}>

    <Text style={styles.titulo}>Registrar de Productos</Text>
    
    <TextInput
      style={styles.input}
      placeholder="Nombre del producto"
      value={Nombre}
      onChangeText={setNombre}
    />
    <TextInput
      style={styles.input}
      placeholder="Precio"
      value={Precio}
      onChangeText={setPrecio}
      keyboardType="numeric"
    />

    <Button title="Guardar" onPress={guardarProducto} />

  </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }
});

export default FormularioProductos;