import React, { useState } from 'react';
import { useSky } from '../../context/SkyContext';
<<<<<<< HEAD
import { Plus, X, Star, BookOpen, MessageSquare, Radio, CircleDot } from 'lucide-react';
=======
import {
  Plus,
  X,
  Star,
  BookOpen,
  MessageSquare,
  Radio,
  CircleDot
} from 'lucide-react';
>>>>>>> origin/main

export const AddMenu: React.FC = () => {
  const { setActiveModal, currentUser, setAuthNotice } = useSky();
  const [isOpen, setIsOpen] = useState(false);

<<<<<<< HEAD
  const handleSelect = (modalType: 'wish-studio' | 'planet-designer' | 'personality' | 'voice-probe' | 'black-hole') => {
    setIsOpen(false);
    if (!currentUser) {
      setAuthNotice('Please Log In or Sign Up before creating celestial content in Birthday Sky.');
      setActiveModal('auth');
      return;
    }
=======
  const handleSelect = (
    modalType:
      | 'wish-studio'
      | 'planet-designer'
      | 'nebula'
      | 'voice-probe'
      | 'black-hole'
  ) => {
    setIsOpen(false);

    if (!currentUser) {
      setAuthNotice(
        'Please Log In or Sign Up before creating celestial content in Birthday Sky.'
      );
      setActiveModal('auth');
      return;
    }

>>>>>>> origin/main
    setActiveModal(modalType);
  };

  return (
    <div className="add-menu-container">
      {/* Expanded Menu Options */}
      {isOpen && (
        <div className="add-menu-dropdown animate-fade-in">
          <div className="add-menu-header">Add to Birthday Sky</div>

<<<<<<< HEAD
=======
          {/* Wish Card */}
>>>>>>> origin/main
          <button
            type="button"
            className="add-option-btn"
            onClick={() => handleSelect('wish-studio')}
          >
            <div className="option-icon star-icon">
              <Star size={18} />
            </div>
<<<<<<< HEAD
            <div className="option-info">
              <span className="option-title">Wish Card</span>
              <span className="option-desc">Create constellation in the sky</span>
            </div>
          </button>

=======

            <div className="option-info">
              <span className="option-title">Wish Card</span>
              <span className="option-desc"><br></br>
                Create constellation in the sky
              </span>
            </div>
          </button>

          {/* Planet*/}
>>>>>>> origin/main
          <button
            type="button"
            className="add-option-btn"
            onClick={() => handleSelect('planet-designer')}
          >
            <div className="option-icon planet-icon">
              <BookOpen size={18} />
            </div>
<<<<<<< HEAD
            <div className="option-info">
              <span className="option-title">Relive a Day (Story)</span>
              <span className="option-desc">Design a planet & flipbook memory</span>
            </div>
          </button>

          <button
            type="button"
            className="add-option-btn"
            onClick={() => handleSelect('personality')}
=======

            <div className="option-info">
              <span className="option-title">Planet Story</span>
              <span className="option-desc"><br></br>
                Imagine a day out with Sum
              </span>
            </div>
          </button>

          {/* Nebula */}
          <button
            type="button"
            className="add-option-btn"
            onClick={() => handleSelect('nebula')}
>>>>>>> origin/main
          >
            <div className="option-icon nebula-icon">
              <MessageSquare size={18} />
            </div>
<<<<<<< HEAD
            <div className="option-info">
              <span className="option-title">Personality Word</span>
              <span className="option-desc">Add one or two personality words</span>
            </div>
          </button>

=======

            <div className="option-info">
              <span className="option-title">Nebula</span>
              <span className="option-desc"><br></br>
                Describe Sum in one word
              </span>
            </div>
          </button>

          {/* Space Probe */}
>>>>>>> origin/main
          <button
            type="button"
            className="add-option-btn"
            onClick={() => handleSelect('voice-probe')}
          >
            <div className="option-icon probe-icon">
              <Radio size={18} />
            </div>
<<<<<<< HEAD
            <div className="option-info">
              <span className="option-title">Space Probe</span>
              <span className="option-desc">Transmit an audio voice note</span>
            </div>
          </button>

=======

            <div className="option-info">
              <span className="option-title">Space Probe</span>
              <span className="option-desc"><br></br>
                Audio transmission
              </span>
            </div>
          </button>

          {/* Black Hole */}
>>>>>>> origin/main
          <button
            type="button"
            className="add-option-btn"
            onClick={() => handleSelect('black-hole')}
          >
            <div className="option-icon black-hole-icon">
              <CircleDot size={18} />
            </div>
<<<<<<< HEAD
            <div className="option-info">
              <span className="option-title">Black Hole Prayer</span>
              <span className="option-desc">Send away negativity into the void</span>
=======

            <div className="option-info">
              <span className="option-title">Black Hole</span>
              <span className="option-desc"><br></br>
                Send prayers into the void
              </span>
>>>>>>> origin/main
            </div>
          </button>
        </div>
      )}

      {/* Main Floating '+' Action Button */}
      <button
        id="addWish"
        type="button"
        className={`floating-add-btn ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
<<<<<<< HEAD
        aria-label={isOpen ? 'Close creation menu' : 'Create new celestial item'}
=======
        aria-label={
          isOpen
            ? 'Close creation menu'
            : 'Create new celestial item'
        }
>>>>>>> origin/main
      >
        {isOpen ? <X size={26} /> : <Plus size={28} />}
      </button>
    </div>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> origin/main
