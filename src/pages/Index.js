import React, { useState, useEffect, useCallback } from 'react';

import CategorySelector from 'components/CategorySelector';
import MoviesList from 'components/MoviesList';

const Index = (props) => {
    const { moviesList, setMoviesList } = props;

    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    // const [myList, setMyList] = useState([]);

    const filterMovies = (movies = [], genre = '') => {
        const filteredMovies = [];

        if (genre === 'All' || genre === '') {
            setMoviesList(movies);
        } else {
            if (movies.length > 0) {
                movies.forEach(movie => {
                    if (movie.genres?.genres?.length > 0) {
                        let l = false;
                        let index = 0;
                        const genres = movie.genres.genres;
        
                        while (!l && index < genres.length) {
                            if(genres[index].text === genre) {
                                l = true;
                            } else { index++; }
                        }
        
                        if (l) {
                            filteredMovies.push(movie);
                        } 
                    }
                })
            }
            setMoviesList(filteredMovies);
        }
    };

     const fetchMovies = useCallback(() => {
        if (query.length > 0) {
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'bf24658d49msh46709e845acf958p15a101jsnf5608fbade75',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            };
           
            fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${encodeURIComponent(query)}?info=base_info&limit=12&page=1&titleType=movie`, options)
                .then(response => response.json())
                .then((response) => {
                    filterMovies(response.results, selectedCategory);
                    console.log(response)
                })
                .catch(err => console.error(err));
        }
    }, [query, selectedCategory]);

    useEffect(() => {
        const timeoutIdentifier = setTimeout(() => {
            fetchMovies();
        }, 500)
        return () => {
            clearTimeout(timeoutIdentifier);
        }
    }, [fetchMovies])

    const searchInputChangeHandler = (e) => {
        if (e.target.value.length === 0) { setMoviesList([]); }
        setQuery(e.target.value);
    };

    const categoryChangeHandler = (selectedCategory) => {
        setSelectedCategory(selectedCategory);
        filterMovies(moviesList, selectedCategory);
    };

    const clearSearch = () => {
        setQuery('');
        setMoviesList([]);
    };


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
                <div className='category-selector-container'>
                    <CategorySelector selectedCategory={selectedCategory} changeCategory={(c) => {categoryChangeHandler(c); }} />
                </div>
            </section>
            {moviesList.length > 0 ? <MoviesList moviesList={moviesList} /> : <p style={{textAlign: 'center'}}>No movies matched the search parameters :(</p>}
        </>
    );
}

export default React.memo(Index);