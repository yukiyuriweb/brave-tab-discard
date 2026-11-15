// ツールバーのボタンで、全ウィンドウのアクティブなタブ以外を discard する。
// 音を再生中のタブは残す。外したタブはクリックすると再読み込みされる。
chrome.action.onClicked.addListener(async () => {
  const tabs = await chrome.tabs.query({ active: false, discarded: false });
  let count = 0;
  for (const tab of tabs) {
    if (tab.audible) continue;
    try {
      if (await chrome.tabs.discard(tab.id)) count++;
    } catch {
      // brave:// のページや読み込み中のタブなど、外せないものは飛ばす
    }
  }
  await chrome.action.setBadgeText({ text: String(count) });
  setTimeout(() => chrome.action.setBadgeText({ text: "" }), 3000);
});
