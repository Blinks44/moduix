import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/react/tags-input';
import styles from '@/components/examples/tags-input/tags-input-delimiter-and-paste.module.css';

export default function DelimiterPasteTagsInput() {
  return (
    <TagsInput
      className={styles.root}
      defaultValue={['React', 'Solid', 'Vue']}
      delimiter={/[,;\s]/}
      addOnPaste
    >
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Comma, semicolon, or space" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
    </TagsInput>
  );
}