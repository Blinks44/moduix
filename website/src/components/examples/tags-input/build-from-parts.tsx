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
import { X as XIcon } from 'lucide-react';

const initialTags = ['React', 'TypeScript'];

export default function BuildFromPartsTagsInputDemo() {
  return (
    <TagsInput defaultValue={initialTags} name="frameworks">
      <TagsInputLabel>Frameworks</TagsInputLabel>
      <TagsInputControl>
        <TagsInputContext>
          {(tagsInput) =>
            tagsInput.value.map((value, index) => (
              <TagsInputItem key={`${value}-${index}`} index={index} value={value}>
                <TagsInputItemPreview>
                  <TagsInputItemText>{value}</TagsInputItemText>
                  <TagsInputItemDeleteTrigger>
                    <XIcon strokeWidth={3} />
                  </TagsInputItemDeleteTrigger>
                </TagsInputItemPreview>
                <TagsInputItemInput />
              </TagsInputItem>
            ))
          }
        </TagsInputContext>
        <TagsInputInput placeholder="Add framework" />
        <TagsInputClearTrigger aria-label="Clear frameworks">
          <XIcon strokeWidth={3} />
        </TagsInputClearTrigger>
      </TagsInputControl>
      <TagsInputHiddenInput />
    </TagsInput>
  );
}