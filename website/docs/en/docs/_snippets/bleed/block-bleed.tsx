import { Bleed } from '@moduix/react/bleed';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/bleed-block-bleed.module.css';

const content = {
  before: 'Container padding above.',
  surface: 'Inline and block bleed',
  after: 'Container padding below.',
};

export default function BleedBlockDemo() {
  return (
    <div className={styles.root}>
      <Text tone="muted">{content.before}</Text>
      <Bleed inline="md" block="md" className={styles.panel}>
        <Text>{content.surface}</Text>
      </Bleed>
      <Text tone="muted">{content.after}</Text>
    </div>
  );
}