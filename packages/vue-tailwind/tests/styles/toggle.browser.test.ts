import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { Toggle, ToggleContext, ToggleIndicator } from '@/index';

const toggleComponents = { Toggle, ToggleContext, ToggleIndicator };

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: toggleComponents,
    template:
      '<Toggle class="border-primary bg-secondary p-0 text-xs" size="lg" variant="outline">Save changes</Toggle>',
  });

  const toggle = screen.getByRole('button', { name: 'Save changes' });

  expect([...toggle!.classList]).toEqual(
    expect.arrayContaining(['border-primary', 'bg-secondary', 'p-0', 'text-xs']),
  );
  expect(getComputedStyle(toggle)).toMatchObject({
    minHeight: '40px',
    paddingTop: '0px',
    paddingRight: '0px',
    paddingBottom: '0px',
    paddingLeft: '0px',
    fontSize: '12px',
  });
});

test('lets size utilities on icons override the default icon size', () => {
  render({
    components: toggleComponents,
    template: `
      <Toggle default-pressed>
        <svg aria-hidden="true" class="size-5" data-testid="root-icon" />
        <ToggleIndicator>
          <svg aria-hidden="true" class="size-6" data-testid="indicator-icon" />
        </ToggleIndicator>
      </Toggle>
    `,
  });

  expect(screen.getByTestId('root-icon').getBoundingClientRect().width).toBe(20);
  expect(screen.getByTestId('indicator-icon').getBoundingClientRect().width).toBe(24);
});