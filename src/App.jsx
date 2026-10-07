import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  LayoutDashboard,
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
  Edit,
  Eye,
  ChevronRight,
  FolderPlus,
  ArrowRight,
  Download
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
    <circle cx="250" cy="175" r="7" fill="url(#goldGradient)" />
    <circle cx="230" cy="168" r="6" fill="url(#goldGradient)" />
    <circle cx="270" cy="168" r="6" fill="url(#goldGradient)" />
    <circle cx="212" cy="160" r="5" fill="url(#goldGradient)" />
    <circle cx="288" cy="160" r="5" fill="url(#goldGradient)" />
    <path
      d="M165 175 C190 190 230 190 250 220 C270 190 310 190 335 175 C350 215 325 290 280 300 C270 302 230 302 220 300 C175 290 150 215 165 175 Z"
      fill="url(#goldGlow)"
    />
    <path
      d="M220 300 C180 340 140 400 120 460 C180 470 230 465 250 465 C270 465 320 470 380 460 C360 400 320 340 280 300 Z"
      fill="url(#goldGradient)"
    />
    <path d="M250 305 Q250 380 250 465" stroke="#946300" strokeWidth="5" opacity="0.6" strokeLinecap="round" />
    <path d="M235 305 Q210 385 190 462" stroke="#946300" strokeWidth="5" opacity="0.6" strokeLinecap="round" />
    <path d="M265 305 Q290 385 310 462" stroke="#946300" strokeWidth="5" opacity="0.6" strokeLinecap="round" />
  </svg>
);

// --- CHỮ KÝ DƯƠNG THỊ MINH KHIÊM (VECTOR SVG NGUYÊN BẢN) ---
const SignatureSVG = ({ className = "h-14" }) => (
  <svg viewBox="0 0 450 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 40 85 C 20 65 35 48 85 52 C 145 56 168 85 160 120 C 148 155 110 150 96 110 C 90 92 125 100 135 72 C 142 55 125 65 102 122 M 102 122 L 130 92 M 130 92 L 140 115 L 152 90 L 165 110 L 175 92 L 190 102 M 190 102 L 210 85 L 215 100 L 235 88 L 260 92 L 380 98 M 145 130 L 400 132"
      stroke="#1e3a8a"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />
  </svg>
);

// --- DỮ LIỆU BAN ĐẦU ---
const INITIAL_CATEGORIES = [
  'Áo dài nữ',
  'Áo dài nam',
  'Đồ Tây Nguyên',
  'Cổ phục Việt',
  'Đạo cụ biểu diễn'
];

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
    id: 'DH-2152',
    customerName: 'Lực',
    customerPhone: '0369299797',
    customerAddress: 'Lớp 12',
    items: [
      { costumeId: 'C-01', costumeName: 'Áo dài Nữ Cách Tân Gấm Hoa Sen', quantity: 1 },
      { costumeId: 'C-02', costumeName: 'Áo dài Nữ Tứ Thân Truyền Thống', quantity: 1 }
    ],
    rentDate: '2026-10-07',
    returnDate: '2026-10-11',
    totalRentPrice: 1000000,
    depositAmount: 100000,
    paidAmount: 1000000,
    status: 'renting',
    notes: ''
  },
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
    status: 'renting',
    notes: 'Khách diễn văn nghệ tại Nhà văn hóa'
  },
  {
    id: 'DH-02',
    customerName: 'Trần Văn Hoàng',
    customerPhone: '0988776655',
    customerAddress: 'Khối 3, Huyện Cư Mgar',
    items: [
      { costumeId: 'C-04', costumeName: 'Trang phục Thổ Cẩm Tây Nguyên Ê-đê Nữ', quantity: 4 },
      { costumeId: 'C-09', costumeName: 'Gậy / Cây Tre Biểu Diễn Múa Trống', quantity: 4 }
    ],
    rentDate: '2026-09-15',
    returnDate: '2026-09-18',
    totalRentPrice: 600000,
    depositAmount: 800000,
    paidAmount: 600000,
    status: 'returned',
    notes: 'Đã hoàn tất thanh toán'
  },
  {
    id: 'DH-03',
    customerName: 'Lê Thảo My',
    customerPhone: '0905123987',
    customerAddress: 'Nguyễn Tất Thành, Buôn Ma Thuột',
    items: [
      { costumeId: 'C-02', costumeName: 'Áo dài Nữ Tứ Thân Truyền Thống', quantity: 3 }
    ],
    rentDate: '2026-08-10',
    returnDate: '2026-08-14',
    totalRentPrice: 350000,
    depositAmount: 400000,
    paidAmount: 200000,
    status: 'returned_debt',
    notes: 'Còn nợ 150.000đ'
  }
];

export default function App() {
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem('dk_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

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

  const [activeTab, setActiveTab] = useState('dashboard');

  // Lọc khoảng thời gian Dashboard
  const [dashStartDate, setDashStartDate] = useState('');
  const [dashEndDate, setDashEndDate] = useState('');

  // Lọc đơn thuê
  const [orderFilter, setOrderFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');

  // Lọc kho
  const [selectedCostumeCategory, setSelectedCostumeCategory] = useState('Tất cả');

  // Modals & Popups
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);
  const [showCostumeModal, setShowCostumeModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [viewInvoiceOrder, setViewInvoiceOrder] = useState(null);

  // Thống kê Doanh thu
  const [statsDrilldown, setStatsDrilldown] = useState('all');
  const [statsDateFilter, setStatsDateFilter] = useState('all');
  const [customStatsDate, setCustomStatsDate] = useState('2026-10-07');

  // Autocomplete khách
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
    selectedItems: {}
  });
  const [modalCategoryTab, setModalCategoryTab] = useState(categories[0] || 'Áo dài nữ');

  // Form Kho & Camera
  const [costumeForm, setCostumeForm] = useState({
    name: '',
    category: categories[0] || 'Áo dài nữ',
    totalQty: 10,
    size: 'Freesize',
    image: ''
  });
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('dk_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('dk_costumes', JSON.stringify(costumes));
  }, [costumes]);

  useEffect(() => {
    localStorage.setItem('dk_orders', JSON.stringify(orders));
  }, [orders]);

  // TÍNH TỒN KHO
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

  const isOrderOverdue = (order) => {
    if (order.status !== 'renting') return false;
    const today = '2026-10-07';
    return order.returnDate < today;
  };

  const formatVND = (amount) => {
    const num = Number(amount) || 0;
    return new Intl.NumberFormat('vi-VN').format(num) + ' ₫';
  };

  const formatInputNumber = (val) => {
    if (!val) return '';
    const raw = String(val).replace(/\D/g, '');
    return raw ? new Intl.NumberFormat('vi-VN').format(Number(raw)) : '';
  };

  const parseInputNumber = (val) => {
    if (!val) return 0;
    return Number(String(val).replace(/\D/g, '')) || 0;
  };

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

  const handleItemQtyChange = (costumeId, delta) => {
    const current = orderForm.selectedItems[costumeId] || 0;
    const nextVal = Math.max(0, current + delta);

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

  const handleOpenCreateOrder = () => {
    setEditingOrderId(null);
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
    setModalCategoryTab(categories[0] || 'Áo dài nữ');
    setShowOrderModal(true);
  };

  const handleOpenEditOrder = (order) => {
    setEditingOrderId(order.id);
    const selectedMap = {};
    order.items.forEach(it => {
      selectedMap[it.costumeId] = it.quantity;
    });

    setOrderForm({
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress || '',
      rentDate: order.rentDate,
      returnDate: order.returnDate,
      totalRentPrice: String(order.totalRentPrice || 0),
      depositAmount: String(order.depositAmount || 0),
      paidAmount: String(order.paidAmount || 0),
      notes: order.notes || '',
      selectedItems: selectedMap
    });
    setModalCategoryTab(categories[0] || 'Áo dài nữ');
    setShowOrderModal(true);
  };

  const handleSaveOrder = (e) => {
    e.preventDefault();
    const itemIds = Object.keys(orderForm.selectedItems);
    if (itemIds.length === 0) {
      alert('Vui lòng chọn ít nhất 1 trang phục hoặc đạo cụ!');
      return;
    }

    const items = itemIds.map(id => {
      const c = costumes.find(x => x.id === id);
      return {
        costumeId: id,
        costumeName: c ? c.name : 'Trang phục',
        quantity: orderForm.selectedItems[id]
      };
    });

    if (editingOrderId) {
      setOrders(orders.map(o => {
        if (o.id === editingOrderId) {
          const totalRent = parseInputNumber(orderForm.totalRentPrice);
          const paid = parseInputNumber(orderForm.paidAmount);
          let newStatus = o.status;
          if (o.status === 'returned_debt' && paid >= totalRent) {
            newStatus = 'returned';
          }
          return {
            ...o,
            customerName: orderForm.customerName.trim(),
            customerPhone: orderForm.customerPhone.trim(),
            customerAddress: orderForm.customerAddress.trim(),
            items,
            rentDate: orderForm.rentDate,
            returnDate: orderForm.returnDate,
            totalRentPrice: totalRent,
            depositAmount: parseInputNumber(orderForm.depositAmount),
            paidAmount: paid,
            notes: orderForm.notes.trim(),
            status: newStatus
          };
        }
        return o;
      }));
    } else {
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
    }

    setShowOrderModal(false);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa đơn hàng #${orderId} không?`)) {
      setOrders(orders.filter(o => o.id !== orderId));
      if (detailOrder && detailOrder.id === orderId) {
        setDetailOrder(null);
      }
    }
  };

  const handleUpdateDetailReturnDate = (newDate) => {
    if (!detailOrder) return;
    setOrders(orders.map(o => o.id === detailOrder.id ? { ...o, returnDate: newDate } : o));
    setDetailOrder(prev => ({ ...prev, returnDate: newDate }));
  };

  const handleReturnCostumes = (orderId) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        const debt = (o.totalRentPrice || 0) - (o.paidAmount || 0);
        return {
          ...o,
          status: debt > 0 ? 'returned_debt' : 'returned'
        };
      }
      return o;
    }));
    if (detailOrder && detailOrder.id === orderId) {
      setDetailOrder(null);
    }
  };

  const handlePayRemainingDebt = (orderId) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          paidAmount: o.totalRentPrice,
          status: 'returned'
        };
      }
      return o;
    }));
    if (detailOrder && detailOrder.id === orderId) {
      setDetailOrder(null);
    }
  };

  const handleAdjustCostumeQty = (costumeId, delta) => {
    setCostumes(costumes.map(c => {
      if (c.id === costumeId) {
        const nextQty = Math.max(0, c.totalQty + delta);
        return { ...c, totalQty: nextQty };
      }
      return c;
    }));
  };

  const handleDeleteCostume = (costumeId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa mẫu trang phục này khỏi kho?")) {
      setCostumes(costumes.filter(c => c.id !== costumeId));
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    const catName = newCategoryName.trim();
    if (catName && !categories.includes(catName)) {
      setCategories([...categories, catName]);
      setNewCategoryName('');
      setShowCategoryModal(false);
    }
  };

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
      alert("Không thể mở Camera. Vui lòng cấp quyền truy cập máy ảnh!");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
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
      category: categories[0] || 'Áo dài nữ',
      totalQty: 10,
      size: 'Freesize',
      image: ''
    });
  };

  // --- LỌC DASHBOARD THEO KHOẢNG THỜI GIAN ---
  const dashboardFilteredOrders = useMemo(() => {
    return orders.filter(order => {
      if (dashStartDate && order.rentDate < dashStartDate) return false;
      if (dashEndDate && order.rentDate > dashEndDate) return false;
      return true;
    });
  }, [orders, dashStartDate, dashEndDate]);

  const dashboardStats = useMemo(() => {
    const renting = dashboardFilteredOrders.filter(o => o.status === 'renting' && !isOrderOverdue(o)).length;
    const overdue = dashboardFilteredOrders.filter(isOrderOverdue).length;
    const debt = dashboardFilteredOrders.filter(o => o.status === 'returned_debt').length;
    const completed = dashboardFilteredOrders.filter(o => o.status === 'returned').length;
    return { renting, overdue, debt, completed };
  }, [dashboardFilteredOrders]);

  // --- LỌC ĐƠN THUÊ ---
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchSearch =
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerPhone.includes(searchQuery) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;

      if (dateRangeStart && order.rentDate < dateRangeStart) return false;
      if (dateRangeEnd && order.rentDate > dateRangeEnd) return false;

      const overdue = isOrderOverdue(order);
      if (orderFilter === 'renting') return order.status === 'renting' && !overdue;
      if (orderFilter === 'overdue') return overdue;
      if (orderFilter === 'returned_debt') return order.status === 'returned_debt';
      if (orderFilter === 'returned') return order.status === 'returned';

      return true;
    });
  }, [orders, searchQuery, dateRangeStart, dateRangeEnd, orderFilter]);

  // --- THỐNG KÊ DOANH THU & DRILLDOWN ---
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

  // BIỂU ĐỒ DOANH THU TỪNG THÁNG TRONG NĂM
  const monthlyRevenueData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const m = (i + 1).toString().padStart(2, '0');
      return { month: `T${i + 1}`, fullMonth: `2026-${m}`, total: 0, paid: 0 };
    });

    orders.forEach(order => {
      if (order.rentDate) {
        const ym = order.rentDate.slice(0, 7);
        const found = months.find(m => m.fullMonth === ym);
        if (found) {
          found.total += Number(order.totalRentPrice) || 0;
          found.paid += Number(order.paidAmount) || 0;
        }
      }
    });

    const maxVal = Math.max(...months.map(m => m.total), 1000000);
    return { months, maxVal };
  }, [orders]);

  const drilldownOrders = useMemo(() => {
    if (statsDrilldown === 'paid') return statsOrders.filter(o => (o.paidAmount || 0) > 0);
    if (statsDrilldown === 'debt') return statsOrders.filter(o => ((o.totalRentPrice || 0) - (o.paidAmount || 0)) > 0);
    if (statsDrilldown === 'deposit') return statsOrders.filter(o => o.status === 'renting' && (o.depositAmount || 0) > 0);
    return statsOrders;
  }, [statsOrders, statsDrilldown]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans pb-24 md:pb-8 select-none">
      {/* CSS CHỐNG ZOOM VÀ CÔ LẬP KHỔ IN A4 */}
      <style>{`
        input, select, textarea {
          font-size: 16px !important;
        }
        @media (min-width: 640px) {
          input, select, textarea {
            font-size: 14px !important;
          }
        }
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          header, nav, main, .no-print {
            display: none !important;
          }
          .print-container {
            display: block !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: #ffffff !important;
            color: #000000 !important;
            padding: 10mm !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            z-index: 999999 !important;
          }
        }
      `}</style>

      {/* HEADER ỨNG DỤNG */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 px-4 py-3 shadow-lg no-print">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-1 bg-amber-500/10 border border-amber-500/40 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <RoyalDressLogo className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 bg-clip-text text-transparent uppercase tracking-wider">
                Dương Khiêm
              </h1>
              <p className="text-[10px] sm:text-[11px] text-amber-200/70 font-medium">Trang Phục & Đạo Cụ Biểu Diễn</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenCreateOrder}
              className="flex items-center space-x-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Tạo Đơn Thuê</span>
            </button>
          </div>
        </div>
      </header>

      {/* NỘI DUNG CHÍNH */}
      <main className="max-w-6xl mx-auto w-full px-3 sm:px-4 py-4 flex-1 no-print">
        {/* ==================== 1. DASHBOARD TỔNG QUAN ==================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-amber-400" /> Dashboard Tổng Quan
                </h2>
                {(dashStartDate || dashEndDate) && (
                  <button
                    onClick={() => { setDashStartDate(''); setDashEndDate(''); }}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Xóa lọc ngày
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Từ ngày:</label>
                  <input
                    type="date"
                    value={dashStartDate}
                    onChange={(e) => setDashStartDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Đến ngày:</label>
                  <input
                    type="date"
                    value={dashEndDate}
                    onChange={(e) => setDashEndDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* 4 Thẻ trạng thái */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div
                onClick={() => { setActiveTab('orders'); setOrderFilter('renting'); }}
                className="bg-slate-800/90 border border-blue-500/40 p-3.5 rounded-2xl cursor-pointer hover:border-blue-400 transition-all shadow-md"
              >
                <div className="flex items-center justify-between text-blue-400 text-xs font-bold">
                  <span>ĐANG CHO THUÊ</span>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-slate-100 mt-2">{dashboardStats.renting}</div>
                <div className="text-[11px] text-slate-400 mt-1">Đơn đang giữ đồ</div>
              </div>

              <div
                onClick={() => { setActiveTab('orders'); setOrderFilter('overdue'); }}
                className="bg-amber-400/10 border border-amber-400 p-3.5 rounded-2xl cursor-pointer hover:bg-amber-400/20 transition-all shadow-md ring-1 ring-amber-400/30"
              >
                <div className="flex items-center justify-between text-amber-400 text-xs font-bold">
                  <span>QUÁ HẠN TRẢ</span>
                  <AlertTriangle className="w-4 h-4 animate-bounce" />
                </div>
                <div className="text-2xl font-black text-amber-300 mt-2">{dashboardStats.overdue}</div>
                <div className="text-[11px] text-amber-300/80 mt-1">Cần nhắc khách</div>
              </div>

              <div
                onClick={() => { setActiveTab('orders'); setOrderFilter('returned_debt'); }}
                className="bg-rose-500/10 border border-rose-500 p-3.5 rounded-2xl cursor-pointer hover:bg-rose-500/20 transition-all shadow-md ring-1 ring-rose-500/30"
              >
                <div className="flex items-center justify-between text-rose-400 text-xs font-bold">
                  <span>CÒN NỢ TIỀN</span>
                  <CreditCard className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-rose-400 mt-2">{dashboardStats.debt}</div>
                <div className="text-[11px] text-rose-300/80 mt-1">Đã trả đồ - Còn thiếu nợ</div>
              </div>

              <div
                onClick={() => { setActiveTab('orders'); setOrderFilter('returned'); }}
                className="bg-slate-800/90 border border-emerald-500/40 p-3.5 rounded-2xl cursor-pointer hover:border-emerald-400 transition-all shadow-md"
              >
                <div className="flex items-center justify-between text-emerald-400 text-xs font-bold">
                  <span>ĐÃ HOÀN TẤT</span>
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-2xl font-black text-emerald-400 mt-2">{dashboardStats.completed}</div>
                <div className="text-[11px] text-slate-400 mt-1">Đã trả đồ & thanh toán đủ</div>
              </div>
            </div>

            {/* Đơn cần xử lý */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-400" /> Đơn Cần Xử Lý Nhanh (Quá hạn & Còn nợ)
                </h3>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1"
                >
                  Xem tất cả đơn <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {dashboardFilteredOrders.filter(o => isOrderOverdue(o) || o.status === 'returned_debt').length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 bg-slate-800/40 border border-slate-800 rounded-2xl">
                  Hiện không có đơn nào quá hạn hoặc nợ tiền trong giai đoạn này.
                </div>
              ) : (
                <div className="space-y-2">
                  {dashboardFilteredOrders.filter(o => isOrderOverdue(o) || o.status === 'returned_debt').slice(0, 5).map(o => (
                    <div
                      key={o.id}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-100 truncate">{o.customerName}</span>
                          <span className="text-[11px] text-amber-400 font-mono">#{o.id}</span>
                          {isOrderOverdue(o) && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-bold text-[10px]">
                              Quá hạn
                            </span>
                          )}
                          {o.status === 'returned_debt' && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-600 text-white font-bold text-[10px]">
                              Còn nợ
                            </span>
                          )}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          SĐT: <a href={`tel:${o.customerPhone}`} className="text-amber-300 font-medium">{o.customerPhone}</a> • Hạn trả: {o.returnDate}
                        </div>
                      </div>

                      <button
                        onClick={() => setDetailOrder(o)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-700 text-slate-200 text-xs font-semibold flex-shrink-0"
                      >
                        Chi tiết
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== 2. QUẢN LÝ ĐƠN THUÊ ==================== */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3 space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Tra cứu tên khách, SĐT, mã đơn..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-slate-400">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Từ ngày thuê:</label>
                  <input
                    type="date"
                    value={dateRangeStart}
                    onChange={(e) => setDateRangeStart(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Đến ngày thuê:</label>
                  <input
                    type="date"
                    value={dateRangeEnd}
                    onChange={(e) => setDateRangeEnd(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 text-xs"
                  />
                </div>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar pt-1">
                <button
                  onClick={() => setOrderFilter('all')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'all'
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                      : 'bg-slate-900 text-slate-300 border border-slate-700'
                  }`}
                >
                  Tất cả ({orders.length})
                </button>
                <button
                  onClick={() => setOrderFilter('renting')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'renting'
                      ? 'bg-blue-500 text-white font-bold shadow-sm'
                      : 'bg-slate-900 text-blue-400 border border-slate-700'
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
                      ? 'bg-rose-600 text-white font-bold shadow-sm'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  🛑 Còn nợ ({orders.filter(o => o.status === 'returned_debt').length})
                </button>
                <button
                  onClick={() => setOrderFilter('returned')}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                    orderFilter === 'returned'
                      ? 'bg-emerald-500 text-white font-bold shadow-sm'
                      : 'bg-slate-900 text-emerald-400 border border-slate-700'
                  }`}
                >
                  Đã hoàn tất ({orders.filter(o => o.status === 'returned').length})
                </button>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center bg-slate-800/40 border border-slate-800 rounded-2xl">
                <ShoppingBag className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                <p className="text-slate-400 text-xs sm:text-sm">Không tìm thấy đơn hàng nào phù hợp</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map(order => {
                  const overdue = isOrderOverdue(order);
                  const debt = (Number(order.totalRentPrice) || 0) - (Number(order.paidAmount) || 0);

                  return (
                    <div
                      key={order.id}
                      className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3.5 shadow-md space-y-3 transition-all hover:border-slate-600"
                    >
                      <div className="flex items-start justify-between gap-2 border-b border-slate-700/60 pb-2.5">
                        <div className="cursor-pointer" onClick={() => setDetailOrder(order)}>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm sm:text-base text-amber-200 hover:underline">
                              {order.customerName}
                            </span>
                            <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono font-semibold">
                              #{order.id}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                            <a href={`tel:${order.customerPhone}`} className="text-amber-400 font-medium">
                              {order.customerPhone}
                            </a>
                            {order.customerAddress && (
                              <span className="truncate max-w-[150px]">• {order.customerAddress}</span>
                            )}
                          </div>
                        </div>

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

                      <div
                        onClick={() => setDetailOrder(order)}
                        className="bg-slate-900/60 rounded-xl p-2.5 text-xs space-y-1 cursor-pointer hover:bg-slate-900"
                      >
                        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                          <span>TRANG PHỤC & ĐẠO CỤ ({order.items.length}):</span>
                          <span className="text-amber-300 flex items-center gap-0.5">
                            Chi tiết <Eye className="w-3 h-3" />
                          </span>
                        </div>
                        <div className="space-y-1">
                          {order.items.map((it, idx) => (
                            <div key={idx} className="flex justify-between items-center text-slate-200">
                              <span className="truncate pr-2">• {it.costumeName}</span>
                              <span className="font-bold text-amber-300">x{it.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                        <div>
                          <div className="text-slate-400">Thuê: <span className="text-slate-200">{order.rentDate}</span></div>
                          <div className={overdue ? "text-amber-400 font-bold" : "text-slate-400"}>
                            Hẹn trả: <span>{order.returnDate}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400">
                            Tiền thuê: <span className="font-bold text-slate-100">{formatVND(order.totalRentPrice)}</span>
                          </div>
                          {debt > 0 ? (
                            <div className="text-[11px] font-bold text-rose-400">Còn nợ: {formatVND(debt)}</div>
                          ) : (
                            <div className="text-[11px] text-emerald-400 font-medium">Đã thanh toán đủ</div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 gap-1.5 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleOpenEditOrder(order)}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-300 text-xs flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Sửa đơn</span>
                          </button>
                          <button
                            onClick={() => { setViewInvoiceOrder(order); setShowInvoiceModal(true); }}
                            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs flex items-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" /> <span className="hidden sm:inline">In phiếu</span>
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Xóa</span>
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {order.status === 'renting' && (
                            <button
                              onClick={() => handleReturnCostumes(order.id)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95"
                            >
                              <CheckCircle className="w-3.5 h-3.5" /> Trả Đồ
                            </button>
                          )}
                          {order.status === 'returned_debt' && (
                            <button
                              onClick={() => handlePayRemainingDebt(order.id)}
                              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95"
                            >
                              <CreditCard className="w-3.5 h-3.5" /> Thu Hết Nợ
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

        {/* ==================== 3. KHO TRANG PHỤC & ĐẠO CỤ ==================== */}
        {activeTab === 'costumes' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">
                Kho Dương Khiêm ({inventoryStats.length} mẫu)
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-amber-300 font-medium text-xs flex items-center gap-1"
                >
                  <FolderPlus className="w-3.5 h-3.5" /> Thêm Danh Mục
                </button>
                <button
                  onClick={() => setShowCostumeModal(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-sm"
                >
                  <Plus className="w-4 h-4 stroke-[3]" /> Thêm Mẫu Mới
                </button>
              </div>
            </div>

            <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <button
                onClick={() => setSelectedCostumeCategory('Tất cả')}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                  selectedCostumeCategory === 'Tất cả'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                }`}
              >
                Tất cả
              </button>
              {categories.map(cat => (
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {inventoryStats
                .filter(c => selectedCostumeCategory === 'Tất cả' || c.category === selectedCostumeCategory)
                .map(item => (
                  <div
                    key={item.id}
                    className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden flex flex-col shadow-md relative"
                  >
                    <button
                      onClick={() => handleDeleteCostume(item.id)}
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 text-rose-400 hover:bg-rose-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="relative aspect-square w-full bg-slate-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[10px] text-amber-300 font-semibold">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 flex-1 flex flex-col justify-between space-y-2">
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm text-slate-100 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-slate-400 mt-0.5">Size: {item.size}</p>
                      </div>

                      <div className="space-y-1.5 pt-1 border-t border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 text-[11px]">Tổng kho:</span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleAdjustCostumeQty(item.id, -1)}
                              className="w-5 h-5 rounded bg-slate-700 text-slate-200 font-bold flex items-center justify-center hover:bg-slate-600"
                            >
                              -
                            </button>
                            <span className="font-bold text-slate-100 text-xs w-6 text-center">{item.totalQty}</span>
                            <button
                              onClick={() => handleAdjustCostumeQty(item.id, 1)}
                              className="w-5 h-5 rounded bg-amber-400 text-slate-950 font-bold flex items-center justify-center hover:bg-amber-300"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 text-center text-[10px] bg-slate-900/60 rounded-lg py-1">
                          <div>
                            <span className="text-blue-400">Đang thuê:</span> <b>{item.rentedQty}</b>
                          </div>
                          <div>
                            <span className="text-emerald-400">Sẵn có:</span> <b>{item.availableQty}</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==================== 4. DOANH THU & BIỂU ĐỒ ==================== */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            {/* BIỂU ĐỒ DOANH THU TỪNG THÁNG */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-amber-400" /> Biểu Đồ Doanh Thu Từng Tháng (Năm 2026)
                </h3>
                <span className="text-[11px] text-slate-400">Đơn vị: VNĐ</span>
              </div>

              <div className="h-44 pt-6 pb-2 flex items-end justify-between gap-1 border-b border-slate-700">
                {monthlyRevenueData.months.map((item, idx) => {
                  const heightPercent = Math.min(100, Math.round((item.total / monthlyRevenueData.maxVal) * 100));
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-12 bg-slate-950 text-amber-300 text-[10px] px-1.5 py-0.5 rounded shadow pointer-events-none z-20 whitespace-nowrap">
                        {item.month}: {formatVND(item.total)}
                      </div>

                      <div className="w-full max-w-[20px] bg-slate-700/60 rounded-t-md h-full flex items-end overflow-hidden">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            item.total > 0
                              ? 'bg-gradient-to-t from-amber-600 to-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                              : 'bg-transparent'
                          }`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{item.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-gradient-to-t from-amber-600 to-amber-400" />
                  <span>Doanh thu tháng</span>
                </div>
              </div>
            </div>

            {/* BỘ LỌC THỜI GIAN THỐNG KÊ */}
            <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-amber-300 uppercase">
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4" /> Báo Cáo Chi Tiết
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
                  Tháng 10/2026
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

            {/* 4 Thẻ chỉ số chính */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setStatsDrilldown('all')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'all' ? 'bg-amber-500/20 border-amber-400 ring-1 ring-amber-400' : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-amber-300 flex items-center justify-between">
                  <span>TỔNG DOANH THU</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-100 mt-1">{formatVND(statsTotals.totalRevenue)}</div>
              </button>

              <button
                onClick={() => setStatsDrilldown('paid')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'paid' ? 'bg-emerald-500/20 border-emerald-400 ring-1 ring-emerald-400' : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center justify-between">
                  <span>ĐÃ THANH TOÁN</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1">{formatVND(statsTotals.totalPaid)}</div>
              </button>

              <button
                onClick={() => setStatsDrilldown('debt')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'debt' ? 'bg-rose-500/20 border-rose-400 ring-1 ring-rose-400' : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-rose-400 flex items-center justify-between">
                  <span>CHƯA THU (NỢ)</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-rose-400 mt-1">{formatVND(statsTotals.totalDebt)}</div>
              </button>

              <button
                onClick={() => setStatsDrilldown('deposit')}
                className={`p-3 rounded-2xl text-left border transition-all ${
                  statsDrilldown === 'deposit' ? 'bg-blue-500/20 border-blue-400 ring-1 ring-blue-400' : 'bg-slate-800 border-slate-700'
                }`}
              >
                <div className="text-[11px] font-semibold text-blue-400 flex items-center justify-between">
                  <span>CỌC ĐANG GIỮ</span> <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-base sm:text-lg font-bold text-blue-400 mt-1">{formatVND(statsTotals.totalDeposit)}</div>
              </button>
            </div>

            {/* Chi tiết đơn drilldown */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-300">
                Chi tiết danh sách ({drilldownOrders.length} đơn)
              </div>
              <div className="space-y-2">
                {drilldownOrders.map(o => {
                  const debt = (Number(o.totalRentPrice) || 0) - (Number(o.paidAmount) || 0);
                  return (
                    <div key={o.id} className="p-3 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-200">{o.customerName} - #{o.id}</div>
                        <div className="text-slate-400 text-[11px]">Ngày: {o.rentDate}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-100">{formatVND(o.totalRentPrice)}</div>
                        {debt > 0 ? (
                          <div className="text-[11px] font-bold text-rose-400">Nợ: {formatVND(debt)}</div>
                        ) : (
                          <div className="text-[11px] text-emerald-400">Đã trả đủ</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================== POPUP CHI TIẾT ĐƠN HÀNG ==================== */}
      {detailOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 no-print">
          <div className="bg-slate-800 border-t sm:border border-slate-700 w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-amber-300 flex items-center gap-2">
                  Chi Tiết Đơn Hàng #{detailOrder.id}
                </h3>
                <p className="text-[11px] text-slate-400">Khách: {detailOrder.customerName}</p>
              </div>
              <button onClick={() => setDetailOrder(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4 overflow-y-auto text-xs">
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Số điện thoại:</span>
                  <a href={`tel:${detailOrder.customerPhone}`} className="text-amber-400 font-bold">{detailOrder.customerPhone}</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Địa chỉ / CCCD:</span>
                  <span className="text-slate-200">{detailOrder.customerAddress || 'Chưa cung cấp'}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Ngày thuê:</span>
                  <span className="text-slate-200">{detailOrder.rentDate}</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-amber-300 font-semibold">Hẹn ngày trả:</span>
                  <input
                    type="date"
                    value={detailOrder.returnDate}
                    onChange={(e) => handleUpdateDetailReturnDate(e.target.value)}
                    className="bg-slate-800 border border-amber-400/50 rounded px-2 py-1 text-xs text-amber-200 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-amber-300 uppercase text-[11px]">
                  Danh sách trang phục & đạo cụ ({detailOrder.items.length}):
                </div>
                <div className="border border-slate-700 rounded-xl overflow-hidden divide-y divide-slate-700">
                  {detailOrder.items.map((it, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-900/40 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-500 font-mono">{idx + 1}.</span>
                        <span className="font-semibold text-slate-200">{it.costumeName}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold text-xs">
                        x{it.quantity} bộ/cái
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tổng tiền thuê:</span>
                  <span className="font-bold text-slate-100">{formatVND(detailOrder.totalRentPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Tiền cọc giữ:</span>
                  <span className="text-blue-300 font-medium">{formatVND(detailOrder.depositAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Khách đã trả:</span>
                  <span className="text-emerald-400 font-medium">{formatVND(detailOrder.paidAmount)}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-sm">
                  <span>Còn nợ:</span>
                  <span className="text-rose-400">
                    {formatVND(Math.max(0, (detailOrder.totalRentPrice || 0) - (detailOrder.paidAmount || 0)))}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => {
                    handleOpenEditOrder(detailOrder);
                    setDetailOrder(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Edit className="w-3.5 h-3.5" /> Sửa Đơn Này
                </button>
                <button
                  onClick={() => {
                    setViewInvoiceOrder(detailOrder);
                    setShowInvoiceModal(true);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> In Phiếu PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== FORM TẠO / SỬA ĐƠN THUÊ ==================== */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 no-print">
          <div className="bg-slate-800 border-t sm:border border-slate-700 w-full sm:max-w-2xl rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-amber-300">
                {editingOrderId ? `Chỉnh Sửa Đơn Thuê #${editingOrderId}` : 'Tạo Đơn Thuê Trang Phục Mới'}
              </h3>
              <button onClick={() => setShowOrderModal(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOrder} className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="space-y-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60 relative">
                <div className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Thông tin người thuê
                </div>

                <div className="relative">
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">Họ Tên Khách Hàng *</label>
                  <input
                    type="text"
                    required
                    placeholder="Gõ tên khách (tự động gợi ý khách quen)..."
                    value={orderForm.customerName}
                    onChange={(e) => handleCustomerNameChange(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />

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
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Số Điện Thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="09xxxxxxxx"
                      value={orderForm.customerPhone}
                      onChange={(e) => setOrderForm({ ...orderForm, customerPhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Địa Chỉ / CCCD</label>
                    <input
                      type="text"
                      placeholder="Địa chỉ hoặc căn cước..."
                      value={orderForm.customerAddress}
                      onChange={(e) => setOrderForm({ ...orderForm, customerAddress: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Ngày Thuê</label>
                    <input
                      type="date"
                      value={orderForm.rentDate}
                      onChange={(e) => setOrderForm({ ...orderForm, rentDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Hẹn Ngày Trả</label>
                    <input
                      type="date"
                      value={orderForm.returnDate}
                      onChange={(e) => setOrderForm({ ...orderForm, returnDate: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* CHỌN ĐỒ THUÊ */}
              <div className="space-y-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <div className="text-xs font-bold text-amber-300 uppercase flex items-center justify-between">
                  <span>Chọn trang phục / đạo cụ thuê:</span>
                  <span className="text-[11px] text-slate-400">
                    Đã chọn: <b className="text-amber-400">{Object.values(orderForm.selectedItems).reduce((a, b) => a + b, 0)}</b> món
                  </span>
                </div>

                <div className="flex gap-1 overflow-x-auto pb-1 text-xs no-scrollbar">
                  {categories.map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setModalCategoryTab(cat)}
                      className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap text-xs transition-all ${
                        modalCategoryTab === cat ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

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
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-200 truncate">{item.name}</p>
                              <p className="text-[11px] text-slate-400">
                                Kho sẵn: <span className="font-bold text-emerald-400">{item.availableQty}</span>
                                {selectedCount > item.availableQty && (
                                  <span className="text-amber-400 ml-1 font-bold">(Lấy ngoài +{selectedCount - item.availableQty})</span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => handleItemQtyChange(item.id, -1)}
                              disabled={selectedCount <= 0}
                              className="w-7 h-7 rounded-lg bg-slate-700 text-slate-200 disabled:opacity-30 flex items-center justify-center font-bold text-sm"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-bold text-amber-300 text-sm">{selectedCount}</span>
                            <button
                              type="button"
                              onClick={() => handleItemQtyChange(item.id, 1)}
                              className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Chi phí & Thanh toán */}
              <div className="space-y-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-700/60">
                <div className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5" /> Chi phí & Thanh toán
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Tổng Tiền Thuê (VNĐ) *</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      required
                      placeholder="0"
                      value={formatInputNumber(orderForm.totalRentPrice)}
                      onChange={(e) => setOrderForm({ ...orderForm, totalRentPrice: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Tiền Cọc (VNĐ)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={formatInputNumber(orderForm.depositAmount)}
                      onChange={(e) => setOrderForm({ ...orderForm, depositAmount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl font-bold text-blue-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Khách Trả Trước (VNĐ)</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0"
                      value={formatInputNumber(orderForm.paidAmount)}
                      onChange={(e) => setOrderForm({ ...orderForm, paidAmount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl font-bold text-emerald-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-300 font-medium block mb-1">Còn Nợ Thu Sau</label>
                    <div className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl font-bold text-rose-400">
                      {formatVND(
                        Math.max(0, parseInputNumber(orderForm.totalRentPrice) - parseInputNumber(orderForm.paidAmount))
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">Ghi Chú Đơn Hàng</label>
                  <input
                    type="text"
                    placeholder="Diễn văn nghệ, lấy thêm đồ..."
                    value={orderForm.notes}
                    onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-lg active:scale-98"
                >
                  {editingOrderId ? 'Lưu Thay Đổi Đơn Hàng' : 'Hoàn Tất & Tạo Đơn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL TẠO DANH MỤC MỚI ==================== */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 no-print">
          <div className="bg-slate-800 border border-slate-700 w-full max-w-xs rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-amber-300">Tạo Danh Mục Mới</h3>
              <button onClick={() => setShowCategoryModal(false)} className="text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="space-y-3">
              <input
                type="text"
                required
                placeholder="Ví dụ: Áo bà ba, Váy múa Tây Bắc..."
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl"
              >
                Thêm Danh Mục
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MODAL THÊM SẢN PHẨM & CAMERA ==================== */}
      {showCostumeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 no-print">
          <div className="bg-slate-800 border-t sm:border border-slate-700 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col overflow-hidden">
            <div className="px-4 py-3 bg-slate-900 border-b border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-sm text-amber-300">Thêm Mẫu Vào Kho</h3>
              <button onClick={() => { stopCamera(); setShowCostumeModal(false); }} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCostume} className="p-4 space-y-3 overflow-y-auto">
              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">Tên Mẫu Sản Phẩm *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Đồ múa quạt lụa sen..."
                  value={costumeForm.name}
                  onChange={(e) => setCostumeForm({ ...costumeForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">Danh Mục</label>
                  <select
                    value={costumeForm.category}
                    onChange={(e) => setCostumeForm({ ...costumeForm, category: e.target.value })}
                    className="w-full px-2.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-300 font-medium block mb-1">Số Lượng Tổng</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={costumeForm.totalQty}
                    onChange={(e) => setCostumeForm({ ...costumeForm, totalQty: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-300 font-medium block mb-1">Size / Quy cách</label>
                <input
                  type="text"
                  placeholder="S, M, L hoặc Tiêu chuẩn..."
                  value={costumeForm.size}
                  onChange={(e) => setCostumeForm({ ...costumeForm, size: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-slate-100 focus:outline-none focus:border-amber-400"
                />
              </div>

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
                      <img src={costumeForm.image} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
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
                <button type="submit" className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs">
                  Lưu Vào Kho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== MẪU IN PHIẾU THUÊ CHUẨN A4 / PDF (CÔ LẬP NỘI DUNG) ==================== */}
      {showInvoiceModal && viewInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3">
          <div className="bg-white text-slate-900 w-full max-w-xl rounded-2xl p-6 shadow-2xl relative space-y-4 print-container">
            <button
              onClick={() => setShowInvoiceModal(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-slate-100 text-slate-500 hover:text-black no-print"
            >
              <X className="w-5 h-5" />
            </button>

            {/* HEADER IN PHIẾU */}
            <div className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-extrabold text-base sm:text-lg uppercase text-amber-800">
                    Trang Phục Biểu Diễn Dương Khiêm
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    <b>Địa chỉ:</b> 375 QL1A, xã Tuy An Bắc – Đắk Lắk
                  </p>
                  <p className="text-xs text-slate-600">
                    <b>Hotline:</b> 0392704934
                  </p>
                </div>
                <div className="w-12 h-12 flex-shrink-0">
                  <RoyalDressLogo className="w-12 h-12" />
                </div>
              </div>

              <div className="text-center mt-3 pt-2 border-t border-dashed">
                <h3 className="font-black text-lg text-slate-900 uppercase tracking-wider">
                  PHIẾU THUÊ TRANG PHỤC & ĐẠO CỤ
                </h3>
                <p className="text-xs text-slate-500">Mã phiếu: <b>#{viewInvoiceOrder.id}</b></p>
              </div>
            </div>

            {/* THÔNG TIN KHÁCH HÀNG */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>Khách hàng: <b>{viewInvoiceOrder.customerName}</b></div>
              <div>Số điện thoại: <b>{viewInvoiceOrder.customerPhone}</b></div>
              <div>Địa chỉ/CCCD: {viewInvoiceOrder.customerAddress || 'Tại cửa hàng'}</div>
              <div>
                Thời hạn: <b>{viewInvoiceOrder.rentDate}</b> ➔ <b>{viewInvoiceOrder.returnDate}</b>
              </div>
            </div>

            {/* BẢNG TRANG PHỤC & ĐẠO CỤ THUÊ */}
            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                  <tr>
                    <th className="p-2 w-10 text-center">STT</th>
                    <th className="p-2">Tên Trang Phục / Đạo Cụ</th>
                    <th className="p-2 w-24 text-center">Số lượng</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {viewInvoiceOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="p-2 text-center text-slate-500">{idx + 1}</td>
                      <td className="p-2 font-medium text-slate-800">{it.costumeName}</td>
                      <td className="p-2 text-center font-bold text-slate-900">{it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* TỔNG KẾT TIỀN */}
            <div className="text-xs space-y-1 pt-1">
              <div className="flex justify-between">
                <span>Tổng tiền thuê:</span>
                <span className="font-bold">{formatVND(viewInvoiceOrder.totalRentPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tiền cọc đảm bảo:</span>
                <span className="font-medium">{formatVND(viewInvoiceOrder.depositAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Khách đã thanh toán:</span>
                <span className="font-semibold text-emerald-700">{formatVND(viewInvoiceOrder.paidAmount)}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold border-t pt-1">
                <span>Số tiền còn nợ:</span>
                <span className="text-rose-600">
                  {formatVND(Math.max(0, (viewInvoiceOrder.totalRentPrice || 0) - (viewInvoiceOrder.paidAmount || 0)))}
                </span>
              </div>
            </div>

            {/* CHỮ KÝ VÀ TÊN DƯƠNG THỊ MINH KHIÊM */}
            <div className="border-t pt-2 text-[11px] text-slate-500 space-y-2">
              <p className="italic leading-relaxed">
                * Quý khách vui lòng kiểm tra kỹ trang phục trước khi nhận và hoàn trả đúng hạn. Nếu xảy ra hư hỏng, rách hoặc mất đồ, quý khách chịu trách nhiệm bồi thường theo thỏa thuận của cửa hàng.
              </p>

              <div className="grid grid-cols-2 text-center pt-2">
                <div>
                  <b className="text-slate-800">Người Thuê Đồ</b>
                  <p className="text-[10px] text-slate-400 mt-0.5">(Ký và ghi rõ họ tên)</p>
                  <div className="h-16" />
                </div>

                <div className="flex flex-col items-center">
                  <b className="text-slate-800">Đại diện bên Thuê</b>
                  <p className="text-[10px] text-slate-400 mt-0.5">(Ký nhận)</p>
                  <div className="h-14 flex items-center justify-center my-1">
                    <SignatureSVG className="h-12 w-auto" />
                  </div>
                  <b className="text-xs text-slate-900 font-bold uppercase tracking-wide">
                    Dương Thị Minh Khiêm
                  </b>
                </div>
              </div>
            </div>

            {/* NÚT THỰC HIỆN IN RA FILE PDF */}
            <div className="pt-2 no-print">
              <button
                onClick={() => window.print()}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-800"
              >
                <Printer className="w-4 h-4" /> In Phiếu Hóa Đơn (Khổ A4 / Lưu PDF)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* THANH ĐIỀU HƯỚNG DƯỚI ĐÁY */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex justify-around items-center max-w-6xl mx-auto shadow-2xl no-print">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'dashboard' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Tổng Quan</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'orders' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <ShoppingBag className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Đơn Thuê</span>
        </button>

        <button
          onClick={() => setActiveTab('costumes')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'costumes' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <Package className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Kho & Đạo Cụ</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all ${
            activeTab === 'stats' ? 'text-amber-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <BarChart3 className="w-5 h-5 mb-0.5" />
          <span className="text-[10px]">Doanh Thu</span>
        </button>
      </nav>
    </div>
  );
}
