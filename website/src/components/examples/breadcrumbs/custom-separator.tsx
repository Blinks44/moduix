import { Breadcrumbs } from '@moduix/react/breadcrumbs';
import { Minus as SeparatorMarkIcon } from 'lucide-react';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-custom-separator.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

export default function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Path
        links={links}
        page="Go Developer"
        separator={<SeparatorMarkIcon className={styles.separatorIcon} />}
      />
    </Breadcrumbs>
  );
}