import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CardPokemon from '../../components/Card/Card';
import { getCharizard } from '../../Services/pokemon';
import { Pokemon } from '../../types/types';
import { RootState } from '../../app/store';

const Dashboard = () => {
  const [data, setData] = useState({ name: '', url: '' });
  const [isLoading, setIsLoading] = useState(true);
  const username = useSelector((state: RootState) => state.auth.username);

  useEffect(() => {
    getCharizard()
      .then((response) => {
        console.log(response);
        const name = response.data.name;
        const url = response.data.sprites.front_default;

        setData({ name, url } as Pokemon);
        setIsLoading(false);
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          console.log(error);
        } else {
          console.log(error);
        }
        setData({ name: '', url: '' } as Pokemon);
        setIsLoading(false);
      });
  }, []);

  return (
    <Row className="justify-content-center mt-5">
      <Col xs={12}>
        <p className="h1">{`${username}'s favorite pokemon`}</p>
      </Col>
      <Col xs={8} xl={2} className="mt-2">
        {isLoading ? <Spinner animation="border" /> : <CardPokemon name={data.name} url={data.url} />}
      </Col>
    </Row>
  );
};

export default Dashboard;
