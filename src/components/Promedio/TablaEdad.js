import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import BotonEliminarEdad from "./BotonEliminarEdad";
import Promedio from "../../Views/Promedio";
const TablaEdad = ({ Edad, eliminarEdad }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Clientes</Text>

            {/*Encabezado de la tabla*/}

            <View style={[styles.fila, styles]}>
                <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Edad</Text>
                <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
            </View>

            {/*Contenido de la tabla*/}
            <ScrollView>
                {Edad.map((item) => (
                    <View key={item.id} style={[styles.fila, styles.encabezado]}>
                        <Text style={styles.celda}>{item.Nombre}</Text>
                        <Text style={styles.celda}>{item.Edad} Años</Text>
                        {/*Celda para los botones de acción*/}
                        <View style={styles.celdaAcciones}>
                            <BotonEliminarEdad id={item.id} eliminarEdad={eliminarEdad} />
                        </View>
                    </View>

                ))}
            </ScrollView>
        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alingnItems: "stretch",
    },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    fila: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    encabezado: {
        backgroundColor: "#f9f9f9"
    },

    celda: {
        flex: 1,
        fontSize: 16,
        textAlign: "center",
    },

    celdaAcciones: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    textoEncabezado: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
});

export default TablaEdad;
