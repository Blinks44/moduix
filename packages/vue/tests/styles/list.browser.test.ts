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
  expect(list?.classList.contains('consumer-class')).toBe(true);
  expect(rootRef.value?.$el).toBe(list);
  expect(itemRef.value?.$el).toBe(item);

  expect(item.dataset).toMatchObject({ scope: 'list', part: 'item', slot: 'list-item' });
});