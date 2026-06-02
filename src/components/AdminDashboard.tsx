import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Search, Trash2, Download, UserPlus, Filter, ShieldAlert, BadgeCheck, PhoneCall, RefreshCw, Mail, Calendar, MapPin, Tag } from 'lucide-react';
import { LeadSubmission } from '../types';
import { INITIAL_LEADS } from '../data';

interface AdminDashboardProps {
  onLeadChangeTrigger: number;
}

export default function AdminDashboard({ onLeadChangeTrigger }: AdminDashboardProps) {
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [adminNote, setAdminNote] = useState('');

  // Loaded from localStorage, fallback to INITIAL_LEADS if none
  const loadLeads = () => {
    try {
      const stored = localStorage.getItem('sanjose_leads');
      if (stored) {
        setLeads(JSON.parse(stored));
      } else {
        localStorage.setItem('sanjose_leads', JSON.stringify(INITIAL_LEADS));
        setLeads(INITIAL_LEADS);
      }
    } catch (err) {
      console.error('Failed to parse leads from localstorage', err);
      setLeads(INITIAL_LEADS);
    }
  };

  useEffect(() => {
    loadLeads();
  }, [onLeadChangeTrigger]);

  const handleStatusChange = (id: string, newStatus: LeadSubmission['status']) => {
    const updated = leads.map((l) => {
      if (l.id === id) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('sanjose_leads', JSON.stringify(updated));
  };

  const handleAddNote = (id: string) => {
    const updated = leads.map((l) => {
      if (l.id === id) {
        return { ...l, notes: l.notes ? `${l.notes} | ${adminNote}` : adminNote };
      }
      return l;
    });
    setLeads(updated);
    localStorage.setItem('sanjose_leads', JSON.stringify(updated));
    setEditingLead(null);
    setAdminNote('');
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa hồ sơ này? Hành động này dứt khoát không thể khôi phục.')) {
      const updated = leads.filter((l) => l.id !== id);
      setLeads(updated);
      localStorage.setItem('sanjose_leads', JSON.stringify(updated));
    }
  };

  const handleResetDatabase = () => {
    if (confirm('Khôi phục toàn bộ biểu mẫu ứng tuyển mẫu ban đầu? Toàn bộ lead bạn tự điền thử sẽ bị reset.')) {
      localStorage.setItem('sanjose_leads', JSON.stringify(INITIAL_LEADS));
      setLeads(INITIAL_LEADS);
    }
  };

  // Export as download file (Simulated JSON format)
  const handleExportData = () => {
    try {
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(leads, null, 2)
      )}`;
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', jsonString);
      downloadAnchor.setAttribute('download', 'SanJose_RealEstate_Applicants.json');
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      alert('Không thể xuất dữ liệu lúc này');
    }
  };

  // Calculate Metrics
  const totalLeads = leads.length;
  const vipLeads = leads.filter(l => l.status === 'vip').length;
  const qualifiedLeads = leads.filter(l => l.status === 'qualified' || l.status === 'vip').length;
  
  const downpaymentAbove400Ratio = totalLeads > 0 
    ? Math.round((leads.filter(l => l.downPayment === 'above_400').length / totalLeads) * 100) 
    : 0;

  const preApprovedRatio = totalLeads > 0 
    ? Math.round((leads.filter(l => l.preApproved === 'yes' || l.preApproved === 'cash').length / totalLeads) * 100)
    : 0;

  // Filter and search logic
  const filteredLeads = leads.filter((lead) => {
    // Search query
    const matchSearch =
      lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);

    // Filter status
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchSearch && matchStatus;
  });

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl mt-12" id="admin-hub-dashboard">
      
      {/* Top Title Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-500">
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
            </span>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Lead Hub: Bảng Điều Khiển Sàng Lọc Quy Trình DRM
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dành riêng cho Evan & Success Success Manager quản lý thông số tài chính của ứng viên San Jose.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            onClick={handleExportData}
            className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Xuất cơ sở dữ liệu làm báo cáo dạng JSON"
          >
            <Download className="w-3.5 h-3.5" /> Xuất dữ liệu
          </button>
          
          <button
            onClick={handleResetDatabase}
            className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30 text-red-400 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
            title="Đặt lại danh sách ban đầu để kiểm thử lại"
          >
            Reset Mẫu
          </button>
        </div>
      </div>

      {/* KPI Indicator Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6">
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-1">
            Tổng Lượt Đắp Phễu
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalLeads} hồ sơ</div>
          <div className="text-[10px] text-slate-400 mt-1">Được lưu cục bộ tại localStorage</div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-1 flex items-center gap-1">
            Hồ Sơ VIP Tuyển Thẳng <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-2xl font-bold text-amber-500 font-mono">{vipLeads} hồ sơ</div>
          <div className="text-[10px] text-slate-400 mt-1">
            Có sẵn Pre-Approval & Vốn tự có &gt;$400k
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-1">
            Tỷ Lệ Pre-Approved
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">{preApprovedRatio}%</div>
          <div className="w-full bg-slate-900 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${preApprovedRatio}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850">
          <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-1">
            Vốn Tự Có Vượt Trội (&gt;$400k)
          </div>
          <div className="text-2xl font-bold text-indigo-400 font-mono">{downpaymentAbove400Ratio}%</div>
          <div className="w-full bg-slate-900 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-indigo-400 h-full rounded-full" style={{ width: `${downpaymentAbove400Ratio}%` }}></div>
          </div>
        </div>
      </div>

      {/* Inputs Filter & Search Controllers */}
      <div className="flex flex-col sm:flex-row gap-3 pb-4">
        {/* Search bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên, email, SĐT hồ sơ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 hover:border-slate-700/80 focus:border-amber-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
          />
        </div>

        {/* Dropdown status Filter */}
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-1 bg-clip-padding rounded-xl">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Lọc status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer font-medium font-sans border-0 pr-6 py-1"
          >
            <option value="all" className="bg-slate-950 text-slate-300">Tất cả trạng thái</option>
            <option value="vip" className="bg-slate-950 text-amber-500 font-bold">Hồ sơ VIP (Hàng đầu)</option>
            <option value="qualified" className="bg-slate-950 text-emerald-400">Đủ điều kiện</option>
            <option value="pending" className="bg-slate-950 text-indigo-400">Chờ xét duyệt</option>
            <option value="not_qualified" className="bg-slate-950 text-slate-500">Chưa đáp ứng đề xuất</option>
            <option value="contacted" className="bg-slate-950 text-sky-400">Đã gọi hỗ trợ</option>
          </select>
        </div>
      </div>

      {/* Main submissions list table */}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-850 bg-slate-900/60 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
              <th className="p-4">Ứng Viên / Thời Gian</th>
              <th className="p-4">Khu Vực Mong Muốn</th>
              <th className="p-4">Tài Chính & Pre-App</th>
              <th className="p-4">Phân Phối Lọc</th>
              <th className="p-4 text-right">Quản lý duyệt hồ sơ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-850">
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => {
                const relativeTime = new Date(lead.timestamp).toLocaleDateString();

                return (
                  <tr key={lead.id} className="hover:bg-slate-900/30 transition-all font-sans">
                    {/* Candidate Identity */}
                    <td className="p-4 space-y-1">
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        {lead.fullName}
                        {lead.status === 'vip' && (
                          <span className="p-0.5 rounded-full bg-amber-500/10 text-amber-400" title="VVIP Tier">
                            <Sparkles className="w-3.5 h-3.5 fill-current" />
                          </span>
                        )}
                      </div>
                      <div className="text-slate-400 flex flex-col gap-0.5 font-mono text-[11px]">
                        <span className="flex items-center gap-1">✉ {lead.email}</span>
                        <span className="flex items-center gap-1">☎ {lead.phone}</span>
                        <span className="text-[10px] text-slate-500 font-semibold mt-0.5">⏱ Nộp: {relativeTime}</span>
                      </div>
                    </td>

                    {/* Needs & Target Location */}
                    <td className="p-4 space-y-1">
                      <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded font-medium text-[10px] leading-tight inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        Khu vực tìm kiếm
                      </span>
                      <div className="text-xs text-white font-bold font-sans">
                        {lead.targetLocation || 'San Jose General'}
                      </div>
                    </td>

                    {/* Downpayment & Pre-Approval status */}
                    <td className="p-4 space-y-1">
                      <div className="font-mono font-bold text-slate-200">
                        {lead.downPayment === 'above_400' 
                          ? 'Trên $400,000 Down' 
                          : lead.downPayment === '200_400' 
                          ? '$200k - $400k Down' 
                          : 'Dưới $200k Down'}
                      </div>
                      <span className={`text-[10px] font-mono font-bold uppercase rounded-sm px-1.5 py-0.2 select-none inline-block ${
                        lead.preApproved === 'yes'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : lead.preApproved === 'cash'
                          ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                          : lead.preApproved === 'no_credit_ok'
                          ? 'bg-indigo-500/12 text-indigo-400 border border-indigo-500/25'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {lead.preApproved === 'yes' 
                          ? 'Sẵn Pre-Approval' 
                          : lead.preApproved === 'cash' 
                          ? 'Mua Tiền Mặt' 
                          : lead.preApproved === 'no_credit_ok' 
                          ? 'Làm Pre-Approval gấp' 
                          : 'Chưa có Pre-Approval'}
                      </span>
                    </td>

                    {/* Status Badge Tag */}
                    <td className="p-4">
                      <div className="flex flex-col gap-1.5">
                        <span className={`px-2 py-1 text-[10px] font-mono rounded-lg w-max text-center font-bold border ${
                          lead.status === 'vip' 
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' 
                            : lead.status === 'qualified' 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : lead.status === 'pending'
                            ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
                            : lead.status === 'contacted'
                            ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                            : 'bg-slate-900 border-slate-800 text-slate-500LineThrough text-slate-500'
                        }`}>
                          {lead.status === 'vip' ? '🔥 VIP PROFILE' : lead.status === 'qualified' ? '✓ QUALIFIED' : lead.status === 'pending' ? '⏱ CHỜ PHẢN HỒI' : lead.status === 'contacted' ? '📞 ĐÃ LIÊN HỆ' : '✗ CHƯA ĐẠT CHUẨN'}
                        </span>
                        
                        {lead.notes && (
                          <div className="text-[11px] text-slate-400 leading-normal max-w-[240px] italic border-l-2 border-slate-850 pl-2">
                            {lead.notes}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Administrator Actions */}
                    <td className="p-4 text-right space-y-1.5 min-w-[140px]">
                      <div className="flex justify-end gap-1 flex-wrap">
                        {lead.status !== 'contacted' && (
                          <button
                            onClick={() => handleStatusChange(lead.id, 'contacted')}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-sky-400 hover:text-sky-300 rounded border border-slate-800 cursor-pointer"
                            title="Xác nhận đã gọi điện đàm thoại"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {lead.status !== 'vip' && lead.downPayment === 'above_400' && (
                          <button
                            onClick={() => handleStatusChange(lead.id, 'vip')}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 rounded border border-slate-800 cursor-pointer"
                            title="Khuyên dùng nâng thành hồ sơ VIP VVIP"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {lead.status !== 'qualified' && lead.status !== 'vip' && (
                          <button
                            onClick={() => handleStatusChange(lead.id, 'qualified')}
                            className="p-1.5 bg-slate-900 hover:bg-slate-800 text-emerald-400 hover:text-emerald-300 rounded border border-slate-800 cursor-pointer"
                            title="Mark as standard qualified partner"
                          >
                            <BadgeCheck className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setEditingLead(lead.id);
                            setAdminNote(lead.notes || '');
                          }}
                          className="px-2 py-1 text-[10px] font-mono bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded text-slate-300 cursor-pointer font-semibold"
                        >
                          +Note/Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 bg-slate-950 hover:bg-red-950/40 border border-slate-850 hover:border-red-900/30 text-slate-600 hover:text-red-400 rounded cursor-pointer"
                          title="Hủy nộp đơn khỏi bảng"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Modal popup Inline-style note edit */}
                      {editingLead === lead.id && (
                        <div className="text-left mt-2 p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                          <span className="text-[9px] font-mono text-amber-500 font-bold block">Nhập ghi chú quản trị:</span>
                          <textarea
                            value={adminNote}
                            onChange={(e) => setAdminNote(e.target.value)}
                            className="w-full bg-slate-900 text-xs text-white border border-slate-800 rounded p-1.5 focus:outline-none focus:border-amber-500 font-sans h-16 resize-none"
                            placeholder="Ghi chú phản hồi cuộc gọi, tư vấn..."
                          />
                          <div className="flex gap-1.5 justify-end">
                            <button
                              onClick={() => setEditingLead(null)}
                              className="px-2 py-0.5 text-[9px] bg-slate-900 text-slate-400 rounded cursor-pointer border border-slate-800"
                            >
                              Hủy
                            </button>
                            <button
                              onClick={() => handleAddNote(lead.id)}
                              className="px-2 py-0.5 text-[9px] bg-amber-500 text-slate-950 font-bold rounded cursor-pointer"
                            >
                              Ghi Lưu
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 text-sm">
                  Không tìm thấy hồ sơ ứng viên thỏa mãn dữ kiện tìm kiếm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
