let pieChart, barChart;

document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.getElementById("yearSelect");

  // Populate the dropdown with years from the dataset
  for (let year = 1980; year <= 2021; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  }

  // Initial chart update
  updateCharts(yearSelect.value);
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
      if (pieChart) pieChart.destroy();
      if (barChart) barChart.destroy();

      // Process the data for the pie chart
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
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: `Wildfire Distribution in ${year}`,
            },
          },
        },
      });

      // Process the data for the bar chart
      const barContext = document.getElementById("barChart").getContext("2d");
      barChart = new Chart(barContext, {
        type: "bar",
        data: {
          labels: data.map((item) => item.Country),
          datasets: [
            {
              label: "Wildfires",
              data: data.map((item) => item.Wildfires),
              backgroundColor: generateColors(data.length),
              borderColor: "rgba(0, 0, 0, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: `Wildfire Comparisons in ${year}`,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      // Populate data table
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
                                <th>Wildfires in ${year}</th>
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
