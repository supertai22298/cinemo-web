import httpService from "./http.service";

const movieService = {
  async getAllMovie() {
    const res = await httpService.get('/get_movie_avaiable');
    const data = await res.data;
    return data.movies;
  },
};

export default movieService;
