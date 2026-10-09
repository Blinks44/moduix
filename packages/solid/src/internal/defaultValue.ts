import type { Accessor } from 'solid-js';
import { onMount } from 'solid-js';

type DefaultValue = string | number | readonly string[];

/**
 * Applies React-style `defaultValue` to a rendered native control.
 * Needed because Ark Solid does not forward `defaultValue` to the DOM element
 * when `asChild` wraps a custom component.
 */
export function applyDefaultValue(
  ref: HTMLElement & { defaultValue: string },
  value: Accessor<DefaultValue | undefined>,
) {
  onMount(() => {
    ref.defaultValue = String(value() ?? '');
  });
}

/** Selects the option matching `defaultValue` on a native `<select>`. */
export function applyDefaultSelected(
  ref: HTMLSelectElement,
  value: Accessor<DefaultValue | undefined>,
) {
  onMount(() => {
    const defaultValue = value();

    if (defaultValue === undefined) return;

    const values = new Set(
      (Array.isArray(defaultValue) ? defaultValue : [defaultValue]).map((v) => String(v)),
    );

    for (const option of ref.options) {
      const selected = values.has(option.value);
      option.selected = selected;
      option.defaultSelected = selected;
    }
  });
}

export function toPropDefaultValue(value: DefaultValue | undefined) {
  return {
    'prop:defaultValue': value as string | number | string[] | undefined,
  } as const;
}