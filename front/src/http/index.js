import axios from "axios";

const $host = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "http://localhost:3014",
});

$host.defaults.timeout = 15000;

const Quad = {
  create: async (q) => await $host.post("api/quad", q),
  fetch: async () => await $host.get("api/quad", {}),
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { Quad };
