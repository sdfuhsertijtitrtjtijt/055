import { VALID_COUPONS } from '../data/courses.js';

const currency = (amount) =>
  `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;

export default function EnrollmentSummary({
  course,
  couponCode,
  discountPercent,
  couponMessage,
  onCouponChange,
  onApplyCoupon,
}) {
  const discount = discountPercent
    ? Math.round((course.baseFee * discountPercent) / 100)
    : 0;

  return (
    <section className="summary-card" aria-labelledby="summary-title">
      <span className="summary-kicker">ENROLLMENT SUMMARY</span>
      <h3 id="summary-title">Your investment</h3>
      <div className="summary-course">
        <span className={`course-icon course-icon-${course.color}`} aria-hidden="true">
          {course.icon}
        </span>
        <div><strong>{course.title}</strong><small>{course.duration} · {course.level}</small></div>
      </div>
      <div className="price-lines">
        <div><span>Course fee</span><strong>{currency(course.baseFee)}</strong></div>
        <div className="discount-line">
          <span>Discount{discountPercent ? ` (${discountPercent}%)` : ''}</span>
          <strong>{discount ? `− ${currency(discount)}` : currency(0)}</strong>
        </div>
      </div>
      <form className="coupon-form" onSubmit={onApplyCoupon}>
        <label htmlFor="coupon-code">Have a coupon?</label>
        <div className="coupon-controls">
          <input
            id="coupon-code"
            value={couponCode}
            onChange={(event) => onCouponChange(event.target.value.toUpperCase())}
            placeholder="Enter code"
            autoComplete="off"
          />
          <button type="submit">Apply</button>
        </div>
        {couponMessage && (
          <p className={`coupon-message ${discountPercent ? 'success' : 'error'}`} role="status">
            {couponMessage}
          </p>
        )}
        {!couponMessage && (
          <small className="coupon-hint">
            Try {Object.keys(VALID_COUPONS).join(' or ')}
          </small>
        )}
      </form>
      <div className="total-line">
        <span>Total payable</span>
        <strong>{currency(course.baseFee - discount)}</strong>
      </div>
      <p className="secure-note"><span aria-hidden="true">✓</span> No payment is collected in this demo.</p>
    </section>
  );
}
