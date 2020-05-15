const setDefaultEngine = (name) => localStorage.setItem('defaultEngine', name);

const GetDefaultEngine = () => localStorage.getItem('defaultEngine');

const restoreSettings = (wrapper) => {
  if (GetDefaultEngine()) {
    // eslint-disable-next-line
    wrapper.select.value = GetDefaultEngine();
  } else {
    // eslint-disable-next-line
    wrapper.select.value = 'DuckDuckGo';
  }
};

const init = (wrapper) => {
  restoreSettings(wrapper);
  wrapper.select.addEventListener('change', (e) => setDefaultEngine(e.target.value));
  wrapper.addEventListener('submit', (e) => {
    e.preventDefault();
    const engine = GetDefaultEngine();
    const userValue = e.target.q.value;
    e.target.q.value = '';
    if (engine === 'DuckDuckGo') {
      window.location.href = `https://duckduckgo.com/?q=${userValue}`;
    } else if (engine === 'Google') {
      window.location.href = `https://www.google.com/search?q=${userValue}`;
    } else if (engine === 'Bing') {
      window.location.href = `https://www.bing.com/search?q=${userValue}`;
    } else {
      console.error('unknown serach engine');
    }
  });
};

export { init as default };
