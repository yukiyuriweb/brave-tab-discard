// Discards tabs other than the active one in each window, either all at once
// from the toolbar button or automatically once a tab has gone unviewed for
// the configured number of minutes. Tabs playing audio are kept.
// Discarded tabs reload when clicked.

const DEFAULT_MINUTES = 10;

async function discardTabs(shouldDiscard) {
  const tabs = await chrome.tabs.query({ active: false, discarded: false });
  let count = 0;
  for (const tab of tabs) {
    if (tab.audible || !shouldDiscard(tab)) continue;
    try {
      if (await chrome.tabs.discard(tab.id)) count++;
    } catch {
      // Skip tabs that can't be discarded, such as brave:// pages and tabs still loading
    }
  }
  return count;
}

chrome.action.onClicked.addListener(async () => {
  const count = await discardTabs(() => true);
  await chrome.action.setBadgeText({ text: String(count) });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
});

// The alarm wakes the service worker every minute; 0 minutes turns auto-discard off.
chrome.alarms.onAlarm.addListener(async () => {
  const { minutes } = await chrome.storage.sync.get({ minutes: DEFAULT_MINUTES });
  if (minutes <= 0) return;
  const cutoff = Date.now() - minutes * 60_000;
  await discardTabs((tab) => tab.lastAccessed !== undefined && tab.lastAccessed < cutoff);
});

chrome.alarms.get("auto-discard").then((alarm) => {
  if (!alarm) chrome.alarms.create("auto-discard", { periodInMinutes: 1 });
});
