# CHROME-EXTENSION-FOR-TIME-TRACKING-AND-PRODUCTIVITY-ANALYSIS

**COMPANY**: CODTECH IT SOLUTIONS

**NAME**: GADDUPALLI REVANTH

**INTERN ID**: CT08DF1030

**DOMAIN**: FULL STACK WEB DEVELOPMENT

**DURATION**: 8 WEEKS

**MENTOR**: NEELA SANTHOSH KUMAR

## DESCRIPTION
This Chrome Extension was built to help users monitor how much time they spend on different websites throughout the day, and visualize their productivity in a clean, interactive dashboard. It combines a lightweight browser extension with a Node.js backend and MongoDB database for log storage, plus a web-based dashboard powered by Chart.js.

### Features :
- Tracks time spent on each tab/website.
- Automatically logs the start and end time when switching tabs, navigating pages, or closing tabs.
- Sends logs to a backend server via REST API.
- Displays data visually in a pie chart on a web-based dashboard.
- Allows users to reset all logs from the dashboard.
- Built-in server to serve both API and dashboard interface.

### Project Structure :
```
chrome-extension/
├── extension/        # Chrome Extension logic (popup, background)
├── dashboard/        # Analytics dashboard (HTML, JS, CSS)
├── backend/          # Node.js + Express + MongoDB API
```

### How It Works :
1. **Chrome Extension**  
   The Chrome Extension is responsible for detecting browsing activity and communicating with the backend.
   - **`background.js`**:
     - Uses Chrome’s tab event listeners to detect:
       - Active tab switch (`onActivated`)
       - URL changes (`onUpdated`)
       - Tab close (`onRemoved`)
     - Records the amount of time spent on each URL.
     - Sends the usage log to the backend with a `POST` request.
   - **`popup.html`, `popup.js`**:
     - A simple interface with one button: "View Analytics".
     - Attempts to open the dashboard in a new tab if the server is reachable.
   - **`manifest.json`**:
     - Declares permissions (`tabs`, `storage`, `host_permissions`).
     - Registers the background service worker.

2. **Backend (Node.js + MongoDB)**
   - Built with **Express** and **Mongoose**.
   - Exposes 3 main API endpoints:
      - `POST /api/logs` – Save or append new logs for a user.
      - `GET /api/logs?userId=...` – Fetch logs for a specific user.
      - `DELETE /api/logs` – Delete all logs (used for dashboard reset).
   - Logs are stored in MongoDB using a simple schema with userId and an array of `{ url, timeSpent, date }`.

3. **Dashboard**
   - Built with plain HTML, CSS, and JavaScript.
   - Uses **Chart.js** to display a **pie chart** of time spent per domain (in minutes).
   - Offers a "Reset Logs" button to clear all data from the database.
   - Communicates with the backend at `http://localhost:3000/api/logs`.

### Setup Instructions :
**Prerequisites**:
- Node.js and npm
- MongoDB instance (local or hosted like MongoDB Atlas)
- Chrome browser

**Backend Setup**:
1. Navigate to `backend/`:
   
   ```
   bash
   cd backend
   ```
2. Create a `.env` file with your MongoDB URI:
   
   ```
   MONGO_URI=mongodb://localhost:27017/time-tracker
   ```
3. Install dependencies:

   ```
   bash
   npm install
   ```
4. Start the server:

   ```
   bash
   node server.js
   ```
The server will run on `http://localhost:3000`.

**Extension Setup**:
1. Open Chrome and go to `chrome://extensions`.
2. Enable "Developer mode".
3. Click “Load unpacked” and select the `extension/` folder.

**Access the Dashboard**:  
Once the server is running, either:
- Click "View Analytics" in the extension popup.
- Or directly open `http://localhost:3000/analytics-dashboard` in your browser.

**Notes**:
- Currently, the user ID is hardcoded as `"123"`. For a production-ready system, authentication and dynamic user assignment should be implemented.
- This tool is for local development and testing. Deployments would require:
  - Hosting the backend and dashboard (e.g., on Render, Vercel, or Heroku)
  - Updating API URLs in the extension accordingly
  - Packaging the extension for Chrome Web Store submission

### Conclusion :
This project is a minimal yet functional example of a browser productivity tracker. It demonstrates the integration of a Chrome Extension with a backend system and a visual analytics dashboard.

## OUTPUT
<img width="455" height="186" alt="Image" src="https://github.com/user-attachments/assets/a0276be1-4f7a-4c97-8ced-50ae7ebb78de" />

---
---

<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/4a6995da-d4c4-4719-8a08-92979cf1846e" />

---
---

<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/c311b632-2055-4af9-8d57-76136f0cf35a" />

---
---

<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/2b5c8f28-bb17-4707-b038-9625f3238951" />

---
---

<img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/48cf30c3-5911-4f23-b2fe-690a09608dd6" />
