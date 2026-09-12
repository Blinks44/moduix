import { TagsInput } from '@moduix/solid/tags-input';
import styles from '@/components/examples/tags-input/tags-input-disable-editing.module.css';

export default function DisableEditingTagsInput() {
  return (
    <TagsInput class={styles.root} editable={false} defaultValue={['React', 'TypeScript']}>
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
    </TagsInput>
  );
}