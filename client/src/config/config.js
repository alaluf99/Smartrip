const config = {
  serverUrl: "http://localhost:3001/api",
};

export const serverUrls = {
  history: `${config.serverUrl}/trips/history`,
  plan: `${config.serverUrl}/plan`,
  suggestions: `${config.serverUrl}/trips/suggestions`,
  register: `${config.serverUrl}/users/register`,
  login: `${config.serverUrl}/users/login`,
};

export default config;
