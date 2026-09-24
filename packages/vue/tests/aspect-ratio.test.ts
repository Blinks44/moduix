import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { AspectRatio } from '../src';

test('renders a styled root with stable hooks and a forwarded ref', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { AspectRatio },
    setup() {
      return { rootRef };
    },
    template: `
      <AspectRatio
        ref="rootRef"
        :ratio="2"
        data-testid="frame"
        data-scope="custom"
        data-part="custom"
        data-slot="custom"
      />
    `,
  });
  const { getByTestId } = render(Harness);
  const frame = getByTestId('frame');

  expect(rootRef.value?.$el).toBe(frame);
  expect(frame).toHaveAttribute('data-scope', 'aspect-ratio');
  expect(frame).toHaveAttribute('data-part', 'root');
  expect(frame).toHaveAttribute('data-slot', 'aspect-ratio-root');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
});

test('preserves semantic children, merged classes, and the ref with asChild', () => {
  const rootRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: { AspectRatio },
    setup() {
      return { rootRef };
    },
    template: `
      <AspectRatio ref="rootRef" :ratio="16 / 9" class="frame" as-child>
        <figure aria-label="Mountain landscape" class="figure" />
      </AspectRatio>
    `,
  });
  const { getByRole } = render(Harness);

  const frame = getByRole('figure', { name: 'Mountain landscape' });
  expect(rootRef.value?.$el).toBe(frame);
  expect(frame).toHaveAttribute('data-slot', 'aspect-ratio-root');
  expect(frame).toHaveClass('frame', 'figure');
});

test('keeps the ratio contract while allowing style.aspectRatio to override the CSS rule', () => {
  const { getByTestId } = render({
    components: { AspectRatio },
    template: `
      <AspectRatio
        :ratio="2"
        data-testid="frame"
        :style="{ aspectRatio: '1 / 1', '--_aspect-ratio-value': '99' }"
      />
    `,
  });
  const frame = getByTestId('frame');

  expect(frame.style.aspectRatio).toBe('1 / 1');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
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

test('rejects invalid ratios', () => {
  for (const ratio of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() =>
      render(
        {
          components: { AspectRatio },
          template: '<AspectRatio :ratio="ratio" />',
          props: { ratio: { type: Number, required: true } },
        },
        { props: { ratio } },
      ),
    ).toThrow('AspectRatio `ratio` must be a finite number greater than zero.');
  }
});