import React from 'react';
import { render } from 'react-dom';
import { CalendarApp } from './CalendarApp';

import './css/styles.css';

render(
  <CalendarApp />,
  document.getElementById('root')
);

// import { createRoot } from 'react-dom/client'
// import { CalendarApp } from './CalendarApp';

// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<CalendarApp />);