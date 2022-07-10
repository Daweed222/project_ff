import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from 'components/MoviesList';

const Index = () => {
    const [moviesList, setMoviesList] = useState([]);
    const [query, setQuery] = useState('');
    const [isLodaing, setIsLoading] = useState(false);

     const fetchMovies = useCallback(() => {
        if (query.length > 0) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'bf24658d49msh46709e845acf958p15a101jsnf5608fbade75',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            };
           
            fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${encodeURIComponent(query)}?info=mini_info&limit=12&page=1&titleType=movie`, options)
                .then(response => response.json())
                .then((response) => {
                    setMoviesList(response.results);
                    console.log(response)
                })
                .catch(err => console.error(err));
        }
    }, [query]);

    useEffect(() => {
        const timeoutIdentifier = setTimeout(() => {
            fetchMovies();
        }, 500)
        return () => {
            clearTimeout(timeoutIdentifier);
        }
    }, [fetchMovies])


    const searchInputChangeHandler = (e) => {
        console.log(e.target.value.length);
        if (e.target.value.length === 0) { setMoviesList([]); }
        setQuery(e.target.value);
    };

    const clearSearch = () => {
        setQuery('');
        setMoviesList([])
    }

    console.log('Index RENDER');

    return (
        <>
            <section id="search-field">
                <div className='input-container'>
                    <input id="searchQuery" type="text" placeholder="Search..." value={query} onChange={(e) => {searchInputChangeHandler(e);}} />
                    <div className="btn input-clear" onClick={clearSearch}>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
            <MoviesList moviesList={moviesList} />
        </>
    );
}

export default Index;