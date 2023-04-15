import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(bodyParser.json())
// app.set('view engine', 'pug')
// app.set('views', './templates')

app.get('/', (req: Request, res: Response) => {
});


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});