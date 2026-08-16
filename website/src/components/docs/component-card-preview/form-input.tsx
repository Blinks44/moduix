import {
  Check,
  Pipette,
  X,
  CalendarDays,
  CloudUpload,
  Search,
  ChevronDown,
  Minus,
  Plus,
  Eye,
  Star,
} from 'lucide-react';
import { Drawing, Panel, Shape, Bar, Dot, Rule, Glyph, Label } from './primitives';

function ChoiceDrawing({ radio = false }: { radio?: boolean }) {
  return (
    <Drawing>
      {radio ? (
        <>
          <Dot radius={8} tone="faint" x={54} y={36} />
          <Dot radius={8} tone="strong" x={54} y={60} />
          <Dot radius={3} tone="inverse" x={54} y={60} />
        </>
      ) : (
        <>
          <Shape height={16} radius={5} tone="faint" width={16} x={46} y={28} />
          <Shape height={16} radius={5} tone="strong" width={16} x={46} y={52} />
          <Glyph icon={Check} size={12} tone="inverse" x={48} y={54} />
        </>
      )}
      <Bar width={42} x={72} y={34} />
      <Bar width={58} x={72} y={58} />
    </Drawing>
  );
}

function Checkbox() {
  return <ChoiceDrawing />;
}

function RadioGroup() {
  return <ChoiceDrawing radio />;
}

function ColorPicker() {
  return (
    <Drawing>
      <Panel dashed height={32} width={88} x={44} y={16} />
      <Bar width={48} x={64} y={30} />
      <Panel height={30} radius={7} tone="strong" width={30} x={73} y={56} />
      <Glyph icon={Pipette} size={14} tone="inverse" x={81} y={64} />
    </Drawing>
  );
}

function Combobox() {
  return (
    <Drawing>
      <Panel height={26} width={128} x={24} y={10} />
      <Shape height={16} radius={5} tone="faint" width={38} x={29} y={15} />
      <Bar height={3} width={14} x={34} y={21} />
      <Glyph icon={X} size={7} x={56} y={19} />
      <Shape height={16} radius={5} tone="faint" width={42} x={71} y={15} />
      <Bar height={3} width={18} x={76} y={21} />
      <Glyph icon={X} size={7} x={102} y={19} />
      <Panel dashed height={42} width={116} x={30} y={44} />
      {[57, 73].map((y, index) => (
        <g key={y}>
          <Dot radius={3} x={39} y={y} />
          <Bar width={index === 0 ? 38 : 52} x={47} y={y - 2} />
          <Bar height={3} tone="faint" width={12} x={124} y={y - 1.5} />
        </g>
      ))}
    </Drawing>
  );
}

function DateInput() {
  return (
    <Drawing>
      <Panel height={30} width={108} x={34} y={33} />
      {[42, 76, 110].map((x, index) => (
        <g key={x}>
          {index > 0 ? (
            <Label x={x - 8} y={52}>
              /
            </Label>
          ) : null}
          <Shape height={16} radius={4} tone="faint" width={24} x={x} y={40} />
          <Bar height={3} width={10} x={x + 7} y={46.5} />
        </g>
      ))}
    </Drawing>
  );
}

function DatePicker() {
  return (
    <Drawing>
      <Panel height={24} width={112} x={32} y={5} />
      <Glyph icon={CalendarDays} size={11} x={39} y={11} />
      <Bar width={44} x={57} y={15} />
      <Panel dashed height={55} width={104} x={36} y={35} />
      {Array.from({ length: 5 }, (_, index) => (
        <Bar key={index} height={2} width={10} x={44 + index * 18} y={43} />
      ))}
      {Array.from({ length: 10 }, (_, index) => (
        <Shape
          key={index}
          height={14}
          radius={3}
          tone={index === 7 ? 'strong' : 'faint'}
          width={14}
          x={43 + (index % 5) * 18}
          y={51 + Math.floor(index / 5) * 18}
        />
      ))}
    </Drawing>
  );
}

function Editable() {
  return (
    <Drawing>
      <Panel height={30} width={86} x={31} y={33} />
      <Bar width={48} x={43} y={46} />
      <Panel height={30} width={30} x={121} y={33} />
      <Glyph icon={Check} size={12} x={130} y={42} />
    </Drawing>
  );
}

function Field() {
  return (
    <Drawing>
      <Bar width={28} x={29} y={22} />
      <Panel height={30} width={118} x={29} y={33} />
      <Bar width={62} x={41} y={46} />
      <Bar height={3} tone="faint" width={48} x={29} y={72} />
    </Drawing>
  );
}

function Fieldset() {
  return (
    <Drawing>
      <Panel height={70} width={128} x={24} y={13} />
      <Shape height={10} radius={3} tone="inverse" width={36} x={36} y={8} />
      <Bar width={28} x={40} y={11} />
      {[34, 58].map((y, index) => (
        <g key={y}>
          <Bar width={index === 0 ? 24 : 32} x={37} y={y + 6} />
          <Shape height={18} radius={4} outline tone="line" width={52} x={86} y={y} />
        </g>
      ))}
    </Drawing>
  );
}

function FileUpload() {
  return (
    <Drawing>
      <Panel height={66} width={108} x={34} y={15} />
      <Dot outline radius={15} tone="line" x={88} y={39} />
      <Glyph icon={CloudUpload} size={15} x={80.5} y={31.5} />
      <Bar width={52} x={62} y={65} />
    </Drawing>
  );
}

function Input() {
  return (
    <Drawing>
      <Panel height={30} width={120} x={28} y={33} />
      <Bar width={62} x={41} y={46} />
    </Drawing>
  );
}

function InputGroup() {
  return (
    <Drawing>
      <Panel height={30} width={124} x={26} y={33} />
      <Rule tone="faint" x1={56} x2={56} y1={33} y2={63} />
      <Rule tone="faint" x1={120} x2={120} y1={33} y2={63} />
      <Glyph icon={Search} size={12} x={35} y={42} />
      <Bar width={40} x={69} y={46} />
      <Shape height={8} radius={2} width={8} x={131} y={44} />
    </Drawing>
  );
}

function Select() {
  return (
    <Drawing>
      <Panel height={30} width={120} x={28} y={33} />
      <Bar width={58} x={41} y={46} />
      <Glyph icon={ChevronDown} size={12} x={126} y={42} />
    </Drawing>
  );
}

function NumberInput() {
  return (
    <Drawing>
      <Panel height={30} width={120} x={28} y={33} />
      <Rule tone="faint" x1={58} x2={58} y1={33} y2={63} />
      <Rule tone="faint" x1={118} x2={118} y1={33} y2={63} />
      <Glyph icon={Minus} size={12} x={37} y={42} />
      <Bar width={28} x={74} y={46} />
      <Glyph icon={Plus} size={12} x={127} y={42} />
    </Drawing>
  );
}

function PasswordInput() {
  return (
    <Drawing>
      <Panel height={30} width={120} x={28} y={33} />
      {Array.from({ length: 6 }, (_, index) => (
        <Dot key={index} radius={2} x={42 + index * 8} y={48} />
      ))}
      <Glyph icon={Eye} size={13} x={126} y={41.5} />
    </Drawing>
  );
}

function PinInput() {
  return (
    <Drawing>
      {Array.from({ length: 4 }, (_, index) => (
        <g key={index}>
          <Panel height={32} radius={7} width={28} x={27 + index * 32} y={32} />
          {index < 3 ? <Dot radius={2.5} x={41 + index * 32} y={48} /> : null}
        </g>
      ))}
    </Drawing>
  );
}

function Rating() {
  return (
    <Drawing>
      {Array.from({ length: 5 }, (_, index) => (
        <Glyph
          key={index}
          filled={index < 3}
          icon={Star}
          size={18}
          tone={index < 3 ? 'strong' : 'line'}
          x={39 + index * 20}
          y={39}
        />
      ))}
    </Drawing>
  );
}

function Segmented() {
  return (
    <Drawing>
      <Panel height={32} width={132} x={22} y={32} />
      <Shape height={26} radius={6} tone="strong" width={40} x={25} y={35} />
      {[31, 72, 114].map((x, index) => (
        <Bar key={x} tone={index === 0 ? 'inverse' : 'line'} width={24} x={x} y={46} />
      ))}
    </Drawing>
  );
}

function SignaturePad() {
  return (
    <Drawing>
      <Panel height={66} width={118} x={29} y={15} />
      <Shape height={14} radius={4} tone="faint" width={14} x={124} y={23} />
      <Rule x1={43} x2={133} y1={65} y2={65} />
    </Drawing>
  );
}

function Slider() {
  return (
    <Drawing>
      <Bar height={6} tone="faint" width={134} x={21} y={45} />
      <Bar height={6} tone="strong" width={66} x={21} y={45} />
      <Dot radius={8} tone="strong" x={87} y={48} />
    </Drawing>
  );
}

function Switch() {
  return (
    <Drawing>
      <Shape height={28} radius={14} tone="strong" width={52} x={62} y={34} />
      <Dot radius={11} tone="inverse" x={99} y={48} />
    </Drawing>
  );
}

function TagsInput() {
  return (
    <Drawing>
      <Panel height={30} width={130} x={23} y={33} />
      {[28, 70].map((x, index) => (
        <g key={x}>
          <Shape height={20} radius={5} tone="faint" width={38} x={x} y={38} />
          <Bar height={3} width={index === 0 ? 13 : 17} x={x + 6} y={46.5} />
          <Glyph icon={X} size={8} x={x + 26} y={44} />
        </g>
      ))}
      <Rule tone="strong" x1={116} x2={116} y1={41} y2={55} />
    </Drawing>
  );
}

function Textarea() {
  return (
    <Drawing>
      <Panel height={56} width={126} x={25} y={20} />
      <Bar width={56} x={38} y={32} />
      <Rule x1={139} x2={145} y1={69} y2={63} />
      <Rule x1={142} x2={146} y1={71} y2={67} />
    </Drawing>
  );
}

function Toggle() {
  return (
    <Drawing>
      <Panel height={32} radius={7} tone="strong" width={32} x={52} y={32} />
      <Bar tone="inverse" width={12} x={62} y={46} />
      <Panel height={32} radius={7} width={32} x={92} y={32} />
      <Bar width={12} x={102} y={46} />
    </Drawing>
  );
}

function ToggleGroup() {
  return (
    <Drawing>
      <Panel height={32} width={126} x={25} y={32} />
      <Rule tone="faint" x1={67} x2={67} y1={32} y2={64} />
      <Rule tone="faint" x1={109} x2={109} y1={32} y2={64} />
      <Shape height={28} radius={5} tone="strong" width={38} x={69} y={34} />
      <Bar width={22} x={35} y={46} />
      <Bar tone="inverse" width={22} x={77} y={46} />
      <Bar width={22} x={119} y={46} />
    </Drawing>
  );
}

const formInputDrawings = {
  checkbox: Checkbox,
  'color-picker': ColorPicker,
  combobox: Combobox,
  'date-input': DateInput,
  'date-picker': DatePicker,
  editable: Editable,
  field: Field,
  fieldset: Fieldset,
  'file-upload': FileUpload,
  input: Input,
  'input-group': InputGroup,
  'native-select': Select,
  'number-input': NumberInput,
  'password-input': PasswordInput,
  'pin-input': PinInput,
  'radio-group': RadioGroup,
  'rating-group': Rating,
  'segment-group': Segmented,
  select: Select,
  'signature-pad': SignaturePad,
  slider: Slider,
  switch: Switch,
  'tags-input': TagsInput,
  textarea: Textarea,
  toggle: Toggle,
  'toggle-group': ToggleGroup,
} as const;

export { formInputDrawings };