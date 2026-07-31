import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import { Select } from '@moduix/react/select';
import { PreviewMeta } from '@/components/mdx/Components';

const languages = createListCollection({
  items: [
    {
      label: 'C#',
      value: 'csharp',
    },
    {
      label: 'Go',
      value: 'go',
    },
    {
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      label: 'Python',
      value: 'python',
    },
    {
      label: 'Rust',
      value: 'rust',
    },
    {
      label: 'TypeScript',
      value: 'typescript',
    },
  ],
});

export default function SelectSelectAllDemo() {
  const select = Select.useSelect({
    collection: languages,
    multiple: true,
  });

  return (
    <div className="select-preview-stack">
      <Select.RootProvider value={select}>
        <Select.Label>Languages</Select.Label>
        <Select.Field placeholder="Select languages" clearLabel="Clear selection" />
        <Select.Positioner>
          <Select.Content>
            {languages.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select.RootProvider>
      <PreviewMeta>
        <output>Selected: {select.value.length}</output>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            select.selectAll();
            select.setOpen(false);
          }}
        >
          Select all
        </Button>
      </PreviewMeta>
    </div>
  );
}