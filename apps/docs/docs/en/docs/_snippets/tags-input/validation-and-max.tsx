import { TagsInput } from '@moduix/react';
import { useState } from 'react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function ValidationTagsInput() {
  const [, setInvalidReason] = useState('none');
  return (
    <PreviewLayout maxWidth="24rem">
      <TagsInput
        max={3}
        maxLength={12}
        defaultValue={['alpha', 'beta', 'gamma']}
        validate={(details) => {
          return details.inputValue.length >= 3 && !details.value.includes(details.inputValue);
        }}
        onValueInvalid={(details) => {
          setInvalidReason(details.reason);
        }}
      >
        <TagsInput.Label>Labels</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add unique label" />
          <TagsInput.ClearTrigger aria-label="Clear labels" />
        </TagsInput.Control>
      </TagsInput>
    </PreviewLayout>
  );
}