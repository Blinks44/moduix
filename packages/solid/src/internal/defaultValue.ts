type DefaultValue = string | number | readonly string[];

/**
 * Sets React-style `defaultValue` as a DOM property. Solid would otherwise
 * render it as an unknown attribute, which native controls ignore.
 */
export function toPropDefaultValue(value: DefaultValue | undefined) {
  return {
    'prop:defaultValue': value as string | number | string[] | undefined,
  } as const;
}