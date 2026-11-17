import '../styles/Navbar.css';

export default function Navbar({ enrollmentCount }) {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <a className="brand" href="#home" aria-label="LearnHub home">
          <span className="brand-mark" aria-hidden="true">L</span>
          <span className="brand-copy">
            <strong>learnhub</strong>
            <small>LEARN · GROW · ACHIEVE</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#courses">Explore courses</a>
          <a href="#how-it-works">How it works</a>
          <a href="#enroll">Enrollment</a>
        </nav>
        <a className="nav-history-link" href="#history">
          My enrollments <span>{enrollmentCount}</span>
        </a>
      </div>
    </header>
  );
}
