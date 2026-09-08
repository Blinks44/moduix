import { Checkbox } from '@moduix/solid/checkbox';

function CustomPlusIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 3.25v9.5M3.25 8h9.5"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default function CheckboxCustomIndicatorDemo() {
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