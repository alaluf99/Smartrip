export const config = {
  serverUrl: "http://smartrip.cs.colman.ac.il/api",
};

export const serverUrls = {
  history: `${config.serverUrl}/trips/history`,
  plan: `${config.serverUrl}/plan`,
  suggestions: `${config.serverUrl}/trips/suggestions`,
  register: `${config.serverUrl}/users/register`,
  login: `${config.serverUrl}/users/login`,
};

export default config;
