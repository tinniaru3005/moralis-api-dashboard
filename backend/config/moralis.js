const Moralis = require('moralis').default;

// Initialize Moralis
const initializeMoralis = async () => {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS_API_KEY || 'AmWmEH23DnLfakTrbX5O8ostKe0PQLnkgwB5T1GiFSMyy7fvUUsB8hSTv3VIFjTV',
      });
      console.log('✅ Moralis initialized successfully');
    }
  } catch (error) {
    console.error('❌ Failed to initialize Moralis:', error);
    throw error;
  }
};

module.exports = {
  initializeMoralis,
  Moralis
};