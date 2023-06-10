const show = (node) => node.removeAttribute('style');
const hide = (node) => node.setAttribute('style', 'display:none;');

function hideDialog() {
  hide(this.dialogTextNode);
  hide(this.dialogInputNode);

  this.dialogInputNode.value = '';
  this.state.hiddenValue = '';

  show(this.input);
  this.input.focus();
  show(this.userNameNode);
}

function listener(e) {
  if (e.key === 'Escape') {
    hideDialog.call(this);
    this.reject('escape');
  } else if (e.key === 'Enter') {
    const text = this.state.hiddenValue
      ? this.state.hiddenValue
      : this.dialogInputNode.value;

    hideDialog.call(this);

    this.resolve(text);
  } else if (this.hideInput) {
    e.preventDefault();
    e.stopPropagation();

    if (e.key === 'Backspace') {
      this.state.hiddenValue = this.state.hiddenValue.slice(0, -1);
    } else if (e.key.length === 1) {
      // dont insert "Shift", "F12" etc.

      this.state.hiddenValue += e.key;
    }
  }
}
export default function (
  commandName,
  { text = '', hideInput = false, defaultValue = '' }
) {
  return new Promise((resolve, reject) => {
    hide(this.input);
    hide(this.userNameNode);

    this.dialogTextNode.innerText = `${commandName} (${text}):`;
    this.dialogInputNode.value = hideInput ? '' : defaultValue;

    const state = {
      hiddenValue: defaultValue,
    };

    this.dialogInputNode.addEventListener(
      'keydown',
      listener.bind({ ...this, resolve, reject, state, hideInput })
    );

    show(this.dialogTextNode);
    show(this.dialogInputNode);

    setTimeout(() => this.dialogInputNode.focus(), 100);
  });
}
