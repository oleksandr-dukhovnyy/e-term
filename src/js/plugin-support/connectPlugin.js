function connectPlugin(plugin) {
  return plugin.call(this);
}

export default connectPlugin;
