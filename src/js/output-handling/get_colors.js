const getColors = (str) => {
  // const colors = [
  //   /* {
  // 		match: '{color:#f00 | 123 }',
  // 		color: '#f00',
  // 		content: '123'
  // 	} */
  // ];

  const mathes = str.match(/\{\s?color:[^|]*\|[^}]*\}/g);

  if (!mathes) return [];

  return mathes.map((match) => {
    const rez = {
      match: match,
    };

    const withoutSpaces = match.replace(/\s*/g, '');

    rez.color = withoutSpaces.replace(/^{color:|\|.*}$/g, '');
    rez.content = withoutSpaces.replace(/^.*\||}$/g, '');

    return rez;
  });
};

export default getColors;
