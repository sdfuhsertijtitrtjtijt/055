export default function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-brand" href="#home">learnhub<span>.</span></a>
      <p>Small steps today. Big possibilities tomorrow.</p>
      <small>© {new Date().getFullYear()} LearnHub · Student learning project</small>
    </footer>
  );
}
