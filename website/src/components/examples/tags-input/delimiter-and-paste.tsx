import { TagsInput } from '@moduix/react/tags-input';
import styles from '@/components/examples/tags-input/tags-input-delimiter-and-paste.module.css';

export default function DelimiterPasteTagsInput() {
  return (
    <TagsInput
      className={styles.root}
      defaultValue={['React', 'Solid', 'Vue']}
      delimiter={/[,;\s]/}
      addOnPaste
    >
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Comma, semicolon, or space" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
    </TagsInput>
  );
}