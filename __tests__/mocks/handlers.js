import { rest } from "msw";
import { genres, people } from "../data/index.js";

export const handlers = [
  rest.get("http://localhost:9090/api/genres", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ genres }));
  }),

  rest.get("http://localhost:9090/api/people", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ people }));
  }),
];
