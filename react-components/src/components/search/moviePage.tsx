import { getMovieTrailer } from 'api/API';
import { returnGenresString, YoutubeEmbed } from 'helpers/modalHelpers';
import { IStore } from 'helpers/redux/store';
import { AppContext } from 'helpers/stateManamement/context';
import { ICardResponse } from 'interfaces/searchCard';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export const MoviePage = () => {
  const [movie, setMovie] = useState<ICardResponse>();
  const [isLoaded, setLoaded] = useState(true);
  const [trailerKey, setTrailerKey] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const state = useSelector<IStore>((state) => state) as IStore;

  useEffect(() => {
    setLoaded(false);
    const id = params.id!.toString();
    const temp = state.searchData.searchItems.find((el) => {
      return el.id === Number(params.id);
    });
    setMovie(temp);
    getMovieTrailer(id).then((res) => {
      setTrailerKey(res);
      setLoaded(true);
    });
    const headerLinks = document.querySelectorAll('.header__link');
    headerLinks[2].innerHTML = temp!.title;
    return () => {
      headerLinks[2].innerHTML = 'Search';
    };
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
              <div className="movie__release-date">Release date: {movie?.release_date}</div>
              <div className="movie__status">Popularity: {movie?.popularity.toFixed(0)}</div>
              <div className="movie__runtime">Vote average: {movie?.vote_average}</div>
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
