import app from './app';
import * as dotenv from 'dotenv';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 8000;

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
