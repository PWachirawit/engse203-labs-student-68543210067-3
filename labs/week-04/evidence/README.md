# Week 04 Evidence — React Campus Service Request

## 1. Checker Output

```text
> node scripts/check-project.mjs
LAB 4 verifier: PASS — run manual TC-01–TC-12 and record evidence in README
```

## 2. Vite Build Output

```text
> vite build
dist/index.html                   0.48 kB │ gzip:  0.30 kB
dist/assets/index-BUWkJu2j.css    2.38 kB │ gzip:  0.97 kB
dist/assets/index-C_R9VKxa.js   199.22 kB │ gzip: 62.52 kB
✓ built in 1.15s
```

## 3. Checklist
- [x] Components Tree ครบถ้วน (App, AppHeader, SummaryPanel, RequestForm, FilterBar, RequestList, RequestCard)
- [x] State Management: requests, statusFilter, formData ทำงานถูกต้อง
- [x] Controlled Form พร้อม validation และ error display
- [x] Immutable Add และ Delete ทำงานถูกต้อง
- [x] Summary Panel คำนวณ derived data ถูกต้อง
- [x] Responsive layout สวยงาม รองรับทั้ง Mobile (375px) และ Desktop
