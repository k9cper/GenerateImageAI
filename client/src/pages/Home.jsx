import React, { useState, useEffect } from 'react';
import { Loader, Card, FormField } from '../components';

// Komponent funkcjonalny RenderCards renderuje karty postów lub komunikat braku wyników
const RenderCards = ({ data, title }) => {
    // Sprawdza, czy istnieją dane do wyrenderowania
    if (data?.length > 0) {
        // Mapuje dane na komponenty Card dla każdego posta
        return data.map((post) => <Card key={post._id} {...post} />)
    }

    // Jeśli brak danych, wyświetla tytuł informujący o braku wyników
    return (
        <h2 className='mt-2 font-bold text-[#6449ff] text-xl uppercase'>{title}</h2>
    )
}

const Home = () => {
    // Stany do zarządzania stanem ładowania, wszystkimi postami, tekstem wyszukiwania i wynikami wyszukiwania
    const [loading, setLoading] = useState(false);
    const [allPosts, setAllPosts] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Efekt pobierający wszystkie posty z serwera po załadowaniu komponentu
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);

            try {
                const response = await fetch('https://pixelgenius-bvpo.onrender.com/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    // Ustawia pobrane posty, odwrócone dla najnowszych na górze
                    setAllPosts(result.data.reverse());
                }
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    // Obsługa zmiany tekstu w polu wyszukiwania
    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                // Filtruje wyniki na podstawie wprowadzonego tekstu
                const searchResults = allPosts.filter((item) =>
                    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.prompt.toLowerCase().includes(searchText.toLowerCase())
                );

                setSearchResults(searchResults);
            }, 500)
        );
    }

    return (
        <section className='max-w-7xl mx-auto'>
            <div>
                <h1 className='font-extrabold text-[#222328] text-[32px]'>
                    Publiczna tablica
                </h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Sprawdź co wygenerowali inni!</p>
            </div>

            <div className='mt-16'>
                {/* Pole wyszukiwania postów */}
                <FormField
                    labelName='Search posts'
                    type='text'
                    name='text'
                    placeholder='Wyszukaj...'
                    value={searchText}
                    handleChange={handleSearchChange}
                />
            </div>

            <div className='mt-10'>
                {loading ? (
                    // Loader podczas ładowania danych
                    <div className='flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : (
                    <>
                        {/* Wyświetla tekst informujący o wynikach wyszukiwania */}
                        {searchText && (
                            <h2 className='font-medium text-[#666e75] text-xl mb-3'>
                                Wyniki dla <span className='text-[#222328]'>{searchText}</span>
                            </h2>
                        )}
                        {/* Renderuje karty postów z danymi lub komunikat o braku wyników */}
                        <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
                            {searchText ? (
                                <RenderCards
                                    data={searchResults}
                                    title="Brak postów o tym opisie"
                                />
                            ) : (
                                <RenderCards
                                    data={allPosts}
                                    title="Brak postów"
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}

export default Home;

/*
Komponent Home odpowiada za stronę główną aplikacji, na której wyświetlane są wszystkie posty z serwera.
- Używa Hooka useEffect do pobrania postów z serwera po załadowaniu komponentu.
- Używa Hooków useState do zarządzania stanem ładowania, danych postów, tekstu wyszukiwania i wyników wyszukiwania.
- Zawiera komponent RenderCards do renderowania kart postów lub informacji o braku wyników.
- Zawiera pole wyszukiwania, które filtruje wyniki w czasie rzeczywistym po wprowadzeniu tekstu.
- Renderuje Loader podczas ładowania danych i wyświetla odpowiedni tekst informacyjny lub karty postów.

Komponent ten integruje różne funkcjonalności w celu przeglądania i wyszukiwania postów w społeczności korzystającej z AI do generowania obrazów.
*/
