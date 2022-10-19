import { getMovieInfo, getMovieTrailer } from 'api/API';
import { YoutubeEmbed } from 'helpers/modalHelpers';
import { ICardResponse } from 'interfaces/searchCard';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviePage = () => {
  const params = useParams();
  const [movie, setMovie] = useState<ICardResponse>();
  const [isLoaded, setLoaded] = useState(true);
  const [trailerKey, setTrailerKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(false);
    const id = params.id!.toString();
    getMovieInfo(id).then((data) => setMovie(data));
    getMovieTrailer(id).then((res) => setTrailerKey(res));
    setLoaded(true);
  }, []);

  return (
    <div className="movie__wrapper">
      {!isLoaded ? (
        'Loading...'
      ) : (
        <div className="movie">
          <div className="movie__img-cont">
            <img
              className="movie__img"
              src={`https://image.tmdb.org/t/p/original` + movie?.poster_path}
            ></img>
            <button className="movie__btn" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
          <div className="movie__description">
            <div className="movie__info">
              <div className="movie__title">Title: {movie?.title}</div>
              <div className="movie__tagline">Tagline: {movie?.tagline}</div>
              <div className="movie__release-date">Release date: {movie?.release_date}</div>
              <div className="movie__status">Status: {movie?.status}</div>
              <div className="movie__runtime">Runtime: {movie?.runtime + ` mins`}</div>
              <div className="movie__overview">Overview: {movie?.overview}</div>
            </div>
            <div className="movie__trailer">
              <YoutubeEmbed embedId={trailerKey} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
