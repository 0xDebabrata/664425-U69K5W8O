import urllib.request


def download_image(url):
    tup = urllib.request.urlretrieve(url, "/sGPT/image1.jpg")
