import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import { getPokemons } from '../../services/pokemon';
import { Pokemon } from '../../types';

const Settings = () => {
  const [data, setData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const username = useAppSelector((state) => state.auth.username);

  useEffect(() => {
    getPokemons()
      .then((response) => {
        const listPokemons = response.data.results;
        setData(listPokemons);
        setIsLoading(false);
      })
      // Not error typing
      .catch((error: Error | AxiosError) => {
        console.error(error);
        setData([]);
        setIsLoading(false);
      });
  }, []);

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12}>
        <p className="h1">{`${username}'s team`}</p>
      </Col>
      <Col xs={8} xl={2} className="mt-2">
        {isLoading ? (
          <>
            <Spinner animation="border" />
          </>
        ) : (
          <>
            <ListGroup>
              {data.map((pokemon) => (
                <ListGroup.Item className="text-capitalize" key={pokemon.url.split('pokemon/')[1].slice(0, -1)}>
                  {pokemon.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Settings;
