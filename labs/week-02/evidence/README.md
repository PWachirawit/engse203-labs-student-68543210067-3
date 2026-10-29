# Week 02 Evidence — Modern JavaScript Learning Dashboard

## 1. ผลการรันตรวจสอบ (Checker Output)

```text
> engse203-lab02-learning-dashboard@1.0.0 check
> node scripts/check-project.mjs

LAB 02 project structure and required evidence check passed.
```

## 2. ผลการ Build (Vite Build Output)

```text
> engse203-lab02-learning-dashboard@1.0.0 build
> vite build

dist/index.html                 1.57 kB │ gzip: 0.67 kB
dist/assets/index-CiKjOC86.css  1.70 kB │ gzip: 0.81 kB
dist/assets/index-clKG1Wri.js   3.85 kB │ gzip: 1.80 kB
✓ built in 180ms
```

## 3. Checklist การทดสอบฟังก์ชัน
- [x] Initial / Normal State: แสดงรายการ Tasks ทั้งหมดและนับจำนวนถูกต้อง
- [x] Filter Interaction: กรองตามหมวดหมู่หรือสถานะได้ถูกต้อง
- [x] Error Simulation: เมื่อเกิดข้อผิดพลาด แสดงข้อความ Error UI ชัดเจน
- [x] Responsive Design: แสดงผลได้ดีทั้ง Mobile (375px) และ Desktop
