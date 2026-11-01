import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '@/components/tag';

const tagComponents = { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: tagComponents,
    template: `
      <Tag class="gap-3 bg-card px-4 text-card-foreground" data-testid="tag">
        <TagLabel>TypeScript</TagLabel>
      </Tag>
    `,
  });

  const tag = screen.getByTestId('tag');

  expect([...tag!.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'px-4', 'bg-card', 'text-card-foreground']),
  );
});