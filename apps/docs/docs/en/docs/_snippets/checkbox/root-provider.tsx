import { Button } from '@moduix/react/button';
import { Checkbox, useCheckbox } from '@moduix/react/checkbox';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderCheckboxDemo() {
  const checkbox = useCheckbox({ defaultChecked: true });

  return (
    <div style={{ display: 'grid', justifyItems: 'center', gap: 'var(--moduix-spacing-4)' }}>
      <Checkbox.RootProvider value={checkbox}>
        <Checkbox.Control />
        <Checkbox.Label>Managed outside the tree</Checkbox.Label>
      </Checkbox.RootProvider>
      <PreviewMeta>
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => checkbox.setChecked(!checkbox.checked)}
        >
          {checkbox.checked ? 'Uncheck' : 'Check'}
        </Button>
      </PreviewMeta>
    </div>
  );
}