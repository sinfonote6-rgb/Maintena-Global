import React, { useState, useEffect, useMemo } from 'react';
import { 
  Building2, Wrench, ShieldCheck, Activity, Globe, DollarSign, Package, 
  Clock, AlertTriangle, Plus, Search, Filter, CheckCircle2, XCircle, 
  TrendingUp, Users, Server, Settings, ChevronRight, Menu, X, ArrowUpRight,
  Calendar, Layers, FileText, Check, AlertCircle, Cpu, RefreshCw, Lock, Eye,
  Sliders, ChevronDown, Bell, LogOut, LayoutDashboard
} from 'lucide-react';

// ==========================================
// LOCALIZATION DICTIONARIES (EN, BN, AR)
// ==========================================
const translations = {
  en: {
    appName: "GearPulse",
    tagline: "Global Factory Maintenance SaaS",
    nav: {
      dashboard: "Dashboard",
      assets: "Machine Register",
      workOrders: "Work Orders",
      parts: "Spare Parts",
      analytics: "Cost & Downtime",
      superAdmin: "Super Admin",
      settings: "Settings"
    },
    tenant: {
      activeTenant: "Active Tenant",
      switchTenant: "Switch Factory Context",
      apexTex: "Apex Textiles Ltd. (Dhaka)",
      gulfSteel: "Gulf Steel Works (Riyadh)",
      euroAuto: "EuroAuto Motors (Munich)",
      superAdminView: "Global Platform HQ (Super Admin)"
    },
    kpi: {
      totalAssets: "Total Machines",
      operational: "Operational Rate",
      activeWorkOrders: "Pending Work Orders",
      monthlyMaintenance: "Maint. Cost (MTD)",
      mtbf: "Avg MTBF",
      mttr: "Avg MTTR",
      criticalDown: "Critical Down",
      healthScore: "Fleet Health"
    },
    assets: {
      title: "Factory Asset & Machine Register",
      subtitle: "Comprehensive asset tracking, telemetry health, and maintenance history.",
      addAsset: "Register New Machine",
      searchPlaceholder: "Search machines, line ID, or location...",
      filterStatus: "Status: All",
      serial: "Serial No",
      health: "Health",
      location: "Factory Line",
      lastMaint: "Last Serviced",
      nextMaint: "Next Schedule",
      actions: "Actions",
      statusOperational: "Operational",
      statusWarning: "Warning",
      statusCritical: "Critical Down",
      statusMaintenance: "In Servicing"
    },
    workOrders: {
      title: "Preventive & Corrective Maintenance",
      subtitle: "Manage job requests, technician assignments, and schedule execution.",
      newOrder: "Create Work Order",
      kanban: "Kanban Board",
      table: "List View",
      todo: "Pending / To Do",
      inProgress: "In Progress",
      review: "Quality Inspection",
      completed: "Completed",
      priorityHigh: "High Priority",
      priorityMedium: "Medium",
      priorityLow: "Low"
    },
    parts: {
      title: "Spare Parts & Inventory Management",
      subtitle: "Monitor critical stock levels, reorder thresholds, and usage costs.",
      addPart: "Add Spare Part",
      partName: "Part Name / SKU",
      stock: "In Stock",
      minLevel: "Min Threshold",
      unitCost: "Unit Cost",
      location: "Warehouse Bin",
      status: "Stock Status",
      reorder: "Reorder Required",
      adequate: "Adequate"
    },
    admin: {
      title: "Global Super Admin Operations",
      subtitle: "Platform-wide MRR, multi-tenant billing, feature control & server clusters.",
      totalTenants: "Active Enterprise Tenants",
      mrr: "Monthly Recurring Revenue",
      deploymentRegions: "Global Cloud Node Health",
      tenantDirectory: "Global Customer Directory",
      plan: "Subscription Tier",
      users: "Active Users",
      mrrContribution: "MRR Contribution",
      region: "Primary Region",
      featureFlags: "Tenant Capability Matrix"
    },
    common: {
      currency: "Currency",
      lang: "Language",
      save: "Save Changes",
      cancel: "Cancel",
      viewDetails: "View Details",
      edit: "Edit",
      delete: "Delete",
      export: "Export Report",
      all: "All",
      quickStats: "Quick Insights"
    }
  },
  bn: {
    appName: "গিয়ারপাল্স",
    tagline: "গ্লোবাল ফ্যাক্টরি রক্ষণাবেক্ষণ সাশ (SaaS)",
    nav: {
      dashboard: "ড্যাশবোর্ড",
      assets: "মেশিন রেজিস্টার",
      workOrders: "ওয়ার্ক অর্ডার",
      parts: "যন্ত্রাংশ স্টক",
      analytics: "খরচ ও ডাউনটাইম",
      superAdmin: "সুপার অ্যাডমিন",
      settings: "সেটিংস"
    },
    tenant: {
      activeTenant: "সক্রিয় কারখানা",
      switchTenant: "কারখানা পরিবর্তন করুন",
      apexTex: "অ্যাপেক্স টেক্সটাইলস লিঃ (ঢাকা)",
      gulfSteel: "গলফ স্টিল ওয়ার্কস (রিয়াদ)",
      euroAuto: "ইউরোঅটো মোটরস (মিউনিখ)",
      superAdminView: "গ্লোবাল হেডকোয়ার্টার (সুপার অ্যাডমিন)"
    },
    kpi: {
      totalAssets: "মোট মেশিন",
      operational: "সচলতার হার",
      activeWorkOrders: "বকেয়া ওয়ার্ক অর্ডার",
      monthlyMaintenance: "চলতি মাসের খরচ",
      mtbf: "গড় এমটিবিএফ (MTBF)",
      mttr: "গড় এমটিটিআর (MTTR)",
      criticalDown: "জরুরি বন্ধ মেশিন",
      healthScore: "সামগ্রিক স্বাস্থ্য"
    },
    assets: {
      title: "কারখানা সরঞ্জাম ও মেশিন রেজিস্টার",
      subtitle: "সরঞ্জামের তথ্য, হেলথ স্কোর এবং রক্ষণাবেক্ষণের ইতিহাস।",
      addAsset: "নতুন মেশিন যুক্ত করুন",
      searchPlaceholder: "মেশিন, লাইন আইডি বা অবস্থান খুঁজুন...",
      filterStatus: "স্ট্যাটাস: সব",
      serial: "সিরিয়াল নম্বর",
      health: "স্বাস্থ্য",
      location: "উৎপাদন লাইন",
      lastMaint: "সর্বশেষ সার্ভিস",
      nextMaint: "পরবর্তী সিডিউল",
      actions: "অ্যাকশন",
      statusOperational: "সচল",
      statusWarning: "সতর্কতা",
      statusCritical: "গুরুতর অচল",
      statusMaintenance: "সার্ভিসিং চলছে"
    },
    workOrders: {
      title: "প্রতিরোধমূলক ও মেরামত ওয়ার্ক অর্ডার",
      subtitle: "কাজের অনুরোধ, টেকনিশিয়ান বরাদ্দ এবং সময়সূচী পরিচালনা করুন।",
      newOrder: "নতুন কাজ তৈরি করুন",
      kanban: "কানবান বোর্ড",
      table: "তালিকা ভিউ",
      todo: "অপেক্ষমান",
      inProgress: "চলমান কাজ",
      review: "মান পর্যবেক্ষণ",
      completed: "সম্পন্ন",
      priorityHigh: "জরুরি",
      priorityMedium: "মাঝারি",
      priorityLow: "সাধারণ"
    },
    parts: {
      title: "যন্ত্রাংশ ও ইনভেন্টরি ব্যবস্থাপনা",
      subtitle: "জরুরি যন্ত্রাংশের স্টক, পুনর্দানের সীমা এবং খরচ পর্যবেক্ষণ।",
      addPart: "নতুন পার্টস যুক্ত করুন",
      partName: "পার্টসের নাম / SKU",
      stock: "মজুদ সংখ্যা",
      minLevel: "সর্বনিম্ন সীমা",
      unitCost: "একক মূল্য",
      location: "ওয়্যারহাউস বিন",
      status: "স্টক অবস্থা",
      reorder: "পুনরায় অর্ডার প্রয়োজন",
      adequate: "পর্যাপ্ত"
    },
    admin: {
      title: "গ্লোবাল সুপার অ্যাডমিন প্যানেল",
      subtitle: "প্ল্যাটফর্মের এমআরআর (MRR), সাবস্ক্রিপশন, ফিচার ফ্ল্যাগ এবং সার্ভার হেলথ।",
      totalTenants: "সক্রিয় গ্রাহক প্রতিষ্ঠান",
      mrr: "মাসিক সাবস্ক্রিপশন আয় (MRR)",
      deploymentRegions: "ক্লাউড ক্লাস্টার স্ট্যাটাস",
      tenantDirectory: "গ্রাহক তালিকার বিবরণ",
      plan: "সাবস্ক্রিপশন প্ল্যান",
      users: "সক্রিয় ব্যবহারকারী",
      mrrContribution: "আয় অবদান",
      region: "প্রধান রিজিওন",
      featureFlags: "ফিচার সুবিধা ম্যাট্রিক্স"
    },
    common: {
      currency: "মুদ্রা",
      lang: "ভাষা",
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল",
      viewDetails: "বিস্তারিত দেখুন",
      edit: "সম্পাদনা",
      delete: "মুছে ফেলুন",
      export: "রিপোর্ট এক্সপোর্ট",
      all: "সব",
      quickStats: "দ্রুত পরিসংখ্যান"
    }
  },
  ar: {
    appName: "جير بلس",
    tagline: "منصة إدارة صيانة المصانع العالمية",
    nav: {
      dashboard: "لوحة التحكم",
      assets: "سجل المعدات",
      workOrders: "أوامر العمل",
      parts: "قطع الغيار",
      analytics: "التكاليف والتوقف",
      superAdmin: "الإدارة العليا",
      settings: "الإعدادات"
    },
    tenant: {
      activeTenant: "المصنع النشط",
      switchTenant: "تغيير سياق المصنع",
      apexTex: "أبيكس للمنسوجات المحدودة (دكا)",
      gulfSteel: "شركة أعمال الصلب الخليجية (الرياض)",
      euroAuto: "أورو أوتو للمحركات (ميونيخ)",
      superAdminView: "المقر الرئيسي للمنصة (الإدارة العليا)"
    },
    kpi: {
      totalAssets: "إجمالي الآلات",
      operational: "معدل التشغيل",
      activeWorkOrders: "أوامر العمل المعلقة",
      monthlyMaintenance: "تكلفة الصيانة (الشهر)",
      mtbf: "متوسط الوقت بين الأعطال",
      mttr: "متوسط وقت الإصلاح",
      criticalDown: "توقف حرج",
      healthScore: "صحة المعدات"
    },
    assets: {
      title: "سجل الآلات والمعدات بالمصنع",
      subtitle: "تتبع شامل للأصول، المؤشرات الحيوية، وتاريخ الصيانة.",
      addAsset: "تسجيل آلة جديدة",
      searchPlaceholder: "البحث عن الآلات، خط الإنتاج، أو الموقع...",
      filterStatus: "الحالة: الكل",
      serial: "الرقم التسلسلي",
      health: "مستوى الصحة",
      location: "خط الإنتاج",
      lastMaint: "آخر صيانة",
      nextMaint: "الصيانة القادمة",
      actions: "الإجراءات",
      statusOperational: "عملي / شغال",
      statusWarning: "تحذير",
      statusCritical: "توقف حرج",
      statusMaintenance: "قيد الصيانة"
    },
    workOrders: {
      title: "أوامر الصيانة الوقائية والتصحيحية",
      subtitle: "إدارة طلبات العمل، تعيين الفنيين، وتتبع الجداول الزمنية.",
      newOrder: "إنشاء أمر عمل",
      kanban: "لوحة كانبان",
      table: "عرض القائمة",
      todo: "معلق / للقيام به",
      inProgress: "قيد التنفيذ",
      review: "فحص الجودة",
      completed: "مكتمل",
      priorityHigh: "أولوية قصوى",
      priorityMedium: "متوسطة",
      priorityLow: "منخفضة"
    },
    parts: {
      title: "إدارة قطع الغيار والمخزون",
      subtitle: "مراقبة مستويات المخزون الحرجة، إعادة الطلب، والتكاليف.",
      addPart: "إضافة قطعة غيار",
      partName: "اسم القطعة / SKU",
      stock: "المتوفر في المخزن",
      minLevel: "الحد الأدنى",
      unitCost: "سعر الوحدة",
      location: "موقع المستودع",
      status: "حالة المخزون",
      reorder: "يلزم إعادة الطلب",
      adequate: "كافٍ"
    },
    admin: {
      title: "عمليات الإدارة العليا العالمية",
      subtitle: "الإيرادات الشهرية، الفوترة المتعددة، الميزات والخوادم.",
      totalTenants: "المؤسسات النشطة",
      mrr: "الإيرادات الشهرية المتكررة",
      deploymentRegions: "حالة السحابة العالمية",
      tenantDirectory: "دليل العملاء العالمي",
      plan: "باقة الاشتراك",
      users: "المستخدمين النشطين",
      mrrContribution: "مساهمة الإيرادات",
      region: "المنطقة الرئيسية",
      featureFlags: "مصفوفة ميزات المشتركين"
    },
    common: {
      currency: "العملة",
      lang: "اللغة",
      save: "حفظ التغييرات",
      cancel: "إلغاء",
      viewDetails: "عرض التفاصيل",
      edit: "تعديل",
      delete: "حذف",
      export: "تصدير التقرير",
      all: "الكل",
      quickStats: "إحصائيات سريعة"
    }
  }
};

// ==========================================
// CURRENCY CONVERSION RATES & FORMATTING
// BASE: USD
// ==========================================
const currencies = {
  USD: { symbol: '$', rate: 1.0, name: 'USD - US Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR - Euro' },
  BDT: { symbol: '৳', rate: 118.5, name: 'BDT - Bangladeshi Taka' },
  SAR: { symbol: '﷼', rate: 3.75, name: 'SAR - Saudi Riyal' },
  AED: { symbol: 'د.إ', rate: 3.67, name: 'AED - UAE Dirham' }
};

// INITIAL MOCK DATA
const initialAssets = [
  { id: 'MC-101', name: 'CNC High-Speed Milling Machine V3', category: 'Machining', location: 'Line A - Bay 2', health: 94, status: 'Operational', lastMaint: '2026-10-12', nextMaint: '2026-11-15', serial: 'CNC-2024-8891' },
  { id: 'MC-102', name: 'Hydraulic Stamping Press 500T', category: 'Pressing', location: 'Line B - Bay 1', health: 62, status: 'Warning', lastMaint: '2026-09-28', nextMaint: '2026-11-02', serial: 'HYD-500-4412' },
  { id: 'MC-103', name: 'Automated Robotic Arm Welder X2', category: 'Robotics', location: 'Assembly Line 1', health: 18, status: 'Critical Down', lastMaint: '2026-10-01', nextMaint: '2026-10-29', serial: 'ROB-W-9902' },
  { id: 'MC-104', name: 'Industrial Rotary Compressor 75kW', category: 'Utilities', location: 'Power House East', health: 88, status: 'Operational', lastMaint: '2026-10-18', nextMaint: '2026-12-01', serial: 'CMP-75-3310' },
  { id: 'MC-105', name: 'High-Temperature Injection Molding M/C', category: 'Molding', location: 'Plastics Dept', health: 45, status: 'Under Maintenance', lastMaint: '2026-10-28', nextMaint: '2026-10-31', serial: 'INJ-M-1209' },
  { id: 'MC-106', name: 'Thermal Powder Coating Line C', category: 'Finishing', location: 'Paint Shop', health: 91, status: 'Operational', lastMaint: '2026-09-15', nextMaint: '2026-11-20', serial: 'PNT-C-7731' },
];

const initialWorkOrders = [
  { id: 'WO-8091', title: 'Replace Hydraulic Oil Filter & Seals', machine: 'Hydraulic Stamping Press 500T', priority: 'High', status: 'In Progress', technician: 'Rahim Ahmed', dueDate: '2026-10-31', costUSD: 450 },
  { id: 'WO-8092', title: 'Emergency Motor Re-winding & Calibration', machine: 'Automated Robotic Arm Welder X2', priority: 'High', status: 'Pending', technician: 'Tareq Mansoor', dueDate: '2026-10-30', costUSD: 2400 },
  { id: 'WO-8093', title: 'Quarterly Sensor & PLC Logic Audit', machine: 'CNC High-Speed Milling Machine V3', priority: 'Medium', status: 'Completed', technician: 'Alex Schmidt', dueDate: '2026-10-25', costUSD: 180 },
  { id: 'WO-8094', title: 'Compressor Valve & Belt Replacement', machine: 'Industrial Rotary Compressor 75kW', priority: 'Low', status: 'Quality Inspection', technician: 'Karim Ullah', dueDate: '2026-11-04', costUSD: 320 },
];

const initialParts = [
  { id: 'SKU-001', name: 'Heavy Duty Bearings 6205-2RS', stock: 14, min: 20, unitCostUSD: 28, location: 'Bin A-14', status: 'Reorder' },
  { id: 'SKU-002', name: 'Synthetic Hydraulic Oil ISO VG 46 (200L)', stock: 8, min: 4, unitCostUSD: 520, location: 'Oil Store', status: 'Adequate' },
  { id: 'SKU-003', name: 'Proximity Sensor Inductive 24V DC', stock: 45, min: 15, unitCostUSD: 65, location: 'Bin E-03', status: 'Adequate' },
  { id: 'SKU-004', name: 'High Temp Silicone Gasket Set', stock: 3, min: 10, unitCostUSD: 110, location: 'Bin B-09', status: 'Reorder' },
  { id: 'SKU-005', name: 'Industrial Servo Drive Controller 15kW', stock: 2, min: 2, unitCostUSD: 1850, location: 'Secure Vault', status: 'Adequate' },
];

const initialTenants = [
  { id: 'TNT-001', name: 'Apex Textiles Ltd.', city: 'Dhaka, Bangladesh', tier: 'Enterprise Plan', mrrUSD: 4800, users: 142, status: 'Active', region: 'ap-south-1 (Mumbai)' },
  { id: 'TNT-002', name: 'Gulf Steel Works', city: 'Riyadh, Saudi Arabia', tier: 'Enterprise Plan', mrrUSD: 7200, users: 215, status: 'Active', region: 'me-central-1 (Riyadh)' },
  { id: 'TNT-003', name: 'EuroAuto Motors GmbH', city: 'Munich, Germany', tier: 'Pro Scale', mrrUSD: 3200, users: 88, status: 'Active', region: 'eu-central-1 (Frankfurt)' },
  { id: 'TNT-004', name: 'Pacific Precision Electronics', city: 'Penang, Malaysia', tier: 'Growth', mrrUSD: 1500, users: 34, status: 'Active', region: 'ap-southeast-1 (SG)' },
];

export default function App() {
  // Localization & Currency State
  const [lang, setLang] = useState('en');
  const [currency, setCurrency] = useState('USD');
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  // Context Switching State
  const [tenantContext, setTenantContext] = useState('apexTex'); // apexTex, gulfSteel, euroAuto, superAdmin
  
  // Domain Data State
  const [assets, setAssets] = useState(initialAssets);
  const [workOrders, setWorkOrders] = useState(initialWorkOrders);
  const [parts, setParts] = useState(initialParts);
  const [searchTerm, setSearchTerm] = useState('');
  
  // UI Modal Controls
  const [isNewWOModalOpen, setIsNewWOModalOpen] = useState(false);
  const [isNewAssetModalOpen, setIsNewAssetModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quick New WO Form State
  const [newWO, setNewWO] = useState({ title: '', machine: initialAssets[0].name, priority: 'Medium', technician: '', costUSD: 150 });
  const [newAsset, setNewAsset] = useState({ name: '', category: 'Machining', location: 'Line A', serial: '' });

  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar';

  // Apply Direction attribute on document base
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Currency Converter helper
  const formatCost = (usdValue) => {
    const curr = currencies[currency] || currencies.USD;
    const converted = usdValue * curr.rate;
    return `${curr.symbol} ${converted.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  // Handler for adding WO
  const handleCreateWO = (e) => {
    e.preventDefault();
    if (!newWO.title) return;
    const created = {
      id: `WO-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newWO.title,
      machine: newWO.machine,
      priority: newWO.priority,
      status: 'Pending',
      technician: newWO.technician || 'Unassigned',
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      costUSD: Number(newWO.costUSD) || 100
    };
    setWorkOrders([created, ...workOrders]);
    setIsNewWOModalOpen(false);
    setNewWO({ title: '', machine: initialAssets[0].name, priority: 'Medium', technician: '', costUSD: 150 });
  };

  // Handler for adding Asset
  const handleCreateAsset = (e) => {
    e.preventDefault();
    if (!newAsset.name) return;
    const created = {
      id: `MC-${Math.floor(200 + Math.random() * 800)}`,
      name: newAsset.name,
      category: newAsset.category,
      location: newAsset.location,
      health: 100,
      status: 'Operational',
      lastMaint: new Date().toISOString().split('T')[0],
      nextMaint: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0],
      serial: newAsset.serial || `SER-${Math.floor(10000 + Math.random() * 90000)}`
    };
    setAssets([created, ...assets]);
    setIsNewAssetModalOpen(false);
    setNewAsset({ name: '', category: 'Machining', location: 'Line A', serial: '' });
  };

  // Status Colors helper
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Operational':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5" /> {t.assets.statusOperational}</span>;
      case 'Warning':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20"><AlertTriangle className="w-3.5 h-3.5" /> {t.assets.statusWarning}</span>;
      case 'Critical Down':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse"><XCircle className="w-3.5 h-3.5" /> {t.assets.statusCritical}</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20"><Wrench className="w-3.5 h-3.5" /> {t.assets.statusMaintenance}</span>;
    }
  };

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* GLOBAL TOP NAVIGATION & SaaS BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800 px-4 lg:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Logo & SaaS Name */}
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Cpu className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white">{t.appName}</span>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">v3.4 Global</span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          {/* Context Switchers: Tenant, Language, Currency */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Factory Context / Super Admin Selector */}
            <div className="relative">
              <select 
                value={tenantContext} 
                onChange={(e) => {
                  setTenantContext(e.target.value);
                  if (e.target.value === 'superAdmin') setCurrentTab('superAdmin');
                  else if (currentTab === 'superAdmin') setCurrentTab('dashboard');
                }}
                className="bg-slate-800 text-xs sm:text-sm text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="apexTex">🏭 {t.tenant.apexTex}</option>
                <option value="gulfSteel">🏭 {t.tenant.gulfSteel}</option>
                <option value="euroAuto">🏭 {t.tenant.euroAuto}</option>
                <option value="superAdmin">⚡ {t.tenant.superAdminView}</option>
              </select>
            </div>

            {/* Currency Switcher */}
            <div className="relative hidden md:block">
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-slate-800 text-xs text-amber-400 border border-slate-700 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-semibold"
              >
                {Object.keys(currencies).map((curr) => (
                  <option key={curr} value={curr}>{currencies[curr].name}</option>
                ))}
              </select>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <select 
                value={lang} 
                onChange={(e) => setLang(e.target.value)}
                className="bg-slate-800 text-xs sm:text-sm text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="en">English (EN)</option>
                <option value="bn">বাংলা (BN)</option>
                <option value="ar">العربية (AR)</option>
              </select>
            </div>

            {/* Notifications & User Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <button className="p-2 text-slate-400 hover:text-slate-200 relative bg-slate-800/50 rounded-lg">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              </button>
              <div className="w-8 h-8 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center font-bold text-amber-400 text-xs">
                {tenantContext === 'superAdmin' ? 'HQ' : 'ENG'}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* MAIN LAYOUT WRAPPER */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-6 p-4 lg:p-6">

        {/* NAVIGATION SIDEBAR */}
        <aside className={`lg:w-64 flex-shrink-0 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-2 ${mobileMenuOpen ? 'block' : 'hidden lg:flex'}`}>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-1">
            {tenantContext === 'superAdmin' ? 'HQ Platform Governance' : 'Factory Operations'}
          </div>

          {tenantContext !== 'superAdmin' ? (
            <>
              <button 
                onClick={() => setCurrentTab('dashboard')} 
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${currentTab === 'dashboard' ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <LayoutDashboard className="w-4 h-4" /> {t.nav.dashboard}
              </button>
              <button 
                onClick={() => setCurrentTab('assets')} 
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${currentTab === 'assets' ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <Building2 className="w-4 h-4" /> {t.nav.assets}
              </button>
              <button 
                onClick={() => setCurrentTab('workOrders')} 
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${currentTab === 'workOrders' ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <Wrench className="w-4 h-4" /> {t.nav.workOrders}
                <span className="ml-auto bg-slate-800 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-slate-700">{workOrders.length}</span>
              </button>
              <button 
                onClick={() => setCurrentTab('parts')} 
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${currentTab === 'parts' ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                <Package className="w-4 h-4" /> {t.nav.parts}
              </button>
            </>
          ) : null}

          <button 
            onClick={() => setCurrentTab('superAdmin')} 
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${currentTab === 'superAdmin' ? 'bg-amber-500 text-slate-950 shadow-md font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" /> {t.nav.superAdmin}
            <span className="ml-auto text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded uppercase">SaaS HQ</span>
          </button>

          <div className="mt-auto pt-4 border-t border-slate-800 flex flex-col gap-2">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400 flex justify-between">
                <span>Primary DB Node:</span>
                <span className="text-emerald-400 font-mono">Synced</span>
              </div>
              <div className="text-slate-400 flex justify-between">
                <span>Active Currency:</span>
                <span className="text-amber-400 font-semibold">{currency}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY CONTENT AREA */}
        <main className="flex-1 min-w-0 flex flex-col gap-6">

          {/* TAB 1: OPERATIONAL DASHBOARD */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Top Banner KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-400">{t.kpi.totalAssets}</p>
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-xl"><Building2 className="w-5 h-5" /></div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{assets.length}</span>
                    <span className="text-xs text-emerald-400 font-medium">+2 this quarter</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-400">{t.kpi.operational}</p>
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl"><Activity className="w-5 h-5" /></div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">92.4%</span>
                    <span className="text-xs text-emerald-400 font-medium">↑ 1.2% Target</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-400">{t.kpi.activeWorkOrders}</p>
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl"><Wrench className="w-5 h-5" /></div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-white">{workOrders.filter(w => w.status !== 'Completed').length}</span>
                    <span className="text-xs text-amber-400 font-medium">2 Critical</span>
                  </div>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-400">{t.kpi.monthlyMaintenance}</p>
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-xl"><DollarSign className="w-5 h-5" /></div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-white">{formatCost(3350)}</span>
                    <span className="text-xs text-slate-400 font-medium">vs {formatCost(4000)} budget</span>
                  </div>
                </div>

              </div>

              {/* Real-time Asset Health Grid Preview */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-white">{t.assets.title}</h3>
                    <p className="text-xs text-slate-400">{t.assets.subtitle}</p>
                  </div>
                  <button 
                    onClick={() => setIsNewAssetModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-md"
                  >
                    <Plus className="w-4 h-4" /> {t.assets.addAsset}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {assets.slice(0, 4).map((asset) => (
                    <div key={asset.id} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-400">{asset.id}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">{asset.serial}</span>
                          </div>
                          <h4 className="font-semibold text-white mt-1 text-sm">{asset.name}</h4>
                          <p className="text-xs text-slate-400 mt-0.5">{asset.location}</p>
                        </div>
                        {getStatusBadge(asset.status)}
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-slate-400">Health:</span>
                          <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${asset.health > 80 ? 'bg-emerald-500' : asset.health > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                              style={{ width: `${asset.health}%` }} 
                            />
                          </div>
                          <span className="font-semibold text-slate-200">{asset.health}%</span>
                        </div>
                        <span className="text-slate-400">Next: <strong className="text-slate-200">{asset.nextMaint}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Maintenance Work Orders Preview */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">{t.workOrders.title}</h3>
                  <button 
                    onClick={() => setIsNewWOModalOpen(true)} 
                    className="text-xs text-amber-400 hover:underline font-medium"
                  >
                    + {t.workOrders.newOrder}
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider">
                      <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Job Title</th>
                        <th className="p-3">Target Machine</th>
                        <th className="p-3">Technician</th>
                        <th className="p-3">Cost Est.</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {workOrders.map((wo) => (
                        <tr key={wo.id} className="hover:bg-slate-800/40">
                          <td className="p-3 font-mono text-amber-400 font-semibold">{wo.id}</td>
                          <td className="p-3 font-medium text-white">{wo.title}</td>
                          <td className="p-3 text-slate-400">{wo.machine}</td>
                          <td className="p-3 text-slate-300">{wo.technician}</td>
                          <td className="p-3 font-semibold text-emerald-400">{formatCost(wo.costUSD)}</td>
                          <td className="p-3">
                            <span className="px-2 py-1 rounded-md text-[11px] bg-slate-800 text-slate-200 border border-slate-700">
                              {wo.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: MACHINE REGISTER */}
          {currentTab === 'assets' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white">{t.assets.title}</h2>
                  <p className="text-xs text-slate-400">{t.assets.subtitle}</p>
                </div>
                <button 
                  onClick={() => setIsNewAssetModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto shadow-md"
                >
                  <Plus className="w-4 h-4" /> {t.assets.addAsset}
                </button>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder={t.assets.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Assets Table */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-4">Machine ID</th>
                        <th className="p-4">Name / Category</th>
                        <th className="p-4">{t.assets.serial}</th>
                        <th className="p-4">{t.assets.location}</th>
                        <th className="p-4">{t.assets.health}</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">{t.assets.actions}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {assets
                        .filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.id.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((asset) => (
                        <tr key={asset.id} className="hover:bg-slate-800/40">
                          <td className="p-4 font-mono text-amber-400 font-semibold">{asset.id}</td>
                          <td className="p-4">
                            <div className="font-semibold text-white">{asset.name}</div>
                            <div className="text-[11px] text-slate-500">{asset.category}</div>
                          </td>
                          <td className="p-4 font-mono text-slate-400">{asset.serial}</td>
                          <td className="p-4 text-slate-300">{asset.location}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-slate-800 rounded-full h-1.5">
                                <div 
                                  className={`h-full rounded-full ${asset.health > 80 ? 'bg-emerald-500' : asset.health > 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                                  style={{ width: `${asset.health}%` }} 
                                />
                              </div>
                              <span className="font-mono">{asset.health}%</span>
                            </div>
                          </td>
                          <td className="p-4">{getStatusBadge(asset.status)}</td>
                          <td className="p-4 text-right">
                            <button className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WORK ORDERS (KANBAN & LIST) */}
          {currentTab === 'workOrders' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white">{t.workOrders.title}</h2>
                  <p className="text-xs text-slate-400">{t.workOrders.subtitle}</p>
                </div>
                <button 
                  onClick={() => setIsNewWOModalOpen(true)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" /> {t.workOrders.newOrder}
                </button>
              </div>

              {/* KANBAN BOARD VIEW */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* COLUMN 1: TO DO / PENDING */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs uppercase text-amber-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> {t.workOrders.todo}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                      {workOrders.filter(w => w.status === 'Pending').length}
                    </span>
                  </div>

                  {workOrders.filter(w => w.status === 'Pending').map(wo => (
                    <div key={wo.id} className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-amber-400 text-xs font-semibold">{wo.id}</span>
                        <span className="px-2 py-0.5 text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded font-semibold">
                          {wo.priority}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-xs">{wo.title}</h4>
                      <p className="text-[11px] text-slate-400">{wo.machine}</p>
                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Tech: {wo.technician}</span>
                        <span className="font-mono text-emerald-400 font-semibold">{formatCost(wo.costUSD)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* COLUMN 2: IN PROGRESS */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs uppercase text-sky-400 flex items-center gap-2">
                      <Wrench className="w-4 h-4" /> {t.workOrders.inProgress}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                      {workOrders.filter(w => w.status === 'In Progress').length}
                    </span>
                  </div>

                  {workOrders.filter(w => w.status === 'In Progress').map(wo => (
                    <div key={wo.id} className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-amber-400 text-xs font-semibold">{wo.id}</span>
                        <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-semibold">
                          {wo.priority}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-xs">{wo.title}</h4>
                      <p className="text-[11px] text-slate-400">{wo.machine}</p>
                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Tech: {wo.technician}</span>
                        <span className="font-mono text-emerald-400 font-semibold">{formatCost(wo.costUSD)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* COLUMN 3: COMPLETED */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="font-bold text-xs uppercase text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> {t.workOrders.completed}
                    </span>
                    <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                      {workOrders.filter(w => w.status === 'Completed' || w.status === 'Quality Inspection').length}
                    </span>
                  </div>

                  {workOrders.filter(w => w.status === 'Completed' || w.status === 'Quality Inspection').map(wo => (
                    <div key={wo.id} className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-amber-400 text-xs font-semibold">{wo.id}</span>
                        <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded font-semibold">
                          {wo.status}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white text-xs">{wo.title}</h4>
                      <p className="text-[11px] text-slate-400">{wo.machine}</p>
                      <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400">
                        <span>Tech: {wo.technician}</span>
                        <span className="font-mono text-emerald-400 font-semibold">{formatCost(wo.costUSD)}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: SPARE PARTS INVENTORY */}
          {currentTab === 'parts' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold text-white">{t.parts.title}</h2>
                  <p className="text-xs text-slate-400">{t.parts.subtitle}</p>
                </div>
                <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md">
                  <Plus className="w-4 h-4" /> {t.parts.addPart}
                </button>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-4">SKU / ID</th>
                        <th className="p-4">{t.parts.partName}</th>
                        <th className="p-4">{t.parts.stock}</th>
                        <th className="p-4">{t.parts.minLevel}</th>
                        <th className="p-4">{t.parts.unitCost}</th>
                        <th className="p-4">{t.parts.location}</th>
                        <th className="p-4">{t.parts.status}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {parts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/40">
                          <td className="p-4 font-mono text-amber-400 font-semibold">{p.id}</td>
                          <td className="p-4 font-semibold text-white">{p.name}</td>
                          <td className="p-4 font-mono text-base font-bold text-slate-100">{p.stock}</td>
                          <td className="p-4 font-mono text-slate-400">{p.min}</td>
                          <td className="p-4 font-mono text-emerald-400 font-semibold">{formatCost(p.unitCostUSD)}</td>
                          <td className="p-4 text-slate-300">{p.location}</td>
                          <td className="p-4">
                            {p.stock <= p.min ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                {t.parts.reorder}
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                {t.parts.adequate}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: SUPER ADMIN SAAS GLOBAL VIEW */}
          {currentTab === 'superAdmin' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Super Admin Console</span>
                    <h2 className="text-2xl font-bold text-white mt-1">{t.admin.title}</h2>
                    <p className="text-xs text-slate-400 mt-1">{t.admin.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                      <Server className="w-4 h-4" /> 100% Multitenant Cluster Online
                    </span>
                  </div>
                </div>
              </div>

              {/* Platform Revenue & Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs text-slate-400">{t.admin.totalTenants}</p>
                  <p className="text-3xl font-bold text-white mt-2">{initialTenants.length}</p>
                  <p className="text-xs text-emerald-400 mt-1">Global enterprise clients</p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs text-slate-400">{t.admin.mrr}</p>
                  <p className="text-3xl font-bold text-amber-400 mt-2">{formatCost(16700)}</p>
                  <p className="text-xs text-emerald-400 mt-1">+18.4% YoY growth</p>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <p className="text-xs text-slate-400">{t.admin.deploymentRegions}</p>
                  <p className="text-3xl font-bold text-blue-400 mt-2">4 Active</p>
                  <p className="text-xs text-slate-400 mt-1">AWS / GCP Multi-region</p>
                </div>
              </div>

              {/* Global Tenant Directory */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                <h3 className="text-base font-bold text-white mb-4">{t.admin.tenantDirectory}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                      <tr>
                        <th className="p-3">Tenant ID</th>
                        <th className="p-3">Organization Name</th>
                        <th className="p-3">{t.admin.plan}</th>
                        <th className="p-3">{t.admin.region}</th>
                        <th className="p-3">{t.admin.users}</th>
                        <th className="p-3">{t.admin.mrrContribution}</th>
                        <th className="p-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {initialTenants.map((tenant) => (
                        <tr key={tenant.id} className="hover:bg-slate-800/40">
                          <td className="p-3 font-mono text-amber-400 font-semibold">{tenant.id}</td>
                          <td className="p-3">
                            <div className="font-bold text-white">{tenant.name}</div>
                            <div className="text-[11px] text-slate-500">{tenant.city}</div>
                          </td>
                          <td className="p-3 font-medium text-slate-200">{tenant.tier}</td>
                          <td className="p-3 text-slate-400 font-mono">{tenant.region}</td>
                          <td className="p-3 font-semibold">{tenant.users}</td>
                          <td className="p-3 font-bold text-emerald-400">{formatCost(tenant.mrrUSD)}</td>
                          <td className="p-3">
                            <button 
                              onClick={() => {
                                setTenantContext(tenant.id === 'TNT-001' ? 'apexTex' : tenant.id === 'TNT-002' ? 'gulfSteel' : 'euroAuto');
                                setCurrentTab('dashboard');
                              }}
                              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30 text-[11px] font-semibold transition-all"
                            >
                              Impersonate Tenant
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* CREATE WORK ORDER MODAL */}
      {isNewWOModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{t.workOrders.newOrder}</h3>
              <button onClick={() => setIsNewWOModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateWO} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Work Order Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Hydraulic Pump Calibration"
                  value={newWO.title}
                  onChange={e => setNewWO({ ...newWO, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Target Machine</label>
                <select 
                  value={newWO.machine}
                  onChange={e => setNewWO({ ...newWO, machine: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {assets.map(a => <option key={a.id} value={a.name}>{a.id} - {a.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Priority</label>
                  <select 
                    value={newWO.priority}
                    onChange={e => setNewWO({ ...newWO, priority: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Est. Cost (USD)</label>
                  <input 
                    type="number" 
                    value={newWO.costUSD}
                    onChange={e => setNewWO({ ...newWO, costUSD: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Assigned Technician</label>
                <input 
                  type="text" 
                  placeholder="Technician name"
                  value={newWO.technician}
                  onChange={e => setNewWO({ ...newWO, technician: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsNewWOModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 font-medium"
                >
                  {t.common.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 shadow-md"
                >
                  Dispatch Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE ASSET MODAL */}
      {isNewAssetModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">{t.assets.addAsset}</h3>
              <button onClick={() => setIsNewAssetModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Machine / Asset Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. High Precision Laser Cutter"
                  value={newAsset.name}
                  onChange={e => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Category</label>
                  <select 
                    value={newAsset.category}
                    onChange={e => setNewAsset({ ...newAsset, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Machining">Machining</option>
                    <option value="Pressing">Pressing</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Utilities">Utilities</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Factory Location Line</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Line C - Bay 4"
                    value={newAsset.location}
                    onChange={e => setNewAsset({ ...newAsset, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Serial Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. LZR-2026-99"
                  value={newAsset.serial}
                  onChange={e => setNewAsset({ ...newAsset, serial: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsNewAssetModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 font-medium"
                >
                  {t.common.cancel}
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold hover:bg-amber-400 shadow-md"
                >
                  Register Machine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>GearPulse Enterprise Maintenance Cloud v3.4</span>
        </div>
        <div>
          <span>Multi-tenant SaaS Architecture Architecture Demo</span>
        </div>
      </footer>

    </div>
  );
}