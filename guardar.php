<?php
// php/guardar.php

// Incluir la conexión a la base de datos
include 'db.php';

// Verificar si se envió el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $mensaje = $_POST['mensaje'];

    // Validar datos (puedes agregar más validaciones si lo deseas)
    if (empty($nombre) || empty($email) || empty($mensaje)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    // Preparar la consulta SQL
    $sql = "INSERT INTO contactos (nombre, email, mensaje) VALUES (?, ?, ?)";
    $stmt = $conexion->prepare($sql);

    // Verificar si la preparación de la consulta fue exitosa
    if ($stmt) {
        // Vincular parámetros
        $stmt->bind_param("sss", $nombre, $email, $mensaje);

        // Ejecutar la consulta
        if ($stmt->execute()) {
            echo "Mensaje enviado correctamente.";
        } else {
            echo "Error al enviar el mensaje: " . $stmt->error;
        }

        // Cerrar la declaración
        $stmt->close();
    } else {
        echo "Error en la consulta: " . $conexion->error;
    }

    // Cerrar la conexión
    $conexion->close();
} else {
    echo "Acceso no permitido.";
}
?>