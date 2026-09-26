import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/react/tags-input';
import styles from '@/components/examples/tags-input/tags-input-allow-duplicates.module.css';

export default function AllowDuplicatesTagsInput() {
  return (
    <TagsInput className={styles.root} allowDuplicates defaultValue={['React', 'React']}>
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  );
}