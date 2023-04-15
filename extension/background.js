chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed")
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetch('http://localhost:3000/process-elements', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            a: message.urls
        })
    })
        .then(resp => resp.json())
        .then(data => sendResponse(data))

    return true 
})
