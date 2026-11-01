import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
} from '@moduix/solid/tags-input';
import { X as XIcon } from 'lucide-solid';
import { For } from 'solid-js';

const initialTags = ['React', 'TypeScript'];

export default function BuildFromPartsTagsInputDemo() {
  return (
    <TagsInput defaultValue={initialTags} name="frameworks">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputContext>
          {(tagsInput) => (
            <For each={tagsInput().value}>
              {(value, index) => (
                <TagsInputItem index={index()} value={value}>
                  <TagsInputItemPreview>
                    <TagsInputItemText>{value}</TagsInputItemText>
                    <TagsInputItemDeleteTrigger>
                      <XIcon strokeWidth={3} />
                    </TagsInputItemDeleteTrigger>
                  </TagsInputItemPreview>
                  <TagsInputItemInput />
                </TagsInputItem>
              )}
            </For>
          )}
        </TagsInputContext>
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks">
          <XIcon strokeWidth={3} />
        </TagsInputClearTrigger>
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  );
}