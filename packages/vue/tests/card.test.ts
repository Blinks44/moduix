import { expect, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
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

test('preserves semantic hosts, refs, anatomy, defaults, attrs, and consumer classes', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const titleRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
    components: cardComponents,
    setup() {
      return { rootRef, titleRef };
    },
    template: `
      <Card ref="rootRef" id="release-card" data-probe="root" aria-label="Release health" class="consumer-root">
        <CardBackground aria-hidden="true"><img alt="" src="/background.jpg" /></CardBackground>
        <CardMedia><img alt="Warehouse" src="/warehouse.jpg" /></CardMedia>
        <CardHeader data-probe="header">
          <CardTitle ref="titleRef">Release health</CardTitle>
          <CardDescription>Summary for the current production rollout.</CardDescription>
          <CardAction><button type="button">Open menu</button></CardAction>
        </CardHeader>
        <CardBody data-probe="body">98.4% successful sessions</CardBody>
        <CardFooter><CardLink href="/reports/release-health">View report</CardLink></CardFooter>
      </Card>
    `,
  });

  render(Harness);

  const root = rootRef.value?.$el as HTMLElement;
  const title = screen.getByRole('heading', { level: 3, name: 'Release health' });
  const link = screen.getByRole('link', { name: 'View report' });
  const slots = Object.fromEntries(
    [...root.querySelectorAll<HTMLElement>('[data-slot]')].map((element) => [
      element.dataset.slot,
      element,
    ]),
  );

  expect(rootRef.value?.$el).toBe(root);
  expect(root).toHaveAttribute('id', 'release-card');
  expect(root).toHaveAttribute('aria-label', 'Release health');
  expect(root).toHaveAttribute('data-probe', 'root');
  expect(root).toHaveAttribute('data-scope', 'card');
  expect(root).toHaveAttribute('data-part', 'root');
  expect(root).toHaveAttribute('data-size', 'md');
  expect(root).toHaveAttribute('data-variant', 'outline');
  expect(root).toHaveAttribute('data-slot', 'card-root');
  expect(root.tagName).toBe('DIV');
  expect(root.className.endsWith('consumer-root')).toBe(true);
  expect(title.tagName).toBe('H3');
  expect(titleRef.value?.$el).toBe(title);
  expect(title).toHaveAttribute('data-scope', 'card');
  expect(title).toHaveAttribute('data-part', 'title');
  expect(title).toHaveAttribute('data-slot', 'card-title');
  expect(slots['card-background']).toHaveAttribute('data-part', 'background');
  expect(slots['card-background']).toHaveAttribute('data-scope', 'card');
  expect(slots['card-background'].tagName).toBe('DIV');
  expect(slots['card-media']).toHaveAttribute('data-part', 'media');
  expect(slots['card-media']).toHaveAttribute('data-scope', 'card');
  expect(slots['card-media'].tagName).toBe('DIV');
  expect(slots['card-header']).toHaveAttribute('data-probe', 'header');
  expect(slots['card-header']).toHaveAttribute('data-part', 'header');
  expect(slots['card-header'].tagName).toBe('DIV');
  expect(slots['card-description']).toHaveTextContent(
    'Summary for the current production rollout.',
  );
  expect(slots['card-description']).toHaveAttribute('data-part', 'description');
  expect(slots['card-description'].tagName).toBe('P');
  expect(slots['card-action']).toHaveAttribute('data-part', 'action');
  expect(slots['card-action'].tagName).toBe('DIV');
  expect(slots['card-action'].querySelector('button')).toHaveTextContent('Open menu');
  expect(slots['card-body']).toHaveAttribute('data-probe', 'body');
  expect(slots['card-body']).toHaveAttribute('data-part', 'body');
  expect(slots['card-body'].tagName).toBe('DIV');
  expect(slots['card-footer']).toHaveAttribute('data-part', 'footer');
  expect(slots['card-footer'].tagName).toBe('DIV');
  expect(link).toHaveAttribute('href', '/reports/release-health');
  expect(link).toHaveAttribute('data-scope', 'card');
  expect(link).toHaveAttribute('data-part', 'link');
  expect(link).toHaveAttribute('data-slot', 'card-link');
  expect(link.tagName).toBe('A');
});

test('applies explicit size and variant values', () => {
  render({
    components: cardComponents,
    template: '<Card size="lg" variant="elevated">Large card</Card>',
  });

  const root = screen.getByText('Large card');

  expect(root).toHaveAttribute('data-size', 'lg');
  expect(root).toHaveAttribute('data-variant', 'elevated');
});

test('composes an alternate heading host and forwards attrs and listeners with asChild', async () => {
  const calls: string[] = [];
  const titleRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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
  });

  render(Harness);

  const heading = screen.getByRole('heading', { level: 2, name: 'System load' });

  expect(titleRef.value?.$el).toBe(heading);
  expect(heading).toHaveAttribute('data-probe', 'title');
  expect(heading).toHaveAttribute('data-scope', 'card');
  expect(heading).toHaveAttribute('data-part', 'title');
  expect(heading).toHaveAttribute('data-slot', 'card-title');

  await fireEvent.click(heading);
  expect(calls).toEqual(['heading', 'part']);
});

test('composes a semantic root link and renders the same host through SSR hydration', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const Harness = defineComponent({
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
  });

  render(Harness);

  const link = screen.getByRole('link', { name: 'Open release report' });
  expect(rootRef.value?.$el).toBe(link);
  expect(link.tagName).toBe('A');
  expect(link).toHaveAttribute('href', '/reports/release-health');
  expect(link).toHaveAttribute('data-scope', 'card');
  expect(link).toHaveAttribute('data-part', 'root');
  expect(link).toHaveAttribute('data-size', 'lg');
  expect(link).toHaveAttribute('data-variant', 'subtle');
  expect(link).toHaveAttribute('data-slot', 'card-root');
  expect(link).toHaveClass('consumer-card');

  const App = defineComponent({
    components: cardComponents,
    template: `
      <Card as-child size="lg" variant="subtle" class="consumer-card">
        <a href="/reports/release-health" aria-label="Open release report">
          <CardHeader><CardTitle>Release health</CardTitle></CardHeader>
          <CardBody>98.4% successful sessions</CardBody>
        </a>
      </Card>
    `,
  });

  const html = await renderToString(createSSRApp(App));
  expect(html).toMatch(/^<a/);
  expect(html).toContain('data-slot="card-root"');

  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const app = createSSRApp(App);
  app.mount(host);

  const hydratedLink = host.querySelector('a');
  expect(host.querySelectorAll('a')).toHaveLength(1);
  expect(hydratedLink).toHaveAttribute('href', '/reports/release-health');
  expect(hydratedLink).toHaveAttribute('data-variant', 'subtle');
  expect(hydratedLink).toHaveClass('consumer-card');

  app.unmount();
  host.remove();
});