import express from 'express'; // Importuje moduł Express.js
import * as dotenv from 'dotenv'; // Importuje moduł dotenv do zarządzania zmiennymi środowiskowymi
import cors from 'cors'; // Importuje moduł Cors do obsługi Cross-Origin Resource Sharing (CORS)
import connectDB from './mongodb/connect.js'; // Importuje funkcję connectDB do łączenia się z bazą danych MongoDB
import postRoutes from './routes/postRoutes.js'; // Importuje routy dla postów
import dalleRoutes from './routes/dalleRoutes.js'; // Importuje routy dla DALL-E

dotenv.config(); // Wczytuje zmienne środowiskowe z pliku .env do procesu Node.js

const app = express(); // Tworzy instancję aplikacji Express
app.use(cors()); // Dodaje obsługę CORS dla wszystkich żądań
app.use(express.json({ limit: '50mb' })); // Ustawia parser do obsługi danych JSON z limitem na 50MB

// Dodaje routy dla postów i DALL-E
app.use('/api/v1/post', postRoutes); // Używa routów zdefiniowanych w postRoutes dla ścieżki '/api/v1/post'
app.use('/api/v1/dalle', dalleRoutes); // Używa routów zdefiniowanych w dalleRoutes dla ścieżki '/api/v1/dalle'

// Endpoint główny z odpowiedzią "Hello from DALL-E!"
app.get('/', async (req, res) => {
    res.send("Hello from DALL-E!");
});

// Funkcja startująca serwer Express
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL); // Łączy się z bazą danych MongoDB używając URL zdefiniowanego w zmiennych środowiskowych
        app.listen(8080, () => console.log('Server has started on port https://localhost:8080')); // Uruchamia serwer na porcie 8080
    } catch (error) {
        console.log(error); // W przypadku błędu wyświetla błąd w konsoli
    }
};

startServer(); // Uruchamia funkcję startServer

