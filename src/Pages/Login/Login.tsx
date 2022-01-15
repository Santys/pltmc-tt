import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setLogin, setLogout } from '../../features/auth/authSlice';
import { LoginGitHubSuccess } from '../../types/types';

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

const Login = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const codeFromGitHub = searchParams.get('code');

  useEffect(() => {
    if (codeFromGitHub) {
      setIsLoading(true);
      axios
        .get(`http://localhost:5000/auth?code=${codeFromGitHub}`)
        .then((response) => {
          const { username, authToken } = response.data;
          const authData = {
            username,
            authToken,
          } as LoginGitHubSuccess;
          dispatch(setLogin(authData));
          setIsLoading(false);
          navigate('/');
        })
        .catch((error: Error | AxiosError) => {
          if (axios.isAxiosError(error)) {
            console.log(error);
          } else {
            console.log(error);
          }
          setIsLoading(false);
          dispatch(setLogout());
        });
    }
  }, [codeFromGitHub, dispatch, navigate]);

  return (
    <Row className="h-100 align-items-center">
      <Col xs={12}>
        <Row>
          <Col xs={12} className="mb-3">
            <p className="h1">Sign in</p>
          </Col>
          <Col xs={12}>
            {isLoading ? (
              <Spinner animation="border" />
            ) : (
              <a
                className="btn btn-secondary"
                href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
              >
                <i className="bi bi-github"></i>
                <span>Sign in with GitHub</span>
              </a>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
