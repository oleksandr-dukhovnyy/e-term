import Sanitizer from 'purify-html';
import getColors from './get_colors.js';

const sanitizer = new Sanitizer(['br']);
const outputSanitizer = new Sanitizer([
  { name: 'span', attributes: ['style'] },
  'br',
]);

const logToConsole = (
  output,
  config,
  { text = '', styles = {} } = {},
  drawArrow = config.output.showArrowByDefault
) => {
  const div = document.createElement('div');
  const span = document.createElement('span');

  span.style.color = config.output.defaultColor;
  span.style.fontSize = config.output.defaultFontSize;
  span.style.fontFamily = config.output.defaultFontFamily;

  for (const styleName in styles) {
    span.style[styleName] = styles[styleName];
  }

  if (config.output.useInnerText) {
    span.innerText = drawArrow ? `> ${text}` : text;
  } else {
    let sanitizedText = sanitizer.sanitize(text);
    const colors = getColors(sanitizedText);

    colors.forEach((color) => {
      sanitizedText = sanitizedText.replaceAll(
        color.match,
        `<span style="color: ${color.color}">${color.content}</span>`
      );
    });

    const outputText = outputSanitizer.sanitize(sanitizedText);

    span.innerHTML = drawArrow ? `> ${outputText}` : outputText;
  }

  div.appendChild(span);

  if (output.children.length + 1 > config.output.maxAliveLogRows) {
    output.children[0].remove();
  }

  output.appendChild(div);
  output.scroll(0, output.scrollHeight);
};

export default logToConsole;
