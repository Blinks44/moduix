//#region demo
import { Checkbox, useCheckbox } from '@moduix/react';

const _initialChecked = true;

export function RootProviderCheckboxDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <>
      <Checkbox.RootProvider value={checkbox}>
        <Checkbox.Control />
        <Checkbox.Label>Managed outside the tree</Checkbox.Label>
        <Checkbox.HiddenInput />
      </Checkbox.RootProvider>
      <button type="button" onClick={() => checkbox.setChecked(!checkbox.checked)}>
        {checkbox.checked ? 'Uncheck' : 'Check'}
      </button>
    </>
  );
}
//#endregion