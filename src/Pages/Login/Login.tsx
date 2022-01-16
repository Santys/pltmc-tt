import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setLogin, setLogout } from '../../features/auth/authSlice';
import { auth } from '../../services/auth';

const client_id = process.env.REACT_APP_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

const Login = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const username = useAppSelector((state) => state.auth.username);
  const authToken = useAppSelector((state) => state.auth.authToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const codeFromGitHub = searchParams.get('code');

  useEffect(() => {
    if (codeFromGitHub) {
      setIsLoading(true);
      auth(codeFromGitHub)
        .then((response) => {
          const { username, authToken } = response.data;
          dispatch(setLogin({ username, authToken }));
          setIsLoading(false);
        })
        // Not error typing
        .catch((error: Error | AxiosError) => {
          console.error(error);
          setIsLoading(false);
          dispatch(setLogout());
        });
    }
  }, [codeFromGitHub, dispatch]);

  useEffect(() => {
    if (username && authToken) {
      navigate('/');
    }
  }, [username, authToken, navigate]);

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
