import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'; // Importuje BrowserRouter, Link, Route, Routes z react-router-dom
import { logo } from './assets'; // Importuje logo z folderu assets
import { Home, CreatePost } from './pages'; // Importuje komponenty Home i CreatePost z folderu pages

const App = () => {
  return (
    <BrowserRouter>
      {/* Nagłówek aplikacji */}
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain"/> {/* Link do strony głównej z logo */}
        </Link>

        <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">Stwórz</Link> {/* Przycisk do tworzenia nowego posta */}
      </header>

      {/* Główna treść aplikacji */}
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />}/> {/* Trasa do komponentu Home na ścieżce głównej */}
          <Route path='/create-post' element={<CreatePost />}/> {/* Trasa do komponentu CreatePost na ścieżce /create-post */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
