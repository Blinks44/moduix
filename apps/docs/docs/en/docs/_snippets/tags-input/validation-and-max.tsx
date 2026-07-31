import { TagsInput } from '@moduix/react/tags-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ValidationTagsInput() {
  const [invalidReason, setInvalidReason] = useState('none');
  return (
    <div className="tags-input-preview-stack">
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
      <PreviewMeta>
        <output>Last invalid reason: {invalidReason}</output>
      </PreviewMeta>
    </div>
  );
}