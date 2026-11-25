import type { CssControls } from './customize';
import type { CssProperty } from './reference';

// Curated interactive controls for core components that expose component-level CSS variables.
// Only controls whose variable name appears in the component's documented `properties` are shown.
const controlCatalog: CssControls = {
  // Select
  '--moduix-select-control-height': [28, 52, 2, 'px'],
  '--moduix-select-radius': [0, 20, 1, 'px'],
  '--moduix-select-width': [180, 360, 10, 'px'],
  '--moduix-select-content-max-height': [160, 380, 20, 'px'],
  // Input
  '--moduix-input-height': [28, 52, 2, 'px'],
  '--moduix-input-radius': [0, 20, 1, 'px'],
  '--moduix-input-width': [180, 360, 10, 'px'],
  // Card
  '--moduix-card-bg': 'color',
  '--moduix-card-border-color': 'color',
  '--moduix-card-color': 'color',
  '--moduix-card-radius': [0, 28, 2, 'px'],
  '--moduix-card-border-width': [0, 4, 1, 'px'],
  '--moduix-card-spacing': [8, 32, 2, 'px'],
  // Table
  '--moduix-table-bg': 'color',
  '--moduix-table-border-color': 'color',
  '--moduix-table-row-bg-hover': 'color',
  '--moduix-table-cell-padding-x': [6, 28, 2, 'px'],
  '--moduix-table-cell-padding-y': [4, 24, 2, 'px'],
  // Toast
  '--moduix-toast-bg': 'color',
  '--moduix-toast-border-color': 'color',
  '--moduix-toast-color': 'color',
  '--moduix-toast-description-color': 'color',
  // Drawer
  '--moduix-drawer-island-inset': [0, 32, 2, 'px'],
  // Checkbox
  '--moduix-checkbox-bg': 'color',
  '--moduix-checkbox-bg-checked': 'color',
  '--moduix-checkbox-border-color': 'color',
  '--moduix-checkbox-color': 'color',
  '--moduix-checkbox-size': [14, 28, 1, 'px'],
  '--moduix-checkbox-radius': [0, 14, 1, 'px'],
  // Switch
  '--moduix-switch-bg': 'color',
  '--moduix-switch-bg-checked': 'color',
  '--moduix-switch-border-color': 'color',
  '--moduix-switch-thumb-bg': 'color',
  '--moduix-switch-gap': [4, 20, 2, 'px'],
  // Alert
  '--moduix-alert-bg': 'color',
  '--moduix-alert-border-color': 'color',
  '--moduix-alert-color': 'color',
  '--moduix-alert-indicator-color': 'color',
  // Accordion
  '--moduix-accordion-item-border-color': 'color',
  '--moduix-accordion-trigger-bg-hover': 'color',
  '--moduix-accordion-trigger-padding-x': [4, 28, 2, 'px'],
  '--moduix-accordion-trigger-padding-y': [6, 24, 2, 'px'],
  '--moduix-accordion-icon-size': [12, 24, 1, 'px'],
  // Date Picker
  '--moduix-date-picker-control-height': [28, 52, 2, 'px'],
  '--moduix-date-picker-radius': [0, 20, 1, 'px'],
  '--moduix-date-picker-width': [200, 360, 10, 'px'],
  '--moduix-date-picker-table-cell-size': [28, 44, 2, 'px'],
  // Menu
  '--moduix-menu-popup-min-width': [140, 300, 10, 'px'],
  '--moduix-menu-popup-max-height': [160, 400, 20, 'px'],
  // Slider
  '--moduix-slider-track-bg': 'color',
  '--moduix-slider-range-bg': 'color',
  '--moduix-slider-track-size': [2, 14, 1, 'px'],
  '--moduix-slider-thumb-size': [12, 28, 2, 'px'],
  // Avatar
  '--moduix-avatar-bg': 'color',
  '--moduix-avatar-color': 'color',
  '--moduix-avatar-size': [24, 72, 4, 'px'],
  '--moduix-avatar-radius': [0, 36, 2, 'px'],
  // Tag
  '--moduix-tag-bg': 'color',
  '--moduix-tag-color': 'color',
  '--moduix-tag-border-color': 'color',
  // Progress Linear
  '--moduix-progress-linear-track-bg': 'color',
  '--moduix-progress-linear-range-bg': 'color',
  '--moduix-progress-linear-track-size': [2, 16, 1, 'px'],
  // Radio Group
  '--moduix-radio-bg': 'color',
  '--moduix-radio-border-color': 'color',
  '--moduix-radio-indicator-color': 'color',
  '--moduix-radio-size': [14, 28, 1, 'px'],
  // Textarea
  '--moduix-textarea-radius': [0, 20, 1, 'px'],
};

export function resolveDefaultControls(rows: CssProperty[]): CssControls | undefined {
  const matched: CssControls = {};
  let count = 0;
  for (const row of rows) {
    const control = controlCatalog[row.name];
    if (control) {
      matched[row.name] = control;
      count += 1;
    }
  }
  return count > 0 ? matched : undefined;
}