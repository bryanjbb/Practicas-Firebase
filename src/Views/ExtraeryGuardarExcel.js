import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import { View, StyleSheet, Button, Alert } from "react-native";
import { addDoc, collection } from "firebase/firestore";

const extraerYGuardarExcel = async () => {
    try {
        //abrir selector de archivos
        const  result  = await  DocumentPicker.getDocumentAsync({ 
            type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            copyToCacheDirectory: true,
        });

        if (result.canceled || !result.assets || result.assets.length === 0) {
            Alert.alert("Operación cancelada", "No se seleccionó ningún archivo.");
            return;
        }
        const {uri, name} = result.assets[0];
        console.log(`Archivo seleccionado: ${name} en ${uri}`);

        // Leer el archivo como base64
        const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64
        });
        

        // Enviar el archivo lambda para procesar 
        const response = await fetch('https://73fijhekc2.execute-api.us-east-2.amazonaws.com/extraerExcel', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ archivoBase64: base64 }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const body = await response.json();
        const datos = body;

        if (!datos || !Array.isArray(datos) || datos.length === 0) {
            alert("Error", "No se encontraron datos datos en el archivo Excel o esta vacio.");
            return;
        }

        console.log("Datos extraídos:", datos);

        //Guardar cada fila en la coleccion mascotas
        let guardados = 0;
        let errores = 0;

        for (const mascotas of datos) {
            try {
                //columnas nombre, edad y raza, ajustada si losheader son diferentes
                await addDoc(collection(db, "mascotas"), {
                    nombre: mascotas.nombre,
                    edad: mascotas.edad,
                    raza: mascotas.raza,
                });
                guardados++;
            } catch (error) {
                console.error("Error al guardar mascota:", error);
                errores++;
            }

            Alert.alert(
                "Exito",
                `Se guardaro ${guardados} mascotas. Errores: ${errores}`,
                [{ text: "OK" }]
            );
        }
    } catch (error) {
        console.error("Error en extraerYGuardarExcel:", error);
        Alert.alert("Error", "Ocurrió un error al procesar el archivo Excel.");
    }
}

<View style={{marginVertical: 20}}>
    <Button title="Importar Mascotas desde Excel" onPress={extraerYGuardarExcel} />
</View>

export default extraerYGuardarExcel;