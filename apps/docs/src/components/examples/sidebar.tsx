import type { CSSPropertiesEditorContext, CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const sidebarCssDefaults = {
  '--moduix-sidebar-accent-bg': 'var(--moduix-color-accent)',
  '--moduix-sidebar-accent-color': 'var(--moduix-color-accent-foreground)',
  '--moduix-sidebar-active-font-weight': 'var(--moduix-weight-medium)',
  '--moduix-sidebar-bg': 'var(--moduix-color-card)',
  '--moduix-sidebar-border-color': 'var(--moduix-color-border)',
  '--moduix-sidebar-border-width': 'var(--moduix-border-width-sm)',
  '--moduix-sidebar-collapsed-item-size': 'var(--moduix-size-md)',
  '--moduix-sidebar-collapsed-padding-x': 'var(--moduix-spacing-1)',
  '--moduix-sidebar-color': 'var(--moduix-color-card-foreground)',
  '--moduix-sidebar-disabled-opacity': 'var(--moduix-opacity-disabled)',
  '--moduix-sidebar-focus-ring-color': 'var(--moduix-color-ring)',
  '--moduix-sidebar-focus-ring-offset': 'var(--moduix-focus-ring-offset)',
  '--moduix-sidebar-focus-ring-width': 'var(--moduix-border-width-md)',
  '--moduix-sidebar-gap': 'var(--moduix-spacing-2)',
  '--moduix-sidebar-group-gap': 'var(--moduix-spacing-1)',
  '--moduix-sidebar-group-label-font-size': 'var(--moduix-text-xs)',
  '--moduix-sidebar-group-label-font-weight': 'var(--moduix-weight-medium)',
  '--moduix-sidebar-group-label-line-height': 'var(--moduix-line-height-text-xs)',
  '--moduix-sidebar-group-label-padding-x': 'var(--moduix-spacing-2)',
  '--moduix-sidebar-group-label-text-transform': 'none',
  '--moduix-sidebar-group-action-size': '1.5rem',
  '--moduix-sidebar-group-padding': 'var(--moduix-spacing-3)',
  '--moduix-sidebar-header-footer-padding': 'var(--moduix-spacing-3)',
  '--moduix-sidebar-height': '100dvh',
  '--moduix-sidebar-icon-size': '1rem',
  '--moduix-sidebar-inset-bg': 'var(--moduix-color-background)',
  '--moduix-sidebar-inset-color': 'var(--moduix-color-foreground)',
  '--moduix-sidebar-menu-button-border-width': '0',
  '--moduix-sidebar-menu-button-font-size': 'var(--moduix-text-sm)',
  '--moduix-sidebar-menu-button-font-size-sm': 'var(--moduix-text-xs)',
  '--moduix-sidebar-menu-button-gap': 'var(--moduix-spacing-2)',
  '--moduix-sidebar-menu-button-height': 'var(--moduix-size-md)',
  '--moduix-sidebar-menu-button-height-lg': 'var(--moduix-size-lg)',
  '--moduix-sidebar-menu-button-height-sm': 'var(--moduix-size-sm)',
  '--moduix-sidebar-menu-button-line-height': 'var(--moduix-line-height-text-sm)',
  '--moduix-sidebar-menu-button-padding-x': 'var(--moduix-spacing-2)',
  '--moduix-sidebar-menu-button-padding-y': 'var(--moduix-spacing-1)',
  '--moduix-sidebar-menu-button-radius': 'var(--moduix-radius-md)',
  '--moduix-sidebar-menu-gap': 'var(--moduix-spacing-1)',
  '--moduix-sidebar-menu-action-size': '1.5rem',
  '--moduix-sidebar-menu-badge-min-width': '1.5rem',
  '--moduix-sidebar-menu-badge-padding-x': 'var(--moduix-spacing-1)',
  '--moduix-sidebar-menu-sub-border-width': 'var(--moduix-border-width-sm)',
  '--moduix-sidebar-menu-sub-button-font-size': 'var(--moduix-text-sm)',
  '--moduix-sidebar-menu-sub-button-gap': 'var(--moduix-spacing-2)',
  '--moduix-sidebar-menu-sub-button-height': 'var(--moduix-size-sm)',
  '--moduix-sidebar-menu-sub-button-line-height': 'var(--moduix-line-height-text-sm)',
  '--moduix-sidebar-menu-sub-button-padding-x': 'var(--moduix-spacing-2)',
  '--moduix-sidebar-menu-sub-margin-x': 'var(--moduix-spacing-4)',
  '--moduix-sidebar-menu-sub-margin-y': 'var(--moduix-spacing-1)',
  '--moduix-sidebar-menu-sub-padding-x': 'var(--moduix-spacing-2)',
  '--moduix-sidebar-min-height': '24rem',
  '--moduix-sidebar-muted-color': 'var(--moduix-color-muted-foreground)',
  '--moduix-sidebar-radius': '0',
  '--moduix-sidebar-resize-hit-area': '0.75rem',
  '--moduix-sidebar-section-border-width': '0',
  '--moduix-sidebar-shadow': 'none',
  '--moduix-sidebar-transition': 'var(--moduix-transition-default)',
  '--moduix-sidebar-trigger-bg': 'var(--moduix-color-background)',
  '--moduix-sidebar-trigger-border-color': 'var(--moduix-color-border)',
  '--moduix-sidebar-trigger-border-width': 'var(--moduix-border-width-sm)',
  '--moduix-sidebar-trigger-offset-y': 'var(--moduix-spacing-4)',
  '--moduix-sidebar-trigger-radius': 'var(--moduix-radius-full)',
  '--moduix-sidebar-trigger-shadow': 'var(--moduix-shadow-sm)',
  '--moduix-sidebar-trigger-size': '1.75rem',
  '--moduix-sidebar-width': '100%',
} satisfies Record<`--moduix-sidebar-${string}`, string>;

const sidebarOverrideCssProperties: CssProperty[] = Object.entries(sidebarCssDefaults).map(
  ([name, defaultValue]) => ({
    name: name as `--${string}`,
    defaultValue,
    description: `Controls the Sidebar ${name.slice('--sidebar-'.length).replaceAll('-', ' ')}.`,
  }),
);

export const sidebarExampleCss = `
.app-sidebar {
  --moduix-sidebar-width: min(64rem, 100%);
  --moduix-sidebar-height: 34rem;
  --moduix-sidebar-min-height: 28rem;
  --moduix-sidebar-radius: var(--moduix-radius-lg);
  --moduix-sidebar-shadow: var(--moduix-shadow-sm);
}

.app-sidebar [data-slot="sidebar-content"] {
  scrollbar-color: var(--moduix-color-border) transparent;
  scrollbar-width: thin;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: var(--moduix-spacing-2);
  min-width: 0;
  font-weight: var(--moduix-weight-semibold);
}

.app-header-stack {
  display: grid;
  gap: var(--moduix-spacing-3);
  width: 100%;
}

.app-brand-mark {
  display: grid;
  place-items: center;
  width: var(--moduix-size-sm);
  height: var(--moduix-size-sm);
  border-radius: var(--moduix-radius-sm);
  background-color: var(--moduix-color-primary);
  color: var(--moduix-color-primary-foreground);
  font-size: var(--moduix-text-xs);
}

.app-workspace-mark {
  display: grid;
  place-items: center;
  width: var(--moduix-size-sm);
  height: var(--moduix-size-sm);
  border-radius: var(--moduix-radius-sm);
  background-color: var(--moduix-color-accent);
  font-size: var(--moduix-text-xs);
}

.app-collapsible {
  --moduix-collapsible-width: 100%;
  --moduix-collapsible-max-width: 100%;
  --moduix-collapsible-color: inherit;
  --moduix-collapsible-content-color: inherit;
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
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-xs);
}

.app-account-menu {
  --moduix-menu-popup-min-width: 14rem;
  --moduix-menu-popup-max-width: 18rem;
}

.app-footer-stack {
  display: grid;
  width: 100%;
}

.app-topbar {
  display: flex;
  align-items: center;
  gap: var(--moduix-spacing-3);
  min-height: 3.5rem;
  padding-inline: var(--moduix-spacing-6);
  border-block-end: var(--moduix-border-width-sm) solid var(--moduix-color-border);
}

.app-main {
  padding: var(--moduix-spacing-6);
}
`;

export const sidebarSimpleCss = `
.app-sidebar {
  --moduix-sidebar-width: min(64rem, 100%);
  --moduix-sidebar-height: 34rem;
  --moduix-sidebar-min-height: 28rem;
  --moduix-sidebar-radius: var(--moduix-radius-lg);
  --moduix-sidebar-shadow: var(--moduix-shadow-sm);
}

.app-sidebar [data-slot="sidebar-content"] {
  scrollbar-color: var(--moduix-color-border) transparent;
  scrollbar-width: thin;
}

.app-topbar {
  min-height: 3.5rem;
  padding-inline: var(--moduix-spacing-6);
  border-block-end: var(--moduix-border-width-sm) solid var(--moduix-color-border);
}

.app-main {
  padding: var(--moduix-spacing-6);
}
`;

export const sidebarDrawerCss = `
.mobile-trigger {
  margin-block-end: var(--moduix-spacing-4);
}

.mobile-drawer {
  --moduix-drawer-padding-x: 0;
  --moduix-drawer-padding-y: var(--moduix-spacing-3);
  --moduix-sidebar-section-border-width: var(--moduix-border-width-sm);
  width: min(20rem, calc(100vw - 2rem));
  max-width: 20rem;
}

.mobile-drawer-header {
  padding-inline: var(--moduix-spacing-3);
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
  background-color: var(--moduix-color-card);
}

.mobile-sidebar-surface [data-slot="sidebar-content"] {
  scrollbar-color: var(--moduix-color-border) transparent;
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
  gap: var(--moduix-spacing-2);
  min-width: 0;
  font-weight: var(--moduix-weight-semibold);
}

.mobile-sidebar-surface .app-brand-mark {
  display: grid;
  place-items: center;
  width: var(--moduix-size-sm);
  height: var(--moduix-size-sm);
  border-radius: var(--moduix-radius-sm);
  background-color: var(--moduix-color-primary);
  color: var(--moduix-color-primary-foreground);
  font-size: var(--moduix-text-xs);
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
  color: var(--moduix-color-muted-foreground);
  font-size: var(--moduix-text-xs);
}

.mobile-sidebar-surface .app-account-menu {
  --moduix-menu-popup-min-width: 14rem;
  --moduix-menu-popup-max-width: 18rem;
}

`;

export const sidebarScrollAreaCss = `${sidebarSimpleCss}
.app-sidebar-scroll-content {
  overflow: hidden;
}

.app-sidebar-scroll-area {
  --moduix-scroll-area-radius: 0;
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