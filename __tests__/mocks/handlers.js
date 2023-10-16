import { rest } from "msw";
import { genres, people, matches } from "../data/index.js";

export const handlers = [
  rest.get("https://find-that-film-backend.adaptable.app/api/genres", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ genres }));
  }),

  rest.get("https://find-that-film-backend.adaptable.app/api/people", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ people }));
  }),

  rest.get("https://find-that-film-backend.adaptable.app/api/films", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ films: matches }));
  }),
];
