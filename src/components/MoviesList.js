import React from 'react';

import DefaultImage from 'assets/image/default.jpg'

const MoviesList = (props) => {
    const { moviesList } = props;
    console.log('MoviesList RENDER');
    return (
        <section id="movies-list">
            <div className='container'>
                <ul>
                { moviesList?.map((movie, index) => (
                    <li key={index}>
                        <div>
                            <div className='image-container'>
                                <img src={movie?.primaryImage?.url ? movie?.primaryImage?.url : DefaultImage} />
                            </div>
                            <h1>{movie?.titleText?.text}</h1>
                        </div>
                    </li>
                )) }
                </ul>
            </div>
        </section>
    );
};

export default MoviesList;