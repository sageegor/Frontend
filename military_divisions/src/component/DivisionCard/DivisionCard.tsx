import { Card, Button } from 'react-bootstrap';
import { Division } from '../../types/division';

interface DivisionCardProps {
  division: Division;
}

const DivisionCard = ({ division }: DivisionCardProps) => {
  const imageUrl = division.image_url || '/default-division.jpg';

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img 
        variant="top" 
        src={imageUrl} 
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/default-division.jpg';
        }}
      />
      <Card.Body>
        <Card.Title>{division.name}</Card.Title>
        <Card.Text>
          {division.description.substring(0, 100)}...
        </Card.Text>
        <Button variant="primary" href={`/divisions/${division.id}`}>
          Подробнее
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DivisionCard;