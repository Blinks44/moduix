import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxIndicator,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import type { ComponentProps } from 'react';

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

export default function CheckboxCustomIndicatorDemo() {
  return (
    <Checkbox defaultChecked>
      <CheckboxControl>
        <CheckboxIndicator>
          <CustomPlusIcon />
        </CheckboxIndicator>
      </CheckboxControl>
      <CheckboxLabel>Use a custom indicator icon</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  );
}