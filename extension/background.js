chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed")
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.urls) {
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
    }
    if (message.img) {
        fetch('http://localhost:3000/process-elements', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                img: message.img
            })
        })
            .then(resp => resp.json())
            .then(data => sendResponse(data))
    }

    return true 
})
