import { rest } from 'msw';
import { jackReacher } from './serverRespond';

export const handlers = [
  rest.get('https://api.themoviedb.org/3/movie/popular', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(jackReacher));
  }),
  rest.get('https://api.themoviedb.org/3/search/movie', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(jackReacher));
  }),
];
