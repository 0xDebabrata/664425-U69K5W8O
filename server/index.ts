import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { gptCall } from './src/connect';
import { PORT } from './src/environment'

const app: Express = express();

app.use(bodyParser.json())
// app.set('view engine', 'pug')
// app.set('views', './templates')

app.get('/', (req: Request, res: Response) => {
    res.send("this is screwed GG");
});

app.get('/handle-html', async (req: Request, res: Response) => {
    const buttonList = [
        "<button>This is a button</button>",
        "<button>This is another button</button>"
    ]
    const ans = await gptCall(buttonList);
    res.send("this is header html GG")
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});