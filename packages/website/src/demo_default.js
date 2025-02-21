import DefaultExport from 'https://unpkg.com/thavixt-scrollbar-core/dist/index.js';

if (typeof DefaultExport === 'function') {
  // pass
  console.log('✅ Importing default module from unpkg.com works')
} else {
  // fail
  console.assert(typeof DefaultExport === 'function', '❌ Failed to import default module from unpkg.com')
}
