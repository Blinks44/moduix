import { Breadcrumbs } from '@moduix/solid/breadcrumbs';
import { Menu } from '@moduix/solid/menu';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-collapsed-path.module.css';

const collapsedItems = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/quick-start', label: 'Quick Start' },
  { href: '/docs/composition-patterns', label: 'Composition Patterns' },
] as const;

export default function BreadcrumbsCollapsedDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.List>
        <Breadcrumbs.Item>
          <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
        </Breadcrumbs.Item>
        <Breadcrumbs.Separator />
        <Breadcrumbs.Item>
          <Menu positioning={{ placement: 'bottom-start' }}>
            <Menu.Trigger
              asChild={(props) => (
                <button
                  {...props()}
                  type="button"
                  aria-label="Show hidden path items"
                  class={styles.trigger}
                >
                  <Breadcrumbs.Ellipsis />
                </button>
              )}
            />
            <Menu.Positioner>
              <Menu.Content class={styles.content}>
                <Menu.Viewport>
                  {collapsedItems.map((item) => (
                    <Menu.Item
                      asChild={(props) => <a {...props()} href={item.href} />}
                      value={item.href}
                    >
                      {item.label}
                    </Menu.Item>
                  ))}
                </Menu.Viewport>
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