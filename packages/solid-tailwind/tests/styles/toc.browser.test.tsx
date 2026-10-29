import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@solidjs/testing-library';
import {
  Toc,
  TocContent,
  TocIndicator,
  TocItem,
  TocLink,
  TocList,
  TocNav,
  TocRail,
  TocTitle,
} from '@/index';

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'configuration', depth: 3 },
];

test('preserves Ark navigation semantics, active item state, and visible Tailwind parts', async () => {
  const { container } = render(() => (
    <Toc items={items} defaultActiveIds={['introduction']}>
      <TocContent>
        <h2 id="introduction">Introduction</h2>
        <h3 id="configuration">Configuration</h3>
      </TocContent>
      <TocNav>
        <TocTitle>On this page</TocTitle>
        <TocList>
          <TocIndicator />
          {items.map((item) => (
            <TocItem item={item}>
              <TocLink href={`#${item.value}`}>
                {item.value === 'configuration' && (
                  <TocRail depth={item.depth} previousDepth={2} nextDepth={2} />
                )}
                {item.value}
              </TocLink>
            </TocItem>
          ))}
        </TocList>
      </TocNav>
    </Toc>
  ));

  const nav = page.getByRole('navigation', { name: 'On this page' });
  const activeLink = page.getByRole('link', { name: 'introduction' });
  const nestedItem = page
    .locator('[data-slot="toc-item"]')
    .filter({ has: page.getByRole('link', { name: 'configuration' }) });
  const indicator = container.querySelector('[data-slot="toc-indicator"]');
  const rail = container.querySelector('[data-slot="toc-rail"]');

  await expect.element(nav).toBeAttached();
  await expect.element(activeLink).toHaveAttribute('aria-current', 'location');
  await expect.element(activeLink).toHaveAttribute('data-active');
  await expect.element(nestedItem).toHaveAttribute('data-depth', '3');
  expect(indicator?.isConnected).toBe(true);
  expect(rail?.getAttribute('aria-hidden')).toBe('true');
});

test('lets consumer Tailwind classes override conflicting defaults', async () => {
  render(() => (
    <Toc class="w-auto" items={items}>
      <TocNav class="p-0">
        <TocTitle>On this page</TocTitle>
      </TocNav>
    </Toc>
  ));

  const root = document.querySelector('[data-slot="toc-root"]')!;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-auto']));
  expect([...document.querySelector('[data-slot="toc-nav"]')!.classList]).toEqual(
    expect.arrayContaining(['p-0']),
  );
});