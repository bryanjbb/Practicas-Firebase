import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../components/database/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioEdad from "../components/Promedio/FormularioEdad.js";
import TablaEdad from "../components/Promedio/TablaEdad.js";
import TituloPromedio from "../components/Promedio/TituloPromedio.js";
import CalcularPromedio from "../components/Promedio/CalcularPromedio.js";
 

const Edad = () => {
    const [Edad, setEdad] = React.useState([]);

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Clientes"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setEdad(data);
        } catch (error) {
            console.error("Error al cargar los los clientes:", error);
        }
    };

    const eliminarEdad = async (id) => {
        try {
            await deleteDoc(doc(db, "Clientes", id));
            cargarDatos();
        } catch (error) {
            console.error("Error al  intentar eliminar el cliente:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <FormularioEdad cargarDatos={cargarDatos} />
            <TablaEdad
            Edad={Edad}
             eliminarEdad={eliminarEdad} />
             <CalcularPromedio />
        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Edad;
