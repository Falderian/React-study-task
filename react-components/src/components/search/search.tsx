import { baseApi } from 'api/API';
import { ISearchCards } from 'interfaces/searchCard';
import React from 'react';
import { Component } from 'react';

export class PageSearch extends Component {
  apiKey = `0e655211503a99e2b6a8909e76f606a6`;
  apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`;
  apiImg = `https://image.tmdb.org/t/p/w500`;
  apiSearch = `https://api.themoviedb.org/3/search/company?api_key=${this.apiKey}query`;
  state = { data: [], isLoaded: false };

  async componentDidMount() {
    try {
      const data = await baseApi();
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
          <form className="search-form">
            <label htmlFor="search-form-input" className="search-form__label">
              Введите данные для поиска:
              <input className="search-form__input" type="text" id="search-form-input"></input>
            </label>
            <button className="search-form_submit-btn" type="submit" id="submit-btn">
              Отправить
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
                    <div className="card__vote-count">{el.vote_count}</div>
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
