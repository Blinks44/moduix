import { AspectRatio, Card } from '@moduix/react';

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
    <div className="aspect-ratio-grid">
      {stories.map((story) => (
        <Card key={story.title} className="aspect-ratio-grid__card">
          <AspectRatio ratio={16 / 9} className="aspect-ratio-grid__media">
            <img src={story.src} alt={story.alt} className="aspect-ratio-grid__image" />
          </AspectRatio>
          <div className="aspect-ratio-grid__body">
            <h3 className="aspect-ratio-grid__title">{story.title}</h3>
            <p className="aspect-ratio-grid__description">{story.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}