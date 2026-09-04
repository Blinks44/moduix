# Switch (Solid)

\`Switch\` is the moduix Solid wrapper around Ark UI Switch. It preserves the React wrapper's
compound anatomy, native form behavior, state attributes, default thumb, and \`size\` styling hook.

## Composition

\`\`\`tsx
import { Switch } from '@moduix/solid/switch';

export function SwitchDemo() {
return (
<Switch.Root defaultChecked>
<Switch.Control />
<Switch.Label>Enable notifications</Switch.Label>
</Switch.Root>
);
}
\`\`\`

Compose \`Switch.HiddenInput\` explicitly inside \`Root\` or \`RootProvider\`. \`Control\` renders a
default \`Thumb\` when it has no children. The public parts are \`Root\`, \`RootProvider\`, \`Control\`,
\`Thumb\`, \`Label\`, and \`Context\`; the barrel also re-exports \`useSwitch\` and \`useSwitchContext\`.

## Ark Solid behavior

Solid uses a render-function \`asChild\` prop:

\`\`\`tsx
<Switch.Root asChild={(props) => <label {...props()} />}>
<Switch.Control />
<Switch.Label>Enable reminders</Switch.Label>
</Switch.Root>
\`\`\`

The installed Ark Solid primitive does not forward \`ref\` through an \`asChild\` render function.
Ordinary refs and custom-host composition are therefore supported as separate native paths. The
Solid hooks expose Ark's accessor-based API, so provider state is passed as \`value={switchApi}\` and
read as \`switchApi().checked\`.