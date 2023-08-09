// const getColors = (str) => {
//   // const colors = [
//   //   /* {
//   // 		match: '{color:#f00 | 123 }',
//   // 		color: '#f00',
//   // 		content: '123'
//   // 	} */
//   // ];

//   const mathes = str.match(/\{\s?color:[^|]*\|[^}]*\}/g);

//   if (!mathes) return [];

//   return mathes.map((match) => {
//     const rez = {
//       match: match,
//     };

//     const withoutSpaces = match.replace(/\s*/g, '');

//     rez.color = withoutSpaces.replace(/^{color:|\|.*}$/g, '');
//     rez.content = withoutSpaces.replace(/^.*\||}$/g, '');

//     return rez;
//   });
// };

const getColors = (input) => {
  const matches = input.match(/{\s*color:[^|]+\|[^}]*}/gi);

  if (!matches) return [];

  return matches.map((match) => {
    const res = /{\s*color:([^|]+)\|([^}]*)}/i.exec(match);

    if (!res) return null;

    return {
      match,
      color: res[1].trim(),
      content: res[2].trim(),
    };
  });
};

export default getColors;
