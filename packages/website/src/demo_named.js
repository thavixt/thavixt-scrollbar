const modulePath = 'https://unpkg.com/thavixt-scrollbar-core/dist/index.js'

class ImportError extends Error { }

(async () => {
  try {
    const {Scrollbar: ScrollbarExport} = await import(/* @vite-ignore */modulePath);
    if (typeof ScrollbarExport === 'function') {
      console.log('✅ Importing named export from module from unpkg.com works')
    } else {
      throw new ImportError()
    }
  } catch (e) {
    console.error('❌ Failed to import named export from module from unpkg.com')
  }
})();