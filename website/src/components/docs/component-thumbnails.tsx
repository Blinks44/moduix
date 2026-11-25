import type { ReactNode } from 'react';

// Lightweight, theme-aware schematic thumbnails for the /docs/components gallery.
// Uses CSS custom properties so thumbnails automatically adapt to light/dark themes and presets.
const stroke = 'currentColor';
const muted = 'var(--rp-c-divider)';
const surface = 'var(--rp-c-bg)';
const accent = 'var(--moduix-primary, var(--rp-c-brand))';
const textMuted = 'var(--rp-c-text-4)';

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 180 88"
      width="180"
      height="88"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

const bySlug: Record<string, () => ReactNode> = {
  button: () => (
    <Frame>
      <rect x="26" y="29" width="60" height="30" rx="8" fill={accent} />
      <rect x="42" y="42" width="28" height="4" rx="2" fill={surface} />
      <rect x="94" y="29" width="60" height="30" rx="8" fill={surface} stroke={muted} />
      <rect x="110" y="42" width="28" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  'split-button': () => (
    <Frame>
      <rect x="38" y="29" width="104" height="30" rx="8" fill={accent} />
      <rect x="52" y="42" width="46" height="4" rx="2" fill={surface} />
      <line x1="112" y1="30" x2="112" y2="58" stroke={surface} strokeOpacity="0.3" />
      <path d="M123 42l4 4 4-4" stroke={surface} strokeWidth="1.6" strokeLinecap="round" />
    </Frame>
  ),
  'close-button': () => (
    <Frame>
      <rect x="74" y="28" width="32" height="32" rx="8" fill={surface} stroke={muted} />
      <path d="M85 39l10 10M95 39l-10 10" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </Frame>
  ),
  clipboard: () => (
    <Frame>
      <rect x="26" y="30" width="96" height="28" rx="7" fill={surface} stroke={muted} />
      <rect x="36" y="42" width="64" height="4" rx="2" fill={textMuted} />
      <rect x="128" y="30" width="28" height="28" rx="7" fill={surface} stroke={muted} />
      <rect x="137" y="39" width="10" height="10" rx="2" stroke={stroke} strokeWidth="1.4" />
    </Frame>
  ),
  swap: () => (
    <Frame>
      <rect x="46" y="28" width="34" height="32" rx="8" fill={surface} stroke={muted} />
      <circle cx="63" cy="44" r="5" fill={accent} />
      <path d="M86 44h8M91 40l4 4-4 4" stroke={textMuted} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="100" y="28" width="34" height="32" rx="8" fill={accent} />
      <path d="M112 44l3 3 7-7" stroke={surface} strokeWidth="1.6" strokeLinecap="round" />
    </Frame>
  ),
  input: () => (
    <Frame>
      <rect x="26" y="29" width="128" height="30" rx="8" fill={surface} stroke={muted} />
      <rect x="38" y="42" width="52" height="4" rx="2" fill={textMuted} />
      <line x1="94" y1="37" x2="94" y2="51" stroke={accent} strokeWidth="1.5" />
    </Frame>
  ),
  'input-group': () => (
    <Frame>
      <rect x="24" y="29" width="132" height="30" rx="8" fill={surface} stroke={muted} />
      <rect x="25" y="30" width="32" height="28" rx="7" fill={muted} fillOpacity="0.45" />
      <rect x="34" y="42" width="14" height="4" rx="2" fill={textMuted} />
      <rect x="66" y="42" width="54" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  textarea: () => (
    <Frame>
      <rect x="28" y="18" width="124" height="52" rx="8" fill={surface} stroke={muted} />
      <rect x="38" y="30" width="84" height="4" rx="2" fill={textMuted} />
      <rect x="38" y="41" width="66" height="4" rx="2" fill={textMuted} fillOpacity="0.6" />
      <rect x="38" y="52" width="44" height="4" rx="2" fill={textMuted} fillOpacity="0.4" />
    </Frame>
  ),
  checkbox: () => (
    <Frame>
      <rect x="44" y="34" width="20" height="20" rx="5" fill={accent} />
      <path d="M49 44l3.5 3.5L59 41" stroke={surface} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="74" y="41" width="62" height="5" rx="2.5" fill={textMuted} />
    </Frame>
  ),
  switch: () => (
    <Frame>
      <rect x="44" y="32" width="40" height="24" rx="12" fill={accent} />
      <circle cx="72" cy="44" r="9" fill={surface} />
      <rect x="94" y="41" width="42" height="5" rx="2.5" fill={textMuted} />
    </Frame>
  ),
  slider: () => (
    <Frame>
      <rect x="26" y="41" width="128" height="6" rx="3" fill={muted} />
      <rect x="26" y="41" width="76" height="6" rx="3" fill={accent} />
      <circle cx="102" cy="44" r="8" fill={surface} stroke={accent} strokeWidth="2.5" />
    </Frame>
  ),
  'angle-slider': () => (
    <Frame>
      <circle cx="90" cy="44" r="24" fill={surface} stroke={muted} strokeWidth="2" />
      <line
        x1="90"
        y1="44"
        x2="106"
        y2="30"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="90" cy="44" r="3" fill={accent} />
    </Frame>
  ),
  select: () => (
    <Frame>
      <rect x="34" y="14" width="112" height="22" rx="6" fill={surface} stroke={muted} />
      <rect x="44" y="23" width="48" height="4" rx="2" fill={textMuted} />
      <path d="M132 23l3.5 3.5L139 23" stroke={textMuted} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="34" y="40" width="112" height="36" rx="7" fill={surface} stroke={muted} />
      <rect x="40" y="46" width="100" height="10" rx="4" fill={accent} fillOpacity="0.16" />
      <rect x="46" y="49" width="44" height="4" rx="2" fill={accent} />
      <rect x="46" y="63" width="54" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  combobox: () => (
    <Frame>
      <rect x="34" y="14" width="112" height="22" rx="6" fill={surface} stroke={accent} />
      <rect x="44" y="23" width="38" height="4" rx="2" fill={stroke} />
      <rect x="34" y="40" width="112" height="36" rx="7" fill={surface} stroke={muted} />
      <rect x="44" y="49" width="50" height="4" rx="2" fill={accent} />
      <rect x="44" y="61" width="66" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  'date-picker': () => (
    <Frame>
      <rect x="42" y="12" width="96" height="64" rx="8" fill={surface} stroke={muted} />
      <rect x="52" y="20" width="42" height="4" rx="2" fill={stroke} />
      {[0, 1, 2, 3, 4].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={52 + col * 16}
            y={32 + row * 13}
            width="10"
            height="8"
            rx="2.5"
            fill={col === 2 && row === 1 ? accent : muted}
            fillOpacity={col === 2 && row === 1 ? 1 : 0.6}
          />
        )),
      )}
    </Frame>
  ),
  'color-picker': () => (
    <Frame>
      <rect
        x="38"
        y="16"
        width="60"
        height="56"
        rx="8"
        fill={accent}
        fillOpacity="0.25"
        stroke={muted}
      />
      <circle cx="76" cy="36" r="5" fill={accent} stroke={surface} strokeWidth="2" />
      <rect x="108" y="18" width="34" height="12" rx="4" fill={accent} />
      <rect x="108" y="38" width="34" height="12" rx="4" fill="#10b981" />
      <rect x="108" y="58" width="34" height="12" rx="4" fill="#f59e0b" />
    </Frame>
  ),
  'file-upload': () => (
    <Frame>
      <rect
        x="30"
        y="16"
        width="120"
        height="56"
        rx="10"
        fill={surface}
        stroke={muted}
        strokeDasharray="4 3"
      />
      <path d="M90 30v16M84 36l6-6 6 6" stroke={accent} strokeWidth="1.8" strokeLinecap="round" />
      <rect x="64" y="54" width="52" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  'tags-input': () => (
    <Frame>
      <rect x="22" y="28" width="136" height="32" rx="8" fill={surface} stroke={muted} />
      <rect x="30" y="34" width="36" height="20" rx="5" fill={accent} fillOpacity="0.18" />
      <rect x="36" y="42" width="24" height="4" rx="2" fill={accent} />
      <rect x="72" y="34" width="34" height="20" rx="5" fill={muted} fillOpacity="0.65" />
      <rect x="78" y="42" width="22" height="4" rx="2" fill={textMuted} />
      <line x1="114" y1="38" x2="114" y2="50" stroke={accent} strokeWidth="1.4" />
    </Frame>
  ),
  'pin-input': () => (
    <Frame>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={34 + i * 30}
            y="28"
            width="24"
            height="32"
            rx="7"
            fill={surface}
            stroke={i === 2 ? accent : muted}
          />
          {i < 2 ? <circle cx={46 + i * 30} cy="44" r="3" fill={stroke} /> : null}
        </g>
      ))}
    </Frame>
  ),
  'radio-group': () => (
    <Frame>
      <circle cx="52" cy="32" r="7" fill={surface} stroke={accent} strokeWidth="2" />
      <circle cx="52" cy="32" r="3.2" fill={accent} />
      <rect x="68" y="30" width="60" height="4" rx="2" fill={stroke} />
      <circle cx="52" cy="56" r="7" fill={surface} stroke={muted} strokeWidth="1.6" />
      <rect x="68" y="54" width="48" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  'rating-group': () => (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={i}
          cx={42 + i * 24}
          cy="44"
          r="7"
          fill={i < 4 ? accent : muted}
          fillOpacity={i < 4 ? 1 : 0.45}
        />
      ))}
    </Frame>
  ),
  'segment-group': () => (
    <Frame>
      <rect x="28" y="28" width="124" height="32" rx="9" fill={muted} fillOpacity="0.5" />
      <rect x="32" y="32" width="56" height="24" rx="6" fill={surface} />
      <rect x="44" y="42" width="32" height="4" rx="2" fill={stroke} />
      <rect x="104" y="42" width="32" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  'signature-pad': () => (
    <Frame>
      <rect x="28" y="18" width="124" height="52" rx="8" fill={surface} stroke={muted} />
      <path
        d="M44 50c8-16 14-16 18-2s10 8 18-10c4-9 10-8 14 2 5 11 16 4 28-4"
        stroke={accent}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Frame>
  ),
  dialog: () => (
    <Frame>
      <rect x="20" y="12" width="140" height="64" rx="8" fill={muted} fillOpacity="0.35" />
      <rect x="42" y="20" width="96" height="48" rx="8" fill={surface} stroke={muted} />
      <rect x="52" y="30" width="48" height="5" rx="2.5" fill={stroke} />
      <rect x="52" y="40" width="74" height="4" rx="2" fill={textMuted} />
      <rect x="98" y="51" width="30" height="10" rx="4" fill={accent} />
    </Frame>
  ),
  drawer: () => (
    <Frame>
      <rect x="20" y="12" width="140" height="64" rx="8" fill={muted} fillOpacity="0.35" />
      <rect x="96" y="12" width="64" height="64" rx="8" fill={surface} stroke={muted} />
      <rect x="106" y="24" width="36" height="5" rx="2.5" fill={stroke} />
      <rect x="106" y="36" width="44" height="4" rx="2" fill={textMuted} />
      <rect x="106" y="46" width="34" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  popover: () => (
    <Frame>
      <rect x="64" y="14" width="52" height="18" rx="5" fill={surface} stroke={muted} />
      <rect x="76" y="21" width="28" height="4" rx="2" fill={textMuted} />
      <rect x="42" y="38" width="96" height="36" rx="8" fill={surface} stroke={muted} />
      <rect x="52" y="48" width="54" height="4" rx="2" fill={stroke} />
      <rect x="52" y="58" width="70" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  tooltip: () => (
    <Frame>
      <rect x="48" y="18" width="84" height="24" rx="6" fill={stroke} />
      <rect x="62" y="28" width="56" height="4" rx="2" fill={surface} />
      <rect x="68" y="50" width="44" height="20" rx="6" fill={surface} stroke={muted} />
    </Frame>
  ),
  'command-palette': () => (
    <Frame>
      <rect x="34" y="14" width="112" height="60" rx="8" fill={surface} stroke={muted} />
      <rect x="44" y="22" width="60" height="5" rx="2.5" fill={textMuted} />
      <line x1="34" y1="34" x2="146" y2="34" stroke={muted} />
      <rect x="40" y="40" width="100" height="12" rx="4" fill={accent} fillOpacity="0.16" />
      <rect x="46" y="44" width="44" height="4" rx="2" fill={accent} />
      <rect x="46" y="59" width="58" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  tabs: () => (
    <Frame>
      <rect x="28" y="20" width="36" height="5" rx="2.5" fill={accent} />
      <rect x="72" y="20" width="32" height="5" rx="2.5" fill={textMuted} />
      <rect x="112" y="20" width="32" height="5" rx="2.5" fill={textMuted} />
      <line x1="28" y1="32" x2="152" y2="32" stroke={muted} />
      <line x1="28" y1="32" x2="64" y2="32" stroke={accent} strokeWidth="2" />
      <rect x="28" y="42" width="124" height="28" rx="7" fill={surface} stroke={muted} />
    </Frame>
  ),
  accordion: () => (
    <Frame>
      <rect x="28" y="14" width="124" height="30" rx="7" fill={surface} stroke={muted} />
      <rect x="38" y="22" width="56" height="4" rx="2" fill={stroke} />
      <rect x="38" y="32" width="90" height="4" rx="2" fill={textMuted} />
      <rect x="28" y="50" width="124" height="22" rx="7" fill={surface} stroke={muted} />
      <rect x="38" y="59" width="64" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  table: () => (
    <Frame>
      <rect x="24" y="16" width="132" height="56" rx="8" fill={surface} stroke={muted} />
      <line x1="24" y1="34" x2="156" y2="34" stroke={muted} />
      <line x1="24" y1="52" x2="156" y2="52" stroke={muted} />
      <rect x="34" y="23" width="28" height="4" rx="2" fill={stroke} />
      <rect x="80" y="23" width="28" height="4" rx="2" fill={stroke} />
      <rect x="122" y="23" width="22" height="4" rx="2" fill={stroke} />
      <rect x="34" y="41" width="34" height="4" rx="2" fill={textMuted} />
      <rect x="80" y="41" width="24" height="4" rx="2" fill={accent} />
      <rect x="34" y="59" width="26" height="4" rx="2" fill={textMuted} />
      <rect x="80" y="59" width="32" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  chart: () => (
    <Frame>
      <rect x="36" y="44" width="16" height="28" rx="4" fill={accent} fillOpacity="0.4" />
      <rect x="60" y="28" width="16" height="44" rx="4" fill={accent} fillOpacity="0.7" />
      <rect x="84" y="36" width="16" height="36" rx="4" fill={accent} />
      <rect x="108" y="20" width="16" height="52" rx="4" fill={accent} fillOpacity="0.85" />
      <rect x="132" y="32" width="16" height="40" rx="4" fill={accent} fillOpacity="0.55" />
    </Frame>
  ),
  card: () => (
    <Frame>
      <rect x="36" y="14" width="108" height="60" rx="10" fill={surface} stroke={muted} />
      <rect x="48" y="26" width="52" height="5" rx="2.5" fill={stroke} />
      <rect x="48" y="38" width="84" height="4" rx="2" fill={textMuted} />
      <rect x="48" y="48" width="62" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  badge: () => (
    <Frame>
      <rect x="32" y="33" width="52" height="22" rx="11" fill={accent} />
      <rect x="44" y="42" width="28" height="4" rx="2" fill={surface} />
      <rect x="92" y="33" width="56" height="22" rx="11" fill={surface} stroke={muted} />
      <rect x="104" y="42" width="32" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  avatar: () => (
    <Frame>
      <circle
        cx="72"
        cy="44"
        r="16"
        fill={accent}
        fillOpacity="0.2"
        stroke={accent}
        strokeWidth="1.5"
      />
      <circle cx="72" cy="40" r="5" fill={accent} />
      <path
        d="M62 54c2-4 6-6 10-6s8 2 10 6"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="108" cy="44" r="16" fill={surface} stroke={muted} />
      <rect x="101" y="42" width="14" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  alert: () => (
    <Frame>
      <rect x="26" y="22" width="128" height="44" rx="9" fill={surface} stroke={accent} />
      <circle cx="42" cy="36" r="5" fill={accent} />
      <rect x="54" y="33" width="58" height="5" rx="2.5" fill={stroke} />
      <rect x="54" y="45" width="84" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  toast: () => (
    <Frame>
      <rect x="34" y="24" width="112" height="40" rx="10" fill={surface} stroke={muted} />
      <circle cx="50" cy="44" r="6" fill={accent} />
      <rect x="64" y="37" width="46" height="5" rx="2.5" fill={stroke} />
      <rect x="64" y="47" width="66" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  spinner: () => (
    <Frame>
      <circle cx="90" cy="44" r="14" stroke={muted} strokeWidth="3.5" />
      <path d="M90 30a14 14 0 0 1 14 14" stroke={accent} strokeWidth="3.5" strokeLinecap="round" />
    </Frame>
  ),
  skeleton: () => (
    <Frame>
      <circle cx="48" cy="44" r="13" fill={muted} />
      <rect x="70" y="34" width="76" height="7" rx="3.5" fill={muted} />
      <rect x="70" y="47" width="52" height="6" rx="3" fill={muted} fillOpacity="0.65" />
    </Frame>
  ),
  'progress-linear': () => (
    <Frame>
      <rect x="26" y="40" width="128" height="8" rx="4" fill={muted} />
      <rect x="26" y="40" width="86" height="8" rx="4" fill={accent} />
    </Frame>
  ),
  'progress-circular': () => (
    <Frame>
      <circle cx="90" cy="44" r="18" stroke={muted} strokeWidth="4" />
      <path d="M90 26a18 18 0 1 1-15.6 27" stroke={accent} strokeWidth="4" strokeLinecap="round" />
    </Frame>
  ),
  menu: () => (
    <Frame>
      <rect x="44" y="14" width="92" height="60" rx="8" fill={surface} stroke={muted} />
      <rect x="50" y="20" width="80" height="12" rx="4" fill={accent} fillOpacity="0.16" />
      <rect x="56" y="24" width="42" height="4" rx="2" fill={accent} />
      <rect x="56" y="41" width="54" height="4" rx="2" fill={textMuted} />
      <rect x="56" y="55" width="46" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  pagination: () => (
    <Frame>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={26 + i * 26}
          y="32"
          width="22"
          height="24"
          rx="6"
          fill={i === 2 ? accent : surface}
          stroke={i === 2 ? accent : muted}
        />
      ))}
    </Frame>
  ),
  steps: () => (
    <Frame>
      <line x1="46" y1="44" x2="134" y2="44" stroke={muted} strokeWidth="2" />
      <line x1="46" y1="44" x2="90" y2="44" stroke={accent} strokeWidth="2" />
      <circle cx="46" cy="44" r="9" fill={accent} />
      <circle cx="90" cy="44" r="9" fill={accent} />
      <circle cx="134" cy="44" r="9" fill={surface} stroke={muted} strokeWidth="2" />
    </Frame>
  ),
  sidebar: () => (
    <Frame>
      <rect x="24" y="14" width="132" height="60" rx="8" fill={surface} stroke={muted} />
      <rect x="25" y="15" width="42" height="58" rx="7" fill={muted} fillOpacity="0.35" />
      <rect x="32" y="26" width="28" height="4" rx="2" fill={accent} />
      <rect x="32" y="38" width="24" height="4" rx="2" fill={textMuted} />
      <rect x="32" y="50" width="26" height="4" rx="2" fill={textMuted} />
      <rect x="78" y="26" width="64" height="36" rx="6" fill={muted} fillOpacity="0.25" />
    </Frame>
  ),
  breadcrumbs: () => (
    <Frame>
      <rect x="26" y="41" width="30" height="5" rx="2.5" fill={textMuted} />
      <path d="M64 40l4 4-4 4" stroke={textMuted} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="76" y="41" width="32" height="5" rx="2.5" fill={textMuted} />
      <path d="M116 40l4 4-4 4" stroke={textMuted} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="128" y="41" width="28" height="5" rx="2.5" fill={stroke} />
    </Frame>
  ),
  carousel: () => (
    <Frame>
      <rect
        x="44"
        y="18"
        width="92"
        height="44"
        rx="8"
        fill={accent}
        fillOpacity="0.18"
        stroke={muted}
      />
      <circle cx="80" cy="70" r="3" fill={accent} />
      <circle cx="90" cy="70" r="3" fill={muted} />
      <circle cx="100" cy="70" r="3" fill={muted} />
    </Frame>
  ),
  kbd: () => (
    <Frame>
      <rect x="52" y="28" width="32" height="32" rx="7" fill={surface} stroke={muted} />
      <rect x="61" y="42" width="14" height="4" rx="2" fill={stroke} />
      <rect x="94" y="28" width="34" height="32" rx="7" fill={surface} stroke={muted} />
      <rect x="104" y="42" width="14" height="4" rx="2" fill={stroke} />
    </Frame>
  ),
};

const byCategory: Record<string, () => ReactNode> = {
  actions: bySlug.button,
  display: bySlug.card,
  feedback: bySlug.alert,
  forms: bySlug.input,
  layout: () => (
    <Frame>
      <rect x="26" y="16" width="58" height="56" rx="7" fill={surface} stroke={muted} />
      <rect x="94" y="16" width="60" height="24" rx="7" fill={surface} stroke={muted} />
      <rect
        x="94"
        y="48"
        width="60"
        height="24"
        rx="7"
        fill={accent}
        fillOpacity="0.16"
        stroke={muted}
      />
    </Frame>
  ),
  navigation: bySlug.tabs,
  overlays: bySlug.popover,
};

export function ComponentThumbnail({ slug, category }: { slug: string; category: string }) {
  const render = bySlug[slug] ?? byCategory[category] ?? bySlug.card;
  return render();
}