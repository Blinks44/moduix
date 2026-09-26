import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, defineComponent, ref } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContext,
  MenuContextTrigger,
  MenuContent,
  MenuItem,
  MenuItemContext,
  MenuItemIndicator,
  MenuItemText,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRootProvider,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  MenuViewport,
  useMenu,
  useMenuContext,
  useMenuItemContext,
} from '../src';
import * as menuEntry from '../src/components/menu';

const menuComponents = {
  Menu,
  MenuArrow,
  MenuCheckboxItem,
  MenuContext,
  MenuContextTrigger,
  MenuContent,
  MenuItem,
  MenuItemContext,
  MenuItemIndicator,
  MenuItemText,
  MenuPositioner,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRootProvider,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
  MenuViewport,
};

const TestMenu = defineComponent({
  components: menuComponents,
  template:
    '<Menu default-open><MenuTrigger as-child><button type="button">Actions</button></MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem><MenuCheckboxItem :checked="false" value="toolbar"><MenuItemIndicator /><MenuItemText>Show toolbar</MenuItemText></MenuCheckboxItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
});

const CheckboxMenu = defineComponent({
  components: menuComponents,
  template:
    '<Menu default-open><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuCheckboxItem checked value="toolbar"><MenuItemIndicator /><MenuItemText>Show toolbar</MenuItemText></MenuCheckboxItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
});

test('returns focus to the trigger after escape', async () => {
  render(TestMenu);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  trigger.focus();
  expect(screen.getByRole('menu')).toBeVisible();
  await fireEvent.keyDown(trigger, { key: 'Escape' });
  await waitFor(() => expect(trigger).toHaveFocus());
});

test('renders the controlled checked state for checkbox items', () => {
  render(CheckboxMenu);
  const item = screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' });
  expect(item).toHaveAttribute('data-state', 'checked');
  expect(screen.getByRole('menu')).toBeVisible();
});

test('preserves a custom content host with asChild', () => {
  const Harness = defineComponent({
    components: menuComponents,
    template:
      '<Menu default-open><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent as-child><section aria-label="Actions"><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></section></MenuContent></MenuPositioner></Menu>',
  });
  render(Harness);
  expect(screen.getByRole('menu')).toHaveProperty('tagName', 'SECTION');
});

test('portals Positioner by default', () => {
  const { container } = render(TestMenu);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  expect(screen.getByRole('menu')).toBeVisible();
});

test('supports inline Positioner rendering', () => {
  const Harness = defineComponent({
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  const { container } = render(Harness);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeInTheDocument();
});

test('opens a nested menu from its trigger item', async () => {
  const NestedMenu = defineComponent({
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger as-child><button type="button">Song</button></MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="add-library">Add to Library</MenuItem><Menu :portalled="false"><MenuTriggerItem>Add to Playlist</MenuTriggerItem><MenuPositioner><MenuContent><MenuViewport><MenuItem value="get-up">Get Up!</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  render(NestedMenu);

  const submenuTrigger = screen.getByRole('menuitem', { name: 'Add to Playlist' });
  await fireEvent.click(submenuTrigger);
  await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Get Up!' })).toBeVisible());
});

test('preserves custom context trigger styling', () => {
  const Harness = defineComponent({
    components: menuComponents,
    template:
      '<Menu default-open><MenuContextTrigger as-child><button type="button">Open context menu</button></MenuContextTrigger><MenuPositioner><MenuContent><MenuArrow /><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open context menu' });
  expect(trigger.className).toBe('');
  const content = screen.getByRole('menu');
  expect(content).toBeVisible();
  expect(content.firstElementChild).toHaveAttribute('data-slot', 'menu-arrow');
});

test('exposes the scroll viewport as an explicit part', () => {
  const Harness = defineComponent({
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  render(Harness);
  const viewport = screen.getByRole('menu').firstElementChild;
  expect(viewport).toHaveAttribute('data-scope', 'menu');
  expect(viewport).toHaveAttribute('data-part', 'viewport');
  expect(viewport).toHaveAttribute('data-slot', 'menu-viewport');
});

test('preserves Vue component refs through ordinary menu parts', () => {
  const triggerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = defineComponent({
    components: menuComponents,
    setup() {
      return { contentRef, itemRef, triggerRef };
    },
    template:
      '<Menu default-open :portalled="false"><MenuTrigger ref="triggerRef">Actions</MenuTrigger><MenuPositioner><MenuContent ref="contentRef"><MenuViewport><MenuItem ref="itemRef" value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  render(Harness);
  expect(triggerRef.value?.$el).toBe(screen.getByRole('button', { name: 'Actions' }));
  expect(contentRef.value?.$el).toBe(screen.getByRole('menu'));
  expect(itemRef.value?.$el).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
});

test('preserves provider and item context composition', async () => {
  const MenuState = defineComponent({
    setup() {
      return { context: useMenuContext() };
    },
    template: '<output>{{ context.open ? "Open" : "Closed" }}</output>',
  });
  const ItemState = defineComponent({
    setup() {
      return { context: useMenuItemContext() };
    },
    template: '<span>{{ context.checked ? "Checked" : "Unchecked" }}</span>',
  });
  const ProviderMenu = defineComponent({
    components: { ...menuComponents, ItemState, MenuState },
    setup() {
      return { menu: useMenu({ defaultOpen: true }) };
    },
    template:
      '<MenuRootProvider :value="menu" :portalled="false"><MenuState /><MenuContext v-slot="context"><output>{{ context.open ? "Open slot" : "Closed slot" }}</output></MenuContext><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuCheckboxItem checked value="toolbar"><MenuItemIndicator /><MenuItemText>Show toolbar<ItemState /><MenuItemContext v-slot="item"><span>{{ item.checked ? "Checked slot" : "Unchecked slot" }}</span></MenuItemContext></MenuItemText></MenuCheckboxItem></MenuViewport></MenuContent></MenuPositioner></MenuRootProvider>',
  });
  render(ProviderMenu);
  expect(screen.getByText('Open')).toBeInTheDocument();
  expect(screen.getByText('Open slot')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText('Checked')).toBeInTheDocument();
    expect(screen.getByText('Checked slot')).toBeInTheDocument();
  });
});

test('reactively moves the Positioner into a portal', async () => {
  const Harness = defineComponent({
    components: menuComponents,
    setup() {
      const portalled = ref(false);
      return { portalled, toggle: () => (portalled.value = true) };
    },
    template:
      '<div><button type="button" @click="toggle">Portal</button><Menu default-open :portalled="portalled"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu></div>',
  });
  const { container } = render(Harness);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeInTheDocument();
  await fireEvent.click(screen.getByRole('button', { name: 'Portal' }));
  await waitFor(() => expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull());
  expect(screen.getByRole('menu')).toBeVisible();
});

test('supports a custom portal mount', async () => {
  const Harness = defineComponent({
    components: menuComponents,
    setup() {
      const portalTarget = ref<HTMLDivElement>();
      return { portalTarget, getPortal: () => portalTarget.value };
    },
    template:
      '<div><div ref="portalTarget" data-testid="portal"></div><Menu default-open :portal-ref="getPortal"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu></div>',
  });
  render(Harness);
  await waitFor(() =>
    expect(screen.getByTestId('portal')).toContainElement(screen.getByRole('menu')),
  );
});

test('supports controlled open state and forwards each Ark event once', async () => {
  const openChanges: boolean[] = [];
  const Harness = defineComponent({
    components: menuComponents,
    setup() {
      const open = ref(false);
      return {
        onOpenChange: (details: { open: boolean }) => openChanges.push(details.open),
        open,
      };
    },
    template:
      '<div><output>{{ open ? "Open" : "Closed" }}</output><Menu v-model:open="open" :portalled="false" @open-change="onOpenChange"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu></div>',
  });
  render(Harness);
  expect(screen.getByText('Closed')).toBeInTheDocument();
  await fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
  await waitFor(() => expect(screen.getByText('Open')).toBeInTheDocument());
  expect(openChanges).toEqual([true]);
});

test('forwards selection details from the menu root', async () => {
  const selections: string[] = [];
  const Harness = defineComponent({
    components: menuComponents,
    setup() {
      return { onSelect: (details: { value: string }) => selections.push(details.value) };
    },
    template:
      '<Menu default-open :portalled="false" @select="onSelect"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  render(Harness);
  const item = screen.getByRole('menuitem', { name: 'Edit' });
  await fireEvent.pointerMove(item);
  await fireEvent.pointerDown(item);
  await fireEvent.pointerUp(item);
  await fireEvent.click(item);
  await waitFor(() => expect(selections).toEqual(['edit']));
});

test('supports v-model:checked for checkbox items', async () => {
  const Harness = defineComponent({
    components: menuComponents,
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template:
      '<div><Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuCheckboxItem v-model:checked="checked" value="toolbar" :close-on-select="false"><MenuItemIndicator /><MenuItemText>Show toolbar</MenuItemText></MenuCheckboxItem></MenuViewport></MenuContent></MenuPositioner></Menu><output>{{ checked ? "Checked" : "Unchecked" }}</output></div>',
  });
  render(Harness);
  expect(screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' })).toHaveAttribute(
    'data-state',
    'unchecked',
  );
  await fireEvent.click(screen.getByRole('menuitemcheckbox', { name: 'Show toolbar' }));
  await waitFor(() => expect(screen.getByText('Checked')).toBeInTheDocument());
});

test('supports v-model for radio item groups', async () => {
  const Harness = defineComponent({
    components: menuComponents,
    setup() {
      const selected = ref('first');
      return { selected };
    },
    template:
      '<div><Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuRadioItemGroup v-model="selected"><MenuRadioItem value="first"><MenuItemText>First</MenuItemText></MenuRadioItem><MenuRadioItem value="second"><MenuItemText>Second</MenuItemText></MenuRadioItem></MenuRadioItemGroup></MenuViewport></MenuContent></MenuPositioner></Menu><output>{{ selected }}</output></div>',
  });
  render(Harness);
  await fireEvent.click(screen.getByRole('menuitemradio', { name: 'Second' }));
  await waitFor(() => expect(screen.getByText('second')).toBeInTheDocument());
});

test('opens a context menu on right click', async () => {
  const Harness = defineComponent({
    components: menuComponents,
    template:
      '<Menu :portalled="false"><MenuContextTrigger>Open context menu</MenuContextTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  render(Harness);
  await fireEvent.contextMenu(screen.getByRole('button', { name: 'Open context menu' }), {
    clientX: 24,
    clientY: 36,
  });
  await waitFor(() => expect(screen.getByRole('menu')).toBeVisible());
});

test('renders and hydrates an open menu through Vue SSR', async () => {
  const SsrMenu = defineComponent({
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  const markup = await renderToString(createSSRApp(SsrMenu));
  expect(markup).toContain('data-slot="menu-trigger"');
  expect(markup).toContain('data-slot="menu-content"');
  const container = document.createElement('div');
  container.innerHTML = markup;
  document.body.append(container);
  const app = createSSRApp(SsrMenu);
  app.mount(container);
  expect(container.querySelector('[data-slot="menu-trigger"]')).toBeInTheDocument();
  expect(container.querySelector('[role="menu"]')).toBeInTheDocument();
  app.unmount();
  container.remove();
});

test('keeps Tailwind recipes out of the public Menu entry point', () => {
  expect('menuContentVariants' in menuEntry).toBe(false);
  expect('menuPositionerVariants' in menuEntry).toBe(false);
  expect('menuItemStyles' in menuEntry).toBe(false);
});

test('lets consumer classes override defaults and keeps empty visual parts visible', () => {
  const Harness = defineComponent({
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger class="bg-primary">Actions</MenuTrigger><MenuPositioner><MenuContent class="py-0"><MenuArrow class="[--arrow-size:1rem]" /><MenuViewport><MenuItem value="edit" tone="destructive" class="px-0 text-primary">Edit</MenuItem><MenuRadioItemGroup model-value="radio"><MenuRadioItem value="radio" indicator="end" class="grid-cols-1"><MenuItemIndicator /><MenuItemText>Radio</MenuItemText></MenuRadioItem></MenuRadioItemGroup><MenuSeparator class="h-0.5" /></MenuViewport></MenuContent></MenuPositioner></Menu>',
  });
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  const content = screen.getByRole('menu');
  const item = screen.getByRole('menuitem', { name: 'Edit' });
  const radioItem = screen.getByRole('menuitemradio', { name: 'Radio' });
  const separator = content.querySelector('[data-slot="menu-separator"]');
  const arrow = content.querySelector('[data-slot="menu-arrow"]');
  expect(trigger).toHaveClass('bg-primary');
  expect(trigger).not.toHaveClass('bg-background');
  expect(content).toHaveClass('py-0');
  expect(content).not.toHaveClass('py-1');
  expect(item).toHaveClass('px-0');
  expect(item).not.toHaveClass('px-3');
  expect(item).toHaveClass('text-primary');
  expect(item).not.toHaveClass('text-destructive');
  expect(radioItem).toHaveClass('grid-cols-1');
  expect(radioItem).not.toHaveClass('grid-cols-[minmax(0,1fr)_0.75rem]');
  expect(separator).toHaveClass('h-0.5', 'bg-border');
  expect(arrow).toHaveClass('[--arrow-size:1rem]');
  expect(arrow?.firstElementChild).toHaveClass(
    '[border-block-start:1px_solid_var(--color-border)]',
  );
});