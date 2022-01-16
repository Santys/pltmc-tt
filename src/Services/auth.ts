import axios from 'axios';
import { OAuthResponse } from '../types';

const auth = (codeFromGitHub: string) => {
  return axios.get<OAuthResponse>(`http://localhost:5000/auth?code=${codeFromGitHub}`);
};

export { auth };
