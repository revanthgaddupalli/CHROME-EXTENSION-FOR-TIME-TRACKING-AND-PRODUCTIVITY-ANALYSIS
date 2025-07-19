document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/logs?userId=123")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.logs || data.logs.length === 0) {
        throw new Error("No logs found for the user.");
      }

      const domainTimeMap = {};

      data.logs.forEach((log) => {
        const hostname = new URL(log.url).hostname.replace(/^www\./, ''); // clean domain
        domainTimeMap[hostname] = (domainTimeMap[hostname] || 0) + log.timeSpent;
      });

      const labels = Object.keys(domainTimeMap);
      const timeSpent = Object.values(domainTimeMap).map((seconds) => seconds / 60); // to minutes

      const ctx = document.getElementById("chart").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [{
            label: "Time Spent (minutes)",
            data: timeSpent,
            backgroundColor: [
              "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"
            ],
            hoverOffset: 4
          }]
        },
        options: {
          plugins: {
            legend: {
              position: "top"
            }
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching or processing data:", error);
      document.body.innerHTML += `<p style="color: red;">Error: ${error.message}</p>`;
    });
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all logs?")) {
    fetch("http://localhost:3000/api/logs", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Logs reset successfully.");
        location.reload(); // Refresh chart view
      })
      .catch((err) => {
        console.error("Failed to reset logs:", err);
        alert("Failed to reset logs.");
      });
  }
});