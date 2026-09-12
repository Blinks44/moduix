import { Stack } from '@moduix/solid/stack';
import { TagsInput } from '@moduix/solid/tags-input';
import styles from '@/components/examples/tags-input/tags-input-disabled-and-read-only.module.css';

export default function StateTagsInput() {
  return (
    <Stack class={styles.root}>
      <TagsInput disabled defaultValue={['disabled']}>
        <TagsInput.Label>Disabled</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Unavailable" />
        </TagsInput.Control>
      </TagsInput>

      <TagsInput readOnly defaultValue={['read-only']}>
        <TagsInput.Label>Read-only</TagsInput.Label>
        <TagsInput.Control>
          <TagsInput.Items />
          <TagsInput.Input placeholder="Read-only" />
          <TagsInput.ClearTrigger aria-label="Clear read-only tags" />
        </TagsInput.Control>
      </TagsInput>
    </Stack>
  );
}