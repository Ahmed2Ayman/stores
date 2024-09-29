// استهلاك المنتج وإضافته إلى الجدول
function consumeProduct() {
  const playerName = document.getElementById("playerName").value;
  const consumedWheat = document.getElementById("consumedWheat").value;
  const consumedWood = document.getElementById("consumedWood").value;
  const reason = document.getElementById("reason").value;

  // تأكيد وجود البيانات
  if (!playerName || !consumedWheat || !consumedWood || !reason) {
    alert("يرجى إدخال جميع البيانات");
    return;
  }

  // إنشاء كائن المنتج
  const product = {
    playerName,
    consumedWheat,
    consumedWood,
    reason,
  };

  // الحصول على البيانات من localStorage أو إنشاء قائمة فارغة
  let consumedProducts =
    JSON.parse(localStorage.getItem("consumedProducts")) || [];

  // إضافة المنتج الجديد إلى القائمة
  consumedProducts.push(product);

  // حفظ القائمة المحدثة في localStorage
  localStorage.setItem("consumedProducts", JSON.stringify(consumedProducts));

  // إضافة المنتج إلى الجدول
  addRowToTable(product, consumedProducts.length - 1);

  // إعادة تعيين الحقول بعد الإضافة
  document.getElementById("playerName").value = "";
  document.getElementById("consumedWheat").value = "";
  document.getElementById("consumedWood").value = "";
  document.getElementById("reason").value = "";
}

// وظيفة لإضافة صف إلى الجدول
function addRowToTable(product, index) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${product.playerName}</td>
    <td>${product.consumedWheat}</td>
    <td>${product.consumedWood}</td>
    <td>${product.reason}</td>
    <td><button onclick="removeProduct(${index})">حذف</button></td>
  `;
  document.getElementById("consumedList").appendChild(row);
}

// وظيفة لإزالة المنتج من الجدول ومن localStorage
function removeProduct(index) {
  // الحصول على البيانات من localStorage
  let consumedProducts =
    JSON.parse(localStorage.getItem("consumedProducts")) || [];

  // إزالة المنتج من القائمة
  consumedProducts.splice(index, 1);

  // حفظ القائمة المحدثة في localStorage
  localStorage.setItem("consumedProducts", JSON.stringify(consumedProducts));

  // إعادة تحميل الجدول بعد حذف المنتج
  loadStoredData();
}

// وظيفة لتحميل البيانات المحفوظة من localStorage عند تحميل الصفحة
function loadStoredData() {
  // الحصول على المنتجات من localStorage
  let consumedProducts =
    JSON.parse(localStorage.getItem("consumedProducts")) || [];

  // إفراغ الجدول قبل إعادة تحميل البيانات
  document.getElementById("consumedList").innerHTML = "";

  // إضافة كل منتج محفوظ إلى الجدول
  consumedProducts.forEach((product, index) => {
    addRowToTable(product, index);
  });
}

// طباعة الجدول كملف PDF باستخدام مكتبة html2pdf
function printPdf() {
  // إخفاء أزرار الحذف مؤقتًا
  const deleteButtons = document.querySelectorAll("td button");
  deleteButtons.forEach((button) => {
    button.style.display = "none";
  });

  // طباعة الجدول كـ PDF
  const element = document.getElementById("consumptionTable");
  html2pdf(element, {
    margin: 1,
    filename: "consumption_table.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  }).then(() => {
    // إظهار أزرار الحذف بعد الطباعة
    deleteButtons.forEach((button) => {
      button.style.display = "inline-block";
    });
  });
}

// تحميل البيانات عند بدء الصفحة
window.onload = loadStoredData;
