# Week 05 — React Mini App with Routing and Persistence

## โครงสร้างโปรเจกต์
- `source/`: โค้ดโปรแกรม React + Vite พร้อม HashRouter และ LocalStorage Service
- `publish/`: ไฟล์ผลลัพธ์การ Build จาก Vite
- `evidence/`: บันทึกผลการทดสอบ TEST_REPORT.md และ AI_USAGE.md

## วิธีรันและการทดสอบ
```bash
npm --prefix labs/week-05/source install
npm --prefix labs/week-05/source run check
npm --prefix labs/week-05/source run build
npm run import:publish -- week-05 labs/week-05/source/dist --replace
npm run build:pages
npm run verify:lab -- week-05
```
