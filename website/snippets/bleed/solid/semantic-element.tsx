import { Bleed } from '@moduix/solid/bleed';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/bleed/bleed-semantic-element.module.css';

const content = {
  caption: 'Full-width media with a constrained parent.',
};

export default function BleedSemanticDemo() {
  return (
    <div class={styles.root}>
      <Bleed
        asChild={(props) => (
          <figure {...props()}>
            <div class={styles.media} />
            <Text tone="muted" size="sm">
              {content.caption}
            </Text>
          </figure>
        )}
        class={styles.figure}
      />
    </div>
  );
}