import { Field, TagsInput } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function FieldTagsInput() {
  return (
    <PreviewLayout maxWidth="24rem" width="content">
      <Field invalid required>
        <TagsInput defaultValue={['api']} name="topics">
          <TagsInput.Label>Topics</TagsInput.Label>
          <TagsInput.Control>
            <TagsInput.Items />
            <TagsInput.Input placeholder="Add topic" />
            <TagsInput.ClearTrigger aria-label="Clear topics" />
          </TagsInput.Control>
        </TagsInput>
        <Field.HelperText>Add at least one topic.</Field.HelperText>
        <Field.ErrorText>Topics are required.</Field.ErrorText>
      </Field>
    </PreviewLayout>
  );
}