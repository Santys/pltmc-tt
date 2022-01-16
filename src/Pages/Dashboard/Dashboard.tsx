import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useAppSelector } from '../../app/hooks';
import CardPokemon from '../../components/Card/Card';
import { getCharizard } from '../../services/pokemon';

const Dashboard = () => {
  const [data, setData] = useState({ name: '', url: '' });
  const [isLoading, setIsLoading] = useState(true);
  const username = useAppSelector((state) => state.auth.username);

  useEffect(() => {
    getCharizard()
      .then((response) => {
        const name = response.data.name;
        const url = response.data.sprites.front_default;

        setData({ name, url });
        setIsLoading(false);
      })
      // Not error typing
      .catch((error: Error | AxiosError) => {
        console.error(error);
        setData({ name: '', url: '' });
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
