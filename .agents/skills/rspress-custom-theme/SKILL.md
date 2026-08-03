---
name: rspress-custom-theme
description: Customize the Rspress site theme through CSS variables, documented theme classes, layout slots, component wrapping, ejection, icons, and global UI components.
---

# Rspress Custom Theme

Own the visual shell and theme integration of the Rspress site. Choose the least invasive public mechanism that meets the design requirement and verify it against the installed Rspress version.

## Read first

1. `apps/docs/rspress.config.ts`, `apps/docs/theme/index.tsx`, and the touched page or component.
2. Current official Rspress documentation for uncertain APIs.
3. The relevant reference below before using slots, ejection, or the theme variable surface.

## Escalation path

1. **CSS variables** for palette, typography, spacing, code, and home-page styling.
2. **Documented theme classes** for a narrowly scoped visual adjustment.
3. **Layout slots / wrapping** for inserting or replacing one region while retaining Rspress ownership of the rest.
4. **Ejection** only when the required structure or behavior cannot be achieved by the public theme surface.

Do not skip levels, copy an entire theme component to change one style, or create parallel navigation, sidebars, headers, or route logic.

## Rules

- Keep `theme/index.tsx` as a thin integration point: global imports, layout wrapping, MDX component overrides, and explicit global UI registration.
- Register app-wide providers through Rspress's global UI surface rather than per-page imports. Use a page-type layout only for the page type it owns; do not make a home-page override affect document pages.
- Preserve Rspress semantics, keyboard behavior, responsive behavior, accessible names, and locale handling when wrapping or replacing a region.
- Scope custom CSS to documented classes or local modules. Avoid fragile descendant selectors and global overrides that leak into content.
- Use a custom icon only when the built-in theme icon does not meet a concrete requirement. Match view box, accessible labeling, and current theme behavior.
- Re-check light, dark, narrow, wide, home, and document-page states for a visual shell change.

## References

- [CSS variables](references/css-variables.md)
- [Layout slots and hooks](references/layout-slots.md)
- [Ejection workflow](references/eject-components.md)