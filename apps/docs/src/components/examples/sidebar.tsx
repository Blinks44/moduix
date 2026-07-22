import type { CSSPropertiesEditorContext, CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const sidebarCssDefaults = {
  '--sidebar-accent-bg': 'var(--color-accent)',
  '--sidebar-accent-color': 'var(--color-accent-foreground)',
  '--sidebar-active-font-weight': 'var(--weight-medium)',
  '--sidebar-bg': 'var(--color-card)',
  '--sidebar-border-color': 'var(--color-border)',
  '--sidebar-border-width': 'var(--border-width-sm)',
  '--sidebar-collapsed-item-size': 'var(--size-md)',
  '--sidebar-collapsed-padding-x': 'var(--spacing-1)',
  '--sidebar-color': 'var(--color-card-foreground)',
  '--sidebar-disabled-opacity': 'var(--opacity-disabled)',
  '--sidebar-focus-ring-color': 'var(--color-ring)',
  '--sidebar-focus-ring-offset': 'var(--focus-ring-offset)',
  '--sidebar-focus-ring-width': 'var(--border-width-md)',
  '--sidebar-gap': 'var(--spacing-2)',
  '--sidebar-group-gap': 'var(--spacing-1)',
  '--sidebar-group-label-font-size': 'var(--text-xs)',
  '--sidebar-group-label-font-weight': 'var(--weight-medium)',
  '--sidebar-group-label-line-height': 'var(--line-height-text-xs)',
  '--sidebar-group-label-padding-x': 'var(--spacing-2)',
  '--sidebar-group-label-text-transform': 'none',
  '--sidebar-group-action-size': '1.5rem',
  '--sidebar-group-padding': 'var(--spacing-3)',
  '--sidebar-header-footer-padding': 'var(--spacing-3)',
  '--sidebar-height': '100dvh',
  '--sidebar-icon-size': '1rem',
  '--sidebar-inset-bg': 'var(--color-background)',
  '--sidebar-inset-color': 'var(--color-foreground)',
  '--sidebar-menu-button-border-width': '0',
  '--sidebar-menu-button-font-size': 'var(--text-sm)',
  '--sidebar-menu-button-font-size-sm': 'var(--text-xs)',
  '--sidebar-menu-button-gap': 'var(--spacing-2)',
  '--sidebar-menu-button-height': 'var(--size-md)',
  '--sidebar-menu-button-height-lg': 'var(--size-lg)',
  '--sidebar-menu-button-height-sm': 'var(--size-sm)',
  '--sidebar-menu-button-line-height': 'var(--line-height-text-sm)',
  '--sidebar-menu-button-padding-x': 'var(--spacing-2)',
  '--sidebar-menu-button-padding-y': 'var(--spacing-1)',
  '--sidebar-menu-button-radius': 'var(--radius-md)',
  '--sidebar-menu-gap': 'var(--spacing-1)',
  '--sidebar-menu-action-size': '1.5rem',
  '--sidebar-menu-badge-min-width': '1.5rem',
  '--sidebar-menu-badge-padding-x': 'var(--spacing-1)',
  '--sidebar-menu-sub-border-width': 'var(--border-width-sm)',
  '--sidebar-menu-sub-button-font-size': 'var(--text-sm)',
  '--sidebar-menu-sub-button-gap': 'var(--spacing-2)',
  '--sidebar-menu-sub-button-height': 'var(--size-sm)',
  '--sidebar-menu-sub-button-line-height': 'var(--line-height-text-sm)',
  '--sidebar-menu-sub-button-padding-x': 'var(--spacing-2)',
  '--sidebar-menu-sub-margin-x': 'var(--spacing-4)',
  '--sidebar-menu-sub-margin-y': 'var(--spacing-1)',
  '--sidebar-menu-sub-padding-x': 'var(--spacing-2)',
  '--sidebar-min-height': '24rem',
  '--sidebar-muted-color': 'var(--color-muted-foreground)',
  '--sidebar-radius': '0',
  '--sidebar-resize-hit-area': '0.75rem',
  '--sidebar-section-border-width': '0',
  '--sidebar-shadow': 'none',
  '--sidebar-transition': 'var(--transition-default)',
  '--sidebar-trigger-bg': 'var(--color-background)',
  '--sidebar-trigger-border-color': 'var(--color-border)',
  '--sidebar-trigger-border-width': 'var(--border-width-sm)',
  '--sidebar-trigger-offset-y': 'var(--spacing-4)',
  '--sidebar-trigger-radius': 'var(--radius-full)',
  '--sidebar-trigger-shadow': 'var(--shadow-sm)',
  '--sidebar-trigger-size': '1.75rem',
  '--sidebar-width': '100%',
} satisfies Record<`--sidebar-${string}`, string>;

const sidebarOverrideCssProperties: CssProperty[] = Object.entries(sidebarCssDefaults).map(
  ([name, defaultValue]) => ({
    name: name as `--${string}`,
    defaultValue,
    description: `Controls the Sidebar ${name.slice('--sidebar-'.length).replaceAll('-', ' ')}.`,
  }),
);

export const sidebarExampleCss = `
.app-sidebar {
  --sidebar-width: min(64rem, 100%);
  --sidebar-height: 34rem;
  --sidebar-min-height: 28rem;
  --sidebar-radius: var(--radius-lg);
  --sidebar-shadow: var(--shadow-sm);
}

.app-sidebar [data-slot="sidebar-content"] {
  scrollbar-color: var(--color-border) transparent;
  scrollbar-width: thin;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  min-width: 0;
  font-weight: var(--weight-semibold);
}

.app-header-stack {
  display: grid;
  gap: var(--spacing-3);
  width: 100%;
}

.app-brand-mark {
  display: grid;
  place-items: center;
  width: var(--size-sm);
  height: var(--size-sm);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  font-size: var(--text-xs);
}

.app-workspace-mark {
  display: grid;
  place-items: center;
  width: var(--size-sm);
  height: var(--size-sm);
  border-radius: var(--radius-sm);
  background-color: var(--color-accent);
  font-size: var(--text-xs);
}

.app-collapsible {
  --collapsible-width: 100%;
  --collapsible-max-width: 100%;
  --collapsible-color: inherit;
  --collapsible-content-color: inherit;
}

.app-account-button {
  height: auto;
}

.app-account-meta {
  display: grid;
  flex: 1;
  text-align: start;
}

.app-account-meta > strong,
.app-account-meta > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-account-meta > span {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
}

.app-account-menu {
  --menu-popup-min-width: 14rem;
  --menu-popup-max-width: 18rem;
}

.app-footer-stack {
  display: grid;
  width: 100%;
}

.app-topbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  min-height: 3.5rem;
  padding-inline: var(--spacing-6);
  border-block-end: var(--border-width-sm) solid var(--color-border);
}

.app-main {
  padding: var(--spacing-6);
}
`;

export const sidebarSimpleCss = `
.app-sidebar {
  --sidebar-width: min(64rem, 100%);
  --sidebar-height: 34rem;
  --sidebar-min-height: 28rem;
  --sidebar-radius: var(--radius-lg);
  --sidebar-shadow: var(--shadow-sm);
}

.app-sidebar [data-slot="sidebar-content"] {
  scrollbar-color: var(--color-border) transparent;
  scrollbar-width: thin;
}

.app-topbar {
  min-height: 3.5rem;
  padding-inline: var(--spacing-6);
  border-block-end: var(--border-width-sm) solid var(--color-border);
}

.app-main {
  padding: var(--spacing-6);
}
`;

export const sidebarDrawerCss = `
.mobile-trigger {
  margin-block-end: var(--spacing-4);
}

.mobile-drawer {
  --drawer-padding-x: 0;
  --drawer-padding-y: var(--spacing-3);
  --sidebar-section-border-width: var(--border-width-sm);
  width: min(20rem, calc(100vw - 2rem));
  max-width: 20rem;
}

.mobile-drawer-header {
  padding-inline: var(--spacing-3);
}

.mobile-drawer-body {
  display: flex;
  min-height: 0;
  padding: 0;
  overflow: hidden;
}

.mobile-sidebar-surface {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-height: 0;
  background-color: var(--color-card);
}

.mobile-sidebar-surface [data-slot="sidebar-content"] {
  scrollbar-color: var(--color-border) transparent;
  scrollbar-width: thin;
}

.mobile-sidebar-surface .app-header-stack,
.mobile-sidebar-surface .app-footer-stack {
  display: grid;
  width: 100%;
}

.mobile-sidebar-surface .app-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  min-width: 0;
  font-weight: var(--weight-semibold);
}

.mobile-sidebar-surface .app-brand-mark {
  display: grid;
  place-items: center;
  width: var(--size-sm);
  height: var(--size-sm);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  font-size: var(--text-xs);
}

.mobile-sidebar-surface .app-account-button {
  height: auto;
}

.mobile-sidebar-surface .app-account-meta {
  display: grid;
  flex: 1;
  text-align: start;
}

.mobile-sidebar-surface .app-account-meta > strong,
.mobile-sidebar-surface .app-account-meta > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-sidebar-surface .app-account-meta > span {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
}

.mobile-sidebar-surface .app-account-menu {
  --menu-popup-min-width: 14rem;
  --menu-popup-max-width: 18rem;
}

`;

export const sidebarScrollAreaCss = `${sidebarSimpleCss}
.app-sidebar-scroll-content {
  overflow: hidden;
}

.app-sidebar-scroll-area {
  --scroll-area-radius: 0;
}

[data-slot="sidebar-panel"][data-state="collapsed"]
  .app-sidebar-scroll-area
  [data-slot="scroll-area-scrollbar"] {
  display: none;
}
`;

export function SidebarCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={sidebarOverrideCssProperties} />;
}