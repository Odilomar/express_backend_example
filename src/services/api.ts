import axios from "axios";

const api = axios.create({
  baseURL:
    "https://269a1ec67dfdd434dfc8622a0ed77768:4e788173c35d04421ab4793044be622f@send4-avaliacao.myshopify.com/admin/api/2020-01/",
});

export default api;
