import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/api",
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
