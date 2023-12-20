export enum ZoneString {
  morning = 'Доброе утро',
  day = 'Добрый день',
  evening = 'Добрый вечер',
  nights = 'Доброй ночи',
}

export const getTimeZone = (time: number) => {
  if (time >= 6 && time < 10) {
    return ZoneString.morning;
  }
  if (time >= 10 && time < 18) {
    return ZoneString.day;
  }
  if (time >= 18 && time < 22) {
    return ZoneString.evening;
  }
  return ZoneString.nights;
};
