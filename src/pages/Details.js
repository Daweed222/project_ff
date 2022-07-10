import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Details = (props) => {
    const { moviesList } = props;
    const { id } = useParams();
    let selectedMovie = {}

    console.log(moviesList);

    if (moviesList?.length > 0) {
        selectedMovie = moviesList.filter(movie => movie.id === id)[0];
    }

    return (
       <section id="movie-detail">
            <NavLink to="/" style={{
                display: 'block',
                textDecoration: 'none',
                marginBottom: '15px',
                fontWeight: '500',
                fontSize: '18px',
            }} >Back</NavLink>
            <div className='detail-container'>
                <div className='image-container'>
                    <img src={selectedMovie.primaryImage?.url} />
                </div>
                <div className='information-container'>
                    <h1>{selectedMovie.titleText?.text}</h1>
                    <h2>{selectedMovie.releaseYear?.year}</h2>
                    <p>{selectedMovie.plot?.plotText?.plainText}</p>
                </div>
            </div>
       </section> 
    );
}

export default Details;