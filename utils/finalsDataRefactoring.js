let exports = {};
/*
[
    {
        "class": 1,
        "auditorium": "210РТ",
        "lecturer": "Анисимов А В доц.  МиГПА",
        "discipline": "Гидравлика и гидропневмопривод",
        "type": "ЭКЗ",
        "groups": "150304-АТПа-о20",
        "date": "2022-06-27"
    },
    {
        "class": 2,
        "auditorium": "210РТ",
        "lecturer": "Анисимов А В доц.  МиГПА",
        "discipline": "Гидравлика и гидропневмопривод",
        "type": "ЭКЗ",
        "groups": "150304-АТПа-о20",
        "date": "2022-06-27"
    },
    {
        "class": 3,
        "auditorium": "210РТ",
        "lecturer": "Анисимов А В доц.  МиГПА",
        "discipline": "Гидравлика и гидропневмопривод",
        "type": "ЭКЗ",
        "groups": "150304-АТПа-о20",
        "date": "2022-06-27"
    },
    {
        "class": 1,
        "auditorium": "210РТ",
        "lecturer": "Анисимов А В доц.  МиГПА",
        "discipline": "Гидравлика и гидропневмопривод",
        "type": "ЭКЗ",
        "groups": "150304-АТПа-о20",
        "date": "2022-06-28"
    },
    {
        "class": 2,
        "auditorium": "210РТ",
        "lecturer": "Анисимов А В доц.  МиГПА",
        "discipline": "Гидравлика и гидропневмопривод",
        "type": "ЭКЗ",
        "groups": "150304-АТПа-о20",
        "date": "2022-06-28"
    },
    {
        "class": 3,
        "auditorium": "210РТ",
        "lecturer": "Анисимов А В доц.  МиГПА",
        "discipline": "Гидравлика и гидропневмопривод",
        "type": "ЭКЗ",
        "groups": "150304-АТПа-о20",
        "date": "2022-06-28"
    }
]

[
    {"date": "2022-06-27", classes: [
        {firstrow: discipline, secondrow: lecturer, thirdrow: auditorium, type: type, class: class }
    ]}
]

*/

function getClass(timesJson, start) {
  for (let i = 1; i <= Object.keys(timesJson).length; i++) {
    if (timesJson[String(i)].start === start) {
      return i;
    }
  }
}

function dataFormat(data, i, timesJson, sort) {
  return {
    firstRow: data[i].discipline,
    secondRow: [data[i][sort]],
    thirdRow: [data[i].auditorium],
    type: data[i].type,
    class: data[i].class || getClass(timesJson, data[i].start),
  };
}

exports.func = (data, sort, timesJson) => {
  let weeks = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      weeks.push({
        date: data[i].date,
        classes: [dataFormat(data, i, timesJson, sort)],
      });
    } else {
      if (data[i - 1].date === data[i].date) {
        weeks[weeks.length - 1].classes.push(dataFormat(data, i, timesJson, sort));
      } else {
        weeks.push({
          date: data[i].date,
          classes: [dataFormat(data, i, timesJson, sort)],
        });
      }
    }
  }
  return [weeks];
};

export default exports;
