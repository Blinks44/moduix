import { Menu, SplitButton } from '@moduix/react';

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
] as const;

export default function SplitButtonVariantsDemo() {
  return (
    <div className="row">
      {variants.map((variant) => (
        <SplitButton key={variant} variant={variant}>
          <SplitButton.Action>{variant}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${variant}-edit`}>Edit</Menu.Item>
              <Menu.Item value={`${variant}-duplicate`}>Duplicate</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  );
}