import { Button } from '@moduix/react/button';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import styles from '@/components/examples/styling/brand-button.module.css';

export function BrandButton({ className, ...props }: ComponentProps<typeof Button>) {
  return <Button {...props} className={clsx(styles.brand, className)} />;
}