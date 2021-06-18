import { Request, Response, NextFunction } from 'express';
import { nanoid } from 'nanoid';
import validator from 'validator';

import { findByLongUrl, insertData, findByShortUrl } from './../util/queries';

import CustomError from '../types/custom-error';
import pool from '../util/db';
import errorHandler from '../util/error-handler';

export const getUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Trying to get shortened at ${req.params.url}`);
    try {
        let url  = req.params.url.trim();
        let error: CustomError;

        if (!url || validator.isEmpty(url)) {
            error = new CustomError('An invalid url was provided!', 400);
            throw error;
        }

        console.log('To Execute: ' + findByShortUrl);
        const { rows: [data] } = await pool.query(findByShortUrl, [url]);
        if (!data) {
            error = new CustomError('Resource could not be found!', 404);
            throw error;
        }

        return res.redirect(data.long_url);
    } catch (err) {
        errorHandler(next, err);
    }
};

export const shortenUrl = async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Trying to shorten ${req.body.url}`);
    try {
        const host = req.headers.host;
        const { url } = req.body;
        let error: CustomError;

        if (!url || !validator.isURL(url)) {
            error = new CustomError('Invalid url. Please provide a valid url!', 422);
            throw error;
        }

        console.log('To Execute: ' + findByLongUrl);
        const { rows: [existingUrl] } = await pool.query(findByLongUrl, [url.toLowerCase()]);
        if (existingUrl) {
            return res.status(200).json({
                message: `${url} was shortened!`,
                data: host + '/short/' + existingUrl.short_url
            });
        }

        const newShorten = {
            short_url: nanoid(),
            long_url: url.toLowerCase()
        };

        console.log('To Execute: ' + insertData);
        await pool.query(insertData, [newShorten.long_url, newShorten.short_url]);

        return res.status(200).json({ 
            message: `${url} was shortened!`,
            data: host + '/short/' + newShorten.short_url
        });

    } catch (err) {
        errorHandler(next, err);
    }
};