
import { server } from './server.mjs';


// Define the port
const PORT = 3001;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});