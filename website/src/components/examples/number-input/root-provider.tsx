import { Button } from '@moduix/react/button';
import { NumberInput, useNumberInput } from '@moduix/react/number-input';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/number-input/number-input-root-provider.module.css';

export default function RootProviderNumberInputDemo() {
  const numberInput = useNumberInput({
    defaultValue: '3',
    min: 1,
    max: 10,
  });
  return (
    <div className={styles.root}>
      <NumberInput.RootProvider value={numberInput}>
        <NumberInput.Label>Guests</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput.RootProvider>
      <PreviewMeta>
        <output>Value: {numberInput.value}</output>
        <Button type="button" size="sm" variant="outline" onClick={() => numberInput.setToMin()}>
          Min
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => numberInput.setToMax()}>
          Max
        </Button>
      </PreviewMeta>
    </div>
  );
}