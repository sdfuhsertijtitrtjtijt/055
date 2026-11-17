import { useState } from 'react';
import { COURSES, validateField } from '../data/courses.js';
import '../styles/EnrollmentForm.css';

const academicYears = ['First Year', 'Second Year', 'Third Year', 'Fourth Year'];
const batchSlots = ['Weekday · Morning', 'Weekday · Evening', 'Weekend · Morning'];
const paymentMethods = [
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Credit / debit card' },
  { value: 'netbanking', label: 'Net banking' },
];

export default function EnrollmentForm({ form, onChange, onSubmit }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function updateField(name, value) {
    onChange(name, value);
    if (submitted) {
      setErrors((current) => ({
        ...current,
        [name]: validateField(name, value, { ...form, [name]: value }),
        ...(name === 'paymentMethod' ? { upiId: '' } : {}),
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    const nextErrors = onSubmit();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus();
    }
  }

  function fieldError(name) {
    return errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null;
  }

  return (
    <form className="enrollment-form" onSubmit={handleSubmit} noValidate>
      <div className="form-heading">
        <div>
          <span className="summary-kicker">LET’S GET STARTED</span>
          <h3>Student details</h3>
          <p>Fill in your details to reserve your place.</p>
        </div>
        <span className="required-note"><b>*</b> Required</span>
      </div>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="fullName">Full name <b>*</b></label>
          <input id="fullName" name="fullName" value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} placeholder="e.g. Alex Morgan" autoComplete="name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
          {fieldError('fullName')}
        </div>
        <div className="form-field">
          <label htmlFor="studentId">Student ID <b>*</b></label>
          <input id="studentId" name="studentId" value={form.studentId} onChange={(event) => updateField('studentId', event.target.value)} placeholder="e.g. BTCOE23001" autoComplete="off" aria-invalid={Boolean(errors.studentId)} aria-describedby={errors.studentId ? 'studentId-error' : undefined} />
          {fieldError('studentId')}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email address <b>*</b></label>
          <input id="email" name="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
          {fieldError('email')}
        </div>
        <div className="form-field">
          <label htmlFor="phone">Mobile number <b>*</b></label>
          <input id="phone" name="phone" type="tel" inputMode="numeric" maxLength={10} value={form.phone} onChange={(event) => updateField('phone', event.target.value.replace(/\D/g, ''))} placeholder="10-digit mobile number" autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />
          {fieldError('phone')}
        </div>
        <div className="form-field">
          <label htmlFor="courseId">Choose a course <b>*</b></label>
          <select id="courseId" name="courseId" value={form.courseId} onChange={(event) => updateField('courseId', event.target.value)} aria-invalid={Boolean(errors.courseId)} aria-describedby={errors.courseId ? 'courseId-error' : undefined}>
            {COURSES.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
          </select>
          {fieldError('courseId')}
        </div>
        <div className="form-field">
          <label htmlFor="academicYear">Academic year <b>*</b></label>
          <select id="academicYear" name="academicYear" value={form.academicYear} onChange={(event) => updateField('academicYear', event.target.value)} aria-invalid={Boolean(errors.academicYear)} aria-describedby={errors.academicYear ? 'academicYear-error' : undefined}>
            <option value="">Select your year</option>
            {academicYears.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
          {fieldError('academicYear')}
        </div>
        <div className="form-field">
          <label htmlFor="batchSlot">Preferred batch <b>*</b></label>
          <select id="batchSlot" name="batchSlot" value={form.batchSlot} onChange={(event) => updateField('batchSlot', event.target.value)} aria-invalid={Boolean(errors.batchSlot)} aria-describedby={errors.batchSlot ? 'batchSlot-error' : undefined}>
            <option value="">Choose a schedule</option>
            {batchSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
          </select>
          {fieldError('batchSlot')}
        </div>
        <div className="form-field">
          <label htmlFor="paymentMethod">Payment preference <b>*</b></label>
          <select id="paymentMethod" name="paymentMethod" value={form.paymentMethod} onChange={(event) => updateField('paymentMethod', event.target.value)}>
            {paymentMethods.map((method) => <option key={method.value} value={method.value}>{method.label}</option>)}
          </select>
        </div>
        {form.paymentMethod === 'upi' && (
          <div className="form-field form-field-wide">
            <label htmlFor="upiId">UPI ID <b>*</b></label>
            <input id="upiId" name="upiId" value={form.upiId} onChange={(event) => updateField('upiId', event.target.value)} placeholder="learner@bank" autoComplete="off" aria-invalid={Boolean(errors.upiId)} aria-describedby={errors.upiId ? 'upiId-error' : undefined} />
            {fieldError('upiId')}
          </div>
        )}
      </div>
      <label className={`terms-check ${errors.termsAccepted ? 'has-error' : ''}`} htmlFor="termsAccepted">
        <input id="termsAccepted" type="checkbox" checked={form.termsAccepted} onChange={(event) => updateField('termsAccepted', event.target.checked)} aria-invalid={Boolean(errors.termsAccepted)} aria-describedby={errors.termsAccepted ? 'termsAccepted-error' : undefined} />
        <span>I confirm that the information above is accurate and agree to the enrollment terms. <b>*</b></span>
      </label>
      {fieldError('termsAccepted')}
      <button className="submit-button" type="submit">
        Confirm enrollment <span aria-hidden="true">→</span>
      </button>
      <p className="form-footnote">Your details stay in this browser for this assignment demo.</p>
    </form>
  );
}
