import { hoursToMilliseconds, minutesToMilliseconds, secondsToMilliseconds } from "date-fns";

function daysToMilliseconds(days: number) {
  return hoursToMilliseconds(days * 24);
}

function weeksToMilliseconds(weeks: number) {
  return daysToMilliseconds(weeks * 7);
}

function monthsToMilliseconds(months: number) {
  return weeksToMilliseconds(months * 4);
}

function yearsToMilliseconds(years: number) {
  return monthsToMilliseconds(years * 12);
}

function getMaxAge(SESSION_EXPIRATION: string) {
  const expirationArray = SESSION_EXPIRATION.split(" ");

  const number = Number.parseInt(expirationArray[0], 10);
  const timeMeasure = expirationArray[1];

  if (expirationArray.length !== 2 || Number.isNaN(number)) {
    throw new Error("Could not parse the SESSION_EXPIRATION environment variable.");
  }

  switch (timeMeasure) {
    case "seconds":
      return secondsToMilliseconds(number);

    case "minutes":
      return minutesToMilliseconds(number);

    case "hours":
      return hoursToMilliseconds(number);

    case "days":
      return daysToMilliseconds(number);

    case "weeks":
      return weeksToMilliseconds(number);

    case "months":
      return monthsToMilliseconds(number);

    case "years":
      return yearsToMilliseconds(number);

    default:
      throw new Error("Could not parse the SESSION_EXPIRATION environment variable.");
  }
}

export {
  getMaxAge,
  secondsToMilliseconds,
  minutesToMilliseconds,
  hoursToMilliseconds,
  daysToMilliseconds,
  weeksToMilliseconds,
  monthsToMilliseconds,
  yearsToMilliseconds,
};
