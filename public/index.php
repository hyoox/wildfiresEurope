<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wildfire Reports in Europe</title>
    <link rel="stylesheet" href="css/style.css">
    <!-- Include Chart.js from CDN for simplicity -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="chart-container">
        <select id="yearSelect" onchange="updateCharts(this.value)">
            <!-- JavaScript will populate this dropdown -->
        </select>
        <div class="chart">
            <canvas id="pieChart"></canvas>
        </div>
        <div class="chart">
            <canvas id="barChart"></canvas>
        </div>
    </div>
    <script src="js/chat-handler.js"></script>
</body>
</html>
