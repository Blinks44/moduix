import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  TagsInput,
  TagsInputControl,
  TagsInputHiddenInput,
  TagsInputInput,
  TagsInputItems,
  TagsInputLabel,
} from '@/index';

test('keeps explicit form data for asChild roots', () => {
  const { container } = render(() => (
    <form>
      <TagsInput
        asChild={(props) => <section {...props()} />}
        defaultValue={['React']}
        name="frameworks"
      >
        <TagsInputLabel>Frameworks</TagsInputLabel>
        <TagsInputControl>
          <TagsInputItems />
          <TagsInputInput />
        </TagsInputControl>
        <TagsInputHiddenInput />
      </TagsInput>
    </form>
  ));

  const form = container.querySelector('form')!;

  expect(new FormData(form).get('frameworks')).toBe('React');
  expect(container.querySelector('section input[name="frameworks"]')).not.toBeNull();
  expect(container.querySelector('section input[hidden]')).not.toBeNull();
});