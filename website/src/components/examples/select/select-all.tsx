import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import {
  useSelect,
  SelectRootProvider,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/react/select';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/select/select-select-all.module.css';

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
  const select = useSelect({
    collection: languages,
    multiple: true,
  });

  return (
    <div className={styles.root}>
      <SelectRootProvider value={select}>
        <SelectLabel>Languages</SelectLabel>
        <SelectField placeholder="Select languages" clearLabel="Clear selection" />
        <SelectPositioner>
          <SelectContent>
            {languages.items.map((item) => (
              <SelectItem key={item.value} item={item}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </SelectRootProvider>
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