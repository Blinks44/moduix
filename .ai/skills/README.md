# moduix project skills

Local project skills used by agents in this repository.

## Skills

- `.ai/skills/engineering-principles/SKILL.md` - mandatory baseline engineering behavior for all coding tasks
- `.ai/skills/rtk-command-proxy/SKILL.md` - mandatory shell-command baseline that requires the `rtk` prefix immediately after `engineering-principles`
- `.ai/skills/js-react-conventions/SKILL.md` - JS/TS React conventions with a simplicity-first bias and minimal type surface
- `.ai/skills/ui-component-workflow/SKILL.md` - Base UI component workflow focused on shadcn-like thin wrappers, simple defaults, and composable escape hatches
- `.ai/skills/docs-workflow/SKILL.md` - docs workflow focused on current API accuracy, simple default usage, and concise production-like examples
- `.ai/skills/cross-package-sync/SKILL.md` - UI/docs parity rules that keep code, CSS, stories, and docs aligned around the same simplified architecture

## Routing

Use `AGENTS.md` in repo root as the dispatcher for which skill(s) to activate per task.