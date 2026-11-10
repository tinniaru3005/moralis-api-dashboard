# Moralis API Dashboard

A full-stack web application that provides a dashboard interface for testing Moralis Web3 API endpoints. 

## 🚀 Features

- **Health Check**: Test backend service availability
- **Balance Retrieval**: Get native token balance for any wallet address
- **Token Information**: Fetch all token balances for a wallet
- **Multi-Chain Support**: Works with Ethereum, Polygon, BSC, and Avalanche
- **Real-time API Testing**: Interactive dashboard with live API responses
- **Error Handling**: Comprehensive error display and logging

## 📁 Project Structure

```
project/
├── backend/          # Node.js Express server
│   ├── config/
│   │   └── moralis.js    # Moralis configuration
│   ├── routes/
│   │   └── moralis.js    # API route handlers
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env             # Environment variables (MORALIS_API_KEY)
├── frontend/         # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js    # Main React component
│   │   └── index.js  # React entry point
│   └── package.json  # Frontend dependencies
└── .gitignore
└── README.md
```

## 🛠️ Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Moralis API Key

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone git@github.com:tinniaru3005/moralis-api-dashboard.git
cd moralis-api-dashboard
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with your Moralis API key:

```env
MORALIS_API_KEY=your_moralis_api_key_here
```

The backend structure includes:
- `config/moralis.js` - Moralis SDK configuration and initialization
- `routes/moralis.js` - API route handlers for health, balance, and token endpoints
- `server.js` - Main Express server setup

Start the backend server:

```bash
npm start
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## 🎯 Usage

1. **Start the Backend**: Ensure the backend server is running on port 3001
2. **Start the Frontend**: Launch the React dashboard on port 3000
3. **Test the API**: Use the dashboard to interact with Moralis endpoints

### Available API Endpoints

- `GET /api/moralis/health` - Service health check
- `GET /api/moralis/balance/:address?chain=eth` - Get native token balance
- `GET /api/moralis/tokens/:address?chain=eth` - Get all token balances

### Supported Blockchains

- **Ethereum** (`eth`)
- **Polygon** (`polygon`) 
- **Binance Smart Chain** (`bsc`)
- **Avalanche** (`avalanche`)

## 🔧 Configuration

### Backend Configuration

The backend expects this environment variable in the `.env` file:

- `MORALIS_API_KEY`: Your Moralis Web3 API key (required)

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:3001/api/moralis`. 

## 📖 API Documentation

### Health Check
```
GET /api/moralis/health
Response: { "status": "healthy", "timestamp": "..." }
```

### Get Balance
```
GET /api/moralis/balance/0x123...?chain=eth
Response: { "success": true, "data": { "balance": "1.234" } }
```

### Get Tokens
```
GET /api/moralis/tokens/0x123...?chain=eth  
Response: { "success": true, "data": [...] }
```

## 📦 Dependencies

### Backend
- Express.js - Web framework
- Moralis SDK - Web3 API integration  
- dotenv - Environment variables
- cors - Cross-origin requests

### Frontend
- React 18 - UI framework
- No additional dependencies (vanilla React)

## Screenshots

### Frontend
<img width="1470" height="276" alt="Screenshot 2025-08-21 at 12 31 42 AM" src="https://github.com/user-attachments/assets/2c0c862f-aa17-412a-babb-a82ea37ce22e" />

<img width="1470" height="694" alt="Screenshot 2025-08-21 at 12 29 41 AM" src="https://github.com/user-attachments/assets/8259e2ad-aa8e-4ed9-9d5d-f344d229b6d0" />

<img width="1470" height="879" alt="Screenshot 2025-08-21 at 12 29 53 AM" src="https://github.com/user-attachments/assets/8bb9731e-ec34-4171-a66d-4a174b5b59ed" />


### Backend

<img width="1176" height="274" alt="Screenshot 2025-08-21 at 12 05 12 AM" src="https://github.com/user-attachments/assets/89112177-2584-4e0c-a921-a722334814a2" />

## 📄 License

This project is licensed under the MIT License.
