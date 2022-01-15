import { Card } from 'react-bootstrap';
import { Pokemon } from '../../types/types';

const CardPokemon = ({ name, url }: Pokemon) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title className="text-truncate">{name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CardPokemon;
