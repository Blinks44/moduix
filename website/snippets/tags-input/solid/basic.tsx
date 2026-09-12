import { TagsInput } from '@moduix/solid/tags-input';
import styles from '@/components/examples/tags-input/tags-input-basic.module.css';

const initialTags = ['React', 'TypeScript'];

export default function TagsInputDemo() {
  return (
    <TagsInput class={styles.root} defaultValue={initialTags} name="frameworks">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}