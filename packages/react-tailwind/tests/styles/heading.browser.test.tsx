import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Heading } from '@/index';

test('forwards props and refs through a semantic asChild host', () => {
  const ref = createRef<HTMLHeadingElement>();

  render(
    <Heading asChild ref={ref} size="xl" weight="medium" className="custom-heading">
      <h2>Factory-composed heading</h2>
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(ref.current).toBe(heading);
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
    const { unmount } = render(<Heading as={as}>{as}</Heading>);

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
  render(
    <Heading className="text-lg font-normal text-primary" data-testid="heading">
      Page title
    </Heading>,
  );

  const heading = screen.getByTestId('heading');

  expect([...heading.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'font-normal', 'text-primary']),
  );
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '18px', fontWeight: '400' });
});