import { AspectRatio } from '@moduix/react/aspect-ratio';
import { Card } from '@moduix/react/card';
import styles from '@/components/examples/aspect-ratio-card-grid.module.css';

const stories = [
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=720&q=80',
    alt: 'Evening city skyline',
    title: 'City center opens a redesigned pedestrian corridor',
    description: 'The landscape source stays aligned with the neighboring card.',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=720&h=1200&q=80',
    alt: 'Reporter portrait on a street background',
    title: 'Editors uploaded a tall portrait photo for this story',
    description: 'AspectRatio and object-fit keep the media height stable.',
  },
] as const;

export default function AspectRatioCardGridDemo() {
  return (
    <div className={styles.root}>
      {stories.map((story) => (
        <Card key={story.title} className={styles.card}>
          <AspectRatio ratio={16 / 9} className={styles.media}>
            <img src={story.src} alt={story.alt} className={styles.image} />
          </AspectRatio>
          <div className={styles.body}>
            <h3 className={styles.title}>{story.title}</h3>
            <p className={styles.description}>{story.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}