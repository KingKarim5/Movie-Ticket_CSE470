import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/Appcontext';
import toast from 'react-hot-toast';

const Admin_Promos = () => {
  const { axios, getToken } = useAppContext();
  const [promos, setPromos] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    code: '', type: 'percent', value: '', maxDiscount: '', minAmount: '', validFrom: '', validTo: '', usageLimit: '', isActive: true
  });

  const loadPromos = async () => {
    try {
      const { data } = await axios.get('/api/admin/promos', { headers: { Authorization: `Bearer ${await getToken()}` } });
      if (data.success) setPromos(data.promos);
    } catch (e) { toast.error('Failed to load promos'); }
  };

  useEffect(() => { loadPromos(); }, []);

  const createPromo = async (e) => {
    e.preventDefault();
    try {
      setCreating(true);
      const payload = { ...form };
      ['value','maxDiscount','minAmount','usageLimit'].forEach(k => { if (payload[k] === '') delete payload[k]; else payload[k] = Number(payload[k]); });
      ['validFrom','validTo'].forEach(k => { if (!payload[k]) delete payload[k]; });
      const { data } = await axios.post('/api/admin/promos', payload, { headers: { Authorization: `Bearer ${await getToken()}` } });
      if (data.success) {
        toast.success('Promo created');
        setForm({ code: '', type: 'percent', value: '', maxDiscount: '', minAmount: '', validFrom: '', validTo: '', usageLimit: '', isActive: true });
        loadPromos();
      } else toast.error(data.message);
    } catch (e) { toast.error(e.response?.data?.message || e.message); }
    finally { setCreating(false); }
  };

  const togglePromo = async (id) => {
    try {
      const { data } = await axios.patch(`/api/admin/promos/${id}/toggle`, {}, { headers: { Authorization: `Bearer ${await getToken()}` } });
      if (data.success) { toast.success('Updated'); loadPromos(); } else toast.error(data.message);
    } catch (e) { toast.error('Update failed'); }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Promotions</h1>

      <form onSubmit={createPromo} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
        <input className="px-3 py-2 bg-black text-white border border-white/10 rounded" placeholder="CODE" value={form.code} onChange={e=>setForm({...form, code:e.target.value})} required />
        <select className="px-3 py-2 bg-black text-white border border-white/10 rounded" value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
          <option value="percent">Percent %</option>
          <option value="amount">Amount</option>
        </select>
        <input className="px-3 py-2 bg-black text-white border border-white/10 rounded" type="number" step="0.01" placeholder="Value" value={form.value} onChange={e=>setForm({...form, value:e.target.value})} required />
        <input className="px-3 py-2 bg-black text-white border border-white/10 rounded" type="number" step="0.01" placeholder="Max Discount (optional)" value={form.maxDiscount} onChange={e=>setForm({...form, maxDiscount:e.target.value})} />
        <input className="px-3 py-2 bg-black text-white border border-white/10 rounded" type="number" step="0.01" placeholder="Min Amount (optional)" value={form.minAmount} onChange={e=>setForm({...form, minAmount:e.target.value})} />
        <input className="px-3 py-2 bg-black text-white border border-white/10 rounded" type="datetime-local" placeholder="Valid From" value={form.validFrom} onChange={e=>setForm({...form, validFrom:e.target.value})} />
        <input className="px-3 py-2 bg-black text-white border border-white/10 rounded" type="datetime-local" placeholder="Valid To" value={form.validTo} onChange={e=>setForm({...form, validTo:e.target.value})} />
        <input className="px-3 py-2 bg-black text-white border border-white/10 rounded" type="number" placeholder="Usage Limit (optional)" value={form.usageLimit} onChange={e=>setForm({...form, usageLimit:e.target.value})} />
        <label className="flex items-center gap-2 text-white"><input type="checkbox" checked={form.isActive} onChange={e=>setForm({...form, isActive:e.target.checked})} /> Active</label>
        <button disabled={creating} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded disabled:opacity-60">Create</button>
      </form>

      <div className="mt-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-900 text-white">
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Type</th>
              <th className="p-2 text-left">Value</th>
              <th className="p-2 text-left">Active</th>
              <th className="p-2 text-left">Window</th>
              <th className="p-2 text-left">Usage</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {promos.map(p => (
              <tr key={p._id} className="border-t border-white/10 text-white">
                <td className="p-2 font-semibold">{p.code}</td>
                <td className="p-2">{p.type}</td>
                <td className="p-2">{p.type==='percent'? `${p.value}%`:`BDT ${p.value}`}</td>
                <td className="p-2">{p.isActive ? 'Yes':'No'}</td>
                <td className="p-2">{p.validFrom ? new Date(p.validFrom).toLocaleString(): '-'} → {p.validTo ? new Date(p.validTo).toLocaleString() : '-'}</td>
                <td className="p-2">{p.usedCount || 0}{p.usageLimit?` / ${p.usageLimit}`:''}</td>
                <td className="p-2">
                  <button onClick={()=>togglePromo(p._id)} className="px-3 py-1 rounded bg-black/40 border border-white/10 hover:bg-black/60">{p.isActive?'Disable':'Enable'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin_Promos;


