import { Breadcrumbs } from '@moduix/react/breadcrumbs';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-long-current-label.module.css';

const currentPage =
  'Go lang developer to production team with cross-functional ownership and platform support';

export default function BreadcrumbsLongLabelDemo() {
  return (
    <Breadcrumbs className={styles.root}>
      <Breadcrumbs.Path
        links={[
          { href: '/', label: 'Home' },
          { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
        ]}
        page={<span title={currentPage}>{currentPage}</span>}
      />
    </Breadcrumbs>
  );
}