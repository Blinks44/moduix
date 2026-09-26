import { Stack } from '@moduix/solid/stack';
import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputControl,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@moduix/solid/tags-input';
import styles from '@/components/examples/tags-input/tags-input-disabled-and-read-only.module.css';

export default function StateTagsInput() {
  return (
    <Stack class={styles.root}>
      <TagsInput disabled defaultValue={['disabled']}>
        <TagsInputLabel>Disabled</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Unavailable" />
        </TagsInputControl>
      </TagsInput>

      <TagsInput readOnly defaultValue={['read-only']}>
        <TagsInputLabel>Read-only</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput placeholder="Read-only" />
          <TagsInputClearTrigger aria-label="Clear read-only tags" />
        </TagsInputControl>
      </TagsInput>
    </Stack>
  );
}