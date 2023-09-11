export const formatTime = (time: string) => {
  const date = new Date(time);
  const yy = date.getFullYear();
  const mm = patchZero(date.getMonth() + 1);
  const dd = date.getDate();
  return yy + "-" + mm + "-" + dd;
};

function patchZero(i: number) {
  return String(i).length === 2 ? i : "0" + i;
}
