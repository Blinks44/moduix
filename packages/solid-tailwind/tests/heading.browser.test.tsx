import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Heading } from '../src';

test('preserves h1 defaults, refs, and owned hooks when consumer props conflict', () => {
  let ref!: HTMLHeadingElement;

  render(() => (
    <Heading
      ref={(element) => (ref = element)}
      data-testid="heading"
      data-scope="custom-scope"
      data-part="custom-part"
      data-slot="custom-slot"
      data-size="xs"
      data-weight="bold"
    >
      Build reliable interfaces
    </Heading>
  ));

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(ref).toBe(heading);
  expect(heading.getAttribute('data-scope')).toBe('heading');
  expect(heading.getAttribute('data-part')).toBe('root');
  expect(heading.getAttribute('data-slot')).toBe('heading-root');
  expect(heading.getAttribute('data-weight')).toBe('semibold');
  expect(heading.hasAttribute('data-size')).toBe(false);

  expect(getComputedStyle(heading)).toMatchObject({
    fontSize: '30px',
    fontWeight: '600',
    overflowWrap: 'anywhere',
    textWrap: 'balance',
  });
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
    const { unmount } = render(() => <Heading as={as}>{as}</Heading>);

    expect(screen.getByRole('heading', { name: as, level }).getAttribute('data-weight')).toBe(
      'semibold',
    );
    expect(getComputedStyle(screen.getByRole('heading', { name: as, level })).fontSize).toBe(
      fontSize,
    );
    unmount();
  }
});

test('keeps explicit visual props separate from heading semantics', () => {
  render(() => (
    <Heading as="h3" size="2xl" weight="bold">
      Section title
    </Heading>
  ));

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('2xl');
  expect(heading.getAttribute('data-weight')).toBe('bold');
  expect([...heading.classList]).toEqual(expect.arrayContaining(['text-3xl', 'font-bold']));
  expect([...heading.classList]).not.toContain('text-xl');
  expect([...heading.classList]).not.toContain('font-semibold');
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '30px', fontWeight: '700' });
});

test('lets consumer utilities override the native defaults', () => {
  render(() => (
    <Heading class="text-lg font-normal text-primary" data-testid="heading">
      Page title
    </Heading>
  ));

  const heading = screen.getByTestId('heading');

  expect([...heading.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'font-normal', 'text-primary']),
  );
  expect([...heading.classList]).not.toContain('text-3xl');
  expect([...heading.classList]).not.toContain('font-semibold');
  expect([...heading.classList]).not.toContain('text-foreground');
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '18px', fontWeight: '400' });
});

test('forwards props through a semantic asChild host without forwarding refs', () => {
  let ref: HTMLHeadingElement | undefined;

  render(() => (
    <Heading
      asChild={(props) => <h2 {...props()}>Factory-composed heading</h2>}
      ref={(element) => (ref = element)}
      size="xl"
      weight="medium"
      class="custom-heading"
    />
  ));

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(ref).toBeUndefined();
  expect([...heading.classList]).toEqual(
    expect.arrayContaining(['custom-heading', 'text-2xl', 'font-medium']),
  );
  expect(heading.getAttribute('data-size')).toBe('xl');
  expect(heading.getAttribute('data-weight')).toBe('medium');
  expect(heading.getAttribute('data-part')).toBe('root');
});