import React, { useEffect, useRef } from 'react';

export const SakralEcoBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let W = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let H = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    const DOT_COUNT = 45;
    const LINK_DIST = 175;
    const COLORS = [
      '0, 177, 89',   // SAKRAL / MENOKEN Forest Green
      '52, 211, 153', // Emerald Light
      '6, 182, 212',  // Noken Cyan
      '245, 158, 11'  // Golden Amber Adat
    ];

    const dots = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 1.2,
        color: COLORS[i % COLORS.length],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02
      });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      W = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      H = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, W, H);

      // Update positions
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        d.x += d.vx;
        d.y += d.vy;
        d.pulse += d.pulseSpeed;

        if (d.x < 0 || d.x > W) d.vx *= -1;
        if (d.y < 0 || d.y > H) d.vy *= -1;
      }

      // Draw connections & ecological mesh triangles (SAKRAL Algorithm)
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= LINK_DIST) continue;

          const lineAlpha = (1 - dist / LINK_DIST) * 0.35;
          ctx.strokeStyle = `rgba(${a.color}, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();

          // Faint connecting ecological triangle
          for (let k = j + 1; k < dots.length; k++) {
            const c = dots[k];
            const dAC = Math.hypot(a.x - c.x, a.y - c.y);
            if (dAC >= LINK_DIST) continue;
            const dBC = Math.hypot(b.x - c.x, b.y - c.y);
            if (dBC >= LINK_DIST) continue;

            const triAlpha = (1 - (dist + dAC + dBC) / (LINK_DIST * 3)) * 0.07;
            if (triAlpha > 0) {
              ctx.fillStyle = `rgba(${a.color}, ${triAlpha})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.lineTo(c.x, c.y);
              ctx.closePath();
              ctx.fill();
            }
          }
        }
      }

      // Draw glowing nodes
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const currentR = d.r + Math.sin(d.pulse) * 0.8;
        ctx.fillStyle = `rgb(${d.color})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(0.8, currentR), 0, Math.PI * 2);
        ctx.fill();

        // Halo glow
        ctx.fillStyle = `rgba(${d.color}, 0.25)`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, Math.max(1.8, currentR * 2.2), 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 0. Panoramic Misty Papuan Rainforest Canopy (Authentic Papua Wisdom Backdrop) */}
      <div className="absolute top-0 inset-x-0 h-[520px] sm:h-[640px] md:h-[720px] overflow-hidden opacity-25 mix-blend-screen pointer-events-none">
        <img
          src="/papua_misty_rainforest.png"
          alt="Hutan Hujan Tropis Papua Berkabut"
          className="w-full h-full object-cover object-center scale-105 filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02180e]/40 via-[#02180e]/75 to-[#02180e]" />
      </div>

      {/* 1. Deep Ecological Glow Orbs (Sakral Style) */}
      <div className="absolute -top-32 -left-20 h-[36rem] w-[36rem] rounded-full bg-[#00b159]/15 blur-[160px]" />
      <div className="absolute top-1/3 -right-20 h-[34rem] w-[34rem] rounded-full bg-cyan-600/15 blur-[160px]" />
      <div className="absolute bottom-10 left-1/3 h-[38rem] w-[38rem] rounded-full bg-amber-500/10 blur-[170px]" />

      {/* 2. Topographic / Matrix Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,177,89,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,177,89,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-70" />

      {/* 3. Sakral Living Ecological Particle Mesh Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* 4. Twinkle Fireflies (Kunang-Kunang Hutan Adat Papua) */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { left: '8%', top: '15%', dur: '3.2s', delay: '0.1s' },
          { left: '19%', top: '38%', dur: '4.2s', delay: '1.4s' },
          { left: '28%', top: '12%', dur: '2.8s', delay: '0.6s' },
          { left: '35%', top: '64%', dur: '3.9s', delay: '2.1s' },
          { left: '46%', top: '25%', dur: '3.5s', delay: '0.9s' },
          { left: '62%', top: '18%', dur: '4.5s', delay: '1.8s' },
          { left: '74%', top: '52%', dur: '3.1s', delay: '0.4s' },
          { left: '85%', top: '22%', dur: '4.0s', delay: '1.2s' },
          { left: '92%', top: '70%', dur: '3.6s', delay: '2.5s' }
        ].map((f, idx) => (
          <span
            key={idx}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-ping opacity-60"
            style={{
              left: f.left,
              top: f.top,
              animationDuration: f.dur,
              animationDelay: f.delay
            }}
          />
        ))}
      </div>
    </div>
  );
};
