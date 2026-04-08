import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Full-screen slide-based container
 * Each child becomes a full-viewport slide with smooth transitions,
 * dot navigation, keyboard arrows, and mousewheel/trackpad support.
 */

const SLIDE_LABELS = ["Home", "About", "Services", "Properties", "Contact"];

const styles = `
  /* ─── Slide Container ─── */
  .slide-viewport {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .slide-track {
    display: flex;
    flex-direction: column;
    transition: transform 0.8s cubic-bezier(0.65, 0, 0.35, 1);
    will-change: transform;
  }

  .slide-panel {
    width: 100%;
    height: 100vh;
    flex-shrink: 0;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }

  /* Hide scrollbar inside slides for cleaner look */
  .slide-panel::-webkit-scrollbar { width: 4px; }
  .slide-panel::-webkit-scrollbar-track { background: transparent; }
  .slide-panel::-webkit-scrollbar-thumb { background: hsla(9,100%,62%,0.3); border-radius: 2px; }

  /* ─── Dot Navigation ─── */
  .slide-dots {
    position: fixed;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 999;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-items: center;
  }

  .slide-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.5);
    background: transparent;
    cursor: pointer;
    transition: all 0.35s ease;
    position: relative;
  }

  .slide-dot:hover {
    border-color: hsl(9,100%,62%);
    transform: scale(1.3);
  }

  .slide-dot.active {
    background: hsl(9,100%,62%);
    border-color: hsl(9,100%,62%);
    box-shadow: 0 0 12px hsla(9,100%,62%,0.5);
    transform: scale(1.2);
  }

  .slide-dot-label {
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    background: hsl(227,29%,18%);
    color: white;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, right 0.2s ease;
  }

  .slide-dot:hover .slide-dot-label {
    opacity: 1;
    right: 28px;
  }

  /* ─── Slide Counter ─── */
  .slide-counter {
    position: fixed;
    bottom: 28px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(0,0,0,0.35);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 8px 20px;
  }

  .slide-counter-num {
    font-size: 0.78rem;
    font-weight: 700;
    color: white;
    letter-spacing: 1px;
  }

  .slide-counter-bar {
    width: 80px;
    height: 3px;
    background: rgba(255,255,255,0.2);
    border-radius: 2px;
    overflow: hidden;
  }

  .slide-counter-progress {
    height: 100%;
    background: hsl(9,100%,62%);
    border-radius: 2px;
    transition: width 0.8s cubic-bezier(0.65,0,0.35,1);
  }

  /* ─── Arrow Buttons ─── */
  .slide-arrows {
    position: fixed;
    bottom: 28px;
    right: 24px;
    z-index: 999;
    display: flex;
    gap: 8px;
  }

  .slide-arrow {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,0.25);
    background: rgba(0,0,0,0.25);
    backdrop-filter: blur(12px);
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s ease;
  }

  .slide-arrow:hover:not(:disabled) {
    background: hsl(9,100%,62%);
    border-color: hsl(9,100%,62%);
    transform: scale(1.1);
  }

  .slide-arrow:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  /* Dark dots for light-bg slides */
  .slide-dots.light-slide .slide-dot {
    border-color: rgba(30,30,60,0.35);
  }
  .slide-dots.light-slide .slide-dot.active {
    border-color: hsl(9,100%,62%);
    background: hsl(9,100%,62%);
  }

  @media (max-width: 768px) {
    .slide-dots { right: 10px; gap: 10px; }
    .slide-dot { width: 10px; height: 10px; }
    .slide-dot-label { display: none; }
    .slide-arrows { display: none; }
    .slide-counter { padding: 6px 14px; }
  }
`;

// Slides with light backgrounds (for dot color adjustment)
const LIGHT_SLIDES = [1, 3, 4]; // About, Properties, Contact

function SlideContainer({ children, activeSlide, onSlideChange }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const lastWheelTime = useRef(0);
  const touchStartY = useRef(0);
  const totalSlides = Array.isArray(children) ? children.length : 1;

  const goToSlide = useCallback((index) => {
    if (isAnimating || index < 0 || index >= totalSlides || index === activeSlide) return;
    setIsAnimating(true);
    onSlideChange(index);
    setTimeout(() => setIsAnimating(false), 900);
  }, [isAnimating, totalSlides, activeSlide, onSlideChange]);

  const goNext = useCallback(() => goToSlide(activeSlide + 1), [activeSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(activeSlide - 1), [activeSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); goNext(); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  // Mousewheel / trackpad
  useEffect(() => {
    const handler = (e) => {
      const now = Date.now();
      if (now - lastWheelTime.current < 1000) return;

      // Check if the current slide panel has inner scroll
      const panels = containerRef.current?.querySelectorAll('.slide-panel');
      const currentPanel = panels?.[activeSlide];
      if (currentPanel) {
        const { scrollTop, scrollHeight, clientHeight } = currentPanel;
        const atTop = scrollTop <= 5;
        const atBottom = scrollTop + clientHeight >= scrollHeight - 5;

        // Only navigate if content is at boundary
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }

      if (Math.abs(e.deltaY) > 30) {
        lastWheelTime.current = now;
        if (e.deltaY > 0) goNext();
        else goPrev();
      }
    };
    const el = containerRef.current;
    if (el) el.addEventListener("wheel", handler, { passive: true });
    return () => { if (el) el.removeEventListener("wheel", handler); };
  }, [goNext, goPrev, activeSlide]);

  // Touch support (mobile swipe)
  useEffect(() => {
    const el = containerRef.current;
    const touchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const touchEnd = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 60) {
        if (diff > 0) goNext();
        else goPrev();
      }
    };
    if (el) {
      el.addEventListener("touchstart", touchStart, { passive: true });
      el.addEventListener("touchend", touchEnd, { passive: true });
    }
    return () => {
      if (el) {
        el.removeEventListener("touchstart", touchStart);
        el.removeEventListener("touchend", touchEnd);
      }
    };
  }, [goNext, goPrev]);

  const isLightSlide = LIGHT_SLIDES.includes(activeSlide);
  const progressWidth = ((activeSlide + 1) / totalSlides) * 100;

  return (
    <>
      <style>{styles}</style>
      <div className="slide-viewport" ref={containerRef}>
        <div
          className="slide-track"
          style={{ transform: `translateY(-${activeSlide * 100}vh)` }}
        >
          {Array.isArray(children) ? children.map((child, i) => (
            <div className="slide-panel" key={i} data-slide={i}>
              {child}
            </div>
          )) : (
            <div className="slide-panel">{children}</div>
          )}
        </div>
      </div>

      {/* Dot Navigation */}
      <div className={`slide-dots ${isLightSlide ? 'light-slide' : ''}`}>
        {Array.from({ length: totalSlides }).map((_, i) => (
          <button
            key={i}
            className={`slide-dot ${activeSlide === i ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Go to ${SLIDE_LABELS[i] || `slide ${i + 1}`}`}
          >
            <span className="slide-dot-label">{SLIDE_LABELS[i] || `Slide ${i + 1}`}</span>
          </button>
        ))}
      </div>

      {/* Bottom Counter */}
      <div className="slide-counter">
        <span className="slide-counter-num">
          {String(activeSlide + 1).padStart(2, '0')}
        </span>
        <div className="slide-counter-bar">
          <div className="slide-counter-progress" style={{ width: `${progressWidth}%` }} />
        </div>
        <span className="slide-counter-num">
          {String(totalSlides).padStart(2, '0')}
        </span>
      </div>

      {/* Arrow Buttons */}
      <div className="slide-arrows">
        <button className="slide-arrow" onClick={goPrev} disabled={activeSlide === 0} aria-label="Previous slide">
          ↑
        </button>
        <button className="slide-arrow" onClick={goNext} disabled={activeSlide === totalSlides - 1} aria-label="Next slide">
          ↓
        </button>
      </div>
    </>
  );
}

export default SlideContainer;
