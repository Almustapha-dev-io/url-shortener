import express, { Request, Response, NextFunction} from 'express';

import pool from './util/db';
import { forceSeed, seed } from './util/sync-db';
import errorMiddleware from './middleware/error.middleware';

import urlShortenerRoutes from './routes/url-shortener.routes';

const app = express();

app.use(express.json());

app.use('/short', urlShortenerRoutes);

app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    seed()
        .then(() => {
            console.log('DB seeded!');
            console.log(`Listening on ${port}...`);
        })
        .catch(err => {
            console.error(err);
            pool.end()
            process.exit(1);
        })
});