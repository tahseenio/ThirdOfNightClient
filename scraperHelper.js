const magribInput = document.querySelector('.maghribinput');
const fajrInput = document.querySelector('.fajrinput');
const scrapetxt = document.querySelector('.scrapingtxt');
console.log(scrapetxt);

const convertTo24HrAndSet = (time, selector) => {
  const timeArr = time.replaceAll(':', ' ').split(' ');

  let newTime = '';

  if (timeArr[2] === 'am') {
    if (timeArr[0].length === 1) {
      newTime = `0${timeArr[0]}:${timeArr[1]}`;
    } else {
      newTime = `${timeArr[0]}:${timeArr[1]}`;
    }
  } else {
    newTime = `${Number(timeArr[0]) + 12}:${timeArr[1]}`;
  }
  selector.value = newTime;
};

// fetchdata
const fetchTIMES = async () => {
  console.log('ran fetch');
  scrapetxt.innerHTML = 'Receiving data, please wait...';
  const promise = await fetch(
    'https://third-of-night-server.vercel.app/scrape'
  );
  const data = await promise.json();
  // console.log(data);
  convertTo24HrAndSet(data.fajr, fajrInput);
  convertTo24HrAndSet(data.magrib, magribInput);
  scrapetxt.innerHTML = 'Done';
  document.querySelector('.calculate').click();
  setTimeout(() => {
    scrapetxt.innerHTML = '&nbsp';
  }, 3000);
};

fetchTIMES();
