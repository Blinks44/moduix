import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
} from '../src';
import TestCard from './fixtures/TestCard.vue';

const cardComponents = {
  Card,
  CardAction,
  CardBackground,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLink,
  CardMedia,
  CardTitle,
};

test('preserves semantic hosts, refs, anatomy, defaults, attrs, and consumer classes', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const titleRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: cardComponents,
    setup() {
      return { rootRef, titleRef };
    },
    template: `
      <Card ref="rootRef" id="release-card" data-probe="root" aria-label="Release health" class="consumer-root">
        <CardBackground aria-hidden="true"><img alt="" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" /></CardBackground>
        <CardMedia><img alt="Warehouse" src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" /></CardMedia>
        <CardHeader data-probe="header">
          <CardTitle ref="titleRef">Release health</CardTitle>
          <CardDescription>Summary for the current production rollout.</CardDescription>
          <CardAction><button type="button">Open menu</button></CardAction>
        </CardHeader>
        <CardBody data-probe="body">98.4% successful sessions</CardBody>
        <CardFooter><CardLink href="/reports/release-health">View report</CardLink></CardFooter>
      </Card>
    `,
  };

  render(Harness);

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

  expect(rootRef.value?.$el).toBe(root);
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
  expect(titleRef.value?.$el).toBe(title);
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
  render({
    components: cardComponents,
    template: '<Card size="lg" variant="elevated">Large card</Card>',
  });

  await expect.element(page.getByText('Large card')).toHaveCount(1);
  const root = screen.getByText('Large card');

  expect(root.dataset).toMatchObject({
    size: 'lg',
    variant: 'elevated',
  });
});

test('merges consumer utility classes last on the root and parts', async () => {
  render({
    components: cardComponents,
    template: `
      <Card class="rounded-none">
        <CardBody class="px-2 pb-3 text-foreground">Customized body</CardBody>
      </Card>
    `,
  });

  await expect.element(page.getByText('Customized body')).toHaveCount(1);
  const body = screen.getByText('Customized body');
  const root = body.parentElement!;

  expect(root.classList.contains('rounded-none')).toBe(true);
  expect(root.className).not.toContain('rounded-lg');
  expect([...body.classList]).toEqual(expect.arrayContaining(['px-2', 'pb-3', 'text-foreground']));
  expect(body.className).not.toContain('px-6');
  expect(body.className).not.toContain('pb-6');
  await expect.element(page.getByText('Customized body')).toHaveCSS('padding-left', '8px');
  await expect.element(page.getByText('Customized body')).toHaveCSS('padding-bottom', '12px');
  expect(getComputedStyle(root).borderRadius).toBe('0px');
});

test('composes an alternate heading host and forwards attrs and listeners with asChild', async () => {
  const calls: string[] = [];
  const titleRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: cardComponents,
    setup() {
      return {
        calls,
        titleRef,
        handlePartClick: () => calls.push('part'),
        handleHeadingClick: () => calls.push('heading'),
      };
    },
    template: `
      <Card>
        <CardHeader>
          <CardTitle ref="titleRef" as-child data-probe="title" @click="handlePartClick">
            <h2 @click="handleHeadingClick">System load</h2>
          </CardTitle>
        </CardHeader>
      </Card>
    `,
  };

  render(Harness);

  await expect.element(page.getByRole('heading', { level: 2, name: 'System load' })).toHaveCount(1);
  const heading = screen.getByRole('heading', { level: 2, name: 'System load' });

  expect(titleRef.value?.$el).toBe(heading);
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
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = {
    components: cardComponents,
    setup() {
      return { rootRef };
    },
    template: `
      <Card ref="rootRef" as-child size="lg" variant="subtle" class="consumer-card">
        <a href="/reports/release-health" aria-label="Open release report">
          <CardHeader><CardTitle>Release health</CardTitle></CardHeader>
          <CardBody>98.4% successful sessions</CardBody>
        </a>
      </Card>
    `,
  };

  render(Harness);

  await expect.element(page.getByRole('link', { name: 'Open release report' })).toHaveCount(1);
  const link = screen.getByRole('link', { name: 'Open release report' });
  expect(rootRef.value?.$el).toBe(link);
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

test('hydrates card without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestCard));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('[data-slot="card-root"]')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestCard);
  try {
    app.mount(host);
    await expect
      .element(page.getByRole('link', { name: 'Open release report' }))
      .toHaveAttribute('href', '/reports/release-health');
    expect(host.querySelectorAll('a')).toHaveLength(1);
    expect(host.querySelector('a')).toBe(serverRoot);
    expect(serverRoot.dataset).toMatchObject({ size: 'lg', variant: 'subtle', slot: 'card-root' });
    expect([...serverRoot.classList]).toContain('consumer-card');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});