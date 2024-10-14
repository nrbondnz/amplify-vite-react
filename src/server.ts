// src/server.ts
import { Task } from "@entities/Task";
import express from 'express';
import { remultExpress } from 'remult/remult-express';

const app = express();
const api = remultExpress({
	entities: [Task],
});

app.use(api);

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});