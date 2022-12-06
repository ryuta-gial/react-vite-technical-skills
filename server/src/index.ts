import { httpServer } from './server';

const port = 5000; // default port to listen

// start the Express server
httpServer.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
