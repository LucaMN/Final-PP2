<?php
// update_data.php
include 'db.php';

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Verificar que se recibe un POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Leer el cuerpo de la solicitud JSON
    $receivedData = json_decode(file_get_contents('php://input'), true);

    // Verificar que la tabla y los datos sean correctos
    $table = $receivedData['table'] ?? '';
    $data = $receivedData['data'] ?? [];

    // Comprobar que la tabla sea 'ventas' y que los datos necesarios estén presentes
    if ($table === 'ventas' && isset($data['id_sucursal'], $data['id_mes'], $data['monto'])) {
        $id_sucursal = $data['id_sucursal']; // Obtiene el ID de la sucursal
        $id_mes = $data['id_mes'];// Obtiene el ID del mes
        $monto = $data['monto'];// Obtiene el monto para actualizar

        // Actualizar el monto basado en id_sucursal y id_mes
        $sql = "UPDATE ventas SET monto = ? WHERE id_sucursal = ? AND id_mes = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $monto, $id_sucursal, $id_mes); // Asigna los valores a los parámetros

        // Ejecutar la consulta y devolver la respuesta
        if ($stmt->execute()) {
            // Responde con éxito y confirma la actualización
            echo json_encode(["success" => true, "message" => "El monto para la sucursal $id_sucursal en el mes $id_mes ha sido actualizado a $monto."]);
        } else {
            // Responde con un mensaje de error si la actualización falla
            echo json_encode(["success" => false, "message" => "Error al actualizar el registro: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        // Responde con un mensaje de error si faltan datos o la tabla es incorrecta
        echo json_encode(["success" => false, "message" => "Datos incompletos o tabla incorrecta."]);
    }
} else {
    // Responde con un mensaje de error si el método no es POST
    echo json_encode(["success" => false, "message" => "Método no permitido."]);
}

$conn->close();
?>
