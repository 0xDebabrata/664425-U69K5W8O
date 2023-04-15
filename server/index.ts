import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { gptCall } from './src/connect';
import { PORT } from './src/environment'

const cors = require('cors')
const app: Express = express();

app.use(bodyParser.json())
app.use(cors())
// app.set('view engine', 'pug')
// app.set('views', './templates')

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world");
});

app.post('/process-elements', async (req: Request, res: Response) => {
    const { a, img, btn } = req.body
    const imgCaptions: string[] = []
    const parr = []

    const anchorOutput: string = await gptCall(a, "anchor");
    const anchorAccessibleArray = anchorOutput.split("\n")

    const buttonOutput: string = await gptCall(btn, "button");
    const buttonAccessibleArray = buttonOutput.split("\n")

    for (const url in img) {
        const data = fetch('http://localhost:8080/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url
            })
        })
        parr.push(data)
    }

    const imageAccessibleArray = await Promise.all(parr)

    res.json({
        a: anchorAccessibleArray,
        btn: buttonAccessibleArray,
        img: imageAccessibleArray
    })
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
