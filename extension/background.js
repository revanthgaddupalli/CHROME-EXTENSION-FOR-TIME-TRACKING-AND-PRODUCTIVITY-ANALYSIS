let activeTabId = null;
let startTime = null;
let currentUrl = null;

function sendLog(url, timeSpent) {
  const log = {
    userId: "123", // Make dynamic later
    logs: [
      {
        url,
        timeSpent,
        date: new Date().toISOString()
      }
    ]
  };

  fetch("http://localhost:3000/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log)
  }).catch(console.error);
}

// Track tab switch
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (startTime && currentUrl) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    sendLog(currentUrl, timeSpent);
  }

  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url && tab.url.startsWith("http")) {
    currentUrl = tab.url;
    startTime = Date.now();
    activeTabId = activeInfo.tabId;
  } else {
    currentUrl = null;
    startTime = null;
    activeTabId = null;
  }
});

// Track tab updates (like navigation or reload)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tabId === activeTabId && changeInfo.url && changeInfo.url.startsWith("http")) {
    if (startTime && currentUrl) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      sendLog(currentUrl, timeSpent);
    }
    currentUrl = changeInfo.url;
    startTime = Date.now();
  }
});

// Track tab close
chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId && startTime && currentUrl) {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    sendLog(currentUrl, timeSpent);
    activeTabId = null;
    startTime = null;
    currentUrl = null;
  }
});