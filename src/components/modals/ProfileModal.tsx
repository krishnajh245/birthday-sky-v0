import React, { useState, useRef } from 'react';
import { useSky } from '../../context/SkyContext';
<<<<<<< HEAD
import { X, Camera, Lock, User, LogIn, UserPlus, LogOut, CheckCircle, AlertCircle } from 'lucide-react';

const PRESET_AVATARS = [
  '👩‍🚀', '👨‍🚀', '⭐', '✨', '🪐', '🌙', '🌌', '🎈', '💖', '👑', '🚀', '🌟'
];
=======
import {
  X,
  Camera,
  Lock,
  User,
  LogIn,
  UserPlus,
  LogOut,
  CheckCircle,
  AlertCircle,
  Trash2,
  Star,
  BookOpen,
  Radio,
  MessageSquare,
  CircleDot,
  MapPin
} from 'lucide-react';
>>>>>>> origin/main

export const ProfileModal: React.FC = () => {
  const {
    activeModal,
    setActiveModal,
    currentUser,
    signUp,
    login,
    logout,
    authNotice,
    setAuthNotice,
    authMode,
<<<<<<< HEAD
    setAuthMode
  } = useSky();

  // Sign Up form state (ALL 3 REQUIRED)
  const [signupAvatar, setSignupAvatar] = useState<string>('');
  const [signupUsername, setSignupUsername] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [isPhotoPickerOpen, setIsPhotoPickerOpen] = useState(false);

  // Login form state
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  // Status and error messages
=======
    setAuthMode,
    wishes,
    deleteWish,
    stories,
    deleteStory,
    voiceNotes,
    deleteVoiceNote,
    nebulaWords,
    deleteNebulaWord,
    blackHoleWishes,
    deleteBlackHoleWish,
    openWish,
    openStory,
    openVoiceNote,
    openNebula,
    openBlackHole,
    focusOnCoordinates
  } = useSky();

  const [signupAvatar, setSignupAvatar] = useState<string>('');
  const [signupUsername, setSignupUsername] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');

  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

>>>>>>> origin/main
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

<<<<<<< HEAD
  if (activeModal !== 'profile' && activeModal !== 'auth') return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit ~5MB
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Image size is too large. Please select an image under 5MB.');
=======
  const resetAccountForm = () => {
    setSignupAvatar('');
    setSignupUsername('');
    setSignupPassword('');
    setLoginUsername('');
    setLoginPassword('');
    setErrorMessage(null);
    setSuccessMessage(null);
    setAuthNotice(null);
    setAuthMode('login');

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const closeAccountModal = () => {
    resetAccountForm();
    setActiveModal(null);
  };

  if (activeModal !== 'profile' && activeModal !== 'auth') {
    return null;
  }

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage(
        'Image size is too large. Please select an image under 5MB.'
      );
>>>>>>> origin/main
      return;
    }

    const reader = new FileReader();
<<<<<<< HEAD
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setSignupAvatar(dataUrl);
        setSelectedEmoji('');
        setIsPhotoPickerOpen(false);
        setErrorMessage(null);
      }
    };
=======

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (!dataUrl) return;

      const image = new Image();

      image.onload = () => {
        const side = Math.min(
          image.naturalWidth,
          image.naturalHeight
        );

        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.drawImage(
          image,
          (image.naturalWidth - side) / 2,
          (image.naturalHeight - side) / 2,
          side,
          side,
          0,
          0,
          256,
          256
        );

        setSignupAvatar(
          canvas.toDataURL('image/jpeg', 0.86)
        );

        setErrorMessage(null);
      };

      image.src = dataUrl;
    };

>>>>>>> origin/main
    reader.readAsDataURL(file);
    e.target.value = '';
  };

<<<<<<< HEAD
  const handleSelectEmojiAvatar = (emoji: string) => {
    setSelectedEmoji(emoji);
    setSignupAvatar(`emoji:${emoji}`);
    setIsPhotoPickerOpen(false);
    setErrorMessage(null);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation: ALL THREE FIELDS ARE STRICTLY COMPULSORY
    const avatarToUse = signupAvatar;
    if (!avatarToUse) {
      setErrorMessage('1. Profile picture is required. Please upload an image or choose an avatar icon.');
      return;
    }
    if (!signupUsername.trim()) {
      setErrorMessage('2. Username is required. Please enter a username.');
      return;
    }
    if (!signupPassword.trim()) {
      setErrorMessage('3. Password is required. Please enter a password.');
      return;
    }

    const res = signUp(signupUsername, signupPassword, avatarToUse);
    if (!res.success) {
      setErrorMessage(res.error || 'Failed to create account.');
    } else {
      setSuccessMessage(`Welcome, ${signupUsername.trim()}! You are now logged in.`);
=======
  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage(null);
    setSuccessMessage(null);

    if (!signupAvatar) {
      setErrorMessage(
        '1. Profile photo is COMPULSORY. Please upload a picture or pick an avatar.'
      );
      return;
    }

    if (!signupUsername.trim()) {
      setErrorMessage(
        '2. Username/Name is COMPULSORY. Please enter your name.'
      );
      return;
    }

    if (signupPassword.length < 4) {
      setErrorMessage(
        '3. Password must be at least 4 characters.'
      );
      return;
    }

    const res = signUp(
      signupUsername,
      signupPassword,
      signupAvatar
    );

    if (!res.success) {
      setErrorMessage(
        res.error || 'Failed to create account.'
      );
    } else {
      setSuccessMessage(
        `Welcome, ${signupUsername.trim()}! You are now logged in.`
      );

>>>>>>> origin/main
      setTimeout(() => {
        setActiveModal(null);
        setSuccessMessage(null);
      }, 1000);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
=======

>>>>>>> origin/main
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginUsername.trim()) {
      setErrorMessage('Please enter your username.');
      return;
    }
<<<<<<< HEAD
=======

>>>>>>> origin/main
    if (!loginPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

<<<<<<< HEAD
    const res = login(loginUsername, loginPassword);
    if (!res.success) {
      setErrorMessage(res.error || 'Invalid credentials.');
    } else {
      setSuccessMessage(`Welcome back, ${loginUsername.trim()}!`);
=======
    const res = login(
      loginUsername,
      loginPassword
    );

    if (!res.success) {
      setErrorMessage(
        res.error || 'Invalid credentials.'
      );
    } else {
      setSuccessMessage(
        `Welcome back, ${loginUsername.trim()}!`
      );

>>>>>>> origin/main
      setTimeout(() => {
        setActiveModal(null);
        setSuccessMessage(null);
      }, 800);
    }
  };

  const handleLogout = () => {
    logout();
<<<<<<< HEAD
    setSuccessMessage('Logged out successfully.');
=======

    setSuccessMessage(
      'Logged out successfully.'
    );

>>>>>>> origin/main
    setTimeout(() => {
      setSuccessMessage(null);
    }, 1200);
  };

<<<<<<< HEAD
  return (
    <div
      className="modal-backdrop"
      onClick={() => {
        setAuthNotice(null);
        setActiveModal(null);
      }}
    >
      <div
        className="modal-content auth-modal-window animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="auth-header">
          <div>
            <div className="eyebrow">YOUR LITTLE CORNER OF THE SKY</div>
            <h2>{currentUser ? 'Your Profile' : 'Your Account'}</h2>
            {!currentUser && <p className="auth-modal-subtext">{authMode === 'choice' ? 'Create an account or log in to keep your constellations together.' : authMode === 'signup' ? 'Create your account.' : 'Log in to your account.'}</p>}
          </div>
          <button
            type="button"
            className="close-modal-btn"
            onClick={() => {
              setAuthNotice(null);
              setActiveModal(null);
            }}
=======
  /*
   * Close Profile first, then move the sky camera
   * to the saved coordinates and open the creation.
   */
  const goToSkyLocation = (
    x: number,
    y: number,
    openAction: () => void
  ) => {
    setActiveModal(null);

    window.setTimeout(() => {
      focusOnCoordinates(x, y);
      openAction();
    }, 120);
  };

  const userWishes = currentUser
    ? wishes.filter(
      (w) => w.creatorId === currentUser.id
    )
    : [];

  const userStories = currentUser
    ? stories.filter(
      (s) => s.creatorId === currentUser.id
    )
    : [];

  const userVoiceNotes = currentUser
    ? voiceNotes.filter(
      (v) => v.creatorId === currentUser.id
    )
    : [];

  const userWords = currentUser
    ? nebulaWords.filter(
      (p) => p.creatorId === currentUser.id
    )
    : [];

  const userBlackHoles = currentUser
    ? blackHoleWishes.filter(
      (b) => b.creatorId === currentUser.id
    )
    : [];

  const userStickers =
    currentUser?.uploadedStickers || [];

  const totalUserCreations =
    userWishes.length +
    userStories.length +
    userVoiceNotes.length +
    userWords.length +
    userBlackHoles.length;

  return (
    <div
      className="modal-backdrop"
      onClick={closeAccountModal}
    >
      <div
        className="modal-content auth-modal-window glass-panel animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="auth-header">
          <div>
            <div className="eyebrow">
              ASTRONOMICAL CITIZEN PROFILE
            </div>

            <h2>
              {currentUser
                ? 'Your Account & Creations'
                : 'Account'}
            </h2>

            {!currentUser && (
              <p className="auth-modal-subtext">
                {authMode === 'choice'
                  ? 'Sign up or log in to manage your own creations across the sky.'
                  : authMode === 'signup'
                    ? 'Create your account with a required profile picture.'
                    : 'Log in to access your existing creations.'}
              </p>
            )}
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={closeAccountModal}
>>>>>>> origin/main
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

<<<<<<< HEAD
        {/* Notice from failed action attempt */}
=======
>>>>>>> origin/main
        {authNotice && (
          <div className="auth-notice-banner animate-fade-in">
            <Lock size={16} />
            <span>{authNotice}</span>
          </div>
        )}

<<<<<<< HEAD
        {/* Error / Success Feedback */}
=======
>>>>>>> origin/main
        {errorMessage && (
          <div className="auth-feedback error animate-fade-in">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-feedback success animate-fade-in">
            <CheckCircle size={16} />
            <span>{successMessage}</span>
          </div>
        )}

        {currentUser ? (
<<<<<<< HEAD
          /* Currently Logged In View */
          <div className="auth-logged-in-view animate-fade-in">
            <div className="auth-user-card">
              <div className="auth-avatar-display-lg">
                {currentUser.avatarUrl.startsWith('emoji:') ? (
                  <span className="auth-emoji-display">{currentUser.avatarUrl.replace('emoji:', '')}</span>
                ) : (
                  <img src={currentUser.avatarUrl} alt={currentUser.username} className="auth-avatar-img-lg" />
                )}
              </div>
              <div className="auth-user-info">
                <h3>{currentUser.username}</h3>
                <span className="auth-session-badge">Active Session Member ✦</span>
              </div>
            </div>

            <p className="auth-session-explainer">
              You are logged in for this website session. You can now create Wish Constellations, Stories, Voice Notes, and submit Black Hole prayers.
            </p>
=======
          <div className="auth-logged-in-view animate-fade-in">

            <div className="auth-user-card">
              <div className="auth-avatar-display-lg">
                {currentUser.avatarUrl.startsWith(
                  'emoji:'
                ) ? (
                  <span className="auth-emoji-display">
                    {currentUser.avatarUrl.replace(
                      'emoji:',
                      ''
                    )}
                  </span>
                ) : (
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.username}
                    className="auth-avatar-img-lg"
                  />
                )}
              </div>

              <div className="auth-user-info">
                <h3>{currentUser.username}</h3>
                <span className="auth-session-badge">
                  Verified Creator ✦
                </span>
              </div>
            </div>

            <div className="user-creations-manager">
              <div className="creations-header">
                <h4>
                  Your Cosmic Creations (
                  {totalUserCreations})
                </h4>

                <span className="creations-subtitle">
                  Click View to locate the creation in the sky
                </span>
              </div>

              {totalUserCreations === 0 &&
                userStickers.length === 0 ? (
                <div className="empty-creations-box">
                  <p>
                    You haven't placed any celestial
                    objects in the sky yet. Click{' '}
                    <strong>+</strong> in the sky to begin!
                  </p>
                </div>
              ) : (
                <div className="creations-list-scroll">

                  {/* WISHES */}
                  {userWishes.map((w) => (
                    <div
                      key={w.id}
                      className="creation-row-item"
                    >
                      <div className="creation-meta">
                        <Star
                          size={16}
                          className="creation-icon star-icon"
                        />

                        <div>
                          <strong className="creation-title">
                            {w.title ||
                              'Wish Constellation'}
                          </strong>

                          <span className="creation-detail">
                            {w.points?.length || 0}{' '}
                            stars · Created{' '}
                            {new Date(
                              w.createdAt
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="creation-actions">
                        <button
                          type="button"
                          className="sub-action-btn view-btn"
                          onClick={() =>
                            goToSkyLocation(
                              w.x,
                              w.y,
                              () => openWish(w.id)
                            )
                          }
                        >
                          <MapPin size={13} />
                          View
                        </button>

                        <button
                          type="button"
                          className="sub-action-btn delete-btn"
                          onClick={() =>
                            deleteWish(w.id)
                          }
                          title="Delete this constellation"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* STORIES */}
                  {userStories.map((s) => (
                    <div
                      key={s.id}
                      className="creation-row-item"
                    >
                      <div className="creation-meta">
                        <BookOpen
                          size={16}
                          className="creation-icon planet-icon"
                        />

                        <div>
                          <strong className="creation-title">
                            {s.title ||
                              'Relive a Day Story'}
                          </strong>

                          <span className="creation-detail">
                            {s.pages?.length || 1}{' '}
                            pages · Created{' '}
                            {new Date(
                              s.createdAt
                            ).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="creation-actions">
                        <button
                          type="button"
                          className="sub-action-btn view-btn"
                          onClick={() =>
                            goToSkyLocation(
                              s.x,
                              s.y,
                              () => openStory(s.id)
                            )
                          }
                        >
                          <MapPin size={13} />
                          View
                        </button>

                        <button
                          type="button"
                          className="sub-action-btn delete-btn"
                          onClick={() =>
                            deleteStory(s.id)
                          }
                          title="Delete this story"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* VOICE NOTES */}
                  {userVoiceNotes.map((v) => (
                    <div
                      key={v.id}
                      className="creation-row-item"
                    >
                      <div className="creation-meta">
                        <Radio
                          size={16}
                          className="creation-icon probe-icon"
                        />

                        <div>
                          <strong className="creation-title">
                            {v.title || 'Space Probe'}
                          </strong>

                          <span className="creation-detail">
                            {v.heard
                              ? 'Signal Heard'
                              : 'Unopened Transmission'}
                          </span>
                        </div>
                      </div>

                      <div className="creation-actions">
                        <button
                          type="button"
                          className="sub-action-btn view-btn"
                          onClick={() =>
                            goToSkyLocation(
                              v.x,
                              v.y,
                              () =>
                                openVoiceNote(v.id)
                            )
                          }
                        >
                          <MapPin size={13} />
                          Play
                        </button>

                        <button
                          type="button"
                          className="sub-action-btn delete-btn"
                          onClick={() =>
                            deleteVoiceNote(v.id)
                          }
                          title="Delete this probe"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* NEBULA WORDS */}
                  {userWords.map((p) => (
                    <div
                      key={p.id}
                      className="creation-row-item"
                    >
                      <div className="creation-meta">
                        <MessageSquare
                          size={16}
                          className="creation-icon nebula-icon"
                        />

                        <div>
                          <strong className="creation-title">
                            "{p.word}"
                          </strong>

                          <span className="creation-detail">
                            {p.explanation}
                          </span>
                        </div>
                      </div>

                      <div className="creation-actions">
                        <button
                          type="button"
                          className="sub-action-btn view-btn"
                          onClick={() => {
                            setActiveModal(null);

                            window.setTimeout(() => {
                              focusOnCoordinates(
                                p.x,
                                p.y
                              );
                              openNebula();
                            }, 120);
                          }}
                        >
                          <MapPin size={13} />
                          Locate
                        </button>

                        <button
                          type="button"
                          className="sub-action-btn delete-btn"
                          onClick={() =>
                            deleteNebulaWord(p.id)
                          }
                          title="Delete this word"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* BLACK HOLE PRAYERS */}
                  {userBlackHoles.map((b) => (
                    <div
                      key={b.id}
                      className="creation-row-item"
                    >
                      <div className="creation-meta">
                        <CircleDot
                          size={16}
                          className="creation-icon black-hole-icon"
                        />

                        <div>
                          <strong className="creation-title">
                            Void Prayer
                          </strong>

                          <span className="creation-detail">
                            "{b.wishText}"
                          </span>
                        </div>
                      </div>

                      <div className="creation-actions">
                        <button
                          type="button"
                          className="sub-action-btn view-btn"
                          onClick={() => {
                            setActiveModal(null);
                            setTimeout(() => {
                              openBlackHole();
                            }, 120);
                          }}
                        >
                          View
                        </button>

                        <button
                          type="button"
                          className="sub-action-btn delete-btn"
                          onClick={() =>
                            deleteBlackHoleWish(
                              b.id
                            )
                          }
                          title="Delete this prayer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* STICKERS */}
                  {userStickers.length > 0 && (
                    <div className="user-stickers-cluster">
                      <span className="cluster-title">
                        Your Saved Custom Stickers (
                        {userStickers.length})
                      </span>

                      <div className="saved-stickers-row">
                        {userStickers.map(
                          (stk, idx) => (
                            <div
                              key={`stk-${idx}`}
                              className="saved-sticker-thumb"
                            >
                              <img
                                src={stk}
                                alt="Custom Sticker"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
>>>>>>> origin/main

            <div className="auth-actions-row">
              <button
                type="button"
                className="secondary-action-btn"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Log Out</span>
              </button>

              <button
                type="button"
                className="continue-button"
<<<<<<< HEAD
                onClick={() => setActiveModal(null)}
=======
                onClick={() =>
                  setActiveModal(null)
                }
>>>>>>> origin/main
              >
                <span>Continue Exploring</span>
              </button>
            </div>
          </div>
        ) : (
<<<<<<< HEAD
          /* Authentication Choices: Login vs Sign Up */
          <div className="auth-forms-container">
            {authMode === 'choice' ? (
              <div className="auth-choice-view animate-fade-in">
                <button type="button" className="account-choice-pill" onClick={() => setAuthMode('signup')}>Sign up</button>
                <button type="button" className="account-choice-pill" onClick={() => setAuthMode('login')}>Log in</button>
              </div>
            ) : null}
            {authMode !== 'choice' && <>
            <div className="auth-choice-tabs">
              <button
                type="button"
                className={`auth-choice-tab ${authMode === 'signup' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('signup');
                  setErrorMessage(null);
                }}
              >
                <UserPlus size={16} />
                <span>Sign Up</span>
              </button>
              <button
                type="button"
                className={`auth-choice-tab ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage(null);
                }}
              >
                <LogIn size={16} />
                <span>Login</span>
              </button>
            </div>

            {authMode === 'signup' ? (
              /* SIGN UP FORM (ALL 3 FIELDS COMPULSORY) */
              <form onSubmit={handleSignUpSubmit} className="auth-form animate-fade-in">
                {/* 1. Compulsory Profile Picture */}
                <div className="auth-field-section">
                  <label className="input-label required-label">
                    Choose profile picture <span className="compulsory-tag">*Required</span>
                  </label>

                  <small className="profile-photo-notice">Choose a photo or avatar icon to make your account yours.</small>
                  <div className="avatar-selection-cluster">
                    <div className="avatar-preview-box">
                      {signupAvatar && !signupAvatar.startsWith('emoji:') ? (
                        <img src={signupAvatar} alt="Avatar" className="custom-avatar-thumb" />
                      ) : (
                        <span className="emoji-avatar-thumb">{selectedEmoji}</span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="upload-photo-btn"
                      onClick={() => setIsPhotoPickerOpen(true)}
                    >
                      <Camera size={15} />
                      <span>{signupAvatar && !signupAvatar.startsWith('emoji:') ? 'Change photo' : 'Choose profile picture'}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileUpload}
                    />
                  </div>

                  {isPhotoPickerOpen && (
                    <div className="photo-picker-popover animate-fade-in" role="dialog" aria-label="Choose profile picture">
                      <div className="photo-picker-header">
                        <span>Choose a profile picture</span>
                        <button type="button" className="photo-picker-close" onClick={() => setIsPhotoPickerOpen(false)} aria-label="Close profile picture picker">
                          <X size={16} />
                        </button>
                      </div>
                      <div className="preset-buttons-wrap">
                        {PRESET_AVATARS.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            className={`preset-avatar-btn ${signupAvatar === `emoji:${emoji}` || (!signupAvatar && selectedEmoji === emoji) ? 'active' : ''}`}
                            onClick={() => handleSelectEmojiAvatar(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                      <button type="button" className="upload-photo-btn picker-upload-btn" onClick={() => fileInputRef.current?.click()}>
                        <Camera size={15} />
                        <span>Upload from device</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Compulsory Username */}
                <div className="auth-field-section">
                  <label className="input-label required-label">
                    2. Username <span className="compulsory-tag">*Compulsory</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <User size={16} className="auth-input-icon" />
                    <input
                      type="text"
                      className="studio-text-input auth-input"
                      value={signupUsername}
                      onChange={(e) => setSignupUsername(e.target.value)}
                      placeholder="Your name"
                      maxLength={30}
                    />
                  </div>
                </div>

                {/* 3. Compulsory Password */}
                <div className="auth-field-section">
                  <label className="input-label required-label">
                    3. Password <span className="compulsory-tag">*Compulsory</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-input-icon" />
                    <input
                      type="password"
                      className="studio-text-input auth-input"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="Create a passcode"
                    />
                  </div>
                </div>

                <div className="auth-submit-row">
                  <span className="auth-runtime-note">Stored for this website session only</span>
                  <button type="submit" className="continue-button">
                    <span>Create account ✦</span>
                    <UserPlus size={16} />
                  </button>
                </div>
              </form>
            ) : (
              /* LOGIN FORM */
              <form onSubmit={handleLoginSubmit} className="auth-form animate-fade-in">
                <div className="auth-field-section">
                  <label className="input-label">Username</label>
                  <div className="auth-input-wrapper">
                    <User size={16} className="auth-input-icon" />
                    <input
                      type="text"
                      className="studio-text-input auth-input"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="Your session username..."
                      autoFocus
                    />
                  </div>
                </div>

                <div className="auth-field-section">
                  <label className="input-label">Password</label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-input-icon" />
                    <input
                      type="password"
                      className="studio-text-input auth-input"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Your passcode"
                    />
                  </div>
                </div>

                <div className="auth-submit-row">
                  <button
                    type="button"
                    className="auth-switch-prompt-btn"
=======
          <div className="auth-forms-container">

            {authMode === 'choice' ? (
              <div className="auth-choice-view animate-fade-in">
                <button
                  type="button"
                  className="account-choice-pill"
                  onClick={() =>
                    setAuthMode('signup')
                  }
                >
                  Sign up
                </button>

                <button
                  type="button"
                  className="account-choice-pill"
                  onClick={() =>
                    setAuthMode('login')
                  }
                >
                  Log in
                </button>
              </div>
            ) : null}

            {authMode !== 'choice' && (
              <>
                <div className="auth-choice-tabs">
                  <button
                    type="button"
                    className={`auth-choice-tab ${authMode === 'signup'
                      ? 'active'
                      : ''
                      }`}
>>>>>>> origin/main
                    onClick={() => {
                      setAuthMode('signup');
                      setErrorMessage(null);
                    }}
                  >
<<<<<<< HEAD
                    Don't have an account? Sign Up
                  </button>
                  <button type="submit" className="continue-button">
                    <span>Login</span>
                    <LogIn size={16} />
                  </button>
                </div>
              </form>
            )}
            </>}
=======
                    <UserPlus size={16} />
                    <span>Sign Up</span>
                  </button>

                  <button
                    type="button"
                    className={`auth-choice-tab ${authMode === 'login'
                      ? 'active'
                      : ''
                      }`}
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMessage(null);
                    }}
                  >
                    <LogIn size={16} />
                    <span>Login</span>
                  </button>
                </div>

                {authMode === 'signup' ? (
                  <form
                    onSubmit={handleSignUpSubmit}
                    className="auth-form animate-fade-in"
                  >
                    <div className="auth-field-section">
                      <label className="input-label required-label">
                        Choose profile picture{' '}
                        <span className="compulsory-tag">
                          *Required
                        </span>
                      </label>

                      <small className="profile-photo-notice">
                        Choose a photo to make your account yours.
                      </small>

                      <div className="avatar-selection-cluster">
                        <div className="avatar-preview-box">
                          {signupAvatar ? (
                            <img
                              src={signupAvatar}
                              alt="Avatar"
                              className="custom-avatar-thumb"
                            />
                          ) : (
                            <span className="avatar-placeholder">
                              <Camera size={18} />
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className="upload-photo-btn"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                        >
                          <Camera size={15} />

                          <span>
                            {signupAvatar &&
                              !signupAvatar.startsWith(
                                'emoji:'
                              )
                              ? 'Change photo'
                              : 'Choose profile picture'}
                          </span>
                        </button>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={handleFileUpload}
                        />
                      </div>
                    </div>

                    <div className="auth-field-section">
                      <label className="input-label required-label">
                        2. Username{' '}
                        <span className="compulsory-tag">
                          *Compulsory
                        </span>
                      </label>

                      <div className="auth-input-wrapper">
                        <User
                          size={16}
                          className="auth-input-icon"
                        />

                        <input
                          type="text"
                          className="studio-text-input auth-input"
                          value={signupUsername}
                          onChange={(e) =>
                            setSignupUsername(
                              e.target.value
                            )
                          }
                          placeholder="Your name"
                          maxLength={30}
                        />
                      </div>
                    </div>

                    <div className="auth-field-section">
                      <label className="input-label required-label">
                        3. Password{' '}
                        <span className="compulsory-tag">
                          *Compulsory
                        </span>
                      </label>

                      <div className="auth-input-wrapper">
                        <Lock
                          size={16}
                          className="auth-input-icon"
                        />

                        <input
                          type="password"
                          className="studio-text-input auth-input"
                          value={signupPassword}
                          onChange={(e) => {
                            const value =
                              e.target.value;

                            setSignupPassword(value);

                            if (
                              value.length >= 4 &&
                              errorMessage?.includes(
                                'at least 4'
                              )
                            ) {
                              setErrorMessage(null);
                            }
                          }}
                          placeholder="Create a passcode"
                        />
                      </div>
                    </div>

                    <div className="auth-submit-row">
                      <span className="auth-runtime-note">
                        Stored for this website session only
                      </span>

                      <button
                        type="submit"
                        className="continue-button"
                      >
                        <span>
                          Create account ✦
                        </span>
                        <UserPlus size={16} />
                      </button>
                    </div>
                  </form>
                ) : (
                  <form
                    onSubmit={handleLoginSubmit}
                    className="auth-form animate-fade-in"
                  >
                    <div className="auth-field-section">
                      <label className="input-label">
                        Username
                      </label>

                      <div className="auth-input-wrapper">
                        <User
                          size={16}
                          className="auth-input-icon"
                        />

                        <input
                          type="text"
                          className="studio-text-input auth-input"
                          value={loginUsername}
                          onChange={(e) =>
                            setLoginUsername(
                              e.target.value
                            )
                          }
                          placeholder="Your session username..."
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="auth-field-section">
                      <label className="input-label">
                        Password
                      </label>

                      <div className="auth-input-wrapper">
                        <Lock
                          size={16}
                          className="auth-input-icon"
                        />

                        <input
                          type="password"
                          className="studio-text-input auth-input"
                          value={loginPassword}
                          onChange={(e) =>
                            setLoginPassword(
                              e.target.value
                            )
                          }
                          placeholder="Your passcode"
                        />
                      </div>
                    </div>

                    <div className="auth-submit-row">
                      <button
                        type="button"
                        className="auth-switch-prompt-btn"
                        onClick={() => {
                          setAuthMode('signup');
                          setErrorMessage(null);
                        }}
                      >
                        Don't have an account? Sign Up
                      </button>

                      <button
                        type="submit"
                        className="continue-button"
                      >
                        <span>Login</span>
                        <LogIn size={16} />
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
>>>>>>> origin/main
          </div>
        )}
      </div>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/main
