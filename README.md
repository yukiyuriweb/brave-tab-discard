# Discard Inactive Tabs

A one-click browser extension that discards every tab except the active one in each window. Discarded tabs stay in the tab strip and reload when you click them.

Made for Brave, and works in any Chromium-based browser (Chrome, Edge, Vivaldi and others).

## Why

Brave's Memory Saver discards tabs you haven't used for a while, but even on its most aggressive setting it does not do it right away. The usual workaround is to force-quit renderer processes in Activity Monitor, which has two problems:

- You can't tell which renderer belongs to which tab, so you can kill the tab you are looking at.
- Killed tabs show a crash page, and anything you were typing is lost.

This extension calls `chrome.tabs.discard`, the same mechanism Memory Saver uses, immediately. The browser does the discarding itself, so the active tab is never touched and discarded tabs do not crash.

## What it does

- Tabs it keeps:
  - The active tab in each window
  - Tabs playing audio
  - Tabs the browser cannot discard, such as `brave://` or `chrome://` pages and tabs that are still loading
- The number of discarded tabs appears on the toolbar button for 3 seconds.
- It requests no permissions.

## Install

1. Open `brave://extensions` (`chrome://extensions` in Chrome).
2. Turn on Developer mode in the top-right corner.
3. Click “Load unpacked” and choose this folder.
4. Pin “Discard Inactive Tabs” to the toolbar from the puzzle-piece menu.

To use a keyboard shortcut, assign one at `brave://extensions/shortcuts`.

## Note

A renderer process can be shared by several tabs. Discarding some of them does not end the renderer while others still use it, so memory may drop less than it does when you kill renderers by hand.

## Files

| File | Contents |
|---|---|
| `manifest.json` | Extension definition (Manifest V3) |
| `background.js` | What happens when you click the button |
| `icons/` | Icons (16, 32, 48 and 128 px) |
| `make-icons.swift` | Script that generates the icons (macOS) |

To regenerate the icons:

```sh
swift make-icons.swift
```

## License

[MIT](LICENSE)
