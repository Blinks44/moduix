import { Button } from '@moduix/react/button';
import {
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
  CheckboxRootProvider,
  useCheckbox,
} from '@moduix/react/checkbox';
import { Stack } from '@moduix/react/stack';

export default function RootProviderCheckboxDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <Stack align="center" gap="4">
      <CheckboxRootProvider value={checkbox}>
        <CheckboxControl />
        <CheckboxLabel>Managed outside the tree</CheckboxLabel>
        <CheckboxHiddenInput />
      </CheckboxRootProvider>
      <div data-preview-meta>
        <output>{checkbox.checked ? 'Checked' : 'Unchecked'}</output>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => checkbox.setChecked(!checkbox.checked)}
        >
          {checkbox.checked ? 'Uncheck' : 'Check'}
        </Button>
      </div>
    </Stack>
  );
}