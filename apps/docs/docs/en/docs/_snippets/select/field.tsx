import { createListCollection } from '@ark-ui/react/collection';
import { Field, Select } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const frameworks = createListCollection({
  items: [
    {
      label: 'React',
      value: 'react',
    },
    {
      label: 'Solid',
      value: 'solid',
    },
    {
      label: 'Vue',
      value: 'vue',
    },
    {
      label: 'Svelte',
      value: 'svelte',
      disabled: true,
    },
  ],
});

export default function SelectFieldDemo() {
  return (
    <PreviewLayout alignItems="center" width="20rem">
      <Field.Root required>
        <Select collection={frameworks} name="framework">
          <Select.Label>Framework</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Select framework" />
              <Select.Indicator />
            </Select.Trigger>
            <Select.ClearTrigger aria-label="Clear selection" />
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {frameworks.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Select>
        <Field.HelperText>Pick the framework used by this project.</Field.HelperText>
      </Field.Root>
    </PreviewLayout>
  );
}