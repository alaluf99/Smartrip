const config = {
  serverUrl: "http://localhost:3000/api",
};

export const serverUrls = {
  history: `${config.serverUrl}/trips/history`,
  plan: `${config.serverUrl}/plan`,
  suggestions: `${config.serverUrl}/suggestions`,
  register: `${config.serverUrl}/users/register`,
  login: `${config.serverUrl}/users/login`,
};

export default config;
