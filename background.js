// The toolbar button discards every tab except the active one in each window.
// Tabs playing audio are kept. Discarded tabs reload when clicked.
chrome.action.onClicked.addListener(async () => {
  const tabs = await chrome.tabs.query({ active: false, discarded: false });
  let count = 0;
  for (const tab of tabs) {
    if (tab.audible) continue;
    try {
      if (await chrome.tabs.discard(tab.id)) count++;
    } catch {
      // Skip tabs that can't be discarded, such as brave:// pages and tabs still loading
    }
  }
  await chrome.action.setBadgeText({ text: String(count) });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
});
