import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { Text } from '../src/components/text';
import TestText from './fixtures/TestText.vue';

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
      expect(host.getAttribute('title')).toBe(as);
      expect(host.textContent).toContain('Content');
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
      <Text data-testid="default" data-align="end" data-line-clamp="" data-part="custom-part" data-scope="custom-scope" data-size="xs" data-slot="custom-slot" data-tone="primary" data-truncate="" data-weight="bold">Body copy</Text>
      <Text as="small" data-testid="small">Supporting copy</Text>
      <Text as="strong" data-testid="strong">Important copy</Text>
    `,
  });

  const text = screen.getByTestId('default');
  expect(text.tagName).toBe('P');
  expect(text.getAttribute('data-scope')).toBe('text');
  expect(text.getAttribute('data-part')).toBe('root');
  expect(text.getAttribute('data-slot')).toBe('text-root');
  expect(text.getAttribute('data-size')).toBe('md');
  expect(text.getAttribute('data-weight')).toBe('regular');
  expect(text.getAttribute('data-tone')).toBe('default');
  expect(screen.getByTestId('small').tagName).toBe('SMALL');
  expect(screen.getByTestId('small').getAttribute('data-size')).toBe('sm');
  expect(screen.getByTestId('strong').tagName).toBe('STRONG');
  expect(screen.getByTestId('strong').getAttribute('data-weight')).toBe('semibold');
  expect(text.getAttribute('data-tone')).toBe('default');
  expect(text.hasAttribute('data-align')).toBe(false);
  expect(text.hasAttribute('data-truncate')).toBe(false);
  expect(text.hasAttribute('data-line-clamp')).toBe(false);
  expect(getComputedStyle(text)).toMatchObject({
    fontSize: '16px',
    fontWeight: '400',
    textAlign: 'start',
    overflowWrap: 'anywhere',
  });
  expect(getComputedStyle(screen.getByTestId('small')).fontSize).toBe('14px');
  expect(getComputedStyle(screen.getByTestId('strong')).fontWeight).toBe('600');
});

test('supports every semantic host and keeps visual props independent', () => {
  for (const as of ['p', 'span', 'small', 'strong', 'em', 'div'] as const) {
    const { unmount } = render({
      components: { Text },
      template: `<Text as="${as}" size="xl" weight="bold" tone="muted" align="end">Copy</Text>`,
    });
    const text = screen.getByText('Copy');
    expect(text.tagName).toBe(as.toUpperCase());
    expect(text.getAttribute('data-size')).toBe('xl');
    expect(text.getAttribute('data-weight')).toBe('bold');
    expect(text.getAttribute('data-tone')).toBe('muted');
    expect(text.getAttribute('data-align')).toBe('end');
    unmount();
  }
});

test('preserves semantic children and native refs with asChild', () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  render({
    components: { Text },
    setup: () => ({ rootRef }),
    template: `
      <Text ref="rootRef" as-child tone="primary" weight="medium" class="consumer-text">
        <a href="#text">Read Text guidance</a>
      </Text>
    `,
  });
  const link = screen.getByRole('link', { name: 'Read Text guidance' });
  expect(rootRef.value?.$el).toBe(link);
  expect(link.getAttribute('href')).toBe('#text');
  expect([...link.classList]).toEqual(expect.arrayContaining(['consumer-text']));
  expect(link.getAttribute('data-slot')).toBe('text-root');
  expect(link.getAttribute('data-tone')).toBe('primary');
  expect(link.getAttribute('data-weight')).toBe('medium');
});

test('forwards native attrs, listeners, classes, and an ordinary host ref once', async () => {
  const rootRef = ref<ComponentPublicInstance | null>(null);
  const handleClick = rs.fn();
  render({
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
  });
  const text = screen.getByText('Body copy');
  expect(rootRef.value?.$el).toBe(text);
  expect(text.getAttribute('id')).toBe('body-copy');
  expect(text.getAttribute('aria-label')).toBe('Supporting text');
  expect([...text.classList]).toEqual(expect.arrayContaining(['consumer-text', 'active-text']));
  expect(text.className.split(' ').filter((value) => value === 'consumer-text')).toHaveLength(1);
  expect(text.style.color).toBe('red');
  await page.getByText('Body copy', { exact: true }).click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('uses only positive integer line-clamp values and removes stale clamp styles', async () => {
  const { rerender } = render(Text, {
    props: { lineClamp: 2 },
    slots: { default: () => 'Clamped copy' },
  });
  const text = screen.getByText('Clamped copy');
  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(getComputedStyle(text).webkitLineClamp).toBe('2');
  expect(text.style.webkitLineClamp).toBe('2');
  for (const lineClamp of [0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, undefined]) {
    await rerender({ lineClamp });
    expect(text.hasAttribute('data-line-clamp')).toBe(false);
    expect(text.style.webkitLineClamp).toBe('');
  }
  await rerender({ lineClamp: 3 });
  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(text.style.webkitLineClamp).toBe('3');
});

test('preserves string, object, and array styles while required clamp values win', () => {
  for (const style of [
    'color:red;-webkit-line-clamp:9',
    { color: 'red', '-webkit-line-clamp': 9 },
    ['color:red', { '-webkit-line-clamp': 9 }],
  ]) {
    const { unmount } = render(Text, {
      props: { lineClamp: 2, style },
      slots: { default: () => 'Copy' },
    });
    const text = screen.getByText('Copy');
    expect(text.style.color).toBe('red');
    expect(text.style.webkitLineClamp).toBe('2');
    expect(getComputedStyle(text).webkitLineClamp).toBe('2');
    unmount();
  }
});

test('reacts to semantic and typography prop changes without a stale setup snapshot', async () => {
  const { rerender } = render(Text, { slots: { default: () => 'Reactive copy' } });
  await rerender({ as: 'small', tone: 'subtle', align: 'justify', truncate: true });
  let text = screen.getByText('Reactive copy');
  expect(text.tagName).toBe('SMALL');
  expect(text.getAttribute('data-size')).toBe('sm');
  expect(text.getAttribute('data-weight')).toBe('regular');
  expect(text.getAttribute('data-tone')).toBe('subtle');
  expect(text.getAttribute('data-align')).toBe('justify');
  expect(text.hasAttribute('data-truncate')).toBe(true);
  await rerender({ as: 'strong', tone: 'destructive', align: undefined, truncate: false });
  text = screen.getByText('Reactive copy');
  expect(text.tagName).toBe('STRONG');
  expect(text.getAttribute('data-size')).toBe('md');
  expect(text.getAttribute('data-weight')).toBe('semibold');
  expect(text.getAttribute('data-tone')).toBe('destructive');
  expect(text.hasAttribute('data-align')).toBe(false);
  expect(text.hasAttribute('data-truncate')).toBe(false);
});

test('keeps line clamp effective when truncate is also set', () => {
  render(Text, {
    props: { truncate: true, lineClamp: 2 },
    slots: { default: () => 'Clamped copy' },
  });
  const text = screen.getByText('Clamped copy');
  expect(text.hasAttribute('data-truncate')).toBe(true);
  expect(text.hasAttribute('data-line-clamp')).toBe(true);
  expect(getComputedStyle(text).webkitLineClamp).toBe('2');
  expect([...text.classList]).toEqual(
    expect.arrayContaining([
      '[display:-webkit-box]',
      'overflow-hidden',
      'text-ellipsis',
      'whitespace-normal',
      '[-webkit-box-orient:vertical]',
    ]),
  );
  expect([...text.classList]).not.toContain('whitespace-nowrap');
  expect(getComputedStyle(text)).toMatchObject({
    overflow: 'hidden',
    whiteSpace: 'normal',
    webkitLineClamp: '2',
  });
});

test('lets consumer utilities override typography defaults', () => {
  render(Text, {
    props: { class: 'text-center text-xl font-bold text-primary' },
    slots: { default: () => 'Customized copy' },
  });
  const text = screen.getByText('Customized copy');
  expect([...text.classList]).toEqual(
    expect.arrayContaining(['text-xl', 'font-bold', 'text-primary', 'text-center']),
  );
  expect([...text.classList]).not.toContain('text-md');
  expect([...text.classList]).not.toContain('font-regular');
  expect([...text.classList]).not.toContain('text-foreground');
  expect([...text.classList]).not.toContain('text-start');
  expect(getComputedStyle(text)).toMatchObject({
    fontSize: '20px',
    fontWeight: '700',
    textAlign: 'center',
  });
});

test('hydrates text without replacing the server host', async () => {
  const host = document.createElement('div');
  host.innerHTML = await renderToString(createSSRApp(TestText));
  document.body.append(host);
  const serverRoot = host.querySelector<HTMLElement>('a')!;
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestText);
  try {
    const instance = app.mount(host) as InstanceType<typeof TestText>;
    await expect.element(page.getByRole('link', { name: 'Hydrated copy' })).toHaveCount(1);
    expect(host.querySelectorAll('a')).toHaveLength(1);
    expect(host.querySelector('a')).toBe(serverRoot);
    expect([...serverRoot.classList]).toContain('hydrated-text');
    expect(instance.rootRef?.$el).toBe(serverRoot);
    expect(serverRoot.getAttribute('data-tone')).toBe('primary');
    expect(serverRoot.style.webkitLineClamp).toBe('2');
    expect(getComputedStyle(serverRoot).webkitLineClamp).toBe('2');
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});