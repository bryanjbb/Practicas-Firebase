import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { db } from "../components/database/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import FormularioProductos from "../components/Productos/FormularioProductos.js";
import TablaProductos from "../components/Productos/TablaProductos.js";


const Productos = () => {
    const [Productos, setProductos] = React.useState([]);

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Productos"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(data);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    };

    const eliminarProducto = async (id) => {
        try {
            await deleteDoc(doc(db, "Productos", id));
            cargarDatos();
        } catch (error) {
            console.error("Error al  intentar eliminar el producto:", error);
        }
    };
    
    useEffect(() => {
        cargarDatos();
    }, []);

    return (
        <View style={styles.container}>
            <FormularioProductos cargarDatos={cargarDatos} />
            <TablaProductos
            Productos={Productos}
             eliminarProducto={eliminarProducto} />
        </View>

    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 }
});

export default Productos;
