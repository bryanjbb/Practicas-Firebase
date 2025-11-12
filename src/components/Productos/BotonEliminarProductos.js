import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { collection, addDoc } from "firebase/firestore";

const BotonEliminarProductos = ({ id, eliminarProducto }) => {
    const [Visible, setVisible] = useState(false);

    const confirmarEliminacion = () => {
        eliminarProducto(id);
        setVisible(false);
        
    };

    return (
        <View>
            {/* Botón pequeño para eliminar */}
            <TouchableOpacity 
                style={styles.boton} 
                onPress={() => setVisible(true)}
            >
                <Text style={styles.textoboton}>Eliminar</Text>
            </TouchableOpacity>

            {/* Modal de confirmación */}
            <Modal
                transparent
                visible={Visible}
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.texto}>
                            ¿Estás seguro de que deseas eliminar este producto?
                        </Text>

                        <View style={styles.fila}>
                            {/* Cancelar */}
                            <TouchableOpacity
                                style={[styles.botonAccion, styles.cancelar]}
                                onPress={() => setVisible(false)}
                            >
                                <Text style={styles.textoAccion}>Cancelar</Text>
                            </TouchableOpacity>

                            {/* Confirmar eliminación */}
                            <TouchableOpacity
                                style={[styles.botonAccion, styles.confirmar]}
                                onPress={confirmarEliminacion}
                            >
                                <Text style={styles.textoAccion}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    boton: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: "#ff4444",
        alignItems: "center",
        justifyContent: "center",
    },
    textoboton: { color: "white", fontWeight: "bold" },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        alignItems: "center",
    },
    texto: { fontSize: 18, marginBottom: 20, textAlign: "center" },
    fila: { flexDirection: "row", justifyContent: "space-between", width: "100%" },
    botonAccion: {
        flex: 1,
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    cancelar: { backgroundColor: "#ccc" },
    confirmar: { backgroundColor: "#ff4444" },
    textoAccion: { color: "white", fontWeight: "bold" },
});

export default BotonEliminarProductos;
