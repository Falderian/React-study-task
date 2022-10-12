import { baseApi } from 'api/API';
import axios from 'axios';
import { returnGenresString } from 'helpers/modalHelpers';
import { ISearchCards } from 'interfaces/searchCard';
import React, { RefObject } from 'react';
import { Component } from 'react';

export class PageSearch extends Component {
  apiKey = `0e655211503a99e2b6a8909e76f606a6`;
  apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
  apiImg = `https://image.tmdb.org/t/p/w500`;
  apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query`;
  state = {
    data: [],
    isLoaded: false,
    isModal: false,
    modalDataId: '',
    movieData: {
      adult: false,
      backdrop_path: '/ghsPsvM0sEztdNT4kUlTsBF2LEF.jpg',
      belongs_to_collection: null,
      budget: 0,
      genres: [
        {
          id: 18,
          name: 'Drama',
        },
        {
          id: 28,
          name: 'Action',
        },
        {
          id: 53,
          name: 'Thriller',
        },
      ],
      homepage: 'https://www.netflix.com/title/81312828',
      id: 852046,
      imdb_id: 'tt15445056',
      original_language: 'fr',
      original_title: 'Athena',
      overview:
        'Hours after the tragic death of their youngest brother in unexplained circumstances, three siblings have their lives thrown into chaos.',
      popularity: 2910.278,
      poster_path: '/fenNPxVF5ERy0CSyVruuEg959Hg.jpg',
      production_companies: [],
      production_countries: [],
      release_date: '2022-09-09',
      revenue: 0,
      runtime: 97,
      spoken_languages: [],
      status: 'Released',
      tagline: '',
      title: 'Athena',
      video: false,
      vote_average: 6.6,
      vote_count: 246,
    },
  };

  searchInput: RefObject<HTMLInputElement>;
  constructor(props: string) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchInput = React.createRef();
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    const query = this.searchInput.current!.value;
    this.setState({ isLoaded: false });
    try {
      const url = this.apiSearch + `=${query}`;
      const data = await baseApi(url);
      this.setState({ data: data.results, isLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  async getMovieInfo(id: string) {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=0e655211503a99e2b6a8909e76f606a6`;
      const data = await axios.get(url);
      this.setState({ movieData: data.data });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    try {
      const data = await baseApi(this.apiUrl);
      this.setState({ data: data.results, isLoaded: true });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { isLoaded } = this.state;
    const data: ISearchCards = this.state.data;
    return (
      <div className="search__wrapper">
        {!this.state.isModal ? (
          ''
        ) : (
          <div className="modal">
            <div className="modal__content">
              <img src={this.apiImg + '/' + this.state.movieData.poster_path}></img>
              <div className="modal__description">
                <h4 className="card__title">Title: {this.state.movieData.title}</h4>
                <div className="card__release-date">
                  Release date: {this.state.movieData.release_date}
                </div>
                <div className="modal__genres">
                  Genres: {returnGenresString(this.state.movieData.genres)}
                </div>
                <div className="modal__movie-status">Status: {this.state.movieData.status}</div>
                <div className="modal__runtime">Runtime: {this.state.movieData.runtime} mins</div>
                <div className="card_popularity">Popularity: {this.state.movieData.popularity}</div>
                <div className="card__votes">
                  <div className="card__vote-count">
                    Vote count: {this.state.movieData.vote_count}
                  </div>
                  <div className="card__vote-average">
                    Vote average: {this.state.movieData.vote_average}
                  </div>
                </div>
                <div className="modal__movie-description">{this.state.movieData.overview}</div>
              </div>
              <div className="modal__close">
                <button className="modal__close-btn">X</button>
              </div>
            </div>
          </div>
        )}
        <div className="search">
          <form className="search-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="search-form-input" className="search-form__label">
              Enter data request:
              <input
                required
                className="search-form__input"
                type="text"
                id="search-form-input"
                ref={this.searchInput}
              ></input>
            </label>
            <button className="search-form_submit-btn" type="submit" id="submit-btn">
              Send
            </button>
          </form>
        </div>
        {!isLoaded ? (
          <div className="spinner-block">
            <div className="spinner spinner-1"></div>
          </div>
        ) : (
          <div className="search__cards">
            {!this.state.data ? (
              <div className="search__not-found">Sorry, nothing was found.</div>
            ) : (
              data.map((el) => {
                return (
                  <div key={el.id} className="card">
                    <div className="card__img-cont">
                      <img src={this.apiImg + '/' + el.poster_path}></img>
                    </div>
                    <button
                      id={el.id.toString()}
                      className="card__btn"
                      onClick={(evt) => {
                        this.setState({
                          modalDataId: (evt.target as HTMLButtonElement).id,
                          isModal: true,
                        });
                        this.getMovieInfo((evt.target as HTMLButtonElement).id);
                      }}
                    >
                      View more
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  }
}
