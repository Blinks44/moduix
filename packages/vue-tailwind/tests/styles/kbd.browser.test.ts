import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Kbd, KbdGroup } from '@/index';

const kbdComponents = { Kbd, KbdGroup };

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const Harness = {
    components: kbdComponents,
    template: `
      <KbdGroup
        class="gap-3 bg-card p-2 text-foreground"
        data-testid="group"
        aria-label="Command K"
      >
        <Kbd
          class="min-h-8 min-w-8 rounded-md bg-card px-3 text-card-foreground shadow-none"
          data-testid="key"
        >
          Cmd
        </Kbd>
      </KbdGroup>
    `,
  };

  render(Harness);

  const group = screen.getByTestId('group');
  const key = screen.getByTestId('key');

  expect([...group.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'p-2', 'bg-card', 'text-foreground']),
  );
  expect([...key.classList]).toEqual(
    expect.arrayContaining([
      'min-h-8',
      'min-w-8',
      'rounded-md',
      'px-3',
      'bg-card',
      'text-card-foreground',
      'shadow-none',
    ]),
  );
  expect(getComputedStyle(group)).toMatchObject({ gap: '12px', padding: '8px' });
  expect(getComputedStyle(key)).toMatchObject({
    minHeight: '32px',
    minWidth: '32px',
    paddingInlineStart: '12px',
  });
});