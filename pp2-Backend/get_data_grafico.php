<?php
// get_data_grafico.php
// Archivo de conexión a la base de datos.
include 'db.php';
// Permitir solicitudes desde cualquier origen (CORS) y para indicar que la respuesta será en formato JSON.
header("Access-Control-Allow-Origin: *");// Permite solicitudes desde cualquier origen
header("Content-Type: application/json; charset=UTF-8"); // El contenido de la respuesta será JSON y que la codificación es UTF-8.

// Consulta SQL para obtener los datos necesarios para el gráfico.
$sql = "
    SELECT 
        v.id_mes, 
        m.nombre AS nombre_mes, 
        v.id_sucursal, 
        s.nombre AS nombre_sucursal, 
        v.monto 
    FROM 
        ventas v 
    JOIN 
        sucursales s ON v.id_sucursal = s.id 
    JOIN 
        meses m ON v.id_mes = m.id";

$result = $conn->query($sql);// Ejecutar la consulta SQL utilizando la conexión abierta previamente

// Creamos un array vacío para almacenar los resultados.
$data = [];

// Verificar si la consulta ha devuelto algún resultado.
if ($result->num_rows > 0) {
    // Iterar sobre cada fila devuelta por la consulta.
    while ($row = $result->fetch_assoc()) {
        // Agregar cada fila al array de datos.
        $data[] = $row; // Agrega cada fila al array
    }
}

// Codificamos el array de datos como JSON y enviarlo como respuesta.
echo json_encode($data); // Devuelve los datos en formato JSON
$conn->close();
