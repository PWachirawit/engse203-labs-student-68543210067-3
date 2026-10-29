import { useState } from 'react';

const initialFormData = {
  requesterName: '',
  requestType: '',
  location: '',
  details: '',
  priority: 'normal',
};

function RequestForm({ onAddRequest }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  }

  function validate() {
    const newErrors = {};

    if (formData.requesterName.trim().length < 2) {
      newErrors.requesterName = 'ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร';
    }

    if (!formData.requestType) {
      newErrors.requestType = 'กรุณาเลือกประเภทคำร้อง';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'กรุณาระบุสถานที่';
    }

    if (formData.details.trim().length < 10) {
      newErrors.details = 'รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร';
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFeedback({
        type: 'error',
        message: 'กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง',
      });
      return;
    }

    setErrors({});
    onAddRequest({
      requesterName: formData.requesterName.trim(),
      requestType: formData.requestType,
      location: formData.location.trim(),
      details: formData.details.trim(),
      priority: formData.priority,
    });

    setFeedback({
      type: 'success',
      message: '✓ บันทึกคำร้องสำเร็จ',
    });

    setFormData(initialFormData);
  }

  return (
    <section className="panel" aria-labelledby="request-form-title">
      <p className="eyebrow dark">CONTROLLED FORM</p>
      <h2 id="request-form-title">สร้างคำร้องใหม่</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="requesterName">ชื่อผู้แจ้ง</label>
          <input
            id="requesterName"
            name="requesterName"
            value={formData.requesterName}
            onChange={handleChange}
            aria-invalid={errors.requesterName ? 'true' : 'false'}
            aria-describedby={errors.requesterName ? 'requesterName-error' : undefined}
          />
          {errors.requesterName && (
            <small className="error" id="requesterName-error">
              {errors.requesterName}
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="requestType">ประเภทคำร้อง</label>
          <select
            id="requestType"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
            aria-invalid={errors.requestType ? 'true' : 'false'}
            aria-describedby={errors.requestType ? 'requestType-error' : undefined}
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="แจ้งซ่อม">แจ้งซ่อม</option>
            <option value="ขอใช้ห้อง">ขอใช้ห้อง</option>
            <option value="บริการบัญชีผู้ใช้">บริการบัญชีผู้ใช้</option>
            <option value="ขอใช้อุปกรณ์">ขอใช้อุปกรณ์</option>
          </select>
          {errors.requestType && (
            <small className="error" id="requestType-error">
              {errors.requestType}
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="location">สถานที่</label>
          <input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            aria-invalid={errors.location ? 'true' : 'false'}
            aria-describedby={errors.location ? 'location-error' : undefined}
          />
          {errors.location && (
            <small className="error" id="location-error">
              {errors.location}
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="details">รายละเอียด</label>
          <textarea
            id="details"
            name="details"
            rows="4"
            value={formData.details}
            onChange={handleChange}
            aria-invalid={errors.details ? 'true' : 'false'}
            aria-describedby={errors.details ? 'details-error' : undefined}
          ></textarea>
          {errors.details && (
            <small className="error" id="details-error">
              {errors.details}
            </small>
          )}
        </div>

        <fieldset className="field">
          <legend>ความเร่งด่วน</legend>
          <label>
            <input
              type="radio"
              name="priority"
              value="normal"
              checked={formData.priority === 'normal'}
              onChange={handleChange}
            />{' '}
            ปกติ
          </label>
          <label>
            <input
              type="radio"
              name="priority"
              value="urgent"
              checked={formData.priority === 'urgent'}
              onChange={handleChange}
            />{' '}
            เร่งด่วน
          </label>
        </fieldset>

        <button type="submit">เพิ่มคำร้อง</button>
        {feedback && (
          <p className={`status ${feedback.type}`} role="status">
            {feedback.message}
          </p>
        )}
      </form>
    </section>
  );
}

export default RequestForm;
