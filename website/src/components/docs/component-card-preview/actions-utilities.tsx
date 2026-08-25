import { ChevronLeft, ChevronRight, Clipboard, X, ChevronDown } from 'lucide-react';
import styles from '../component-card-preview.module.css';
import { Drawing, Panel, Shape, Bar, Dot, Rule, Glyph } from './primitives';

function AngleSlider() {
  return (
    <Drawing>
      <circle
        className={styles.rule}
        cx={88}
        cy={48}
        data-tone="faint"
        fill="none"
        r={25}
        strokeWidth={7}
      />
      <circle
        className={styles.rule}
        cx={88}
        cy={48}
        data-tone="strong"
        fill="none"
        r={25}
        strokeDasharray="82 157"
        strokeWidth={7}
        transform="rotate(-90 88 48)"
      />
      <Dot outline radius={6} x={108} y={63} />
      <Dot radius={4.5} tone="strong" x={108} y={63} />
      <Rule tone="faint" width={2} x1={88} x2={104} y1={48} y2={60} />
    </Drawing>
  );
}

function ButtonDrawing() {
  return (
    <Drawing>
      <Shape height={30} radius={8} tone="strong" width={92} x={42} y={33} />
      <Bar tone="inverse" width={48} x={64} y={46} />
    </Drawing>
  );
}

function Carousel() {
  return (
    <Drawing>
      <Panel height={62} width={132} x={22} y={14} />
      <Shape height={44} radius={6} tone="faint" width={48} x={36} y={23} />
      <Shape height={44} radius={6} outline width={48} x={92} y={23} />
      <Glyph icon={ChevronLeft} size={10} x={14} y={43} />
      <Glyph icon={ChevronRight} size={10} x={152} y={43} />
      <Dot radius={2.5} tone="strong" x={82} y={84} />
      <Dot radius={2.5} tone="faint" x={90} y={84} />
      <Dot radius={2.5} tone="faint" x={98} y={84} />
    </Drawing>
  );
}

function ClipboardDrawing() {
  return (
    <Drawing>
      <Panel height={34} width={132} x={22} y={31} />
      <Bar tone="faint" width={62} x={35} y={46} />
      <Shape height={26} radius={6} tone="strong" width={30} x={120} y={35} />
      <Glyph icon={Clipboard} size={12} tone="inverse" x={129} y={42} />
    </Drawing>
  );
}

function CloseButton() {
  return (
    <Drawing>
      <Shape height={42} outline radius={10} width={42} x={67} y={27} />
      <Glyph icon={X} size={18} x={79} y={39} />
    </Drawing>
  );
}

function Collapsible() {
  return (
    <Drawing>
      <Panel height={70} width={120} x={28} y={13} />
      <Bar width={48} x={41} y={28} />
      <Glyph icon={ChevronDown} size={12} x={126} y={22} />
      <Rule tone="faint" width={1} x1={28} x2={148} y1={42} y2={42} />
      <Bar tone="faint" width={84} x={41} y={54} />
      <Bar tone="faint" width={64} x={41} y={65} />
    </Drawing>
  );
}

function SplitButton() {
  return (
    <Drawing>
      <Shape height={30} radius={8} tone="strong" width={104} x={36} y={33} />
      <Bar tone="inverse" width={44} x={51} y={46} />
      <Rule tone="inverse" width={1} x1={108} x2={108} y1={36} y2={60} />
      <Glyph icon={ChevronDown} size={11} tone="inverse" x={119} y={42} />
    </Drawing>
  );
}

const actionsUtilitiesDrawings = {
  'angle-slider': AngleSlider,
  button: ButtonDrawing,
  carousel: Carousel,
  clipboard: ClipboardDrawing,
  'close-button': CloseButton,
  collapsible: Collapsible,
  'split-button': SplitButton,
} as const;

export { actionsUtilitiesDrawings };