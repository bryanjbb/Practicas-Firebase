import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseconfig.js";
import { collection, addDoc } from "firebase/firestore";

const FormularioEdad = ({ cargarDatos }) => {
  const [Nombre, setNombre] = useState("");
  const [Edad, setEdad] = useState("");

  const guardarEdad = async () => {
    if (Nombre && Edad) {
      try {
        await addDoc(collection(db, "Clientes"), {
          Nombre: Nombre,
          Edad: parseInt(Edad),
        });

        setNombre("");
        setEdad("");
        cargarDatos(); // Volver a cargar la lista
      } catch (error) {
        console.error("Error al registrar el cliente:", error);
      }
    } else {
      alert("Por favor, complete todos los campos.");
    }
  };


return (
  <View style={styles.container}>

    <Text style={styles.titulo}>Registrar Cliente</Text>
    
    <TextInput
      style={styles.input}
      placeholder="Nombre del cliente"
      value={Nombre}
      onChangeText={setNombre}
    />
    <TextInput
      style={styles.input}
      placeholder="Edad"
      value={Edad}
      onChangeText={setEdad}
      keyboardType="numeric"
    />

    <Button title="Guardar" onPress={guardarEdad} />

  </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10 }
});

export default FormularioEdad;