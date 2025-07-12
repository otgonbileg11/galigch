// Service worker for Manifest V3
let enabled = false;

// Initialize the extension state when the service worker starts
chrome.runtime.onStartup.addListener(() => {
    initializeExtension();
});

chrome.runtime.onInstalled.addListener(() => {
    initializeExtension();
});

function initializeExtension() {
    // Set initial icon state
    chrome.action.setIcon({
        path: "icons/disabled38.png"
    });
    enabled = false;
}

/* Gets a command such as keyboard combinations. */
chrome.commands.onCommand.addListener((command) => {
    if (command === "toggleMode") {
        toggleMode();
    }
});

/* Gets called when the extension icon is clicked. */
chrome.action.onClicked.addListener((tab) => {
    toggleMode();
});

/* Enables or disables the mode. */
function toggleMode() {
    enabled = !enabled;
    if (enabled) {
        chrome.action.setIcon({
            path: "icons/enabled38.png"
        });
    } else {
        chrome.action.setIcon({
            path: "icons/disabled38.png"
        });
    }
}

/* Listens to messages from content scripts. */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "enabled") {
        sendResponse({enabled: enabled});
    }
    return true; // Keep the message channel open for async response
});
