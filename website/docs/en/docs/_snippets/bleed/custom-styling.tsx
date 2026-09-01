import { Bleed } from '@moduix/react/bleed';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/bleed/bleed-custom-styling.module.css';

const content = {
  shell: 'Nested shell content stays constrained.',
  surface: 'This bleed matches the shell width instead of the viewport.',
};

export default function BleedCustomStylingDemo() {
  return (
    <div className={styles.shell}>
      <div className={styles.shellContent}>
        <Text tone="muted">{content.shell}</Text>
        <Bleed className={styles.customSurface}>
          <Text weight="semibold">{content.surface}</Text>
        </Bleed>
      </div>
    </div>
  );
}