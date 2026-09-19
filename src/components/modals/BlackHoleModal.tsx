<<<<<<< HEAD
import React, { useState } from 'react';
import { useSky } from '../../context/SkyContext';
import { X, Sparkles, Send, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
=======
import React, { useEffect, useMemo, useState } from 'react';
import { useSky } from '../../context/SkyContext';
import {
  AlertCircle,
  ArrowLeft,
  History,
  Send,
  User,
  X,
  Sparkles
} from 'lucide-react';

type Panel = 'main' | 'add' | 'prayers';
>>>>>>> origin/main

export const BlackHoleModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    currentUser,
    addBlackHoleWish,
<<<<<<< HEAD
    setAuthNotice
  } = useSky();

  const [wishText, setWishText] = useState('');
  const [isSucking, setIsSucking] = useState(false);
  const [suckedText, setSuckedText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (activeModal !== 'black-hole') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!currentUser) {
      setAuthNotice('Please Log In or Sign Up to submit your prayer to the Black Hole.');
=======
    blackHoleWishes,
    setAuthNotice
  } = useSky();

  const [panel, setPanel] = useState<Panel>('main');
  const [wishText, setWishText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [incomingId, setIncomingId] = useState<string | null>(null);

  useEffect(() => {
    if (activeModal === 'black-hole') {
      setPanel('main');
      setWishText('');
      setErrorMessage(null);
      setIncomingId(null);
    }
  }, [activeModal]);

  const animatedPrayers = useMemo(
    () => blackHoleWishes.slice(-6),
    [blackHoleWishes]
  );

  if (activeModal !== 'black-hole') return null;

  const openAddPrayer = () => {
    if (!currentUser) {
      setAuthNotice('Please Log In or Sign Up to add a prayer.');
>>>>>>> origin/main
      setActiveModal('auth');
      return;
    }

<<<<<<< HEAD
    const trimmed = wishText.trim();
    if (!trimmed) {
      setErrorMessage('Please write your wish or prayer before submitting.');
      return;
    }

    setSuckedText(trimmed);
    setIsSucking(true);

    // Save in session state
    addBlackHoleWish(trimmed);

    // Gravitational suction sequence
    setTimeout(() => {
      setIsSucking(false);
      setIsCompleted(true);
      setWishText('');

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#a855f7', '#38bdf8', '#f59e0b', '#ec4899']
      });
    }, 2400);
  };

  const handleReset = () => {
    setIsCompleted(false);
    setIsSucking(false);
    setWishText('');
    setErrorMessage(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div
        className="modal-content black-hole-modal-window animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="black-hole-header">
          <div>
            <div className="eyebrow">COSMIC SINGULARITY · SACRED VOID</div>
            <h2>Wish or Prayer for the Upcoming Year</h2>
          </div>
          <button
            type="button"
            className="close-modal-btn"
            onClick={() => setActiveModal(null)}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="black-hole-content-area">
          {/* Central Animated Singularity Visual */}
          <div className="black-hole-visual-center">
            <div className={`singularity-core ${isSucking ? 'active-vortex' : ''}`}>
              <div className="singularity-glow-outer" />
              <div className="singularity-event-horizon" />
              <div className="singularity-spiral-rays" />
            </div>

            {/* Suction animation overlay for submitted text */}
            {isSucking && (
              <div className="gravitational-suction-text animate-spiral-suck">
                "{suckedText}"
              </div>
            )}
          </div>

          {!currentUser ? (
            /* Logged-Out Prompt */
            <div className="black-hole-auth-required animate-fade-in">
              <p className="void-quote">
                "Give your burdens, prayers, and wishes to the singularity — watch negativity dissolve into stardust."
              </p>
              <div className="auth-prompt-card">
                <AlertCircle size={20} className="icon-amber" />
                <p>You must be logged in to submit a prayer to the Black Hole.</p>
                <button
                  type="button"
                  className="continue-button"
                  onClick={() => {
                    setAuthNotice('Log in to submit your wish or prayer to the Black Hole.');
                    setActiveModal('auth');
                  }}
                >
                  <span>Log In / Sign Up</span>
                </button>
              </div>
            </div>
          ) : isCompleted ? (
            /* Completed Disappearance Confirmation */
            <div className="black-hole-completed-pane animate-fade-in">
              <div className="void-absorbed-icon">✦</div>
              <h3>Absorbed by the Cosmic Singularity</h3>
              <p className="void-blessing-text">
                Your prayer has crossed the event horizon. All negativity and burdens are symbolically dissolved into infinite cosmic light.
              </p>

              <div className="black-hole-actions-row">
                <button
                  type="button"
                  className="secondary-action-btn"
                  onClick={handleReset}
                >
                  <RefreshCw size={15} />
                  <span>Submit Another Wish</span>
                </button>

                <button
                  type="button"
                  className="continue-button"
                  onClick={() => setActiveModal(null)}
                >
                  <span>Return to Sky</span>
                </button>
              </div>
            </div>
          ) : !isSucking ? (
            /* Input Form */
            <form onSubmit={handleSubmit} className="black-hole-form animate-fade-in">
              <p className="black-hole-prompt-desc">
                Write a sincere wish or prayer for the upcoming year (e.g. <em>"Remove all negativity and let this year be peaceful and joyful."</em>). When you submit, the text is gravitationally pulled into the black hole and disappears.
              </p>

              {errorMessage && (
                <div className="auth-feedback error animate-fade-in">
                  <AlertCircle size={16} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="prayer-input-container">
                <textarea
                  className="studio-textarea black-hole-input"
                  rows={4}
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Type your prayer or wish here... It will be absorbed into the void."
                  maxLength={300}
                  autoFocus
                />
              </div>

              <div className="black-hole-submit-footer">
                <div className="contributor-tag-subtle">
                  <span>Praying as: <strong>{currentUser.username}</strong></span>
                </div>

                <button
                  type="submit"
                  className="continue-button black-hole-pull-btn"
                  disabled={!wishText.trim()}
                >
                  <span>Surrender to Black Hole</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          ) : (
            <div className="sucking-status-text">
              <span>Pulling into the Singularity...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
=======
    setErrorMessage(null);
    setPanel('add');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentUser) return;

    const text = wishText.trim();

    if (!text) {
      setErrorMessage('Write a prayer before submitting.');
      return;
    }

    const id = `prayer-${Date.now()}`;

    setIncomingId(id);
    addBlackHoleWish(text);
    setWishText('');
    setPanel('main');

    window.setTimeout(() => setIncomingId(null), 5200);
  };

  const close = () => {
    setPanel('main');
    setActiveModal(null);
  };

  return (
    <div
      className="modal-backdrop black-hole-backdrop"
      onClick={close}
      style={{
        padding: '16px',
        boxSizing: 'border-box'
      }}
    >
      <div
        className="black-hole-modal-window glass-panel animate-scale-in"
        onClick={(event) => event.stopPropagation()}
        style={{
          width: 'min(680px, 94vw)',
          maxHeight: 'calc(100vh - 32px)',
          overflow: 'hidden',
          padding: '24px',
          boxSizing: 'border-box',
          borderRadius: '24px'
        }}
      >
        <header
          className="black-hole-header"
          style={{
            paddingBottom: '16px',
            marginBottom: '16px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}
        >
          <div
            className="black-hole-title-block"
            style={{
              flex: 1,
              minWidth: 0
            }}
          >
            <span
              className="eyebrow"
              style={{
                display: 'block',
                marginBottom: '5px',
                fontSize: '10px',
                letterSpacing: '1.5px',
                opacity: 0.6
              }}
            >
              A COSMIC PLACE TO LET GO
            </span>

            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(21px, 4vw, 28px)',
                lineHeight: 1.2
              }}
            >
              {panel === 'main'
                ? 'Send a Prayer into the Universe'
                : panel === 'add'
                  ? 'Add a Prayer'
                  : 'See the Prayers'}
            </h2>

            <p
              style={{
                margin: '7px 0 0',
                fontSize: '13px',
                lineHeight: 1.45,
                opacity: 0.65
              }}
            >
              {panel === 'main'
                ? 'Words of hope are gently pulled into the Black Hole for her upcoming year.'
                : panel === 'add'
                  ? 'Write a prayer for her upcoming year.'
                  : 'Every prayer released into the Black Hole, held with care.'}
            </p>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={close}
            aria-label="Close Black Hole"
          >
            <X size={20} />
          </button>
        </header>

        {panel === 'main' && (
          <main
            className="black-hole-main-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {/* BLACK HOLE STAGE */}
            <div
              aria-label="Prayers traveling into the Black Hole"
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(190px, 31vh, 250px)',
                minHeight: '190px',
                borderRadius: '20px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'radial-gradient(circle at center, #171126 0%, #0b0b19 55%, #05050d 100%)'
              }}
            >
              {/* OUTER GLOW */}
              <div
                style={{
                  position: 'absolute',
                  width: '170px',
                  height: '170px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, transparent 43%, rgba(255,180,50,0.22) 51%, rgba(255,130,20,0.12) 60%, transparent 73%)',
                  filter: 'blur(2px)',
                  zIndex: 1
                }}
              />

              {/* ACCRETION RING */}
              <div
                style={{
                  position: 'absolute',
                  width: '142px',
                  height: '142px',
                  borderRadius: '50%',
                  border: '3px solid rgba(255,193,58,0.65)',
                  boxShadow:
                    '0 0 12px rgba(255,190,50,0.75), 0 0 28px rgba(255,130,20,0.35)',
                  zIndex: 2
                }}
              />

              {/* PURPLE OUTER RING */}
              <div
                style={{
                  position: 'absolute',
                  width: '158px',
                  height: '158px',
                  borderRadius: '50%',
                  border: '1px solid rgba(156,100,255,0.35)',
                  boxShadow:
                    '0 0 25px rgba(130,80,255,0.25)',
                  zIndex: 2
                }}
              />

              {/* BLACK CENTER */}
              <div
                style={{
                  position: 'absolute',
                  width: '82px',
                  height: '82px',
                  borderRadius: '50%',
                  background: '#000000',
                  boxShadow:
                    '0 0 18px rgba(0,0,0,1), 0 0 35px rgba(0,0,0,0.95)',
                  zIndex: 4
                }}
              />

              {/* INNER GOLDEN EDGE */}
              <div
                style={{
                  position: 'absolute',
                  width: '88px',
                  height: '88px',
                  borderRadius: '50%',
                  border: '2px solid rgba(255,204,75,0.75)',
                  boxShadow:
                    '0 0 10px rgba(255,190,40,0.8)',
                  zIndex: 3
                }}
              />

              {/* PRAYERS */}
              {animatedPrayers.map((prayer, index) => (
                <div
                  key={prayer.id}
                  className={`black-hole-prayer-traveler ${incomingId === prayer.id ? 'is-new' : ''
                    }`}
                  style={
                    {
                      '--prayer-index': index,
                      '--prayer-x': `${((index * 29) % 70) - 35}px`,
                      '--prayer-y': `${((index * 43) % 100) - 50}px`,
                      position: 'absolute',
                      zIndex: 6
                    } as React.CSSProperties
                  }
                >
                  <span>{prayer.wishText}</span>
                </div>
              ))}

              {blackHoleWishes.length === 0 && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 7,
                    fontSize: '11px',
                    opacity: 0.5,
                    whiteSpace: 'nowrap'
                  }}
                >
                  Prayers will travel here
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <div
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0 16px',
                textAlign: 'center',
                overflow: 'hidden'
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '13px',
                  lineHeight: 1.55,
                  opacity: 0.7,
                  overflowWrap: 'anywhere'
                }}
              >
                Write something hopeful. As it travels inward, the Black Hole
                absorbs the weight and leaves only warmth for her year ahead.
              </p>
            </div>

            {/* ACTIONS */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <button
                type="button"
                className="continue-button"
                onClick={openAddPrayer}
                style={{
                  minHeight: '48px',
                  borderRadius: '14px',
                  padding: '12px 16px',
                  justifyContent: 'center',
                  boxShadow:
                    '0 8px 24px rgba(139,92,246,0.25)'
                }}
              >
                <Send size={17} />
                <span>Add a Prayer</span>
              </button>

              <button
                type="button"
                onClick={() => setPanel('prayers')}
                style={{
                  minHeight: '48px',
                  borderRadius: '14px',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '9px',
                  cursor: 'pointer',
                  color: '#fff',
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.035))',
                  border: '1px solid rgba(255,255,255,0.14)',
                  boxShadow:
                    '0 8px 24px rgba(0,0,0,0.2)'
                }}
              >
                <History size={17} />
                <span>See the Prayers</span>

                <span
                  style={{
                    minWidth: '22px',
                    height: '22px',
                    padding: '0 6px',
                    borderRadius: '999px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    background: 'rgba(255,255,255,0.1)'
                  }}
                >
                  {blackHoleWishes.length}
                </span>
              </button>
            </div>

            {/* FOOTER */}
            <div
              style={{
                paddingTop: '10px',
                borderTop:
                  '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                opacity: 0.4,
                fontSize: '9px',
                letterSpacing: '1px'
              }}
            >
              <Sparkles size={10} />
              RELEASE • RECEIVE • REMEMBER
              <Sparkles size={10} />
            </div>
          </main>
        )}

        {panel === 'add' && (
          <form
            className="black-hole-prayer-form"
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <button
              type="button"
              className="black-hole-back-button"
              onClick={() => setPanel('main')}
            >
              <ArrowLeft size={16} />
              Back to Black Hole
            </button>

            {errorMessage && (
              <div className="auth-feedback error">
                <AlertCircle size={16} />
                {errorMessage}
              </div>
            )}

            <label
              htmlFor="black-hole-prayer"
              style={{
                fontSize: '14px',
                fontWeight: 600
              }}
            >
              Write a prayer for her upcoming year
            </label>

            <textarea
              id="black-hole-prayer"
              value={wishText}
              onChange={(event) => {
                setWishText(event.target.value);
                setErrorMessage(null);
              }}
              placeholder="I hope this year brings you peace and happiness..."
              maxLength={350}
              autoFocus
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '16px',
                boxSizing: 'border-box',
                borderRadius: '16px',
                resize: 'vertical',
                fontSize: '14px',
                lineHeight: 1.6,
                color: '#fff',
                background: 'rgba(255,255,255,0.055)',
                border: '1px solid rgba(255,255,255,0.12)',
                outline: 'none'
              }}
            />

            <div
              className="black-hole-form-footer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                flexWrap: 'wrap'
              }}
            >
              <span className="contributor-tag-subtle">
                Submitting as{' '}
                <strong>{currentUser?.username}</strong>
              </span>

              <button
                type="submit"
                className="continue-button"
                disabled={!wishText.trim()}
                style={{
                  borderRadius: '14px',
                  padding: '12px 18px'
                }}
              >
                Submit Prayer
                <Send size={16} />
              </button>
            </div>
          </form>
        )}

        {panel === 'prayers' && (
          <section
            className="black-hole-prayers-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              minHeight: 0
            }}
          >
            <button
              type="button"
              className="black-hole-back-button"
              onClick={() => setPanel('main')}
            >
              <ArrowLeft size={16} />
              Back to Black Hole
            </button>

            {blackHoleWishes.length === 0 ? (
              <div className="black-hole-empty-list">
                <History size={28} />
                <p>No prayers have been submitted yet.</p>
              </div>
            ) : (
              <div
                className="black-hole-prayer-list"
                style={{
                  maxHeight: 'calc(100vh - 230px)',
                  overflowY: 'auto',
                  padding: '2px 4px 4px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                {blackHoleWishes.map((prayer) => (
                  <article
                    className="black-hole-prayer-entry"
                    key={prayer.id}
                    style={{
                      padding: '15px 16px',
                      borderRadius: '15px'
                    }}
                  >
                    <p
                      style={{
                        margin: '0 0 12px',
                        lineHeight: 1.55
                      }}
                    >
                      {prayer.wishText}
                    </p>

                    <div className="black-hole-prayer-sender">
                      {prayer.creatorAvatar ? (
                        <img
                          src={prayer.creatorAvatar}
                          alt=""
                        />
                      ) : (
                        <span>
                          <User size={14} />
                        </span>
                      )}

                      <strong>{prayer.creatorName}</strong>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
};
>>>>>>> origin/main
