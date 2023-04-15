const getImages = () => {
    const imgs = document.getElementsByTagName("img")
    const imgTags = []
    const filtered = []
    
    for (let e of imgs) {
        if (!e.alt) {
            if (e.src.endsWith('jpg') || e.src.endsWith('png')) {
                filtered.push(e.src)
                imgTags.push(e)
            }
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
        urls: urls
    }
}

const improveAccessibility = () => {
    const { urls, anchorTags } = getAnchorTags()
    const { img, imgTags } = getImages()

    const handleResponse = (response) => {
        console.log(response)
        for (let i = 0; i < response.a.length; i++) {
            anchorTags[i].ariaLabel = response.a[i]
        }
        for (let i = 0; i < response.img.length; i++) {
            imgTags[i].alt = response.a[i].substr(10, response.a[i].length - 6 - 11)
        }
        console.log("Anchor and img tags updated")
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
