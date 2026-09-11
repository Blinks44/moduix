import { Button } from '@moduix/solid/button';
import { NumberInput, useNumberInput } from '@moduix/solid/number-input';
import styles from '@/components/examples/number-input/number-input-root-provider.module.css';

export default function RootProviderNumberInputDemo() {
  const numberInput = useNumberInput({
    defaultValue: '3',
    min: 1,
    max: 10,
  });

  return (
    <div class={styles.root}>
      <NumberInput.RootProvider value={numberInput}>
        <NumberInput.Label>Guests</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput.RootProvider>
      <output>Value: {numberInput().value}</output>
      <Button type="button" size="sm" variant="outline" onClick={() => numberInput().setToMin()}>
        Min
      </Button>
      <Button type="button" size="sm" variant="outline" onClick={() => numberInput().setToMax()}>
        Max
      </Button>
    </div>
  );
}