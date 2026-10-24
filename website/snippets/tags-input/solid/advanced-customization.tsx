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
import { For } from 'solid-js';

export default function AdvancedCustomizationTagsInput() {
  return (
    <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputContext>
          {(tagsInput) => (
            <For each={tagsInput().value}>
              {(value, index) => (
                <TagsInputItem index={index()} value={value}>
                  <TagsInputItemPreview>
                    <TagsInputItemText>{value}</TagsInputItemText>
                    <TagsInputItemDeleteTrigger aria-label={`Remove ${value}`} />
                  </TagsInputItemPreview>
                  <TagsInputItemInput />
                </TagsInputItem>
              )}
            </For>
          )}
        </TagsInputContext>
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  );
}