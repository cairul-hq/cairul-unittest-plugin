import { list, option, pythonSummary, selectors, stdout, value } from '@cairul/pdk/runner';

export default {
  command: ['python3', '-m', 'unittest'],
  select: selectors({ names: list, startDirectory: value, filePattern: value, namePattern: value }),
  build({ names, startDirectory, filePattern, namePattern }) {
    if (names && (startDirectory || filePattern))
      throw new Error('Dotted test names and discovery options must be used separately.');
    const args = names
      ? [...option('-k', namePattern), ...names]
      : ['discover', ...option('-s', startDirectory), ...option('-p', filePattern), ...option('-k', namePattern)];
    return { args, capture: 'stderr', read: stdout(pythonSummary) };
  },
};
