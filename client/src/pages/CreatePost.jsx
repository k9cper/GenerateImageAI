import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Importowanie zasobu graficznego 'preview' oraz funkcji użytej do generowania losowego promptu
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';

// Importowanie komponentów FormField i Loader z lokalnych plików
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();

  // Stan przechowujący dane formularza
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  // Stany do zarządzania stanem ładowania
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // Funkcja obsługująca zmianę wartości w formularzu
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Funkcja generująca losowy prompt
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  // Funkcja generująca obraz za pomocą zewnętrznego API
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://pixelgenius-bvpo.onrender.com/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        // Ustawienie wygenerowanego obrazu jako wartość form.photo
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  // Funkcja obsługująca wysłanie formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('https://pixelgenius-bvpo.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        // alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Stwórz swoje zdjęcie</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Wprowadź swój wymyślony tekst i patrz jak sztuczna inteligencja tworzy obraz na jego podstawie. Następnie pochwal się swoim zdjęciem z innymi!</p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {/* Komponent FormField dla nazwy użytkownika */}
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Nazwa użytkownika"
            value={form.name}
            handleChange={handleChange}
          />

          {/* Komponent FormField dla promptu z opcją "Surprise Me" */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="koty-piraci na wyspie z karmazynowymi żaglami"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Pole wyświetlające podgląd wygenerowanego obrazu */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {/* Loader wyświetlany podczas generowania obrazu */}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Przycisk generowania obrazu */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generuje...' : 'Generuj zdjęcie'}
          </button>
        </div>

        {/* Sekcja informacyjna i przycisk udostępniania */}
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Nadszedł czas, żeby podzielić się zdjęciem z innymi **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Udostępnianie...' : 'Udostępnij'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;

/*
Komponent CreatePost odpowiada za formularz tworzenia nowego posta z obrazem generowanym za pomocą AI.
- Używa Hooka useNavigate z react-router-dom do nawigacji po zakończeniu operacji.
- Używa stanów: form (do przechowywania danych formularza), generatingImg (do monitorowania procesu generowania obrazu), loading (do monitorowania procesu wysyłania formularza).
- Funkcje: handleChange, handleSurpriseMe, generateImage, handleSubmit obsługują interakcje użytkownika i komunikację z API.
- Renderuje komponenty FormField (dla nazwy użytkownika i promptu) oraz Loader (do wyświetlania animacji podczas ładowania).

Komponent ten integruje różne funkcjonalności w celu umożliwienia użytkownikowi generowania i udostępniania obrazów AI.
*/
