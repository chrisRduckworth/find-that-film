import axios from "axios";

const api = axios.create({
  baseURL: "https://find-that-film-backend.adaptable.app/api",
});

export async function getGenres() {
  const {
    data: { genres },
  } = await api.get("/genres");
  return genres;
}

export async function getPeople(name) {
  const {
    data: { people },
  } = await api.get(`/people?name=${name}`);
  return people;
}

export async function getFilms(criteria) {
  const params = [];
  if (criteria.genres.length > 0) {
    params.push(`genres=${criteria.genres.join("%2C")}`);
  }
  if (criteria.actors.length > 0) {
    params.push(`actors=${criteria.actors.join("%2C")}`);
  }
  if (criteria.directors.length > 0) {
    params.push(`directors=${criteria.directors.join("%2C")}`);
  }
  const url = `/films?${params.join("&")}`;
  const {
    data: { films },
  } = await api.get(url);
  return films;
}
