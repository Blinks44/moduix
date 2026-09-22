import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Typeset, TypesetScroll } from '../src';

test('renders stable data hooks without allowing consumer overrides', () => {
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

  const root = screen.getByTestId('root');
  const scroll = screen.getByTestId('scroll');

  expect(root).toHaveAttribute('data-scope', 'typeset');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-slot', 'typeset');
  expect(scroll).toHaveAttribute('data-scope', 'typeset');
  expect(scroll).toHaveAttribute('data-part', 'scroll');
  expect(scroll).toHaveAttribute('data-slot', 'typeset-scroll');
});

test('keeps scrollable content reachable by keyboard by default', () => {
  render(
    <TypesetScroll aria-label="Wide comparison table" data-testid="scroll">
      <table>
        <tbody>
          <tr>
            <td>Wide content</td>
          </tr>
        </tbody>
      </table>
    </TypesetScroll>,
  );

  const scroll = screen.getByTestId('scroll');

  expect(scroll).toHaveAttribute('tabindex', '0');
  expect(scroll).toHaveAttribute('role', 'region');
  scroll.focus();
  expect(scroll).toHaveFocus();
});

test('keeps an unnamed scroller generic and preserves explicit semantics', () => {
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

  const unnamedScroll = screen.getByTestId('unnamed-scroll');
  const customScroll = screen.getByTestId('custom-scroll');

  expect(unnamedScroll).not.toHaveAttribute('role');
  expect(unnamedScroll).toHaveAttribute('tabindex', '0');
  expect(customScroll).toHaveAttribute('role', 'group');
  expect(customScroll).toHaveAttribute('tabindex', '-1');
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
  expect(article).toHaveAttribute('data-slot', 'typeset');
  expect(scroll).toHaveAttribute('data-slot', 'typeset-scroll');
});

test('renders through the flat root export', () => {
  render(<Typeset data-testid="root">Readable content</Typeset>);

  expect(screen.getByTestId('root')).toHaveTextContent('Readable content');
});
