<?php
// php/db.php

$host = "localhost";      // Servidor de la base de datos
$usuario = "root";        // Usuario de MySQL
$contrasena = "";         // Contraseña de MySQL
$base_datos = "blog_guitarras"; // Nombre de la base de datos

// Crear conexión
$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>