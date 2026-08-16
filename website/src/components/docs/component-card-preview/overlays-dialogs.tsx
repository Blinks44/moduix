import { Search, Check, Minus, X, Image, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import styles from '../component-card-preview.module.css';
import { Drawing, Panel, Shape, Bar, Dot, Rule, Glyph } from './primitives';

function CommandPalette() {
  return (
    <Drawing>
      <Panel height={76} width={126} x={25} y={10} />
      <Shape height={18} outline width={108} x={34} y={19} />
      <Glyph icon={Search} size={10} x={41} y={23} />
      <Bar tone="faint" width={40} x={57} y={26} />
      <Rule tone="faint" width={1} x1={34} x2={142} y1={44} y2={44} />
      <Shape height={14} radius={4} tone="strong" width={108} x={34} y={49} />
      <Glyph icon={Check} size={9} tone="inverse" x={40} y={51.5} />
      <Bar tone="inverse" width={42} x={56} y={54} />
      <Bar width={35} x={40} y={70} />
      <Bar tone="faint" width={18} x={116} y={70} />
    </Drawing>
  );
}

function Dialog() {
  return (
    <Drawing>
      <Shape height={82} radius={10} tone="faint" width={156} x={10} y={7} />
      <Panel height={62} width={106} x={35} y={17} />
      <Bar width={52} x={47} y={29} />
      <Bar tone="faint" width={78} x={47} y={40} />
      <Bar tone="faint" width={58} x={47} y={49} />
      <Shape height={14} radius={5} tone="faint" width={30} x={76} y={59} />
      <Shape height={14} radius={5} tone="strong" width={24} x={111} y={59} />
    </Drawing>
  );
}

function Drawer() {
  return (
    <Drawing>
      <Shape height={80} radius={10} tone="faint" width={104} x={36} y={8} />
      <Bar width={48} x={48} y={19} />
      <Bar tone="faint" width={70} x={48} y={28} />
      <Panel height={50} radius={10} width={104} x={36} y={38} />
      <Bar height={3} tone="faint" width={28} x={74} y={44} />
      <Bar width={44} x={48} y={55} />
      <Bar tone="faint" width={68} x={48} y={65} />
      <Shape height={9} radius={4} tone="strong" width={32} x={96} y={73} />
    </Drawing>
  );
}

function FloatingPanel() {
  return (
    <Drawing>
      <Shape height={58} radius={8} tone="faint" width={92} x={15} y={24} />
      <Bar tone="line" width={46} x={26} y={38} />
      <Bar tone="line" width={62} x={26} y={49} />
      <Panel height={70} width={104} x={57} y={9} />
      <Rule tone="faint" width={1} x1={57} x2={161} y1={30} y2={30} />
      <Bar width={34} x={68} y={18} />
      <Glyph icon={Minus} size={9} x={133} y={14} />
      <Glyph icon={X} size={9} x={145} y={14} />
      <Bar width={52} x={69} y={42} />
      <Bar tone="faint" width={76} x={69} y={53} />
      <Bar tone="faint" width={48} x={69} y={63} />
    </Drawing>
  );
}

function HoverCard() {
  return (
    <Drawing>
      <Panel dashed height={54} width={102} x={51} y={12} />
      <Dot radius={11} tone="faint" x={70} y={31} />
      <Bar width={34} x={88} y={24} />
      <Bar tone="faint" width={46} x={88} y={34} />
      <Bar tone="faint" width={70} x={63} y={50} />
      <Bar tone="strong" width={48} x={22} y={78} />
    </Drawing>
  );
}

function Lightbox() {
  return (
    <Drawing>
      <Shape height={82} radius={10} tone="strong" width={156} x={10} y={7} />
      <Shape height={56} radius={6} tone="inverse" width={86} x={45} y={20} />
      <Glyph icon={Image} size={22} tone="faint" x={77} y={37} />
      <Glyph icon={X} size={11} tone="inverse" x={145} y={15} />
      <Glyph icon={ChevronLeft} size={14} tone="inverse" x={21} y={42} />
      <Glyph icon={ChevronRight} size={14} tone="inverse" x={141} y={42} />
      <Bar tone="faint" width={42} x={67} y={64} />
    </Drawing>
  );
}

function Popover() {
  return (
    <Drawing>
      <Panel dashed height={46} width={106} x={35} y={10} />
      <Bar width={42} x={47} y={21} />
      <Bar tone="faint" width={78} x={47} y={33} />
      <Bar tone="faint" width={56} x={47} y={43} />
      <path className={styles.panel} d="M82 56 88 63 94 56Z" />
      <Shape height={16} radius={6} tone="strong" width={52} x={62} y={66} />
      <Bar tone="inverse" width={28} x={74} y={72} />
    </Drawing>
  );
}

function Tooltip() {
  return (
    <Drawing>
      <Shape height={24} radius={6} tone="strong" width={88} x={44} y={15} />
      <Bar tone="inverse" width={56} x={60} y={25} />
      <path className={styles.shape} d="M82 39 88 46 94 39Z" data-tone="strong" />
      <Shape height={24} outline width={46} x={65} y={57} />
      <Glyph icon={Info} size={12} x={82} y={63} />
    </Drawing>
  );
}

function Tour() {
  return (
    <Drawing>
      <Panel height={76} width={150} x={13} y={10} />
      <Shape height={12} radius={4} tone="faint" width={54} x={24} y={22} />
      <Shape height={34} radius={6} tone="strong" width={42} x={24} y={43} />
      <Bar tone="inverse" width={22} x={34} y={57} />
      <Panel dashed height={48} width={86} x={70} y={29} />
      <Bar width={38} x={81} y={40} />
      <Bar tone="faint" width={62} x={81} y={50} />
      <Dot radius={2} tone="strong" x={83} y={65} />
      <Dot radius={2} tone="faint" x={90} y={65} />
      <Dot radius={2} tone="faint" x={97} y={65} />
      <Shape height={10} radius={4} tone="strong" width={28} x={118} y={60} />
    </Drawing>
  );
}

const overlaysDialogsDrawings = {
  'command-palette': CommandPalette,
  dialog: Dialog,
  drawer: Drawer,
  'floating-panel': FloatingPanel,
  'hover-card': HoverCard,
  lightbox: Lightbox,
  popover: Popover,
  tooltip: Tooltip,
  tour: Tour,
} as const;

export { overlaysDialogsDrawings };