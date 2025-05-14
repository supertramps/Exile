// Listen for any keyboard shortcut command defined in manifest.json
chrome.commands.onCommand.addListener((command) => {
  // Get the currently active tab in the current browser window
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    // Safety check: make sure we got at least one tab and it has a valid ID
    if (!tabs[0] || !tabs[0].id) return;

    // Send the received command to the content script in the active tab
    chrome.tabs.sendMessage(tabs[0].id, { command });
  });
});
