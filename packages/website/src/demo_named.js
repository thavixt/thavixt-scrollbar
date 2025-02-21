import {Scrollbar as ScrollbarExport} from 'https://unpkg.com/thavixt-scrollbar-core/dist/index.js';

if (typeof ScrollbarExport === 'function') {
  // pass
  console.log('✅ Importing named module from unpkg.com works')
} else {
  // fail
  console.assert(typeof ScrollbarExport === 'function', '❌ Failed to import named module from unpkg.com')
}
