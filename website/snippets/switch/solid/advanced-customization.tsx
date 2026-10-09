import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchThumb,
} from '@moduix/solid/switch';

function PowerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
      />
    </svg>
  );
}

export default function AdvancedCustomizationSwitchDemo() {
  return (
    <Switch defaultChecked>
      <SwitchControl>
        <SwitchThumb>
          <PowerIcon />
        </SwitchThumb>
      </SwitchControl>
      <SwitchLabel>Use custom thumb icon</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  );
}