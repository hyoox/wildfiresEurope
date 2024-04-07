let pieChart, barChart;

document.addEventListener("DOMContentLoaded", function () {
  const yearSelect = document.getElementById("yearSelect");

  for (let year = 1980; year <= 2021; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  }

  updateCharts(yearSelect.value);
});

function updateCharts(year) {
  fetch(`../src/fetch_data.php?year=${year}`)
    .then((response) => response.json())
    .then((data) => {
      const pieData = {
        labels: data.map((item) => item.Country),
        datasets: [
          {
            label: "Wildfires",
            data: data.map((item) => item.Wildfires),
            backgroundColor: generateColors(data.length),
          },
        ],
      };

      const barData = {
        labels: data.map((item) => item.Country),
        datasets: [
          {
            label: "Wildfires",
            data: data.map((item) => item.Wildfires),
            backgroundColor: generateColors(data.length),
          },
        ],
      };

      if (pieChart) pieChart.destroy();
      if (barChart) barChart.destroy();

      const pieCtx = document.getElementById("pieChart").getContext("2d");
      pieChart = new Chart(pieCtx, {
        type: "pie",
        data: pieData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Wildfires by Country in " + year,
            },
          },
        },
      });

      const barCtx = document.getElementById("barChart").getContext("2d");
      barChart = new Chart(barCtx, {
        type: "bar",
        data: barData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Wildfires by Country in " + year,
            },
          },
        },
      });
    });
}

function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const color = `hsl(${360 * Math.random()}, 50%, 50%)`;
    colors.push(color);
  }
  return colors;
}
