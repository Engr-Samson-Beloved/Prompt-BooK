export const runMJScript = (text) => {
  const parameters = " --v 6.0 --ar 16:9 --stylize 250";
  return `/imagine prompt: ${text.trim()}${parameters}`;
};
