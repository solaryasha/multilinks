import express from 'express';
import { getTest } from './controllers/getTest';
import { getAnotherTest } from './controllers/getAnotherTest';


export const router = express.Router();


router.get('/test', getTest);
router.get('/another-test', getAnotherTest);