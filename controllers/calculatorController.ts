import express from 'express';
import CalculatorRecord from '../models/calculatorRecordModel';

const router = express.Router();

router.get('/', (_request, response, next) => {
    const fetchCalRecord = new Promise<unknown>((resolve, _reject) => {
        void (async () => {
            const result = await CalculatorRecord.find({});
            resolve(result);
        })();
    });
    fetchCalRecord
        .then(result => { response.json(result).end(); })
        .catch(error => {
            // response.status(400).send(error);
            next(error);
        });
});

router.post('/', (request, response, next) => {
    const newCalculatorRecord = new CalculatorRecord(request.body);
    void newCalculatorRecord
        .save()
        .then(result => {
            response.status(201).send(result);
        })
        .catch(error => {
            // response.status(400).json(error);
            next(error);
        });

});

export default router;