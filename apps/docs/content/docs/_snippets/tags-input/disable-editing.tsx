/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';

const editable = false;

export function DisableEditingTagsInput() {
  return (
    <TagsInput editable={false} defaultValue={['React', 'TypeScript']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

//#endregion