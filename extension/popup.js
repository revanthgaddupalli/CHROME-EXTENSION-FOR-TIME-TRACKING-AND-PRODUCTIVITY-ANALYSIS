document.getElementById("open-report").addEventListener("click", () => {
  const dashboardURL = "http://localhost:3000/analytics-dashboard";

  // Timeout wrapper for fetch
  const fetchWithTimeout = (url, timeout = 2000) => {
    return Promise.race([
      fetch(url, { method: "HEAD" }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeout)
      ),
    ]);
  };

  fetchWithTimeout(dashboardURL)
    .then((response) => {
      if (response.ok) {
        window.open(dashboardURL, "_blank");
      } else {
        alert("Dashboard is unreachable. Please check the server.");
      }
    })
    .catch(() => {
      alert("Dashboard is not available. Please make sure the server is running.");
    });
});