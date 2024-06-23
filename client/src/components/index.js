// Importowanie komponentów Card, FormField i Loader z odpowiednich plików
import Card from './Card.jsx';
import FormField from './FormField.jsx';
import Loader from './Loader.jsx';

// Eksportowanie zaimportowanych komponentów jako obiekt, aby można było je łatwo importować w innych częściach aplikacji
export {
    Card,
    FormField,
    Loader
};

/*
Ten moduł importuje trzy komponenty (Card, FormField i Loader) z odpowiednich plików,
a następnie eksportuje je jako obiekt. Dzięki temu inne moduły w aplikacji mogą
łatwo importować te komponenty w jednym imporcie. To ułatwia zarządzanie komponentami
i utrzymanie porządku w kodzie.
*/
