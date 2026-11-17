import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import CourseCard from './components/CourseCard.jsx';
import CourseDetails from './components/CourseDetails.jsx';
import EnrollmentForm from './components/EnrollmentForm.jsx';
import EnrollmentSummary from './components/EnrollmentSummary.jsx';
import EnrollmentHistory from './components/EnrollmentHistory.jsx';
import Footer from './components/Footer.jsx';
import { COURSES, INITIAL_FORM, VALID_COUPONS, validateForm } from './data/courses.js';

const STORAGE_KEY = 'learnhub-enrollments-v1';

function readEnrollments() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) throw new Error('Stored enrollment history is not a list.');
    return parsed.filter((item) =>
      item &&
      typeof item.enrollmentId === 'string' &&
      typeof item.courseTitle === 'string' &&
      typeof item.fullName === 'string' &&
      typeof item.total === 'number',
    );
  } catch (error) {
    console.error('Unable to read LearnHub enrollment history from LocalStorage.', error);
    return [];
  }
}

export default function App() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [enrollments, setEnrollments] = useState(readEnrollments);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [storageError, setStorageError] = useState('');

  const selectedCourse = useMemo(
    () => COURSES.find((course) => course.id === form.courseId) ?? COURSES[0],
    [form.courseId],
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(enrollments));
      setStorageError('');
    } catch (error) {
      console.error('Unable to save LearnHub enrollment history to LocalStorage.', error);
      setStorageError('Your enrollment is confirmed, but this browser could not save the history.');
    }
  }, [enrollments]);

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function selectCourse(courseId) {
    updateField('courseId', courseId);
    document.getElementById('enroll')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function applyCoupon(event) {
    event.preventDefault();
    const normalizedCode = couponCode.trim().toUpperCase();
    const percentage = VALID_COUPONS[normalizedCode];

    if (!normalizedCode) {
      setDiscountPercent(0);
      setCouponMessage('Enter a coupon code to apply a discount.');
      return;
    }

    if (!percentage) {
      setDiscountPercent(0);
      setCouponMessage('That code is not valid. Try LEARN10 or STUDENT15.');
      return;
    }

    setCouponCode(normalizedCode);
    setDiscountPercent(percentage);
    setCouponMessage(`${normalizedCode} applied — ${percentage}% off.`);
  }

  function submitEnrollment() {
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) return errors;

    const total = selectedCourse.baseFee -
      Math.round((selectedCourse.baseFee * discountPercent) / 100);
    const enrollmentId = `LH-${Date.now().toString(36).toUpperCase()}`;
    const enrollment = {
      enrollmentId,
      fullName: form.fullName.trim(),
      courseTitle: selectedCourse.title,
      courseColor: selectedCourse.color,
      courseIcon: selectedCourse.icon,
      academicYear: form.academicYear,
      total,
      timestamp: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    setEnrollments((current) => [enrollment, ...current]);
    setConfirmation(enrollmentId);
    setForm(INITIAL_FORM);
    setCouponCode('');
    setDiscountPercent(0);
    setCouponMessage('');
    return {};
  }

  return (
    <div className="app-shell">
      <Navbar enrollmentCount={enrollments.length} />
      <main>
        <section className="hero-section" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-content">
            <div className="hero-copy">
              <span className="hero-eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</span>
              <h1>Learn something<br />that <em>moves you.</em></h1>
              <p>Expert-led courses. Real-world skills. A future you can shape — one lesson at a time.</p>
              <div className="hero-actions">
                <a className="primary-light-button" href="#courses">Explore courses <span aria-hidden="true">↗</span></a>
                <span className="hero-note">Flexible batches · Beginner friendly</span>
              </div>
              <div className="hero-stats">
                <div><strong>6</strong><span>curated courses</span></div>
                <span className="stat-divider" />
                <div><strong>4–8</strong><span>week programs</span></div>
                <span className="stat-divider" />
                <div><strong>100%</strong><span>learn at your pace</span></div>
              </div>
            </div>
            <div className="hero-art" aria-label="A preview of an online course lesson">
              <div className="hero-orbit orbit-a" />
              <div className="hero-orbit orbit-b" />
              <div className="learning-card">
                <div className="learning-card-top"><span className="live-dot" /> YOUR NEXT SKILL</div>
                <div className="learning-illustration"><span>✦</span><i /><b /></div>
                <span className="learning-label">COURSE SPOTLIGHT</span>
                <strong>Build your<br />next big idea.</strong>
                <div className="learning-progress"><span /></div>
                <div className="learning-card-bottom"><span>Curiosity</span><span>→</span><span>Confidence</span></div>
              </div>
              <div className="floating-badge badge-rating"><span>★</span> Learn by doing</div>
              <div className="floating-badge badge-project">✦ &nbsp;Skills that stick</div>
            </div>
          </div>
          <div className="hero-bottom-line" />
        </section>

        <section className="courses-section" id="courses">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">A LITTLE KNOWLEDGE GOES A LONG WAY</span>
              <h2>Find your next <em>favorite</em> subject.</h2>
              <p>Practical courses made for curious minds and ambitious goals.</p>
            </div>
            <span className="course-count">01 — 06 COURSES</span>
          </div>
          <div className="course-grid">
            {COURSES.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isSelected={course.id === form.courseId}
                onSelect={selectCourse}
              />
            ))}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-copy">
            <span className="section-eyebrow">SIMPLE BY DESIGN</span>
            <h2>Three steps.<br /><em>One big leap.</em></h2>
            <p>Getting started should feel just as good as learning something new.</p>
          </div>
          <div className="steps-grid">
            <article><span className="step-number">01</span><div className="step-symbol">⌕</div><h3>Pick your path</h3><p>Find a course that matches where you want to go.</p></article>
            <article><span className="step-number">02</span><div className="step-symbol">↗</div><h3>Save your seat</h3><p>Choose your batch and share a few details.</p></article>
            <article><span className="step-number">03</span><div className="step-symbol">✦</div><h3>Start learning</h3><p>Show up curious. Leave a little more capable.</p></article>
          </div>
        </section>

        <section className="enroll-section" id="enroll">
          <div className="enroll-intro">
            <span className="section-eyebrow">YOUR FUTURE IS CALLING</span>
            <h2>Make room for <em>what’s next.</em></h2>
            <p>Complete the form to reserve your place. It only takes a minute.</p>
          </div>
          <div className="enrollment-layout">
            <EnrollmentForm form={form} onChange={updateField} onSubmit={submitEnrollment} />
            <aside className="enrollment-aside">
              <CourseDetails course={selectedCourse} />
              <EnrollmentSummary
                course={selectedCourse}
                couponCode={couponCode}
                discountPercent={discountPercent}
                couponMessage={couponMessage}
                onCouponChange={setCouponCode}
                onApplyCoupon={applyCoupon}
              />
            </aside>
          </div>
        </section>

        <EnrollmentHistory
          enrollments={enrollments}
          onClear={() => setEnrollments([])}
        />
      </main>
      <Footer />
      {storageError && <p className="storage-warning" role="status">{storageError}</p>}
      {confirmation && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setConfirmation('');
        }}>
          <section className="confirmation-modal" role="dialog" aria-modal="true" aria-labelledby="confirmation-title">
            <button className="modal-close" type="button" onClick={() => setConfirmation('')} aria-label="Close confirmation">×</button>
            <span className="confirmation-mark" aria-hidden="true">✓</span>
            <span className="section-eyebrow">YOU’RE ON YOUR WAY</span>
            <h2 id="confirmation-title">You’re enrolled!</h2>
            <p>Your course seat has been reserved. Keep this reference for your records.</p>
            <div className="confirmation-id"><span>ENROLLMENT ID</span><strong>{confirmation}</strong></div>
            <button className="submit-button" type="button" onClick={() => {
              setConfirmation('');
              document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' });
            }}>View my enrollments <span aria-hidden="true">→</span></button>
          </section>
        </div>
      )}
    </div>
  );
}
