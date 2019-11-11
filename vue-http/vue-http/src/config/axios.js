import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:3000"
// });

// axios.defaults.baseURL = ;

// export default axios;

const instance = axios.create({});

instance.defaults.baseURL = "http://localhost:3000";
instance.interceptors.request.use(config => {
  console.log("incerceptando requisição", config);
  config.data = {
    ...config.data,
    curso: "Vue JS"
  };

  config.headers.common["Authorization"] = `Bearer token_jwt`;
  config.headers.put["Meu-Cabeçalho"] = "Curso VueJS";

  return config;
});

instance.interceptors.response.use(
  response => {
    console.log("interciptando resposta ...", response);

    if (Array.isArray(response.data)) {
      response.data = response.data.slice(1);
    }
    return response;
  },
  error => {
    console.log("erro capturado no intercptador de repsostas ", error);
  }
);
export default instance;
