import { useI18n } from '@rspress/core/runtime';
import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { type CssControls, CustomizePanel, type Overrides } from './customize';
import styles from './inspector.module.css';
import { type CssPropertyInput, normalizeCssProperties, renderInlineCode } from './reference';

// Anatomy and CSS variables share one pattern: a live scene above a list of rows. Hovering,
// focusing or tapping a row outlines the matching element in the scene and labels it.

type Measure = 'padding-x' | 'padding-y' | 'width' | 'height';

type Target = {
  /** `data-slot` of the element to outline; the first slotted element when omitted. */
  slot?: string;
  label: string;
  measure?: Measure;
};

type Box = { top: number; left: number; width: number; height: number };

// The outline sits 4px outside the element plus its 1.5px border; rulers clear the outline.
const outlineGap = 5.5;
const rulerGap = 20;

type Overlay = Box & { label: string; measure?: Measure; padding: [number, number] };

function findElement(scene: HTMLElement, slot?: string) {
  return scene.querySelector<HTMLElement>(slot ? `[data-slot="${slot}"]` : '[data-slot]');
}

function Scene({
  children,
  target,
  style,
}: {
  children: ReactNode;
  target: Target | null;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [overlay, setOverlay] = useState<Overlay | null>(null);

  // Overlays settle after the row is activated (popover positioning, panel animations, scrolling),
  // so the box is measured every frame while a row is active and stored only when it changes.
  useLayoutEffect(() => {
    let frame = 0;
    let last = '';
    const measure = () => {
      const scene = ref.current;
      const element = scene && target ? findElement(scene, target.slot) : null;
      const rect = element?.getBoundingClientRect();
      let next: Overlay | null = null;
      // Closed or hidden parts have no box to outline.
      if (scene && target && element && rect && (rect.width || rect.height)) {
        const sceneRect = scene.getBoundingClientRect();
        const style = getComputedStyle(element);
        const vertical = target.measure === 'padding-y';
        next = {
          top: rect.top - sceneRect.top,
          left: rect.left - sceneRect.left,
          width: rect.width,
          height: rect.height,
          label: target.label,
          measure: target.measure,
          padding: [
            parseFloat(vertical ? style.paddingTop : style.paddingLeft),
            parseFloat(vertical ? style.paddingBottom : style.paddingRight),
          ],
        };
      }
      const key = JSON.stringify(next);
      if (key !== last) {
        last = key;
        setOverlay(next);
      }
      if (target) frame = requestAnimationFrame(measure);
    };
    measure();
    return () => cancelAnimationFrame(frame);
  }, [target?.slot, target?.label, target?.measure]);

  return (
    <div ref={ref} className={styles.scene}>
      {/* A static picture of the live example above: inert keeps open overlays from taking focus. */}
      <div className={styles.stage} inert style={style}>
        {children}
      </div>
      {overlay ? <SceneOverlay overlay={overlay} /> : null}
    </div>
  );
}

function SceneOverlay({ overlay }: { overlay: Overlay }) {
  const { top, left, width, height, label, measure, padding } = overlay;

  if (measure === 'padding-x' || measure === 'padding-y') {
    const vertical = measure === 'padding-y';
    const [start, end] = padding;
    const areas = vertical
      ? [
          { top, left, width, height: start },
          { top: top + height - end, left, width, height: end },
        ]
      : [
          { top, left, width: start, height },
          { top, left: left + width - end, width: end, height },
        ];

    return (
      <div className={styles.overlay} aria-hidden="true">
        {areas.map((area, index) => (
          <span
            key={index}
            className={styles.padding}
            data-edge={index ? 'end' : 'start'}
            data-vertical={vertical ? '' : undefined}
            style={area}
          />
        ))}
        {vertical
          ? null
          : areas.map((area, index) => (
              <span
                key={index}
                className={styles.dimension}
                style={{ top: top + height + 6, left: area.left, width: area.width }}
              />
            ))}
        <span
          className={styles.label}
          style={{ top: top + height + (vertical ? 8 : 22), left: left + width / 2 }}
          data-align="center"
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={styles.overlay} aria-hidden="true">
      <span
        className={styles.outline}
        style={{
          top: top - outlineGap,
          left: left - outlineGap,
          width: width + outlineGap * 2,
          height: height + outlineGap * 2,
        }}
      />
      {measure === 'width' ? (
        <span className={styles.dimension} style={{ top: top - rulerGap, left, width }} />
      ) : null}
      {measure === 'height' ? (
        <span
          className={styles.dimension}
          data-vertical=""
          style={{ top, left: left - rulerGap, height }}
        />
      ) : null}
      <span
        className={styles.label}
        style={
          measure === 'width'
            ? { top: top - rulerGap - 11, left: left + width / 2 }
            : { top: Math.max(top - 32, 4), left }
        }
        data-align={measure === 'width' ? 'center' : undefined}
      >
        {label}
      </span>
    </div>
  );
}

/** One row per part: [name, data-slot or null when the part renders no element, role, depth]. */
type AnatomyPart = readonly [name: string, slot: string | null, role: ReactNode, depth?: number];

// Tree branches drawn from depths: `│` keeps an ancestor's line going, `├─`/`└─` closes a row.
function branches(parts: readonly AnatomyPart[]) {
  const depths = parts.map((part) => part[3] ?? 0);
  const hasNextSibling = (index: number, depth: number) => {
    for (let next = index + 1; next < depths.length; next++) {
      if (depths[next] < depth) return false;
      if (depths[next] === depth) return true;
    }
    return false;
  };

  return depths.map((depth, index) => {
    if (depth === 0) return '';
    let prefix = '';
    for (let level = 1; level < depth; level++) {
      let ancestor = index;
      while (depths[ancestor] !== level) ancestor--;
      prefix += hasNextSibling(ancestor, level) ? '│  ' : '   ';
    }
    return `${prefix}${hasNextSibling(index, depth) ? '├─ ' : '└─ '}`;
  });
}

function AnatomyInspector({
  children,
  note,
  parts,
}: {
  children: ReactNode;
  note?: ReactNode;
  parts: readonly AnatomyPart[];
}) {
  const t = useI18n<typeof import('i18n')>();
  const [active, setActive] = useState<string | null>(null);
  const activePart = parts.find((part) => part[0] === active);
  const tree = branches(parts);

  if (import.meta.env.SSG_MD) {
    const lines = parts.map(([name], index) => `${tree[index]}${name}`).join('\n');
    const rows = parts.map(([name, , role]) => `| \`${name}\` | ${String(role)} |`).join('\n');
    return `\n\`\`\`text\n${lines}\n\`\`\`\n\n| ${t('anatomyPart')} | ${t('anatomyRole')} |\n| --- | --- |\n${rows}\n`;
  }

  return (
    <div className={`rp-not-doc ${styles.inspector}`} onMouseLeave={() => setActive(null)}>
      <Scene target={activePart?.[1] ? { slot: activePart[1], label: activePart[1] } : null}>
        {children}
      </Scene>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{t('anatomyPart')}</th>
            <th>{t('anatomyRole')}</th>
          </tr>
        </thead>
        <tbody>
          {parts.map(([name, slot, role], index) => (
            <tr
              key={name}
              data-active={active === name ? '' : undefined}
              data-part-slot={slot || undefined}
              onMouseEnter={() => setActive(name)}
            >
              <td>
                <button
                  type="button"
                  className={styles.rowButton}
                  onFocus={() => setActive(name)}
                  onClick={() => setActive(name)}
                >
                  {tree[index] ? <span className={styles.branch}>{tree[index]}</span> : null}
                  <code className={styles.name}>{name}</code>
                  {slot ? null : <span className={styles.muted}>{t('anatomyNoElement')}</span>}
                </button>
              </td>
              <td className={styles.role}>
                {typeof role === 'string' ? renderInlineCode(role) : role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {note ? <p className={styles.note}>{note}</p> : null}
    </div>
  );
}

type Group = 'color' | 'size' | 'typography' | 'shape' | 'other';

const groupLabels = {
  color: 'cssGroupColor',
  size: 'cssGroupSize',
  typography: 'cssGroupTypography',
  shape: 'cssGroupShape',
  other: 'cssGroupOther',
} as const;

// Groups by the part of the name after the component prefix, so `color-picker-width` is a size.
function groupOf(suffix: string): Group {
  if (/(font|line-height|letter-spacing|leading)/.test(suffix)) return 'typography';
  if (/(radius|border-width|border-style|shadow)/.test(suffix)) return 'shape';
  if (/(width|height|size|thickness|offset)$/.test(suffix)) return 'size';
  if (/(^|-)(bg|color|fill|foreground|stroke|backdrop|overlay|opacity)(-|$)/.test(suffix)) {
    return 'color';
  }
  if (/(width|height|size|padding|gap|margin|inset|spacing|indent|gutter|flow)/.test(suffix)) {
    return 'size';
  }
  return 'other';
}

function measureOf(suffix: string): Measure | undefined {
  if (/padding-(x|inline)$/.test(suffix)) return 'padding-x';
  if (/padding-(y|block)$/.test(suffix)) return 'padding-y';
  if (/(^|-)(min-|max-)?width$/.test(suffix) && !suffix.endsWith('border-width')) return 'width';
  if (/(^|-)(min-|max-)?height$/.test(suffix)) return 'height';
  return undefined;
}

function commonPrefix(names: string[]) {
  if (names.length < 2) return names[0]?.replace(/[^-]+$/, '') ?? '';
  let prefix = names[0];
  for (const name of names) while (!name.startsWith(prefix)) prefix = prefix.slice(0, -1);
  return prefix.slice(0, prefix.lastIndexOf('-') + 1);
}

// `var(--moduix-spacing-4)` reads better as the token name alone.
function displayValue(value: string) {
  return value.match(/^var\((--[\w-]+)\)$/)?.[1] ?? value;
}

// Resolves a variable inside its element. Components read `var(--moduix-x, var(--_x))`, where the
// private `--_x` holds the variant or size default, so a probe resolves the same chain.
function resolveValue(element: HTMLElement, name: string, fallback: string) {
  const probe = document.createElement('span');
  // Neutral box so styles of the part's children (max-width, padding) cannot skew the size.
  probe.style.cssText =
    'all:initial;position:absolute;display:block;visibility:hidden;max-width:none;min-width:0';
  probe.style.setProperty(
    '--inspector-value',
    `var(${name}, var(${name.replace('--moduix-', '--_')}, ${fallback}))`,
  );
  element.append(probe);
  const value = getComputedStyle(probe).getPropertyValue('--inspector-value').trim();
  let result: { value: string; text?: string } = { value, text: value || undefined };
  if (!value || CSS.supports('color', value)) {
    result = { value };
  } else if (CSS.supports('width', value)) {
    probe.style.width = value;
    // Layout width, not the painted box: entering overlays are still scaled by their animation.
    result = { value, text: `${probe.offsetWidth}px` };
  }
  probe.remove();
  return result;
}

type Resolved = Record<string, { value: string; text?: string; slot?: string }>;

// The part a variable belongs to when the data does not name it: the longest data-slot that starts
// its name (`--moduix-accordion-item-gap` → `accordion-item`), else the content, else the root.
function slotFor(scene: HTMLElement, name: string, prefix: string) {
  const slots = [
    ...new Set(
      [...scene.querySelectorAll<HTMLElement>('[data-slot]')].map((el) => el.dataset.slot),
    ),
  ].filter((slot): slot is string => !!slot);
  const bare = name.replace(/^--moduix-/, '');
  const component = prefix.replace(/^--moduix-/, '').replace(/-$/, '');
  const match = slots
    .filter((slot) => bare.startsWith(`${slot}-`))
    .sort((a, b) => b.length - a.length)[0];
  return (
    match ??
    slots.find((slot) => slot === `${component}-content`) ??
    slots.find((slot) => slot === `${component}-root`)
  );
}

function CssVariablesInspector({
  children,
  properties,
  controls,
}: {
  children?: ReactNode;
  properties: CssPropertyInput[];
  controls?: CssControls;
}) {
  const t = useI18n<typeof import('i18n')>();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [resolved, setResolved] = useState<Resolved>({});
  const [overrides, setOverrides] = useState<Overrides>({});
  const rows = normalizeCssProperties(properties);
  const prefix = commonPrefix(rows.map((row) => row.name));
  const groups = new Map<Group, typeof rows>();
  for (const row of rows) {
    const group = rows.length > 1 ? groupOf(row.name.slice(prefix.length)) : 'other';
    groups.set(group, [...(groups.get(group) ?? []), row]);
  }
  const ordered = (['color', 'size', 'typography', 'shape', 'other'] as const).filter((group) =>
    groups.has(group),
  );
  const showGroups = ordered.length > 1;

  if (import.meta.env.SSG_MD) {
    const lines = rows
      .map(
        (row) => `| \`${row.name}\` | \`${row.defaultValue}\` | ${String(row.description ?? '')} |`,
      )
      .join('\n');
    return `\n| ${t('cssProperty')} | ${t('cssDefault')} | ${t('cssDescription')} |\n| --- | --- | --- |\n${lines}\n`;
  }
  const activeRow = rows.find((row) => row.name === active);

  // Values follow the live theme, so they are read again whenever the reader enters the table.
  const resolve = () => {
    const scene = rootRef.current;
    if (!children || !scene) return;
    const next: Resolved = {};
    for (const row of rows) {
      const slot = row.part ?? slotFor(scene, row.name, prefix);
      const element = findElement(scene, slot);
      // Customized variables keep the value read before the change.
      if (row.name in overrides && resolved[row.name]) {
        next[row.name] = resolved[row.name];
      } else if (element && !row.defaultValue.includes('`')) {
        next[row.name] = { ...resolveValue(element, row.name, row.defaultValue), slot };
      } else {
        next[row.name] = { value: '', slot };
      }
    }
    setResolved(next);
  };

  useLayoutEffect(resolve, []);

  const target = (() => {
    if (!activeRow || !children) return null;
    const suffix = activeRow.name.slice(prefix.length);
    const text = resolved[activeRow.name]?.text;
    return {
      slot: activeRow.part ?? resolved[activeRow.name]?.slot,
      label: text ? `${suffix} ${text}` : suffix,
      measure: measureOf(suffix),
    };
  })();

  return (
    <div
      ref={rootRef}
      className={`rp-not-doc ${styles.inspector}`}
      onMouseEnter={resolve}
      onMouseLeave={() => setActive(null)}
    >
      {children ? (
        <Scene target={target} style={overrides as CSSProperties}>
          {children}
        </Scene>
      ) : null}
      {children && controls ? (
        <CustomizePanel
          controls={controls}
          fallbacks={Object.fromEntries(rows.map((row) => [row.name, row.defaultValue]))}
          prefix={prefix}
          overrides={overrides}
          onChange={setOverrides}
        />
      ) : null}
      <table className={styles.table} data-variables="">
        <thead>
          <tr>
            <th>{t('cssProperty')}</th>
            <th colSpan={2}>{t('cssDefault')}</th>
          </tr>
        </thead>
        {ordered.map((group) => (
          <tbody key={group}>
            {showGroups ? (
              <tr className={styles.group}>
                <th colSpan={3} scope="colgroup">
                  {t(groupLabels[group])}
                </th>
              </tr>
            ) : null}
            {groups.get(group)?.map((row) => {
              const description =
                typeof row.description === 'string'
                  ? renderInlineCode(row.description)
                  : row.description;
              const scope =
                typeof row.description === 'string'
                  ? /Each `variant`/.test(row.description)
                    ? t('cssPerVariant')
                    : /Each `size`/.test(row.description)
                      ? t('cssPerSize')
                      : null
                  : null;
              const value = resolved[row.name];
              const isColor = groupOf(row.name.slice(prefix.length)) === 'color';

              return (
                <tr
                  key={row.name}
                  data-active={active === row.name ? '' : undefined}
                  onMouseEnter={() => setActive(row.name)}
                >
                  <td>
                    <button
                      type="button"
                      className={styles.rowButton}
                      onFocus={() => setActive(row.name)}
                      onClick={() => setActive(row.name)}
                    >
                      <code className={styles.name}>{row.name}</code>
                    </button>
                    {description ? <p className={styles.description}>{description}</p> : null}
                  </td>
                  <td className={styles.value}>
                    {isColor ? (
                      <span
                        className={styles.swatch}
                        style={{ background: value?.value || row.defaultValue }}
                        aria-hidden="true"
                      />
                    ) : null}
                    <code
                      data-expression={
                        displayValue(row.defaultValue).includes(' ') ? '' : undefined
                      }
                    >
                      {displayValue(row.defaultValue)}
                    </code>
                    {value?.text && !isColor && value.text !== displayValue(row.defaultValue) ? (
                      <span className={styles.computed}>{value.text}</span>
                    ) : null}
                  </td>
                  <td className={styles.scope}>{scope}</td>
                </tr>
              );
            })}
          </tbody>
        ))}
      </table>
    </div>
  );
}

export { AnatomyInspector, CssVariablesInspector };