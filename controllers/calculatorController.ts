import express from 'express';
import CalculatorRecord from '../models/calculatorRecordModel';

const router = express.Router();

router.get('/', (_request, response) => {
    console.log('getting');
    const fetchCalRecord = new Promise<any>((resolve, _reject) => {
        void (async () => {
            const result = await CalculatorRecord.find({});
            resolve(result);
        })();
    });
    fetchCalRecord
        .then(result => { response.json(result).end(); })
        .catch(error => {
            console.log(error);
            response.status(400).send(error);
        });
});

router.post('/', (request, response) => {
    console.log('posting');
    const newCalculatorRecord = new CalculatorRecord(request.body);
    void newCalculatorRecord
        .save()
        .then(result => {
            response.status(202).send(result);
        })
        .catch(error => {
            response.status(400).json(error);
        });

});

export default router;