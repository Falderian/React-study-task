import { baseApi } from 'api/API';
import { ISearchCards } from 'interfaces/searchCard';
import React, { RefObject } from 'react';
import { Component } from 'react';

export class PageSearch extends Component {
  apiKey = `0e655211503a99e2b6a8909e76f606a6`;
  apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
  apiImg = `https://image.tmdb.org/t/p/w500`;
  apiSearch = `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query`;
  state = { data: [], isLoaded: false, description: false };

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
        <div className="search">
          <form className="search-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label htmlFor="search-form-input" className="search-form__label">
              Enter data request:
              <input
                className="search-form__input"
                type="text"
                id="search-form-input"
                ref={this.searchInput}
              ></input>
            </label>
            <label className="search-form__desc-checkbox">
              Description
              <input
                type="checkbox"
                onClick={() => this.setState({ description: !this.state.description })}
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
            {data.map((el) => {
              return (
                <div key={el.id} className="card">
                  <div className="card__img-cont">
                    <img src={this.apiImg + '/' + el.poster_path}></img>
                  </div>
                  <h4 className="card__title">Title: {el.title}</h4>
                  <div className="card__release-date">Release date: {el.release_date}</div>
                  <div className="card_popularity">Popularity: {el.popularity}</div>
                  <div className="card__votes">
                    <div className="card__vote-count">Vote count: {el.vote_count}</div>
                    <div className="card__vote-average">{el.vote_average}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
