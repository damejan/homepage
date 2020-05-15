const parseCommand = (userValue, terminal) => {
  // console.log(userValue.trim().split(' '));
  // console.log(userValue);
  // console.log(localStorage.getItem('terminalConfig'));
  let splitedUserVal = userValue.trim().split(' ');
  let string = '';
  let foundString = false;
  let counter=0;
  for(let i=0; i<splitedUserVal.length; i++){
    if(splitedUserVal[i].startsWith('"') || foundString){
      string += ` ${splitedUserVal[i]}`;
      foundString = true;
      counter += 1;
      if(splitedUserVal[i].endsWith('"')){
        string = string.trim();
        string = string.substring(1, string.length-1);
        splitedUserVal[i] = string;
        counter = 0;
        string = '';
        foundString = false;
        continue;
      }
      splitedUserVal[i] = '';
    }
  }
  splitedUserVal = splitedUserVal.filter(value => value != '');
  const parsedValue = {
    name: splitedUserVal[0],
    flags: {},
    shortFlags: {},
    args: {},
  };
  const ValArgsPairs = [];
  for (let i = 1; i < splitedUserVal.length; i += 2) {
    ValArgsPairs.push(splitedUserVal.slice(i, i + 2));
  }
  // console.log(ValArgsPairs);
  for (let i = 0; i < ValArgsPairs.length; i += 1) {
    for (let j = 0; j < ValArgsPairs[i].length; j += 1) {
      if (ValArgsPairs[i][0].startsWith('--')) {
        if (ValArgsPairs[i].length === 1) {
          parsedValue.flags[ValArgsPairs[i][0].substr(2)] = '';
        } else {
          // eslint-disable-next-line
          parsedValue.flags[ValArgsPairs[i][0].substr(2)] = ValArgsPairs[i][1];
        }
      } else if (ValArgsPairs[i][0].startsWith('-')) {
        if (ValArgsPairs[i].length === 1) {
          parsedValue.shortFlags[ValArgsPairs[i][0].substr(1)] = '';
        } else {
          // eslint-disable-next-line
          parsedValue.shortFlags[ValArgsPairs[i][0].substr(1)] =
            ValArgsPairs[i][1];
        }
      } else {
        // eslint-disable-next-line
        if (ValArgsPairs[i].length === 1) {
          parsedValue.args[ValArgsPairs[i][0]] = '';
        } else {
          // eslint-disable-next-line
          parsedValue.args[ValArgsPairs[i][0]] = ValArgsPairs[i][1];
        }
      }
    }
  }
  console.log(parsedValue);
  // dynamically import required command and return response
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line
    import(`./commands/${parsedValue.name}`)
      .then((obj) => obj.default(userValue, parsedValue, terminal))
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });

};

export { parseCommand as default };
