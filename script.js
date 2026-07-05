// Gentle upward-floating hearts — canvas based, runs continuously and lightly.
(function () {
  const canvas = document.getElementById('hearts-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let hearts = [];

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const colors = [
    'rgba(255, 255, 255, 0.9)',   // jasmine white
    'rgba(255, 214, 224, 0.85)',  // soft pink
    'rgba(214, 178, 106, 0.75)',  // gold
    'rgba(232, 220, 198, 0.85)'   // ivory
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawHeart(x, y, size, rotation, color, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, size * 0.6, 0, size * 0.8, 0, size);
    ctx.bezierCurveTo(0, size * 0.8, size / 2, size * 0.6, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function spawnHeart() {
    hearts.push({
      x: Math.random() * width,
      y: height + 30,
      size: 8 + Math.random() * 14,
      speed: 0.25 + Math.random() * 0.5,       // slow rise
      drift: (Math.random() - 0.5) * 0.35,     // gentle side sway
      driftPhase: Math.random() * Math.PI * 2,
      rotation: (Math.random() - 0.5) * 0.6,
      rotSpeed: (Math.random() - 0.5) * 0.01,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: height / (0.25 + Math.random() * 0.5) + 200,
      baseOpacity: 0.5 + Math.random() * 0.4
    });
  }

  let lastSpawn = 0;
  const spawnInterval = 550; // ms between new hearts -> gentle density

  function animate(timestamp) {
    ctx.clearRect(0, 0, width, height);

    if (timestamp - lastSpawn > spawnInterval) {
      spawnHeart();
      lastSpawn = timestamp;
    }

    hearts.forEach((h) => {
      h.life += 1;
      h.y -= h.speed;
      h.x += Math.sin(h.life * 0.02 + h.driftPhase) * h.drift;
      h.rotation += h.rotSpeed;

      // fade in, fade out near top
      let opacity = h.baseOpacity;
      const fadeZone = 120;
      if (h.y > height - fadeZone) {
        opacity *= (height - h.y) / fadeZone;
      } else if (h.y < fadeZone) {
        opacity *= h.y / fadeZone;
      }
      opacity = Math.max(0, Math.min(h.baseOpacity, opacity));

      drawHeart(h.x, h.y, h.size, h.rotation, h.color, opacity);
    });

    hearts = hearts.filter(h => h.y > -50);

    requestAnimationFrame(animate);
  }

  if (!reduceMotion) {
    requestAnimationFrame(animate);
  } else {
    // Minimal static state for reduced-motion users: a few faint hearts, no animation loop.
    for (let i = 0; i < 8; i++) {
      spawnHeart();
      hearts[hearts.length - 1].y = Math.random() * height;
    }
    ctx.clearRect(0, 0, width, height);
    hearts.forEach(h => drawHeart(h.x, h.y, h.size, h.rotation, h.color, h.baseOpacity * 0.6));
  }
})();
