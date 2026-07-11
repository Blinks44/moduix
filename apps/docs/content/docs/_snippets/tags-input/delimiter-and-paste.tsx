/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { TagsInput } from '@moduix/react';

const delimiter = /[,;\s]/;

export function DelimiterPasteTagsInput() {
  return (
    <TagsInput defaultValue={['React', 'Solid', 'Vue']} delimiter={/[,;\s]/} addOnPaste>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Comma, semicolon, or space" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}

//#endregion