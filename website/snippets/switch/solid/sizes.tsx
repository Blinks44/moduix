import { Stack } from '@moduix/solid/stack';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/solid/switch';

const switchSizeOptions = [
  { label: 'Extra-small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra-large', value: 'xl' },
] as const;

export default function SwitchSizesDemo() {
  return (
    <Stack align="flex-start" gap="3">
      {switchSizeOptions.map((item) => (
        <Switch size={item.value} defaultChecked>
          <SwitchControl />
          <SwitchLabel>{item.label}</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
      ))}
    </Stack>
  );
}