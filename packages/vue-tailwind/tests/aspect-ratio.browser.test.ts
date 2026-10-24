import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { AspectRatio } from '../src';

test('renders a styled root with stable hooks and a forwarded ref', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: { AspectRatio },
    setup() {
      return { rootRef };
    },
    template: `
      <AspectRatio
        ref="rootRef"
        :ratio="2"
        data-testid="frame" style="width: 320px"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
      />
    `,
  };
  const { getByTestId } = render(Harness);
  const frame = getByTestId('frame');

  expect(rootRef.value?.$el).toBe(frame);
  expect(frame.getAttribute('data-scope')).toBe('aspect-ratio');
  expect(frame.getAttribute('data-part')).toBe('root');
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(160);
});

test('preserves semantic children, merged classes, and the ref with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: { AspectRatio },
    setup() {
      return { rootRef };
    },
    template: `
      <AspectRatio ref="rootRef" :ratio="16 / 9" class="frame" as-child>
        <figure aria-label="Mountain landscape" class="figure" />
      </AspectRatio>
    `,
  };
  const { getByRole } = render(Harness);

  const frame = getByRole('figure', { name: 'Mountain landscape' });
  expect(rootRef.value?.$el).toBe(frame);
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect([...frame.classList]).toEqual(expect.arrayContaining(['frame', 'figure']));
});

test('keeps the ratio contract while allowing style.aspectRatio to override the CSS rule', () => {
  const { getByTestId } = render({
    components: { AspectRatio },
    template: `
      <AspectRatio
        :ratio="2"
        data-testid="frame"
        :style="{ width: '320px', aspectRatio: '1 / 1', '--_aspect-ratio-value': '99' }"
      />
    `,
  });
  const frame = getByTestId('frame');

  expect(frame.style.aspectRatio).toBe('1 / 1');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(320);
});

test('preserves array style values', () => {
  const { getByTestId } = render({
    components: { AspectRatio },
    template: `
      <AspectRatio
        :ratio="2"
        data-testid="frame"
        :style="[{ color: 'red' }, { backgroundColor: 'blue' }]"
      />
    `,
  });
  const frame = getByTestId('frame');

  expect(frame.style.color).toBe('red');
  expect(frame.style.backgroundColor).toBe('blue');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render({
    components: { AspectRatio },
    template: '<AspectRatio :ratio="16 / 9" data-testid="frame" class="static w-1/2" />',
  });
  const frame = screen.getByTestId('frame');

  expect([...frame.classList]).toEqual(expect.arrayContaining(['static', 'w-1/2']));
  expect([...frame.classList]).not.toContain('relative');
  expect([...frame.classList]).not.toContain('w-full');
  expect(getComputedStyle(frame).position).toBe('static');
  expect(frame.getBoundingClientRect().width).toBeCloseTo(frame.parentElement!.clientWidth / 2);
  expect(frame.getBoundingClientRect().height).toBeCloseTo(
    (frame.getBoundingClientRect().width * 9) / 16,
    1,
  );
});

test('keeps the ratio when content is taller than the frame', () => {
  const { getByTestId } = render({
    components: { AspectRatio },
    template: `
      <AspectRatio :ratio="2" data-testid="frame" style="width: 320px">
        <div style="height: 400px" />
      </AspectRatio>
    `,
  });

  expect(getByTestId('frame').offsetHeight).toBe(160);
});

test('falls back to a square frame when the ratio is missing or invalid', () => {
  for (const ratio of [undefined, 0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    const { getByTestId, unmount } = render(
      {
        components: { AspectRatio },
        template: '<AspectRatio :ratio="ratio" data-testid="frame" style="width: 320px" />',
        props: { ratio: { type: Number, required: false } },
      },
      { props: { ratio } },
    );
    const frame = getByTestId('frame');

    expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('1');
    expect(frame.offsetHeight).toBe(320);
    unmount();
  }
});