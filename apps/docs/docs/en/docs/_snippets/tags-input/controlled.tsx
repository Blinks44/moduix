import { TagsInput } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ControlledTagsInput() {
  const [value, setValue] = useState(['React', 'TypeScript']);
  return (
    <PreviewLayout maxWidth="24rem">
      <TagsInput value={value} onValueChange={(details) => setValue(details.value)}>
        <TagsInput.Label>Skills</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add skill" />
          <TagsInput.ClearTrigger aria-label="Clear skills" />
        </TagsInput.Control>
      </TagsInput>
    </PreviewLayout>
  );
}