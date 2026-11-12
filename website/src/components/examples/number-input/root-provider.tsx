import { Button } from '@moduix/react/button';
import {
  NumberInputField,
  NumberInputLabel,
  NumberInputRootProvider,
  useNumberInput,
} from '@moduix/react/number-input';
import { Stack } from '@moduix/react/stack';

export default function RootProviderNumberInputDemo() {
  const numberInput = useNumberInput({
    defaultValue: '3',
    min: 1,
    max: 10,
  });
  return (
    <Stack align="center">
      <NumberInputRootProvider value={numberInput}>
        <NumberInputLabel>Guests</NumberInputLabel>
        <NumberInputField />
      </NumberInputRootProvider>
      <div data-preview-meta>
        <output>Value: {numberInput.value}</output>
        <Button type="button" size="sm" variant="outline" onClick={() => numberInput.setToMin()}>
          Min
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={() => numberInput.setToMax()}>
          Max
        </Button>
      </div>
    </Stack>
  );
}