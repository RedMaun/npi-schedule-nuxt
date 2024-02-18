let exports = {};

exports.isCurrent = (times, index, time) => {
  if (index + 1 <= times.length - 1) {
    let end =
      parseInt(times[index + 1][0].split(":")[0]) * 60 +
      parseInt(times[index + 1][0].split(":")[1]);
    let start =
      parseInt(times[index][0].split(":")[0]) * 60 +
      parseInt(times[index][0].split(":")[1]);
    return time >= start && time < end;
  } else {
    let end =
      parseInt(times[index][1].split(":")[0]) * 60 +
      parseInt(times[index][1].split(":")[1]);
    let start =
      parseInt(times[index - 1][1].split(":")[0]) * 60 +
      parseInt(times[index - 1][1].split(":")[1]);
    return time > start && time <= end;
  }
};

export default exports;
