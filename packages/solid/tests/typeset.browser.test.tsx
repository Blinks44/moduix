import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Typeset, TypesetScroll } from '../src';

test('renders stable data hooks without allowing consumer overrides', async () => {
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
  render(() => (
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
    </>
  ));

  const scrollLocator = page.getByTestId('scroll');
  await expect.element(scrollLocator).toHaveAttribute('tabindex', '0');
  await expect.element(scrollLocator).toHaveAttribute('role', 'region');
  await page.getByRole('button', { name: 'Before table' }).click();
  await page.getByRole('button', { name: 'Before table' }).press('Tab');
  await expect.element(scrollLocator).toBeFocused();
});

test('keeps an unnamed scroller generic and preserves explicit semantics', async () => {
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

  await expect.element(page.getByTestId('unnamed-scroll')).not.toHaveAttribute('role');
  await expect.element(page.getByTestId('unnamed-scroll')).toHaveAttribute('tabindex', '0');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('role', 'group');
  await expect.element(page.getByTestId('custom-scroll')).toHaveAttribute('tabindex', '-1');
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

  expect(rootRef).toBeUndefined();
  expect(scrollRef).toBeUndefined();
  expect(screen.getByRole('article').getAttribute('data-slot')).toBe('typeset');
  expect(
    screen.getByRole('region', { name: 'Wide comparison table' }).getAttribute('data-slot'),
  ).toBe('typeset-scroll');
});