import './main.css';
import Terminal from './app/components/terminal';
import clock from './app/components/timer';
import initSerachForm from './app/components/searchForm';

(() => {
  const searchFormWrapper = document.getElementById('search-form');
  initSerachForm(searchFormWrapper);

  const terminalWrapper = document.getElementById('terminal-wrapper');
  const terminal = new Terminal(terminalWrapper, {
    username: 'start',
    hostname: 'page',
  });
  terminal.init();

  const timerWrapper = document.getElementById('timer');
  clock(timerWrapper);
})();
