# Week 03 Evidence — Responsive Web UI & Form Interaction

## 1. ผลการ Build (Vite Build Output)

```text
> engse203-lab03-campus-service-request@2.0.0 build
> vite build

dist/index.html                 4.69 kB │ gzip: 1.41 kB
dist/assets/index-CRk2XqSw.css  4.00 kB │ gzip: 1.45 kB
dist/assets/index-Y1ZRYd8T.js   4.38 kB │ gzip: 1.66 kB
✓ built in 179ms
```

## 2. Test Cases Matrix

| Case ID | รายละเอียดการทดสอบ | ผลลัพธ์ที่คาดหวัง | สถานะ |
|---|---|---|---|
| TC-01 | Initial State | Form ว่าง, Preview แสดงค่า default, Submitted list ว่าง | PASS |
| TC-02 | Input Live Preview | เมื่อพิมพ์ข้อมูลในแต่ละช่อง Preview แสดงผลอัปเดตทันทีแบบปลอดภัย (textContent) | PASS |
| TC-03 | Form Validation (Invalid) | กรอกข้อมูลไม่ครบหรือผิดเงื่อนไขแล้ว Submit -> แสดง error ตรง field, ไม่รีเซ็ต form, ไม่เพิ่มรายการ | PASS |
| TC-04 | Form Validation (Valid) | กรอกข้อมูลครบถ้วนถูกต้อง -> เพิ่มรายการคำร้องใน Submitted list, แสดงข้อความสำเร็จ, รีเซ็ตฟอร์ม | PASS |
| TC-05 | Responsive 375px | หน้าจอขนาดเล็ก (Mobile 375px) แสดงผลคอลัมน์เดียว ไม่มี horizontal scroll | PASS |
| TC-06 | Desktop Layout | หน้าจอ Desktop (>= 768px) แสดงผลแบบ 2 คอลัมน์ (Form + Preview/List) | PASS |
