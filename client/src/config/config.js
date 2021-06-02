export const config = {
  serverUrl: "http://smartrip.cs.colman.ac.il:3001/api",
};

export const serverUrls = {
  history: `${config.serverUrl}/trips/history`,
  plan: `${config.serverUrl}/trips/plan`,
  suggestions: `${config.serverUrl}/trips/suggestions`,
  register: `${config.serverUrl}/users/register`,
  login: `${config.serverUrl}/users/login`,
  users: `${config.serverUrl}/users`,
};

export default config;
