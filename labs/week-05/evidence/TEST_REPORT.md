# ENGSE203 LAB05 — Student Test Report

**ชื่อ–รหัส:** Wachirawit Pinakro (68543210067-3)  
**OS / Browser / Node:** Linux / Chrome / Node v22.23.1  
**Branch / Commit:** `lab/week-05`

| Test ID | Preconditions / procedure summary | Actual result | Status | Evidence / Notes |
|---|---|---|---|---|
| TC-L5-01 | เปิด `#/` | แสดง Dashboard พร้อมรายการคำร้องเริ่มต้น | PASS | ผ่านการทดสอบ |
| TC-L5-02 | ใช้ navigation 3 รายการ | สลับหน้า Dashboard, New Request, About ได้ถูกต้อง | PASS | ผ่านการทดสอบ |
| TC-L5-03 | เปิด/refresh `#/requests/new` | ฟอร์มสร้างคำร้องแสดงผลถูกต้อง ไม่หลุดหน้า | PASS | ผ่านการทดสอบ |
| TC-L5-04 | เปิด `#/requests/REQ-001` | แสดงรายละเอียดของคำร้อง REQ-001 ครบถ้วน | PASS | route-detail-found |
| TC-L5-05 | เปิด `#/requests/REQ-999` | แสดงหน้าไม่พบคำร้องรหัส REQ-999 พร้อมปุ่มกลับ | PASS | ผ่านการทดสอบ |
| TC-L5-06 | เปิด `#/unknown` | แสดงหน้า NotFoundPage 404 | PASS | route-not-found |
| TC-L5-07 | ลบ LAB05 key แล้วเปิด Dashboard | อ่าน seed data อัตโนมัติและสร้าง storage key ใหม่ | PASS | ผ่านการทดสอบ |
| TC-L5-08 | สังเกตช่วง latency | แสดง LoadingState ระหว่างรอข้อมูล | PASS | state-loading |
| TC-L5-09 | เปิด `#/?scenario=error` | แสดง ErrorState พร้อมปุ่มลองใหม่ | PASS | state-error-retry |
| TC-L5-10 | กด Retry | โหลดข้อมูลใหม่และกลับสู่สถานะปกติ | PASS | ผ่านการทดสอบ |
| TC-L5-11 | เปิด `#/?scenario=empty` | แสดง Empty State พร้อมปุ่มสร้างคำร้อง | PASS | state-empty |
| TC-L5-12 | รัน public checker | ผ่าน 145/145 รายการ | PASS | npm run check |
| TC-L5-13 | submit form ผิด validation | แสดงข้อความ error ใกล้ช่อง ไม่ส่งคำร้อง | PASS | ผ่านการทดสอบ |
| TC-L5-14 | เพิ่ม valid request แล้ว refresh | คำร้องใหม่ยังคงอยู่หลัง refresh (persistent) | PASS | persistence-add-refresh |
| TC-L5-15 | ทดสอบ filters ทุกค่า | กรองตาม all, pending, in-progress, completed ได้ถูกต้อง | PASS | ผ่านการทดสอบ |
| TC-L5-16 | ลบ request แล้ว refresh | คำร้องที่ถูกลบไม่กลับมาหลัง refresh | PASS | persistence-delete-refresh |
| TC-L5-17 | Reset Demo Data | กู้คืนข้อมูลเริ่มต้น 3 รายการได้ถูกต้อง | PASS | ผ่านการทดสอบ |
| TC-L5-18 | malformed + wrong schema แล้ว reload | กู้คืนข้อมูลอัตโนมัติพร้อมแจ้งเตือนผู้ใช้ | PASS | storage-recovery |
| TC-L5-19 | เทียบ summary กับ data | จำนวนนับใน SummaryPanel ตรงกับข้อมูลจริง | PASS | ผ่านการทดสอบ |
| TC-L5-20 | viewport 375px ทุก page | ไม่พบ horizontal scroll บนหน้าจอ 375px | PASS | responsive-375 |
| TC-L5-21 | keyboard only | ควบคุมด้วย Tab และปุ่ม Enter ได้สมบูรณ์ | PASS | ผ่านการทดสอบ |
| TC-L5-22 | checker/build/preview | Build ผ่านได้ไฟล์ใน dist/ | PASS | npm run build |
| TC-L5-23 | Pages Incognito + hash refresh | ใช้งานบน GitHub Pages ได้ปกติ | PASS | docs/labs/week-05/ |
| TC-L5-24 | merged PR + tag | เตรียมพร้อมสำหรับการส่งงานและสร้าง tag | PASS | lab-05-submission-v1 |
