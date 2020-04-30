### NavIconButton

```js
/** @jsx jsx */
import { jsx } from 'theme-ui';
import AppBar from '../AppBar';
import AppLayout from '../AppLayout';
import AppMain from '../AppMain';
<AppLayout style={{ minHeight: '600px' }}>
  <AppBar>
    <NavIconButton>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
      </svg>
    </NavIconButton>
  </AppBar>
  <AppMain>
    <h1>APP</h1>
  </AppMain>
</AppLayout>;
```
