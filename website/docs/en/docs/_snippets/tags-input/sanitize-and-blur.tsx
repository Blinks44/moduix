import { TagsInput } from '@moduix/react/tags-input';
import styles from '@/components/examples/tags-input/tags-input-sanitize-and-blur.module.css';

export default function SanitizeBlurTagsInput() {
  return (
    <TagsInput
      className={styles.root}
      blurBehavior="add"
      sanitizeValue={(value) => value.trim().toLowerCase()}
      defaultValue={['design']}
    >
      <TagsInput.Label>Topics</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Blur to add" />
        <TagsInput.ClearTrigger aria-label="Clear topics" />
      </TagsInput.Control>
    </TagsInput>
  );
}