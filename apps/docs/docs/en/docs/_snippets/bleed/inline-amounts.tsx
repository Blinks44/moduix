import { Bleed, Text } from '@moduix/react';

const inlineAmounts = [
  { label: 'Small inline bleed', value: 'sm' },
  { label: 'Large inline bleed', value: 'lg' },
  { label: 'Full inline bleed', value: 'full' },
] as const;

export default function BleedInlineAmountsDemo() {
  return (
    <div className="bleed-demo-container">
      {inlineAmounts.map((amount) => (
        <Bleed key={amount.value} inline={amount.value} className="bleed-demo-panel">
          <Text>{amount.label}</Text>
        </Bleed>
      ))}
    </div>
  );
}