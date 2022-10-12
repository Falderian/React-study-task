import { IGenres } from 'interfaces/searchCard';

export const returnGenresString = (arr: IGenres) => {
  let result = '';
  arr.forEach((it) => {
    result += it.name.toLowerCase() + ', ';
    +',';
  });
  return result.slice(0, result.length - 2);
};
