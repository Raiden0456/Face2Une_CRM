export function filterObjectToArray(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);
}

export function filterAddPassengers(arr) {
  return arr.map((passanger) => ({
    proc_id: passanger.value,
    opt_proc_id: filterObjectToArray(passanger.opt_proc_id),
  }));
}
