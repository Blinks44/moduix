import { Menu } from '@moduix/react/menu';
import { SplitButton } from '@moduix/react/split-button';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SplitButtonSizesDemo() {
  return (
    <div className="row">
      {sizes.map((size) => (
        <SplitButton key={size} aria-label={`${size} create actions`} size={size} variant="outline">
          <SplitButton.Action>{size}</SplitButton.Action>
          <SplitButton.Trigger />
          <SplitButton.Positioner>
            <SplitButton.Content>
              <Menu.Item value={`${size}-create`}>Create</Menu.Item>
              <Menu.Item value={`${size}-create-open`}>Create and Open</Menu.Item>
            </SplitButton.Content>
          </SplitButton.Positioner>
        </SplitButton>
      ))}
    </div>
  );
}