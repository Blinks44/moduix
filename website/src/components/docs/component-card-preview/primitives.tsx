import type { ComponentType, ReactNode, SVGProps } from 'react';
import styles from '../component-card-preview.module.css';

type Tone = 'line' | 'faint' | 'strong' | 'inverse';
type GlyphIcon = ComponentType<SVGProps<SVGSVGElement>>;

export function Drawing({ children }: { children: ReactNode }) {
  return (
    <svg className={styles.drawing} viewBox="0 0 176 96" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

export function Panel({
  x,
  y,
  width,
  height,
  radius = 8,
  dashed = false,
  tone = 'line',
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  dashed?: boolean;
  tone?: Tone;
}) {
  return (
    <rect
      className={`${styles.panel} ${dashed ? styles.dashed : ''}`}
      data-tone={tone}
      height={height}
      rx={radius}
      width={width}
      x={x}
      y={y}
    />
  );
}

export function Shape({
  x,
  y,
  width,
  height,
  radius = 4,
  tone = 'line',
  outline = false,
  dashed = false,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  tone?: Tone;
  outline?: boolean;
  dashed?: boolean;
}) {
  return (
    <rect
      className={`${styles.shape} ${outline ? styles.outline : ''} ${dashed ? styles.dashed : ''}`}
      data-tone={tone}
      height={height}
      rx={radius}
      width={width}
      x={x}
      y={y}
    />
  );
}

export function Bar({
  x,
  y,
  width = 44,
  height = 4,
  tone = 'line',
}: {
  x: number;
  y: number;
  width?: number;
  height?: number;
  tone?: Tone;
}) {
  return <Shape height={height} radius={height / 2} tone={tone} width={width} x={x} y={y} />;
}

export function Dot({
  x,
  y,
  radius = 4,
  tone = 'line',
  outline = false,
}: {
  x: number;
  y: number;
  radius?: number;
  tone?: Tone;
  outline?: boolean;
}) {
  return (
    <circle
      className={`${styles.shape} ${outline ? styles.outline : ''}`}
      cx={x}
      cy={y}
      data-tone={tone}
      r={radius}
    />
  );
}

export function Rule({
  x1,
  y1,
  x2,
  y2,
  tone = 'line',
  width = 2,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  tone?: Tone;
  width?: number;
  dashed?: boolean;
}) {
  return (
    <line
      className={`${styles.rule} ${dashed ? styles.dashed : ''}`}
      data-tone={tone}
      strokeWidth={width}
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
    />
  );
}

export function Glyph({
  icon: Icon,
  x,
  y,
  size = 12,
  tone = 'line',
  filled = false,
}: {
  icon: GlyphIcon;
  x: number;
  y: number;
  size?: number;
  tone?: Tone;
  filled?: boolean;
}) {
  return (
    <Icon
      className={styles.glyph}
      data-filled={filled || undefined}
      data-tone={tone}
      height={size}
      width={size}
      x={x}
      y={y}
    />
  );
}

export function Label({
  x,
  y,
  children,
  textAnchor = 'start',
  dominantBaseline = 'auto',
  fontSize,
  fontWeight,
  tone = 'line',
}: {
  x: number;
  y: number;
  children: ReactNode;
  textAnchor?: 'start' | 'middle' | 'end';
  dominantBaseline?: 'auto' | 'middle';
  fontSize?: number;
  fontWeight?: number;
  tone?: Tone;
}) {
  return (
    <text
      className={styles.label}
      data-tone={tone}
      dominantBaseline={dominantBaseline}
      style={{ fontSize, fontWeight }}
      textAnchor={textAnchor}
      x={x}
      y={y}
    >
      {children}
    </text>
  );
}