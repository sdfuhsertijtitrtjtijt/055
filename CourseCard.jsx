import '../styles/CourseCard.css';

export default function CourseCard({ course, isSelected, onSelect }) {
  return (
    <button
      className={`course-card ${isSelected ? 'is-selected' : ''}`}
      type="button"
      onClick={() => onSelect(course.id)}
      aria-pressed={isSelected}
      aria-label={`Select ${course.title}`}
    >
      <span className={`course-icon course-icon-${course.color}`} aria-hidden="true">
        {course.icon}
      </span>
      <span className="course-card-meta">
        {course.category} <span aria-hidden="true">·</span> {course.level}
      </span>
      <span className="course-card-title">{course.title}</span>
      <span className="course-card-description">{course.description}</span>
      <span className="course-card-footer">
        <span>{course.duration}</span>
        <strong>₹{course.baseFee.toLocaleString('en-IN')}</strong>
      </span>
      <span className="course-card-arrow" aria-hidden="true">
        {isSelected ? '✓' : '↗'}
      </span>
    </button>
  );
}
