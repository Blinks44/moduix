import type { ComponentProps } from 'react';
//#region demo
import { Checkbox } from '@moduix/react';

const options = [
  { value: 'email', label: 'Email updates' },
  { value: 'push', label: 'Push notifications' },
  { value: 'sms', label: 'SMS alerts' },
];

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

export function CheckboxCustomStylingDemo() {
  return (
    <Checkbox.Group
      defaultValue={['email']}
      name="styled-channels"
      className="checkbox-custom-group"
    >
      {options.map((option) => (
        <Checkbox key={option.value} value={option.value} className="checkbox-custom-root">
          <Checkbox.Control className="checkbox-custom-control">
            <Checkbox.Indicator>
              <CustomPlusIcon className="checkbox-custom-icon" />
            </Checkbox.Indicator>
          </Checkbox.Control>
          <Checkbox.Label className="checkbox-custom-label">{option.label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
//#endregion