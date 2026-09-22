import { TagsInput, TagsInputClearTrigger, TagsInputControl, TagsInputHiddenInput, TagsInputInput, TagsInputItems, TagsInputLabel } from '@moduix/solid/tags-input';
import styles from '@/components/examples/tags-input/tags-input-basic.module.css';

const initialTags = ['React', 'TypeScript'];

export default function TagsInputDemo() {
  return (
    <TagsInput class={styles.root} defaultValue={initialTags} name="frameworks">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputItems />
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  );
}
