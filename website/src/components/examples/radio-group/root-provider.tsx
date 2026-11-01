import { Button } from '@moduix/react/button';
import {
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
  useRadioGroup,
} from '@moduix/react/radio-group';
import { Stack } from '@moduix/react/stack';
import { PreviewMeta } from '@/components/mdx/Components';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({
    defaultValue: 'React',
  });
  return (
    <Stack align="center" gap="2">
      <RadioGroupRootProvider value={radioGroup}>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption key={framework} value={framework}>
            {framework}
          </RadioGroupOption>
        ))}
      </RadioGroupRootProvider>
      <PreviewMeta>
        <output>Selected: {radioGroup.value ?? 'none'}</output>
        <Button type="button" size="sm" onClick={() => radioGroup.setValue('Solid')}>
          Set to Solid
        </Button>
      </PreviewMeta>
    </Stack>
  );
}