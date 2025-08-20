// Internationalization (i18n) configuration
export const languages = {
  en: { name: 'English', flag: '🇺🇸', dir: 'ltr' },
  bn: { name: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  es: { name: 'Español', flag: '🇪🇸', dir: 'ltr' },
  ar: { name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
};

// Translation keys
export const translations = {
  en: {
    // Navigation
    home: 'Home',
    movie: 'Movie',
    theatres: 'Theatres',
    releases: 'Releases',
    favourites: 'Favourites',
    login: 'LOGIN',
    search: 'Search Movies',
    searchPlaceholder: 'Search by movie title, genre, or cast...',
    
    // Movie Details
    watchTrailer: 'Watch Trailer',
    buyTicket: 'Buy Ticket',
    yourFavouriteCasts: 'Your Favourite Casts',
    youMayAlsoLike: 'You May Also Like',
    userRating: 'User Rating',
    runtime: 'Runtime',
    releaseYear: 'Release Year',
    
    // Seat Selection
    selectSeats: 'Select Seats',
    availableTimings: 'Available Timings',
    selectYourPreferredSeats: 'Select your preferred seats below:',
    pleaseSelectTime: 'Please select a time first',
    maxSeatsReached: 'You can only select up to 4 seats',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Checkout
    checkout: 'Checkout',
    backToSeats: 'Back to Seats',
    orderSummary: 'Order Summary',
    selectedSeats: 'Selected Seats',
    payment: 'Payment',
    securePaymentProcessing: 'Secure payment processing',
    cardNumber: 'Card Number',
    cardholderName: 'Cardholder Name',
    pay: 'Pay',
    processing: 'Processing...',
    termsAndConditions: 'By proceeding, you agree to our terms and conditions',
    
    // Promo Code
    promoCode: 'Promo Code',
    enterPromoCode: 'Enter promo code',
    apply: 'Apply',
    applying: 'Applying...',
    availableCodes: 'Available codes:',
    applied: 'Applied',
    discount: 'Discount',
    original: 'Original',
    final: 'Final',
    promoCodeApplied: 'Promo code applied! Saved',
    promoCodeRemoved: 'Promo code removed',
    invalidPromoCode: 'Invalid promo code',
    minimumPurchaseRequired: 'Minimum purchase amount of',
    required: 'required',
    
    // Bookings
    myBookings: 'My Bookings',
    totalTickets: 'Total Tickets',
    seatNumber: 'Seat Number',
    payNow: 'Pay Now',
    
    // Admin
    adminPanel: 'Admin Panel',
    dashboard: 'Dashboard',
    listBookings: 'List Bookings',
    listShows: 'List Shows',
    addShow: 'Add Show',
    welcomeToAdmin: 'Welcome to the admin dashboard! Here you can manage shows, bookings, and more.',
    thisPageWillShow: 'This page will show all',
    thisPageWillAllow: 'This page will allow you to add a new show.',
    
    // Common
    loading: 'Loading...',
    noMoviesFound: 'No movies found for',
    trySearchingBy: 'Try searching by title, genre, or cast member',
    noResults: 'No Results',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    confirm: 'Confirm',
    close: 'Close',
    
    // Time formats
    hours: 'h',
    minutes: 'm',
    
    // Currency
    currency: '$',
    
    // Language selector
    selectLanguage: 'Select Language',
    language: 'Language'
  },
  
  bn: {
    // Navigation
    home: 'হোম',
    movie: 'সিনেমা',
    theatres: 'থিয়েটার',
    releases: 'রিলিজ',
    favourites: 'প্রিয়',
    login: 'লগইন',
    search: 'সিনেমা খুঁজুন',
    searchPlaceholder: 'সিনেমার নাম, ধরন বা অভিনেতা দিয়ে খুঁজুন...',
    
    // Movie Details
    watchTrailer: 'ট্রেইলার দেখুন',
    buyTicket: 'টিকিট কিনুন',
    yourFavouriteCasts: 'আপনার প্রিয় অভিনেতারা',
    youMayAlsoLike: 'আপনার পছন্দ হতে পারে',
    userRating: 'ব্যবহারকারী রেটিং',
    runtime: 'সময়কাল',
    releaseYear: 'মুক্তির বছর',
    
    // Seat Selection
    selectSeats: 'সিট নির্বাচন করুন',
    availableTimings: 'উপলব্ধ সময়',
    selectYourPreferredSeats: 'নিচে আপনার পছন্দের সিট নির্বাচন করুন:',
    pleaseSelectTime: 'অনুগ্রহ করে প্রথমে সময় নির্বাচন করুন',
    maxSeatsReached: 'আপনি সর্বোচ্চ ৪টি সিট নির্বাচন করতে পারবেন',
    proceedToCheckout: 'চেকআউটে যান',
    
    // Checkout
    checkout: 'চেকআউট',
    backToSeats: 'সিটে ফিরে যান',
    orderSummary: 'অর্ডার সারসংক্ষেপ',
    selectedSeats: 'নির্বাচিত সিট',
    payment: 'পেমেন্ট',
    securePaymentProcessing: 'নিরাপদ পেমেন্ট প্রক্রিয়াকরণ',
    cardNumber: 'কার্ড নম্বর',
    cardholderName: 'কার্ডধারীর নাম',
    pay: 'পেমেন্ট করুন',
    processing: 'প্রক্রিয়াকরণ হচ্ছে...',
    termsAndConditions: 'অগ্রসর হয়ে আপনি আমাদের শর্তাবলী মেনে নিচ্ছেন',
    
    // Promo Code
    promoCode: 'প্রোমো কোড',
    enterPromoCode: 'প্রোমো কোড লিখুন',
    apply: 'প্রয়োগ করুন',
    applying: 'প্রয়োগ হচ্ছে...',
    availableCodes: 'উপলব্ধ কোড:',
    applied: 'প্রয়োগ করা হয়েছে',
    discount: 'ছাড়',
    original: 'মূল',
    final: 'চূড়ান্ত',
    promoCodeApplied: 'প্রোমো কোড প্রয়োগ করা হয়েছে! সঞ্চয়',
    promoCodeRemoved: 'প্রোমো কোড সরানো হয়েছে',
    invalidPromoCode: 'অবৈধ প্রোমো কোড',
    minimumPurchaseRequired: 'ন্যূনতম ক্রয়ের পরিমাণ',
    required: 'প্রয়োজন',
    
    // Bookings
    myBookings: 'আমার বুকিং',
    totalTickets: 'মোট টিকিট',
    seatNumber: 'সিট নম্বর',
    payNow: 'এখন পেমেন্ট করুন',
    
    // Admin
    adminPanel: 'অ্যাডমিন প্যানেল',
    dashboard: 'ড্যাশবোর্ড',
    listBookings: 'বুকিং তালিকা',
    listShows: 'শো তালিকা',
    addShow: 'শো যোগ করুন',
    welcomeToAdmin: 'অ্যাডমিন ড্যাশবোর্ডে স্বাগতম! এখানে আপনি শো, বুকিং এবং আরও অনেক কিছু পরিচালনা করতে পারবেন।',
    thisPageWillShow: 'এই পৃষ্ঠায় সব দেখানো হবে',
    thisPageWillAllow: 'এই পৃষ্ঠায় আপনি নতুন শো যোগ করতে পারবেন।',
    
    // Common
    loading: 'লোড হচ্ছে...',
    noMoviesFound: 'কোন সিনেমা পাওয়া যায়নি',
    trySearchingBy: 'নাম, ধরন বা অভিনেতা দিয়ে খুঁজার চেষ্টা করুন',
    noResults: 'কোন ফলাফল নেই',
    error: 'ত্রুটি',
    success: 'সফল',
    cancel: 'বাতিল',
    save: 'সংরক্ষণ',
    delete: 'মুছুন',
    edit: 'সম্পাদনা',
    add: 'যোগ করুন',
    remove: 'সরান',
    confirm: 'নিশ্চিত করুন',
    close: 'বন্ধ করুন',
    
    // Time formats
    hours: 'ঘ',
    minutes: 'মি',
    
    // Currency
    currency: '৳',
    
    // Language selector
    selectLanguage: 'ভাষা নির্বাচন করুন',
    language: 'ভাষা'
  },
  
  es: {
    // Navigation
    home: 'Inicio',
    movie: 'Película',
    theatres: 'Teatros',
    releases: 'Estrenos',
    favourites: 'Favoritos',
    login: 'INICIAR SESIÓN',
    search: 'Buscar Películas',
    searchPlaceholder: 'Buscar por título, género o reparto...',
    
    // Movie Details
    watchTrailer: 'Ver Tráiler',
    buyTicket: 'Comprar Entrada',
    yourFavouriteCasts: 'Tu Reparto Favorito',
    youMayAlsoLike: 'También Te Puede Gustar',
    userRating: 'Calificación de Usuarios',
    runtime: 'Duración',
    releaseYear: 'Año de Lanzamiento',
    
    // Seat Selection
    selectSeats: 'Seleccionar Asientos',
    availableTimings: 'Horarios Disponibles',
    selectYourPreferredSeats: 'Selecciona tus asientos preferidos abajo:',
    pleaseSelectTime: 'Por favor selecciona una hora primero',
    maxSeatsReached: 'Solo puedes seleccionar hasta 4 asientos',
    proceedToCheckout: 'Proceder al Pago',
    
    // Checkout
    checkout: 'Pago',
    backToSeats: 'Volver a Asientos',
    orderSummary: 'Resumen del Pedido',
    selectedSeats: 'Asientos Seleccionados',
    payment: 'Pago',
    securePaymentProcessing: 'Procesamiento de pago seguro',
    cardNumber: 'Número de Tarjeta',
    cardholderName: 'Nombre del Titular',
    pay: 'Pagar',
    processing: 'Procesando...',
    termsAndConditions: 'Al proceder, aceptas nuestros términos y condiciones',
    
    // Promo Code
    promoCode: 'Código Promocional',
    enterPromoCode: 'Ingresa código promocional',
    apply: 'Aplicar',
    applying: 'Aplicando...',
    availableCodes: 'Códigos disponibles:',
    applied: 'Aplicado',
    discount: 'Descuento',
    original: 'Original',
    final: 'Final',
    promoCodeApplied: '¡Código promocional aplicado! Ahorraste',
    promoCodeRemoved: 'Código promocional removido',
    invalidPromoCode: 'Código promocional inválido',
    minimumPurchaseRequired: 'Monto mínimo de compra de',
    required: 'requerido',
    
    // Bookings
    myBookings: 'Mis Reservas',
    totalTickets: 'Total de Entradas',
    seatNumber: 'Número de Asiento',
    payNow: 'Pagar Ahora',
    
    // Admin
    adminPanel: 'Panel de Administración',
    dashboard: 'Panel de Control',
    listBookings: 'Listar Reservas',
    listShows: 'Listar Funciones',
    addShow: 'Agregar Función',
    welcomeToAdmin: '¡Bienvenido al panel de administración! Aquí puedes gestionar funciones, reservas y más.',
    thisPageWillShow: 'Esta página mostrará todos los',
    thisPageWillAllow: 'Esta página te permitirá agregar una nueva función.',
    
    // Common
    loading: 'Cargando...',
    noMoviesFound: 'No se encontraron películas para',
    trySearchingBy: 'Intenta buscar por título, género o miembro del reparto',
    noResults: 'Sin Resultados',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    add: 'Agregar',
    remove: 'Remover',
    confirm: 'Confirmar',
    close: 'Cerrar',
    
    // Time formats
    hours: 'h',
    minutes: 'm',
    
    // Currency
    currency: '€',
    
    // Language selector
    selectLanguage: 'Seleccionar Idioma',
    language: 'Idioma'
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    movie: 'فيلم',
    theatres: 'مسارح',
    releases: 'إصدارات',
    favourites: 'المفضلة',
    login: 'تسجيل الدخول',
    search: 'البحث عن الأفلام',
    searchPlaceholder: 'البحث بالعنوان أو النوع أو الممثلين...',
    
    // Movie Details
    watchTrailer: 'مشاهدة الإعلان',
    buyTicket: 'شراء تذكرة',
    yourFavouriteCasts: 'ممثلوك المفضلون',
    youMayAlsoLike: 'قد يعجبك أيضاً',
    userRating: 'تقييم المستخدمين',
    runtime: 'المدة',
    releaseYear: 'سنة الإصدار',
    
    // Seat Selection
    selectSeats: 'اختيار المقاعد',
    availableTimings: 'الأوقات المتاحة',
    selectYourPreferredSeats: 'اختر مقاعدك المفضلة أدناه:',
    pleaseSelectTime: 'يرجى اختيار الوقت أولاً',
    maxSeatsReached: 'يمكنك اختيار 4 مقاعد كحد أقصى',
    proceedToCheckout: 'المتابعة للدفع',
    
    // Checkout
    checkout: 'الدفع',
    backToSeats: 'العودة للمقاعد',
    orderSummary: 'ملخص الطلب',
    selectedSeats: 'المقاعد المختارة',
    payment: 'الدفع',
    securePaymentProcessing: 'معالجة الدفع الآمنة',
    cardNumber: 'رقم البطاقة',
    cardholderName: 'اسم حامل البطاقة',
    pay: 'ادفع',
    processing: 'جاري المعالجة...',
    termsAndConditions: 'بالمتابعة، أنت توافق على شروطنا وأحكامنا',
    
    // Promo Code
    promoCode: 'رمز الخصم',
    enterPromoCode: 'أدخل رمز الخصم',
    apply: 'تطبيق',
    applying: 'جاري التطبيق...',
    availableCodes: 'الرموز المتاحة:',
    applied: 'تم التطبيق',
    discount: 'الخصم',
    original: 'الأصلي',
    final: 'النهائي',
    promoCodeApplied: 'تم تطبيق رمز الخصم! وفرت',
    promoCodeRemoved: 'تم إزالة رمز الخصم',
    invalidPromoCode: 'رمز خصم غير صحيح',
    minimumPurchaseRequired: 'الحد الأدنى للمشتريات',
    required: 'مطلوب',
    
    // Bookings
    myBookings: 'حجوزاتي',
    totalTickets: 'إجمالي التذاكر',
    seatNumber: 'رقم المقعد',
    payNow: 'ادفع الآن',
    
    // Admin
    adminPanel: 'لوحة الإدارة',
    dashboard: 'لوحة التحكم',
    listBookings: 'قائمة الحجوزات',
    listShows: 'قائمة العروض',
    addShow: 'إضافة عرض',
    welcomeToAdmin: 'مرحباً بك في لوحة الإدارة! هنا يمكنك إدارة العروض والحجوزات والمزيد.',
    thisPageWillShow: 'ستعرض هذه الصفحة جميع',
    thisPageWillAllow: 'ستسمح لك هذه الصفحة بإضافة عرض جديد.',
    
    // Common
    loading: 'جاري التحميل...',
    noMoviesFound: 'لم يتم العثور على أفلام لـ',
    trySearchingBy: 'حاول البحث بالعنوان أو النوع أو الممثل',
    noResults: 'لا توجد نتائج',
    error: 'خطأ',
    success: 'نجح',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    remove: 'إزالة',
    confirm: 'تأكيد',
    close: 'إغلاق',
    
    // Time formats
    hours: 'س',
    minutes: 'د',
    
    // Currency
    currency: 'ر.س',
    
    // Language selector
    selectLanguage: 'اختر اللغة',
    language: 'اللغة'
  }
};

// Get current language from localStorage or default to English
export const getCurrentLanguage = () => {
  return localStorage.getItem('language') || 'en';
};

// Set language in localStorage
export const setLanguage = (lang) => {
  localStorage.setItem('language', lang);
  // Update document direction for RTL languages
  document.documentElement.dir = languages[lang].dir;
  document.documentElement.lang = lang;
};

// Get translation for current language
export const t = (key) => {
  const currentLang = getCurrentLanguage();
  return translations[currentLang][key] || translations.en[key] || key;
};

// Initialize language on app start
export const initializeLanguage = () => {
  const currentLang = getCurrentLanguage();
  setLanguage(currentLang);
};


