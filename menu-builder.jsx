/* Menu data + helpers — تُستهلك داخل رحلة الحجز (booking.jsx) */

const MENU_CATS = [
  {
    t: 'المقبلات', en: 'Starters', key: 'starters',
    items: ['متبل','بابا غنوج','حمص','حمص بالشمندر','حمص باللحمة','رولات باذنجان باللبنة','ورق عنب','ورق عنب كرسبي','مسخن','كبة مشوية','سمبوسة هندية','داينمايت شرامب','مقالي مشكلة','سمبوسة لحم','سبرينق رول','كبة لحم'],
    popular: ['متبل','حمص','مسخن','سمبوسة هندية','رولات باذنجان باللبنة'],
  },
  {
    t: 'السلطات', en: 'Salads', key: 'salads',
    items: ['سلطة زهرة','سلطة آسيوية','سلطة زعتر','سلطة سيزر','سلطة فتوش','سلطة جرجير','سلطة تبولة','سلطة شمندر','سلطة كينوا','سلطة يونانية'],
    popular: ['سلطة فتوش','سلطة زهرة','سلطة تبولة','سلطة سيزر'],
  },
  {
    t: 'الأطباق الرئيسية', en: 'Main Courses', key: 'mains',
    items: ['كبسة لحم','برياني لحم','مرقوق','كبيبة حائل','مشاوي مشكلة','بامية باللحم','كباب إيراني','كباب بالكرز','ستيك','برياني دجاج','بخاري دجاج','مسالا دجاج مع خبز نان','دجاج بكريمة الليمون','دجاج حلو','صينية شاورما الدجاج','أرز صيني بقطع الدجاج'],
    popular: ['كبسة لحم','مشاوي مشكلة','برياني دجاج','بخاري دجاج','مرقوق'],
  },
  {
    t: 'الأطباق الجانبية', en: 'Accompaniments', key: 'sides', optional: true,
    items: ['كشري','محشي مشكلة','محشي ورق عنب (مضروبة)','لفائف باذنجان','كرات بطاطس بالدجاج','كبيبة باللبن','جريش','خضار بالكريمة'],
    popular: ['كشري','محشي مشكلة','جريش','محشي ورق عنب (مضروبة)'],
  },
  {
    t: 'الباستا', en: 'Pasta', key: 'pasta', optional: true,
    items: ['فيتوتشيني','ريزوتو السبانخ والدجاج','لازانيا باللحم','باستا بيني أرابياتا','أصداف مكرونة بالدجاج','مكرونة بشاميل بالدجاج','نودلز الدجاج','باستا بيستو بالدجاج'],
    popular: ['لازانيا باللحم','ريزوتو السبانخ والدجاج','فيتوتشيني'],
  },
  {
    t: 'الحلويات', en: 'Desserts', key: 'sweets',
    items: ['أم علي','تراميسو','كيكة العسل','كيكة التوت والليمون','براونيز بالتوت','ترافيل مانجو','سلة فواكه','بسبوسة'],
    popular: ['أم علي','بسبوسة','تراميسو','كيكة العسل'],
  },
];

/* عدد الأصناف المسموح بها لكل فئة حسب عدد الضيوف */
const REC_TABLE = {
  '٢٠': { starters: 2, salads: 3, mains: 4, sides: 2, pasta: 1, sweets: 3 },
  '٣٠': { starters: 3, salads: 3, mains: 5, sides: 2, pasta: 1, sweets: 4 },
  '٤٠': { starters: 3, salads: 4, mains: 6, sides: 2, pasta: 1, sweets: 4 },
  '٥٠': { starters: 4, salads: 5, mains: 7, sides: 2, pasta: 1, sweets: 5 },
  '٦٠': { starters: 5, salads: 5, mains: 8, sides: 2, pasta: 1, sweets: 5 },
  '+٦٠':{ starters: 5, salads: 6, mains: 9, sides: 3, pasta: 2, sweets: 6 },
};

const getLimits = (g) => {
  const counts = REC_TABLE[g] || REC_TABLE['٣٠'];
  const result = {};
  MENU_CATS.forEach(cat => { result[cat.t] = counts[cat.key] || 2; });
  return result;
};

/* القائمة المقترحة: الأكثر طلباً حتى حد كل فئة */
const buildRecommended = (guests) => {
  const limits = getLimits(guests);
  const result = {};
  MENU_CATS.forEach(cat => {
    const n = limits[cat.t];
    result[cat.t] = cat.popular.slice(0, n).concat(
      cat.items.filter(x => !cat.popular.includes(x)).slice(0, Math.max(0, n - cat.popular.length))
    );
  });
  return result;
};

Object.assign(window, { MENU_CATS, REC_TABLE, getLimits, buildRecommended });
