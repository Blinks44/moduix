import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/solid/tags-input';

export default function SanitizeBlurTagsInput() {
  return (
    <TagsInput
      blurBehavior="add"
      sanitizeValue={(value) => value.trim().toLowerCase()}
      defaultValue={['design']}
    >
      <TagsInputLabel>Topics</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Blur to add" />
        <TagsInputClearTrigger aria-label="Clear topics" />
      </TagsInputControl>
    </TagsInput>
  );
}