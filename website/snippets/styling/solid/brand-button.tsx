import { Button, type ButtonRootProps } from '@moduix/solid/button';
import { clsx } from 'clsx';
import { splitProps } from 'solid-js';
import styles from '@/components/examples/styling/brand-button.module.css';

export function BrandButton(props: ButtonRootProps) {
  const [local, others] = splitProps(props, ['class']);

  return <Button {...others} class={clsx(styles.brand, local.class)} />;
}