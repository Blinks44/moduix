import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/react/breadcrumbs';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-build-from-parts.module.css';

export default function BuildFromPartsBreadcrumbsDemo() {
  return (
    <Breadcrumbs>
      <BreadcrumbsList>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <ChevronRightIcon className={styles.separatorIcon} strokeWidth={3} />
        </BreadcrumbsSeparator>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/docs/breadcrumbs">Breadcrumbs</BreadcrumbsLink>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator>
          <ChevronRightIcon className={styles.separatorIcon} strokeWidth={3} />
        </BreadcrumbsSeparator>
        <BreadcrumbsItem>
          <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
        </BreadcrumbsItem>
      </BreadcrumbsList>
    </Breadcrumbs>
  );
}