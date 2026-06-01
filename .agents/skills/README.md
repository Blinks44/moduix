# moduix project skills

Local project skills used by agents in this repository.

## Skills

- `.agents/skills/engineering-principles/SKILL.md` - mandatory baseline engineering behavior for all coding tasks
- `.agents/skills/rtk-command-proxy/SKILL.md` - mandatory shell-command baseline that requires the `rtk` prefix immediately after `engineering-principles`
- `.agents/skills/js-react-conventions/SKILL.md` - JS/TS React conventions with a simplicity-first bias and minimal type surface
- `.agents/skills/upstream-library-docs/SKILL.md` - online upstream Base UI and shadcn reference routing for agents
- `.agents/skills/ui-component-workflow/SKILL.md` - Base UI component workflow focused on shadcn-like thin wrappers, simple defaults, and composable escape hatches
- `.agents/skills/local-component-docs/SKILL.md` - local component documentation contracts for `moduix` wrappers, including upstream Base UI markdown links and component-level changelog guidance
- `.agents/skills/docs-workflow/SKILL.md` - docs workflow focused on current API accuracy, simple default usage, and concise production-like examples
- `.agents/skills/cross-package-sync/SKILL.md` - UI/docs parity rules that keep code, CSS, stories, and docs aligned around the same simplified architecture

## Routing

Use `AGENTS.md` in repo root as the dispatcher for which skill(s) to activate per task.