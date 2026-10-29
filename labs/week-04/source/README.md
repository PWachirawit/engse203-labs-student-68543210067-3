# ENGSE203 LAB 4 — Student Evidence README

## ผู้จัดทำ

- ชื่อ–นามสกุล: Wachirawit Pinakro
- รหัสนักศึกษา: 68543210067-3
- Section: SEC-1

## URLs

- Repository: https://github.com/PWachirawit/engse203-labs-student-68543210067-3
- Pull Request: https://github.com/PWachirawit/engse203-labs-student-68543210067-3/pull/4
- GitHub Pages: https://PWachirawit.github.io/engse203-student-labs-68543210067-3/labs/week-04/

## Component Tree

```text
App (state: requests, statusFilter)
├── AppHeader
├── SummaryPanel (props: summary)
├── RequestForm (props: onAddRequest, state: formData, errors, feedback)
└── FilterBar (props: value, onFilterChange)
└── RequestList (props: requests, onDeleteRequest)
    └── RequestCard (props: request, onDeleteRequest)
```

## Setup และ Run

```bash
nvm use
npm install
npm run dev
npm run check
npm run build
npm run preview
```

## State / Props / Callback Explanation

- **State Owner:** `App` ถือสถานะหลักคือ `requests` (รายการคำร้องทั้งหมด) และ `statusFilter` (ตัวกรองสถานะ)
- **Props Flow (Top-down):** ข้อมูลคำร้องที่กรองแล้วและ callback จะถูกส่งผ่าน props ลงไปยัง child components เช่น `RequestList` และ `RequestCard`
- **Callback (Bottom-up):** เมื่อผู้ใช้กดลบใน `RequestCard` จะเรียก callback `onDeleteRequest(id)` ขึ้นมายัง `App` เพื่อเรียก `setRequests` แบบ immutable ด้วย `filter()`

## Test Evidence

| Test ID | Actual Result | Pass/Fail | Evidence/Screenshot |
|---|---|---|---|
| TC-01 Initial | แสดงรายการคำร้องเริ่มต้น 3 รายการพร้อม summary | PASS | evidence/desktop.png |
| TC-02 Controlled input | ฟอร์มทำงานแบบ Controlled input ทุกช่อง | PASS | evidence/desktop.png |
| TC-03 Invalid | กรอกข้อมูลไม่ครบ แสดง error ใกล้ช่อง | PASS | evidence/desktop.png |
| TC-04 Valid add | เพิ่มคำร้องใหม่สถานะ pending ได้สำเร็จ | PASS | evidence/desktop.png |
| TC-05 Filter | กรองตามสถานะ pending, in-progress, completed ถูกต้อง | PASS | evidence/desktop.png |
| TC-06 All | กรอง all แสดงคำร้องทั้งหมด | PASS | evidence/desktop.png |
| TC-07 Empty | เมื่อไม่มีรายการที่ตรงกับตัวกรอง แสดงข้อความ empty state | PASS | evidence/desktop.png |
| TC-08 Delete | กดปุ่มลบ ลบรายการตาม ID ได้ถูกต้องและ summary อัปเดต | PASS | evidence/desktop.png |
| TC-09 Mobile | แสดงผลสวยงามบนหน้าจอ 375px ไม่มี horizontal scroll | PASS | evidence/mobile-375.png |
| TC-10 Keyboard | สามารถใช้ Tab โฟกัสและ Submit ผ่านคีย์บอร์ดได้ | PASS | evidence/desktop.png |
| TC-11 Build | รัน Vite build ผ่านโดยไม่มี error | PASS | dist/index.html |
| TC-12 Pages | Deploy ขึ้น Pages Hub และเปิดดูผลลัพธ์ได้ปกติ | PASS | docs/labs/week-04/ |

## Screenshots

- Desktop: `evidence/desktop.png`
- Mobile 375px: `evidence/mobile-375.png`
- Validation/empty state: `evidence/desktop.png`

## Week 03 → Week 04 Reflection

ใน Week 03 เราใช้ DOM-driven UI ซึ่งต้อง querySelector และอัปเดต DOM ด้วยตนเองทีละ element ทำให้โค้ดซับซ้อนและเกิด bug ได้ง่ายเมื่อแอปพลิเคชันมีขนาดใหญ่ขึ้น ใน Week 04 เรา refactor มาใช้ State-driven React ซึ่งข้อมูล UI จะถูก sync กับ State อัตโนมัติ ทำให้การจัดการสถานะ การกรอง และการคำนวณสรุปผลทำได้อย่างเป็นระเบียบและปลอดภัยกว่ามาก

## AI / External Resource Disclosure

ใช้สำหรับตรวจสอบ syntax และแนวทางการแยก Component ตาม React best practices และตรวจสอบความถูกต้องผ่าน automated check script
