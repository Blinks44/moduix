import { TagsInput } from '@moduix/solid/tags-input';
import { For } from 'solid-js';
import styles from '@/components/examples/tags-input/tags-input-advanced-customization.module.css';

export default function AdvancedCustomizationTagsInput() {
  return (
    <TagsInput class={styles.root} defaultValue={['React', 'TypeScript']} name="frameworks">
      <TagsInput.Label>Frameworks</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Context>
          {(tagsInput) => (
            <For each={tagsInput().value}>
              {(value, index) => (
                <TagsInput.Item index={index()} value={value}>
                  <TagsInput.ItemPreview>
                    <TagsInput.ItemText>{value}</TagsInput.ItemText>
                    <TagsInput.ItemDeleteTrigger aria-label={`Remove ${value}`} />
                  </TagsInput.ItemPreview>
                  <TagsInput.ItemInput />
                </TagsInput.Item>
              )}
            </For>
          )}
        </TagsInput.Context>
        <TagsInput.Input placeholder="Add framework" />
        <TagsInput.ClearTrigger aria-label="Clear frameworks" />
      </TagsInput.Control>
      <TagsInput.HiddenInput />
    </TagsInput>
  );
}