import { Bleed } from '@moduix/react/bleed';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/bleed-semantic-element.module.css';

const content = {
  caption: 'Full-width media with a constrained parent.',
};

export default function BleedSemanticDemo() {
  return (
    <div className={styles.root}>
      <Bleed asChild className={styles.figure}>
        <figure>
          <div className={styles.media} />
          <Text tone="muted" size="sm">
            {content.caption}
          </Text>
        </figure>
      </Bleed>
    </div>
  );
}