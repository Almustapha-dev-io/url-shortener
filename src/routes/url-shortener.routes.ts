import { Router } from 'express';

import { shortenUrl, getUrl } from '../controllers/url-shortener.controllers';

const router = Router();

router.get('/:url', getUrl);

router.post('/', shortenUrl);

export default router;