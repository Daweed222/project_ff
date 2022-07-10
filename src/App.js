import React, { useState } from 'react';
import {
    Routes,
    Route,
} from "react-router-dom";

import Index from 'pages/Index'
import Details from 'pages/Details'

import 'assets/style/App.scss';

function App() {
    const [moviesList, setMoviesList] = useState([]);

    return (
        <>
            <header></header>
            <main>
                <Routes>
                    <Route exact path="/" element={<Index moviesList={moviesList}  setMoviesList={(list) => {setMoviesList(list)}} />} />
                    <Route path="/details/:id" element={<Details moviesList={moviesList} />} />
                </Routes>
            </main>
            <footer></footer>
        </>
  );
}

export default App;
