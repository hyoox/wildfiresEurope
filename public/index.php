<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wildfire Reports in Europe</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Wildfire Analytics Dashboard</h1>
            <select id="yearSelect" onchange="updateCharts(this.value)">
                <!-- JavaScript will populate this dropdown -->
            </select>
        </header>
        <main>
    <div class="charts">
        <section class="chart-card" id="pieChartCard">
            <h2>Wildfire Distribution - Pie Chart</h2>
            <canvas id="pieChart"></canvas>
        </section>
        <section class="chart-card" id="barChartCard">
            <h2>Wildfire Comparisons - Bar Chart</h2>
            <canvas id="barChart"></canvas>
        </section>
    </div>
    <section class="data-table">
        <h2>Data Table</h2>
        <!-- Table will be populated by JavaScript -->
        <div id="tableContainer"></div>
    </section>
</main>
    </div>
    <script src="js/chart-handler.js"></script>
</body>
</html>
