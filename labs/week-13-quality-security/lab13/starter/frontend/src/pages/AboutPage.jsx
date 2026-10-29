function AboutPage() {
  return (
    <section data-testid="page-about">
      <div className="page-heading"><div><p className="eyebrow dark">ABOUT THE LAB</p><h1>เกี่ยวกับระบบ</h1></div></div>
      <article className="panel prose"><p>Campus Service Request เป็นกรณีศึกษาสำหรับเรียนรู้ React Routing, Service Layer, REST API และการยืนยันตัวตนด้วย JWT</p><h2>สถาปัตยกรรม</h2><p>หน้าจอเรียก API ผ่าน Service Layer ส่วน API ตรวจสอบข้อมูลและสิทธิ์ก่อนเปลี่ยนแปลงคำร้อง การจัดการสถานะและลบคำร้องสงวนไว้สำหรับเจ้าหน้าที่</p><h2>ความเป็นส่วนตัว</h2><p>ข้อมูลใน LAB เป็นข้อมูลสาธิต ห้ามบันทึกข้อมูลส่วนบุคคลจริง รหัสผ่าน token หรือ secret ลงใน browser storage</p></article>
    </section>
  );
}

export default AboutPage;
