<?php
// db.php
//Parametros de conexion a la base de datos
$host = 'localhost';// Servidor de la base de datos
$dbname = 'pp2'; // Nombre de la base de datos
$username = 'root';// Nombre de usuario de la base de datos
$password = '';// Contraseña de la base de datos 

// Establecer la conexión con MySQL 
$conn = new mysqli($host , $username, $password, $dbname);

try {
    // Instancia de PDO, con los parámetros de conexión.
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    // Excepciones en caso de errores.
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Si ocurre un error en la conexión con PDO, mostramos el mensaje de error.
    die("Error al conectar a la base de datos: " . $e->getMessage());
}

?>
