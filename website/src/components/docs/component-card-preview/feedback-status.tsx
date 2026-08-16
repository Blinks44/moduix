import { Info, Image, Check, X } from 'lucide-react';
import styles from '../component-card-preview.module.css';
import { Drawing, Panel, Shape, Bar, Dot, Glyph } from './primitives';

function Alert() {
  return (
    <Drawing>
      <Panel height={42} width={128} x={24} y={27} />
      <Dot radius={10} tone="faint" x={43} y={48} />
      <Glyph icon={Info} size={12} tone="strong" x={37} y={42} />
      <Bar width={44} x={61} y={37} />
      <Bar tone="faint" width={72} x={61} y={48} />
      <Bar tone="faint" width={50} x={61} y={57} />
    </Drawing>
  );
}

function Empty() {
  return (
    <Drawing>
      <Panel height={70} width={120} x={28} y={13} />
      <Dot radius={13} tone="faint" x={88} y={31} />
      <Glyph icon={Image} size={14} x={81} y={24} />
      <Bar width={44} x={66} y={48} />
      <Bar tone="faint" width={66} x={55} y={58} />
      <Shape height={10} radius={5} tone="strong" width={40} x={68} y={67} />
    </Drawing>
  );
}

function ProgressCircular() {
  return (
    <Drawing>
      <circle
        className={styles.rule}
        cx={88}
        cy={48}
        data-tone="faint"
        fill="none"
        r={24}
        strokeWidth={7}
      />
      <circle
        className={styles.rule}
        cx={88}
        cy={48}
        data-tone="strong"
        fill="none"
        r={24}
        strokeDasharray="102 151"
        strokeWidth={7}
        transform="rotate(-90 88 48)"
      />
      <Bar width={24} x={76} y={46} />
    </Drawing>
  );
}

function ProgressLinear() {
  return (
    <Drawing>
      <Bar width={54} x={26} y={30} />
      <Bar tone="faint" width={28} x={122} y={30} />
      <Shape height={10} radius={5} tone="faint" width={124} x={26} y={43} />
      <Shape height={10} radius={5} tone="strong" width={58} x={26} y={43} />
      <Bar tone="faint" width={78} x={26} y={65} />
    </Drawing>
  );
}

function Skeleton() {
  return (
    <Drawing>
      <Panel height={50} width={132} x={22} y={23} />
      <Dot radius={13} tone="faint" x={46} y={48} />
      <Bar tone="faint" width={62} x={68} y={36} />
      <Bar tone="faint" width={74} x={68} y={48} />
      <Bar tone="faint" width={48} x={68} y={59} />
    </Drawing>
  );
}

function Spinner() {
  return (
    <Drawing>
      <circle
        className={styles.rule}
        cx={88}
        cy={48}
        data-tone="faint"
        fill="none"
        r={20}
        strokeWidth={6}
      />
      <circle
        className={styles.rule}
        cx={88}
        cy={48}
        data-tone="strong"
        fill="none"
        r={20}
        strokeDasharray="34 126"
        strokeWidth={6}
        transform="rotate(-90 88 48)"
      />
    </Drawing>
  );
}

function Toast() {
  return (
    <Drawing>
      <Panel dashed height={38} tone="faint" width={104} x={36} y={15} />
      <Panel dashed height={40} tone="faint" width={116} x={30} y={23} />
      <Panel dashed height={44} width={128} x={24} y={32} />
      <Dot radius={9} tone="faint" x={44} y={54} />
      <Glyph icon={Check} size={11} tone="strong" x={38.5} y={48.5} />
      <Bar width={38} x={61} y={46} />
      <Bar tone="faint" width={68} x={61} y={58} />
      <Glyph icon={X} size={10} tone="faint" x={134} y={39} />
    </Drawing>
  );
}

const feedbackStatusDrawings = {
  alert: Alert,
  empty: Empty,
  'progress-circular': ProgressCircular,
  'progress-linear': ProgressLinear,
  skeleton: Skeleton,
  spinner: Spinner,
  toast: Toast,
} as const;

export { feedbackStatusDrawings };