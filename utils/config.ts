import dotenv from 'dotenv';

dotenv.config();
const { PORT } = process.env;
const { MONGODB_URL } = process.env;
const { NODE_DEV } = process.env;
const { TEST_MONGODB_URL } = process.env;

export default {
  PORT: PORT ?? "",
  MONGODB_URL: MONGODB_URL ?? "",
  NODE_DEV: NODE_DEV ?? "",
  TEST_MONGODB_URL: TEST_MONGODB_URL ?? ""
};
