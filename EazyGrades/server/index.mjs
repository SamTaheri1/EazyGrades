import { createApp } from './app.mjs';

export const app = createApp();
const port = Number(process.env.PORT || 4100);
const server = app.listen(port, '127.0.0.1', () => console.log(`EazyGrades API listening on http://localhost:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close(() => { app.locals.db.close(); process.exit(0); }));

