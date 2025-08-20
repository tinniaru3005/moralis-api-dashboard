import React, { useState } from 'react';

function App() {
  const [address, setAddress] = useState('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
  const [chain, setChain] = useState('eth');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:3001/api/moralis';

  const callAPI = async (endpoint, params = {}) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const queryString = new URLSearchParams(params).toString();
      const url = `${API_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;
      
      console.log('🔍 Calling API:', url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log('📥 API Response:', data);

      if (!res.ok) {
        throw new Error(data.message || 'API call failed');
      }

      setResponse(data);
    } catch (err) {
      console.error('❌ API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getBalance = () => callAPI(`/balance/${address}`, { chain });
  const getTokens = () => callAPI(`/tokens/${address}`, { chain });
  const getHealth = () => callAPI('/health');

  const formatJSON = (obj) => JSON.stringify(obj, null, 2);

  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '24px',
      backgroundColor: 'white',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      background: 'linear-gradient(to right, #2563eb, #9333ea)',
      color: 'white',
      padding: '24px',
      borderRadius: '8px',
      marginBottom: '24px'
    },
    headerTitle: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '8px',
      margin: '0 0 8px 0'
    },
    headerSubtitle: {
      color: '#ddd6fe',
      margin: '0',
      fontSize: '1.1rem'
    },
    configSection: {
      backgroundColor: '#f9fafb',
      padding: '24px',
      borderRadius: '8px',
      marginBottom: '24px'
    },
    configTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      marginBottom: '16px',
      margin: '0 0 16px 0'
    },
    configGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '16px'
    },
    inputGroup: {
      marginBottom: '0'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      outline: 'none',
      fontSize: '14px',
      boxSizing: 'border-box'
    },
    buttonSection: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px',
      marginBottom: '24px'
    },
    button: {
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      cursor: 'pointer',
      fontSize: '14px'
    },
    buttonGreen: {
      backgroundColor: '#059669'
    },
    buttonBlue: {
      backgroundColor: '#2563eb'
    },
    buttonPurple: {
      backgroundColor: '#9333ea'
    },
    buttonDisabled: {
      backgroundColor: '#9ca3af',
      cursor: 'not-allowed'
    },
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px'
    },
    spinner: {
      width: '48px',
      height: '48px',
      border: '2px solid #e5e7eb',
      borderBottomColor: '#2563eb',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '12px'
    },
    error: {
      backgroundColor: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#b91c1c',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '24px'
    },
    response: {
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '24px',
      marginBottom: '24px'
    },
    responseHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px'
    },
    responseTitle: {
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0'
    },
    statusSuccess: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500',
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    statusFailed: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '500',
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    },
    responseBody: {
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      padding: '16px',
      overflow: 'auto'
    },
    pre: {
      fontSize: '0.875rem',
      color: '#1f2937',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      margin: '0',
      fontFamily: 'Monaco, Consolas, monospace'
    }
  };

  return (
    <div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Moralis API Test Dashboard</h1>
          <p style={styles.headerSubtitle}>Test Moralis integration with SN-API backend</p>
        </div>

        <div style={styles.configSection}>
          <h2 style={styles.configTitle}>Configuration</h2>
          <div style={styles.configGrid}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Wallet Address:</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={styles.input}
                placeholder="Enter wallet address"
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Blockchain:</label>
              <select
                value={chain}
                onChange={(e) => setChain(e.target.value)}
                style={styles.input}
              >
                <option value="eth">Ethereum</option>
                <option value="polygon">Polygon</option>
                <option value="bsc">BSC</option>
                <option value="avalanche">Avalanche</option>
              </select>
            </div>
          </div>
        </div>

        <div style={styles.buttonSection}>
          <button
            onClick={getHealth}
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : styles.buttonGreen)
            }}
          >
            {loading ? '⏳ Loading...' : '🏥 Health Check'}
          </button>
          <button
            onClick={getBalance}
            disabled={loading || !address}
            style={{
              ...styles.button,
              ...(loading || !address ? styles.buttonDisabled : styles.buttonBlue)
            }}
          >
            {loading ? '⏳ Loading...' : '💰 Get Balance'}
          </button>
          <button
            onClick={getTokens}
            disabled={loading || !address}
            style={{
              ...styles.button,
              ...(loading || !address ? styles.buttonDisabled : styles.buttonPurple)
            }}
          >
            {loading ? '⏳ Loading...' : '🎯 Get Tokens'}
          </button>
        </div>

        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <span>Processing request...</span>
          </div>
        )}

        {error && (
          <div style={styles.error}>
            <strong>❌ Error:</strong>
            <p style={{marginTop: '8px', margin: '8px 0 0 0'}}>{error}</p>
          </div>
        )}

        {response && (
          <div style={styles.response}>
            <div style={styles.responseHeader}>
              <h3 style={styles.responseTitle}>API Response</h3>
              <span style={response.success ? styles.statusSuccess : styles.statusFailed}>
                {response.success ? '✅ Success' : '❌ Failed'}
              </span>
            </div>
            <div style={styles.responseBody}>
              <pre style={styles.pre}>{formatJSON(response)}</pre>
            </div>
          </div>
        )}

        <div style={{backgroundColor: '#eff6ff', padding: '24px', borderRadius: '8px', marginTop: '32px'}}>
          <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1e40af', margin: '0 0 12px 0'}}>
            Available API Endpoints
          </h3>
          <div style={{fontSize: '0.875rem'}}>
            <div style={{marginBottom: '8px'}}>
              <code style={{backgroundColor: 'white', padding: '4px 8px', borderRadius: '4px'}}>
                GET /api/moralis/health
              </code> - Service health check
            </div>
            <div style={{marginBottom: '8px'}}>
              <code style={{backgroundColor: 'white', padding: '4px 8px', borderRadius: '4px'}}>
                GET /api/moralis/balance/:address
              </code> - Get native token balance
            </div>
            <div>
              <code style={{backgroundColor: 'white', padding: '4px 8px', borderRadius: '4px'}}>
                GET /api/moralis/tokens/:address
              </code> - Get all token balances
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;