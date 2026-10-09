import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/vue';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, nextTick, ref } from 'vue';
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
  MenuTriggerItemIcon,
  MenuViewport,
  useMenu,
  useMenuContext,
  useMenuItemContext,
} from '../src';
import styles from '../src/components/menu/Menu.module.css';
import TestSsrMenu from './fixtures/TestMenu.vue';

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
  MenuTriggerItemIcon,
  MenuViewport,
};

const TestMenu = {
  components: menuComponents,
  template:
    '<Menu default-open><MenuTrigger as-child><button type="button">Actions</button></MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem><MenuCheckboxItem :checked="false" value="toolbar"><MenuItemIndicator /><MenuItemText>Show toolbar</MenuItemText></MenuCheckboxItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
};

test('returns focus to the trigger after escape', async () => {
  const { container } = render(TestMenu);
  expect(container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  const menu = page.getByRole('menu');
  await expect.element(menu).toBeVisible();

  await expect.element(menu).toBeFocused();
  await menu.press('Escape');
  await expect.element(page.getByRole('button', { name: 'Actions' })).toBeFocused();
  await expect.element(menu).toHaveCount(0);
});

test('preserves a custom content host with asChild', async () => {
  const Harness = {
    components: menuComponents,
    template:
      '<Menu default-open><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent as-child><section aria-label="Actions"><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></section></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);
  await expect.element(page.getByRole('menu')).toHaveJSProperty('tagName', 'SECTION');
});

test.each([undefined, false, true])(
  'preserves RootProvider portal defaults with portalled=%s',
  async (portalled) => {
    const Harness = {
      components: menuComponents,
      setup: () => ({
        menu: useMenu({ defaultOpen: true }),
        providerProps: portalled === undefined ? {} : { portalled },
      }),
      template: `
      <MenuRootProvider :value="menu" v-bind="providerProps">
        <MenuTrigger>Provider actions</MenuTrigger>
        <MenuPositioner><MenuContent>
          <MenuItem value="edit">Edit</MenuItem>
        </MenuContent></MenuPositioner>
      </MenuRootProvider>
    `,
    };

    const { container } = render(Harness);
    const positioner = container.querySelector('[data-slot="menu-positioner"]');
    if (portalled === false) expect(positioner?.isConnected ?? false).toBe(true);
    else expect(positioner).toBeNull();
    await expect.element(page.getByRole('menu')).toBeVisible();
  },
);

test('supports inline Positioner rendering', async () => {
  const Harness = {
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  const { container } = render(Harness);
  expect(container.querySelector('[data-slot="menu-positioner"]')?.isConnected ?? false).toBe(true);
});

test('opens a nested menu from its trigger item', async () => {
  const NestedMenu = {
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger as-child><button type="button">Song</button></MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="add-library">Add to Library</MenuItem><Menu :portalled="false"><MenuTriggerItem>Add to Playlist</MenuTriggerItem><MenuPositioner><MenuContent><MenuViewport><MenuItem value="get-up">Get Up!</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(NestedMenu);

  await page.getByRole('menuitem', { name: 'Add to Playlist' }).click();
  await expect.element(page.getByRole('menuitem', { name: 'Get Up!' })).toBeVisible();
});

test('sizes the default submenu chevron to its icon wrapper', async () => {
  const Harness = {
    components: { MenuTriggerItemIcon },
    template: '<MenuTriggerItemIcon />',
  };
  const { container } = render(Harness);
  const icon = container.querySelector('[data-slot="menu-trigger-item-icon"] svg');

  expect(icon?.classList.contains(styles.iconSvg)).toBe(true);
});

test('preserves custom context trigger styling', async () => {
  const Harness = {
    components: menuComponents,
    template:
      '<Menu default-open><MenuContextTrigger as-child><button type="button">Open context menu</button></MenuContextTrigger><MenuPositioner><MenuContent><MenuArrow /><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Open context menu' });
  expect(trigger.className).toBe('');

  await expect.element(page.getByRole('menu')).toBeVisible();
  await expect
    .element(page.getByRole('menu').locator(':scope > :first-child'))
    .toHaveAttribute('data-slot', 'menu-arrow');
});

test('preserves Vue component refs through ordinary menu parts', async () => {
  const triggerRef = ref<ComponentPublicInstance>();
  const contentRef = ref<ComponentPublicInstance>();
  const itemRef = ref<ComponentPublicInstance>();
  const Harness = {
    components: menuComponents,
    setup() {
      return { contentRef, itemRef, triggerRef };
    },
    template:
      '<Menu default-open :portalled="false"><MenuTrigger ref="triggerRef">Actions</MenuTrigger><MenuPositioner><MenuContent ref="contentRef"><MenuViewport><MenuItem ref="itemRef" value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);
  expect(triggerRef.value?.$el).toBe(screen.getByRole('button', { name: 'Actions' }));
  expect(contentRef.value?.$el).toBe(screen.getByRole('menu'));
  expect(itemRef.value?.$el).toBe(screen.getByRole('menuitem', { name: 'Edit' }));
  const viewport = page.locator('[data-slot="menu-viewport"]');
  await expect.element(viewport).toHaveAttribute('data-scope', 'menu');
  await expect.element(viewport).toHaveAttribute('data-part', 'viewport');
  await expect.element(viewport).toHaveCSS('overflow', 'auto');
});

test('preserves provider and item context composition', async () => {
  const MenuState = {
    setup() {
      return { context: useMenuContext() };
    },
    template: '<output>{{ context.open ? "Open" : "Closed" }}</output>',
  };
  const ItemState = {
    setup() {
      return { context: useMenuItemContext() };
    },
    template: '<span>{{ context.checked ? "Checked" : "Unchecked" }}</span>',
  };
  const ProviderMenu = {
    components: { ...menuComponents, ItemState, MenuState },
    setup() {
      return { menu: useMenu({ defaultOpen: true }) };
    },
    template:
      '<MenuRootProvider :value="menu" :portalled="false"><MenuState /><MenuContext v-slot="context"><output>{{ context.open ? "Open slot" : "Closed slot" }}</output></MenuContext><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuCheckboxItem checked value="toolbar"><MenuItemIndicator /><MenuItemText>Show toolbar<ItemState /><MenuItemContext v-slot="item"><span>{{ item.checked ? "Checked slot" : "Unchecked slot" }}</span></MenuItemContext></MenuItemText></MenuCheckboxItem></MenuViewport></MenuContent></MenuPositioner></MenuRootProvider>',
  };
  render(ProviderMenu);
  await expect.element(page.getByText('Open', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Open slot')).toBeAttached();
  await expect.element(page.getByText('Checked', { exact: true })).toBeAttached();
  await expect.element(page.getByText('Checked slot')).toBeAttached();
  await expect.element(page.getByRole('menuitemcheckbox')).toHaveAttribute('data-state', 'checked');
});

test('reactively moves the Positioner into a portal', async () => {
  const portalled = ref(false);
  const Harness = {
    components: menuComponents,
    setup: () => ({ portalled }),
    template:
      '<Menu default-open :portalled="portalled"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  const { container } = render(Harness);
  expect(container.querySelector('[data-slot="menu-positioner"]')?.isConnected ?? false).toBe(true);
  portalled.value = true;
  await nextTick();
  await expect.poll(() => container.querySelector('[data-slot="menu-positioner"]')).toBeNull();
  await expect.element(page.getByRole('menu')).toBeVisible();
});

test('supports a custom portal mount', async () => {
  const Harness = {
    components: menuComponents,
    setup() {
      const portalTarget = ref<HTMLDivElement>();
      return { portalTarget, getPortal: () => portalTarget.value };
    },
    template:
      '<div><div ref="portalTarget" data-testid="portal"></div><Menu default-open :portal-ref="getPortal"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu></div>',
  };
  render(Harness);
  await expect.element(page.getByTestId('portal').getByRole('menu')).toBeAttached();
});

test('supports controlled open state and forwards each Ark event once', async () => {
  const openChanges: boolean[] = [];
  const Harness = {
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
  };
  render(Harness);
  await expect.element(page.getByText('Closed')).toBeAttached();
  await page.getByRole('button', { name: 'Actions' }).click();
  await expect.element(page.getByText('Open', { exact: true })).toBeAttached();
  expect(openChanges).toEqual([true]);
});

test('forwards selection details from the menu root', async () => {
  const selections: string[] = [];
  const Harness = {
    components: menuComponents,
    setup() {
      return { onSelect: (details: { value: string }) => selections.push(details.value) };
    },
    template:
      '<Menu default-open :portalled="false" @select="onSelect"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);

  await page.getByRole('menuitem', { name: 'Edit' }).click();
  await expect.poll(() => selections).toEqual(['edit']);
});

test('supports v-model:checked for checkbox items', async () => {
  const Harness = {
    components: menuComponents,
    setup() {
      const checked = ref(false);
      return { checked };
    },
    template:
      '<div><Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuCheckboxItem v-model:checked="checked" value="toolbar" :close-on-select="false"><MenuItemIndicator /><MenuItemText>Show toolbar</MenuItemText></MenuCheckboxItem></MenuViewport></MenuContent></MenuPositioner></Menu><output>{{ checked ? "Checked" : "Unchecked" }}</output></div>',
  };
  render(Harness);
  await expect
    .element(page.getByRole('menuitemcheckbox', { name: 'Show toolbar' }))
    .toHaveAttribute('data-state', 'unchecked');
  await page.getByRole('menuitemcheckbox', { name: 'Show toolbar' }).click();
  await expect.element(page.getByText('Checked', { exact: true })).toBeAttached();
});

test('supports v-model for radio item groups', async () => {
  const Harness = {
    components: menuComponents,
    setup() {
      const selected = ref('first');
      return { selected };
    },
    template:
      '<div><Menu default-open :portalled="false"><MenuTrigger>Actions</MenuTrigger><MenuPositioner><MenuContent><MenuViewport><MenuRadioItemGroup v-model="selected"><MenuRadioItem value="first"><MenuItemText>First</MenuItemText></MenuRadioItem><MenuRadioItem value="second"><MenuItemText>Second</MenuItemText></MenuRadioItem></MenuRadioItemGroup></MenuViewport></MenuContent></MenuPositioner></Menu><output>{{ selected }}</output></div>',
  };
  render(Harness);
  await page.getByRole('menuitemradio', { name: 'Second' }).click();
  await expect.element(page.getByText('second', { exact: true })).toBeAttached();
});

test('opens a context menu on right click', async () => {
  const Harness = {
    components: menuComponents,
    template:
      '<Menu :portalled="false"><MenuContextTrigger>Open context menu</MenuContextTrigger><MenuPositioner><MenuContent><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);
  await page.getByRole('button', { name: 'Open context menu' }).click({ button: 'right' });
  await expect.element(page.getByRole('menu')).toBeVisible();
});

test('applies consumer classes alongside CSS Module defaults', async () => {
  const Harness = {
    components: menuComponents,
    template:
      '<Menu default-open :portalled="false"><MenuTrigger class="consumer-trigger">Actions</MenuTrigger><MenuPositioner><MenuContent class="consumer-content"><MenuViewport><MenuItem class="consumer-item" value="edit">Edit</MenuItem></MenuViewport></MenuContent></MenuPositioner></Menu>',
  };
  render(Harness);
  const trigger = screen.getByRole('button', { name: 'Actions' });
  const content = screen.getByRole('menu');
  const item = screen.getByRole('menuitem', { name: 'Edit' });
  expect(trigger?.classList.contains('consumer-trigger')).toBe(true);
  expect(trigger.classList.length).toBeGreaterThan(1);
  expect(content?.classList.contains('consumer-content')).toBe(true);
  expect(content.classList.length).toBeGreaterThan(1);
  expect(item?.classList.contains('consumer-item')).toBe(true);
  expect(item.classList.length).toBeGreaterThan(1);
});
test('hydrates server hosts and preserves Escape dismissal without mismatches', async () => {
  const html = await renderToString(createSSRApp(TestSsrMenu));
  const host = document.createElement('div');
  host.innerHTML = html;
  const serverNodes = [
    ...host.querySelectorAll(
      '[data-slot="menu-trigger"], [data-slot="menu-content"], [data-slot="menu-item"]',
    ),
  ];
  const ids = serverNodes.map((node) => node.id);
  document.body.append(host);
  const warn = rs.spyOn(console, 'warn');
  const error = rs.spyOn(console, 'error');
  const app = createSSRApp(TestSsrMenu);
  try {
    app.mount(host);
    await nextTick();
    const hydratedNodes = [
      ...host.querySelectorAll(
        '[data-slot="menu-trigger"], [data-slot="menu-content"], [data-slot="menu-item"]',
      ),
    ];
    expect(hydratedNodes).toHaveLength(serverNodes.length);
    for (const [index, node] of hydratedNodes.entries()) {
      expect(node).toBe(serverNodes[index]);
      expect(node.id).toBe(ids[index]);
    }
    await expect.element(page.getByRole('menu')).toBeFocused();
    await page.getByRole('menu').press('Escape');
    await expect.element(page.getByRole('menu')).toHaveCount(0);
    await expect.element(page.getByRole('button', { name: 'Actions' })).toBeFocused();
    expect(warn).not.toHaveBeenCalled();
    expect(error).not.toHaveBeenCalled();
  } finally {
    app.unmount();
    host.remove();
    warn.mockRestore();
    error.mockRestore();
  }
});