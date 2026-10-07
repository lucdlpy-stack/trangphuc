import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ShoppingBag,
  Package,
  BarChart3,
  Search,
  Plus,
  CheckCircle,
  AlertTriangle,
  Clock,
  Printer,
  Calendar,
  Phone,
  User,
  MapPin,
  Camera,
  Trash2,
  X,
  CreditCard,
  History,
  Download,
  Upload,
  Layers,
  ChevronRight,
  Minus
} from 'lucide-react';

// --- LOGO SVG VÁY DẠ HỘI ÁNH KIM HOÀNG GIA ---
const RoyalDressLogo = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 500 500" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE259" />
        <stop offset="50%" stopColor="#FFA751" />
        <stop offset="100%" stopColor="#D4AF37" />
      </linearGradient>
      <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF2A3" />
        <stop offset="70%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#AA771C" />
      </radialGradient>
    </defs>
    {/* Móc treo hoàng gia */}
    <path
      d="M250 50 C235 50 225 65 225 80 C225 95 238 102 245 110 L250 120"
      stroke="url(#goldGradient)"
      strokeWidth="12"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M170 160 L250 120 L330 160"
      stroke="url(#goldGradient)"
      strokeWidth="14"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Vòng cổ ngọc ngà */}
    <circle cx="250" cy="175" r="7" fill="url(#goldGradient)" />
    <circle cx="230" cy="168" r="6" fill="url(#goldGradient)" />
    <circle cx="270" cy="168" r="6" fill="url(#goldGradient)" />
    <circle cx="212" cy="160" r="5" fill="url(#goldGradient)" />
    <circle cx="288" cy="160" r="5" fill="url(#goldGradient)" />
    {/* Phần cúp ngực & eo */}
    <path
      d="M165 175 C190 190 230 190 250 220 C270 190 310 190 335 175 C350 215 325 290 280 300 C270 302 230 302 220 300 C175 290 150 215 165 175 Z"
      fill="url(#goldGlow)"
    />
    {/* Tùng váy dạ hội xòe lộng lẫy */}
    <path
      d="M220 300 C180 340 140 400 120 460 C180 470 230 465 250 465 C270 465 320 470 380 460 C360 400 320 340 280 300 Z"
      fill="url(#goldGradient)"
    />
    {/* Nếp gấp tạo chiều sâu cho váy */}
    <path d="M250 305 Q250 380 250 465" stroke="#946300" strokeWidth="5" opacity="0.6" strokeLinecap="round" />
    <path d="M235 305 Q210 385 190 462" stroke="#946300" strokeWidth="5" opacity="0.6" strokeLinecap="round" />
    <path d="M265 305 Q290 385 310 462" stroke="#946300" strokeWidth="5" opacity="0.6" strokeLinecap="round" />
  </svg>
);

// --- DỮ LIỆU BAN ĐẦU ---
const INITIAL_COSTUMES = [
  {
    id: 'C-01',
    name: 'Áo dài Nữ Cách Tân Gấm Hoa Sen',
    category: 'Áo dài nữ',
    totalQty: 10,
    size: 'S, M, L',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-02',
    name: 'Áo dài Nữ Tứ Thân Truyền Thống',
    category: 'Áo dài nữ',
    totalQty: 15,
    size: 'Freesize',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-03',
    name: 'Áo dài Nam Gấm Rồng Vàng Sang Trọng',
    category: 'Áo dài nam',
    totalQty: 8,
    size: 'M, L, XL',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-04',
    name: 'Trang phục Thổ Cẩm Tây Nguyên Ê-đê Nữ',
    category: 'Đồ Tây Nguyên',
    totalQty: 12,
    size: 'M, L',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-05',
    name: 'Cổ Phục Nhật Bình Triều Nguyễn',
    category: 'Cổ phục Việt',
    totalQty: 6,
    size: 'Freesize',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-06',
    name: 'Nón Lá Huế Vẽ Tranh / Dây Bèo Lụa',
    category: 'Đạo cụ biểu diễn',
    totalQty: 30,
    size: 'Tiêu chuẩn',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-07',
    name: 'Cánh Sen Múa Xếp Tầng (Bộ 2 Cánh)',
    category: 'Đạo cụ biểu diễn',
    totalQty: 20,
    size: 'Lớn',
    image: 'https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-08',
    name: 'Thúng Tre & Đòn Gánh Múa Dân Gian',
    category: 'Đạo cụ biểu diễn',
    totalQty: 10,
    size: 'Đường kính 40cm',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-09',
    name: 'Gậy / Cây Tre Biểu Diễn Múa Trống',
    category: 'Đạo cụ biểu diễn',
    totalQty: 25,
    size: 'Dài 1.2m',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60'
  },
  {
    id: 'C-10',
    name: 'Quạt Múa Lụa Dài Đa Bay',
    category: 'Đạo cụ biểu diễn',
    totalQty: 24,
    size: 'Dài 1.5m',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'DH-01',
    customerName: 'Nguyễn Thị Mai',
    customerPhone: '0912345678',
    customerAddress: '12 Lê Duẩn, Buôn Ma Thuột',
    items: [
      { costumeId: 'C-01', costumeName: 'Áo dài Nữ Cách Tân Gấm Hoa Sen', quantity: 2 },
      { costumeId: 'C-06', costumeName: 'Nón Lá Huế Vẽ Tranh / Dây Bèo Lụa', quantity: 2 }
    ],
    rentDate: '2026-10-05',
    returnDate: '2026-10-09',
    totalRentPrice: 450000,
    depositAmount: 500000,
    paidAmount: 450000,
    status: 'renting', // renting, returned, returned_debt
    notes: 'Khách diễn văn nghệ tại Nhà văn hóa'
  },
  {
    id: 'DH-02',
    customerName: 'Trần Văn Hoàng',
    customerPhone: '0988776655',
    customerAddress: 'Khối 3, Huyện Cư M\'gar',
    items: [
      { costumeId: 'C-04', costumeName: 'Trang phục Thổ Cẩm Tây Nguyên Ê-đê Nữ', quantity: 4 },
      { costumeId: 'C-09', costumeName: 'Gậy / Cây Tre Biểu Diễn Múa Trống', quantity: 4 }
    ],
    rentDate: '2026-10-01',
    returnDate: '2026-10-04',
    totalRentPrice: 600000,
    depositAmount: 800000,
    paidAmount: 300000,
    status: 'renting', // Quá hạn vì returnDate < 2026-10-07
    notes: 'Giữ CCCD của anh Hoàng'
  },
  {
    id: 'DH-03',
    customerName: 'Lê Thảo My',
    customerPhone: '0905123987',
    customerAddress: 'Nguyễn Tất Thành, Buôn Ma Thuột',
    items: [
      { costumeId: 'C-02', costumeName: 'Áo dài Nữ Tứ Thân Truyền Thống', quantity: 3 }
    ],
    rentDate: '2026-09-28',
    returnDate: '2026-10-02',
    totalRentPrice: 350000,
    depositAmount: 400000,
    paidAmount: 200000,
    status: 'returned_debt', // Đã trả đồ nhưng còn nợ
    notes: 'Đã trả đồ đủ, hẹn tuần sau chuyển khoản nốt 150.000đ'
  }
];

const CATEGORIES = [
  'Tất cả',
  'Áo dài nữ',
  'Áo dài nam',
  'Đồ Tây Nguyên',
  'Cổ phục Việt',
  'Đạo cụ biểu diễn'
];

export default function App() {
  // --- STATE LƯU TRỮ ---
  const [costumes, setCostumes] = useState(() => {
    try {
      const saved = localStorage.getItem('dk_costumes');
      return saved ? JSON.parse(saved) : INITIAL_COSTUMES;
    } catch {
      return INITIAL_COSTUMES;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('dk_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'costumes', 'stats'
  const [orderFilter, setOrderFilter] = useState('all'); // all, renting, overdue, returned_debt, returned
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCostumeCategory, setSelectedCostumeCategory] = useState('Tất cả');

  // Modals
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showCostumeModal, setShowCostumeModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [viewInvoiceOrder, setViewInvoiceOrder] = useState(null);

  // Drilldown Doanh thu
  const [statsDrilldown, setStatsDrilldown] = useState('all'); // 'all', 'paid', 'debt', 'deposit'
  const [statsDateFilter, setStatsDateFilter] = useState('all'); // 'all', 'today', 'this_month', 'custom'
  const [customStatsDate, setCustomStatsDate] = useState('2026-10-07');

  // Autocomplete khách hàng
  const [suggestedCustomers, setSuggestedCustomers] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Form Đơn hàng
  const [orderForm, setOrderForm] = useState({
    customerName: '',
    customerPhone: '',
    customerAddress: '',
    rentDate: '2026-10-07',
    returnDate: '2026-10-09',
    totalRentPrice: '',
    depositAmount: '',
    paidAmount: '',
    notes: '',
    selectedItems: {} // costumeId -> quantity
  });
  const [modalCategoryTab, setModalCategoryTab] = useState('Áo dài nữ');

  // Form Sản phẩm & Camera
  const [costumeForm, setCostumeForm] = useState({
    name: '',
    category: 'Áo dài nữ',
    totalQty: 10,
    size: 'Freesize',
    image: ''
  });
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Đồng bộ LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('dk_costumes', JSON.stringify(costumes));
    } catch (e) {
      console.warn("Storage full", e);
    }
  }, [costumes]);

  useEffect(() => {
    try {
      localStorage.setItem('dk_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn("Storage full", e);
    }
  }, [orders]);

  // --- TÍNH TOÁN SỐ LƯỢNG KHO ---
  const inventoryStats = useMemo(() => {
    const rentedMap = {};
    orders.forEach(order => {
      if (order.status === 'renting') {
        order.items.forEach(item => {
          rentedMap[item.costumeId] = (rentedMap[item.costumeId] || 0) + Number(item.quantity);
        });
      }
    });

    return costumes.map(c => {
      const rentedQty = rentedMap[c.id] || 0;
      const availableQty = Math.max(0, c.totalQty - rentedQty);
      return {
        ...c,
        rentedQty,
        availableQty
      };
    });
  }, [costumes, orders]);

  // Danh sách khách hàng từng thuê (để gợi ý nhanh)
  const pastCustomers = useMemo(() => {
    const map = new Map();
    orders.forEach(o => {
      if (o.customerPhone && !map.has(o.customerPhone)) {
        map.set(o.customerPhone, {
          name: o.customerName,
          phone: o.customerPhone,
          address: o.customerAddress
        });
      }
    });
    return Array.from(map.values());
  }, [orders]);

  // Xử lý gợi ý khách hàng
  const handleCustomerNameChange = (text) => {
    setOrderForm(prev => ({ ...prev, customerName: text }));
    if (text.trim().length > 0) {
      const filtered = pastCustomers.filter(c =>
        c.name.toLowerCase().includes(text.toLowerCase()) ||
        c.phone.includes(text)
      );
      setSuggestedCustomers(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestedCustomer = (c) => {
    setOrderForm(prev => ({
      ...prev,
      customerName: c.name,
      customerPhone: c.phone,
      customerAddress: c.address
    }));
    setShowSuggestions(false);
  };

  // Định dạng tiền tệ VNĐ
  const formatVND = (amount) => {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ';
  };

  // Format số nhập liệu
  const formatInputNumber = (val) => {
    if (!val) return '';
    const raw = String(val).replace(/\D/g, '');
    return raw ? new Intl.NumberFormat('vi-VN').format(Number(raw)) : '';
  };

  const parseInputNumber = (val) => {
    if (!val) return 0;
    return Number(String(val).replace(/\D/g, '')) || 0;
  };

  // Kiểm tra đơn hàng quá hạn
  const isOrderOverdue = (order) => {
    if (order.status !== 'renting') return false;
    const today = '2026-10-07';
    return order.returnDate < today;
  };

  // --- XỬ LÝ ĐƠN HÀNG ---
  const handleItemQtyChange = (costumeId, delta) => {
    const current = orderForm.selectedItems[costumeId] || 0;
    const costume = inventoryStats.find(c => c.id === costumeId);
    const maxAvailable = costume ? costume.availableQty : 0;
    const nextVal = Math.max(0, Math.min(maxAvailable, current + delta));

    setOrderForm(prev => {
      const updated = { ...prev.selectedItems };
      if (nextVal <= 0) {
        delete updated[costumeId];
      } else {
        updated[costumeId] = nextVal;
      }
      return { ...prev, selectedItems: updated };
    });
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const selectedItemKeys = Object.keys(orderForm.selectedItems);
    if (selectedItemKeys.length === 0) {
      alert('Vui lòng chọn ít nhất 1 trang phục hoặc đạo cụ!');
      return;
    }

    const items = selectedItemKeys.map(id => {
      const c = costumes.find(x => x.id === id);
      return {
        costumeId: id,
        costumeName: c ? c.name : 'Trang phục',
        quantity: orderForm.selectedItems[id]
      };
    });

    const newOrder = {
      id: `DH-${Date.now().toString().slice(-4)}`,
      customerName: orderForm.customerName.trim(),
      customerPhone: orderForm.customerPhone.trim(),
      customerAddress: orderForm.customerAddress.trim(),
      items,
      rentDate: orderForm.rentDate,
      returnDate: orderForm.returnDate,
      totalRentPrice: parseInputNumber(orderForm.totalRentPrice),
      depositAmount: parseInputNumber(orderForm.depositAmount),
      paidAmount: parseInputNumber(orderForm.paidAmount),
      status: 'renting',
      notes: orderForm.notes.trim()
    };

    setOrders([newOrder, ...orders]);
    setShowOrderModal(false);
    // Reset form
    setOrderForm({
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      rentDate: '2026-10-07',
      returnDate: '2026-10-09',
      totalRentPrice: '',
      depositAmount: '',
      paidAmount: '',
      notes: '',
      selectedItems: {}
    });
  };

  // Trả đồ & Cập nhật thanh toán
  const handleReturnCostumes = (orderId) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const debt = (order.totalRentPrice || 0) - (order.paidAmount || 0);
        // Nếu còn nợ -> returned_debt, nếu hết nợ -> returned
        return {
          ...order,
          status: debt > 0 ? 'returned_debt' : 'returned'
        };
      }
      return order;
    }));
  };

  const handlePayRemainingDebt = (orderId) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          paidAmount: order.totalRentPrice,
          status: 'returned'
        };
      }
      return order;
    }));
  };

  // --- CAMERA & HÌNH ẢNH (Nén canvas tránh đầy bộ nhớ) ---
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 640 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      alert("Không thể mở Camera. Vui lòng cấp quyền truy cập camera trên thiết bị của bạn!");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, 400, 400);
    // Nén chất lượng JPEG 0.7 để ảnh siêu nhẹ (dưới 80kb)
    const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
    setCostumeForm(prev => ({ ...prev, image: compressedImage }));
    stopCamera();
  };

  const handleAddCostume = (e) => {
    e.preventDefault();
    if (!costumeForm.name.trim()) return;

    const newCostume = {
      id: `C-${Date.now().toString().slice(-4)}`,
      name: costumeForm.name.trim(),
      category: costumeForm.category,
      totalQty: Number(costumeForm.totalQty) || 1,
      size: costumeForm.size.trim() || 'Freesize',
      image: costumeForm.image || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=60'
    };

    setCostumes([newCostume, ...costumes]);
    setShowCostumeModal(false);
    setCostumeForm({
      name: '',
      category: 'Áo dài nữ',
      totalQty: 10,
      size: 'Freesize',
      image: ''
    });
  };

  // Sao lưu dữ liệu (Backup JSON)
  const handleExportBackup = () => {
    const backupData = {
      costumes,
      orders,
      exportDate: '2026-10-07'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `duong_khiem_backup_${Date.now()}.json`;
    a.click();
  };

  // --- LỌC ĐƠN HÀNG TỔNG QUÁT ---
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Tìm kiếm từ khóa
      const matchSearch =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      // Lọc trạng thái
      const overdue = isOrderOverdue(order);
      if (orderFilter === 'renting') return order.status === 'renting' && !overdue;
      if (orderFilter === 'overdue') return overdue;
      if (orderFilter === 'returned_debt') return order.status === 'returned_debt';
      if (orderFilter === 'returned') return order.status === 'returned';

      return true;
    });
  }, [orders, searchQuery, orderFilter]);

  // --- TÍNH TOÁN BÁO CÁO THỐNG KÊ DOANH THU & DRILLDOWN ---
  const statsOrders = useMemo(() => {
    return orders.filter(order => {
      if (statsDateFilter === 'today') return order.rentDate === '2026-10-07';
      if (statsDateFilter === 'this_month') return order.rentDate && order.rentDate.startsWith('2026-10');
      if (statsDateFilter === 'custom') return order.rentDate === customStatsDate;
      return true;
    });
  }, [orders, statsDateFilter, customStatsDate]);

  const statsTotals = useMemo(() => {
    let totalRevenue = 0;
    let totalPaid = 0;
    let totalDebt = 0;
    let totalDeposit = 0;

    statsOrders.forEach(order => {
      totalRevenue += Number(order.totalRentPrice) || 0;
      totalPaid += Number(order.paidAmount) || 0;
      const debt = Math.max(0, (Number(order.totalRentPrice) || 0) - (Number(order.paidAmount) || 0));
      totalDebt += debt;
      if (order.status === 'renting') {
        totalDeposit += Number(order.depositAmount) || 0;
      }
    });

    return { totalRevenue, totalPaid, totalDebt, totalDeposit };
  }, [statsOrders]);

  // Danh sách đơn chi tiết khi bấm vào thẻ Thống kê (Drilldown)
  const drilldownOrders = useMemo(() => {
    if (statsDrilldown === 'paid') {
      return statsOrders.filter(o => (o.paidAmount || 0) > 0);
    }
    if (statsDrilldown === 'debt') {
      return statsOrders.filter(o => ((o.totalRentPrice || 0) - (o.paidAmount || 0)) > 0);
    }
    if (statsDrilldown === 'deposit') {
      return statsOrders.filter(o => o.status === 'renting' && (o.depositAmount || 0) > 0);
    }
    return statsOrders; // 'all'
  }, [statsOrders, statsDrilldown]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-24 md:pb-8">
      {/* HEADER HOÀNG GIA SANG TRỌNG */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 px-4 py-3 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1 bg-amber-500/10 border border-amber-500/40 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <RoyalDressLogo className="w-10 h-10 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent uppercase tracking-wider">
                Dương Khiêm
              </h1>
              <p className="text-[11px] text-amber-200/70 font-medium">Trang Phục & Đạo Cụ Biểu Diễn</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleExportBackup}
              title="Sao lưu dữ liệu về máy"
              className="p-2 rounded-lg bg-slate-800 text-amber-400 border border-slate-700 hover:bg-slate-700 text-xs flex items-center gap-1"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Sao lưu</span>
            </button>
            <button
              onClick={() => setShowOrderModal(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Tạo Đơn Mới</span>
            </button>
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="max-w-6xl mx-auto w-full px-3 sm:px-4 py-4 flex-1">
        {/* ==================== TAB 1: DANH SÁCH ĐƠN HÀNG ==================== */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Thanh tìm kiếm & Lọc trạng thái */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tra cứu tên khách, SĐT, mã đơn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-amber-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Bộ lọc trạng thái trực quan */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
                <button
                  onClick={() => setOrderFilter('all')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'all'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  Tất cả ({orders.length})
                </button>
                <button
                  onClick={() => setOrderFilter('renting')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'renting'
                      ? 'bg-blue-500 text-white font-bold shadow-sm'
                      : 'bg-slate-800 text-blue-400 border border-slate-700'
                  }`}
                >
                  Đang thuê ({orders.filter(o => o.status === 'renting' && !isOrderOverdue(o)).length})
                </button>
                <button
                  onClick={() => setOrderFilter('overdue')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'overdue'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm ring-2 ring-amber-300'
                      : 'bg-amber-400/10 text-amber-300 border border-amber-400/40'
                  }`}
                >
                  ⚠️ Quá hạn ({orders.filter(isOrderOverdue).length})
                </button>
                <button
                  onClick={() => setOrderFilter('returned_debt')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'returned_debt'
                      ? 'bg-rose-600 text-white font-bold shadow-sm ring-2 ring-rose-400'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  🛑 Còn nợ tiền ({orders.filter(o => o.status === 'returned_debt').length})
                </button>
                <button
                  onClick={() => setOrderFilter('returned')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'returned'
                      ? 'bg-emerald-500 text-white font-bold shadow-sm'
                      : 'bg-slate-800 text-emerald-400 border border-slate-700'
                  }`}
                >
                  Đã hoàn tất ({orders.filter(o => o.status === 'returned').length})
                </button>
              </div>
            </div>

            {/* Danh sách thẻ đơn hàng */}
            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center bg-slate-800/40 border border-slate-800 rounded-2xl">
                <Package className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-sm">Không tìm thấy đơn hàng nào phù hợp</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => {
                  const overdue = isOrderOverdue(order);
                  const debt = (Number(order.totalRentPrice) || 0) - (Number(order.paidAmount) || 0);

                  return (
                    <div
                      key={order.id}
                      className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-3.5 shadow-md space-y-3 transition-all hover:border-slate-600"
                    >
                      {/* Tiêu đề thẻ: Khách + Trạng thái */}
                      <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-2.5">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-amber-200">{order.customerName}</span>
                            <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-semibold">
                              #{order.id}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <a href={`tel:${order.customerPhone}`} className="flex items-center gap-1 text-amber-400 hover:underline">
                              <Phone className="w-3 h-3" /> {order.customerPhone}
                            </a>
                            {order.customerAddress && (
                              <span className="truncate max-w-[150px]">• {order.customerAddress}</span>
                            )}
                          </div>
                        </div>

                        {/* Huy hiệu trạng thái nổi bật theo yêu cầu */}
                        <div className="flex flex-col items-end gap-1">
                          {overdue ? (
                            <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-bold text-[11px] shadow-sm flex items-center gap-1 animate-pulse">
                              <AlertTriangle className="w-3 h-3" /> Quá hạn trả
                            </span>
                          ) : order.status === 'returned_debt' ? (
                            <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-[11px] shadow-sm flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" /> Đã trả - Còn nợ
                            </span>
                          ) : order.status === 'renting' ? (
                            <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/40 text-[11px] font-medium">
                              Đang thuê
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-medium flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" /> Đã trả đủ
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Danh sách đồ thuê */}
                      <div className="bg-slate-900/60 rounded-xl p-2.5 text-xs space-y-1">
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Trang phục & Đạo cụ thuê:</p>
                        <div className="space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-slate-200">
                              <span className="truncate pr-2">• {it.costumeName}</span>
                              <span className="font-bold text-amber-300 whitespace-nowrap">x{it.quantity} bộ/cái</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Chi tiết tiền & Thời hạn */}
                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div className="space-y-1">
                          <div className="text-slate-400">
                            Thuê: <span className="text-slate-200 font-medium">{order.rentDate}</span>
                          </div>
                          <div className={overdue ? "text-amber-400 font-bold" : "text-slate-400"}>
                            Hẹn trả: <span className="font-medium">{order.returnDate}</span>
                          </div>
                          {order.notes && (
                            <div className="text-[11px] text-slate-400 italic truncate">
                              Ghi chú: {order.notes}
                            </div>
                          )}
                        </div>

                        <div className="space-y-1 text-right">
                          <div className="text-slate-400">
                            Tiền thuê: <span className="font-bold text-slate-100">{formatVND(order.totalRentPrice)}</span>
                          </div>
                          <div className="text-slate-400">
                            Đã thanh toán: <span className="font-medium text-emerald-400">{formatVND(order.paidAmount)}</span>
                          </div>
                          {debt > 0 ? (
                            <div className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-1.5 py-0.5 rounded inline-block">
                              Còn nợ: {formatVND(debt)}
                            </div>
                          ) : (
                            <div className="text-[11px] text-emerald-400">Đã thanh toán đủ</div>
                          )}
                        </div>
                      </div>

                      {/* Thanh nút bấm thao tác */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 gap-2">
                        <button
                          onClick={() => {
                            setViewInvoiceOrder(order);
                            setShowInvoiceModal(true);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs flex items-center gap-1 font-medium"
                        >
                          <Printer className="w-3.5 h-3.5" /> Phiếu Thuê
                        </button>

                        <div className="flex items-center gap-2">
                          {/* Nút trả đồ */}
                          {order.status === 'renting' && (
                            <button
                              onClick={() => handleReturnCostumes(order.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Xác Nhận Trả Đồ
                            </button>
                          )}

                          {/* Nút thu nốt nợ đối với đơn đã trả đồ nhưng còn nợ */}
                          {order.status === 'returned_debt' && (
                            <button
                              onClick={() => handlePayRemainingDebt(order.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
                            >
                              <CreditCard className="w-3.5 h-3.5" /> Thu Nốt Nợ
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 2: KHO TRANG PHỤC & ĐẠO CỤ ==================== */}
        {activeTab === 'costumes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Kho Dương Khiêm ({inventoryStats.length} mẫu)
              </h2>
              <button
                onClick={() => setShowCostumeModal(true)}
                className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1"
              >
                <Plus className="w-4 h-4 stroke-[3]" /> Thêm Mẫu Mới
              </button>
            </div>

            {/* Bộ lọc danh mục */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCostumeCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    selectedCostumeCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Lưới danh sách sản phẩm */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {inventoryStats
                .filter(c => selectedCostumeCategory === 'Tất cả' || c.category === selectedCostumeCategory)
                .map(item => (
                  <div
                    key={item.id}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-md"
                  >
                    <div className="relative aspect-square w-full bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] text-amber-300 font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm text-slate-100 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">Quy cách: {item.size}</p>
                      </div>

                      {/* Bảng số lượng tồn kho */}
                      <div className="mt-2 pt-2 border-t border-slate-700 grid grid-cols-3 text-center text-[11px]">
                        <div>
                          <div className="text-slate-400 text-[10px]">Tổng</div>
                          <div className="font-bold text-slate-200">{item.totalQty}</div>
                        </div>
                        <div>
                          <div className="text-blue-400 text-[10px]">Đang thuê</div>
                          <div className="font-bold text-blue-400">{item.rentedQty}</div>
                        </div>
                        <div>
                          <div className="text-emerald-400 text-[10px]">Sẵn có</div>
                          <div className="font-bold text-emerald-400">{item.availableQty}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: BÁO CÁO TÀI CHÍNH & DRILLDOWN ==================== */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            {/* Bộ lọc thời gian */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300 uppercase">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" /> Báo Cáo Doanh Thu
                </span>
                <span className="text-[11px] text-slate-400 font-normal">Hôm nay: 07/10/2026</span>
              </div>

              <div className="flex flex-wrap gap-1.5 text-xs">
                <button
                  onClick={() => setStatsDateFilter('all')}
                  className={`px-3 py-1.5 rounded-lg font-medium ${
                    statsDateFilter === 'all' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Toàn bộ
                </button>
                <button
                  onClick={() => setStatsDateFilter('today')}
                  className={`px-3 py-1.5 rounded-lg font-medium ${
                    statsDateFilter === 'today' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Hôm nay
                </button>
                <button
                  onClick={() => setStatsDateFilter('this_month')}
                  className={`px-3 py-1.5 rounded-lg font-medium ${
                    statsDateFilter === 'this_month' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Tháng này (10/2026)
                </button>
                <button
                  onClick={() => setStatsDateFilter('custom')}
                  className={`px-3 py-1.5 rounded-lg font-medium ${
                    statsDateFilter === 'custom' ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  Chọn ngày
                </button>
              </div>

              {statsDateFilter === 'custom' && (
                <div className="pt-2 flex items-center gap-2">
                  <span className="text-xs text-slate-400">Xem ngày:</span>
                  <input
                    type="date"
                    value={customStatsDate}
                    onChange={(e) => setCustomStatsDate(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-amber-200"
                  />
                </div>
              )}
            </div>

            {/* 4 Thẻ chỉ số chính - CÓ THỂ BẤM VÀO ĐỂ DRILL-DOWN */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setStatsDrilldown('all')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'all'
                    ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-amber-300 flex items-center justify-between">
                  <span>TỔNG DOANH THU</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-100 mt-1">
                  {formatVND(statsTotals.totalRevenue)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Bấm xem tất cả đơn</div>
              </button>

              <button
                onClick={() => setStatsDrilldown('paid')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'paid'
                    ? 'bg-emerald-500/20 border-emerald-400 shadow-md ring-1 ring-emerald-400'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center justify-between">
                  <span>ĐÃ THANH TOÁN</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">
                  {formatVND(statsTotals.totalPaid)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Thực thu vào két</div>
              </button>

              <button
                onClick={() => setStatsDrilldown('debt')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'debt'
                    ? 'bg-rose-500/20 border-rose-400 shadow-md ring-1 ring-rose-400'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-rose-400 flex items-center justify-between">
                  <span>CHƯA THU (NỢ)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-rose-400 mt-1">
                  {formatVND(statsTotals.totalDebt)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Bấm xem danh sách nợ</div>
              </button>

              <button
                onClick={() => setStatsDrilldown('deposit')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'deposit'
                    ? 'bg-blue-500/20 border-blue-400 shadow-md ring-1 ring-blue-400'
                    : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-blue-400 flex items-center justify-between">
                  <span>CỌC ĐANG GIỮ</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-blue-400 mt-1">
                  {formatVND(statsTotals.totalDeposit)}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Đang giữ của khách</div>
              </button>
            </div>

            {/* DANH SÁCH CHI TIẾT TỪNG ĐƠN HÀNG KHI BẤM VÀO THỐNG KÊ */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span>
                  Chi tiết đơn hàng:{' '}
                  <span className="text-amber-400">
                    {statsDrilldown === 'paid'
                      ? 'Đơn đã có thanh toán'
                      : statsDrilldown === 'debt'
                      ? 'Đơn đang còn nợ tiền'
                      : statsDrilldown === 'deposit'
                      ? 'Đơn đang giữ tiền cọc'
                      : 'Tất cả đơn theo mốc thời gian'}
                  </span>{' '}
                  ({drilldownOrders.length})
                </span>
              </div>

              {drilldownOrders.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-800/40 rounded-xl">
                  Không có đơn hàng nào trong mục này.
                </div>
              ) : (
                <div className="space-y-2">
                  {drilldownOrders.map(o => {
                    const debt = (Number(o.totalRentPrice) || 0) - (Number(o.paidAmount) || 0);
                    return (
                      <div
                        key={o.id}
                        className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-200">
                            {o.customerName} - <span className="text-amber-300">#{o.id}</span>
                          </div>
                          <div className="text-slate-400 text-[11px]">
                            Ngày thuê: {o.rentDate} • {o.items.map(i => i.costumeName).join(', ')}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-slate-100">{formatVND(o.totalRentPrice)}</div>
                          <div className="text-[11px] text-emerald-400">Đã trả: {formatVND(o.paidAmount)}</div>
                          {debt > 0 && <div className="text-[11px] font-bold text-rose-400">Nợ: {formatVND(debt)}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ==================== MODAL 1: TẠO ĐƠN THUÊ MỚI (TỐI ƯU SMARTPHONE) ==================== */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-800 border-t sm:border border-slate-700 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200">
            {/* Header Form */}
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RoyalDressLogo className="w-6 h-6" />
                <h3 className="font-bold text-base text-amber-300">Tạo Đơn Thuê Trang Phục Mới</h3>
              </div>
              <button
                onClick={() => setShowOrderModal(false)}
                className="p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Khung nội dung cuộn mượt mà */}
            <form onSubmit={handleCreateOrder} className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* PHẦN 1: THÔNG TIN KHÁCH HÀNG (CÓ TỰ ĐỘNG GỢI Ý KHÁCH QUEN) */}
              <div className="space-y-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60 relative">
                <div className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Thông tin khách hàng
                </div>

                <div className="relative">
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">
                    Họ Tên Khách Hàng *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Gõ tên khách (gợi ý khách từng thuê)..."
                    value={orderForm.customerName}
                    onChange={(e) => handleCustomerNameChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />

                  {/* Danh sách gợi ý khách cũ */}
                  {showSuggestions && suggestedCustomers.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-slate-800 border border-amber-400/50 rounded-xl shadow-2xl z-20 max-h-40 overflow-y-auto divide-y divide-slate-700">
                      {suggestedCustomers.map((c, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelectSuggestedCustomer(c)}
                          className="p-2.5 hover:bg-slate-700 cursor-pointer text-xs"
                        >
                          <div className="font-bold text-amber-300">{c.name}</div>
                          <div className="text-slate-400 text-[11px]">{c.phone} - {c.address}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Số Điện Thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="09xxxxxxxx"
                      value={orderForm.customerPhone}
                      onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Địa Chỉ / Số CCCD
                    </label>
                    <input
                      type="text"
                      placeholder="Địa chỉ hoặc căn cước..."
                      value={orderForm.customerAddress}
                      onChange={(e) => setOrderForm({ ...orderForm, customerAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Ngày Thuê
                    </label>
                    <input
                      type="date"
                      value={orderForm.rentDate}
                      onChange={(e) => setOrderForm({ ...orderForm, rentDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Hẹn Ngày Trả
                    </label>
                    <input
                      type="date"
                      value={orderForm.returnDate}
                      onChange={(e) => setOrderForm({ ...orderForm, returnDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* PHẦN 2: CHỌN TRANG PHỤC & ĐẠO CỤ THEO DANH MỤC */}
              <div className="space-y-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <div className="text-xs font-bold text-amber-300 uppercase flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Chọn trang phục & đạo cụ
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Đã chọn:{' '}
                    <b className="text-amber-400">
                      {Object.values(orderForm.selectedItems).reduce((a, b) => a + b, 0)}
                    </b>{' '}
                    món
                  </span>
                </div>

                {/* Tabs chuyển danh mục con */}
                <div className="flex gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
                  {CATEGORIES.filter(c => c !== 'Tất cả').map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setModalCategoryTab(cat)}
                      className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap text-xs transition-all ${
                        modalCategoryTab === cat
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Danh sách các mẫu trong danh mục */}
                <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                  {inventoryStats
                    .filter(c => c.category === modalCategoryTab)
                    .map(item => {
                      const selectedCount = orderForm.selectedItems[item.id] || 0;
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs"
                        >
                          <div className="flex items-center space-x-2 min-w-0 pr-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-200 truncate">{item.name}</p>
                              <p className="text-[11px] text-slate-400">
                                Sẵn có: <span className="font-bold text-emerald-400">{item.availableQty}</span>
                              </p>
                            </div>
                          </div>

                          {/* Bộ nút tăng giảm số lượng */}
                          <div className="flex items-center space-x-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => handleItemQtyChange(item.id, -1)}
                              disabled={selectedCount <= 0}
                              className="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 disabled:opacity-30 flex items-center justify-center font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-bold text-amber-300 text-sm">
                              {selectedCount}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleItemQtyChange(item.id, 1)}
                              disabled={item.availableQty <= 0 || selectedCount >= item.availableQty}
                              className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 disabled:opacity-30 flex items-center justify-center font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* PHẦN 3: TỔNG TIỀN & THANH TOÁN (BÀN PHÍM CHUYÊN SỐ TRÊN SMARTPHONE) */}
              <div className="space-y-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <div className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Chi phí & Thanh toán
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Tổng Tiền Thuê (VNĐ) *
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="0"
                      value={formatInputNumber(orderForm.totalRentPrice)}
                      onChange={(e) => setOrderForm({ ...orderForm, totalRentPrice: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-base font-bold text-amber-300 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Tiền Cọc (VNĐ)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={formatInputNumber(orderForm.depositAmount)}
                      onChange={(e) => setOrderForm({ ...orderForm, depositAmount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-base font-bold text-blue-300 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Khách Trả Trước (VNĐ)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={formatInputNumber(orderForm.paidAmount)}
                      onChange={(e) => setOrderForm({ ...orderForm, paidAmount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-base font-bold text-emerald-300 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Tự động tính tiền nợ */}
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">
                      Còn Nợ Thu Sau (VNĐ)
                    </label>
                    <div className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-base font-bold text-rose-400 flex items-center">
                      {formatVND(
                        Math.max(0, parseInputNumber(orderForm.totalRentPrice) - parseInputNumber(orderForm.paidAmount))
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">
                    Ghi Chú Đơn Hàng
                  </label>
                  <input
                    type="text"
                    placeholder="Giữ bằng lái xe, diễn chương trình gì..."
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Nút lưu đơn */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg active:scale-98 transition-all"
                >
                  Hoàn Tất & Lưu Đơn Thuê
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 2: THÊM MẪU KHO & CAMERA ==================== */}
      {showCostumeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-slate-800 border-t sm:border border-slate-700 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-amber-300">Thêm Trang Phục / Đạo Cụ Vào Kho</h3>
              <button
                onClick={() => {
                  stopCamera();
                  setShowCostumeModal(false);
                }}
                className="p-1 rounded-full text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCostume} className="p-4 space-y-3 overflow-y-auto">
              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">Tên Mẫu Sản Phẩm *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nón quai thao, Đồ múa quạt..."
                  value={costumeForm.name}
                  onChange={(e) => setCostumeForm({ ...costumeForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">Danh Mục</label>
                  <select
                    value={costumeForm.category}
                    onChange={(e) => setCostumeForm({ ...costumeForm, category: e.target.value })}
                    className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    {CATEGORIES.filter(c => c !== 'Tất cả').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">Tổng Số Lượng Trong Kho</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={costumeForm.totalQty}
                    onChange={(e) => setCostumeForm({ ...costumeForm, totalQty: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">Quy cách / Size</label>
                <input
                  type="text"
                  placeholder="S, M, L hoặc Tiêu chuẩn..."
                  value={costumeForm.size}
                  onChange={(e) => setCostumeForm({ ...costumeForm, size: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* KHUNG CAMERA CHỤP ẢNH TRỰC TIẾP */}
              <div className="space-y-2">
                <label className="text-[11px] text-slate-300 font-medium block">Hình Ảnh Sản Phẩm</label>
                {showCamera ? (
                  <div className="relative rounded-2xl overflow-hidden bg-black aspect-square flex flex-col items-center justify-center">
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={takePhoto}
                        className="px-4 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg"
                      >
                        Chụp Ngay
                      </button>
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                      >
                        Hủy
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {costumeForm.image && (
                      <img
                        src={costumeForm.image}
                        alt="Preview"
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      />
                    )}
                    <button
                      type="button"
                      onClick={startCamera}
                      className="flex-1 py-2.5 px-3 bg-slate-900 border border-dashed border-amber-400/60 rounded-xl text-xs text-amber-300 font-semibold flex items-center justify-center gap-1.5"
                    >
                      <Camera className="w-4 h-4" /> Bật Camera Chụp Trực Tiếp
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs"
                >
                  Lưu Vào Kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL 3: XEM & IN PHIẾU THUÊ ==================== */}
      {showInvoiceModal && viewInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white text-slate-900 w-full max-w-sm rounded-3xl p-5 shadow-2xl relative space-y-4">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-slate-100 text-slate-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header phiếu in */}
            <div className="text-center border-b pb-3">
              <div className="flex justify-center mb-1">
                <RoyalDressLogo className="w-8 h-8" />
              </div>
              <h2 className="font-bold text-sm uppercase tracking-wide text-amber-700">
                Trang Phục Biểu Diễn Dương Khiêm
              </h2>
              <p className="text-[11px] text-slate-500">Buôn Ma Thuột - Đắk Lắk • Hotline: 0912.345.678</p>
              <h3 className="font-bold text-base mt-2 text-slate-800">PHIẾU THUÊ TRANG PHỤC</h3>
              <p className="text-[10px] text-slate-400">Mã đơn: #{viewInvoiceOrder.id}</p>
            </div>

            {/* Thông tin khách */}
            <div className="text-xs space-y-1">
              <div>Khách hàng: <b>{viewInvoiceOrder.customerName}</b></div>
              <div>Số điện thoại: <b>{viewInvoiceOrder.customerPhone}</b></div>
              <div>Địa chỉ: {viewInvoiceOrder.customerAddress || 'Tại cửa hàng'}</div>
              <div>Thời gian thuê: {viewInvoiceOrder.rentDate} ➔ Hạn trả: <b>{viewInvoiceOrder.returnDate}</b></div>
            </div>

            {/* Bảng đồ thuê */}
            <div className="border rounded-xl p-2 text-xs space-y-1 bg-slate-50">
              <div className="font-semibold text-slate-700 border-b pb-1">Danh sách trang phục & đạo cụ:</div>
              {viewInvoiceOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-slate-600">
                  <span>{idx + 1}. {it.costumeName}</span>
                  <span className="font-bold">x{it.quantity}</span>
                </div>
              ))}
            </div>

            {/* Tổng kết tiền */}
            <div className="text-xs space-y-1 border-t pt-2">
              <div className="flex justify-between">
                <span>Tổng tiền thuê:</span>
                <span className="font-bold">{formatVND(viewInvoiceOrder.totalRentPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tiền cọc giữ:</span>
                <span>{formatVND(viewInvoiceOrder.depositAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Khách đã trả:</span>
                <span className="text-emerald-600 font-medium">{formatVND(viewInvoiceOrder.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t pt-1">
                <span>Còn nợ:</span>
                <span className="text-rose-600">
                  {formatVND(Math.max(0, (viewInvoiceOrder.totalRentPrice || 0) - (viewInvoiceOrder.paidAmount || 0)))}
                </span>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" /> In Phiếu Cho Khách
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== BOTTOM NAVIGATION (THANH ĐIỀU HƯỚNG DƯỚI ĐÁY SMARTPHONE) ==================== */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex justify-around items-center max-w-6xl mx-auto shadow-2xl">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'orders' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Đơn Thuê</span>
        </button>

        <button
          onClick={() => setActiveTab('costumes')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'costumes' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Kho & Đạo Cụ</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'stats' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BarChart3 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Doanh Thu</span>
        </button>
      </nav>
    </div>
  );
}
