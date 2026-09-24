import type { Accessor } from 'solid-js';
import { createEffect, untrack } from 'solid-js';

type DefaultValue = string | number | readonly string[];
type MaybeDefaultValue = DefaultValue | Accessor<DefaultValue | undefined>;

function resolveValue(value: MaybeDefaultValue): DefaultValue | undefined {
  return typeof value === 'function' ? value() : value;
}

/**
 * Applies React-style `defaultValue` to a rendered native control.
 * Needed because Ark Solid does not forward `defaultValue` to the DOM element
 * when `asChild` wraps a custom component.
 */
export function applyDefaultValue(
  ref: HTMLElement & { defaultValue: string },
  value: MaybeDefaultValue,
) {
  createEffect(() => {
    ref.defaultValue = String(untrack(() => resolveValue(value)) ?? '');
  });
}

/** Selects the option matching `defaultValue` on a native `<select>`. */
export function applyDefaultSelected(ref: HTMLSelectElement, value: MaybeDefaultValue) {
  createEffect(() => {
    const defaultValue = untrack(() => resolveValue(value));

    if (defaultValue === undefined) return;

    const values = new Set(
      (Array.isArray(defaultValue) ? defaultValue : [defaultValue]).map((v) => String(v)),
    );

    for (const option of Array.from(ref.options)) {
      const selected = values.has(option.value);
      option.selected = selected;
      option.defaultSelected = selected;
    }
  });
}

export function toPropDefaultValue(value: DefaultValue | undefined) {
  return {
    'prop:defaultValue': value === undefined ? undefined : (value as string | number | string[]),
  } as const;
}