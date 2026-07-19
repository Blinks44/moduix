//#region demo
import { Breadcrumbs, Menu } from '@moduix/react';

const collapsedItems = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/quick-start', label: 'Quick Start' },
  { href: '/docs/composition-patterns', label: 'Composition Patterns' },
] as const;

export function BreadcrumbsCollapsedDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Menu positioning={{ placement: 'bottom-start' }}>
            <Menu.Trigger asChild>
              <button
                type="button"
                aria-label="Show hidden path items"
                className="collapsed-menu-trigger"
              >
                <Breadcrumbs.Ellipsis />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className="collapsed-menu-content">
                {collapsedItems.map((item) => (
                  <Menu.Item key={item.href} value={item.href} asChild>
                    <a href={item.href}>{item.label}</a>
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/docs/breadcrumbs">Breadcrumbs</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Breadcrumbs.Page>Go Developer</Breadcrumbs.Page>
        </Breadcrumbs.Item>
      </Breadcrumbs.List>
    </Breadcrumbs>
  );
}
//#endregion