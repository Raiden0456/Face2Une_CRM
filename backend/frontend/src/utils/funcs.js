export function filterObjectToArray(obj) {
  return Object.entries(obj)
    .filter(([key, value]) => value)
    .map(([key, value]) => Number(key));
}

export function filterAddPassengers(arr) {
  return arr.map((passanger) => ({
    proc_id: passanger.value,
    opt_proc_id: filterObjectToArray(passanger.opt_proc_id),
  }));
}

export function allProcsIds(mainPassanger, addPassengers = null) {
  let mainPassangerIds = mainPassanger.proc_id;
  let addPassengersIds = '';

  for (let i of mainPassanger.opt_proc_id) {
    mainPassangerIds += `,${i}`;
  }

  if (addPassengers) {
    for (let passanger of addPassengers) {
      addPassengersIds += `,${passanger.proc_id}`;
      for (let i of passanger.opt_proc_id) {
        addPassengersIds += `,${i}`;
      }
    }

    mainPassangerIds += addPassengersIds;
    return mainPassangerIds;
  }

  return mainPassangerIds;
}
