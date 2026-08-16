import { ChevronDown, ChevronRight, Ellipsis, ChevronLeft } from 'lucide-react';
import { Drawing, Panel, Shape, Bar, Dot, Rule, Glyph, Label } from './primitives';

function Accordion() {
  return (
    <Drawing>
      <Panel height={74} width={128} x={24} y={11} />
      <Rule tone="faint" x1={24} x2={152} y1={40} y2={40} />
      <Rule tone="faint" x1={24} x2={152} y1={63} y2={63} />
      <Glyph icon={ChevronDown} size={10} x={33} y={20} />
      <Bar width={54} x={48} y={23} />
      <Bar height={3} tone="faint" width={40} x={48} y={32} />
      <Glyph icon={ChevronRight} size={10} x={33} y={47} />
      <Bar width={38} x={48} y={50} />
      <Glyph icon={ChevronRight} size={10} x={33} y={70} />
      <Bar width={54} x={48} y={73} />
    </Drawing>
  );
}

function AspectRatio() {
  return (
    <Drawing>
      <Panel height={64} width={114} x={31} y={16} />
      <Label x={79} y={51}>
        16:9
      </Label>
    </Drawing>
  );
}

function Bleed() {
  return (
    <Drawing>
      <Panel height={70} width={78} x={49} y={13} />
      <Bar width={28} x={61} y={25} />
      <Shape dashed height={20} radius={5} tone="faint" width={116} x={30} y={39} />
      <Bar tone="faint" width={50} x={61} y={69} />
    </Drawing>
  );
}

function Breadcrumbs() {
  return (
    <Drawing>
      <Panel height={30} width={142} x={17} y={33} />
      {[28, 76, 122].map((x, index) => (
        <g key={x}>
          <Bar width={index === 1 ? 25 : 30} x={x} y={46} />
          {index < 2 ? <Glyph icon={ChevronRight} size={8} x={x + 34} y={43} /> : null}
        </g>
      ))}
    </Drawing>
  );
}

function ContainerDrawing() {
  return (
    <Drawing>
      <Panel height={68} width={126} x={25} y={14} />
      <Bar width={52} x={39} y={27} />
      <Bar width={38} x={39} y={36} />
      <Shape height={20} radius={5} tone="faint" width={100} x={38} y={49} />
      <Bar width={28} x={74} y={57} />
    </Drawing>
  );
}

function MenuDrawing() {
  return (
    <Drawing>
      <Panel height={30} radius={7} width={30} x={25} y={54} />
      <Glyph icon={Ellipsis} size={13} x={33.5} y={62.5} />
      <Panel dashed height={50} width={92} x={61} y={20} />
      {[33, 52].map((y, index) => (
        <g key={y}>
          <Shape height={11} radius={3} tone="faint" width={11} x={70} y={y - 4} />
          <Bar width={index === 0 ? 34 : 48} x={89} y={y} />
        </g>
      ))}
    </Drawing>
  );
}

function Pagination() {
  return (
    <Drawing>
      <Panel height={30} radius={7} width={30} x={31} y={33} />
      <Glyph icon={ChevronLeft} size={12} x={40} y={42} />
      {[76, 88, 100].map((x, index) => (
        <Dot
          key={x}
          radius={index === 1 ? 4 : 3}
          tone={index === 1 ? 'strong' : 'line'}
          x={x}
          y={48}
        />
      ))}
      <Panel height={30} radius={7} width={30} x={115} y={33} />
      <Glyph icon={ChevronRight} size={12} x={124} y={42} />
    </Drawing>
  );
}

function ScrollArea() {
  return (
    <Drawing>
      <Panel height={70} width={112} x={32} y={13} />
      <Bar width={52} x={44} y={27} />
      <Bar width={38} x={44} y={38} />
      <Bar tone="faint" width={54} x={44} y={52} />
      <Bar tone="faint" width={28} x={44} y={65} />
      <Shape height={52} radius={2} tone="faint" width={4} x={133} y={22} />
      <Shape height={22} radius={2} width={4} x={133} y={25} />
    </Drawing>
  );
}

function SeparatorDrawing() {
  return (
    <Drawing>
      <Panel height={68} width={126} x={25} y={14} />
      <Bar width={52} x={38} y={27} />
      <Bar tone="faint" width={38} x={38} y={36} />
      <Rule tone="faint" x1={38} x2={138} y1={49} y2={49} />
      <Bar tone="faint" width={24} x={38} y={62} />
      <Rule tone="faint" x1={72} x2={72} y1={57} y2={69} />
      <Bar tone="faint" width={30} x={82} y={62} />
    </Drawing>
  );
}

function Sidebar() {
  return (
    <Drawing>
      <Panel height={70} width={128} x={24} y={13} />
      <Shape height={68} radius={7} tone="faint" width={50} x={25} y={14} />
      <Rule tone="line" dashed x1={75} x2={75} y1={16} y2={80} />
      <Bar width={26} x={35} y={26} />
      <Bar tone="faint" width={32} x={35} y={44} />
      <Bar tone="faint" width={24} x={35} y={54} />
      <Bar width={34} x={35} y={69} />
      <Shape height={48} radius={5} outline tone="line" width={58} x={85} y={24} />
    </Drawing>
  );
}

function SimpleGrid() {
  return (
    <Drawing>
      {Array.from({ length: 6 }, (_, index) => (
        <Panel
          key={index}
          height={26}
          radius={6}
          width={34}
          x={31 + (index % 3) * 40}
          y={20 + Math.floor(index / 3) * 34}
        />
      ))}
    </Drawing>
  );
}

function Splitter() {
  return (
    <Drawing>
      <Panel height={64} width={61} x={24} y={16} />
      <Panel height={64} width={61} x={91} y={16} />
      <Label x={52} y={51}>
        A
      </Label>
      <Label x={119} y={51}>
        B
      </Label>
      <Shape height={26} radius={2} width={4} x={86} y={35} />
    </Drawing>
  );
}

function StackDrawing() {
  return (
    <Drawing>
      {[18, 39, 60].map((y, index) => (
        <g key={y}>
          <Panel height={18} radius={6} width={120} x={28} y={y} />
          <Shape height={7} radius={2} width={7} x={36} y={y + 5.5} />
          <Bar
            tone={index === 2 ? 'faint' : 'line'}
            width={index === 1 ? 52 : 38}
            x={50}
            y={y + 7}
          />
        </g>
      ))}
    </Drawing>
  );
}

function StepsDrawing() {
  return (
    <Drawing>
      <Panel height={32} width={132} x={22} y={32} />
      <Rule tone="strong" width={4} x1={42} x2={88} y1={48} y2={48} />
      <Rule width={4} x1={88} x2={134} y1={48} y2={48} />
      <Dot radius={8} tone="strong" x={38} y={48} />
      <Dot radius={8} tone="strong" x={88} y={48} />
      <Dot outline radius={8} tone="line" x={138} y={48} />
    </Drawing>
  );
}

function TabsDrawing() {
  return (
    <Drawing>
      <Panel height={32} width={128} x={24} y={20} />
      <Shape height={26} radius={6} tone="strong" width={40} x={27} y={23} />
      <Bar tone="inverse" width={24} x={35} y={34} />
      <Bar width={24} x={77} y={34} />
      <Bar width={24} x={119} y={34} />
      <Bar width={54} x={28} y={63} />
      <Bar tone="faint" width={40} x={28} y={72} />
    </Drawing>
  );
}

function TreeView() {
  return (
    <Drawing>
      <Panel height={68} width={120} x={28} y={14} />
      {[29, 48, 67].map((y, index) => (
        <g key={y}>
          <Glyph icon={ChevronRight} size={9} x={index === 0 ? 38 : 52} y={y - 4} />
          <Shape height={8} radius={2} width={10} x={index === 0 ? 52 : 66} y={y - 3.5} />
          <Bar
            tone={index === 2 ? 'faint' : 'line'}
            width={index === 1 ? 28 : 38}
            x={index === 0 ? 69 : 83}
            y={y - 1.5}
          />
        </g>
      ))}
      <Glyph icon={ChevronDown} size={9} x={38} y={25} />
    </Drawing>
  );
}

const layoutNavigationDrawings = {
  accordion: Accordion,
  'aspect-ratio': AspectRatio,
  bleed: Bleed,
  breadcrumbs: Breadcrumbs,
  container: ContainerDrawing,
  menu: MenuDrawing,
  pagination: Pagination,
  'scroll-area': ScrollArea,
  separator: SeparatorDrawing,
  sidebar: Sidebar,
  'simple-grid': SimpleGrid,
  splitter: Splitter,
  stack: StackDrawing,
  steps: StepsDrawing,
  tabs: TabsDrawing,
  'tree-view': TreeView,
} as const;

export { layoutNavigationDrawings };