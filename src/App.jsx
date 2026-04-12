import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldCheck, Send, History, Wallet, Bell, Loader2, UserCircle } from 'lucide-react';

export default function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  // --- STATE MANAGEMENT ---
  const [data, setData] = useState({ summary: null, transactions: [] });
  const [loading, setLoading] = useState(true);
  
  // New States for dynamic selection
  const [customers, setCustomers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [currentCustomerId, setCurrentCustomerId] = useState(1); // Defaults to user 1 on load
  const [senderAccountId, setSenderAccountId] = useState(''); // Selected account to send money FROM
  
  // Transfer Form States
  const [transferAmount, setTransferAmount] = useState('');
  const [receiverId, setReceiverId] = useState('');

  // 1. Fetch ALL customers on load
useEffect(() => {
  axios.get(`${API_URL}/api/customers`)
    .then(res => setCustomers(res.data))
    .catch(err => console.error(err));
}, []);

// 2. Fetch Dashboard & Accounts when currentCustomerId changes
useEffect(() => {
  setLoading(true);
  
  // Fetch Dashboard Stats
  axios.get(`${API_URL}/api/dashboard/${currentCustomerId}`)
    .then(res => setData(res.data))
    .catch(err => console.error(err));
  
  // Fetch specific accounts for the Transfer Dropdown
  axios.get(`${API_URL}/api/accounts/${currentCustomerId}`)
    .then(res => {
      setAccounts(res.data);
      // Auto-select their first account
      setSenderAccountId(res.data.length > 0 ? res.data[0].account_id : '');
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
}, [currentCustomerId]);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!senderAccountId) return alert("Select an account to send from.");
    
    try {
      await axios.post('${API_URL}/api/transfer', {
        senderAccountId: parseInt(senderAccountId),
        receiverAccountId: parseInt(receiverId),
        amount: parseFloat(transferAmount)
      });
      alert('Transfer Successful!');
      setTransferAmount('');
      setReceiverId('');
      
      const dashResponse = await axios.get(`${API_URL}/api/dashboard/${currentCustomerId}`);
      setData(dashResponse.data);
      
    } catch (error) {
      alert(error.response?.data?.error || 'Transfer failed');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center text-emerald-500">
      <Loader2 className="w-12 h-12 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans p-6">
      <nav className="flex justify-between items-center mb-10 border-b border-slate-700 pb-4 max-w-[90%] mx-auto">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-emerald-500 w-8 h-8" />
          <h1 className="text-2xl font-bold text-white tracking-wide">Commit<span className="text-emerald-500">Vault</span></h1>
        </div>
        
        <div className="flex items-center gap-4">
          <UserCircle className="w-7 h-7 text-slate-400" />
          <select 
            value={currentCustomerId} 
            onChange={(e) => setCurrentCustomerId(e.target.value)}
            className="bg-slate-800 text-white border border-slate-700 p-2 rounded-lg outline-none focus:border-emerald-500 cursor-pointer"
          >
            {customers.map(customer => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.name}
              </option>
            ))}
          </select>
          <Bell className="w-7 h-7 text-slate-400 cursor-pointer ml-4" />
        </div>
      </nav>

      <div className="max-w-[90%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <h2 className="text-slate-400 text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Total Portfolio
            </h2>
            <p className="text-4xl font-bold text-white mb-1">
              ₹{parseFloat(data.summary?.total_portfolio_balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-emerald-400 text-sm">{data.summary?.total_accounts} Active Accounts</p>
          </div>

          <form onSubmit={handleTransfer} className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col gap-4">
            <h3 className="text-white font-bold flex items-center gap-2"><Send className="w-4 h-4 text-emerald-500"/> Quick Transfer</h3>
            
            {/* ADD THIS RIGHT ABOVE THE RECEIVER ID INPUT */}
            <select 
              value={senderAccountId}
              onChange={(e) => setSenderAccountId(e.target.value)}
              className="w-full bg-slate-900 text-white p-3 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none cursor-pointer"
              required
            >
              <option value="" disabled>Select From Account...</option>
              {accounts.map(acc => (
                <option key={acc.account_id} value={acc.account_id}>
                  {acc.account_type} - ID: {acc.account_id} (₹{parseFloat(acc.balance).toLocaleString()})
                </option>
              ))}
            </select>
            
            <input 
              type="number" 
              placeholder="Receiver Account ID (e.g. 2)" 
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="w-full bg-slate-900 text-white p-3 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
              required
            />
            <input 
              type="number" 
              placeholder="Amount (₹)" 
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              className="w-full bg-slate-900 text-white p-3 rounded-xl border border-slate-700 focus:border-emerald-500 outline-none"
              required
            />
            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl font-bold transition-colors shadow-lg">
              Confirm Transfer
            </button>
          </form>
        </div>

        <div className="md:col-span-2 bg-slate-800 rounded-2xl border border-slate-700 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-bold text-white flex items-center gap-2"><History className="w-5 h-5"/> Recent Transactions</h2>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Date</th>
                  <th className="p-4 font-medium">Description</th>
                  <th className="p-4 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {data.transactions.map((txn) => (
                  <tr key={txn.transaction_id} className="hover:bg-slate-700/50 transition-colors">
                    <td className="p-4 text-sm text-slate-300">
                      {new Date(txn.transaction_date).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm">
                      <p className="text-white font-medium">{txn.description}</p>
                      <p className="text-xs text-slate-500">{txn.transaction_type}</p>
                    </td>
                    <td className={`p-4 text-right font-bold ${txn.transaction_type.includes('In') || txn.transaction_type === 'Deposit' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {txn.transaction_type.includes('In') || txn.transaction_type === 'Deposit' ? '+' : '-'}₹{parseFloat(txn.amount).toFixed(2)}
                    </td>
                  </tr>
                ))}
                {data.transactions.length === 0 && (
                  <tr><td colSpan="3" className="p-8 text-center text-slate-500">No transactions found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}