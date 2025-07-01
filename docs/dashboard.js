const userId = "user123"; // Hardcoded for now

async function fetchLogs() {
  const res = await fetch(`http://localhost:5000/api/logs/${userId}`);
  const logs = await res.json();
  return logs;
}

function summarizeLogs(logs) {
  const siteTotals = {};
  let totalTime = 0;
  let productiveTime = 0;
  let unproductiveTime = 0;

  logs.forEach(log => {
    const { domain, timeSpent, label } = log;
    siteTotals[domain] = (siteTotals[domain] || 0) + timeSpent;
    totalTime += timeSpent;
    if (label === "productive") productiveTime += timeSpent;
    else unproductiveTime += timeSpent;
  });

  return { siteTotals, totalTime, productiveTime, unproductiveTime };
}

function renderCharts({ siteTotals, productiveTime, unproductiveTime, totalTime }) {
  document.getElementById("totalTime").textContent = `Total Time This Week: ${Math.floor(totalTime / 60)} mins`;

  const barCtx = document.getElementById("barChart").getContext("2d");
  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: Object.keys(siteTotals),
      datasets: [{
        label: 'Time Spent (mins)',
        data: Object.values(siteTotals).map(s => Math.floor(s / 60)),
        backgroundColor: '#42a5f5'
      }]
    }
  });

  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: 'pie',
    data: {
      labels: ['Productive', 'Unproductive'],
      datasets: [{
        data: [
          Math.floor(productiveTime / 60),
          Math.floor(unproductiveTime / 60)
        ],
        backgroundColor: ['#66bb6a', '#ef5350']
      }]
    }
  });
}

fetchLogs().then(logs => {
  const summary = summarizeLogs(logs);
  renderCharts(summary);
});