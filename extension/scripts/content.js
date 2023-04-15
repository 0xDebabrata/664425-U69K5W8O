const getImages = () => {
    const imgs = document.getElementsByTagName("img")
    const imgTags = []
    const filtered = []
    
    for (let e of imgs) {
        if (!e.alt) {
            filtered.push(e.src)
            imgTags.push(e)
        }
    }

    return {
        img: filtered,
        imgTags
    }

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

    return {
        anchorTags,
        urls: urls.slice(0,5)
    }
}

const improveAccessibility = () => {
    const { urls, anchorTags } = getAnchorTags()
    const { img, imgTags } = getImages()

    const handleResponse = (response) => {
        console.log(response)
        console.log(anchorTags)
        console.log(imgTags)
        /*
        for (let i = 0; i < response.length; i++) {
            anchorTags[i].ariaLabel = response[i]
        }
        console.log("Anchor tags updated")
        */
    }

    chrome.runtime.sendMessage(
        {
            urls,
            img
        },
        handleResponse
    )

    return urls
}

improveAccessibility()
