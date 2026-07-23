import { Button, Checkbox, useCheckbox } from '@moduix/react';

export default function RootProviderCheckboxDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <>
      <Checkbox.RootProvider value={checkbox}>
        <Checkbox.Control />
        <Checkbox.Label>Managed outside the tree</Checkbox.Label>
      </Checkbox.RootProvider>
      <Button
        type="button"
        variant="outline"
        onClick={() => checkbox.setChecked(!checkbox.checked)}
      >
        {checkbox.checked ? 'Uncheck' : 'Check'}
      </Button>
    </>
  );
}