import { Button } from '@moduix/solid/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from '@moduix/solid/card';
import styles from '@/components/examples/card/card-with-image.module.css';

const product = {
  title: 'Warehouse capacity',
  description: 'North region allocation for the next planning cycle.',
  capacity: 72,
  image:
    'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1280&q=80',
  imageAlt: 'A warehouse with neatly stacked delivery boxes.',
};

export default function CardWithImageDemo() {
  return (
    <Card class={styles.root}>
      <CardMedia>
        <img class={styles.image} src={product.image} alt={product.imageAlt} />
      </CardMedia>
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardBody>{product.capacity}% allocated</CardBody>
      <CardFooter>
        <Button variant="outline">Open report</Button>
      </CardFooter>
    </Card>
  );
}