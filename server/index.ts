import express, { Express, Request, Response } from 'express';
const cors = require('cors')
import bodyParser from 'body-parser';
import { gptCall } from './src/connect';
import { PORT } from './src/environment'

const app: Express = express();

app.use(bodyParser.json())
app.use(cors())
// app.set('view engine', 'pug')
// app.set('views', './templates')

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world");
});

app.post('/process-elements', async (req: Request, res: Response) => {
    console.log(req.body)

    const anchorList = [
        "https://www.google.com",
        "https://www.facebook.com",
        "https://www.commonplace.one",
        "https://www.devstream.in"
    ]

    return res.json("Ok")
    const accessibleOutput: string = await gptCall(anchorList, "anchor");
    console.log(accessibleOutput)
    const accessibleArray = accessibleOutput.split("\n")
    //res.send(accessibleArray)
    res.send("Ok")
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
