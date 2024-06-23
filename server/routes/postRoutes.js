import express from 'express'; // Importuje moduł Express.js
import * as dotenv from 'dotenv'; // Importuje moduł dotenv do zarządzania zmiennymi środowiskowymi
import { v2 as cloudinary } from 'cloudinary'; // Importuje moduł Cloudinary SDK v2
import Post from '../mongodb/models/post.js'; // Importuje model Post z MongoDB

dotenv.config(); // Wczytuje zmienne środowiskowe z pliku .env do procesu Node.js

const router = express.Router(); // Tworzy router Express

// Konfiguruje Cloudinary SDK przy użyciu zmiennych środowiskowych
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint GET dla pobierania wszystkich postów
router.route('/').get(async (req, res) => {
  try {
    const posts = await Post.find({}); // Pobiera wszystkie posty z bazy danych

    // Zwraca odpowiedź HTTP 200 i JSON z listą postów
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    // Zwraca odpowiedź HTTP 500 w przypadku błędu, zawierając komunikat o błędzie
    res.status(500).json({ success: false, message: error });
  }
});

// Endpoint POST dla tworzenia nowego posta
router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body; // Pobiera name, prompt i photo z ciała żądania

    // Wysyła zdjęcie do Cloudinary i pobiera URL przetworzonego zdjęcia
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Tworzy nowy post w bazie danych MongoDB
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url, // Zapisuje URL zdjęcia z Cloudinary
    });

    // Zwraca odpowiedź HTTP 201 i JSON z nowo utworzonym postem
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    // Zwraca odpowiedź HTTP 500 w przypadku błędu, zawierając komunikat o błędzie
    res.status(500).json({ success: false, message: error });
  }
});

export default router; // Eksportuje router Express zawierający zdefiniowane trasy
