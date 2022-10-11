module.exports = function* ({ name = "", folders = [], items = [] }) {
  yield [name];
  for (const x of [...folders, ...items])
    for (const path of flat(x)) yield [name, ...path];
};
