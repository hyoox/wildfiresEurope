<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wildfire Analytics Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/maps/modules/map.js"></script>
    <script src="https://code.highcharts.com/mapdata/custom/european-union.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Wildfire Analytics Dashboard</h1>
            <select id="yearSelect">
                <!-- JavaScript will populate this dropdown -->
            </select>
        </header>
        <div id="euMapContainer" style="width: 100%; height: 500px; margin-bottom: 20px;"></div>
        <div class="charts">
            <section class="chart-card">
                <h2>Burnt Area Distribution - Pie Chart (ha)</h2>
                <canvas id="pieChart"></canvas>
            </section>
            <section class="chart-card">
                <h2>Burnt Area Comparisons - Bar Chart (ha)</h2>
                <canvas id="barChart"></canvas>
            </section>
        </div>
        <section class="data-table">
            <h2>Burnt Area DataTable</h2>
            <div id="tableContainer"></div>
        </section>
    </div>
    <script src="js/chart-handler.js"></script>
</body>
</html>
