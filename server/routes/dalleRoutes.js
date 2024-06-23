import express from 'express'; // Importuje moduł Express.js
import * as dotenv from 'dotenv'; // Importuje moduł dotenv do zarządzania zmiennymi środowiskowymi
import OpenAI from 'openai'; // Importuje moduł OpenAI SDK

dotenv.config(); // Wczytuje zmienne środowiskowe z pliku .env do procesu Node.js

const router = express.Router(); // Tworzy router Express

// Inicjalizuje instancję OpenAI przy użyciu klucza API zmiennych środowiskowych
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const name = 'kacper'; // Przykładowa zmienna z imieniem

// Definiuje trasę '/api/v1/dalle' dla metod POST
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body; // Pobiera prompt z ciała żądania

    // Generuje obraz za pomocą OpenAI, używając podanego prompta i ustawień
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    // Pobiera dane obrazu w formacie base64 z odpowiedzi OpenAI
    const image = aiResponse.data[0].b64_json;

    // Zwraca odpowiedź HTTP 200 i JSON z obrazem
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error); // Loguje błędy do konsoli

    // Zwraca odpowiedź HTTP 500 w przypadku błędu, zawierając komunikat o błędzie lub domyślny komunikat
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
});

export default router; // Eksportuje router Express zawierający zdefiniowane trasy
