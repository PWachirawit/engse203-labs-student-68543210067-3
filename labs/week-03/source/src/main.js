import "./style.css";

const form = document.querySelector("#request-form");
const statusEl = document.querySelector("#form-status");
const requestList = document.querySelector("#request-list");
const requestCount = document.querySelector("#request-count");

const previewName = document.querySelector("#preview-name");
const previewType = document.querySelector("#preview-type");
const previewLocation = document.querySelector("#preview-location");
const previewPriority = document.querySelector("#preview-priority");
const previewDetails = document.querySelector("#preview-details");

const fields = ["requesterName", "requestType", "location", "details"];

let submittedCount = 0;

function readForm() {
  const formData = new FormData(form);
  return {
    requesterName: (formData.get("requesterName") ?? "").toString(),
    requestType: (formData.get("requestType") ?? "").toString(),
    location: (formData.get("location") ?? "").toString(),
    priority: (formData.get("priority") ?? "normal").toString(),
    details: (formData.get("details") ?? "").toString(),
  };
}

function renderPreview(data) {
  previewName.textContent = data.requesterName.trim() || "ยังไม่ระบุชื่อ";
  previewType.textContent = data.requestType || "ยังไม่เลือกประเภท";
  previewLocation.textContent = data.location.trim() || "ยังไม่ระบุสถานที่";
  previewPriority.textContent = data.priority === "urgent" ? "เร่งด่วน (Urgent)" : "ปกติ (Normal)";
  previewDetails.textContent = data.details.trim() || "ยังไม่มีรายละเอียด";
}

function validate(data) {
  const errors = {};

  if (data.requesterName.trim().length < 2) {
    errors.requesterName = "กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร";
  }

  if (!data.requestType) {
    errors.requestType = "กรุณาเลือกประเภทคำร้อง";
  }

  if (data.location.trim().length === 0) {
    errors.location = "กรุณาระบุสถานที่ / ห้อง";
  }

  if (data.details.trim().length < 10) {
    errors.details = "กรุณาระบุรายละเอียดอย่างน้อย 10 ตัวอักษร";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

function clearErrors() {
  fields.forEach((name) => {
    const input = form.elements.namedItem(name);
    if (input) {
      input.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
    }
    const errorEl = document.querySelector(`#${name}-error`);
    if (errorEl) {
      errorEl.textContent = "";
    }
  });

  statusEl.className = "status";
  statusEl.textContent = "";
}

function renderErrors(errors) {
  clearErrors();
  let firstFailedElement = null;

  for (const [name, message] of Object.entries(errors)) {
    const input = form.elements.namedItem(name);
    if (input) {
      input.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      if (!firstFailedElement) {
        firstFailedElement = input;
      }
    }
    const errorEl = document.querySelector(`#${name}-error`);
    if (errorEl) {
      errorEl.textContent = message;
    }
  }

  statusEl.className = "status error";
  statusEl.textContent = "กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้องตามคำแนะนำ";

  if (firstFailedElement) {
    firstFailedElement.focus();
  }
}

function appendSubmittedRequest(data) {
  submittedCount += 1;
  requestCount.textContent = submittedCount.toString();

  const card = document.createElement("li");
  card.className = "request-card";

  const header = document.createElement("div");
  header.className = "request-card-header";

  const title = document.createElement("span");
  title.className = "request-card-title";
  title.textContent = `REQ-${String(submittedCount).padStart(3, "0")} • ${data.requestType}`;

  const badge = document.createElement("span");
  badge.className = `badge ${data.priority === "urgent" ? "urgent" : "normal"}`;
  badge.textContent = data.priority === "urgent" ? "เร่งด่วน" : "ปกติ";

  header.append(title, badge);

  const meta = document.createElement("div");
  meta.className = "request-card-meta";
  meta.textContent = `ผู้แจ้ง: ${data.requesterName.trim()} | สถานที่: ${data.location.trim()} | สถานะ: pending`;

  const details = document.createElement("div");
  details.className = "request-card-details";
  details.textContent = data.details.trim();

  card.append(header, meta, details);
  requestList.prepend(card);
}

// Event Listeners
form.addEventListener("input", () => {
  const data = readForm();
  renderPreview(data);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = readForm();
  const result = validate(data);

  if (!result.isValid) {
    renderErrors(result.errors);
    return;
  }

  clearErrors();
  appendSubmittedRequest(data);

  statusEl.className = "status success";
  statusEl.textContent = "✓ บันทึกคำร้องเรียบร้อยแล้ว!";

  form.reset();
  renderPreview(readForm());
});

console.log("LAB 3 loaded successfully.");
