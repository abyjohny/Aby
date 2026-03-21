import { useState, type FormEvent } from 'react';
import {
  ArrowUp, Star, Github, Linkedin, Mail, Phone, MapPin,
  Code, Brain, Database, Settings, HeartPulse,
  Briefcase, GraduationCap, Award, BarChart3, MessageSquare,
  Sparkles, Bot, Cpu
} from 'lucide-react';
import { useReveal, useScrolled } from './hooks';
import { Scene3D, ClaimLensScene, CrewAIScene, HandSignScene, BatteryScene } from './Scenes3D';
import ParticleBg from './ParticleBg';

/* ── Tiny reveal wrapper ── */
function Rv({ dir = 'up', children, className = '' }: {
  dir?: 'up' | 'left' | 'right' | 'scale'; children: React.ReactNode; className?: string;
}) {
  const cls = dir === 'up' ? 'rv' : dir === 'left' ? 'rv-left' : dir === 'right' ? 'rv-right' : 'rv-scale';
  const { ref, visible } = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`${cls}${visible ? ' vis' : ''} ${className}`}>{children}</div>;
}

/* ── Smooth scroll helper ── */
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
}

/* ════════════════════════════════════════
   APP
   ════════════════════════════════════════ */
export default function App() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const showTop = useScrolled(600);

  const navClick = (id: string) => { scrollTo(id); setMenuOpen(false); };

  return (
    <>
      {/* ═══ PARTICLE BACKGROUND ═══ */}
      <ParticleBg />

      {/* ═══ NAV ═══ */}
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="#" className="nav-name" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            aby<em>johny</em>
          </a>
          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            <a href="#about" onClick={e => { e.preventDefault(); navClick('about'); }}>About</a>
            <a href="#skills" onClick={e => { e.preventDefault(); navClick('skills'); }}>Skills</a>
            <a href="#work" onClick={e => { e.preventDefault(); navClick('work'); }}>Work</a>
            <a href="#journey" onClick={e => { e.preventDefault(); navClick('journey'); }}>Journey</a>
            <a href="./assets/Aby_Johny_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Resume</a>
            <a href="#contact" className="cta" onClick={e => { e.preventDefault(); navClick('contact'); }}>Let's Talk</a>
          </div>
          <button className={`hamburger${menuOpen ? ' active' : ''}`} aria-label="Menu" onClick={() => setMenuOpen(v => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <main>
      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero">
        <div className="hero-grid">
          <div className="hero-main">
            <Rv><div className="hero-eyebrow">AI &amp; Data Science Engineer</div></Rv>
            <Rv>
              <h1 className="hero-h1">
                I build<br /><em>healthcare</em><br />infrastructure.
              </h1>
            </Rv>
            <Rv>
              <p className="hero-sub">
                From multi-agent AI systems to production-grade hospital insurance platforms — I architect software at the intersection of medicine and technology.
              </p>
            </Rv>
            <Rv>
              <div className="hero-actions">
                <a href="#work" className="btn btn-fill" onClick={e => { e.preventDefault(); scrollTo('work'); }}>View My Work →</a>
                {/* Placeholder link for the Resume PDF */}
                <a href="./assets/Aby_Johny_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Download Resume</a>
              </div>
            </Rv>
          </div>


          <Rv dir="right">
            <div className="hero-photo-card">
              <img src={import.meta.env.BASE_URL + "profile.png"} alt="Aby Johny" />
              <div className="photo-label">
                <div className="pl-name">Aby Johny</div>
                <div className="pl-role">Healthcare Software Engineer</div>
              </div>
            </div>
          </Rv>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="section" id="about">
        <div className="wrap">
          <div className="sec-header">
            <Rv>
              <div className="sec-eyebrow">01 — About</div>
              <h2 className="sec-title">Not your<br /><em>typical</em> dev.</h2>
            </Rv>
            <Rv className="sec-desc">
              I don't just write code. I understand the problem space — healthcare regulations, medical terminologies, insurance workflows — and build systems that actually work in production.
            </Rv>
          </div>

          <div className="about-layout">
            <Rv dir="left">
              <blockquote className="about-quote">
                "I believe the best software comes from deeply understanding the domain you're building for."
              </blockquote>
              <div className="about-text">
                <p>
                  AI & Data Science graduate building production-grade healthcare infrastructure in India. Currently architecting ClaimsLens — an ABDM-compliant HIP platform implementing FHIR R4 across the full insurance claim lifecycle, from consent management to NHCX submission. I work at the intersection of complex compliance requirements and real engineering constraints.
                </p>
              </div>
            </Rv>

            <Rv dir="right">
              <div className="about-meta">
                {[
                  { n: '2024', l: 'B.Tech Graduated' },
                  { n: '8+', l: 'Technologies' },
                  { n: '6', l: 'Certifications' },
                  { n: '4+', l: 'Projects Shipped' },
                ].map(s => (
                  <div className="meta-item" key={s.l}>
                    <div className="meta-number">{s.n}</div>
                    <div className="meta-label">{s.l}</div>
                  </div>
                ))}
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section className="section" id="skills">
        <div className="wrap">
          <div className="sec-header">
            <Rv>
              <div className="sec-eyebrow">02 — Capabilities</div>
              <h2 className="sec-title">What I <em>work</em> with.</h2>
            </Rv>
            <Rv className="sec-desc">
              Not just a list of buzzwords — these are tools I've used to build real, deployed systems.
            </Rv>
          </div>

          <div className="skills-grid">
            <Rv dir="scale" className="skill-cell">
              <h3><Database size={20} className="skill-icon" aria-hidden="true" /> Backend</h3>
              <div className="pill-wrap">
                {['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Celery', 'Pydantic v2', 'REST APIs'].map(s => <span className="pill" key={s}>{s}</span>)}
              </div>
            </Rv>

            <Rv dir="scale" className="skill-cell">
              <h3><HeartPulse size={20} className="skill-icon" aria-hidden="true" /> Healthcare / ABDM</h3>
              <div className="pill-wrap">
                {['FHIR R4', 'ABDM HIP/HIU flows', 'NRCES IG', 'NHCX', 'Consent Management', 'SNOMED CT', 'ICD-10', 'LOINC'].map(s => <span className="pill green" key={s}>{s}</span>)}
              </div>
            </Rv>

            <Rv dir="scale" className="skill-cell">
              <h3><Settings size={20} className="skill-icon" aria-hidden="true" /> Cloud & DevOps</h3>
              <div className="pill-wrap">
                {['Azure (Blob Storage, Key Vault, Managed Identity)', 'GitHub Actions', 'Docker', 'OIDC'].map(s => <span className="pill" key={s}>{s}</span>)}
              </div>
            </Rv>

            <Rv dir="scale" className="skill-cell">
              <h3><Code size={20} className="skill-icon" aria-hidden="true" /> Frontend</h3>
              <div className="pill-wrap">
                {['React', 'TypeScript', 'Vite'].map(s => <span className="pill" key={s}>{s}</span>)}
              </div>
            </Rv>

            <Rv dir="scale" className="skill-cell learning">
              <h3><Brain size={20} className="skill-icon" aria-hidden="true" /> Currently Learning</h3>
              <div className="pill-wrap">
                {['ABDM M2/M3 certification flows', 'SNOMED CSNOtk', 'LOINC toolkit'].map(s => <span className="pill" key={s}>{s}</span>)}
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section className="section" id="work">
        <div className="wrap">
          <div className="sec-header">
            <Rv>
              <div className="sec-eyebrow">03 — Selected Work</div>
              <h2 className="sec-title">Things I've <em>built.</em></h2>
            </Rv>
            <Rv className="sec-desc">
              Real projects — from production healthcare platforms to AI-powered diagnostic systems.
            </Rv>
          </div>

          <div className="proj-list">
            {/* ClaimLens */}
            <div className="proj-item featured-proj">
              <Rv dir="left">
                <div className="proj-visual" aria-hidden="true">
                  <Scene3D><ClaimLensScene /></Scene3D>
                  <div className="proj-badge"><Star size={12} aria-hidden="true" /> Featured Project</div>
                  <div className="proj-number" aria-hidden="true">01</div>
                </div>
              </Rv>
              <Rv dir="right" className="proj-info">
                <div className="proj-label">NHCX Digitization · Full-Stack · Production</div>
                <h3>ClaimsLens — ABDM HIP Platform</h3>
                <p className="proj-desc">
                  ClaimsLens is an ABDM-certified Health Information Provider (HIP) platform built for insurance claim digitization via NHCX. I architected and built the full backend — FHIR R4 bundle generation for all HI types (Discharge Summary, OPConsult, Diagnostic Report, Prescription, Immunization), ABDM consent lifecycle (grant/revoke/expire with Celery jobs), AES-256-GCM document encryption on Azure Blob Storage, and ECDH-based data push to Health Information Users. Stack: FastAPI, PostgreSQL, SQLAlchemy, Celery, React, Azure. ABDM M1 certification in progress.
                </p>
                <div className="proj-tech-pills">
                  {['FastAPI', 'React', 'PostgreSQL', 'Celery', 'Azure', 'FHIR R4'].map(t => <span key={t}>{t}</span>)}
                </div>
              </Rv>
            </div>

            {/* Crew AI */}
            <div className="proj-item reverse">
              <Rv dir="right">
                <div className="proj-visual">
                  <Scene3D><CrewAIScene /></Scene3D>
                  <div className="proj-number">02</div>
                </div>
              </Rv>
              <Rv dir="left" className="proj-info">
                <div className="proj-label">AI Agents · Automation · LLMs</div>
                <h3>Multi-Agent Task Automation</h3>
                <p className="proj-desc">
                  Orchestrated multiple AI agents using the Crew AI framework for automated task execution — defining agent roles, workflows, and communication protocols. Integrated external APIs for real-time data retrieval with sequential and parallel task pipelines.
                </p>
                <div className="proj-tech-pills">
                  {['Crew AI', 'Python', 'REST APIs', 'LLMs'].map(t => <span key={t}>{t}</span>)}
                </div>
              </Rv>
            </div>

            {/* Hand Sign */}
            <div className="proj-item">
              <Rv dir="left">
                <div className="proj-visual">
                  <Scene3D><HandSignScene /></Scene3D>
                  <div className="proj-number">03</div>
                </div>
              </Rv>
              <Rv dir="right" className="proj-info">
                <div className="proj-label">Computer Vision · Deep Learning</div>
                <h3>Hand Sign Recognition System</h3>
                <p className="proj-desc">
                  Real-time A–Z alphabet sign recognition using Convolutional Neural Networks. Trained on diverse datasets for robust gesture classification with live camera tracking for seamless identification.
                </p>
                <div className="proj-tech-pills">
                  {['Python', 'OpenCV', 'TensorFlow', 'CNN'].map(t => <span key={t}>{t}</span>)}
                </div>
              </Rv>
            </div>

            {/* Battery */}
            <div className="proj-item reverse">
              <Rv dir="right">
                <div className="proj-visual">
                  <Scene3D><BatteryScene /></Scene3D>
                  <div className="proj-number">04</div>
                </div>
              </Rv>
              <Rv dir="left" className="proj-info">
                <div className="proj-label">Predictive Analytics · IoT</div>
                <h3>AI Battery Fault Prediction</h3>
                <p className="proj-desc">
                  Predictive maintenance system for vehicle batteries using ML algorithms. Real-time monitoring and diagnostics that achieve high-accuracy fault detection, reducing unexpected failures and maintenance costs.
                </p>
                <div className="proj-tech-pills">
                  {['Python', 'scikit-learn', 'Data Analysis'].map(t => <span key={t}>{t}</span>)}
                </div>
              </Rv>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ JOURNEY ═══ */}
      <section className="section" id="journey">
        <div className="wrap">
          <div className="sec-header">
            <Rv>
              <div className="sec-eyebrow">04 — Journey</div>
              <h2 className="sec-title">Where I've <em>been.</em></h2>
            </Rv>
            <Rv className="sec-desc">
              Experience and education that shaped the way I think about software.
            </Rv>
          </div>

          <div className="journey-cols">
            <Rv dir="left">
              <div className="journey-col-title">
                <span className="jct-icon"><Briefcase size={16} /></span> Experience
              </div>
              <div className="j-item">
                <div className="j-date">2025 — Present</div>
                <div className="j-title">Software Developer Intern</div>
                <div className="j-place">RecodeAI Solutions</div>
                <div className="j-desc">Building ClaimsLens — a production hospital insurance management platform. FHIR/HL7, ABDM/ABHA, SNOMED CT, role-based dashboards, FastAPI, React, PostgreSQL, Docker, Azure.</div>
              </div>
              <div className="j-item">
                <div className="j-date">Jul 2024 — May 2025</div>
                <div className="j-title">Java Full Stack Development</div>
                <div className="j-place">JSpiders, Kochi</div>
                <div className="j-desc">Core Java, OOPs, Advanced Java. Frontend with HTML/CSS/JS. SQL for relational databases. Enterprise development patterns.</div>
              </div>
              <div className="j-item">
                <div className="j-date">2024</div>
                <div className="j-title">Data Science Intern</div>
                <div className="j-place">Teachnook, Online</div>
                <div className="j-desc">ML algorithms, data visualization, and data science methodologies.</div>
              </div>
            </Rv>

            <Rv dir="right">
              <div className="journey-col-title">
                <span className="jct-icon"><GraduationCap size={16} /></span> Education
              </div>
              <div className="j-item">
                <div className="j-date">Aug 2020 — May 2024</div>
                <div className="j-title">B.Tech in AI &amp; Data Science</div>
                <div className="j-place">Viswajyothi College, Vazhakulam</div>
                <div className="j-desc">Specialized in AI &amp; Data Science. Class representative. Built ML and AI projects throughout the program.</div>
              </div>
              <div className="j-item">
                <div className="j-date">Jul 2018 — Jun 2020</div>
                <div className="j-title">Higher Secondary</div>
                <div className="j-place">St. Stephens H.S.S, Keerampara</div>
                <div className="j-desc">Science and Mathematics focus.</div>
              </div>
            </Rv>
          </div>

          {/* Certifications */}
          <div style={{ marginTop: 80 }}>
            <Rv>
              <div className="sec-eyebrow">Certifications</div>
              <h2 className="sec-title" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', marginBottom: 32 }}>
                Professional <em>credentials.</em>
              </h2>
            </Rv>
            <div className="cert-list">
              {[
                { icon: <Bot size={16} />, name: 'Generative Models for Developers', issuer: 'Infosys Springboard · 2024' },
                { icon: <BarChart3 size={16} />, name: 'Data Visualization using Python', issuer: 'Infosys Springboard · 2024' },
                { icon: <Award size={16} />, name: 'Tableau Desktop Specialist', issuer: 'Infosys Springboard · 2024' },
                { icon: <MessageSquare size={16} />, name: 'Prompt Engineering', issuer: 'Infosys Springboard · 2024' },
                { icon: <Sparkles size={16} />, name: 'Introduction to OpenAI GPT Models', issuer: 'Infosys Springboard · 2024' },
                { icon: <Cpu size={16} />, name: 'Tableau in 7 Steps', issuer: 'Infosys Springboard · 2024' },
              ].map(c => (
                <Rv key={c.name}>
                  <div className="cert-item">
                    <div className="cert-icon">{c.icon}</div>
                    <div>
                      <div className="cert-name">{c.name}</div>
                      <div className="cert-issuer">{c.issuer}</div>
                    </div>
                  </div>
                </Rv>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="section" id="contact">
        <div className="wrap">
          <div className="contact-split">
            <Rv dir="left">
              <h2 className="contact-headline">Let's build<br />something<br /><em>together.</em></h2>
              <p className="contact-text">
                Whether you're looking for a developer who understands healthcare infrastructure, or you have an AI problem worth solving — I'd love to hear from you.
              </p>
              <div className="contact-links">
                <a href="mailto:abyjohny25@gmail.com" className="contact-link">
                  <div className="cl-icon"><Mail size={18} /></div>
                  <div><div className="cl-label">Email</div><div className="cl-value">abyjohny25@gmail.com</div></div>
                </a>
                <a href="tel:+917902644841" className="contact-link">
                  <div className="cl-icon"><Phone size={18} /></div>
                  <div><div className="cl-label">Phone</div><div className="cl-value">+91 7902644841</div></div>
                </a>
                <a href="https://github.com/abyjohny" target="_blank" rel="noopener" className="contact-link">
                  <div className="cl-icon"><Github size={18} /></div>
                  <div><div className="cl-label">GitHub</div><div className="cl-value">github.com/abyjohny</div></div>
                </a>
                <div className="contact-link" style={{ cursor: 'default' }}>
                  <div className="cl-icon"><MapPin size={18} /></div>
                  <div><div className="cl-label">Location</div><div className="cl-value">Kothamangalam, Ernakulam</div></div>
                </div>
              </div>
            </Rv>

            <Rv dir="right">
              <ContactForm />
            </Rv>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="wrap">
          <div className="footer-inner">
            <div className="footer-copy">© 2025 Aby Johny</div>
            <div className="footer-links">
              <a href="https://github.com/abyjohny" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a href="https://linkedin.com/in/abyjohny" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="mailto:abyjohny25@gmail.com" aria-label="Email"><Mail size={18} /></a>
            </div>
          </div>
        </div>
      </footer>
      </main>

      {/* Scroll to top */}
      <button className={`to-top${showTop ? ' show' : ''}`} aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <ArrowUp size={20} />
      </button>
    </>
  );
}

/* ── Contact Form ── */
function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(() => { setSent(true); form.reset(); setTimeout(() => setSent(false), 4000); })
      .catch(() => alert('Failed to send. Please email me directly.'));
  };

  return (
    <form className="contact-form" action="https://formspree.io/f/xpznqkjq" method="POST" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" name="email" placeholder="john@example.com" required />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Let's collaborate on..." />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Tell me about your project…" required />
      </div>
      <button type="submit" className="btn btn-fill" style={{ width: 'fit-content' }}>
        {sent ? '✓ Sent!' : 'Send Message →'}
      </button>
    </form>
  );
}
