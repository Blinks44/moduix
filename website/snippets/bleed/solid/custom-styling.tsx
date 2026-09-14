import { Bleed } from '@moduix/solid/bleed';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/bleed/bleed-custom-styling.module.css';

const content = {
  shell: 'Nested shell content stays constrained.',
  surface: 'This bleed matches the shell width instead of the viewport.',
};

export default function BleedCustomStylingDemo() {
  return (
    <div class={styles.shell}>
      <div class={styles.shellContent}>
        <Text tone="muted">{content.shell}</Text>
        <Bleed class={styles.customSurface}>
          <Text weight="semibold">{content.surface}</Text>
        </Bleed>
      </div>
    </div>
  );
}