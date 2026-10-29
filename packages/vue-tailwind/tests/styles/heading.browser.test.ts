import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Heading } from '@/index';

test('preserves h1 defaults, refs, and owned hooks when consumer props conflict', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: { Heading },
    setup() {
      return { rootRef };
    },
    template: `
      <Heading ref="rootRef" data-testid="heading" data-scope="custom-scope" data-part="custom-part" data-slot="custom-slot" data-size="xs" data-weight="bold">
        Build reliable interfaces
      </Heading>
    `,
  };

  render(Harness);

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(rootRef.value?.$el).toBe(heading);
  expect(heading.getAttribute('data-scope')).toBe('heading');
  expect(heading.getAttribute('data-part')).toBe('root');
  expect(heading.getAttribute('data-slot')).toBe('heading-root');
  expect(heading.getAttribute('data-weight')).toBe('semibold');
  expect(heading.getAttribute('data-size')).toBe('2xl');

  expect('Root' in Heading).toBe(false);
});

test('forwards props and refs through a semantic asChild host', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: { Heading },
    setup() {
      return { rootRef };
    },
    template: `
      <Heading ref="rootRef" as-child size="xl" weight="medium" class="custom-heading">
        <h2>Factory-composed heading</h2>
      </Heading>
    `,
  };

  render(Harness);

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(rootRef.value?.$el).toBe(heading);
  expect(heading.getAttribute('data-size')).toBe('xl');
  expect(heading.getAttribute('data-weight')).toBe('medium');
  expect(heading.getAttribute('data-part')).toBe('root');
});

test('renders every supported semantic level with its default visual size', () => {
  const levels = [
    ['h1', 1, '30px'],
    ['h2', 2, '24px'],
    ['h3', 3, '20px'],
    ['h4', 4, '18px'],
    ['h5', 5, '16px'],
    ['h6', 6, '14px'],
  ] as const;

  for (const [as, level, fontSize] of levels) {
    const { unmount } = render({
      components: { Heading },
      template: `<Heading as="${as}">${as}</Heading>`,
    });

    expect(screen.getByRole('heading', { name: as, level }).getAttribute('data-weight')).toBe(
      'semibold',
    );
    expect(getComputedStyle(screen.getByRole('heading', { name: as, level })).fontSize).toBe(
      fontSize,
    );
    unmount();
  }
});

test('lets consumer utilities override the native defaults', () => {
  render({
    components: { Heading },
    template:
      '<Heading class="text-lg font-normal text-primary" data-testid="heading">Page title</Heading>',
  });

  const heading = screen.getByTestId('heading');

  expect([...heading.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'font-normal', 'text-primary']),
  );
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '18px', fontWeight: '400' });
});