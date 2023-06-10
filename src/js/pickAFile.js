const pickAFile = (getText = true) => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      if (!getText) {
        resolve(file);
      } else {
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);

        reader.readAsText(file);
      }
    };

    input.click();
  });
};

export default pickAFile;
