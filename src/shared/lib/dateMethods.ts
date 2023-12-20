export const difference = (date: string) => {
  const [dayCreate, mounthCreate, yearCreate] = date.split('.').map(Number);
  const dateNew = new Date();
  const [dayNow, mounthNow, yearNow] = `${dateNew.getDate()}.${dateNew.getMonth()}.${dateNew.getFullYear()}`
    .split('.')
    .map(Number);

  const timeCreate = new Date(yearCreate, mounthCreate, dayCreate).getTime();

  const timeNow = new Date(yearNow, mounthNow, dayNow).getTime();

  return (timeNow - timeCreate) / (1000 * 60 * 60 * 24);
};
