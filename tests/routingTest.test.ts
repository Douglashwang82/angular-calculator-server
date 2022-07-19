// import mongoose from "mongoose";
import supertest from 'supertest';
import app from '../src/app';
import CalculatorRecord from '../models/calculatorRecordModel';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const api: supertest.SuperTest<supertest.Test> = supertest(app);

const initialRecords = [
    {
        previousOperand: '1',
        currentOperand: '2',
        operator: '+',
        result: '3'
    },
    {
        previousOperand: '0.1',
        currentOperand: '3',
        operator: 'x',
        result: '0.3'
    },
    {
        previousOperand: '500',
        currentOperand: '300',
        operator: '-',
        result: '200'
    },
];

// initial Testing DB
beforeEach(async () => {
    await CalculatorRecord.deleteMany({});
    await CalculatorRecord.insertMany(initialRecords);
});
describe('Testing normal API usage.', () => {
    test('Test GET caculator records.', async () => {
        const response = await api.get('/api/calculator');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(initialRecords.length);
        expect(response.type).toBe("application/json");
    });


    test('Test POST a calculator record.', async () => {
        const newRecord = {
            previousOperand: "1",
            currentOperand: "2",
            operator: "+",
            result: "3"
        };

        await api
            .post('/api/calculator')
            .send(newRecord)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const response = await api.get('/api/calculator');

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
        const result = response.body.map((t: { result: any; }) => t.result);
        expect(response.body).toHaveLength(initialRecords.length + 1);
        expect(result).toContain('3');
    });
});