import mongoose from 'mongoose';

const calculatorRecordSchema = new mongoose.Schema({
    previousOperand:{
        type: String,
        required: true
    },
    currentOperand:{
        type: String,
        required: true
    },
    operator:{
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
});

calculatorRecordSchema.set('toJSON',{
    transform: (_document, returnedObject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

const CalculatorRecord = mongoose.model('CalculatorRecord', calculatorRecordSchema);

export default CalculatorRecord;

