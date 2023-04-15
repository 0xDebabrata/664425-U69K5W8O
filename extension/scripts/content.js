const getImages = () => {
    const imgs = document.getElementsByTagName("img")
    for (let e of imgs) {
        console.log(e.alt)
    }
}

const handleResponse = (response) => {
    console.log(response)
}

const getAnchorTags = () => {
    const urls = []
    const links = document.getElementsByTagName("a")
    const regex = /\bhttps?:\/\/[-a-zA-Z0-9+&@#\/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#\/%=~_|]/;

    for (let a of links) {
        if (a.href && regex.test(a.href)) {
            urls.push(a.href)
        }
    }
    console.log(urls.join('\n'))

    chrome.runtime.sendMessage(
        {
            urls,
        },
        handleResponse
    )

    return urls
}


const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}

getAnchorTags()
