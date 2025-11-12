import React  from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ListaProducto = ({ Productos }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Productos</Text>
            <FlatList
                data={Productos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.Nombre} -${item.Precio}
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    item: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }
});

export default ListaProducto;
            
