let lineChart, pieChart, barChart;

document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.getElementById("yearSelect");

  // Populate the dropdown with years from the dataset
  for (let year = 1980; year <= 2021; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  }

  // Initial chart and map update
  updateCharts(yearSelect.value);
  updateMap(yearSelect.value);

  // Update charts and map when the selected year changes
  yearSelect.addEventListener("change", function () {
    updateCharts(this.value);
    updateMap(this.value);
  });
});

function updateCharts(year) {
  fetch(`../src/fetch_data.php?year=${year}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      // If the chart instances already exist, destroy them
      if (lineChart) lineChart.destroy();
      if (pieChart) pieChart.destroy();
      if (barChart) barChart.destroy();

      // Create the line chart
      const lineContext = document.getElementById("lineChart").getContext("2d");
      lineChart = new Chart(lineContext, {
        type: "line",
        data: {
          labels: data.map((item) => item.Country),
          datasets: [
            {
              label: "Burnt Area",
              data: data.map((item) => item.Wildfires),
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Burnt Area Trends in ${year}`,
            },
          },
        },
      });

      // Create the bar chart
      const barContext = document.getElementById("barChart").getContext("2d");
      barChart = new Chart(barContext, {
        type: "bar",
        data: {
          labels: data.map((item) => item.Country),
          datasets: [
            {
              label: "Burnt Area",
              data: data.map((item) => item.Wildfires),
              backgroundColor: generateColors(data.length),
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: `Burnt Area Comparisons in ${year}`,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Create the pie chart
      const pieContext = document.getElementById("pieChart").getContext("2d");
      pieChart = new Chart(pieContext, {
        type: "pie",
        data: {
          labels: data.map((item) => item.Country),
          datasets: [
            {
              data: data.map((item) => item.Wildfires),
              backgroundColor: generateColors(data.length),
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "bottom",
            },
            title: {
              display: true,
              text: `Burnt Area Distribution in ${year}`,
            },
          },
        },
      });

      // Populate the data table
      populateDataTable(data, year);
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
}

function populateDataTable(data, year) {
  const tableContainer = document.getElementById("tableContainer");
  let tableHTML = `<table>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>Burnt Areas in ${year}</th>
                            </tr>
                        </thead>
                        <tbody>`;
  data.forEach((item) => {
    tableHTML += `<tr>
                          <td>${item.Country}</td>
                          <td>${item.Wildfires.toLocaleString()}</td>
                      </tr>`;
  });
  tableHTML += `</tbody></table>`;
  tableContainer.innerHTML = tableHTML;
}

function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(`hsl(${(360 * i) / count}, 70%, 50%)`);
  }
  return colors;
}

function updateMap(year) {
  fetch(`../src/fetch_data.php?year=${year}`)
    .then((response) => response.json())
    .then((data) => {
      // Translate country codes to Highcharts format
      const mapData = data
        .map((item) => {
          return {
            "hc-key": countryNameToCode[item.Country]
              ? countryNameToCode[item.Country].toLowerCase()
              : undefined,
            value: item.Wildfires,
          };
        })
        .filter((item) => item["hc-key"]);

      // Initialize the Highcharts map
      Highcharts.mapChart("euMapContainer", {
        chart: {
          map: "custom/european-union",
        },
        title: {
          text: `Burnt Area Across Countries in ${year} (hectares)`,
        },
        series: [
          {
            data: mapData,
            joinBy: "hc-key",
            name: "Burnt Area",
            tooltip: {
              pointFormat: "{point.name}: {point.value}",
            },
          },
        ],
      });
    })
    .catch((error) => console.error("Error fetching map data:", error));
}

const countryNameToCode = {
  PRT: "PT", // Portugal
  ESP: "ES", // Spain
  FRA: "FR", // France
  ITA: "IT", // Italy
  GRC: "GR", // Greece
  DZA: "DZ", // Algeria
  AUT: "AT", // Austria
  BGR: "BG", // Bulgaria
  HRV: "HR", // Croatia
  CYP: "CY", // Cyprus
  CZE: "CZ", // Czech Republic
  EST: "EE", // Estonia
  FIN: "FI", // Finland
  DEU: "DE", // Germany
  HUN: "HU", // Hungary
  LVA: "LV", // Latvia
  LBN: "LB", // Lebanon
  LTU: "LT", // Lithuania
  MAR: "MA", // Morocco
  NLD: "NL", // Netherlands
  MKD: "MK", // North Macedonia
  NOR: "NO", // Norway
  POL: "PL", // Poland
  ROU: "RO", // Romania
  SRB: "RS", // Serbia
  SVK: "SK", // Slovakia
  SVN: "SI", // Slovenia
  SWE: "SE", // Sweden
  CHE: "CH", // Switzerland
  TUR: "TR", // Turkey
  UKR: "UA", // Ukraine
};
