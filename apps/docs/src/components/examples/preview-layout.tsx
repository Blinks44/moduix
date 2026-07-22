import type { CSSProperties, ReactNode } from 'react';
import styles from './preview-layout.module.css';

const toCssLength = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

export function PreviewLayout({
  align = 'center',
  alignItems,
  children,
  gap,
  justifyContent,
  maxWidth,
  textAlign,
  width,
}: {
  align?: 'start' | 'center' | 'end';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  children: ReactNode;
  gap?: number | string;
  justifyContent?: 'start' | 'center' | 'end';
  maxWidth?: number | string;
  textAlign?: 'start' | 'center' | 'end';
  width?: 'content' | number | string;
}) {
  const style = {
    '--preview-layout-gap': toCssLength(gap),
    '--preview-layout-max-width': toCssLength(maxWidth),
    '--preview-layout-width': width === 'content' ? undefined : toCssLength(width),
  } as CSSProperties;

  return (
    <div
      className={styles.root}
      data-align={align}
      data-align-items={alignItems}
      data-justify-content={justifyContent}
      data-text-align={textAlign}
      data-width={width === 'content' ? 'content' : width ? 'custom' : undefined}
      style={style}
    >
      {children}
    </div>
  );
}