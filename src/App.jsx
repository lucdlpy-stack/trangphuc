import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Shirt, Users, Calendar, DollarSign, Camera, Plus, Search, 
  Trash2, Edit, CheckCircle, Clock, AlertTriangle, FileText, 
  Printer, TrendingUp, X, ChevronRight, Filter, Phone, MapPin, 
  Box, Check, Eye, AlertCircle, Sparkles, Minus, ShoppingBag, 
  Layers, ChevronDown, CheckCheck
} from 'lucide-react';

const STORE_NAME = "Trang phục biểu diễn Dương Khiêm";
const STORE_SLOGAN = "Cho thuê Trang Phục & Đạo Cụ Sân Khấu Chuyên Nghiệp";

const INITIAL_COSTUMES = [
  {
    id: 'SP001',
    name: 'Áo dài Nữ Cách tân Gấm Sen',
    category: 'Áo dài nữ',
    totalQty: 10,
    sizes: ['S', 'M', 'L'],
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80',
    notes: 'Vải gấm cao cấp thêu hoa sen'
  },
  {
    id: 'SP002',
    name: 'Áo dài Nam Rồng Vàng Thêu',
    category: 'Áo dài nam',
    totalQty: 8,
    sizes: ['M', 'L', 'XL'],
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80',
    notes: 'Kèm khăn đóng đồng bộ'
  },
  {
    id: 'SP003',
    name: 'Trang phục Thổ cẩm Tây Nguyên Nữ',
    category: 'Đồ Tây Nguyên',
    totalQty: 12,
    sizes: ['Free size'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
    notes: 'Kèm phụ kiện vòng bạc, khuyên tai'
  },
  {
    id: 'SP004',
    name: 'Trang phục Thổ cẩm Tây Nguyên Nam',
    category: 'Đồ Tây Nguyên',
    totalQty: 10,
    sizes: ['Free size'],
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80',
    notes: 'Áo khoét nách, khố dệt truyền thống'
  },
  {
    id: 'SP005',
    name: 'Cổ phục Nhật Bình Triều Nguyễn',
    category: 'Cổ phục Việt',
    totalQty: 6,
    sizes: ['S', 'M'],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    notes: 'Thêu ngũ sắc ngũ phụng'
  },
  {
    id: 'SP006',
    name: 'Áo Tấc Nam Truyền Thống Xanh Ngọc',
    category: 'Cổ phục Việt',
    totalQty: 5,
    sizes: ['M', 'L'],
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    notes: 'Tay thụng dài, kèm khăn vấn'
  },
  {
    id: 'DC001',
    name: 'Nón Lá Huế Vẽ Tranh Dây Lụa',
    category: 'Đạo cụ biểu diễn',
    totalQty: 35,
    sizes: ['Tiêu chuẩn'],
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=400&q=80',
    notes: 'Nón lá chóp tròn, dây quai lụa bóng'
  },
  {
    id: 'DC002',
    name: 'Cánh Sen Múa Xếp Tầng (Bộ 2 Cánh)',
    category: 'Đạo cụ biểu diễn',
    totalQty: 18,
    sizes: ['Đk 80cm'],
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=400&q=80',
    notes: 'Voan xòe hoa nở'
  },
  {
    id: 'DC003',
    name: 'Đôi Thúng Tre & Đòn Gánh Múa Làng Quê',
    category: 'Đạo cụ biểu diễn',
    totalQty: 10,
    sizes: ['Thúng 45cm'],
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=400&q=80',
    notes: '1 đòn tre uốn và 2 thúng mộc'
  },
  {
    id: 'DC004',
    name: 'Cây Tre / Gậy Tre Múa Biểu Diễn',
    category: 'Đạo cụ biểu diễn',
    totalQty: 25,
    sizes: ['Dài 1m6'],
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=400&q=80',
    notes: 'Dùng múa sạp, biểu diễn hội làng'
  },
  {
    id: 'DC005',
    name: 'Quạt Múa Lụa Dài Gradient (Đôi)',
    category: 'Đạo cụ biểu diễn',
    totalQty: 20,
    sizes: ['Dài 1m5'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=400&q=80',
    notes: 'Nan tre dẻo, lụa bắt sáng'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'DK-101',
    customerName: 'Nguyễn Thị Mai',
    customerPhone: '0912345678',
    customerAddress: 'Tân Lợi, Buôn Ma Thuột',
    rentDate: '2026-10-06',
    expectedReturnDate: '2026-10-08',
    actualReturnDate: null,
    items: [
      { costumeId: 'SP001', costumeName: 'Áo dài Nữ Cách tân Gấm Sen', quantity: 2 },
      { costumeId: 'DC001', costumeName: 'Nón Lá Huế Vẽ Tranh Dây Lụa', quantity: 2 }
    ],
    totalRentalCost: 350000,
    totalDeposit: 700000,
    paidAmount: 350000,
    status: 'ACTIVE',
    notes: 'Giữ CCCD và tiền cọc'
  },
  {
    id: 'DK-102',
    customerName: 'Trần Văn Hoàng',
    customerPhone: '0988776655',
    customerAddress: 'Sơn Hòa, Phú Yên',
    rentDate: '2026-10-05',
    expectedReturnDate: '2026-10-07',
    actualReturnDate: null,
    items: [
      { costumeId: 'SP003', costumeName: 'Trang phục Thổ cẩm Tây Nguyên Nữ', quantity: 4 },
      { costumeId: 'DC004', costumeName: 'Cây Tre / Gậy Tre Múa Biểu Diễn', quantity: 4 }
    ],
    totalRentalCost: 600000,
    totalDeposit: 1000000,
    paidAmount: 300000,
    status: 'OVERDUE',
    notes: 'Đoàn văn nghệ trường diễn lễ hội'
  },
  {
    id: 'DK-103',
    customerName: 'Lê Thảo My',
    customerPhone: '0905123987',
    customerAddress: 'Tuy Hòa, Phú Yên',
    rentDate: '2026-10-02',
    expectedReturnDate: '2026-10-04',
    actualReturnDate: '2026-10-04',
    items: [
      { costumeId: 'SP005', costumeName: 'Cổ phục Nhật Bình Triều Nguyễn', quantity: 1 }
    ],
    totalRentalCost: 350000,
    totalDeposit: 800000,
    paidAmount: 350000,
    status: 'RETURNED',
    notes: 'Đã hoàn cọc đủ'
  }
];

const CATEGORIES = [
  'Áo dài nữ',
  'Áo dài nam',
  'Đồ Tây Nguyên',
  'Cổ phục Việt',
  'Đạo cụ biểu diễn'
];

const formatMoney = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(amount) || 0);
};

const formatNumberString = (val) => {
  if (!val && val !== 0) return '';
  const num = String(val).replace(/\D/g, '');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const parseFormattedNumber = (formattedStr) => {
  if (!formattedStr) return 0;
  return Number(String(formattedStr).replace(/\D/g, '')) || 0;
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
    const saved = localStorage.getItem('dk_costumes_v4');
    return saved ? JSON.parse(saved) : INITIAL_COSTUMES;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('dk_orders_v4');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('dk_costumes_v4', JSON.stringify(costumes));
  }, [costumes]);

  useEffect(() => {
    localStorage.setItem('dk_orders_v4', JSON.stringify(orders));
  }, [orders]);

  // Stock tracking logic
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

  // Notifications
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
    showToast('Đã nhận trả đồ & cập nhật lại kho!');
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Xóa đơn thuê này khỏi hệ thống?')) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      showToast('Đã xóa đơn thuê thành công!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans pb-24 select-none">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] max-w-[90%] bg-slate-900/95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 border border-slate-700 animate-bounce">
          <CheckCircle size={15} className="text-emerald-400 shrink-0" />
          <span className="truncate">{toast.message}</span>
        </div>
      )}

      {/* App Mobile Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-3.5 py-2.5 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <Sparkles size={16} />
            </div>
            <div>
              <h1 className="text-xs font-black tracking-tight text-slate-900 uppercase leading-tight line-clamp-1">
                {STORE_NAME}
              </h1>
              <p className="text-[10px] text-amber-700 font-bold leading-none mt-0.5">
                Trang Phục & Đạo Cụ Sân Khấu
              </p>
            </div>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => {
              if (activeTab === 'COSTUMES') {
                setEditingCostume(null);
                setShowCostumeModal(true);
              } else {
                setShowOrderModal(true);
              }
            }}
            className="flex items-center gap-1 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-xs transition"
          >
            <Plus size={14} />
            <span>{activeTab === 'COSTUMES' ? 'Thêm đồ' : 'Tạo đơn'}</span>
          </button>
        </div>
      </header>

      {/* Main View Container */}
      <main className="flex-1 max-w-md mx-auto w-full px-3 pt-3">
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
              if (window.confirm('Xóa mặt hàng này khỏi kho?')) {
                setCostumes(prev => prev.filter(c => c.id !== id));
                showToast('Đã xóa sản phẩm khỏi kho!');
              }
            }}
          />
        )}

        {activeTab === 'STATS' && (
          <MobileStatsView orders={orders} />
        )}
      </main>

      {/* Native-Style Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 z-40 py-1.5 px-3 shadow-lg flex justify-around items-center safe-area-pb">
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            activeTab === 'ORDERS' ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <div className="relative">
            <FileText size={20} />
            {orders.filter(o => o.status !== 'RETURNED').length > 0 && (
              <span className="absolute -top-1 -right-2 bg-rose-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {orders.filter(o => o.status !== 'RETURNED').length}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5">Đơn thuê</span>
        </button>

        <button
          onClick={() => setActiveTab('COSTUMES')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            activeTab === 'COSTUMES' ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <Box size={20} />
          <span className="text-[10px] mt-0.5">Kho ({costumes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('STATS')}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
            activeTab === 'STATS' ? 'text-rose-600 font-bold' : 'text-slate-400 font-medium'
          }`}
        >
          <TrendingUp size={20} />
          <span className="text-[10px] mt-0.5">Doanh thu</span>
        </button>
      </nav>

      {/* MODAL: Tạo Đơn Thuê Mới Dạng Bottom Drawer */}
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

      {/* MODAL: Thêm / Chỉnh Sửa Mặt Hàng */}
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
              showToast('Đã thêm sản phẩm vào kho!');
            }
            setShowCostumeModal(false);
            setEditingCostume(null);
          }}
        />
      )}

      {/* MODAL: Phiếu Hóa Đơn Thuê */}
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
      {/* Search Bar & Status Chips */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm tên khách, số điện thoại, mã đơn..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          {[
            { id: 'ALL', label: 'Tất cả', count: orders.length },
            { id: 'ACTIVE', label: 'Đang thuê', count: orders.filter(o => o.status === 'ACTIVE').length },
            { id: 'OVERDUE', label: 'Quá hạn', count: orders.filter(o => o.status === 'OVERDUE').length },
            { id: 'RETURNED', label: 'Đã trả', count: orders.filter(o => o.status === 'RETURNED').length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1 ${
                filter === tab.id
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1 rounded-full ${
                filter === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-400">
          <FileText size={32} className="mx-auto mb-2 text-slate-300" />
          <p className="text-xs font-semibold">Chưa có đơn thuê nào</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map(order => {
            const debt = Math.max(0, order.totalRentalCost - order.paidAmount);
            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs space-y-2"
              >
                {/* Header card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-xs text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-lg border border-rose-100">
                      #{order.id}
                    </span>
                    <span className="font-bold text-xs text-slate-900">{order.customerName}</span>
                  </div>

                  {order.status === 'ACTIVE' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
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

                {/* Items & phone */}
                <div className="text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-slate-500">
                    <a href={`tel:${order.customerPhone}`} className="text-blue-600 font-bold flex items-center gap-1 text-[11px]">
                      <Phone size={11} /> {order.customerPhone}
                    </a>
                    <span className="text-[11px] text-slate-400">
                      Hạn trả: <b className="text-slate-800">{formatDate(order.expectedReturnDate)}</b>
                    </span>
                  </div>

                  {/* Item List badge */}
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100 space-y-1">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-700 truncate pr-2">• {it.costumeName}</span>
                        <span className="font-black text-rose-600 bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[10px]">
                          x{it.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Summary grid */}
                  <div className="grid grid-cols-3 gap-1 pt-0.5 text-center text-xs">
                    <div className="bg-slate-50 p-1 rounded-lg">
                      <span className="text-[9px] text-slate-400 block font-medium">Tiền thuê</span>
                      <b className="text-slate-800 text-[11px]">{formatMoney(order.totalRentalCost)}</b>
                    </div>
                    <div className="bg-slate-50 p-1 rounded-lg">
                      <span className="text-[9px] text-slate-400 block font-medium">Tiền cọc</span>
                      <b className="text-amber-600 text-[11px]">{formatMoney(order.totalDeposit)}</b>
                    </div>
                    <div className="bg-slate-50 p-1 rounded-lg">
                      <span className="text-[9px] text-slate-400 block font-medium">{debt > 0 ? 'Còn nợ' : 'Thanh toán'}</span>
                      <b className={`text-[11px] ${debt > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {debt > 0 ? formatMoney(debt) : 'Đủ'}
                      </b>
                    </div>
                  </div>
                </div>

                {/* Footer action bar */}
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-100">
                  <span className="text-[10px] text-slate-400 truncate max-w-[45%]">
                    {order.notes || 'Không ghi chú'}
                  </span>
                  
                  <div className="flex items-center gap-1.5">
                    {order.status !== 'RETURNED' && (
                      <button
                        onClick={() => onCompleteOrder(order.id)}
                        className="px-2.5 py-1 bg-emerald-600 active:scale-95 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition"
                      >
                        <Check size={12} /> Trả đồ
                      </button>
                    )}
                    <button
                      onClick={() => onPrint(order)}
                      className="p-1.5 text-blue-600 bg-blue-50 active:bg-blue-100 rounded-lg"
                      title="In phiếu"
                    >
                      <Printer size={14} />
                    </button>
                    <button
                      onClick={() => onDeleteOrder(order.id)}
                      className="p-1.5 text-rose-500 bg-rose-50 active:bg-rose-100 rounded-lg"
                      title="Xóa"
                    >
                      <Trash2 size={14} />
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

function CreateOrderDrawer({ costumesInventory, onClose, onSubmit }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [rentDate, setRentDate] = useState('2026-10-07');
  const [expectedReturnDate, setExpectedReturnDate] = useState('2026-10-09');
  const [notes, setNotes] = useState('');

  // Currency states (manual input)
  const [totalRentalCostStr, setTotalRentalCostStr] = useState('');
  const [totalDepositStr, setTotalDepositStr] = useState('');
  const [paidAmountStr, setPaidAmountStr] = useState('');

  // Category Tab Selection
  const [selectedCategoryTab, setSelectedCategoryTab] = useState(CATEGORIES[0]);
  
  // Selected items map: { costumeId: quantity }
  const [selectedItemsMap, setSelectedItemsMap] = useState({});

  const handleUpdateItemQty = (costumeId, delta) => {
    const costume = costumesInventory.find(c => c.id === costumeId);
    if (!costume) return;

    const currentQty = selectedItemsMap[costumeId] || 0;
    const newQty = Math.max(0, currentQty + delta);

    if (newQty > costume.availableQty) {
      alert(`Trong kho chỉ còn ${costume.availableQty} ${costume.category === 'Đạo cụ biểu diễn' ? 'cái/bộ' : 'bộ'} sẵn có!`);
      return;
    }

    if (newQty === 0) {
      const nextMap = { ...selectedItemsMap };
      delete nextMap[costumeId];
      setSelectedItemsMap(nextMap);
    } else {
      setSelectedItemsMap({
        ...selectedItemsMap,
        [costumeId]: newQty
      });
    }
  };

  // Compute selected items list for review
  const cartItemsList = useMemo(() => {
    return Object.entries(selectedItemsMap).map(([id, qty]) => {
      const item = costumesInventory.find(c => c.id === id);
      return {
        costumeId: id,
        costumeName: item ? item.name : 'Sản phẩm',
        quantity: qty,
        category: item ? item.category : ''
      };
    });
  }, [selectedItemsMap, costumesInventory]);

  const totalItemsCount = useMemo(() => {
    return Object.values(selectedItemsMap).reduce((a, b) => a + b, 0);
  }, [selectedItemsMap]);

  // Financial calculations
  const totalRentalCost = parseFormattedNumber(totalRentalCostStr);
  const totalDeposit = parseFormattedNumber(totalDepositStr);
  const paidAmount = parseFormattedNumber(paidAmountStr);
  const debt = Math.max(0, totalRentalCost - paidAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Vui lòng nhập họ tên và số điện thoại khách hàng!');
      return;
    }
    if (cartItemsList.length === 0) {
      alert('Vui lòng chọn ít nhất 1 trang phục hoặc đạo cụ!');
      return;
    }

    const newOrder = {
      id: `DK-${Date.now().toString().slice(-4)}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      rentDate,
      expectedReturnDate,
      actualReturnDate: null,
      items: cartItemsList,
      totalRentalCost,
      totalDeposit,
      paidAmount,
      status: 'ACTIVE',
      notes: notes.trim()
    };

    onSubmit(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[94vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Sticky Header */}
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20 rounded-t-3xl">
          <div>
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-1.5" />
            <h2 className="text-sm font-black text-slate-900 leading-tight">Tạo Đơn Thuê Mới</h2>
            <p className="text-[10px] text-slate-400">Trang phục biểu diễn Dương Khiêm</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 bg-slate-100 active:scale-95"
          >
            <X size={16} />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} id="orderForm" className="p-3.5 overflow-y-auto space-y-3.5 text-xs flex-1">
          {/* Customer basic info */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Khách hàng *</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
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
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-1 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-600 block mb-1">Địa chỉ / Căn cước công dân</label>
            <input
              type="text"
              placeholder="Địa chỉ hoặc ghi chú CCCD..."
              value={customerAddress}
              onChange={e => setCustomerAddress(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
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
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Hạn trả đồ</label>
              <input
                type="date"
                value={expectedReturnDate}
                onChange={e => setExpectedReturnDate(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* CATEGORY & ITEM PICKER (No Prices on individual items) */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 text-xs flex items-center gap-1">
                <ShoppingBag size={14} className="text-rose-600" />
                <span>Chọn Trang phục & Đạo cụ</span>
              </span>
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                Đã chọn: {totalItemsCount}
              </span>
            </div>

            {/* Category tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
              {CATEGORIES.map(cat => {
                // Count items chosen in this category
                const chosenInCat = costumesInventory
                  .filter(c => c.category === cat)
                  .reduce((sum, c) => sum + (selectedItemsMap[c.id] || 0), 0);

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategoryTab(cat)}
                    className={`px-2.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center gap-1 ${
                      selectedCategoryTab === cat
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    <span>{cat === 'Đạo cụ biểu diễn' ? '🎭 ' : ''}{cat}</span>
                    {chosenInCat > 0 && (
                      <span className={`text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black ${
                        selectedCategoryTab === cat ? 'bg-white text-rose-600' : 'bg-rose-600 text-white'
                      }`}>
                        {chosenInCat}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Items inside chosen category */}
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-0.5">
              {costumesInventory
                .filter(item => item.category === selectedCategoryTab)
                .map(item => {
                  const currentQty = selectedItemsMap[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="bg-white p-2 rounded-xl border border-slate-200/90 flex items-center justify-between gap-2 shadow-2xs"
                    >
                      {/* Image thumbnail & name */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900 text-xs truncate leading-tight">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-400">
                              Mã: {item.id}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-600">
                              Còn sẵn: {item.availableQty}/{item.totalQty}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stepper (+ / -) */}
                      <div className="flex items-center gap-1.5 shrink-0 bg-slate-50 p-1 rounded-xl border border-slate-200">
                        <button
                          type="button"
                          onClick={() => handleUpdateItemQty(item.id, -1)}
                          disabled={currentQty === 0}
                          className="w-6 h-6 rounded-lg bg-white text-slate-600 flex items-center justify-center active:scale-95 disabled:opacity-30 border border-slate-200"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-5 text-center font-black text-xs text-rose-600">
                          {currentQty}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleUpdateItemQty(item.id, 1)}
                          disabled={item.availableQty <= 0 || currentQty >= item.availableQty}
                          className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center active:scale-95 disabled:opacity-30 shadow-xs"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Selected items chip list summary */}
            {cartItemsList.length > 0 && (
              <div className="mt-2 pt-2 border-t border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 block mb-1">Các mẫu đã chọn:</span>
                <div className="flex flex-wrap gap-1">
                  {cartItemsList.map(it => (
                    <span
                      key={it.costumeId}
                      className="bg-white text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-slate-200 flex items-center gap-1"
                    >
                      <span>{it.costumeName}</span>
                      <b className="text-rose-600 font-bold">x{it.quantity}</b>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* FINANCIAL INPUTS: Manual total rental cost, deposit, paid */}
          <div className="bg-rose-50/40 p-2.5 rounded-2xl border border-rose-100 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                  Tổng tiền thuê (VNĐ) *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    required
                    placeholder="0"
                    value={totalRentalCostStr}
                    onChange={e => setTotalRentalCostStr(formatNumberString(e.target.value))}
                    className="w-full px-2.5 py-2 bg-white border border-rose-300 rounded-xl text-sm font-black text-rose-600 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <span className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 font-bold">đ</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                  Tiền cọc giữ (VNĐ)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="0"
                    value={totalDepositStr}
                    onChange={e => setTotalDepositStr(formatNumberString(e.target.value))}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-black text-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <span className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 font-bold">đ</span>
                </div>
              </div>
            </div>

            {/* Paid amount & remaining debt */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-rose-100/70">
              <div>
                <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                  Khách trả trước (VNĐ)
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="0"
                    value={paidAmountStr}
                    onChange={e => setPaidAmountStr(formatNumberString(e.target.value))}
                    className="w-full px-2.5 py-2 bg-white border border-slate-300 rounded-xl text-sm font-black text-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <span className="absolute right-2.5 top-2.5 text-[10px] text-slate-400 font-bold">đ</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1 text-[11px]">
                  Còn nợ thu sau
                </label>
                <div className="px-2.5 py-2 bg-white/80 border border-slate-200 rounded-xl text-sm font-black text-rose-600 flex items-center justify-between">
                  <span>{formatMoney(debt)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="font-bold text-slate-600 block mb-1">Ghi chú đơn hàng</label>
            <input
              type="text"
              placeholder="VD: Cọc CCCD, múa trường học, giao hẹn..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
            />
          </div>
        </form>

        {/* Sticky Action Footer */}
        <div className="p-3 border-t border-slate-100 bg-white sticky bottom-0 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-bold rounded-xl text-xs hover:bg-slate-50 active:scale-95"
          >
            Đóng
          </button>
          <button
            type="submit"
            form="orderForm"
            className="flex-2 py-2.5 bg-rose-600 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-200 active:scale-95 transition"
          >
            Lưu & Xuất Đơn
          </button>
        </div>
      </div>
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
      {/* Search & Category Filter Pills */}
      <div className="bg-white p-2.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm nón lá, gậy tre, áo dài..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
          {['Tất cả', ...CATEGORIES].map(category => (
            <button
              key={category}
              onClick={() => setCat(category)}
              className={`px-2.5 py-1 rounded-xl font-bold whitespace-nowrap transition ${
                cat === category
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category === 'Đạo cụ biểu diễn' && '🎭 '}
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Items (2 columns on mobile) */}
      <div className="grid grid-cols-2 gap-2.5">
        {filtered.map(item => {
          const isProp = item.category === 'Đạo cụ biểu diễn';
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-28 w-full bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  {item.id}
                </span>
                <span className={`absolute top-1.5 right-1.5 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                  isProp ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  {isProp ? 'Đạo cụ' : 'Trang phục'}
                </span>
              </div>

              <div className="p-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{item.name}</h3>

                  {/* Stock counter */}
                  <div className="mt-1.5 grid grid-cols-2 gap-1 text-center bg-slate-50 p-1 rounded-lg border border-slate-100">
                    <div>
                      <span className="text-[9px] text-slate-400 block font-medium">Tổng kho</span>
                      <b className="text-slate-800 text-xs">{item.totalQty}</b>
                    </div>
                    <div>
                      <span className="text-[9px] text-emerald-600 font-bold block">Còn sẵn</span>
                      <b className="text-emerald-600 text-xs">{item.availableQty}</b>
                    </div>
                  </div>
                </div>

                {/* Edit & delete buttons */}
                <div className="flex items-center justify-between pt-1.5 mt-1.5 border-t border-slate-100">
                  <span className="text-[9px] text-slate-400 truncate max-w-[50%]">
                    {Array.isArray(item.sizes) ? item.sizes[0] : 'Chuẩn'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-1 text-slate-500 active:text-emerald-600 bg-slate-50 rounded"
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 text-slate-400 active:text-rose-600 bg-slate-50 rounded"
                    >
                      <Trash2 size={13} />
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
      {/* 4 Cards Summary */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Tổng doanh thu</span>
          <div className="text-sm font-black text-slate-900 mt-0.5">{formatMoney(stats.rev)}</div>
          <span className="text-[10px] text-slate-400">{orders.length} đơn</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-600 uppercase block">Đã thanh toán</span>
          <div className="text-sm font-black text-emerald-600 mt-0.5">{formatMoney(stats.paid)}</div>
          <span className="text-[10px] text-slate-400">Tiền thực thu</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-xs">
          <span className="text-[10px] font-bold text-rose-600 uppercase block">Chưa thu (Nợ)</span>
          <div className="text-sm font-black text-rose-600 mt-0.5">{formatMoney(stats.debt)}</div>
          <span className="text-[10px] text-rose-500">Cần thu hồi</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <span className="text-[10px] font-bold text-amber-600 uppercase block">Cọc đang giữ</span>
          <div className="text-sm font-black text-amber-600 mt-0.5">{formatMoney(stats.dep)}</div>
          <span className="text-[10px] text-amber-600">Trả khi trả đồ</span>
        </div>
      </div>

      {/* Debt list */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
        <h3 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
          <AlertCircle size={15} className="text-rose-500" />
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
                  <a href={`tel:${o.customerPhone}`} className="text-blue-600 text-[11px] font-semibold">
                    {o.customerPhone}
                  </a>
                </div>
                <div className="text-right">
                  <span className="font-black text-rose-600 text-xs block">
                    {formatMoney(o.totalRentalCost - o.paidAmount)}
                  </span>
                  <span className="text-[9px] text-slate-400">Đơn #{o.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CostumeFormDrawer({ costume, onClose, onSubmit }) {
  const [name, setName] = useState(costume?.name || '');
  const [category, setCategory] = useState(costume?.category || 'Đạo cụ biểu diễn');
  const [totalQty, setTotalQty] = useState(costume?.totalQty || 5);
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
      image: image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
      notes,
      sizes: sizes.split(',').map(s => s.trim()).filter(Boolean)
    };

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center">
      <div className="bg-white w-full max-w-md rounded-t-3xl max-h-[92vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="p-3.5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-3xl">
          <div>
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-1.5" />
            <h2 className="text-sm font-black text-slate-900 leading-tight">
              {costume ? 'Chỉnh Sửa Mặt Hàng' : 'Thêm Mặt Hàng Vào Kho'}
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
            <X size={16} />
          </button>
        </div>

        {/* Body form */}
        <form onSubmit={handleSubmit} id="costumeForm" className="p-3.5 overflow-y-auto space-y-3 text-xs flex-1">
          <div>
            <label className="font-bold text-slate-600 block mb-1">Tên trang phục / đạo cụ *</label>
            <input
              type="text"
              required
              placeholder="VD: Cánh sen múa, Áo dài sen..."
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold text-slate-600 block mb-1">Danh mục</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-2 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              >
                {CATEGORIES.map(c => (
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
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold focus:outline-none"
              />
            </div>
          </div>

          {/* Camera Capture */}
          <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200 space-y-2">
            <label className="font-bold text-slate-700 block">Hình ảnh sản phẩm</label>

            {isCameraActive ? (
              <div className="space-y-2">
                <div className="relative aspect-square max-h-52 mx-auto bg-black rounded-2xl overflow-hidden">
                  <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs text-xs"
                  >
                    <Camera size={14} /> Chụp ngay
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-3.5 py-1.5 bg-slate-200 text-slate-700 rounded-xl font-bold text-xs"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-14 h-14 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 shrink-0">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 text-[9px]">Chưa ảnh</div>
                  )}
                </div>

                <div className="flex-1 space-y-1.5">
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-2.5 py-1.5 bg-slate-900 text-white rounded-lg text-[10px] font-bold flex items-center gap-1 active:scale-95"
                    >
                      <Camera size={12} /> Chụp ảnh
                    </button>
                    <label className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-[10px] font-semibold text-slate-700 cursor-pointer">
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
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600 block mb-1">Ghi chú phụ kiện</label>
              <input
                type="text"
                placeholder="Khăn đóng, cán tre..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
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
            className="flex-2 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-200 active:scale-95"
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
      <div className="bg-white w-full max-w-sm rounded-3xl p-4 shadow-2xl relative space-y-3.5 text-xs">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-slate-400 hover:text-slate-600 rounded-full bg-slate-100 print:hidden"
        >
          <X size={15} />
        </button>

        <div className="text-center border-b pb-2.5">
          <h2 className="font-black text-rose-600 uppercase text-xs sm:text-sm">{STORE_NAME}</h2>
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
              <span>{i.costumeName}</span>
              <b className="text-rose-600">x{i.quantity}</b>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="space-y-1 text-[11px] pt-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Tổng tiền thuê:</span>
            <b className="text-slate-900">{formatMoney(order.totalRentalCost)}</b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tiền cọc giữ:</span>
            <b className="text-amber-600">{formatMoney(order.totalDeposit)}</b>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Khách trả trước:</span>
            <b className="text-emerald-600">{formatMoney(order.paidAmount)}</b>
          </div>
          <div className="flex justify-between font-bold border-t pt-1">
            <span>Còn phải thu:</span>
            <span className="text-rose-600">{formatMoney(debt)}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-1 print:hidden">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-slate-200 rounded-xl font-bold text-slate-600"
          >
            Đóng
          </button>
          <button
            onClick={handlePrint}
            className="flex-1 py-2 bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-1 shadow-xs"
          >
            <Printer size={13} /> In phiếu
          </button>
        </div>
      </div>
    </div>
  );
}
