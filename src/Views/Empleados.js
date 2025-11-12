import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, ScrollView, TouchableOpacity, Text } from "react-native";
import { db } from "../components/database/firebaseconfig.js";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import FormularioEmpleados from "../components/Empleados/FormularioEmpleados.js";
import ListaEmpleados from "../components/Empleados/ListaEmpelados.js";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";

const Empleados = () => {
  const [Empleados, setEmpleados] = useState([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({ Nombre: "", Apellido: "", Salario: "" });
  const [idEmpleado, setIdEmpleado] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);

  const colecciones = ["Empleados", "Productos", "Usuarios", "Ciudades"];

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Empleados"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmpleados(data);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los empleados: " + error.message);
    }
  };

  const manejoCambio = (campo, valor) => {
    setNuevoEmpleado((prev) => ({ ...prev, [campo]: valor }));
  };

  const guardarEmpleado = async () => {
    if (!nuevoEmpleado.Nombre || !nuevoEmpleado.Apellido || !nuevoEmpleado.Salario) {
      Alert.alert("Error", "Complete todos los campos.");
      return;
    }
    try {
      await addDoc(collection(db, "Empleados"), {
        Nombre: nuevoEmpleado.Nombre,
        Apellido: nuevoEmpleado.Apellido,
        Salario: parseFloat(nuevoEmpleado.Salario),
      });
      setNuevoEmpleado({ Nombre: "", Apellido: "", Salario: "" });
      cargarDatos();
      Alert.alert("Éxito", "Empleado guardado correctamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar: " + error.message);
    }
  };

  const actualizarEmpleado = async () => {
    if (!idEmpleado) {
      Alert.alert("Error", "Seleccione un empleado para actualizar.");
      return;
    }
    try {
      const empleadoRef = doc(db, "Empleados", idEmpleado);
      await updateDoc(empleadoRef, {
        Nombre: nuevoEmpleado.Nombre,
        Apellido: nuevoEmpleado.Apellido,
        Salario: parseFloat(nuevoEmpleado.Salario),
      });
      setNuevoEmpleado({ Nombre: "", Apellido: "", Salario: "" });
      setIdEmpleado(null);
      setModoEdicion(false);
      cargarDatos();
      Alert.alert("Éxito", "Empleado actualizado correctamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar: " + error.message);
    }
  };

  const eliminarEmpleado = async (id) => {
    try {
      await deleteDoc(doc(db, "Empleados", id));
      cargarDatos();
      Alert.alert("Empleado eliminado correctamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar: " + error.message);
    }
  };

  const cargarDatosFirebase = async (coleccion) => {
    try {
      const snapshot = await getDocs(collection(db, coleccion));
      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error al cargar colección:", coleccion, error);
      return [];
    }
  };

  const exportarColeccion = async (coleccion) => {
    try {
      const datos = await cargarDatosFirebase(coleccion);
      const jsonString = JSON.stringify(datos, null, 2);
      const fileName = `${coleccion}.txt`;

      await Clipboard.setStringAsync(jsonString);
      const fileUri = FileSystem.cacheDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: "text/plain",
          dialogTitle: `Compartir datos de ${coleccion}`,
        });
      }

      Alert.alert("Éxito", `Datos de ${coleccion} listos para compartir.`);
    } catch (error) {
      Alert.alert("Error", "No se pudieron exportar los datos: " + error.message);
    }
  };

  const exportarTodas = async () => {
    try {
      const datosExportados = {};
      for (const col of colecciones) {
        const datos = await cargarDatosFirebase(col);
        datosExportados[col] = datos;
      }

      const jsonString = JSON.stringify(datosExportados, null, 2);
      const fileName = "todas_las_colecciones.txt";

      await Clipboard.setStringAsync(jsonString);
      const fileUri = FileSystem.cacheDirectory + fileName;
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: "text/plain",
          dialogTitle: "Compartir todas las colecciones",
        });
      }

      Alert.alert("Éxito", "Todas las colecciones listas para compartir.");
    } catch (error) {
      Alert.alert("Error", "No se pudieron exportar todas las colecciones: " + error.message);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Gestión de Empleados </Text>

        <FormularioEmpleados
          nuevoEmpleado={nuevoEmpleado}
          manejoCambio={manejoCambio}
          guardarEmpleado={guardarEmpleado}
          actualizarEmpleado={actualizarEmpleado}
          modoEdicion={modoEdicion}
        />

        <ListaEmpleados
          Empleados={Empleados}
          eliminarEmpleado={eliminarEmpleado}
          editarEmpleado={setNuevoEmpleado}
        />

        <View style={styles.botonesExportar}>
          <Text style={styles.subtitulo}>Exportar datos </Text>

          <TouchableOpacity
            style={[styles.boton, styles.btnVerde]}
            onPress={() => exportarColeccion("Empleados")}
          >
            <Text style={styles.textoBoton}>Exportar Empleados</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.btnAzul]}
            onPress={() => exportarColeccion("Productos")}
          >
            <Text style={styles.textoBoton}>Exportar Productos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.btnAmarillo]}
            onPress={() => exportarColeccion("Usuarios")}
          >
            <Text style={styles.textoBoton}>Exportar Usuarios</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.boton, styles.btnRojo]}
            onPress={exportarTodas}
          >
            <Text style={styles.textoBoton}>Exportar Todas las Colecciones</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// 🎨 Estilo moderno tipo dashboard administrativo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1E293B",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    marginBottom: 10,
  },
  botonesExportar: {
    marginTop: 15,
    alignItems: "center",
  },
  boton: {
    width: "85%",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnVerde: {
    backgroundColor: "#10B981",
  },
  btnAzul: {
    backgroundColor: "#3B82F6",
  },
  btnAmarillo: {
    backgroundColor: "#F59E0B",
  },
  btnRojo: {
    backgroundColor: "#EF4444",
  },
  textoBoton: {
    color: "#FFF",
    fontWeight: "bold",
    letterSpacing: 0.5,
    fontSize: 16,
  },
});

export default Empleados;
