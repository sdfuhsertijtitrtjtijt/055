export default function EnrollmentHistory({ enrollments, onClear }) {
  return (
    <section className="history-section" id="history" aria-labelledby="history-title">
      <div className="section-heading history-heading">
        <div>
          <span className="section-eyebrow">YOUR LEARNING JOURNEY</span>
          <h2 id="history-title">Recent enrollments</h2>
        </div>
        {enrollments.length > 0 && (
          <button className="clear-history" type="button" onClick={onClear}>Clear history</button>
        )}
      </div>
      {enrollments.length === 0 ? (
        <div className="empty-history">
          <span aria-hidden="true">✦</span>
          <p>Your learning journey starts here. Enroll in a course to see it listed.</p>
        </div>
      ) : (
        <div className="history-list">
          {enrollments.map((enrollment) => (
            <article className="history-item" key={enrollment.enrollmentId}>
              <span className={`course-icon course-icon-${enrollment.courseColor}`} aria-hidden="true">
                {enrollment.courseIcon}
              </span>
              <div className="history-details">
                <strong>{enrollment.courseTitle}</strong>
                <span>{enrollment.fullName} · {enrollment.academicYear}</span>
                <small>{enrollment.enrollmentId} · {enrollment.timestamp}</small>
              </div>
              <span className="enrollment-status">Confirmed</span>
              <strong className="history-total">₹{enrollment.total.toLocaleString('en-IN')}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
