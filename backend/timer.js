export default function timer() {
  const start = Date.now();
  setInterval(() => {
    const seconds = ~~((Date.now() - start) / 1000);
    const secondsDisplayed = ("00" + (seconds % 60)).slice(-2);
    const minutes = ~~(seconds / 60);
    const minutesDisplayed = ("00" + (minutes % 60)).slice(-2);
    console.log(`${minutesDisplayed} : ${secondsDisplayed}`);
    return { min: minutesDisplayed, sec: secondsDisplayed };
  }, 1000);
}
