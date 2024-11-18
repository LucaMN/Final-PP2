<?php
// login.php
// maneja el inicio de sesión de los usuarios.
include 'db.php'; // Conexión a la base de datos

// Configuración de los encabezados de respuesta para permitir el acceso desde cualquier origen y definir el tipo de contenido como JSON.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$data = json_decode(file_get_contents("php://input"));
$username = $data->username; // Se obtiene el nombre de usuario 
$password = $data->password;// Se obtiene la contraseña

// Consulta SQL para verificar si existe un usuario con el nombre de usuario y la contraseña proporcionados.
$sql = "SELECT * FROM users WHERE username = ? AND password = ?";$sql = "SELECT * FROM users WHERE username = ? AND password = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $username, $password); // Asigna los valores a los parámetros en la consulta
$stmt->execute();
$result = $stmt->get_result(); // Obtiene el resultado de la consulta

// Verifica si la consulta devuelve algún resultado (usuario encontrado)
if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();// Obtiene los datos del usuario encontrado
    // Responde con éxito y una indicación si el usuario es admin o no
    echo json_encode(['success' => true, 'isAdmin' => $user['role'] === 'admin']); // Retorna true si es admin
} else {
    // Responde con un mensaje de error si no se encuentra el usuario
    echo json_encode(['success' => false, 'message' => 'Credenciales incorrectas']);
}

$conn->close();
