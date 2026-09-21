import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/react/breadcrumbs';
import { Menu } from '@moduix/react/menu';
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
            <Menu.Trigger asChild>
              <button type="button" aria-label="Show hidden path items" className={styles.trigger}>
                <BreadcrumbsEllipsis />
              </button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content className={styles.content}>
                <Menu.Viewport>
                  {collapsedItems.map((item) => (
                    <Menu.Item key={item.href} value={item.href} asChild>
                      <a href={item.href}>{item.label}</a>
                    </Menu.Item>
                  ))}
                </Menu.Viewport>
              </Menu.Content>
            </Menu.Positioner>
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