<?php
//get_data.php
// Archivo de conexión a la base de datos.
include 'db.php';

// Establecemos encabezados HTTP para permitir solicitudes desde cualquier origen (CORS),
// así como los métodos y encabezados permitidos para las solicitudes.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// Función para obtener los datos de una tabla específica de la base de datos.
function getTableData($table) {
    global $pdo; // Usar la conexión PDO global.

    try {
         // Verifica la tabla solicitada y prepara la consulta SQL correspondiente.
        if ($table === 'ventas') {
            // Si la tabla es 'ventas', se prepara una consulta JOIN para obtener los datos de ventas
            // junto con los nombres de las sucursales y los meses relacionados.
            $stmt = $pdo->prepare("
                SELECT v.id, s.nombre AS sucursal, m.nombre AS mes, v.monto 
                FROM ventas v
                JOIN sucursales s ON v.id_sucursal = s.id
                JOIN meses m ON v.id_mes = m.id
            ");
        } elseif ($table === 'sucursales') {
             // Si la tabla es 'sucursales', se prepara una consulta para obtener los datos de las sucursales.
            $stmt = $pdo->prepare("
                SELECT nombre, direccion, empleados 
                FROM sucursales
            ");
        } else {
            // Si la tabla no es 'ventas' ni 'sucursales', se prepara una consulta genérica que obtiene todos los datos de la tabla.
            $stmt = $pdo->prepare("SELECT * FROM $table");
        }
        
        // Ejecutar la consulta SQL preparada.
        $stmt->execute();
        // Devolver todos los resultados en formato de array asociativo.
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
          // En caso de error, devolver un mensaje de error.
        return ['error' => 'Database error: ' . $e->getMessage()];
    }
}

function getSucursales() {
    global $pdo; // Usar la conexión PDO global.
    try {
        $stmt = $pdo->prepare("SELECT DISTINCT nombre FROM sucursales");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Devuelve una lista de sucursales
    } catch (PDOException $e) {
        return ['error' => 'Database error: ' . $e->getMessage()];
    }
}


function getVentasPorSucursal($sucursal) {
    global $pdo; // Usar la conexión PDO global.
    try {
        $stmt = $pdo->prepare("
            SELECT v.id, s.nombre AS sucursal, m.nombre AS mes, v.monto 
            FROM ventas v
            JOIN sucursales s ON v.id_sucursal = s.id
            JOIN meses m ON v.id_mes = m.id
            WHERE s.nombre = :sucursal
        ");
        $stmt->bindParam(':sucursal', $sucursal, PDO::PARAM_STR);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC); // Devuelve las ventas de esa sucursal
    } catch (PDOException $e) {
        return ['error' => 'Database error: ' . $e->getMessage()];
    }
}


// Verificar si se ha recibido el parámetro 'table' en la URL (con GET).
if (isset($_GET['table'])) {
    // Asigna el valor del parámetro 'table' a la variable $table.
    $table = $_GET['table'];

    // Llamar a la función getTableData para obtener los datos de la tabla especificada
    echo json_encode(getTableData($table));
} else {
    // Si no se especifica la tabla, devolver un error
    echo json_encode(['error' => 'Especifica una tabla']);
}

?>
