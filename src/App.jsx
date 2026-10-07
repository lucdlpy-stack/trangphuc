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
  const [statsDrilldown, setStatsDrilldown] = useState('
