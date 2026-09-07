import { Bleed } from '@moduix/solid/bleed';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/bleed/bleed-block-bleed.module.css';

const content = {
  before: 'Container padding above.',
  surface: 'Inline and block bleed',
  after: 'Container padding below.',
};

export default function BleedBlockDemo() {
  return (
    <div class={styles.root}>
      <Text tone="muted">{content.before}</Text>
      <Bleed inline="md" block="md" class={styles.panel}>
        <Text>{content.surface}</Text>
      </Bleed>
      <Text tone="muted">{content.after}</Text>
    </div>
  );
}