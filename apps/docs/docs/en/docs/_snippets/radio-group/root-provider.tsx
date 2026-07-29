import { Button, RadioGroup, useRadioGroup } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({
    defaultValue: 'React',
  });
  return (
    <div className="radio-group-preview-stack">
      <RadioGroup.RootProvider value={radioGroup}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup.RootProvider>
      <PreviewMeta>
        <output>Selected: {radioGroup.value ?? 'none'}</output>
        <Button type="button" size="sm" onClick={() => radioGroup.setValue('Solid')}>
          Set to Solid
        </Button>
      </PreviewMeta>
    </div>
  );
}