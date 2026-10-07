import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Shirt, Users, Calendar, DollarSign, Camera, Plus, Search, 
  Trash2, Edit, CheckCircle, Clock, AlertTriangle, FileText, 
  Printer, ArrowUpRight, TrendingUp, RefreshCw, X, ChevronRight,
  Filter, Phone, MapPin, Tag, Box, Check, Eye, AlertCircle,
  Sparkles, Wrench, PackageCheck
} from 'lucide-react';

const STORE_NAME = "Trang phục biểu diễn Dương Khiêm";
const STORE_SLOGAN = "Chuyên Cho Thuê Trang Phục & Đạo Cụ Biểu Diễn Nghệ Thuật Chuyên Nghiệp";

const INITIAL_COSTUMES = [
  {
    id: 'SP001',
    name: 'Áo dài Nữ Cách tân Gấm Hoa Sen',
    category: 'Áo dài nữ',
    totalQty: 10,
    pricePerDay: 150000,
    depositPerItem: 300000,
    sizes: ['S', 'M', 'L'],
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
    notes: 'Chất vải gấm thêu tay cao cấp'
  },
  {
    id: 'SP002',
    name: 'Áo dài Nam Truyền thống Rồng Vàng',
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
    name: 'Trang phục Thổ cẩm Tây Nguyên Ê-đê',
    category: 'Đồ Tây Nguyên',
    totalQty: 12,
    pricePerDay: 120000,
    depositPerItem: 200000,
    sizes: ['Free size'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
    notes: 'Đầy đủ phụ kiện vòng bạc, khuyên tai thổ cẩm'
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
    notes: 'Thêu chỉ ngũ sắc tỉ mỉ, mấn đội đầu mạ vàng'
  },
  {
    id: 'SP005',
    name: 'Đầm Dạ hội Xẻ tà Sequins Đỏ Rượu',
    category: 'Váy dạ hội',
    totalQty: 6,
    pricePerDay: 280000,
    depositPerItem: 600000,
    sizes: ['M', 'L'],
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80',
    notes: 'Thích hợp dự tiệc gala, MC sự kiện'
  },
  /* Thêm các đạo cụ biểu diễn theo yêu cầu */
  {
    id: 'DC001',
    name: 'Nón Lá Huế Vẽ Tranh / Dây Đeo Lụa',
    category: 'Đạo cụ biểu diễn',
    totalQty: 30,
    pricePerDay: 25000,
    depositPerItem: 50000,
    sizes: ['Tiêu chuẩn'],
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    notes: 'Nón lá chóp tròn bền, dây đeo lụa nhiều màu cho tiết mục múa'
  },
  {
    id: 'DC002',
    name: 'Cánh Sen Múa Khổng Lồ (Bộ 2 Cánh)',
    category: 'Đạo cụ biểu diễn',
    totalQty: 16,
    pricePerDay: 50000,
    depositPerItem: 100000,
    sizes: ['Đường kính 80cm'],
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=600&q=80',
    notes: 'Vải voan xếp tầng tạo hiệu ứng hoa sen xòe múa tập thể'
  },
  {
    id: 'DC003',
    name: 'Đôi Thúng Tre & Đòn Gánh Múa Dân Gian',
    category: 'Đạo cụ biểu diễn',
    totalQty: 10,
    pricePerDay: 60000,
    depositPerItem: 150000,
    sizes: ['Đường kính thúng 45cm'],
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
    notes: 'Bộ gồm 1 đòn gánh tre uốn và 2 thúng tre mộc đan tinh xảo'
  },
  {
    id: 'DC004',
    name: 'Cây Tre / Gậy Tre Đốt Sơn Biểu Diễn',
    category: 'Đạo cụ biểu diễn',
    totalQty: 25,
    pricePerDay: 20000,
    depositPerItem: 40000,
    sizes: ['Dài 1m5 - 1m8'],
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    notes: 'Gậy tre biểu diễn múa sạp, múa võ hoặc tái hiện cảnh làng quê'
  },
  {
    id: 'DC005',
    name: 'Quạt Múa Lụa Dài Dải Bay (Cặp 2 Chiếc)',
    category: 'Đạo cụ biểu diễn',
    totalQty: 20,
    pricePerDay: 35000,
    depositPerItem: 70000,
    sizes: ['Dải lụa dài 1.5m'],
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    notes: 'Nan tre chắc chắn, dải lụa mềm chuyển màu gradient bắt sáng sân khấu'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'DH-2026-001',
    customerName: 'Nguyễn Thị Mai',
    customerPhone: '0912345678',
    customerAddress: 'Phường Tân Lợi, TP. Buôn Ma Thuột, Đắk Lắk',
    rentDate: '2026-10-05',
    expectedReturnDate: '2026-10-08',
    actualReturnDate: null,
    items: [
      { costumeId: 'SP001', costumeName: 'Áo dài Nữ Cách tân Gấm Hoa Sen', quantity: 2, price: 150000, deposit: 300000 },
      { costumeId: 'DC001', costumeName: 'Nón Lá Huế Vẽ Tranh / Dây Đeo Lụa', quantity: 2, price: 25000, deposit: 50000 }
    ],
    totalRentalCost: 350000,
    totalDeposit: 700000,
    paidAmount: 350000,
    depositPaid: 700000,
    status: 'ACTIVE',
    notes: 'Khách cọc CCCD và 700k tiền mặt'
  },
  {
    id: 'DH-2026-002',
    customerName: 'Trần Văn Hoàng',
    customerPhone: '0988776655',
    customerAddress: 'Thị trấn Củng Sơn, Huyện Sơn Hòa, Phú Yên',
    rentDate: '2026-10-04',
    expectedReturnDate: '2026-10-06',
    actualReturnDate: null,
    items: [
      { costumeId: 'SP003', costumeName: 'Trang phục Thổ cẩm Tây Nguyên Ê-đê', quantity: 4, price: 120000, deposit: 200000 },
      { costumeId: 'DC004', costumeName: 'Cây Tre / Gậy Tre Đốt Sơn Biểu Diễn', quantity: 4, price: 20000, deposit: 40000 }
    ],
    totalRentalCost: 560000,
    totalDeposit: 960000,
    paidAmount: 300000,
    depositPaid: 960000,
    status: 'OVERDUE',
    notes: 'Đội văn nghệ trường THPT thuê diễn lễ hội'
  },
  {
    id: 'DH-2026-003',
    customerName: 'Lê Thảo My',
    customerPhone: '0905123987',
    customerAddress: 'Đường Hùng Vương, Tuy Hòa, Phú Yên',
    rentDate: '2026-10-01',
    expectedReturnDate: '2026-10-03',
    actualReturnDate: '2026-10-03',
    items: [
      { costumeId: 'SP004', costumeName: 'Cổ phục Nhật Bình Triều Nguyễn', quantity: 1, price: 350000, deposit: 800000 },
      { costumeId: 'DC005', costumeName: 'Quạt Múa Lụa Dài Dải Bay (Cặp 2 Chiếc)', quantity: 2, price: 35000, deposit: 70000 }
    ],
    totalRentalCost: 420000,
    totalDeposit: 940000,
    paidAmount: 420000,
    depositPaid: 940000,
    status: 'RETURNED',
    notes: 'Khách giữ đồ cẩn thận, đã hoàn cọc đủ'
  }
];

const CATEGORIES = [
  'Tất cả',
  'Áo dài nữ',
  'Áo dài nam',
  'Đồ Tây Nguyên',
  'Cổ phục Việt',
  'Váy dạ hội',
  'Đạo cụ biểu diễn',
  'Trang phục dân tộc',
  'Phụ kiện sân khấu'
];

const formatMoney = (amount) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount || 0);
};

const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('ORDERS'); // 'ORDERS', 'COSTUMES', 'STATS'

  const [costumes, setCostumes] = useState(() => {
    const saved = localStorage.getItem('duongkhiem_costumes_v2');
    return saved ? JSON.parse(saved) : INITIAL_COSTUMES;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('duongkhiem_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('duongkhiem_costumes_v2', JSON.stringify(costumes));
  }, [costumes]);

  useEffect(() => {
    localStorage.setItem('duongkhiem_orders_v2', JSON.stringify(orders));
  }, [orders]);

  // Compute live inventory availability
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

  // Notification state
  const [notification, setNotification] = useState(null);
  const triggerNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  const handleCompleteOrder = (orderId) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        const today = new Date().toISOString().split('T')[0];
        return {
          ...o,
          status: 'RETURNED',
          actualReturnDate: today,
          paidAmount: o.totalRentalCost
        };
      }
      return o;
    }));
    triggerNotification('Đã xác nhận trả đồ và đạo cụ, cập nhật tồn kho thành công!');
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn thuê này không?')) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      triggerNotification('Đã xóa đơn thuê!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-white font-medium text-sm transition-all duration-300 ${
          notification.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Main Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-tr from-amber-600 to-rose-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-black text-slate-900 leading-tight uppercase tracking-tight">
                {STORE_NAME}
              </h1>
              <p className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                <Shirt size={12} /> Cho thuê Trang Phục & Đạo Cụ Sân Khấu
              </p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="flex space-x-1 sm:space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('ORDERS')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'ORDERS'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText size={16} />
              <span>Đơn Thuê & Khách</span>
              <span className="ml-1 bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {orders.filter(o => o.status !== 'RETURNED').length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('COSTUMES')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'COSTUMES'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Box size={16} />
              <span>Kho Đồ & Đạo Cụ</span>
              <span className="ml-1 bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                {costumes.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('STATS')}
              className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                activeTab === 'STATS'
                  ? 'bg-white text-rose-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TrendingUp size={16} />
              <span>Báo Cáo Tài Chính</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'ORDERS' && (
          <OrdersModule
            orders={orders}
            costumesInventory={costumesInventory}
            onOpenCreateModal={() => setShowOrderModal(true)}
            onCompleteOrder={handleCompleteOrder}
            onDeleteOrder={handleDeleteOrder}
            onPrintOrder={(order) => {
              setSelectedOrderForPrint(order);
              setShowPrintModal(true);
            }}
          />
        )}

        {activeTab === 'COSTUMES' && (
          <CostumesModule
            costumesInventory={costumesInventory}
            onOpenAddModal={() => {
              setEditingCostume(null);
              setShowCostumeModal(true);
            }}
            onEditCostume={(costume) => {
              setEditingCostume(costume);
              setShowCostumeModal(true);
            }}
            onDeleteCostume={(id) => {
              if (window.confirm('Xác nhận xóa mặt hàng này khỏi kho?')) {
                setCostumes(prev => prev.filter(c => c.id !== id));
                triggerNotification('Đã xóa mặt hàng khỏi kho!');
              }
            }}
          />
        )}

        {activeTab === 'STATS' && (
          <StatsModule orders={orders} costumesInventory={costumesInventory} />
        )}
      </main>

      {/* MODAL: Create New Rental Order */}
      {showOrderModal && (
        <CreateOrderModal
          costumesInventory={costumesInventory}
          onClose={() => setShowOrderModal(false)}
          onSubmit={(newOrder) => {
            setOrders([newOrder, ...orders]);
            setShowOrderModal(false);
            triggerNotification('Tạo đơn thuê trang phục/đạo cụ thành công!');
          }}
        />
      )}

      {/* MODAL: Add / Edit Item with Webcam Live Camera */}
      {showCostumeModal && (
        <CostumeFormModal
          costume={editingCostume}
          onClose={() => {
            setShowCostumeModal(false);
            setEditingCostume(null);
          }}
          onSubmit={(costumeData) => {
            if (editingCostume) {
              setCostumes(prev => prev.map(c => c.id === costumeData.id ? costumeData : c));
              triggerNotification('Cập nhật sản phẩm thành công!');
            } else {
              setCostumes([costumeData, ...costumes]);
              triggerNotification('Thêm trang phục/đạo cụ mới vào kho thành công!');
            }
            setShowCostumeModal(false);
            setEditingCostume(null);
          }}
        />
      )}

      {/* MODAL: Print Invoice Preview with Store Branding */}
      {showPrintModal && selectedOrderForPrint && (
        <InvoiceModal
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

function OrdersModule({ orders, costumesInventory, onOpenCreateModal, onCompleteOrder, onDeleteOrder, onPrintOrder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearch =
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase());

      if (filterStatus === 'ALL') return matchSearch;
      return matchSearch && order.status === filterStatus;
    });
  }, [orders, searchTerm, filterStatus]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản Lý Đơn Thuê & Khách Hàng</h2>
          <p className="text-sm text-slate-500 mt-1">
            Theo dõi chi tiết khách thuê, số lượng trang phục & đạo cụ, tiền cọc và thanh toán
          </p>
        </div>
        <button
          onClick={onOpenCreateModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold rounded-xl hover:from-rose-600 hover:to-rose-700 transition shadow-md shadow-rose-200"
        >
          <Plus size={18} />
          <span>Tạo Đơn Thuê Mới</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên khách, SĐT, mã đơn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === 'ALL'
                ? 'bg-slate-800 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Tất cả ({orders.length})
          </button>
          <button
            onClick={() => setFilterStatus('ACTIVE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === 'ACTIVE'
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đang thuê ({orders.filter(o => o.status === 'ACTIVE').length})
          </button>
          <button
            onClick={() => setFilterStatus('OVERDUE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === 'OVERDUE'
                ? 'bg-amber-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Quá hạn ({orders.filter(o => o.status === 'OVERDUE').length})
          </button>
          <button
            onClick={() => setFilterStatus('RETURNED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterStatus === 'RETURNED'
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Đã trả ({orders.filter(o => o.status === 'RETURNED').length})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Shirt className="mx-auto h-12 w-12 text-slate-300 mb-3" />
            <p className="text-base font-medium">Không tìm thấy đơn thuê nào phù hợp</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-4 px-4">Mã Đơn / Khách Hàng</th>
                  <th className="py-4 px-4">Trang Phục & Đạo Cụ Thuê</th>
                  <th className="py-4 px-4">Thời Gian Thuê</th>
                  <th className="py-4 px-4">Tiền Thuê / Cọc</th>
                  <th className="py-4 px-4">Thanh Toán</th>
                  <th className="py-4 px-4">Trạng Thái</th>
                  <th className="py-4 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-normal">
                {filteredOrders.map((order) => {
                  const debt = Math.max(0, order.totalRentalCost - order.paidAmount);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/70 transition">
                      {/* Customer Info */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-bold text-slate-900">{order.id}</div>
                        <div className="text-slate-800 font-medium mt-1">{order.customerName}</div>
                        <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Phone size={12} /> {order.customerPhone}
                        </div>
                        {order.customerAddress && (
                          <div className="text-xs text-slate-400 truncate max-w-xs mt-0.5 flex items-center gap-1">
                            <MapPin size={12} /> {order.customerAddress}
                          </div>
                        )}
                      </td>

                      {/* Items Rented */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1.5">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <span className="font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                                {item.quantity} cái/bộ
                              </span>
                              <span className="text-slate-700 font-medium">{item.costumeName}</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Dates */}
                      <td className="py-4 px-4 align-top text-xs space-y-1">
                        <div>
                          <span className="text-slate-400">Thuê:</span> {formatDate(order.rentDate)}
                        </div>
                        <div>
                          <span className="text-slate-400">Dự kiến trả:</span>{' '}
                          <span className="font-semibold text-slate-700">{formatDate(order.expectedReturnDate)}</span>
                        </div>
                        {order.actualReturnDate && (
                          <div className="text-emerald-600 font-medium">
                            Đã trả: {formatDate(order.actualReturnDate)}
                          </div>
                        )}
                      </td>

                      {/* Rent & Deposit */}
                      <td className="py-4 px-4 align-top text-xs space-y-1">
                        <div>
                          <span className="text-slate-400">Tiền thuê:</span>{' '}
                          <span className="font-bold text-slate-900">{formatMoney(order.totalRentalCost)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Tiền cọc:</span>{' '}
                          <span className="text-amber-600 font-medium">{formatMoney(order.totalDeposit)}</span>
                        </div>
                      </td>

                      {/* Payment Status */}
                      <td className="py-4 px-4 align-top text-xs space-y-1">
                        <div>
                          <span className="text-slate-400">Đã trả:</span>{' '}
                          <span className="text-emerald-600 font-semibold">{formatMoney(order.paidAmount)}</span>
                        </div>
                        {debt > 0 ? (
                          <div className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded inline-block">
                            Còn nợ: {formatMoney(debt)}
                          </div>
                        ) : (
                          <div className="text-emerald-700 font-medium">Đã thanh toán đủ</div>
                        )}
                      </td>

                      {/* Order Status Badge */}
                      <td className="py-4 px-4 align-top">
                        {order.status === 'ACTIVE' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            <Clock size={12} /> Đang thuê
                          </span>
                        )}
                        {order.status === 'OVERDUE' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <AlertTriangle size={12} /> Quá hạn trả
                          </span>
                        )}
                        {order.status === 'RETURNED' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle size={12} /> Đã trả đồ
                          </span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-4 align-top text-right space-x-1">
                        {order.status !== 'RETURNED' && (
                          <button
                            onClick={() => onCompleteOrder(order.id)}
                            title="Xác nhận trả đồ & đạo cụ"
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => onPrintOrder(order)}
                          title="In phiếu thuê Dương Khiêm"
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Printer size={18} />
                        </button>
                        <button
                          onClick={() => onDeleteOrder(order.id)}
                          title="Xóa đơn"
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function CostumesModule({ costumesInventory, onOpenAddModal, onEditCostume, onDeleteCostume }) {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCostumes = useMemo(() => {
    return costumesInventory.filter(item => {
      const matchCat = selectedCategory === 'Tất cả' || item.category === selectedCategory;
      const matchName = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchName;
    });
  }, [costumesInventory, selectedCategory, searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Kho Trang Phục & Đạo Cụ Biểu Diễn</h2>
          <p className="text-sm text-slate-500 mt-1">
            Quản lý số lượng tổng kho, số lượng đang thuê và còn sẵn tại cửa hàng Dương Khiêm
          </p>
        </div>
        <button
          onClick={onOpenAddModal}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-700 transition shadow-md shadow-emerald-200"
        >
          <Plus size={18} />
          <span>Thêm Sản Phẩm Mới</span>
        </button>
      </div>

      {/* Categories & Search */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'Đạo cụ biểu diễn' && '🎭 '}
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Tìm theo tên trang phục, đạo cụ (nón lá, gậy tre, cánh sen...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCostumes.map(c => {
          const isProp = c.category === 'Đạo cụ biểu diễn';
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition group"
            >
              {/* Image Preview */}
              <div className="h-56 w-full bg-slate-100 relative overflow-hidden">
                <img
                  src={c.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'}
                  alt={c.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-0.5 rounded-lg">
                  {c.id}
                </span>
                <span className={`absolute top-2 right-2 text-white text-[11px] font-bold px-2 py-0.5 rounded-lg shadow ${
                  isProp ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  {c.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1">{c.name}</h3>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-2">{c.notes || 'Không có mô tả chi tiết'}</div>

                  {/* Stock Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Tổng kho</div>
                      <div className="font-bold text-slate-800 text-sm">{c.totalQty}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-amber-500 font-bold uppercase">Đang thuê</div>
                      <div className="font-bold text-amber-600 text-sm">{c.rentedQty}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-600 font-bold uppercase">Còn sẵn</div>
                      <div className="font-bold text-emerald-600 text-sm">{c.availableQty}</div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mt-3 text-xs space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Giá thuê/ngày:</span>
                      <span className="font-bold text-rose-600 text-sm">{formatMoney(c.pricePerDay)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Tiền cọc/cái:</span>
                      <span className="font-medium text-slate-700">{formatMoney(c.depositPerItem)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isProp ? 'Quy cách' : 'Size'}: {Array.isArray(c.sizes) ? c.sizes.join(', ') : 'Free'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditCostume(c)}
                      className="p-1.5 text-slate-600 hover:text-emerald-600 hover:bg-slate-100 rounded-lg transition"
                      title="Chỉnh sửa"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => onDeleteCostume(c.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition"
                      title="Xóa"
                    >
                      <Trash2 size={16} />
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

function StatsModule({ orders, costumesInventory }) {
  const [timeFilter, setTimeFilter] = useState('ALL');

  const currentYear = 2026;
  const currentMonth = '10';
  const currentDate = '2026-10-07';

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (timeFilter === 'TODAY') {
        return o.rentDate === currentDate;
      }
      if (timeFilter === 'MONTH') {
        return o.rentDate.startsWith(`${currentYear}-${currentMonth}`);
      }
      return true;
    });
  }, [orders, timeFilter]);

  const stats = useMemo(() => {
    let totalRevenue = 0;
    let totalPaid = 0;
    let totalDebt = 0;
    let totalDepositHolding = 0;

    filteredOrders.forEach(o => {
      totalRevenue += Number(o.totalRentalCost || 0);
      totalPaid += Number(o.paidAmount || 0);
      const debt = Math.max(0, (o.totalRentalCost || 0) - (o.paidAmount || 0));
      totalDebt += debt;

      if (o.status !== 'RETURNED') {
        totalDepositHolding += Number(o.totalDeposit || 0);
      }
    });

    return { totalRevenue, totalPaid, totalDebt, totalDepositHolding };
  }, [filteredOrders]);

  const debtOrders = useMemo(() => {
    return orders.filter(o => (o.totalRentalCost - o.paidAmount) > 0);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Báo Cáo Doanh Thu & Công Nợ - Dương Khiêm</h2>
          <p className="text-sm text-slate-500 mt-1">
            Tổng kết số tiền đã thanh toán, chưa thanh toán và danh sách cần thu nợ
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setTimeFilter('TODAY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              timeFilter === 'TODAY' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Hôm nay (07/10/2026)
          </button>
          <button
            onClick={() => setTimeFilter('MONTH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              timeFilter === 'MONTH' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tháng 10/2026
          </button>
          <button
            onClick={() => setTimeFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              timeFilter === 'ALL' ? 'bg-white text-slate-900 shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Toàn bộ thời gian
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Tổng tiền thuê</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-slate-900">{formatMoney(stats.totalRevenue)}</div>
          <div className="text-xs text-slate-500 mt-1">Từ {filteredOrders.length} hóa đơn</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Đã thanh toán</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle size={20} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-emerald-600">{formatMoney(stats.totalPaid)}</div>
          <div className="text-xs text-slate-500 mt-1">Tiền thực thu vào két</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Chưa thanh toán (Nợ)</span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <AlertTriangle size={20} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-rose-600">{formatMoney(stats.totalDebt)}</div>
          <div className="text-xs text-slate-500 mt-1">Cần thu hồi khi khách trả đồ</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Tiền cọc đang giữ</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Box size={20} />
            </div>
          </div>
          <div className="mt-3 text-2xl font-black text-amber-600">{formatMoney(stats.totalDepositHolding)}</div>
          <div className="text-xs text-slate-500 mt-1">Hoàn trả khi trả trang phục/đạo cụ</div>
        </div>
      </div>

      {/* Debt Collection Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <AlertCircle className="text-rose-500" size={20} />
          <span>Danh Sách Đơn Cần Thu Hồi Công Nợ</span>
        </h3>

        {debtOrders.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <CheckCircle className="mx-auto text-emerald-500 mb-2" size={32} />
            <p className="font-medium">Tuyệt vời! Toàn bộ khách hàng đã thanh toán đầy đủ.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-400 font-bold uppercase">
                  <th className="py-3 px-3">Mã đơn</th>
                  <th className="py-3 px-3">Tên Khách Hàng</th>
                  <th className="py-3 px-3">Số Điện Thoại</th>
                  <th className="py-3 px-3">Tổng Hóa Đơn</th>
                  <th className="py-3 px-3">Đã Thanh Toán</th>
                  <th className="py-3 px-3 font-black text-rose-600">Số Tiền Còn Nợ</th>
                  <th className="py-3 px-3">Trạng Thái Đơn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {debtOrders.map(o => {
                  const debt = o.totalRentalCost - o.paidAmount;
                  return (
                    <tr key={o.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-800">{o.id}</td>
                      <td className="py-3 px-3 font-semibold text-slate-900">{o.customerName}</td>
                      <td className="py-3 px-3 text-slate-600">{o.customerPhone}</td>
                      <td className="py-3 px-3">{formatMoney(o.totalRentalCost)}</td>
                      <td className="py-3 px-3 text-emerald-600 font-medium">{formatMoney(o.paidAmount)}</td>
                      <td className="py-3 px-3 font-bold text-rose-600">{formatMoney(debt)}</td>
                      <td className="py-3 px-3">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          o.status === 'OVERDUE' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {o.status === 'OVERDUE' ? 'Quá hạn' : 'Đang thuê'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateOrderModal({ costumesInventory, onClose, onSubmit }) {
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
      alert(`Chỉ còn ${costume.availableQty} ${costume.category === 'Đạo cụ biểu diễn' ? 'cái/đôi' : 'bộ'} sẵn có trong kho Dương Khiêm!`);
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
      alert('Vui lòng điền họ tên và số điện thoại khách hàng!');
      return;
    }
    if (cartItems.length === 0) {
      alert('Vui lòng chọn ít nhất 1 trang phục hoặc đạo cụ để tạo đơn!');
      return;
    }

    const newOrder = {
      id: `DK-${Date.now().toString().slice(-6)}`,
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-slate-900 mb-1">Tạo Đơn Thuê - {STORE_NAME}</h2>
        <p className="text-xs text-slate-500 mb-6">Nhập thông tin người thuê và chọn trang phục, đạo cụ xuất kho</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Họ Tên Khách Hàng *</label>
              <input
                type="text"
                required
                placeholder="Nguyễn Văn A"
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Số Điện Thoại *</label>
              <input
                type="tel"
                required
                placeholder="0912xxxxxx"
                value={customerPhone}
                onChange={e => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Địa Chỉ / CCCD</label>
            <input
              type="text"
              placeholder="Địa chỉ hoặc số Căn cước công dân"
              value={customerAddress}
              onChange={e => setCustomerAddress(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Ngày Thuê</label>
              <input
                type="date"
                value={rentDate}
                onChange={e => setRentDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Ngày Dự Kiến Trả</label>
              <input
                type="date"
                value={expectedReturnDate}
                onChange={e => setExpectedReturnDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Select Costume or Prop */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <label className="text-xs font-bold text-slate-700 block mb-2">Chọn Trang Phục / Đạo Cụ Từ Kho Dương Khiêm</label>
            <div className="flex gap-2">
              <select
                value={selectedCostumeId}
                onChange={e => setSelectedCostumeId(e.target.value)}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none"
              >
                <option value="">-- Chọn loại trang phục hoặc đạo cụ (còn sẵn) --</option>
                {costumesInventory.map(c => (
                  <option key={c.id} value={c.id} disabled={c.availableQty <= 0}>
                    [{c.category}] {c.name} - Còn sẵn: {c.availableQty} - {formatMoney(c.pricePerDay)}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={selectedQty}
                onChange={e => setSelectedQty(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 px-3 py-2 border border-slate-300 rounded-xl text-sm text-center bg-white"
              />

              <button
                type="button"
                onClick={handleAddItem}
                className="px-4 py-2 bg-slate-800 text-white font-semibold rounded-xl text-xs hover:bg-slate-900 transition"
              >
                Thêm
              </button>
            </div>

            {/* Selected Items List */}
            {cartItems.length > 0 && (
              <div className="mt-3 space-y-2 border-t border-slate-200 pt-3">
                {cartItems.map(item => (
                  <div key={item.costumeId} className="flex justify-between items-center text-xs bg-white p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="font-bold text-slate-800">{item.costumeName}</span>
                      <div className="text-slate-500 mt-0.5">
                        Số lượng: <b>{item.quantity}</b> × {formatMoney(item.price)} | Tiền cọc: {formatMoney(item.deposit * item.quantity)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.costumeId)}
                      className="text-rose-500 hover:text-rose-700 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Money Breakdown */}
          <div className="grid grid-cols-2 gap-3 bg-rose-50/50 p-3 rounded-2xl border border-rose-100">
            <div>
              <span className="text-xs text-slate-500">Tổng Tiền Thuê:</span>
              <div className="text-base font-bold text-rose-600">{formatMoney(totalRentalCost)}</div>
            </div>
            <div>
              <span className="text-xs text-slate-500">Tổng Tiền Cọc Yêu Cầu:</span>
              <div className="text-base font-bold text-amber-600">{formatMoney(totalDeposit)}</div>
            </div>
          </div>

          {/* Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Khách Thanh Toán Trước (VNĐ)</label>
              <input
                type="number"
                min="0"
                step="10000"
                value={paidAmount}
                onChange={e => setPaidAmount(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                Còn nợ: {formatMoney(Math.max(0, totalRentalCost - Number(paidAmount)))}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Ghi Chú Đơn Hàng</label>
              <input
                type="text"
                placeholder="Giữ bằng lái xe, diễn văn nghệ hội trường..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* Submit buttons */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-sm font-semibold hover:bg-rose-700 shadow-md shadow-rose-200"
            >
              Lưu & Xuất Đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CostumeFormModal({ costume, onClose, onSubmit }) {
  const [name, setName] = useState(costume?.name || '');
  const [category, setCategory] = useState(costume?.category || 'Đạo cụ biểu diễn');
  const [totalQty, setTotalQty] = useState(costume?.totalQty || 5);
  const [pricePerDay, setPricePerDay] = useState(costume?.pricePerDay || 30000);
  const [depositPerItem, setDepositPerItem] = useState(costume?.depositPerItem || 60000);
  const [image, setImage] = useState(costume?.image || '');
  const [notes, setNotes] = useState(costume?.notes || '');
  const [sizes, setSizes] = useState(costume?.sizes?.join(', ') || 'Tiêu chuẩn');

  // Webcam camera live stream
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: 'environment' }
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Không thể truy cập máy ảnh/webcam. Vui lòng cấp quyền truy cập camera!');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const capturedBase64 = canvas.toDataURL('image/jpeg', 0.85);
      setImage(capturedBase64);
      stopCamera();
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Vui lòng nhập tên trang phục hoặc đạo cụ');
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl my-8 relative">
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-slate-900 mb-1">
          {costume ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Trang Phục / Đạo Cụ Vào Kho'}
        </h2>
        <p className="text-xs text-slate-500 mb-5">{STORE_NAME} - Hỗ trợ chụp ảnh trực tiếp qua máy ảnh</p>

        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-600 block mb-1">Tên Sản Phẩm (Trang Phục / Đạo Cụ) *</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="VD: Cánh sen múa, Thúng tre, Nón lá Huế..."
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Danh Mục</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm bg-white focus:outline-none"
              >
                {CATEGORIES.filter(c => c !== 'Tất cả').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Tổng Số Lượng Trong Kho</label>
              <input
                type="number"
                min="1"
                required
                value={totalQty}
                onChange={e => setTotalQty(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Giá Thuê / Ngày (VNĐ)</label>
              <input
                type="number"
                min="0"
                step="5000"
                required
                value={pricePerDay}
                onChange={e => setPricePerDay(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Tiền Cọc / Cái hoặc Bộ (VNĐ)</label>
              <input
                type="number"
                min="0"
                step="5000"
                required
                value={depositPerItem}
                onChange={e => setDepositPerItem(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Camera Capture & Image Preview */}
          <div className="border border-slate-200 p-3.5 rounded-2xl bg-slate-50">
            <label className="text-xs font-bold text-slate-700 block mb-2">Hình Ảnh Thực Tế Sản Phẩm</label>

            {isCameraActive ? (
              <div className="space-y-2">
                <div className="relative bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-emerald-700 shadow"
                  >
                    <Camera size={16} /> Chụp Hình Ngay
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-300"
                  >
                    Hủy Chụp
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 flex-shrink-0">
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400 text-xs">Chưa có ảnh</div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-900"
                    >
                      <Camera size={14} /> Chụp Trực Tiếp
                    </button>

                    <label className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-100 cursor-pointer flex items-center gap-1">
                      <span>Tải ảnh lên</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="Hoặc dán đường dẫn link ảnh tại đây..."
                    value={image}
                    onChange={e => setImage(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Kích cỡ / Quy cách</label>
              <input
                type="text"
                placeholder="VD: S, M, L hoặc dài 1m5, đường kính 45cm..."
                value={sizes}
                onChange={e => setSizes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Ghi Chú Phụ Kiện Kèm Theo</label>
              <input
                type="text"
                placeholder="Dây quai nón, quạt lụa múa, cán gỗ..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 shadow-md shadow-emerald-200"
            >
              Lưu Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InvoiceModal({ order, onClose }) {
  const handlePrint = () => {
    window.print();
  };

  const debt = Math.max(0, order.totalRentalCost - order.paidAmount);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 print:hidden"
        >
          <X size={20} />
        </button>

        {/* Invoice Printable Content */}
        <div className="space-y-6 text-slate-800">
          <div className="text-center border-b pb-4">
            <h2 className="text-xl sm:text-2xl font-black text-rose-700 tracking-wide uppercase">
              {STORE_NAME}
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">{STORE_SLOGAN}</p>
            <div className="mt-2 text-xs font-bold bg-slate-100 py-1 rounded-lg text-slate-700 inline-block px-4">
              PHIẾU THUÊ TRANG PHỤC & ĐẠO CỤ (MÃ: {order.id})
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Ngày lập phiếu: {formatDate(order.rentDate)}</p>
          </div>

          {/* Customer info */}
          <div className="text-xs space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div><span className="font-bold text-slate-700">Khách hàng:</span> {order.customerName}</div>
            <div><span className="font-bold text-slate-700">Số điện thoại:</span> {order.customerPhone}</div>
            <div><span className="font-bold text-slate-700">Địa chỉ / CCCD:</span> {order.customerAddress || 'Tại cửa hàng'}</div>
            <div className="flex justify-between pt-1 border-t border-slate-200">
              <span><b>Ngày nhận:</b> {formatDate(order.rentDate)}</span>
              <span><b>Hạn trả đồ:</b> {formatDate(order.expectedReturnDate)}</span>
            </div>
            {order.notes && (
              <div className="text-slate-500 italic pt-1 border-t border-slate-200">
                Ghi chú: {order.notes}
              </div>
            )}
          </div>

          {/* Items */}
          <div>
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-300 font-bold text-slate-600 bg-slate-50">
                  <th className="py-2 px-2">Tên Trang Phục / Đạo Cụ</th>
                  <th className="py-2 text-center">SL</th>
                  <th className="py-2 text-right">Đơn Giá</th>
                  <th className="py-2 px-2 text-right">Thành Tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((i, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-2 font-medium">{i.costumeName}</td>
                    <td className="py-2 text-center font-bold">{i.quantity}</td>
                    <td className="py-2 text-right">{formatMoney(i.price)}</td>
                    <td className="py-2 px-2 text-right font-bold">{formatMoney(i.price * i.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Breakdown */}
          <div className="space-y-1.5 text-xs border-t border-slate-200 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Tổng tiền thuê:</span>
              <span className="font-bold text-slate-900">{formatMoney(order.totalRentalCost)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tiền đặt cọc đã thu:</span>
              <span className="font-semibold text-amber-600">{formatMoney(order.totalDeposit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Đã thanh toán trước:</span>
              <span className="text-emerald-600 font-semibold">{formatMoney(order.paidAmount)}</span>
            </div>
            <div className="flex justify-between text-sm font-black border-t border-slate-200 pt-1.5">
              <span>Còn phải thanh toán khi trả:</span>
              <span className="text-rose-600">{formatMoney(debt)}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 italic bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            * <b>Quy định thuê đồ tại Dương Khiêm:</b> Quý khách vui lòng kiểm tra đạo cụ, trang phục trước khi nhận và giữ gìn cẩn thận không để gãy vỡ, rách hoặc dính vết bẩn không tẩy được. Tiền đặt cọc sẽ hoàn trả đầy đủ ngay sau khi kiểm đếm hoàn tất.
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 text-center text-xs pt-4 border-t border-dashed">
            <div>
              <p className="font-bold">Khách Hàng Thuê</p>
              <p className="text-[10px] text-slate-400 mt-1">(Ký & ghi rõ họ tên)</p>
            </div>
            <div>
              <p className="font-bold">Trang Phục Dương Khiêm</p>
              <p className="text-[10px] text-slate-400 mt-1">(Ký nhận & hoàn cọc)</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3 print:hidden">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50"
          >
            Đóng
          </button>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 flex items-center gap-1.5 shadow"
          >
            <Printer size={16} /> In Phiếu Thuê
          </button>
        </div>
      </div>
    </div>
  );
}
