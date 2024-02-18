let exports = {};

function weekSep(data) {
  let maxI = data.classes.length;
  let weekOne = [],
    weekTwo = [];
  for (let i = 0; i < maxI; i++) {
    if (data.classes[i].week === 1) {
      weekOne.push(data.classes[i]);
    } else {
      weekTwo.push(data.classes[i]);
    }
  }
  return [weekOne, weekTwo];
}

function classMerge(data) {
  let maxI = data.length;
  let newData = [];
  for (let i = 0; i < maxI; i++) {
    let tempClass = Object.assign({}, data[i]);
    delete tempClass.day;
    delete tempClass.week;
    if (i === 0 || data[i].day != data[i - 1].day) {
      newData.push({ day: data[i].day - 1, classes: [tempClass] });
    } else if (data[i].day === data[i - 1].day) {
      newData[newData.length - 1].classes.push(tempClass);
    }
  }
  return newData;
}

function getRidOfEmptyClasses(weeks) {
  let weeksCopy = [];
  for (let week of weeks) {
    let weekCopy = [...week];
    for (let g in week) {
      let k = 0;
      let weekClassesCopy = [...week[g].classes];
      for (let i of week[g].classes) {
        if (
          i.discipline === "-" &&
          i.lecturer === "-" &&
          i.auditorium === "-"
        ) {
          weekClassesCopy.splice(k, 1);
        } else {
          k++;
        }
      }
      if (weekClassesCopy.length === 0) {
        delete weekCopy[g];
      } else {
        weekCopy[g].classes = [...weekClassesCopy];
      }
    }
    weekCopy = weekCopy.filter(function (element) {
      return element !== undefined;
    });
    weeksCopy.push(weekCopy);
  }
  return weeksCopy;
}

function standard(data, sort) {
  for (let week of data) {
    for (let i = 0; i < week.length; i++) {
      for (let g = 0; g < week[i].classes.length; g++) {
        for (let z = 0; z < sort.length; z++) {
          if (sort[z] === "groups") {
            week[i].classes[g][sort[z]] =
              week[i].classes[g][sort[z]].split(",");
          } else if (sort[z] === "lecturer") {
            week[i].classes[g][sort[z]] =
              week[i].classes[g][sort[z]].split(", ");
          } else if (sort[z] === "auditorium") {
            week[i].classes[g][sort[z]] =
              week[i].classes[g][sort[z]].split(", ");
          }
        }
        week[i].classes[g] = {
          firstRow: week[i].classes[g][sort[0]],
          secondRow: week[i].classes[g][sort[1]],
          thirdRow: week[i].classes[g][sort[2]],
          class: week[i].classes[g].class,
          type: week[i].classes[g].type,
        };
      }
    }
  }
  return data;
}

exports.func = (data, sort) => {
  let [weekOne, weekTwo] = weekSep(data);
  weekOne = classMerge(weekOne);
  weekTwo = classMerge(weekTwo);
  let weeks = [weekOne, weekTwo];
  weeks = getRidOfEmptyClasses(weeks);
  weeks = standard(weeks, sort);
  return weeks;
};

export default exports;
