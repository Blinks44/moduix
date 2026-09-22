import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/solid/tags-input';
import styles from '@/components/examples/tags-input/tags-input-sanitize-and-blur.module.css';

export default function SanitizeBlurTagsInput() {
  return (
    <TagsInput
      class={styles.root}
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