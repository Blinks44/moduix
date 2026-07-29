import { Button, NumberInput, useNumberInput } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderNumberInputDemo() {
  const numberInput = useNumberInput({
    defaultValue: '3',
    min: 1,
    max: 10,
  });
  return (
    <div>
      <NumberInput.RootProvider value={numberInput}>
        <NumberInput.Label>Guests</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput.RootProvider>
      <PreviewMeta style={{ marginInline: 'auto' }}>
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