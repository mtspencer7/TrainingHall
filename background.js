const GA_MEASUREMENT_ID = "G-9TJCGJZ3GR";
const GA_API_SECRET = "bhpG9iHeQhu0iGMLq7m2ag";
const ENVIRONMENT = "prod";
const SESSION_EXPIRY_MS = 30 * 60 * 1000; // 30 minutes

// 1. Get or create a persistent Client ID (Unique per install)
async function getClientId() {
  const { ga_client_id } = await chrome.storage.local.get("ga_client_id");
  if (ga_client_id) return ga_client_id;

  const newId = crypto.randomUUID();
  await chrome.storage.local.set({ ga_client_id: newId });
  return newId;
}

// 2. Get or create a Session ID (Groups events into one visit)
async function getSessionId() {
  const now = Date.now();
  let { ga_session_id, last_active } = await chrome.storage.local.get(["ga_session_id", "last_active"]);

  // If no session exists OR it's been idle for > 30 mins, start a new one
  if (!ga_session_id || (now - (last_active || 0)) > SESSION_EXPIRY_MS) {
    ga_session_id = Math.floor(now / 1000).toString();
    await chrome.storage.local.set({ ga_session_id });
  }

  // Update activity timestamp to keep session alive
  await chrome.storage.local.set({ last_active: now });
  return ga_session_id;
}

async function logEvent(eventName, params = {}) {
  try {
    const nowMs = Date.now();
    const [clientId, sessionId] = await Promise.all([
      getClientId(),
      getSessionId()
    ]);

    const payload = {
      client_id: clientId,
      // System-level timestamp (microseconds) ensures chronological order in GA4
      timestamp_micros: nowMs * 1000, 
      events: [{
        name: eventName,
        params: {
          session_id: sessionId,
          engagement_time_msec: 100,
          environment: ENVIRONMENT,
          debug_mode: 1, 
          custom_client_id: clientId,   // Visible in DebugView list
          custom_timestamp: nowMs,      // Visible in DebugView list
          ...params
        }
      }]
    };

    const response = await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );

    // Production endpoint returns 204 (No Content). Parsing .json() would throw an error.
    if (response.status === 204) {
      console.log(`GA Event "${eventName}" sent successfully at ${nowMs}.`);
    } else {
      const errorText = await response.text();
      console.warn("GA Response Warning:", response.status, errorText);
    }

  } catch (err) {
    console.error("GA logEvent failed:", err);
  }
}

// 3. Listener update: return 'true' to keep the service worker alive for the async call
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("Message received in background.js:", msg);

  if (msg.type === "LOG_EVENT") {
    logEvent(msg.event, msg.data).then(() => {
      sendResponse({ status: "processed" });
    });
    return true; 
  }
});
