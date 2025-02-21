const modulePath = 'https://unpkg.com/thavixt-scrollbar-core/dist/index.js'

class ImportError extends Error { }

(async () => {
  try {
    const DefaultExport = await import(modulePath);
    if (typeof DefaultExport === 'function') {
      console.log('✅ Importing default module from unpkg.com works')
    } else {
      throw new ImportError()
    }
  } catch (e) {
    console.error('❌ Failed to import default module from unpkg.com')
  }
})();