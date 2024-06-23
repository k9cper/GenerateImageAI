import React from 'react'

// Importowanie zasobu obrazu "download" z katalogu assets
import { download } from '../assets'
// Importowanie funkcji downloadImage z katalogu utils
import { downloadImage } from '../utils'

// Komponent Card przyjmuje właściwości: _id, name, prompt, photo
const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className='rounded-xl group relative shadow-card hover:shadow-cardhover card'>
      {/* Wyświetlanie zdjęcia */}
      <img 
        className='w-full h-auto object-cover rounded-xl'
        src={photo}
        alt={prompt}
      />
      {/* Ukryty początkowo div, który staje się widoczny po najechaniu myszką */}
      <div className='group-hover:flex flex-col max-h-[94.5%] hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md'>
        {/* Wyświetlanie tekstu prompt */}
        <p className='text-white text-md overflow-y auto prompt'>{prompt}</p>
        
        {/* Sekcja zawierająca nazwę użytkownika i przycisk do pobierania */}
        <div className='mt-5 flex justify-between items-center gap-2'>
          <div className='flex items-center gap-2'>
            {/* Ikona użytkownika z pierwszą literą jego imienia */}
            <div className='w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-sm font-bold'>
              {name[0]}
            </div>
            {/* Nazwa użytkownika */}
            <p className='text-white text-sm'>{name}</p>
          </div>
          {/* Przycisk do pobierania zdjęcia */}
          <button type='button' onClick={() => downloadImage(_id, photo)} className='outline-none bg-transparent border-none'>
            <img src={download} alt='download' className='w-6 h-6 object-contain invert'/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card

/*
Ten komponent React o nazwie Card renderuje kartę ze zdjęciem, nazwą użytkownika i tekstem prompt.
Po najechaniu myszką na kartę, pojawia się dodatkowa sekcja z możliwością pobrania zdjęcia.
Importowane są tutaj również zasoby zewnętrzne, takie jak ikona pobierania i funkcja do pobierania obrazu.
*/
