<<<<<<< HEAD
import React, { useRef, useState, useEffect } from 'react';
import { useSky } from '../../context/SkyContext';
import { PlanetDesign } from '../../types/celestial';
import { X, Sparkles, RefreshCw, Disc, ArrowRight } from 'lucide-react';

const PLANET_PALETTE = [
  '#f97316', // Orange
  '#ef4444', // Red
  '#eab308', // Yellow
  '#3b82f6', // Blue
  '#06b6d4', // Cyan
  '#a855f7', // Purple
  '#ec4899', // Pink
  '#10b981', // Emerald
  '#64748b', // Slate
  '#ffffff'  // White
];

interface PlanetDesignerModalProps {
  onCompleteDesign?: (design: PlanetDesign) => void;
}

export const PlanetDesignerModal: React.FC<PlanetDesignerModalProps> = ({ onCompleteDesign }) => {
  const { activeModal, setActiveModal, accentColor } = useSky();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#f97316');
  const [brushSize, setBrushSize] = useState(24);
  const [hasRings, setHasRings] = useState(true);
  const [planetAccentColor, setPlanetAccentColor] = useState(accentColor);

  // Initialize white circular canvas
  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
=======
import React, { useEffect, useRef, useState } from 'react';
import { useSky } from '../../context/SkyContext';
import { PlanetDesign } from '../../types/celestial';
import { X, Undo2, Eraser, ArrowRight, RotateCcw } from 'lucide-react';

const COLORS = ['#f97316', '#ef4444', '#facc15', '#38bdf8', '#4ade80', '#a855f7', '#ec4899', '#ffffff'];
const ACCENTS = ['#B89CFF', '#FF9FCB', '#73D4E7', '#FFB27D', '#A7E89B', '#FFE58A'];
type Brush = 'normal' | 'translucent' | 'sparkle' | 'blend';

interface PlanetDesignerModalProps { onCompleteDesign?: (design: PlanetDesign) => void; }

export const PlanetDesignerModal: React.FC<PlanetDesignerModalProps> = ({ onCompleteDesign }) => {
  const { activeModal, setActiveModal, accentColor } = useSky();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const history = useRef<ImageData[]>([]);
  const [brush, setBrush] = useState<Brush>('normal');
  const [color, setColor] = useState('#f97316');
  const [size, setSize] = useState(24);
  const [eraserSize, setEraserSize] = useState(28);
  const [eraser, setEraser] = useState(false);
  const [accent, setAccent] = useState(accentColor);
  const [hasRings, setHasRings] = useState(true);

  const planetPath = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.beginPath(); ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
  };
  const paintBase = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

>>>>>>> origin/main
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
<<<<<<< HEAD
    // Fill white
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    if (activeModal === 'planet-designer') {
      setTimeout(initCanvas, 50);
    }
  }, [activeModal]);

  if (activeModal !== 'planet-designer') return null;

  // Spray paint brush effect
  const sprayPaint = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const density = brushSize * 1.5;
    ctx.fillStyle = brushColor;

    ctx.save();
    // Clip to circular planet boundary
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
    ctx.clip();

    for (let i = 0; i < density; i++) {
      const offsetX = (Math.random() - 0.5) * brushSize * 2;
      const offsetY = (Math.random() - 0.5) * brushSize * 2;
      const dist = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
      if (dist <= brushSize) {
        const radius = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  };

  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const { x, y } = getCanvasCoords(e);
    sprayPaint(x, y);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const { x, y } = getCanvasCoords(e);
    sprayPaint(x, y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
  };

  const handleProceedToStory = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas ? canvas.toDataURL() : '';

    const design: PlanetDesign = {
      canvasDataUrl: dataUrl,
      hasRings,
      accentColor: planetAccentColor
    };

    // Stash in session / custom event or call handler
    if (onCompleteDesign) {
      onCompleteDesign(design);
    }
    // Transition to story studio
    setActiveModal('story-studio');
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content planet-designer-window animate-scale-in">
        {/* Header */}
        <div className="studio-header">
          <div>
            <div className="eyebrow">RELIVE A DAY · STEP 1</div>
            <h2>Planet Designer 🪐</h2>
            <p>Customize your planet canvas with spray paint, rings, and glowing accents.</p>
          </div>
          <button
            type="button"
            className="close-modal-btn"
            onClick={() => setActiveModal(null)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="planet-designer-body">
          {/* Controls Panel */}
          <div className="designer-tools-panel">
            {/* Color Palette */}
            <div className="designer-tool-section">
              <label className="input-label">Spray Paint Palette</label>
              <div className="color-palette-grid">
                {PLANET_PALETTE.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`palette-color-btn ${brushColor === c ? 'active' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setBrushColor(c)}
                    title={c}
                  />
                ))}
                <label className="custom-color-input-btn" title="Custom color picker">
                  <input
                    type="color"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                    className="hidden-color-input"
                  />
                  <span>+</span>
                </label>
              </div>
            </div>

            {/* Spray Brush Size */}
            <div className="designer-tool-section">
              <div className="label-with-val">
                <label className="input-label">Spray Brush Size</label>
                <span className="val-badge">{brushSize}px</span>
              </div>
              <input
                type="range"
                min={8}
                max={60}
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="size-slider full-width"
              />
            </div>

            {/* Planetary Rings Toggle */}
            <div className="designer-tool-section">
              <label className="input-label">Planetary Features</label>
              <label className="toggle-checkbox-row">
                <input
                  type="checkbox"
                  checked={hasRings}
                  onChange={(e) => setHasRings(e.target.checked)}
                />
                <span>Include Planetary Rings</span>
              </label>
            </div>

            {/* Accent Color (Controls Planet Glow & Ring Color) */}
            <div className="designer-tool-section">
              <label className="input-label">Planet Glow & Ring Accent</label>
              <div className="accent-color-row">
                {['#B89CFF', '#FF9FCB', '#73D4E7', '#FFB27D', '#A7E89B', '#FFE58A'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`color-dot-large ${planetAccentColor === c ? 'active' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setPlanetAccentColor(c)}
                  />
                ))}
                <label className="custom-color-input-btn" title="Custom accent color">
                  <input
                    type="color"
                    value={planetAccentColor}
                    onChange={(e) => setPlanetAccentColor(e.target.value)}
                    className="hidden-color-input"
                  />
                  <span>+</span>
                </label>
              </div>
            </div>

            {/* Clear / Reset Canvas */}
            <button
              type="button"
              className="secondary-action-btn"
              onClick={initCanvas}
            >
              <RefreshCw size={15} />
              <span>Reset Canvas</span>
            </button>
          </div>

          {/* Planet Circular Canvas Viewport */}
          <div className="designer-canvas-viewport">
            <div
              className="planet-render-wrapper"
              style={{
                boxShadow: `0 0 50px ${planetAccentColor}44, 0 0 100px ${planetAccentColor}22`
              }}
            >
              {/* Planetary Ring Preview */}
              {hasRings && (
                <div
                  className="planet-ring-preview"
                  style={{
                    borderColor: planetAccentColor,
                    boxShadow: `0 0 16px ${planetAccentColor}`
                  }}
                />
              )}

              {/* HTML5 Circular Canvas */}
              <canvas
                ref={canvasRef}
                width={280}
                height={280}
                className="circular-planet-canvas"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              />
            </div>
            <div className="canvas-helper-text">
              ✨ Click and drag over the planet to spray paint your custom world!
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="studio-footer">
          <span className="footer-info">
            Step 1 of 2: Design your planet world before authoring your story
          </span>
          <button
            type="button"
            className="continue-button"
            onClick={handleProceedToStory}
          >
            <span>Proceed to Story Studio</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
=======

    planetPath(ctx, canvas);
    ctx.fillStyle = '#fff';
    ctx.fill();

    history.current = [];
  };
  useEffect(() => { if (activeModal === 'planet-designer') setTimeout(paintBase, 40); }, [activeModal]);

  const snapshot = () => {
    const canvas = drawingCanvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      history.current.push(
        ctx.getImageData(0, 0, canvas.width, canvas.height)
      );
    }
  };
  const coords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = drawingCanvasRef.current!;
    const r = c.getBoundingClientRect();

    return {
      x: (e.clientX - r.left) * c.width / r.width,
      y: (e.clientY - r.top) * c.height / r.height
    };
  }; const draw = (x: number, y: number, moving: boolean) => {
    const c = drawingCanvasRef.current;
    if (!c) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    const radius = eraser ? eraserSize / 2 : size / 2;

    ctx.save();

    // Keep every brush inside the planet.
    planetPath(ctx, c);
    ctx.clip();

    // ─────────────────────────────────────────
    // ERASER
    // ─────────────────────────────────────────
    if (eraser) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      ctx.lineWidth = eraserSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (moving && lastPoint.current) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ─────────────────────────────────────────
    // NORMAL — smooth solid paint
    // ─────────────────────────────────────────
    else if (brush === 'normal') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (moving && lastPoint.current) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ─────────────────────────────────────────
    // TRANSLUCENT — soft transparent paint
    // ─────────────────────────────────────────
    else if (brush === 'translucent') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (moving && lastPoint.current) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    }

    // ─────────────────────────────────────────
    // SPARKLE — scattered tiny stars
    // ─────────────────────────────────────────
    else if (brush === 'sparkle') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;

      const count = moving ? 4 : 9;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius * 1.4;

        const px = x + Math.cos(angle) * distance;
        const py = y + Math.sin(angle) * distance;

        const dotSize = Math.max(
          1.5,
          size * (0.06 + Math.random() * 0.08)
        );

        ctx.beginPath();
        ctx.arc(px, py, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Small bright center
      ctx.beginPath();
      ctx.arc(x, y, Math.max(2, size / 10), 0, Math.PI * 2);
      ctx.fill();
    }

    // ─────────────────────────────────────────
    // BLEND — softly mixes nearby paint
    // ─────────────────────────────────────────
    else if (brush === 'blend') {
      const blendSize = Math.max(8, size);

      /*
       * We temporarily sample the drawing underneath the brush,
       * blur it slightly, then paint that blended result back.
       * This creates a soft local colour-mixing effect rather
       * than simply painting another colour on top.
       */

      const sampleSize = Math.ceil(blendSize * 1.5);
      const sx = Math.max(
        0,
        Math.min(c.width - sampleSize, x - sampleSize / 2)
      );
      const sy = Math.max(
        0,
        Math.min(c.height - sampleSize, y - sampleSize / 2)
      );

      const temp = document.createElement('canvas');
      temp.width = sampleSize;
      temp.height = sampleSize;

      const tempCtx = temp.getContext('2d');
      if (tempCtx) {
        tempCtx.drawImage(
          c,
          sx,
          sy,
          sampleSize,
          sampleSize,
          0,
          0,
          sampleSize,
          sampleSize
        );

        tempCtx.globalAlpha = 0.8;
        tempCtx.filter = `blur(${Math.max(2, blendSize / 7)}px)`;

        tempCtx.drawImage(
          temp,
          0,
          0,
          sampleSize,
          sampleSize
        );

        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.65;

        ctx.drawImage(
          temp,
          0,
          0,
          sampleSize,
          sampleSize,
          sx,
          sy,
          sampleSize,
          sampleSize
        );

        ctx.globalAlpha = 1;
      }
    }

    ctx.restore();

    lastPoint.current = { x, y };
  };
  const down = (e: React.PointerEvent<HTMLCanvasElement>) => { snapshot(); drawingRef.current = true; lastPoint.current = coords(e); draw(lastPoint.current.x, lastPoint.current.y, false); e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e: React.PointerEvent<HTMLCanvasElement>) => { if (drawingRef.current) { const p = coords(e); draw(p.x, p.y, true); } };
  const up = () => { drawingRef.current = false; lastPoint.current = null; };
  const undo = () => {
    const c = drawingCanvasRef.current;
    const ctx = c?.getContext('2d');
    const state = history.current.pop();

    if (c && ctx && state) {
      ctx.putImageData(state, 0, 0);
    }
  };
  const proceed = () => {
    const baseCanvas = canvasRef.current;
    const drawingCanvas = drawingCanvasRef.current;

    if (!baseCanvas || !drawingCanvas) return;

    const composite = document.createElement('canvas');
    composite.width = baseCanvas.width;
    composite.height = baseCanvas.height;

    const ctx = composite.getContext('2d');
    if (!ctx) return;

    // Draw the white planet base
    ctx.drawImage(baseCanvas, 0, 0);

    // Draw the user's artwork on top
    ctx.drawImage(drawingCanvas, 0, 0);

    const design: PlanetDesign = {
      canvasDataUrl: composite.toDataURL('image/png'),
      hasRings,
      accentColor: accent
    };

    onCompleteDesign?.(design);
    setActiveModal('story-studio');
  };
  if (activeModal !== 'planet-designer') return null;

  const brushes: { id: Brush; label: string; mark: string }[] = [
    { id: 'normal', label: 'Normal', mark: '●' },
    { id: 'translucent', label: 'Translucent', mark: '◐' },
    { id: 'sparkle', label: 'Sparkle', mark: '✦' },
    { id: 'blend', label: 'Blend', mark: '◌' }
  ];
  return <div className="modal-backdrop"><div className="modal-content planet-designer-window glass-panel animate-scale-in">
    <header className="studio-header"><div><div className="eyebrow">RELIVE A DAY · STEP 1</div><h2>Planet Designer</h2><p>Paint a small world for your story.</p></div><button type="button" className="close-modal-btn" onClick={() => setActiveModal(null)} aria-label="Close"><X size={22} /></button></header>
    <div className="planet-editor-layout"><aside className="planet-tool-panel">
      <section className="planet-tool-section"><h3>Brush</h3><div className="planet-brush-grid">{brushes.map((b) => <button type="button" key={b.id} className={`planet-brush-btn ${!eraser && brush === b.id ? 'active' : ''}`} onClick={() => { setBrush(b.id); setEraser(false); }}><span>{b.mark}</span>{b.label}</button>)}</div></section>
      <section className="planet-tool-section"><h3>Brush Color</h3><div className="planet-color-row">{COLORS.map(c => <button type="button" key={c} aria-label={`Color ${c}`} className={`planet-color-swatch ${color === c ? 'active' : ''}`} style={{ background: c }} onClick={() => { setColor(c); setEraser(false); }} />)}<label className="planet-color-picker"><input type="color" value={color} onChange={e => { setColor(e.target.value); setEraser(false); }} />+</label></div></section>
      <section className="planet-tool-section"><div className="planet-section-heading"><h3>Brush Size</h3><output>{size}px</output></div><input aria-label="Brush size" type="range" min="6" max="56" value={size} onChange={e => setSize(Number(e.target.value))} /></section>
      <section className="planet-tool-section"><button type="button" className="planet-undo-btn" disabled={!history.current.length} onClick={undo}><Undo2 size={16} /> Undo</button></section>
      <section className="planet-tool-section">
        <div className="planet-section-heading">
          <h3>Eraser</h3>
          <output>{eraserSize}px</output>
        </div>

        <input
          aria-label="Eraser size"
          type="range"
          min="6"
          max="60"
          value={eraserSize}
          onChange={e => {
            setEraserSize(Number(e.target.value));
            setEraser(true);
          }}
        />
      </section>      <section className="planet-tool-section"><h3>Accent Color</h3><div className="planet-color-row">{ACCENTS.map(c => <button type="button" key={c} aria-label={`Accent ${c}`} className={`planet-color-swatch ${accent === c ? 'active' : ''}`} style={{ background: c }} onClick={() => setAccent(c)} />)}<label className="planet-color-picker"><input type="color" value={accent} onChange={e => setAccent(e.target.value)} />+</label></div></section>
      <label className="planet-rings-toggle"><input type="checkbox" checked={hasRings} onChange={e => setHasRings(e.target.checked)} /> Planetary rings</label>
    </aside>

      <section className="planet-canvas-panel">
        <div
          className="planet-canvas-stage"
          style={{ '--planet-accent': accent } as React.CSSProperties}
        >
          {hasRings && (
            <div
              className="planet-ring-preview"
              style={{
                borderColor: accent,
                boxShadow: `0 0 18px ${accent}`
              }}
            />
          )}

          <div className="planet-canvas-stack">
            <canvas
              ref={canvasRef}
              width={420}
              height={420}
              className="circular-planet-canvas planet-base-canvas"
            />

            <canvas
              ref={drawingCanvasRef}
              width={420}
              height={420}
              className="circular-planet-canvas planet-drawing-canvas"
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
            />
          </div>
        </div>

        <p>
          Draw inside the planet surface.{' '}
          {eraser ? 'Eraser active.' : 'Choose a brush and color.'}
        </p>

        <div className="planet-studio-actions">
          <button
            type="button"
            className="studio-primary-btn"
            onClick={proceed}
          >
            Next
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  </div>
  </div>;
};

export default PlanetDesignerModal; 
>>>>>>> origin/main
