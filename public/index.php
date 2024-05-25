<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Wildfires Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../public/css/style.css">
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/maps/modules/map.js"></script>
    <script src="https://code.highcharts.com/mapdata/custom/european-union.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Europe Wildfire Analytics Dashboard per Year</h1>
            <select id="yearSelect">
            </select>
        </header>
        <div id="euMapContainer"></div>
<div class="charts">
    <section class="chart-card full-width">
        <h2>Burnt Area by Country (hectares)</h2>
        <canvas id="lineChart"></canvas>
    </section>
    <section class="chart-card full-width">
        <h2>Burnt Area Comparison by Country (hectares)</h2>
        <canvas id="barChart"></canvas>
    </section>
</div>
<section class="chart-card full-width" style="height:620px !important;">
    <h2>Burnt Area Distribution by Country (hectares)</h2>
    <canvas id="pieChart"></canvas>
</section>
<section class="data-table">
    <h2> Burnt Area DataTable</h2>
    <div id="tableContainer"></div>
</section>
    </div>
    <footer>
        Datasheet is from European Forest Fire Information System (EFFIS) by Copernicus
    </footer>
    <script src="../public/js/plots.js"></script>
</body>
</html>
