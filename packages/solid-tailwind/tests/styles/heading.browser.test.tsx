import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Heading } from '@/index';

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
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '18px', fontWeight: '400' });
});