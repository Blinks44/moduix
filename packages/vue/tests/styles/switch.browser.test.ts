import { expect, test } from '@rstest/core';
import { render } from '@testing-library/vue';
import { ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
} from '@/index';

const switchComponents = {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
  SwitchRootProvider,
  SwitchThumb,
};

test('forwards Vue refs and exposes stable slots on public parts', () => {
  const refs = {
    root: ref<ComponentPublicInstance | null>(null),
    control: ref<ComponentPublicInstance | null>(null),
    thumb: ref<ComponentPublicInstance | null>(null),
    label: ref<ComponentPublicInstance | null>(null),
  };

  render({
    components: switchComponents,
    setup() {
      return {
        rootRef: refs.root,
        controlRef: refs.control,
        thumbRef: refs.thumb,
        labelRef: refs.label,
      };
    },
    template: `
      <Switch ref="rootRef" size="lg" data-size="sm">
        <SwitchControl ref="controlRef">
          <SwitchThumb ref="thumbRef" />
        </SwitchControl>
        <SwitchHiddenInput />
        <SwitchLabel ref="labelRef">Email notifications</SwitchLabel>
      </Switch>
    `,
  });

  expect(refs.root.value?.$el?.getAttribute('data-slot')).toBe('switch-root');
  expect(refs.root.value?.$el?.getAttribute('data-size')).toBe('lg');
  expect(refs.control.value?.$el?.getAttribute('data-slot')).toBe('switch-control');
  expect(refs.thumb.value?.$el?.getAttribute('data-slot')).toBe('switch-thumb');
  expect(refs.label.value?.$el?.getAttribute('data-slot')).toBe('switch-label');
});