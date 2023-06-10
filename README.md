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
import ETerm from 'e-term';
import 'e-term/styles';

const term = new ETerm(
  // parent node
  '#term',
  {
    // commands
    echo: {
      util({ log }, params) {
        log({
          text: params.join(' ');
        });
      }
    }
  }
);
```
