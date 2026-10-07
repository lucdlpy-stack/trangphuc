import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Shirt, Users, Calendar, DollarSign, Camera, Plus, Search, 
  Trash2, Edit, CheckCircle, Clock, AlertTriangle, FileText, 
  Printer, ArrowUpRight, TrendingUp, RefreshCw, X, ChevronRight,
  Filter, Phone, MapPin, Tag, Box, Check, Eye, AlertCircle,
  Sparkles, Wrench, PackageCheck, Layers, ChevronDown, PlusCircle
} from 'lucide-react';

const STORE_NAME = "Trang phục biểu diễn Dương Khiêm";
const STORE_SLOGAN = "Cho thuê Trang Phục & Đạo Cụ Sân Khấu Chuyên Nghiệp";

const INITIAL_COSTUMES = [
  {
    id: 'SP001',
    name: 'Áo dài Nữ Cách tân Gấm Sen',
    category: 'Áo dài nữ',
    totalQty: 10,
    pricePerDay: 150000,
    depositPerItem: 300000,
    sizes: ['S', 'M', 'L'],
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    notes: 'Vải gấm cao cấp thêu hoa sen'
  },
  {
    id: 'SP002',
    name: 'Áo dài Nam Rồng Vàng Thêu',
    category: 'Áo dài nam',
    totalQty: 8,
    pricePerDay: 180000,
    depositPerItem: 350000,
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    notes: 'Kèm khăn đóng đồng bộ'
  },
  {
    id: 'SP003',
    name: 'Trang phục Thổ cẩm Tây Nguyên',
    category: 'Đồ Tây Nguyên',
    totalQty: 12,
    pricePerDay: 120000,
    depositPerItem: 200000,
    sizes: ['Free size'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    notes: 'Kèm phụ kiện vòng bạc, khuyên tai'
  },
  {
    id: 'SP004',
    name: 'Cổ phục Nhật Bình Triều Nguyễn',
    category: 'Cổ phục Việt',
    totalQty: 5,
    pricePerDay: 350000,
    depositPerItem: 800000,
    sizes: ['S', 'M'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    notes: 'Thêu ngũ sắc, mấn mạ vàng'
  },
  {
    id: 'DC001',
    name: 'Nón Lá Huế Vẽ Tranh Dây Lụa',
    category: 'Đạo cụ biểu diễn',
    totalQty: 30,
    pricePerDay: 25000,
    depositPerItem: 50000,
    sizes: ['Chuẩn'],
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    notes: 'Nón lá chóp tròn, dây đeo lụa nhiều màu'
  },
  {
    id: 'DC002',
    name: 'Cánh Sen Múa Khổng Lồ (Đôi)',
    category: 'Đạo cụ biểu diễn',
    totalQty: 16,
    pricePerDay: 50000,
    depositPerItem: 100000,
    sizes: ['Đk 80cm'],
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80',
    notes: 'Voan xếp tầng tạo hiệu ứng hoa xòe'
  },
  {
    id: 'DC003',
    name: 'Đôi Thúng Tre & Đòn Gánh Múa',
    category: 'Đạo cụ biểu diễn',
    totalQty: 10,
    pricePerDay: 60000,
    depositPerItem: 150000,
    sizes: ['Đk 45cm'],
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    notes: 'Bộ 1 đòn gánh và 2 thúng tre mộc đan tinh xảo'
  },
  {
    id: 'DC004',
    name: 'Cây Tre / Gậy Biểu Diễn Làng Quê',
    category: 'Đạo cụ biểu diễn',
    totalQty: 25,
    pricePerDay: 20000,
    depositPerItem: 40000,
    sizes: ['Dài 1m6'],
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    notes: 'Dùng múa sạp, múa võ tái hiện sân khấu'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'DK-101',
    customerName: 'Nguyễn Thị Mai',
    customerPhone: '0912345678',
    customerAddress: 'Tân Lợi, Buôn Ma Thuột',
    rentDate: '2026-10-05',
    expectedReturnDate: '2026-10-08',
    actualReturnDate: null,
    items: [
      { costumeId: 'SP001', costumeName: 'Áo dài Nữ Cách tân Gấm Sen', quantity: 2, price: 150000, deposit: 300000 },
      { costumeId: 'DC001', costumeName: 'Nón Lá Huế Vẽ Tranh Dây Lụa', quantity: 2, price: 25000, deposit: 50000 }
    ],
    totalRentalCost: 350000,
    totalDeposit: 700000,
    paidAmount: 350000,
    status: 'ACTIVE',
    notes: 'Giữ CCCD và cọc 700k'
  },
  {
    id: 'DK-102',
    customerName: 'Trần Văn Hoàng',
    customerPhone: '0988776655',
    customerAddress: 'Sơn Hòa, Phú Yên',
    rentDate: '2026-10-04',
    expectedReturnDate: '2026-10-06',
    actualReturnDate: null,
    items: [
      { costumeId: 'SP003', costumeName: 'Trang phục Thổ cẩm Tây Nguyên', quantity: 4, price: 120000, deposit: 200000 },
      { costumeId: 'DC004', costumeName: 'Cây Tre / Gậy Biểu Diễn', quantity: 4, price: 20000, deposit: 40000 }
    ],
    totalRentalCost: 560000,
    totalDeposit: 960000,
    paidAmount: 300000,
    status: 'OVERDUE',
    notes: 'Đoàn văn nghệ trường THPT'
  },
  {
    id: 'DK-103',
    customerName: 'Lê Thảo My',
    customerPhone: '0905123987',
    customerAddress: 'Tuy Hòa, Phú Yên',
    rentDate: '2026-10-01',
    expectedReturnDate: '2026-10-03',
    actualReturnDate: '2026-10-03',
    items: [
      { costumeId: 'SP004', costumeName: 'Cổ phục Nhật Bình Triều Nguyễn', quantity: 1, price: 350000, deposit: 800000 }
    ],
    totalRentalCost: 350000,
    totalDeposit: 800000,
    paidAmount: 350000,
    status: 'RETURNED',
    notes: 'Đã hoàn trả đủ tiền cọc'
  }
];

const CATEGORIES = [
  'Tất cả',
  'Đạo cụ biểu diễn',
  'Áo dài nữ',
  'Áo dài nam',
  'Đồ Tây Nguyên',
  'Cổ phục Việt'
];

const formatMoney = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}`;
  return dateStr;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('ORDERS'); // 'ORDERS', 'COSTUMES', 'STATS'
  
  const [costumes, setCostumes] = useState(() => {
    const saved = localStorage.getItem('dk_costumes_v3');
    return saved ? JSON.parse(saved) : INITIAL_COSTUMES;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dk_orders_v3');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('dk_costumes_v3', JSON.stringify(costumes));
  }, [costumes]);

  useEffect(() => {
    localStorage.setItem('dk_orders_v3', JSON.stringify(orders));
  }, [orders]);

  // Dynamic stock calculation
  const costumesInventory = useMemo(() => {
    const rentedMap = {};
    orders.forEach(order => {
      if (order.status === 'ACTIVE' || order.status === 'OVERDUE') {
        order.items.forEach(item => {
          rentedMap[item.costumeId] = (rentedMap[item.costumeId] || 0) + Number(item.quantity);
        });
      }
    });

    return costumes.map(c => {
      const rented = rentedMap[c.id] || 0;
      const available = Math.max(0, c.totalQty - rented);
      return {
        ...c,
        rentedQty: rented,
        availableQty: available
      };
    });
  }, [costumes, orders]);

  // Modals state
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCostumeModal, setShowCostumeModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);
  const [editingCostume, setEditingCostume] = useState(null);

  // Notification toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status: 'RETURNED',
          actualReturnDate: new Date().toISOString().split('T')[0],
          paidAmount: o.totalRentalCost
        };
      }
      return o;
    }));
    showToast('Đã nhận trả đồ & cập nhật kho!');
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc muốn xóa đơn này?')) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast('Đã xóa đơn thuê!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-24 sm:pb-8">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-3 left-1/2 -translate-x-1/2 z-[100] max-w-[90%] bg-slate-900/90 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce">
          <CheckCircle size={16} className="text-emerald-400" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Modern Compact Header */}
      <header className="bg-white/95 backdrop-blur border-b border-slate-200 sticky top-0 z-30 px-4 py-3 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-200">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-tight text-slate-900 uppercase leading-none">
                {STORE_NAME}
              </h1>
              <p className="text-[10px] text-amber-600 font-semibold mt-0.5 flex items-center gap-1">
                <span>🎭</span> Cho thuê Trang Phục & Đạo Cụ
              </p>
            </div>
          </div>

          {/* Quick Add Button on Header for mobile */}
          <button
            onClick={() => {
              if (activeTab === 'COSTUMES') {
                setEditingCostume(null);
                setShowCostumeModal(true);
              } else {
                setShowOrderModal(true);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md active:scale-95 transition"
          >
            <Plus size={15} />
            <span>{activeTab === 'COSTUMES' ? 'Thêm đồ' : 'Tạo đơn'}</span>
          </button>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-6 pt-3">
        {activeTab === 'ORDERS' && (
          <MobileOrdersView
            orders={orders}
            onOpenCreate={() => setShowOrderModal(true)}
            onCompleteOrder={handleCompleteOrder}
            onDeleteOrder={handleDeleteOrder}
            onPrint={(order) => {
              setSelectedOrderForPrint(order);
              setShowPrintModal(true);
            }}
          />
        )}

        {activeTab === 'COSTUMES' && (
          <MobileCostumesView
            costumesInventory={costumesInventory}
            onOpenAdd={() => {
              setEditingCostume(null);
              setShowCostumeModal(true);
            }}
            onEdit={(costume) => {
              setEditingCostume(costume);
              setShowCostumeModal(true);
            }}
            onDelete={(id) => {
              if (window.confirm('Xóa sản phẩm này khỏi kho?')) {
                setCostumes(prev => prev.filter(c => c.id !== id));
                showToast('Đã xóa sản phẩm!');
              }
            }}
          />
        )}

        {activeTab === 'STATS' && (
          <MobileStatsView orders={orders} />
        )}
      </main>

      {/* Native App-Style Bottom Navigation Bar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 py-1.5 px-4 sm:hidden shadow-lg flex justify-around items-center">
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            activeTab === 'ORDERS' ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <FileText size={20} />
          <span className="text-[10px]">Đơn thuê ({orders.filter(o => o.status !== 'RETURNED').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('COSTUMES')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            activeTab === 'COSTUMES' ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <Box size={20} />
          <span className="text-[10px]">Kho & Đạo cụ</span>
        </button>

        <button
          onClick={() => setActiveTab('STATS')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            activeTab === 'STATS' ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <TrendingUp size={20} />
          <span className="text-[10px]">Doanh thu</span>
        </button>
      </nav>

      {/* Desktop Navigation pill (Shown on tablet / desktop) */}
      <div className="hidden sm:flex fixed bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-full p-1.5 gap-1 z-40">
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition ${
            activeTab === 'ORDERS' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText size={16} /> Đơn Thuê ({orders.filter(o => o.status !== 'RETURNED').length})
        </button>
        <button
          onClick={() => setActiveTab('COSTUMES')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition ${
            activeTab === 'COSTUMES' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Box size={16} /> Kho & Đạo Cụ ({costumes.length})
        </button>
        <button
          onClick={() => setActiveTab('STATS')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition ${
            activeTab === 'STATS' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <TrendingUp size={16} /> Thống Kê
        </button>
      </div>

      {/* MODAL / BOTTOM SHEET: Tạo Đơn Thuê Mới */}
      {showOrderModal && (
        <CreateOrderDrawer
          costumesInventory={costumesInventory}
          onClose={() => setShowOrderModal(false)}
          onSubmit={(newOrder) => {
            setOrders([newOrder, ...orders]);
            setShowOrderModal(false);
            showToast('Tạo đơn thuê thành công!');
          }}
        />
      )}

      {/* MODAL / BOTTOM SHEET: Thêm / Sửa Sản Phẩm (Camera hỗ trợ) */}
      {showCostumeModal && (
        <CostumeFormDrawer
          costume={editingCostume}
          onClose={() => {
            setShowCostumeModal(false);
            setEditingCostume(null);
          }}
          onSubmit={(costumeData) => {
            if (editingCostume) {
              setCostumes(prev => prev.map(c => c.id === costumeData.id ? costumeData : c));
              showToast('Đã cập nhật sản phẩm!');
            } else {
              setCostumes([costumeData, ...costumes]);
              showToast('Đã thêm vào kho đồ!');
            }
            setShowCostumeModal(false);
            setEditingCostume(null);
          }}
        />
      )}

      {/* MODAL: In hóa đơn */}
      {showPrintModal && selectedOrderForPrint && (
        <InvoiceDrawer
          order={selectedOrderForPrint}
          onClose={() => {
            setShowPrintModal(false);
            setSelectedOrderForPrint(null);
          }}
        />
      )}
    </div>
  );
}

function MobileOrdersView({ orders, onOpenCreate, onCompleteOrder, onDeleteOrder, onPrint }) {
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchSearch =
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.customerPhone.includes(search) ||
        o.id.toLowerCase().includes(search.toLowerCase());
      if (filter === 'ALL') return matchSearch;
      return matchSearch && o.status === filter;
    });
  }, [orders, search, filter]);

  return (
    <div className="space-y-3">
      {/* Search Bar & Quick Filter Pills */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm space-y-2.5">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm tên khách, SĐT hoặc mã đơn..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {[
            { id: 'ALL', label: 'Tất cả', count: orders.length },
            { id: 'ACTIVE', label: 'Đang thuê', count: orders.filter(o => o.status === 'ACTIVE').length },
            { id: 'OVERDUE', label: 'Quá hạn', count: orders.filter(o => o.status === 'OVERDUE').length },
            { id: 'RETURNED', label: 'Đã trả', count: orders.filter(o => o.status === 'RETURNED').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                filter === tab.id
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1 rounded-full ${
                filter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Cards Stack */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-400">
          <FileText size={36} className="mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-medium">Chưa có đơn thuê nào</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map(order => {
            const debt = Math.max(0, order.totalRentalCost - order.paidAmount);
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-sm flex flex-col justify-between gap-2.5"
              >
                {/* Header card: ID + Badge */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded-lg">
                      #{order.id}
                    </span>
                    <span className="font-bold text-sm text-slate-900">{order.customerName}</span>
                  </div>

                  {order.status === 'ACTIVE' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 flex items-center gap-1">
                      <Clock size={10} /> Đang thuê
                    </span>
                  )}
                  {order.status === 'OVERDUE' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <AlertTriangle size={10} /> Quá hạn
                    </span>
                  )}
                  {order.status === 'RETURNED' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                      <CheckCircle size={10} /> Đã trả
                    </span>
                  )}
                </div>

                {/* Body info: Items, phone, dates */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <a href={`tel:${order.customerPhone}`} className="text-blue-600 font-semibold flex items-center gap-1">
                      <Phone size={12} /> {order.customerPhone}
                    </a>
                    <span className="text-slate-400">
                      Hạn trả: <b className="text-slate-700">{formatDate(order.expectedReturnDate)}</b>
                    </span>
                  </div>

                  {/* Item list concise */}
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-1 mt-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-700 truncate max-w-[70%]">
                          • {it.costumeName}
                        </span>
                        <span className="font-bold text-rose-600 bg-white px-1.5 py-0.2 rounded border border-slate-200">
                          x{it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Financial mini summary */}
                  <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                    <div className="bg-slate-50 p-1.5 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Tiền thuê</span>
                      <b className="text-slate-800 text-xs">{formatMoney(order.totalRentalCost)}</b>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Tiền cọc</span>
                      <b className="text-amber-600 text-xs">{formatMoney(order.totalDeposit)}</b>
                    </div>
                    <div className="bg-slate-50 p-1.5 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">{debt > 0 ? 'Còn nợ' : 'Đã thanh toán'}</span>
                      <b className={`text-xs ${debt > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {debt > 0 ? formatMoney(debt) : 'Đủ'}
                      </b>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 truncate max-w-[45%]">
                    {order.notes || 'Không ghi chú'}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {order.status !== 'RETURNED' && (
                      <button
                        onClick={() => onCompleteOrder(order.id)}
                        className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition"
                      >
                        <Check size={13} /> Trả đồ
                      </button>
                    )}
                    <button
                      onClick={() => onPrint(order)}
                      className="p-1.5 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg"
                      title="In phiếu"
                    >
                      <Printer size={15} />
                    </button>
                    <button
                      onClick={() => onDeleteOrder(order.id)}
                      className="p-1.5 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-lg"
                      title="Xóa"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MobileCostumesView({ costumesInventory, onOpenAdd, onEdit, onDelete }) {
  const [cat, setCat] = useState('Tất cả');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return costumesInventory.filter(item => {
      const matchCat = cat === 'Tất cả' || item.category === cat;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [costumesInventory, cat, search]);

  return (
    <div className="space-y-3">
      {/* Search & Categories Horizontal Scroll */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm space-y-2">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm nón lá, gậy tre, áo dài..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setCat(category)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                cat === category
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category === 'Đạo cụ biểu diễn' && '🎭 '}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Items optimized for smartphone (2 columns on mobile) */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {filtered.map(item => {
          const isProp = item.category === 'Đạo cụ biểu diễn';
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-32 w-full bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  {item.id}
                </span>
                <span className={`absolute top-1.5 right-1.5 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                  isProp ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  {isProp ? 'Đạo cụ' : 'Trang phục'}
                </span>
              </div>

              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{item.name}</h3>
                  <div className="text-[11px] font-bold text-rose-600 mt-0.5">
                    {formatMoney(item.pricePerDay)}/ngày
                  </div>

                  {/* Stock counter */}
                  <div className="mt-2 grid grid-cols-2 gap-1 text-center bg-slate-50 p-1 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-[9px] text-slate-400 block">Tổng</span>
                      <b className="text-slate-800 text-xs">{item.totalQty}</b>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-600 font-bold block">Còn sẵn</span>
                      <b className="text-emerald-600 text-xs">{item.availableQty}</b>
                    </div>
                  </div>
                </div>

                {/* Edit buttons */}
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 truncate max-w-[50%]">
                    {Array.isArray(item.sizes) ? item.sizes[0] : 'Chuẩn'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 text-slate-500 hover:text-emerald-600 bg-slate-50 rounded"
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 bg-slate-50 rounded"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileStatsView({ orders }) {
  const [timeMode, setTimeMode] = useState('ALL');

  const stats = useMemo(() => {
    let rev = 0;
    let paid = 0;
    let debt = 0;
    let dep = 0;

    orders.forEach(o => {
      rev += Number(o.totalRentalCost || 0);
      paid += Number(o.paidAmount || 0);
      const curDebt = Math.max(0, (o.totalRentalCost || 0) - (o.paidAmount || 0));
      debt += curDebt;
      if (o.status !== 'RETURNED') {
        dep += Number(o.totalDeposit || 0);
      }
    });

    return { rev, paid, debt, dep };
  }, [orders]);

  const debtOrders = useMemo(() => {
    return orders.filter(o => (o.totalRentalCost - o.paidAmount) > 0);
  }, [orders]);

  return (
    <div className="space-y-3">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Tổng doanh thu</span>
          <div className="text-base font-black text-slate-900 mt-1">{formatMoney(stats.rev)}</div>
          <span className="text-[10px] text-slate-400">{orders.length} hóa đơn</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
          <span className="text-[10px] font-bold text-emerald-600 uppercase block">Đã thanh toán</span>
          <div className="text-base font-black text-emerald-600 mt-1">{formatMoney(stats.paid)}</div>
          <span className="text-[10px] text-slate-400">Thực thu vào két</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-sm">
          <span className="text-[10px] font-bold text-rose-600 uppercase block">Chưa thanh toán (Nợ)</span>
          <div className="text-base font-black text-rose-600 mt-1">{formatMoney(stats.debt)}</div>
          <span className="text-[10px] text-rose-500">Cần thu hồi</span>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm">
          <span className="text-[10px] font-bold text-amber-600 uppercase block">Tiền cọc đang giữ</span>
          <div className="text-base font-black text-amber-600 mt-1">{formatMoney(stats.dep)}</div>
          <span className="text-[10px] text-amber-600">Trả lại khi trả đồ</span>
        </div>
      </div>

      {/* Debt List */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="font-bold text-xs sm:text-sm text-slate-900 flex items-center gap-1.5">
          <AlertCircle size={16} className="text-rose-500" />
          <span>Danh sách đơn còn nợ ({debtOrders.length})</span>
        </h3>

        {debtOrders.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">Không có khoản nợ nào cần thu hồi!</p>
        ) : (
          <div className="space-y-2">
            {debtOrders.map(o => (
              <div key={o.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs flex justify-between items-center">
                <div>
                  <b className="text-slate-900 block">{o.customerName}</b>
                  <a href={`tel:${o.customerPhone}`} className="text-blue-600 text-[11px] font-medium">
                    {o.customerPhone}
                  </a>
                </div>
                <div className="text-right">
                  <span className="font-black text-rose-600 text-sm block">
                    {formatMoney(o.totalRentalCost - o.paidAmount)}
                  </span>
                  <span className="text-[10px] text-slate-400">Đơn #{o.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CreateOrderDrawer({ costumesInventory, onClose, onSubmit }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [rentDate, setRentDate] = useState('2026-10-07');
  const [expectedReturnDate, setExpectedReturnDate] = useState('2026-10-09');
  const [notes, setNotes] = useState('');
  const [paidAmount, setPaidAmount] = useState(0);

  const [cartItems, setCartItems] = useState([]);
  const [selectedCostumeId, setSelectedCostumeId] = useState('');
  const [selectedQty, setSelectedQty] = useState(1);

  const handleAddItem = () => {
    if (!selectedCostumeId) return;
    const costume = costumesInventory.find(c => c.id === selectedCostumeId);
    if (!costume) return;

    if (selectedQty > costume.availableQty) {
      alert(`Trong kho chỉ còn ${costume.availableQty} ${costume.category === 'Đạo cụ biểu diễn' ? 'cái/bộ' : 'bộ'} sẵn có!`);
      return;
    }

    const exists = cartItems.find(i => i.costumeId === selectedCostumeId);
    if (exists) {
      setCartItems(cartItems.map(i => 
        i.costumeId === selectedCostumeId 
          ? { ...i, quantity: i.quantity + selectedQty }
          : i
      ));
    } else {
      setCartItems([
        ...cartItems,
        {
          costumeId: costume.id,
          costumeName: costume.name,
          quantity: selectedQty,
          price: costume.pricePerDay,
          deposit: costume.depositPerItem
        }
      ]);
    }
    setSelectedCostumeId('');
    setSelectedQty(1);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(i => i.costumeId !== id));
  };

  const totalRentalCost = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDeposit = cartItems.reduce((sum, item) => sum + (item.deposit * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Vui lòng nhập họ tên và số điện thoại khách!');
      return;
    }
    if (cartItems.length === 0) {
      alert('Vui lòng chọn ít nhất 1 trang phục hoặc đạo cụ!');
      return;
    }

    const newOrder = {
      id: `DK-${Date.now().toString().slice(-4)}`,
      customerName,
      customerPhone,
      customerAddress,
      rentDate,
      expectedReturnDate,
      actualReturnDate: null,
      items: cartItems,
      totalRentalCost,
      totalDeposit,
      paidAmount: Number(paidAmount),
      status: 'ACTIVE',
      notes
    };

    onSubmit(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center">
      {/* Slide-up Container with Max Height and Fixed Footer */}
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Sticky Drawer Drag Handle & Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
          <div>
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-2 sm:hidden" />
            <h2 className="text-base font-black text-slate-900 leading-tight">Tạo Đơn Thuê Mới</h2>
            <p className="text-[10px] text-slate-400">Trang phục biểu diễn Dương Khiêm</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} id="orderForm" className="p-4 overflow-y-auto space-y-3.5 text-xs flex-1">
          {/* Customer info */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Tên khách hàng *</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Số điện thoại *</label>
              <input
                type="tel"
                required
                placeholder="0912xxxxxx"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-600 block mb-1">Địa chỉ / CCCD</label>
            <input
              type="text"
              placeholder="Địa chỉ hoặc căn cước..."
              value={customerAddress}
              onChange={e => setCustomerAddress(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Ngày thuê</label>
              <input
                type="date"
                value={rentDate}
                onChange={e => setRentDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-700"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Hạn trả đồ</label>
              <input
                type="date"
                value={expectedReturnDate}
                onChange={e => setExpectedReturnDate(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-700"
              />
            </div>
          </div>

          {/* Select Costume or Prop */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
            <label className="font-bold text-slate-800 block">Thêm trang phục / đạo cụ</label>
            
            <select
              value={selectedCostumeId}
              onChange={e => setSelectedCostumeId(e.target.value)}
              className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none"
            >
              <option value="">-- Chọn sản phẩm có sẵn trong kho --</option>
              {costumesInventory.map(c => (
                <option key={c.id} value={c.id} disabled={c.availableQty <= 0}>
                  [{c.category}] {c.name} - (Còn: {c.availableQty}) - {formatMoney(c.pricePerDay)}
                </option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                min="1"
                placeholder="SL"
                value={selectedQty}
                onChange={e => setSelectedQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-2 py-1.5 bg-white border border-slate-300 rounded-xl text-center font-bold"
              />
              <button
                type="button"
                onClick={handleAddItem}
                className="flex-1 py-1.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 active:scale-98"
              >
                + Đưa vào đơn
              </button>
            </div>

            {/* Cart Preview */}
            {cartItems.length > 0 && (
              <div className="mt-2 space-y-1.5 border-t border-slate-200 pt-2">
                {cartItems.map(item => (
                  <div key={item.costumeId} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200">
                    <div>
                      <b className="text-slate-800 text-[11px] block">{item.costumeName}</b>
                      <span className="text-slate-400 text-[10px]">
                        SL: {item.quantity} × {formatMoney(item.price)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.costumeId)}
                      className="text-rose-500 p-1"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing summary */}
          <div className="grid grid-cols-2 gap-2 bg-rose-50/50 p-2.5 rounded-xl border border-rose-100">
            <div>
              <span className="text-[10px] text-slate-500 block">Tổng tiền thuê:</span>
              <b className="text-rose-600 text-sm">{formatMoney(totalRentalCost)}</b>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">Tiền cọc yêu cầu:</span>
              <b className="text-amber-600 text-sm">{formatMoney(totalDeposit)}</b>
            </div>
          </div>

          {/* Deposit paid */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Khách trả trước (VNĐ)</label>
              <input
                type="number"
                step="10000"
                min="0"
                value={paidAmount}
                onChange={e => setPaidAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Ghi chú</label>
              <input
                type="text"
                placeholder="Cọc CCCD, diễn 2 ngày..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Sticky Footer: Action buttons always reachable on mobile */}
        <div className="p-3 border-t border-slate-100 bg-white sticky bottom-0 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50"
          >
            Đóng
          </button>
          <button
            type="submit"
            form="orderForm"
            className="flex-2 py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-200 active:scale-98"
          >
            Lưu & Xuất Đơn Thuê
          </button>
        </div>
      </div>
    </div>
  );
}

function CostumeFormDrawer({ costume, onClose, onSubmit }) {
  const [name, setName] = useState(costume?.name || '');
  const [category, setCategory] = useState(costume?.category || 'Đạo cụ biểu diễn');
  const [totalQty, setTotalQty] = useState(costume?.totalQty || 5);
  const [pricePerDay, setPricePerDay] = useState(costume?.pricePerDay || 30000);
  const [depositPerItem, setDepositPerItem] = useState(costume?.depositPerItem || 60000);
  const [image, setImage] = useState(costume?.image || '');
  const [notes, setNotes] = useState(costume?.notes || '');
  const [sizes, setSizes] = useState(costume?.sizes?.join(', ') || 'Tiêu chuẩn');

  // Camera integration
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Không thể mở camera. Vui lòng cấp quyền truy cập máy ảnh!');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, 480, 480);
      setImage(canvas.toDataURL('image/jpeg', 0.8));
      stopCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Vui lòng nhập tên sản phẩm!');
      return;
    }

    const payload = {
      id: costume?.id || (category === 'Đạo cụ biểu diễn' ? `DC${Math.floor(100 + Math.random() * 900)}` : `SP${Math.floor(100 + Math.random() * 900)}`),
      name,
      category,
      totalQty: Number(totalQty),
      pricePerDay: Number(pricePerDay),
      depositPerItem: Number(depositPerItem),
      image: image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      notes,
      sizes: sizes.split(',').map(s => s.trim()).filter(Boolean)
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
          <div>
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-2 sm:hidden" />
            <h2 className="text-base font-black text-slate-900 leading-tight">
              {costume ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
            </h2>
            <p className="text-[10px] text-slate-400">Kho hàng Dương Khiêm</p>
          </div>
          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} id="costumeForm" className="p-4 overflow-y-auto space-y-3.5 text-xs flex-1">
          <div>
            <label className="font-bold text-slate-600 block mb-1">Tên trang phục / đạo cụ *</label>
            <input
              type="text"
              required
              placeholder="VD: Cánh sen múa, Áo dài hoa sen..."
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Danh mục</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              >
                {CATEGORIES.filter(c => c !== 'Tất cả').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Tổng số lượng kho</label>
              <input
                type="number"
                min="1"
                required
                value={totalQty}
                onChange={e => setTotalQty(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Giá thuê/ngày (VNĐ)</label>
              <input
                type="number"
                step="5000"
                required
                value={pricePerDay}
                onChange={e => setPricePerDay(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-rose-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Tiền cọc/cái (VNĐ)</label>
              <input
                type="number"
                step="5000"
                required
                value={depositPerItem}
                onChange={e => setDepositPerItem(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-amber-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Camera Capture on Smartphone */}
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
            <label className="font-bold text-slate-700 block">Hình ảnh sản phẩm</label>

            {isCameraActive ? (
              <div className="space-y-2">
                <div className="relative aspect-square max-h-56 mx-auto bg-black rounded-2xl overflow-hidden">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1 shadow"
                  >
                    <Camera size={15} /> Chụp ngay
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl font-bold"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 flex-shrink-0">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-[10px]">Chưa ảnh</div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 active:scale-95"
                    >
                      <Camera size={13} /> Chụp ảnh
                    </button>
                    <label className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-[11px] font-semibold text-slate-700 cursor-pointer">
                      Chọn file
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Hoặc dán link ảnh..."
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px]"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Quy cách / Size</label>
              <input
                type="text"
                placeholder="VD: S, M, L hoặc 1m5..."
                value={sizes}
                onChange={e => setSizes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Ghi chú phụ kiện</label>
              <input
                type="text"
                placeholder="Khăn đóng, cán tre..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-3 border-t border-slate-100 bg-white sticky bottom-0 flex gap-2">
          <button
            type="button"
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50"
          >
            Hủy
          </button>
          <button
            type="submit"
            form="costumeForm"
            className="flex-2 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-200 active:scale-98"
          >
            Lưu Sản Phẩm
          </button>
        </div>
      </div>
    </div>
  );
}

function InvoiceDrawer({ order, onClose }) {
  const handlePrint = () => window.print();
  const debt = Math.max(0, order.totalRentalCost - order.paidAmount);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl relative space-y-4 text-xs">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100 print:hidden"
        >
          <X size={16} />
        </button>

        <div className="text-center border-b pb-3">
          <h2 className="font-black text-rose-600 uppercase text-sm">{STORE_NAME}</h2>
          <p className="text-[10px] text-slate-500">{STORE_SLOGAN}</p>
          <div className="mt-1 text-[10px] font-bold bg-slate-100 py-0.5 rounded px-2 inline-block">
            PHIẾU THUÊ #{order.id}
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 text-[11px]">
          <div><b>Khách:</b> {order.customerName} ({order.customerPhone})</div>
          <div><b>Hạn trả:</b> {formatDate(order.expectedReturnDate)}</div>
          {order.notes && <div className="text-slate-500 italic">Ghi chú: {order.notes}</div>}
        </div>

        {/* Item list */}
        <div className="space-y-1">
          {order.items.map((i, idx) => (
            <div key={idx} className="flex justify-between border-b border-dashed border-slate-200 pb-1 text-[11px]">
              <span>{i.costumeName} (x{i.quantity})</span>
              <b>{formatMoney(i.price * i.quantity)}</b>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-1 text-[11px] pt-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Tiền thuê:</span>
            <b>{formatMoney(order.totalRentalCost)}</b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tiền cọc giữ:</span>
            <b className="text-amber-600">{formatMoney(order.totalDeposit)}</b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Đã thanh toán:</span>
            <b className="text-emerald-600">{formatMoney(order.paidAmount)}</b>
          </div>
          <div className="flex justify-between font-bold border-t pt-1">
            <span>Còn phải thu:</span>
            <span className="text-rose-600">{formatMoney(debt)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2 print:hidden">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
          >
            Đóng
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2 bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-1 shadow"
          >
            <Printer size={14} /> In phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
