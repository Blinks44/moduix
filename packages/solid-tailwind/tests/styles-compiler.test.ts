import { expect, test } from '@rstest/core';
import { readFileSync } from 'node:fs';
import { compile } from 'tailwindcss';

const theme =
  readFileSync('node_modules/tailwindcss/theme.css', 'utf8') +
  readFileSync('../foundation/src/styles/style.css', 'utf8').replace(/@import[^;]+;/g, '');

const cases = [
  ['lightbox/Lightbox', 'data-[state=open]:animate-moduix-lightbox-content-in'],
  ['lightbox/Lightbox', 'data-[state=closed]:animate-moduix-lightbox-content-out'],
  ['command-palette/CommandPalette', 'data-[state=open]:animate-moduix-command-palette-content-in'],
  [
    'command-palette/CommandPalette',
    'data-[state=closed]:animate-moduix-command-palette-content-out',
  ],
  ['drawer/Drawer', '[--drawer-island-translate-distance:0px]'],
  ['drawer/Drawer', '[--_drawer-bleed:var(--moduix-size-xl)]'],
  [
    'drawer/Drawer',
    'data-[variant=island]:data-[swipe-direction=up]:[--drawer-island-translate-distance:max(var(--moduix-spacing-4),env(safe-area-inset-top,0px))]',
  ],
  ['badge/Badge', 'focus-visible:outline-offset-2'],
  ['carousel/Carousel', 'focus-visible:outline-offset-2'],
  ['sidebar/Sidebar', 'focus-visible:outline-offset-2'],
  ['chart/Chart', '[&_.ts-chart:focus-visible]:outline-offset-2'],
  ['date-picker/DatePicker', 'read-only:cursor-default'],
  [
    'checkbox/Checkbox',
    "[@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent",
  ],
  [
    'switch/Switch',
    "[@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent",
  ],
  ['switch/Switch', 'data-[state=checked]:start-[calc(100%-var(--moduix-spacing-0-5))]'],
  ['switch/Switch', '[&:dir(rtl)]:data-[state=checked]:translate-x-full'],
  ['listbox/Listbox', 'in-[[data-slot=listbox-filter]]:focus-visible:border-ring'],
  [
    'listbox/Listbox',
    'group-has-[+_[data-slot=listbox-content]:focus-visible]/listbox-filter:border-ring',
  ],
  ['listbox/Listbox', 'peer-data-[slot=listbox-filter]/listbox-filter:focus-visible:border-x-ring'],
  ['listbox/Listbox', 'peer-data-[slot=listbox-filter]/listbox-filter:focus-visible:border-b-ring'],
  [
    'listbox/Listbox',
    'peer-data-[slot=listbox-filter]/listbox-filter:focus-visible:outline-transparent',
  ],
  [
    'listbox/Listbox',
    'peer-has-[[data-slot=listbox-input]:focus-visible]/listbox-filter:border-x-ring',
  ],
  [
    'listbox/Listbox',
    'peer-has-[[data-slot=listbox-input]:focus-visible]/listbox-filter:border-b-ring',
  ],
  [
    'splitter/Splitter',
    '[&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring',
  ],
  [
    'input/Input',
    '[[data-slot=input-group-root]:has([data-slot=input-root]:is([data-disabled],:disabled))_&]:opacity-100',
  ],
  ['dialog/Dialog', 'z-[calc(var(--z-index,var(--moduix-z-popup))-1)]'],
  ['dialog/Dialog', 'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))]'],
  [
    'field/Field',
    '[:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
  ],
  [
    'tree-view/TreeView',
    '[:is([data-slot=tree-view-root],[data-slot=tree-view-root-provider])[data-disabled]_&]:opacity-100',
  ],
] as const;

test.each(cases)('%s emits CSS for %s', async (component, candidate) => {
  expect(readFileSync(`src/components/${component}.tsx`, 'utf8')).toContain(candidate);
  const compiler = await compile(theme + '\n@tailwind utilities;');
  const baseline = compiler.build([]);
  expect(compiler.build([candidate])).not.toEqual(baseline);
});

test.each(['focus-visible:outline-offset-0.5', 'readonly:cursor-default'])(
  'the compiler rejects the former invalid candidate %s',
  async (candidate) => {
    const compiler = await compile(theme + '\n@tailwind utilities;');
    const baseline = compiler.build([]);
    expect(compiler.build([candidate])).toEqual(baseline);
  },
);