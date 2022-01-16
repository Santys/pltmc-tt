export type OAuthResponse = {
  username: string;
  authToken: string;
};

export type Pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
};
