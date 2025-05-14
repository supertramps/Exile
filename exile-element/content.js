// Stack to track hidden elements and their previous inline display
const hideStack = [];

// Track what you're hovering over
let hoveredElement = null;
document.addEventListener("mouseover", (e) => {
  hoveredElement = e.target;
});

// Listen for exile or undo requests
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.command === "delete-element" && hoveredElement) {
    // Record the element and its old display style
    const prevDisplay = hoveredElement.style.display || "";
    hideStack.push({ el: hoveredElement, prevDisplay });
    // Exile that sucker
    hoveredElement.style.setProperty("display", "none", "important");
    // Clear hover so double-exile doesn’t repeat
    hoveredElement = null;
  } else if (msg.command === "undo-hide") {
    const record = hideStack.pop();
    if (record && record.el) {
      // Restore previous value (empty string resets to CSS default)
      record.el.style.setProperty("display", record.prevDisplay, "important");
    }
  }
});
