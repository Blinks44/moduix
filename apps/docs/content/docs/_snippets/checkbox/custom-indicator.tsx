import type { ComponentProps } from 'react';
//#region demo
import { Checkbox } from '@moduix/react';

const _icon = 'custom plus';

function CustomPlusIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 3.25v9.5M3.25 8h9.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckboxCustomIndicatorDemo() {
  return (
    <Checkbox defaultChecked>
      <Checkbox.Control>
        <Checkbox.Indicator>
          <CustomPlusIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <Checkbox.Label>Use a custom indicator icon</Checkbox.Label>
      <Checkbox.HiddenInput />
    </Checkbox>
  );
}
//#endregion