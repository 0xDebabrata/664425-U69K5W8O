const getImages = () => {
    const imgs = document.getElementsByTagName("img")
    const filtered = []
    
    for (let e of imgs) {
        if (!e.alt) {
            filtered.push(e.src)
        }
    }

    const handleImgResponse = (response) => {
        console.log(response)
    }

    chrome.runtime.sendMessage(
        {
            img: filtered,
        },
        handleImgResponse
    )
}

const getAnchorTags = () => {
    const urls = []
    const anchorTags = []
    const links = document.getElementsByTagName("a")
    const regex = /\bhttps?:\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]/;

    for (let a of links) {
        if (a.href && regex.test(a.href)) {
            urls.push(a.href)
            anchorTags.push(a)
        }
    }

    const handleAnchorResponse = (response) => {
        for (let i = 0; i < response.length; i++) {
            anchorTags[i].ariaLabel = response[i]
        }
        console.log("Anchor tags updated")
    }

    chrome.runtime.sendMessage(
        {
            urls,
        },
        handleAnchorResponse
    )

    return urls
}

getAnchorTags()
getImages()
