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
    const parr = []
    let anchorAccessibleArray: any[] = []
    let buttonAccessibleArray: any[] = []
    let imageAccessibleArray: any[] = []
    if (a) {
        const anchorOutput: string = await gptCall(a, "anchor");
        anchorAccessibleArray = anchorOutput.split("\n")
    }

    if (btn) {
        const buttonOutput: string = await gptCall(btn, "button");
        buttonAccessibleArray = buttonOutput.split("\n")
    }

    if (img) {
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

        imageAccessibleArray = await Promise.all(parr)
    }

    const serverResponse = {
        a: anchorAccessibleArray,
        btn: buttonAccessibleArray,
        img: imageAccessibleArray
    }

    console.log(serverResponse)
    res.json({
        a: anchorAccessibleArray,
        btn: buttonAccessibleArray,
        img: imageAccessibleArray
    })
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
