import parseCommand from './commandParser';

class Terminal {
  constructor(terminalWrapper, config) {
    this.terminal = terminalWrapper;
    this.config = config;
    this.promptWrapper = null;
    this.initTasks = [];
    this.history = [];
    this.historyPosition = -1;
  }

  async getUserInput(e) {
    e.preventDefault();

    const userValue = e.target.input.value;
    e.target.input.value = '';
    e.target.input.remove();

    const oldValue = document.createElement('div');
    oldValue.classList.add('input');
    oldValue.innerText = userValue;
    e.target.appendChild(oldValue);
    e.target.classList.add('old');
    //   e.target.classList.remove('prompt-wrapper');
    //   e.target.style.display = 'inline-block';

    const commandResponse = document.createElement('div');
    commandResponse.classList.add('old');
    try {
      commandResponse.innerHTML = await parseCommand(userValue, this);
    } catch (parserError) {
      console.error(parserError);
      commandResponse.innerText = `${parserError}`;
    }
    this.terminal.appendChild(commandResponse);
    this.history.unshift(userValue);

    this.terminal.appendChild(this.prompt());
    this.promptWrapper.input.focus();
  }

  async runInitTasks() {
    for (let i = 0; i < this.initTasks.length; i += 1) {
      const commandResponse = document.createElement('div');
      commandResponse.classList.add('old');
      try {
        // eslint-disable-next-line
        commandResponse.innerHTML = await parseCommand(this.initTasks[i], this);
      } catch (parserError) {
        console.error(parserError);
        commandResponse.innerText = `${parserError}`;
      }
      this.terminal.appendChild(commandResponse);
    }
    this.terminal.appendChild(this.prompt());
    this.promptWrapper.input.focus();
  }

  restoreSettings() {
    const settings = JSON.parse(localStorage.getItem('terminalConfig'));
    if (settings) {
      if (settings.initTasks.length) {
        this.initTasks = settings.initTasks;
      }
    }
  }

  clear() {
    const oldeElements = this.terminal.querySelectorAll('.old');
    oldeElements.forEach((element) => element.remove());
  }

  clearPrompt() {
    console.dir(this.promptWrapper);
    this.promptWrapper.input.value = '';
  }

  prompt() {
    this.promptWrapper = document.createElement('form');
    this.promptWrapper.classList.add('prompt-wrapper');
    this.promptWrapper.addEventListener('submit', this.getUserInput.bind(this));
    this.promptWrapper.addEventListener('keydown', this.shortcuts.bind(this));

    const prompt = document.createElement('div');
    prompt.classList.add('prompt');
    prompt.innerHTML = `<span style="color: #5A8B6B; font-weight: bold;">
      ${this.config.username}@${this.config.hostname}</span>:`
      + '<span style="color: #4398A2; font-weight: bold;">~</span>$ ';

    const input = document.createElement('input');
    input.classList.add('input');
    input.type = 'text';
    input.autocomplete = 'off';
    input.id = 'input';

    this.promptWrapper.appendChild(prompt);
    this.promptWrapper.appendChild(input);

    return this.promptWrapper;
  }

  shortcuts(e) {
    // clear screen, ctrl+x
    if (e.keyCode === 88 && e.ctrlKey) {
      this.clear();
    }

    // arrow up
    if (e.keyCode === 38) {
      this.historyPosition += 1;
      if (this.historyPosition > this.history.length - 1) {
        this.historyPosition = this.history.length;
        this.promptWrapper.input.value = this.history[this.history.length - 1];
      } else {
        this.promptWrapper.input.value = this.history[this.historyPosition];
      }
    }

    // arrow down
    if (e.keyCode === 40) {
      if (this.historyPosition === this.history.length) {
        this.historyPosition -= 1;
      }
      if (this.historyPosition < 0) {
        this.historyPosition = 0;
        this.promptWrapper.input.value = '';
      } else {
        this.promptWrapper.input.value = this.history[this.historyPosition];
      }
      this.historyPosition -= 1;
    }
  }

  init() {
    this.restoreSettings();
    this.runInitTasks()
      .then(() => {
        // this.terminal.appendChild(this.prompt());
        this.terminal.addEventListener('click', () => {
          this.promptWrapper.input.focus();
        });
      })
      .catch((err) => console.error(err));
  }
}

export { Terminal as default };
