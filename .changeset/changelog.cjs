function getReleaseLine(changeset) {
  const [firstLine = '', ...extraLines] = changeset.summary.trim().split('\n');
  const commit = changeset.commit ? `${changeset.commit.slice(0, 7)}: ` : '';
  const match = firstLine.match(/^([^:\n]+):\s+(.+)$/);

  const bullet = [
    `- ${commit}${(match ? match[2] : firstLine).trim()}`,
    ...extraLines.map((line) => `  ${line.trimEnd()}`),
  ].join('\n');

  if (!match) {
    return bullet;
  }

  return `### ${match[1].trim()}\n\n${bullet}`;
}

function getDependencyReleaseLine(changesets, dependenciesUpdated) {
  if (dependenciesUpdated.length === 0) return '';

  const changesetLinks = changesets.map(
    (changeset) =>
      `- Updated dependencies${changeset.commit ? ` [${changeset.commit.slice(0, 7)}]` : ''}`,
  );

  const updatedDependenciesList = dependenciesUpdated.map(
    (dependency) => `  - ${dependency.name}@${dependency.newVersion}`,
  );

  return [...changesetLinks, ...updatedDependenciesList].join('\n');
}

module.exports = {
  getReleaseLine,
  getDependencyReleaseLine,
};