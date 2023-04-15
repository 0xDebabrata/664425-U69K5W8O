from typing import Union

import urllib.request
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sGPT import generate_caption

origins = [
    "*",
    "http://localhost",
    "http://localhost:8080",
]


def download_image(url):
    tup = urllib.request.urlretrieve(url, "./sGPT/image.jpg")
    print("image downloaded")


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class RequestParams(BaseModel):
    url: str


@app.post("/")
def read_root(req: RequestParams) -> str:
    print("download start")
    download_image(req.url)
    print("download end")
    caption: str = generate_caption()
    return caption
