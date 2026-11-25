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
  'aspect-ratio': () => (
    <Frame>
      <rect x="26" y="16" width="128" height="56" rx="8" fill={surface} stroke={muted} />
      <line x1="30" y1="20" x2="150" y2="68" stroke={muted} strokeDasharray="3 3" />
      <line x1="150" y1="20" x2="30" y2="68" stroke={muted} strokeDasharray="3 3" />
      <rect x="68" y="34" width="44" height="20" rx="6" fill={accent} />
      <rect x="77" y="42" width="10" height="4" rx="2" fill={surface} />
      <circle cx="90" cy="44" r="1.4" fill={surface} />
      <rect x="94" y="42" width="9" height="4" rx="2" fill={surface} />
    </Frame>
  ),
  bleed: () => (
    <Frame>
      <line x1="46" y1="12" x2="46" y2="76" stroke={muted} strokeDasharray="3 3" />
      <line x1="134" y1="12" x2="134" y2="76" stroke={muted} strokeDasharray="3 3" />
      <rect x="54" y="16" width="72" height="10" rx="4" fill={surface} stroke={muted} />
      <rect
        x="18"
        y="33"
        width="144"
        height="22"
        rx="6"
        fill={accent}
        fillOpacity="0.16"
        stroke={accent}
        strokeWidth="1.4"
      />
      <path
        d="M30 44h-6m0 0 3-3m-3 3 3 3"
        stroke={accent}
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M150 44h6m0 0-3-3m3 3-3 3" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="54" y="62" width="72" height="10" rx="4" fill={surface} stroke={muted} />
    </Frame>
  ),
  collapsible: () => (
    <Frame>
      <rect x="26" y="14" width="128" height="22" rx="7" fill={surface} stroke={muted} />
      <rect x="36" y="23" width="60" height="4" rx="2" fill={stroke} />
      <path
        d="M138 23l4 4 4-4"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="26" y="42" width="128" height="32" rx="7" fill={surface} stroke={muted} />
      <rect x="34" y="50" width="3" height="16" rx="1.5" fill={accent} />
      <rect x="44" y="52" width="82" height="4" rx="2" fill={textMuted} />
      <rect x="44" y="61" width="58" height="4" rx="2" fill={textMuted} fillOpacity="0.55" />
    </Frame>
  ),
  container: () => (
    <Frame>
      <rect x="16" y="14" width="148" height="60" rx="8" fill={muted} fillOpacity="0.22" />
      <line
        x1="42"
        y1="14"
        x2="42"
        y2="74"
        stroke={accent}
        strokeOpacity="0.5"
        strokeDasharray="3 3"
      />
      <line
        x1="138"
        y1="14"
        x2="138"
        y2="74"
        stroke={accent}
        strokeOpacity="0.5"
        strokeDasharray="3 3"
      />
      <rect x="44" y="20" width="92" height="48" rx="6" fill={surface} stroke={muted} />
      <rect x="54" y="30" width="52" height="5" rx="2.5" fill={stroke} />
      <rect x="54" y="41" width="72" height="4" rx="2" fill={textMuted} />
      <rect x="54" y="50" width="60" height="4" rx="2" fill={textMuted} fillOpacity="0.6" />
    </Frame>
  ),
  'date-input': () => (
    <Frame>
      <rect x="22" y="28" width="136" height="32" rx="8" fill={surface} stroke={muted} />
      <rect x="32" y="36" width="22" height="16" rx="4" fill={muted} fillOpacity="0.45" />
      <rect x="37" y="42" width="12" height="4" rx="2" fill={textMuted} />
      <line x1="59" y1="49" x2="63" y2="39" stroke={textMuted} strokeWidth="1.3" />
      <rect x="67" y="36" width="22" height="16" rx="4" fill={accent} />
      <rect x="72" y="42" width="12" height="4" rx="2" fill={surface} />
      <line x1="94" y1="49" x2="98" y2="39" stroke={textMuted} strokeWidth="1.3" />
      <rect x="102" y="36" width="32" height="16" rx="4" fill={muted} fillOpacity="0.45" />
      <rect x="108" y="42" width="20" height="4" rx="2" fill={textMuted} />
      <rect x="140" y="38" width="11" height="11" rx="2.5" stroke={textMuted} strokeWidth="1.3" />
      <line x1="140" y1="42" x2="151" y2="42" stroke={textMuted} strokeWidth="1.2" />
    </Frame>
  ),
  editable: () => (
    <Frame>
      <rect
        x="24"
        y="28"
        width="96"
        height="32"
        rx="8"
        fill={surface}
        stroke={accent}
        strokeWidth="1.5"
        strokeDasharray="4 2.5"
      />
      <rect x="36" y="42" width="54" height="4.5" rx="2.25" fill={stroke} />
      <line x1="94" y1="36" x2="94" y2="52" stroke={accent} strokeWidth="1.5" />
      <rect x="126" y="31" width="26" height="26" rx="7" fill={accent} />
      <path
        d="M134 44l3.5 3.5L144 41"
        stroke={surface}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  ),
  empty: () => (
    <Frame>
      <rect
        x="30"
        y="12"
        width="120"
        height="64"
        rx="10"
        fill={surface}
        stroke={muted}
        strokeDasharray="4 3"
      />
      <circle cx="90" cy="30" r="9" fill={muted} fillOpacity="0.45" />
      <circle cx="90" cy="30" r="3.5" stroke={textMuted} strokeWidth="1.4" />
      <rect x="64" y="45" width="52" height="4" rx="2" fill={stroke} />
      <rect x="54" y="53" width="72" height="3.5" rx="1.75" fill={textMuted} fillOpacity="0.65" />
      <rect x="74" y="61" width="32" height="9" rx="4.5" fill={accent} />
    </Frame>
  ),
  field: () => (
    <Frame>
      <rect x="28" y="16" width="46" height="4.5" rx="2.25" fill={stroke} />
      <circle cx="79" cy="18" r="2" fill={accent} />
      <rect
        x="28"
        y="27"
        width="124"
        height="28"
        rx="7"
        fill={surface}
        stroke={accent}
        strokeWidth="1.5"
      />
      <rect x="38" y="39" width="58" height="4" rx="2" fill={textMuted} />
      <rect x="28" y="62" width="84" height="3.5" rx="1.75" fill={textMuted} fillOpacity="0.65" />
    </Frame>
  ),
  fieldset: () => (
    <Frame>
      <rect x="22" y="18" width="136" height="58" rx="9" fill={surface} stroke={muted} />
      <rect x="34" y="12" width="46" height="12" rx="4" fill={surface} />
      <rect x="38" y="16" width="38" height="4" rx="2" fill={stroke} />
      <rect x="34" y="30" width="112" height="16" rx="5" fill={muted} fillOpacity="0.35" />
      <rect x="42" y="36" width="46" height="4" rx="2" fill={textMuted} />
      <rect x="34" y="51" width="112" height="16" rx="5" fill={muted} fillOpacity="0.35" />
      <rect x="42" y="57" width="64" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  'floating-panel': () => (
    <Frame>
      <rect
        x="30"
        y="12"
        width="120"
        height="64"
        rx="9"
        fill={surface}
        stroke={muted}
        strokeWidth="1.4"
      />
      <rect x="31" y="13" width="118" height="18" rx="8" fill={muted} fillOpacity="0.35" />
      <line x1="31" y1="31" x2="149" y2="31" stroke={muted} />
      <rect x="42" y="20" width="42" height="4" rx="2" fill={stroke} />
      <circle cx="130" cy="22" r="2.2" fill={textMuted} />
      <circle cx="140" cy="22" r="2.2" fill={accent} />
      <rect x="42" y="40" width="76" height="4" rx="2" fill={textMuted} />
      <rect x="42" y="50" width="58" height="4" rx="2" fill={textMuted} fillOpacity="0.6" />
      <path d="M138 71l7-7M142 71l3-3" stroke={accent} strokeWidth="1.4" strokeLinecap="round" />
    </Frame>
  ),
  heading: () => (
    <Frame>
      <text
        x="30"
        y="50"
        fill={accent}
        fontSize="28"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        Aa
      </text>
      <rect x="76" y="26" width="74" height="8" rx="4" fill={stroke} />
      <rect x="76" y="42" width="56" height="6" rx="3" fill={textMuted} />
      <rect x="76" y="55" width="42" height="4" rx="2" fill={textMuted} fillOpacity="0.55" />
    </Frame>
  ),
  highlight: () => (
    <Frame>
      <rect x="24" y="24" width="38" height="6" rx="3" fill={textMuted} />
      <rect x="66" y="20" width="56" height="14" rx="4" fill={accent} fillOpacity="0.25" />
      <rect x="72" y="24" width="44" height="6" rx="3" fill={accent} />
      <rect x="126" y="24" width="30" height="6" rx="3" fill={textMuted} />
      <rect x="24" y="43" width="84" height="5" rx="2.5" fill={textMuted} fillOpacity="0.6" />
      <rect x="114" y="39" width="42" height="13" rx="4" fill={accent} fillOpacity="0.25" />
      <rect x="120" y="43" width="30" height="5" rx="2.5" fill={accent} />
      <rect x="24" y="60" width="102" height="5" rx="2.5" fill={textMuted} fillOpacity="0.45" />
    </Frame>
  ),
  'hover-card': () => (
    <Frame>
      <rect x="38" y="10" width="112" height="46" rx="9" fill={surface} stroke={muted} />
      <circle cx="56" cy="28" r="9" fill={accent} fillOpacity="0.22" />
      <circle cx="56" cy="28" r="4" fill={accent} />
      <rect x="72" y="22" width="54" height="4.5" rx="2.25" fill={stroke} />
      <rect x="72" y="31" width="66" height="3.5" rx="1.75" fill={textMuted} />
      <rect x="48" y="44" width="86" height="3.5" rx="1.75" fill={textMuted} fillOpacity="0.55" />
      <rect x="44" y="64" width="50" height="5" rx="2.5" fill={accent} />
      <line x1="44" y1="73" x2="94" y2="73" stroke={accent} strokeDasharray="3 2" />
    </Frame>
  ),
  image: () => (
    <Frame>
      <rect x="32" y="14" width="116" height="60" rx="9" fill={surface} stroke={muted} />
      <circle cx="62" cy="32" r="7" fill={accent} fillOpacity="0.3" />
      <circle cx="62" cy="32" r="3.5" fill={accent} />
      <path
        d="M42 64l26-22 18 14 20-18 32 26H42z"
        fill={muted}
        fillOpacity="0.55"
        stroke={textMuted}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </Frame>
  ),
  'image-cropper': () => (
    <Frame>
      <rect x="28" y="14" width="124" height="60" rx="8" fill={muted} fillOpacity="0.32" />
      <rect x="52" y="22" width="76" height="44" fill={surface} stroke={accent} strokeWidth="1.5" />
      <line x1="77" y1="22" x2="77" y2="66" stroke={muted} strokeDasharray="2 2" />
      <line x1="103" y1="22" x2="103" y2="66" stroke={muted} strokeDasharray="2 2" />
      <line x1="52" y1="37" x2="128" y2="37" stroke={muted} strokeDasharray="2 2" />
      <line x1="52" y1="51" x2="128" y2="51" stroke={muted} strokeDasharray="2 2" />
      <path
        d="M49 30v-11h11M131 30v-11h-11M49 58v11h11M131 58v11h-11"
        stroke={accent}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Frame>
  ),
  'json-tree-view': () => (
    <Frame>
      <rect x="24" y="12" width="132" height="64" rx="8" fill={surface} stroke={muted} />
      <text x="34" y="28" fill={textMuted} fontSize="11" fontFamily="monospace">
        {'{'}
      </text>
      <rect x="44" y="21" width="24" height="4" rx="2" fill={accent} />
      <rect x="74" y="21" width="38" height="4" rx="2" fill={textMuted} />
      <path d="M40 38l3 3 3-3" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
      <rect x="52" y="37" width="30" height="4" rx="2" fill={accent} />
      <rect x="88" y="37" width="26" height="4" rx="2" fill={stroke} />
      <line x1="46" y1="45" x2="46" y2="62" stroke={muted} />
      <rect x="56" y="51" width="26" height="4" rx="2" fill={accent} fillOpacity="0.7" />
      <rect x="88" y="51" width="44" height="4" rx="2" fill={textMuted} fillOpacity="0.7" />
      <text x="34" y="69" fill={textMuted} fontSize="11" fontFamily="monospace">
        {'}'}
      </text>
    </Frame>
  ),
  lightbox: () => (
    <Frame>
      <rect
        x="18"
        y="10"
        width="144"
        height="68"
        rx="9"
        fill={stroke}
        fillOpacity="0.1"
        stroke={muted}
      />
      <rect x="46" y="18" width="88" height="44" rx="6" fill={surface} stroke={muted} />
      <path d="M58 54l16-14 14 11 14-12 20 15H58z" fill={accent} fillOpacity="0.28" />
      <path d="M34 36l-5 5 5 5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M146 36l5 5-5 5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M146 17l5 5m0-5-5 5" stroke={textMuted} strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="80" cy="70" r="2.2" fill={textMuted} />
      <circle cx="90" cy="70" r="2.6" fill={accent} />
      <circle cx="100" cy="70" r="2.2" fill={textMuted} />
    </Frame>
  ),
  list: () => (
    <Frame>
      <rect x="26" y="14" width="128" height="60" rx="8" fill={surface} stroke={muted} />
      {[26, 44, 62].map((y, index) => (
        <g key={y}>
          <circle cx="40" cy={y} r="3.5" fill={index === 0 ? accent : textMuted} />
          <rect
            x="52"
            y={y - 2.5}
            width={index === 1 ? 66 : 82}
            height="5"
            rx="2.5"
            fill={index === 0 ? stroke : textMuted}
          />
          {index < 2 ? <line x1="36" y1={y + 9} x2="144" y2={y + 9} stroke={muted} /> : null}
        </g>
      ))}
    </Frame>
  ),
  listbox: () => (
    <Frame>
      <rect x="30" y="12" width="120" height="64" rx="8" fill={surface} stroke={muted} />
      <rect x="36" y="18" width="108" height="14" rx="4" fill={accent} fillOpacity="0.16" />
      <rect x="44" y="23" width="54" height="4" rx="2" fill={accent} />
      <path d="M130 25l2.5 2.5 4.5-4.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="44" y="39" width="66" height="4" rx="2" fill={textMuted} />
      <rect x="36" y="48" width="108" height="14" rx="4" fill={accent} fillOpacity="0.16" />
      <rect x="44" y="53" width="48" height="4" rx="2" fill={accent} />
      <path d="M130 55l2.5 2.5 4.5-4.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="44" y="67" width="60" height="4" rx="2" fill={textMuted} fillOpacity="0.6" />
    </Frame>
  ),
  marquee: () => (
    <Frame>
      <rect
        x="8"
        y="28"
        width="38"
        height="32"
        rx="7"
        fill={surface}
        stroke={muted}
        strokeOpacity="0.5"
      />
      <rect x="54" y="28" width="48" height="32" rx="7" fill={surface} stroke={muted} />
      <rect x="64" y="42" width="28" height="4" rx="2" fill={textMuted} />
      <rect
        x="110"
        y="28"
        width="48"
        height="32"
        rx="7"
        fill={accent}
        fillOpacity="0.15"
        stroke={accent}
      />
      <rect x="120" y="42" width="28" height="4" rx="2" fill={accent} />
      <rect
        x="166"
        y="28"
        width="24"
        height="32"
        rx="7"
        fill={surface}
        stroke={muted}
        strokeOpacity="0.5"
      />
      <path
        d="M74 70h32m0 0-4-3.5m4 3.5-4 3.5"
        stroke={textMuted}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </Frame>
  ),
  'native-select': () => (
    <Frame>
      <rect x="26" y="28" width="128" height="32" rx="8" fill={surface} stroke={muted} />
      <rect x="38" y="42" width="64" height="4.5" rx="2.25" fill={stroke} />
      <line x1="126" y1="30" x2="126" y2="58" stroke={muted} />
      <path
        d="M136 41l4-4 4 4M136 47l4 4 4-4"
        stroke={accent}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Frame>
  ),
  'navigation-menu': () => (
    <Frame>
      <rect x="20" y="12" width="140" height="20" rx="6" fill={surface} stroke={muted} />
      <rect x="30" y="20" width="26" height="4" rx="2" fill={accent} />
      <rect x="66" y="20" width="26" height="4" rx="2" fill={textMuted} />
      <rect x="102" y="20" width="26" height="4" rx="2" fill={textMuted} />
      <rect x="26" y="38" width="114" height="38" rx="8" fill={surface} stroke={muted} />
      <rect x="34" y="46" width="44" height="10" rx="4" fill={accent} fillOpacity="0.16" />
      <rect x="34" y="60" width="44" height="8" rx="4" fill={muted} fillOpacity="0.4" />
      <rect x="86" y="46" width="46" height="22" rx="5" fill={muted} fillOpacity="0.3" />
    </Frame>
  ),
  'number-input': () => (
    <Frame>
      <rect x="26" y="28" width="128" height="32" rx="8" fill={surface} stroke={muted} />
      <text x="42" y="49" fill={stroke} fontSize="14" fontWeight="600" fontFamily="monospace">
        42
      </text>
      <line x1="124" y1="29" x2="124" y2="59" stroke={muted} />
      <line x1="124" y1="44" x2="153" y2="44" stroke={muted} />
      <path d="M135 38l4-3.5 4 3.5" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M135 50l4 3.5 4-3.5" stroke={textMuted} strokeWidth="1.5" strokeLinecap="round" />
    </Frame>
  ),
  'password-input': () => (
    <Frame>
      <rect x="24" y="28" width="132" height="32" rx="8" fill={surface} stroke={muted} />
      {[38, 50, 62, 74, 86, 98].map((cx) => (
        <circle key={cx} cx={cx} cy="44" r="3.2" fill={stroke} />
      ))}
      <path
        d="M126 44c3.5-5 12.5-5 16 0-3.5 5-12.5 5-16 0z"
        stroke={accent}
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="134" cy="44" r="2.2" fill={accent} />
    </Frame>
  ),
  'qr-code': () => (
    <Frame>
      <rect x="58" y="12" width="64" height="64" rx="8" fill={surface} stroke={muted} />
      <rect x="66" y="20" width="16" height="16" rx="2.5" stroke={stroke} strokeWidth="2.2" />
      <rect x="71" y="25" width="6" height="6" rx="1" fill={accent} />
      <rect x="98" y="20" width="16" height="16" rx="2.5" stroke={stroke} strokeWidth="2.2" />
      <rect x="103" y="25" width="6" height="6" rx="1" fill={stroke} />
      <rect x="66" y="52" width="16" height="16" rx="2.5" stroke={stroke} strokeWidth="2.2" />
      <rect x="71" y="57" width="6" height="6" rx="1" fill={stroke} />
      <rect x="88" y="22" width="5" height="5" rx="1" fill={textMuted} />
      <rect x="88" y="32" width="5" height="12" rx="1" fill={stroke} />
      <rect x="68" y="42" width="12" height="5" rx="1" fill={stroke} />
      <rect x="98" y="42" width="14" height="5" rx="1" fill={accent} />
      <rect x="88" y="52" width="10" height="5" rx="1" fill={stroke} />
      <rect x="103" y="52" width="10" height="15" rx="1.5" fill={stroke} />
      <rect x="88" y="62" width="10" height="5" rx="1" fill={accent} />
    </Frame>
  ),
  'scroll-area': () => (
    <Frame>
      <rect x="26" y="14" width="128" height="60" rx="8" fill={surface} stroke={muted} />
      <rect x="36" y="24" width="84" height="5" rx="2.5" fill={stroke} />
      <rect x="36" y="36" width="96" height="4" rx="2" fill={textMuted} />
      <rect x="36" y="47" width="76" height="4" rx="2" fill={textMuted} fillOpacity="0.7" />
      <rect x="36" y="58" width="90" height="4" rx="2" fill={textMuted} fillOpacity="0.45" />
      <rect x="142" y="20" width="5" height="48" rx="2.5" fill={muted} />
      <rect x="142" y="24" width="5" height="22" rx="2.5" fill={accent} />
    </Frame>
  ),
  separator: () => (
    <Frame>
      <rect x="32" y="16" width="116" height="12" rx="4" fill={muted} fillOpacity="0.4" />
      <line x1="24" y1="42" x2="72" y2="42" stroke={muted} strokeWidth="1.5" />
      <rect x="78" y="36" width="24" height="12" rx="6" fill={accent} fillOpacity="0.18" />
      <rect x="84" y="40.5" width="12" height="3" rx="1.5" fill={accent} />
      <line x1="108" y1="42" x2="156" y2="42" stroke={muted} strokeWidth="1.5" />
      <rect x="32" y="56" width="50" height="14" rx="4" fill={surface} stroke={muted} />
      <line x1="90" y1="54" x2="90" y2="72" stroke={accent} strokeWidth="1.5" />
      <rect x="98" y="56" width="50" height="14" rx="4" fill={surface} stroke={muted} />
    </Frame>
  ),
  'simple-grid': () => (
    <Frame>
      {[24, 70, 116].map((x, col) =>
        [16, 48].map((y, row) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="40"
            height="24"
            rx="6"
            fill={col === 1 && row === 0 ? accent : surface}
            fillOpacity={col === 1 && row === 0 ? '0.18' : '1'}
            stroke={col === 1 && row === 0 ? accent : muted}
          />
        )),
      )}
    </Frame>
  ),
  splitter: () => (
    <Frame>
      <rect x="20" y="16" width="60" height="56" rx="8" fill={surface} stroke={muted} />
      <rect x="30" y="28" width="32" height="4" rx="2" fill={textMuted} />
      <rect x="30" y="38" width="40" height="4" rx="2" fill={textMuted} fillOpacity="0.55" />
      <rect x="87" y="28" width="6" height="32" rx="3" fill={accent} />
      <rect x="100" y="16" width="60" height="56" rx="8" fill={surface} stroke={muted} />
      <rect x="110" y="28" width="38" height="4" rx="2" fill={textMuted} />
      <rect x="110" y="38" width="28" height="4" rx="2" fill={textMuted} fillOpacity="0.55" />
    </Frame>
  ),
  stack: () => (
    <Frame>
      <line
        x1="32"
        y1="18"
        x2="32"
        y2="70"
        stroke={accent}
        strokeWidth="1.4"
        strokeDasharray="3 3"
      />
      {[16, 37, 58].map((y, index) => (
        <g key={y}>
          <circle cx="32" cy={y + 7} r="2.5" fill={accent} />
          <rect
            x="44"
            y={y}
            width="108"
            height="14"
            rx="5"
            fill={index === 0 ? accent : surface}
            fillOpacity={index === 0 ? '0.16' : '1'}
            stroke={index === 0 ? accent : muted}
          />
          <rect x="54" y={y + 5} width={54 - index * 8} height="4" rx="2" fill={textMuted} />
        </g>
      ))}
    </Frame>
  ),
  'table-of-contents': () => (
    <Frame>
      <line x1="40" y1="16" x2="40" y2="72" stroke={muted} strokeWidth="2" strokeLinecap="round" />
      <line
        x1="40"
        y1="30"
        x2="40"
        y2="46"
        stroke={accent}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <rect x="52" y="18" width="64" height="4.5" rx="2.25" fill={textMuted} />
      <rect x="52" y="35" width="84" height="5" rx="2.5" fill={accent} />
      <rect x="64" y="49" width="68" height="4" rx="2" fill={textMuted} fillOpacity="0.7" />
      <rect x="64" y="61" width="52" height="4" rx="2" fill={textMuted} fillOpacity="0.5" />
    </Frame>
  ),
  tag: () => (
    <Frame>
      <rect x="26" y="31" width="60" height="26" rx="13" fill={accent} />
      <rect x="38" y="42" width="24" height="4" rx="2" fill={surface} />
      <path d="M71 41l6 6m0-6-6 6" stroke={surface} strokeWidth="1.5" strokeLinecap="round" />
      <rect x="94" y="31" width="60" height="26" rx="13" fill={surface} stroke={muted} />
      <rect x="106" y="42" width="24" height="4" rx="2" fill={stroke} />
      <path d="M139 41l6 6m0-6-6 6" stroke={textMuted} strokeWidth="1.5" strokeLinecap="round" />
    </Frame>
  ),
  text: () => (
    <Frame>
      <rect x="26" y="20" width="112" height="6" rx="3" fill={stroke} />
      <rect x="26" y="34" width="128" height="4.5" rx="2.25" fill={textMuted} />
      <rect x="26" y="46" width="120" height="4.5" rx="2.25" fill={textMuted} fillOpacity="0.75" />
      <rect x="26" y="58" width="84" height="4.5" rx="2.25" fill={textMuted} fillOpacity="0.5" />
    </Frame>
  ),
  timer: () => (
    <Frame>
      <rect x="34" y="20" width="44" height="36" rx="8" fill={surface} stroke={muted} />
      <text x="45" y="44" fill={stroke} fontSize="16" fontWeight="700" fontFamily="monospace">
        04
      </text>
      <circle cx="90" cy="33" r="2.2" fill={accent} />
      <circle cx="90" cy="43" r="2.2" fill={accent} />
      <rect x="102" y="20" width="44" height="36" rx="8" fill={surface} stroke={accent} />
      <text x="113" y="44" fill={accent} fontSize="16" fontWeight="700" fontFamily="monospace">
        28
      </text>
      <rect x="66" y="64" width="48" height="8" rx="4" fill={muted} fillOpacity="0.5" />
      <rect x="66" y="64" width="28" height="8" rx="4" fill={accent} />
    </Frame>
  ),
  toggle: () => (
    <Frame>
      <rect x="52" y="26" width="34" height="36" rx="9" fill={accent} />
      <path
        d="M65 38h6a4 4 0 0 1 0 6h-6v-6zm0 6h7a4 4 0 0 1 0 6h-7v-6z"
        stroke={surface}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="94" y="26" width="34" height="36" rx="9" fill={surface} stroke={muted} />
      <path
        d="M108 38h8m-4 0-3 12m-3 0h8"
        stroke={textMuted}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </Frame>
  ),
  'toggle-group': () => (
    <Frame>
      <rect x="34" y="28" width="112" height="32" rx="8" fill={surface} stroke={muted} />
      <rect x="36" y="30" width="36" height="28" rx="6" fill={accent} />
      <rect x="46" y="42" width="16" height="4" rx="2" fill={surface} />
      <line x1="74" y1="32" x2="74" y2="56" stroke={muted} />
      <rect x="82" y="42" width="16" height="4" rx="2" fill={textMuted} />
      <line x1="108" y1="32" x2="108" y2="56" stroke={muted} />
      <rect x="118" y="42" width="16" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  tour: () => (
    <Frame>
      <rect x="16" y="12" width="148" height="64" rx="9" fill={stroke} fillOpacity="0.08" />
      <rect
        x="24"
        y="24"
        width="44"
        height="22"
        rx="6"
        fill={surface}
        stroke={accent}
        strokeWidth="1.8"
      />
      <rect x="34" y="33" width="24" height="4" rx="2" fill={accent} />
      <rect x="78" y="18" width="76" height="48" rx="8" fill={surface} stroke={muted} />
      <rect x="88" y="26" width="18" height="4" rx="2" fill={accent} />
      <rect x="88" y="35" width="54" height="4" rx="2" fill={stroke} />
      <rect x="88" y="43" width="44" height="3.5" rx="1.75" fill={textMuted} />
      <rect x="122" y="52" width="22" height="8" rx="4" fill={accent} />
    </Frame>
  ),
  'tree-view': () => (
    <Frame>
      <rect x="26" y="12" width="128" height="64" rx="8" fill={surface} stroke={muted} />
      <path d="M38 24l3 3 3-3" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <rect x="50" y="23" width="46" height="4.5" rx="2.25" fill={stroke} />
      <line x1="41" y1="30" x2="41" y2="62" stroke={muted} />
      <line x1="41" y1="41" x2="52" y2="41" stroke={muted} />
      <rect x="52" y="34" width="90" height="14" rx="4" fill={accent} fillOpacity="0.16" />
      <rect x="58" y="39" width="56" height="4" rx="2" fill={accent} />
      <line x1="41" y1="60" x2="52" y2="60" stroke={muted} />
      <rect x="58" y="58" width="48" height="4" rx="2" fill={textMuted} />
    </Frame>
  ),
  typeset: () => (
    <Frame>
      <rect x="24" y="12" width="132" height="64" rx="8" fill={surface} stroke={muted} />
      <rect x="36" y="21" width="64" height="6" rx="3" fill={stroke} />
      <rect x="36" y="33" width="3" height="14" rx="1.5" fill={accent} />
      <rect x="45" y="35" width="84" height="3.5" rx="1.75" fill={textMuted} />
      <rect x="45" y="42" width="62" height="3.5" rx="1.75" fill={textMuted} fillOpacity="0.65" />
      <rect x="36" y="55" width="36" height="10" rx="4" fill={muted} fillOpacity="0.55" />
      <rect x="78" y="58" width="62" height="4" rx="2" fill={textMuted} fillOpacity="0.6" />
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