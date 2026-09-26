import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/solid/breadcrumbs';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-collapsed-path.module.css';

const collapsedItems = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/quick-start', label: 'Quick Start' },
  { href: '/docs/composition-patterns', label: 'Composition Patterns' },
] as const;

export default function BreadcrumbsCollapsedDemo() {
  return (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <Menu positioning={{ placement: 'bottom-start' }}>
            <MenuTrigger
              asChild={(props) => (
                <button
                  {...props()}
                  type="button"
                  aria-label="Show hidden path items"
                  class={styles.trigger}
                >
                  <BreadcrumbsEllipsis />
                </button>
              )}
            />
            <MenuPositioner>
              <MenuContent class={styles.content}>
                <MenuViewport>
                  {collapsedItems.map((item) => (
                    <MenuItem
                      asChild={(props) => <a {...props()} href={item.href} />}
                      value={item.href}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/docs/breadcrumbs">Breadcrumbs</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
}