<?php
require_once 'db_config.php';

$year = isset($_GET['year']) ? $_GET['year'] : date("Y");

$conn = connect();

$sql = "SELECT Country, Wildfires FROM reports WHERE Year = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $year);
$stmt->execute();
$result = $stmt->get_result();
$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($data);
?>
