const express = require('express');
const { Moralis } = require('../config/moralis');
const router = express.Router();

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Example endpoint: Get ETH balance for an address
router.get('/balance/:address', asyncHandler(async (req, res) => {
  try {
    const { address } = req.params;
    const { chain = 'eth' } = req.query;

    console.log(`🔍 Fetching balance for address: ${address} on chain: ${chain}`);

    const response = await Moralis.EvmApi.balance.getNativeBalance({
      address,
      chain,
    });

    const balanceData = {
      address,
      chain,
      balance: response.toJSON().balance,
      balanceFormatted: Moralis.Units.fromWei(response.toJSON().balance),
      timestamp: new Date().toISOString()
    };

    console.log('✅ Balance fetched successfully:', balanceData);

    res.json({
      success: true,
      data: balanceData,
      message: 'Balance retrieved successfully'
    });

  } catch (error) {
    console.error('❌ Error fetching balance:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to fetch balance'
    });
  }
}));

// Example endpoint: Get token balances for an address
router.get('/tokens/:address', asyncHandler(async (req, res) => {
  try {
    const { address } = req.params;
    const { chain = 'eth' } = req.query;

    console.log(`🔍 Fetching token balances for address: ${address} on chain: ${chain}`);

    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });

    const tokenData = response.toJSON();

    console.log('✅ Token balances fetched successfully');

    res.json({
      success: true,
      data: {
        address,
        chain,
        tokens: tokenData,
        count: tokenData.length,
        timestamp: new Date().toISOString()
      },
      message: 'Token balances retrieved successfully'
    });

  } catch (error) {
    console.error('❌ Error fetching token balances:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: 'Failed to fetch token balances'
    });
  }
}));

// Health check endpoint
router.get('/health', (req, res) => {
  console.log('🏥 Moralis health check requested');
  res.json({
    success: true,
    service: 'Moralis API',
    status: 'operational',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;