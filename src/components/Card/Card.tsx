import { Card } from 'react-bootstrap';

type Props = {
  name: string;
  url: string;
};

const CardPokemon = ({ name, url }: Props) => {
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
