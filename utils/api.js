import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9090/api",
});

export async function getGenres() {
  try {
    const {
      data: { genres },
    } = await api.get("/genres");
    return genres;
  } catch (err) {
    console.log(err);
  }
}

export async function getPeople(name) {
  try {
    const {
      data: { people },
    } = await api.get(`/people?name=${name}`);
    return people;
  } catch (err) {
    console.log(err);
  }
}
