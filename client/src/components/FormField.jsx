import React from 'react'

// Komponent FormField przyjmuje kilka właściwości, które są używane do renderowania etykiety, pola formularza i opcjonalnego przycisku "Surprise Me"
const FormField = ({ LabelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      {/* Sekcja etykiety i przycisku "Surprise Me" */}
      <div className='flex items-center gap-2 mb-2'>
        <label 
          htmlFor={name}
          className='block text-sm font-medium text-gray-900'
        >
          {LabelName}
        </label>
        {/* Wyświetlanie przycisku "Surprise Me" jeśli isSurpriseMe jest prawdziwe */}
        {isSurpriseMe && (
          <button
            type='button'
            onClick={handleSurpriseMe}
            className='font-semibold text-sx bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black'
          >
            Zaskocz mnie
          </button>
        )}
      </div>
      {/* Pole formularza */}
      <input 
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3'
      />
    </div>
  )
}

export default FormField

/*
Ten komponent React o nazwie FormField renderuje pole formularza z etykietą i opcjonalnym przyciskiem "Surprise Me".
Właściwości:
- LabelName: Tekst etykiety dla pola formularza.
- type: Typ pola formularza (np. tekst, email, hasło).
- name: Nazwa i ID pola formularza.
- placeholder: Tekst placeholdera dla pola formularza.
- value: Wartość pola formularza.
- handleChange: Funkcja obsługi zmiany wartości pola formularza.
- isSurpriseMe: Boolean określający, czy przycisk "Surprise Me" ma być wyświetlany.
- handleSurpriseMe: Funkcja obsługi kliknięcia przycisku "Surprise Me".

Ten komponent jest przydatny do tworzenia dynamicznych formularzy z opcjonalnymi funkcjonalnościami.
*/
