import { AspectRatio } from '@moduix/solid/aspect-ratio';
import { Card } from '@moduix/solid/card';
import { For } from 'solid-js';
import styles from '@/components/examples/aspect-ratio/aspect-ratio-card-grid.module.css';

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
    <div class={styles.root}>
      <For each={stories}>
        {(story) => (
          <Card class={styles.card}>
            <AspectRatio ratio={16 / 9} class={styles.media}>
              <img src={story.src} alt={story.alt} class={styles.image} />
            </AspectRatio>
            <div class={styles.body}>
              <h3 class={styles.title}>{story.title}</h3>
              <p class={styles.description}>{story.description}</p>
            </div>
          </Card>
        )}
      </For>
    </div>
  );
}