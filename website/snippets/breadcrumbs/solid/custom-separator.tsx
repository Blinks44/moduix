import { Breadcrumbs, BreadcrumbsPath } from '@moduix/solid/breadcrumbs';
import { Minus as SeparatorMarkIcon } from 'lucide-solid';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-custom-separator.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
] as const;

export default function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs>
      <BreadcrumbsPath
        links={links}
        page="Go Developer"
        separator={<SeparatorMarkIcon class={styles.separatorIcon} />}
      />
    </Breadcrumbs>
  );
}