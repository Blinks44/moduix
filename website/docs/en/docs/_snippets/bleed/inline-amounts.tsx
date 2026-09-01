import { Bleed } from '@moduix/react/bleed';
import { Text } from '@moduix/react/text';
import styles from '@/components/examples/bleed-inline-amounts.module.css';

const inlineAmounts = [
  { label: 'Small inline bleed', value: 'sm' },
  { label: 'Large inline bleed', value: 'lg' },
  { label: 'Full inline bleed', value: 'full' },
] as const;

export default function BleedInlineAmountsDemo() {
  return (
    <div className={styles.root}>
      {inlineAmounts.map((amount) => (
        <Bleed key={amount.value} inline={amount.value} className={styles.panel}>
          <Text>{amount.label}</Text>
        </Bleed>
      ))}
    </div>
  );
}