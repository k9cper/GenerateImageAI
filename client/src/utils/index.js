import FileSaver from 'file-saver'; // Importuje bibliotekę file-saver do pobierania plików
import { surpriseMePrompts } from '../constants'; // Importuje stałą surpriseMePrompts z pliku constants.js

// Funkcja getRandomPrompt zwraca losowy prompt z listy surpriseMePrompts, wykluczając podany prompt
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); // Losowy indeks z listy promptów
    const RandomPrompt = surpriseMePrompts[randomIndex]; // Losowy prompt na podstawie wylosowanego indeksu

    // Jeśli wylosowany prompt jest taki sam jak podany prompt, rekurencyjnie wywołuje funkcję getRandomPrompt
    if (RandomPrompt === prompt) return getRandomPrompt(prompt);

    return RandomPrompt; // Zwraca losowy prompt różny od podanego
}

// Funkcja downloadImage pobiera zdjęcie i zapisuje je jako plik JPG z odpowiednią nazwą
export async function downloadImage(_id, photo){
    FileSaver.saveAs(photo, `download-${_id}.jpg`); // Zapisuje zdjęcie pod nazwą zgodną z identyfikatorem _id
}
