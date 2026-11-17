export default function CourseDetails({ course }) {
  return (
    <section className="course-details-card" aria-labelledby="course-details-title">
      <div className="details-heading">
        <span className={`course-icon course-icon-${course.color}`} aria-hidden="true">
          {course.icon}
        </span>
        <div>
          <span className="summary-kicker">YOUR SELECTED COURSE</span>
          <h3 id="course-details-title">{course.title}</h3>
        </div>
      </div>
      <p>{course.description}</p>
      <div className="course-detail-tags">
        <span>{course.level}</span>
        <span>{course.duration}</span>
      </div>
      <div className="skills-list">
        {course.skills.map((skill) => <span key={skill}>{skill}</span>)}
      </div>
    </section>
  );
}
