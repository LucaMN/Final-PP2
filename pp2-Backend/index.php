<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Gestión de Sucursales</title>
</head>
<body>
    <h1>Bienvenido al Sistema de Gestión de Sucursales</h1>
    <p>Utiliza los siguientes enlaces para acceder a los datos:</p>
    <ul>
        <li><a href="get_data.php?table=articulos" target="_blank">Ver Artículos</a></li>
        <li><a href="get_data.php?table=clientes" target="_blank">Ver Clientes</a></li>
        <li><a href="get_data.php?table=sucursales" target="_blank">Ver Sucursales</a></li>
        <li><a href="get_data.php?table=meses" target="_blank">Ver Meses</a></li>
        <li><a href="get_data.php?table=ventas" target="_blank">Ver Ventas</a></li>
    </ul>

    <h2>Modificar Monto en Ventas</h2>
<form action="update_data.php" method="POST">
    <input type="hidden" name="table" value="ventas">
    
    <label for="id_sucursal">ID Sucursal:</label>
    <input type="number" name="data[id_sucursal]" required><br><br>
    
    <label for="id_mes">ID Mes:</label>
    <input type="number" name="data[id_mes]" required><br><br>
    
    <label for="monto">Nuevo Monto:</label>
    <input type="number" name="data[monto]" required><br><br>
    
    <input type="submit" value="Modificar Venta">
</form>


</body>
</html>
