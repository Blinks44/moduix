import { AspectRatio } from '@moduix/solid/aspect-ratio';
import styles from '@/components/examples/aspect-ratio/aspect-ratio-embedded-content.module.css';

const embed = {
  ratio: 16 / 9,
  src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  title: 'Video embed',
};

export default function AspectRatioEmbedDemo() {
  return (
    <AspectRatio ratio={embed.ratio} class={styles.root}>
      <iframe
        src={embed.src}
        title={embed.title}
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </AspectRatio>
  );
}