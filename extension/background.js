chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed")
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(message)
    console.log(sender)

    sendResponse({ success: "ok" })

    return true 
})
