const createETerm = (params: ETerm.InstanceConfig): ETerm.Instance => {
  return {
    commands: params.commands,
    exec() {},
    addCommand(command: ETerm.CommandDescriptor) {
      return '12345';
    },
  };
};

export default createETerm;
