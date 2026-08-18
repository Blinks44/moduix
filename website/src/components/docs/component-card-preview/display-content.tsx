import { UserRound, Image, Check, QrCode, X } from 'lucide-react';
import { Drawing, Panel, Shape, Bar, Dot, Rule, Glyph, Label } from './primitives';

function Avatar() {
  return (
    <Drawing>
      <Dot outline radius={28} tone="line" x={88} y={48} />
      <Dot radius={23} tone="faint" x={88} y={48} />
      <Glyph icon={UserRound} size={30} x={73} y={33} />
      <Dot outline radius={6.5} tone="line" x={108} y={68} />
      <Dot radius={5} tone="strong" x={108} y={68} />
    </Drawing>
  );
}

function Badge() {
  return (
    <Drawing>
      <Panel height={28} width={94} x={41} y={34} />
      <Dot radius={4} tone="strong" x={58} y={48} />
      <Bar width={48} x={70} y={46} />
    </Drawing>
  );
}

function CardDrawing() {
  return (
    <Drawing>
      <Panel height={72} width={104} x={36} y={12} />
      <Shape height={25} radius={6} tone="faint" width={88} x={44} y={20} />
      <Glyph icon={Image} size={14} x={81} y={25.5} />
      <Bar width={44} x={45} y={53} />
      <Bar tone="faint" width={70} x={45} y={63} />
      <Shape height={8} radius={4} tone="strong" width={28} x={104} y={70} />
    </Drawing>
  );
}

function Chart() {
  return (
    <Drawing>
      <Panel height={64} width={132} x={22} y={16} />
      <Rule tone="faint" width={1} x1={34} x2={144} y1={68} y2={68} />
      <Rule tone="faint" width={1} x1={34} x2={34} y1={28} y2={68} />
      <polyline
        fill="none"
        points="38,58 60,47 82,52 104,31 136,38"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
      />
      {[
        [38, 58],
        [60, 47],
        [82, 52],
        [104, 31],
        [136, 38],
      ].map(([x, y]) => (
        <Dot radius={3} tone="strong" x={x} y={y} key={`${x}-${y}`} />
      ))}
    </Drawing>
  );
}

function Heading() {
  return (
    <Drawing>
      <Panel height={62} width={126} x={25} y={17} />
      <Bar height={9} tone="strong" width={76} x={38} y={31} />
      <Bar tone="faint" width={96} x={38} y={51} />
      <Bar tone="faint" width={72} x={38} y={61} />
    </Drawing>
  );
}

function Highlight() {
  return (
    <Drawing>
      <Panel height={54} width={132} x={22} y={21} />
      <Bar width={44} x={35} y={35} />
      <Shape height={10} radius={3} tone="strong" width={48} x={82} y={32} />
      <Bar tone="inverse" width={36} x={88} y={35} />
      <Bar tone="faint" width={92} x={35} y={51} />
      <Bar tone="faint" width={64} x={35} y={61} />
    </Drawing>
  );
}

function ImageDrawing() {
  return (
    <Drawing>
      <Panel height={68} width={112} x={32} y={14} />
      <Shape height={52} radius={6} tone="faint" width={96} x={40} y={22} />
      <Glyph icon={Image} size={24} x={76} y={34} />
      <Dot radius={5} tone="strong" x={119} y={36} />
    </Drawing>
  );
}

function ImageCropper() {
  return (
    <Drawing>
      <Panel height={72} width={124} x={26} y={12} />
      <Shape height={56} radius={5} tone="faint" width={108} x={34} y={20} />
      <Shape height={42} outline radius={2} width={72} x={52} y={27} />
      {[
        [48, 23],
        [120, 23],
        [48, 65],
        [120, 65],
      ].map(([x, y]) => (
        <Shape height={8} outline radius={2} width={8} x={x} y={y} key={`${x}-${y}`} />
      ))}
    </Drawing>
  );
}

function Kbd() {
  return (
    <Drawing>
      <Panel height={34} radius={7} width={38} x={39} y={31} />
      <Panel height={34} radius={7} width={38} x={99} y={31} />
      <Label
        dominantBaseline="middle"
        fontSize={12}
        fontWeight={600}
        textAnchor="middle"
        tone="strong"
        x={58}
        y={48}
      >
        ⌘
      </Label>
      <Label
        dominantBaseline="middle"
        fontSize={9}
        fontWeight={600}
        textAnchor="middle"
        tone="strong"
        x={88}
        y={48}
      >
        +
      </Label>
      <Label
        dominantBaseline="middle"
        fontSize={12}
        fontWeight={600}
        textAnchor="middle"
        tone="strong"
        x={118}
        y={48}
      >
        K
      </Label>
    </Drawing>
  );
}

function ListDrawing() {
  return (
    <Drawing>
      <Panel height={70} width={118} x={29} y={13} />
      {[29, 48, 67].map((y, index) => (
        <g key={y}>
          <Dot radius={4} tone={index === 1 ? 'strong' : 'faint'} x={44} y={y} />
          <Bar width={index === 2 ? 48 : 62} x={57} y={y - 4} />
          <Bar tone="faint" width={index === 1 ? 38 : 50} x={57} y={y + 4} />
        </g>
      ))}
    </Drawing>
  );
}

function Listbox() {
  return (
    <Drawing>
      <Panel height={70} width={116} x={30} y={13} />
      <Bar width={42} x={44} y={24} />
      <Shape height={18} radius={5} tone="strong" width={88} x={39} y={34} />
      <Bar tone="inverse" width={44} x={49} y={41} />
      <Glyph icon={Check} size={10} tone="inverse" x={110} y={38} />
      <Bar width={54} x={48} y={60} />
      <Bar tone="faint" width={38} x={48} y={70} />
    </Drawing>
  );
}

function Marquee() {
  return (
    <Drawing>
      <Panel height={50} width={154} x={11} y={23} />
      {[19, 57, 95, 133].map((x, index) => (
        <Shape
          height={32}
          outline={index === 1}
          radius={6}
          tone={index === 1 ? 'line' : 'faint'}
          width={30}
          x={x}
          y={32}
          key={x}
        />
      ))}
      <Bar tone="strong" width={20} x={62} y={46} />
    </Drawing>
  );
}

function QrCodeDrawing() {
  return (
    <Drawing>
      <Panel height={72} width={72} x={52} y={12} />
      <Glyph icon={QrCode} size={48} x={64} y={24} />
    </Drawing>
  );
}

function TableDrawing() {
  return (
    <Drawing>
      <Panel height={64} width={136} x={20} y={16} />
      <Shape height={16} radius={4} tone="faint" width={120} x={28} y={22} />
      <Rule tone="faint" width={1} x1={28} x2={148} y1={38} y2={38} />
      <Rule tone="faint" width={1} x1={28} x2={148} y1={56} y2={56} />
      <Rule tone="faint" width={1} x1={67} x2={67} y1={22} y2={74} />
      <Rule tone="faint" width={1} x1={111} x2={111} y1={22} y2={74} />
      {[28, 45, 63].map((y, index) => (
        <g key={y}>
          <Bar tone={index === 0 ? 'line' : 'faint'} width={22} x={36} y={y} />
          <Bar tone="faint" width={26} x={76} y={y} />
          <Bar tone="faint" width={22} x={119} y={y} />
        </g>
      ))}
    </Drawing>
  );
}

function Tag() {
  return (
    <Drawing>
      <Shape height={28} outline radius={7} width={92} x={42} y={34} />
      <Dot radius={3} tone="strong" x={56} y={48} />
      <Bar width={42} x={68} y={46} />
      <Glyph icon={X} size={9} tone="faint" x={117} y={43.5} />
    </Drawing>
  );
}

function TextDrawing() {
  return (
    <Drawing>
      <Panel height={62} width={132} x={22} y={17} />
      <Bar width={48} x={35} y={29} />
      <Bar tone="faint" width={104} x={35} y={43} />
      <Bar tone="faint" width={96} x={35} y={53} />
      <Bar tone="faint" width={62} x={35} y={63} />
    </Drawing>
  );
}

function Timer() {
  return (
    <Drawing>
      <Panel height={48} width={132} x={22} y={24} />
      {[32, 57, 94, 119].map((x) => (
        <Shape height={28} outline radius={5} width={20} x={x} y={34} key={x} />
      ))}
      <Bar height={12} width={8} x={38} y={42} />
      <Bar height={12} width={8} x={63} y={42} />
      <Dot radius={2} x={88} y={44} />
      <Dot radius={2} x={88} y={53} />
      <Bar height={12} width={8} x={100} y={42} />
      <Bar height={12} width={8} x={125} y={42} />
    </Drawing>
  );
}

function Typeset() {
  return (
    <Drawing>
      <Panel height={72} width={126} x={25} y={12} />
      <Label x={37} y={35}>
        Aa
      </Label>
      <Bar height={8} tone="strong" width={58} x={60} y={27} />
      <Label x={37} y={52}>
        Aa
      </Label>
      <Bar height={6} width={74} x={60} y={46} />
      <Label x={37} y={68}>
        Aa
      </Label>
      <Bar tone="faint" width={50} x={60} y={64} />
    </Drawing>
  );
}

const displayContentDrawings = {
  avatar: Avatar,
  badge: Badge,
  card: CardDrawing,
  chart: Chart,
  heading: Heading,
  highlight: Highlight,
  image: ImageDrawing,
  'image-cropper': ImageCropper,
  kbd: Kbd,
  list: ListDrawing,
  listbox: Listbox,
  marquee: Marquee,
  'qr-code': QrCodeDrawing,
  table: TableDrawing,
  tag: Tag,
  text: TextDrawing,
  timer: Timer,
  typeset: Typeset,
} as const;

export { displayContentDrawings };