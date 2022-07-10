import React from 'react';
import { NavLink } from 'react-router-dom'

import DefaultImage from 'assets/image/default.jpg'

const MoviesList = (props) => {
    const { 
        moviesList,
    } = props;

    console.log('MoviesList RENDER');

    return (
        <section id="movies-list">
            <div className='container'>
                <ul>
                { moviesList?.map((movie, index) => (
                    <li key={index}>
                        <NavLink to={`details/${movie.id}`} >
                            <div>
                                <div className='image-container'>
                                    <img src={movie?.primaryImage?.url ? movie?.primaryImage?.url : DefaultImage} alt={movie?.titleText?.text} />
                                </div>
                                <h1>{movie?.titleText?.text}</h1>
                            </div>
                        </NavLink>
                    </li>
                )) }
                </ul>
            </div>
        </section>
    );
};

export default  React.memo(MoviesList);