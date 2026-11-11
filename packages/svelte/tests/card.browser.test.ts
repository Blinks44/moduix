import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AnatomyCard from './card/AnatomyCard.svelte';
import AsChildLinkCard from './card/AsChildLinkCard.svelte';
import AsChildTitleCard from './card/AsChildTitleCard.svelte';
import LabelCard from './card/LabelCard.svelte';
import LinkCoverCard from './card/LinkCoverCard.svelte';

test('preserves semantic hosts, refs, anatomy, defaults, attrs, and consumer classes', async () => {
  const { component } = render(AnatomyCard, {
    props: {
      id: 'release-card',
      'data-probe': 'root',
      'aria-label': 'Release health',
      class: 'consumer-root',
    },
  });

  const root = document.querySelector<HTMLElement>('[data-slot="card-root"]')!;
  await expect
    .element(page.getByRole('heading', { level: 3, name: 'Release health' }))
    .toHaveCount(1);
  const title = screen.getByRole('heading', { level: 3, name: 'Release health' });
  const link = screen.getByRole('link', { name: 'View report' });
  const slots = Object.fromEntries(
    [...root.querySelectorAll<HTMLElement>('[data-slot]')].map((element) => [
      element.dataset.slot,
      element,
    ]),
  );
  const refs = component.getRefs();

  expect(refs.rootRef).toBe(root);
  expect(root.getAttribute('id')).toBe('release-card');
  expect(root.getAttribute('aria-label')).toBe('Release health');
  expect(root.dataset).toMatchObject({
    probe: 'root',
    scope: 'card',
    part: 'root',
    size: 'md',
    variant: 'outline',
    slot: 'card-root',
  });
  expect(root.tagName).toBe('DIV');
  expect(root.className.endsWith('consumer-root')).toBe(true);
  expect(title.tagName).toBe('H3');
  expect(refs.titleRef).toBe(title);
  expect(title.dataset).toMatchObject({
    scope: 'card',
    part: 'title',
    slot: 'card-title',
  });
  expect(slots['card-background']?.getAttribute('data-part')).toBe('background');
  expect(slots['card-background']?.getAttribute('data-scope')).toBe('card');
  expect(slots['card-background'].tagName).toBe('DIV');
  expect(slots['card-media']?.dataset).toMatchObject({
    part: 'media',
    scope: 'card',
  });
  expect(slots['card-media'].tagName).toBe('DIV');
  expect(slots['card-header']?.dataset).toMatchObject({
    probe: 'header',
    part: 'header',
  });
  expect(slots['card-header'].tagName).toBe('DIV');
  expect(slots['card-description']?.textContent).toContain(
    'Summary for the current production rollout.',
  );
  expect(slots['card-description']?.getAttribute('data-part')).toBe('description');
  expect(slots['card-description'].tagName).toBe('P');
  expect(slots['card-action']?.getAttribute('data-part')).toBe('action');
  expect(slots['card-action'].tagName).toBe('DIV');
  expect(slots['card-action'].querySelector('button')?.textContent).toContain('Open menu');
  expect(slots['card-body']?.dataset).toMatchObject({
    probe: 'body',
    part: 'body',
  });
  expect(slots['card-body'].tagName).toBe('DIV');
  expect(slots['card-footer']?.getAttribute('data-part')).toBe('footer');
  expect(slots['card-footer'].tagName).toBe('DIV');
  expect(link.getAttribute('href')).toBe('/reports/release-health');
  expect(link.dataset).toMatchObject({
    scope: 'card',
    part: 'link',
    slot: 'card-link',
  });
  expect(link.tagName).toBe('A');
});

test('applies explicit size and variant values', async () => {
  render(LabelCard, { props: { size: 'lg', variant: 'elevated' } });

  await expect.element(page.getByText('Large card')).toHaveCount(1);
  const root = screen.getByText('Large card');

  expect(root.dataset).toMatchObject({
    size: 'lg',
    variant: 'elevated',
  });
});

test('composes an alternate heading host and forwards attrs and listeners with asChild', async () => {
  const calls: string[] = [];
  const { component } = render(AsChildTitleCard, { props: { calls } });

  await expect.element(page.getByRole('heading', { level: 2, name: 'System load' })).toHaveCount(1);
  const heading = screen.getByRole('heading', { level: 2, name: 'System load' });

  expect(component.getRefs().titleRef).toBe(heading);
  expect(heading.dataset).toMatchObject({
    probe: 'title',
    scope: 'card',
    part: 'title',
    slot: 'card-title',
  });

  await page.getByRole('heading', { name: 'System load', level: 2 }).click();
  expect(calls).toEqual(['heading', 'part']);
});

test('composes a semantic root link with its ref and consumer attrs', async () => {
  const { component } = render(AsChildLinkCard);

  await expect.element(page.getByRole('link', { name: 'Open release report' })).toHaveCount(1);
  const link = screen.getByRole('link', { name: 'Open release report' });
  expect(component.getRefs().rootRef).toBe(link);
  expect(link.tagName).toBe('A');
  expect(link.getAttribute('href')).toBe('/reports/release-health');
  expect(link.dataset).toMatchObject({
    scope: 'card',
    part: 'root',
    size: 'lg',
    variant: 'subtle',
    slot: 'card-root',
  });
  expect(link.classList.contains('consumer-card')).toBe(true);
});

test('lets CardLink cover the body of a card with a background', async () => {
  render(LinkCoverCard);

  await expect.element(page.getByRole('link', { name: 'Weekend guide' })).toHaveCount(1);
  const hit = (element: Element) => {
    const rect = element.getBoundingClientRect();
    return document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
  };

  expect(hit(screen.getByTestId('body'))).toBe(screen.getByRole('link', { name: 'Weekend guide' }));
  expect(hit(screen.getByRole('button', { name: 'Save' }))).toBe(
    screen.getByRole('button', { name: 'Save' }),
  );
});