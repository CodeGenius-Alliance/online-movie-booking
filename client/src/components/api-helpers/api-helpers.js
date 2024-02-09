import axios from "axios";

export const getAllMovies = async () => {
  const res = await axios
    .get("http://localhost:3001/movie/getMovies")
    .catch((err) => console.log(err));

    if(res.status !== 200){
        return console.log("No data found ")
    }

    const data = await res.data;
    return data;
};