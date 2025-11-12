import React from "react";
import { Text, StyleSheet } from "react-native";

const TituloPromedio = ({ promedio }) => {
    return (
        <Text style={styles.titulo}>
            {promedio !== null 
            ? `El promedio es: ${promedio.toFixed(2)}` 
            : "No hay números para calcular el promedio."}
        </Text>
    );
};

const styles = StyleSheet.create({
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
    },
});

export default TituloPromedio;
