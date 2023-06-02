# e-term

Just-add-water javascript terminal

## Installation

```bash
npm i e-term --save
```

```bash
yarn add e-term
```

## Usage

```typescript
import eTerm from 'e-term';

eTerm.init({
  params: {
    exec: false
  },
  commands: {
    echo(api: ETerm.Api, params: string[]) {
      api.log(
        text: params.join(' ')
      );
    },
  }
});
```
