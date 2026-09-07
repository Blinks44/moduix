import { Bleed } from '@moduix/solid/bleed';
import { Text } from '@moduix/solid/text';
import styles from '@/components/examples/bleed/bleed-inline-amounts.module.css';

const inlineAmounts = [
  { label: 'Small inline bleed', value: 'sm' },
  { label: 'Large inline bleed', value: 'lg' },
  { label: 'Full inline bleed', value: 'full' },
] as const;

export default function BleedInlineAmountsDemo() {
  return (
    <div class={styles.root}>
      {inlineAmounts.map((amount) => (
        <Bleed inline={amount.value} class={styles.panel}>
          <Text>{amount.label}</Text>
        </Bleed>
      ))}
    </div>
  );
}