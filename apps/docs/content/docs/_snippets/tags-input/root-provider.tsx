/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useTagsInput } from '@ark-ui/react/tags-input';
import { TagsInput } from '@moduix/react';
import { useId } from 'react';

export function RootProviderTagsInput() {
  const id = useId();
  const tagsInput = useTagsInput({
    id,
    defaultValue: ['React'],
  });
  return (
    <div>
      <button type="button" onClick={() => tagsInput.addValue('Solid')}>
        Add Solid
      </button>
      <button type="button" onClick={() => tagsInput.clearValue()}>
        Clear
      </button>
      <button type="button" onClick={tagsInput.focus}>
        Focus
      </button>

      <TagsInput.RootProvider value={tagsInput}>
        <TagsInput.Label>Frameworks</TagsInput.Label>
        <TagsInput.Control>
          {tagsInput.value.map((item, index) => (
            <TagsInput.Item key={`${item}-${index}`} index={index} value={item}>
              <TagsInput.ItemPreview>
                <TagsInput.ItemText>{item}</TagsInput.ItemText>
                <TagsInput.ItemDeleteTrigger aria-label={`Remove ${item}`} />
              </TagsInput.ItemPreview>
              <TagsInput.ItemInput />
            </TagsInput.Item>
          ))}
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
        <TagsInput.HiddenInput />
      </TagsInput.RootProvider>
    </div>
  );
}

//#endregion