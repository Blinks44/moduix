import { Breadcrumbs } from '@moduix/solid/breadcrumbs';
import { Minus as SeparatorMarkIcon } from 'lucide-solid';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-custom-separator.module.css';

const items = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
  { label: 'Go Developer' },
] as const;

export default function BreadcrumbsSeparatorDemo() {
  return (
    <Breadcrumbs>
      <Breadcrumbs.Path
        items={items}
        separator={<SeparatorMarkIcon class={styles.separatorIcon} />}
      />
    </Breadcrumbs>
  );
}