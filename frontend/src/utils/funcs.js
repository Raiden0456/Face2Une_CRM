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

function roundToNearestMinute(date) {
  date.setSeconds(0);
  date.setMilliseconds(0);
  date.setMinutes(Math.round(date.getMinutes()));
  return date;
}

export function renameAndDeleteArrayObjects(arr, obj) {
  let result = arr.map((elem) => {
    let newElem = {};
    for (let key in elem) {
      let newKey = obj[key];

      if (newKey) {
        newElem[newKey] = elem[key];

        if (newKey === 'start' || newKey === 'end') {
          newElem[newKey] = roundToNearestMinute(new Date(elem[key]));
        }
      }

      newElem['color'] = '#91a0db';
    }
    return newElem;
  });
  return result;
}
