import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Typeset, TypesetScroll } from '../src';

test('renders stable data hooks without allowing consumer overrides', () => {
  render(() => (
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
    </>
  ));

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
  render(() => (
    <TypesetScroll aria-label="Wide comparison table" data-testid="scroll">
      <table>
        <tbody>
          <tr>
            <td>Wide content</td>
          </tr>
        </tbody>
      </table>
    </TypesetScroll>
  ));

  const scroll = screen.getByTestId('scroll');

  expect(scroll).toHaveAttribute('tabindex', '0');
  expect(scroll).toHaveAttribute('role', 'region');
  scroll.focus();
  expect(scroll).toHaveFocus();
});

test('keeps an unnamed scroller generic and preserves explicit semantics', () => {
  render(() => (
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
    </>
  ));

  const unnamedScroll = screen.getByTestId('unnamed-scroll');
  const customScroll = screen.getByTestId('custom-scroll');

  expect(unnamedScroll).not.toHaveAttribute('role');
  expect(unnamedScroll).toHaveAttribute('tabindex', '0');
  expect(customScroll).toHaveAttribute('role', 'group');
  expect(customScroll).toHaveAttribute('tabindex', '-1');
});

test('forwards refs through ordinary root and scroll paths', () => {
  let rootRef!: HTMLDivElement;
  let scrollRef!: HTMLDivElement;

  render(() => (
    <>
      <Typeset ref={(element) => (rootRef = element)} data-testid="root" />
      <TypesetScroll ref={(element) => (scrollRef = element)} data-testid="scroll" />
    </>
  ));

  expect(rootRef).toBe(screen.getByTestId('root'));
  expect(scrollRef).toBe(screen.getByTestId('scroll'));
});

test('preserves semantic children with asChild without forwarding refs', () => {
  let rootRef: HTMLDivElement | undefined;
  let scrollRef: HTMLDivElement | undefined;

  render(() => (
    <Typeset asChild={(props) => <article {...props()} />} ref={(element) => (rootRef = element)}>
      <TypesetScroll
        asChild={(props) => <section {...props()} />}
        aria-label="Wide comparison table"
        ref={(element) => (scrollRef = element)}
      >
        Scrollable content
      </TypesetScroll>
    </Typeset>
  ));

  const article = screen.getByRole('article');
  const scroll = screen.getByRole('region', { name: 'Wide comparison table' });

  expect(rootRef).toBeUndefined();
  expect(scrollRef).toBeUndefined();
  expect(article).toHaveAttribute('data-slot', 'typeset');
  expect(scroll).toHaveAttribute('data-slot', 'typeset-scroll');
});

test('renders through the flat root export', () => {
  render(() => <Typeset data-testid="root">Readable content</Typeset>);

  expect(screen.getByTestId('root')).toHaveTextContent('Readable content');
});