import {
  TagsInput,
  TagsInputClearTrigger,
  TagsInputContext,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
} from '@moduix/react/tags-input';

export default function AdvancedCustomizationTagsInput() {
  return (
    <TagsInput defaultValue={['React', 'TypeScript']} name="frameworks">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputContext>
          {(tagsInput) =>
            tagsInput.value.map((value, index) => (
              <TagsInputItem key={`${value}-${index}`} index={index} value={value}>
                <TagsInputItemPreview>
                  <TagsInputItemText>{value}</TagsInputItemText>
                  <TagsInputItemDeleteTrigger aria-label={`Remove ${value}`} />
                </TagsInputItemPreview>
                <TagsInputItemInput />
              </TagsInputItem>
            ))
          }
        </TagsInputContext>
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks" />
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  );
}