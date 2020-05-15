let showColon = true;
const clock = (wrapper) => {
  const date = new Date();
  const h = date.getHours();
  let m = date.getMinutes();
  m = m < 10 ? `0${m}` : m;
  const indicator = h < 12 ? 'AM' : 'PM';
  const colon = showColon ? ':' : ' ';
  showColon = !showColon;
  // eslint-disable-next-line
  wrapper.innerHTML = `${h}${colon}${m} ${indicator}`;
};

export default (wrapper) => setInterval(clock.bind(null, wrapper), 500);
