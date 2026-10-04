import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Text } from '../src/components/text';

test.each([false, true])(
  'keeps the host and ref stable between semantic changes, asChild=%s',
  async (asChild) => {
    const element = ref<NonNullable<InstanceType<typeof Text>['$props']['as']>>();
    const title = ref('Initial');
    const rootRef = ref<ComponentPublicInstance>();
    render({
      components: { Text },
      setup: () => ({ element, title, rootRef, asChild }),
      template: `
      <Text ref="rootRef" :as="element" :as-child="asChild" :title="title" data-testid="root">
        <span>Content</span>
      </Text>
    `,
    });
    for (const as of ['p', 'span', 'small', 'strong', 'em', 'div'] as const) {
      element.value = as;
      await nextTick();
      const host = screen.getByTestId('root');
      expect(host.tagName).toBe(asChild ? 'SPAN' : as.toUpperCase());
      expect(rootRef.value?.$el).toBe(host);
      title.value = as;
      await nextTick();
      expect(screen.getByTestId('root')).toBe(host);
      expect(rootRef.value?.$el).toBe(host);
      expect(host).toHaveAttribute('title', as);
      expect(host).toHaveTextContent('Content');
    }
    element.value = undefined;
    await nextTick();
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'SPAN' : 'P');
  },
);

test('renders semantic defaults and stable data hooks', () => {
  render({
    components: { Text },
    template: `
      <Text data-testid="default">Body copy</Text>
      <Text as="small" data-testid="small">Supporting copy</Text>
      <Text as="strong" data-testid="strong">Important copy</Text>
    `,
  });

  const text = screen.getByTestId('default');
  expect(text.tagName).toBe('P');
  expect(text).toHaveAttribute('data-scope', 'text');
  expect(text).toHaveAttribute('data-part', 'root');
  expect(text).toHaveAttribute('data-slot', 'text-root');
  expect(text).toHaveAttribute('data-size', 'md');
  expect(text).toHaveAttribute('data-weight', 'regular');
  expect(text).toHaveAttribute('data-tone', 'default');
  expect(screen.getByTestId('small').tagName).toBe('SMALL');
  expect(screen.getByTestId('small')).toHaveAttribute('data-size', 'sm');
  expect(screen.getByTestId('strong').tagName).toBe('STRONG');
  expect(screen.getByTestId('strong')).toHaveAttribute('data-weight', 'semibold');
});

test('supports every semantic host and keeps visual props independent', () => {
  for (const as of ['p', 'span', 'small', 'strong', 'em', 'div'] as const) {
    const { unmount } = render({
      components: { Text },
      template: `<Text as="${as}" size="xl" weight="bold" tone="muted" align="end">Copy</Text>`,
    });
    const text = screen.getByText('Copy');
    expect(text.tagName).toBe(as.toUpperCase());
    expect(text).toHaveAttribute('data-size', 'xl');
    expect(text).toHaveAttribute('data-weight', 'bold');
    expect(text).toHaveAttribute('data-tone', 'muted');
    expect(text).toHaveAttribute('data-align', 'end');
    unmount();
  }
});

test('preserves semantic children and native refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  render(
    defineComponent({
      components: { Text },
      setup: () => ({ rootRef }),
      template: `
      <Text ref="rootRef" as-child tone="primary" weight="medium" class="consumer-text">
        <a href="#text">Read Text guidance</a>
      </Text>
    `,
    }),
  );
  const link = screen.getByRole('link', { name: 'Read Text guidance' });
  expect(rootRef.value?.$el).toBe(link);
  expect(link).toHaveAttribute('href', '#text');
  expect(link).toHaveClass('consumer-text');
  expect(link).toHaveAttribute('data-slot', 'text-root');
  expect(link).toHaveAttribute('data-tone', 'primary');
  expect(link).toHaveAttribute('data-weight', 'medium');
});

test('forwards native attrs, listeners, classes, and an ordinary host ref once', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const handleClick = rs.fn();
  render(
    defineComponent({
      components: { Text },
      setup: () => ({ rootRef, handleClick }),
      template: `
      <Text
        ref="rootRef"
        id="body-copy"
        aria-label="Supporting text"
        :class="['consumer-text', { 'active-text': true }]"
        style="color: red"
        @click="handleClick"
      >Body copy</Text>
    `,
    }),
  );
  const text = screen.getByText('Body copy');
  expect(rootRef.value?.$el).toBe(text);
  expect(text).toHaveAttribute('id', 'body-copy');
  expect(text).toHaveAttribute('aria-label', 'Supporting text');
  expect(text).toHaveClass('consumer-text', 'active-text');
  expect(text.className.split(' ').filter((value) => value === 'consumer-text')).toHaveLength(1);
  expect(text).toHaveStyle({ color: 'red' });
  await fireEvent.click(text);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('preserves component-owned data hooks against consumer collisions', () => {
  render({
    components: { Text },
    template: `
      <Text
        data-align="end" data-line-clamp="" data-part="custom-part" data-scope="custom-scope"
        data-size="xs" data-slot="custom-slot" data-tone="primary" data-truncate="" data-weight="bold"
      >Body copy</Text>
    `,
  });
  const text = screen.getByText('Body copy');
  expect(text).toHaveAttribute('data-scope', 'text');
  expect(text).toHaveAttribute('data-part', 'root');
  expect(text).toHaveAttribute('data-slot', 'text-root');
  expect(text).toHaveAttribute('data-size', 'md');
  expect(text).toHaveAttribute('data-weight', 'regular');
  expect(text).toHaveAttribute('data-tone', 'default');
  expect(text).not.toHaveAttribute('data-align');
  expect(text).not.toHaveAttribute('data-truncate');
  expect(text).not.toHaveAttribute('data-line-clamp');
});

test('uses only positive integer line-clamp values and removes stale clamp styles', async () => {
  const { rerender } = render(Text, {
    props: { lineClamp: 2 },
    slots: { default: 'Clamped copy' },
  });
  const text = screen.getByText('Clamped copy');
  expect(text).toHaveAttribute('data-line-clamp');
  // happy-dom omits vendor-prefixed line-clamp styles; SSR checks the real CSS serialization.
  const renderClamp = (lineClamp?: number) => renderToString(createSSRApp(Text, { lineClamp }));
  expect(await renderClamp(2)).toContain('-webkit-line-clamp:2');
  for (const lineClamp of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
    await rerender({ lineClamp });
    expect(text).not.toHaveAttribute('data-line-clamp');
    expect(await renderClamp(lineClamp)).not.toContain('-webkit-line-clamp:');
  }
  await rerender({ lineClamp: 3 });
  expect(text).toHaveAttribute('data-line-clamp');
  expect(await renderClamp(3)).toContain('-webkit-line-clamp:3');
});

test('preserves string, object, and array styles while required clamp values win', async () => {
  for (const style of [
    'color:red;-webkit-line-clamp:9',
    { color: 'red', '-webkit-line-clamp': 9 },
    ['color:red', { '-webkit-line-clamp': 9 }],
  ]) {
    const { unmount } = render(Text, {
      props: { lineClamp: 2, style },
      slots: { default: 'Copy' },
    });
    const text = screen.getByText('Copy');
    expect(text).toHaveStyle({ color: 'red' });
    const html = await renderToString(createSSRApp(Text, { lineClamp: 2, style }));
    expect(html).toContain('color:red');
    expect(html).toContain('-webkit-line-clamp:2');
    expect(html).not.toContain('-webkit-line-clamp:9');
    unmount();
  }
});

test('reacts to semantic and typography prop changes without a stale setup snapshot', async () => {
  const { rerender } = render(Text, { slots: { default: 'Reactive copy' } });
  await rerender({ as: 'small', tone: 'subtle', align: 'justify', truncate: true });
  let text = screen.getByText('Reactive copy');
  expect(text.tagName).toBe('SMALL');
  expect(text).toHaveAttribute('data-size', 'sm');
  expect(text).toHaveAttribute('data-weight', 'regular');
  expect(text).toHaveAttribute('data-tone', 'subtle');
  expect(text).toHaveAttribute('data-align', 'justify');
  expect(text).toHaveAttribute('data-truncate');
  await rerender({ as: 'strong', tone: 'destructive', align: undefined, truncate: false });
  text = screen.getByText('Reactive copy');
  expect(text.tagName).toBe('STRONG');
  expect(text).toHaveAttribute('data-size', 'md');
  expect(text).toHaveAttribute('data-weight', 'semibold');
  expect(text).toHaveAttribute('data-tone', 'destructive');
  expect(text).not.toHaveAttribute('data-align');
  expect(text).not.toHaveAttribute('data-truncate');
});

test('renders and hydrates an asChild host with stable attrs and ref', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const App = defineComponent({
    components: { Text },
    setup: () => ({ rootRef }),
    template: `
      <Text ref="rootRef" as-child tone="primary" :line-clamp="2" class="hydrated-text">
        <a href="#text">Hydrated copy</a>
      </Text>
    `,
  });
  const html = await renderToString(createSSRApp(App));
  expect(html).toContain('<a');
  expect(html).toContain('data-slot="text-root"');
  expect(html).toContain('-webkit-line-clamp:2');
  const host = document.createElement('div');
  host.innerHTML = html;
  document.body.append(host);
  const anchor = host.querySelector('a');
  const app = createSSRApp(App);
  app.mount(host);
  await nextTick();
  expect(host.querySelector('a')).toBe(anchor);
  expect(rootRef.value?.$el).toBe(anchor);
  expect(anchor).toHaveClass('hydrated-text');
  expect(anchor).toHaveAttribute('data-tone', 'primary');
  app.unmount();
  host.remove();
});

test('uses native Tailwind defaults and semantic typography defaults', () => {
  render({
    components: { Text },
    template:
      '<Text>Body copy</Text><Text as="small">Small copy</Text><Text as="strong">Strong copy</Text>',
  });
  expect(screen.getByText('Body copy')).toHaveClass(
    'text-md',
    'font-regular',
    'text-foreground',
    'text-start',
    'tracking-normal',
    'wrap-anywhere',
  );
  expect(screen.getByText('Small copy')).toHaveClass('text-sm', 'font-regular');
  expect(screen.getByText('Strong copy')).toHaveClass('text-md', 'font-semibold');
});

test('keeps line clamp effective when truncate is also set', async () => {
  render(Text, { props: { truncate: true, lineClamp: 2 }, slots: { default: 'Clamped copy' } });
  const text = screen.getByText('Clamped copy');
  expect(text).toHaveAttribute('data-truncate');
  expect(text).toHaveAttribute('data-line-clamp');
  expect(await renderToString(createSSRApp(Text, { truncate: true, lineClamp: 2 }))).toContain(
    '-webkit-line-clamp:2',
  );
  expect(text).toHaveClass(
    '[display:-webkit-box]',
    'overflow-hidden',
    'text-ellipsis',
    'whitespace-normal',
    '[-webkit-box-orient:vertical]',
  );
  expect(text).not.toHaveClass('whitespace-nowrap');
});

test('lets consumer utilities override typography defaults', () => {
  render(Text, {
    props: { class: 'text-center text-xl font-bold text-primary' },
    slots: { default: 'Customized copy' },
  });
  const text = screen.getByText('Customized copy');
  expect(text).toHaveClass('text-xl', 'font-bold', 'text-primary', 'text-center');
  expect(text).not.toHaveClass('text-md', 'font-regular', 'text-foreground', 'text-start');
});