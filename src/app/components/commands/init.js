const restoreSettings = () => {
  const settings = localStorage.getItem('terminalConfig');
  if (settings) {
    return JSON.parse(settings);
  }
  localStorage.setItem('terminalConfig', JSON.stringify({ initTasks: [] }));
  return JSON.parse(localStorage.getItem('terminalConfig'));
};

export default async (originalValue, parsedValue, terminal) => {
  if ('add' in parsedValue.args) {
    const settings = restoreSettings();
    settings.initTasks.push(parsedValue.args.add);
    localStorage.setItem('terminalConfig', JSON.stringify(settings));
    return '<span style="color: green">task added succesfully</span>';
  }
  if ('list' in parsedValue.args) {
    const { initTasks } = restoreSettings();
    let template = '';
    initTasks.forEach((task, index) => {
      template += `<p>${index}: ${task}</p>`;
    });
    return template;
  }
  if (
    'rm' in parsedValue.args ||
    'r' in parsedValue.shortFlags ||
    'remove' in parsedValue.flags
  ) {
    const index =
      parsedValue.args.rm ||
      parsedValue.shortFlags.r ||
      parsedValue.flags.remove;
    console.log(index);
    if (index) {
      const settings = restoreSettings();
      settings.initTasks.splice(index, 1);
      localStorage.setItem('terminalConfig', JSON.stringify(settings));
      return '<span style="color: green">task removed succesfully</span>';
      // eslint-disable-next-line
    } else {
      return 'error';
    }
  }
  if ('help' in parsedValue.flags) {
    return `
        <br>
        <p>Usage: init &lt;command&gt; [value]</p>
        <br>
        <p>commands:</p>
        <p>list - list of init tasks</p>
        <p>add  - add new task to array(pass another command as a value)</p>
        <p>rm   - remove task from array(pass index as a value)</p>
        <br>
    `;
  }

  return 'error';
};
