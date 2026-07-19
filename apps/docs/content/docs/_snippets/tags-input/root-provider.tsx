/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput, useTagsInput } from '@moduix/react';
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
          <TagsInput.Items />
          <TagsInput.Input placeholder="Add framework" />
          <TagsInput.ClearTrigger aria-label="Clear frameworks" />
        </TagsInput.Control>
      </TagsInput.RootProvider>
    </div>
  );
}

//#endregion