import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Typeset, TypesetScroll } from '../src';

test('renders stable data hooks without allowing consumer overrides', async () => {
  render(
    <>
      <Typeset
        data-part="overridden-root"
        data-scope="overridden"
        data-slot="overridden-root"
        data-testid="root"
      >
        <p>Readable content</p>
      </Typeset>
      <TypesetScroll
        data-part="overridden-scroll"
        data-scope="overridden"
        data-slot="overridden-scroll"
        data-testid="scroll"
      >
        <table>
          <tbody>
            <tr>
              <td>Wide content</td>
            </tr>
          </tbody>
        </table>
      </TypesetScroll>
    </>,
  );

  expect(screen.getByTestId('root').dataset).toMatchObject({
    scope: 'typeset',
    part: 'root',
    slot: 'typeset',
  });

  expect(screen.getByTestId('scroll').dataset).toMatchObject({
    scope: 'typeset',
    part: 'scroll',
    slot: 'typeset-scroll',
  });
  await expect.element(page.getByText('Readable content')).toBeAttached();
});

test('keeps scrollable content reachable by keyboard by default', async () => {
  render(
    <>
      <button type="button">Before table</button>
      <TypesetScroll aria-label="Wide comparison table" data-testid="scroll">
        <table>
          <tbody>
            <tr>
              <td>Wide content</td>
            </tr>
          </tbody>
        </table>
      </TypesetScroll>
    </>,
  );

  const scrollLocator = page.getByTestId('scroll');
  await expect.element(scrollLocator).toHaveAttribute('tabindex', '0');
  await expect.element(scrollLocator).toHaveAttribute('role', 'region');
  await page.getByRole('button', { name: 'Before table' }).click();
  await page.getByRole('button', { name: 'Before table' }).press('Tab');
  await expect.element(scrollLocator).toBeFocused();
});

test('keeps an unnamed scroller generic and preserves explicit semantics', async () => {
  render(
    <>
      <TypesetScroll data-testid="unnamed-scroll">Wide content</TypesetScroll>
      <TypesetScroll
        aria-label="Custom scroller"
        data-testid="custom-scroll"
        role="group"
        tabIndex={-1}
      >
        Wide content
      </TypesetScroll>
    </>,
  );

  await expect.element(page.getByTestId('unnamed-scroll')).not.toHaveAttribute('role');
  await expect.element(page.getByTestId('unnamed-scroll')).toHaveAttribute('tabindex', '0');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('role', 'group');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('tabindex', '-1');
});

test('preserves semantic children and refs with asChild', () => {
  const rootRef = createRef<HTMLElement>();
  const scrollRef = createRef<HTMLElement>();

  render(
    <Typeset asChild ref={rootRef}>
      <article>
        <TypesetScroll asChild ref={scrollRef} aria-label="Wide comparison table">
          <section>Scrollable content</section>
        </TypesetScroll>
      </article>
    </Typeset>,
  );

  const article = screen.getByRole('article');
  const scroll = screen.getByRole('region', { name: 'Wide comparison table' });

  expect(rootRef.current).toBe(article);
  expect(scrollRef.current).toBe(scroll);
  expect(article.getAttribute('data-slot')).toBe('typeset');
  expect(scroll.getAttribute('data-slot')).toBe('typeset-scroll');
});