import { Breadcrumbs, BreadcrumbsPath } from '@moduix/solid/breadcrumbs';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-long-current-label.module.css';

const currentPage =
  'Go lang developer to production team with cross-functional ownership and platform support';

export default function BreadcrumbsLongLabelDemo() {
  return (
    <Breadcrumbs class={styles.root}>
      <BreadcrumbsPath
        links={[
          { href: '/', label: 'Home' },
          { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
        ]}
        page={<span title={currentPage}>{currentPage}</span>}
      />
    </Breadcrumbs>
  );
}