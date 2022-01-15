import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Col, ListGroup, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CardPokemon from '../../components/Card/Card';
import { getPokemons } from '../../Services/pokemon';
import { Pokemon } from '../../types/types';
import { RootState } from '../../app/store';

const Settings = () => {
  const [data, setData] = useState([] as Pokemon[]);
  const [isLoading, setIsLoading] = useState(true);
  const username = useSelector((state: RootState) => state.auth.username);

  useEffect(() => {
    getPokemons()
      .then((response) => {
        const listPokemons: Pokemon[] = response.data.results;

        setData(listPokemons);
        setIsLoading(false);
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
        setData([] as Pokemon[]);
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
                <ListGroup.Item key={pokemon.url.split('pokemon/')[1].slice(0, -1)}>{pokemon.name}</ListGroup.Item>
              ))}
            </ListGroup>
          </>
        )}
      </Col>
    </Row>
  );
};

export default Settings;
