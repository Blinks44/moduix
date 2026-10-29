import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { List, ListItem } from '@/index';

const listComponents = { List, ListItem };

test('renders semantic unordered-list defaults and forwards Vue refs and attrs', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const itemRef = ref<ComponentPublicInstance | null>(null);

  render({
    components: listComponents,
    setup() {
      return { itemRef, rootRef };
    },
    template: `
      <List ref="rootRef" data-testid="list" data-probe="root" class="consumer-class">
        <ListItem ref="itemRef">Keep the item ref on its semantic host.</ListItem>
      </List>
    `,
  });

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');

  expect(list.dataset).toMatchObject({ gap: 'sm', marker: 'disc', size: 'md', tone: 'default' });
  expect(rootRef.value?.$el).toBe(list);
  expect(itemRef.value?.$el).toBe(item);

  expect(item.dataset).toMatchObject({ scope: 'list', part: 'item', slot: 'list-item' });
});

test('lets consumer utilities override conflicting defaults', () => {
  render({
    components: listComponents,
    template: `<List class="gap-6 ps-0 text-lg text-primary" data-testid="list"><ListItem>Ready</ListItem></List>`,
  });

  const list = screen.getByTestId('list');
  expect([...list.classList]).toEqual(
    expect.arrayContaining(['gap-6', 'ps-0', 'text-lg', 'text-primary']),
  );
  expect(getComputedStyle(list)).toMatchObject({
    rowGap: '24px',
    paddingInlineStart: '0px',
    fontSize: '18px',
  });
});