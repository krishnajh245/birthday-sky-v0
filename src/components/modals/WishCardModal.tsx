import React from 'react';
import { useSky } from '../../context/SkyContext';
<<<<<<< HEAD
import { AVAILABLE_FRAMES } from '../shared/FramePicker';
import { StickerCanvasOverlay } from '../shared/StickerCanvasOverlay';
=======
import { StickerCanvasOverlay } from '../shared/StickerCanvasOverlay';
import { CardTextBoxItem } from '../shared/CardTextBoxItem';
import { CardTextBox } from '../../types/celestial';
>>>>>>> origin/main
import { X, User } from 'lucide-react';

export const WishCardModal: React.FC = () => {
  const { activeModal, setActiveModal, wishes, activeWishId } = useSky();

  if (activeModal !== 'wish-view' || !activeWishId) return null;

  const wish = wishes.find((w) => w.id === activeWishId);
  if (!wish) return null;

<<<<<<< HEAD
  const frameObj = AVAILABLE_FRAMES.find((f) => f.id === wish.frame);
  const accent = wish.accentColor || '#B89CFF';
  const creatorName = wish.creatorName || (wish.from ? wish.from.replace(/^—\s*/, '') : 'Cosmic Friend');
  const creatorAvatar = wish.creatorAvatar;

=======
  const accent = wish.accentColor || '#B89CFF';
  const gradFrom = wish.bgGradientFrom || '#1e1b4b';
  const gradTo = wish.bgGradientTo || '#0a0e27';
  const creatorName = wish.creatorName || (wish.from ? wish.from.replace(/^—\s*/, '') : 'Cosmic Friend');
  const creatorAvatar = wish.creatorAvatar;

  const titleBox: CardTextBox = wish.titleBox || {
    text: wish.title || 'Happy Birthday! ✨',
    x: 16,
    y: 20,
    width: 328,
    height: 45,
    style: wish.titleStyle || {
      font: 'elegant',
      color: '#FFE58A',
      size: 22,
      bold: true,
      italic: false,
      underline: false
    }
  };

  const bodyBox: CardTextBox = wish.bodyBox || {
    text: wish.body || 'Wishing you infinite joy!',
    x: 16,
    y: 70,
    width: 328,
    height: 125,
    style: wish.bodyStyle || {
      font: 'modern',
      color: '#ffffff',
      size: 14,
      bold: false,
      italic: false,
      underline: false
    }
  };

  const fromBox: CardTextBox = wish.fromBox || {
    text: wish.from || '— From',
    x: 16,
    y: 202,
    width: 328,
    height: 38,
    style: wish.fromStyle || {
      font: 'cursive',
      color: '#FF9FCB',
      size: 16,
      bold: false,
      italic: true,
      underline: false
    }
  };

>>>>>>> origin/main
  return (
    <div className="modal-backdrop" onClick={() => setActiveModal(null)}>
      <div
        className="modal-content wish-card-view-window animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Creator Identity Pill & Close Button */}
        <div className="card-view-top-header">
          <div className="creator-profile-badge" title={`Created by ${creatorName}`}>
            {creatorAvatar?.startsWith('emoji:') ? (
              <span className="creator-badge-emoji">{creatorAvatar.replace('emoji:', '')}</span>
            ) : creatorAvatar ? (
              <img src={creatorAvatar} alt={creatorName} className="creator-badge-avatar" />
            ) : (
              <User size={14} className="creator-badge-icon" />
            )}
            <span className="creator-badge-name">{creatorName}</span>
          </div>

          <button
            type="button"
            className="close-modal-btn"
            onClick={() => setActiveModal(null)}
            aria-label="Close card"
          >
            <X size={22} />
          </button>
        </div>

        <div
<<<<<<< HEAD
          className={`wish-card-canvas-standalone ${frameObj?.image ? 'has-image-frame' : ''}`}
          style={{
            borderColor: accent,
            boxShadow: `0 0 40px ${accent}44`
          }}
        >
          {frameObj?.image && (
            <img src={frameObj.image} alt="Frame" className="card-frame-overlay-img" />
          )}

=======
          className="wish-card-canvas-standalone"
          style={{
            borderColor: accent,
            background: `linear-gradient(135deg, ${gradFrom} 0%, ${gradTo} 100%)`,
            boxShadow: `0 0 40px ${accent}44, inset 0 0 25px rgba(255, 255, 255, 0.06)`
          }}
        >
>>>>>>> origin/main
          <div className="card-top-icon" style={{ color: accent }}>
            ✦
          </div>

<<<<<<< HEAD
          <div
            className={`card-render-title font-${wish.titleStyle?.font || 'elegant'}`}
            style={{
              color: wish.titleStyle?.color || '#FFE58A',
              fontSize: `${wish.titleStyle?.size || 30}px`,
              fontWeight: wish.titleStyle?.bold ? 'bold' : 'normal',
              fontStyle: wish.titleStyle?.italic ? 'italic' : 'normal',
              textDecoration: wish.titleStyle?.underline ? 'underline' : 'none'
            }}
          >
            {wish.title}
          </div>

          <div
            className={`card-render-body font-${wish.bodyStyle?.font || 'modern'}`}
            style={{
              color: wish.bodyStyle?.color || '#ffffff',
              fontSize: `${wish.bodyStyle?.size || 18}px`,
              fontWeight: wish.bodyStyle?.bold ? 'bold' : 'normal',
              fontStyle: wish.bodyStyle?.italic ? 'italic' : 'normal',
              textDecoration: wish.bodyStyle?.underline ? 'underline' : 'none'
            }}
          >
            {wish.body}
          </div>

          <div
            className={`card-render-from font-${wish.fromStyle?.font || 'cursive'}`}
            style={{
              color: wish.fromStyle?.color || '#FF9FCB',
              fontSize: `${wish.fromStyle?.size || 20}px`,
              fontWeight: wish.fromStyle?.bold ? 'bold' : 'normal',
              fontStyle: wish.fromStyle?.italic ? 'italic' : 'normal',
              textDecoration: wish.fromStyle?.underline ? 'underline' : 'none'
            }}
          >
            {wish.from}
          </div>
=======
          <CardTextBoxItem
            id="title"
            box={titleBox}
            onChange={() => {}}
            isEditable={false}
          />

          <CardTextBoxItem
            id="body"
            box={bodyBox}
            onChange={() => {}}
            isEditable={false}
          />

          <CardTextBoxItem
            id="from"
            box={fromBox}
            onChange={() => {}}
            isEditable={false}
          />
>>>>>>> origin/main

          <div className="card-bottom-accent" style={{ backgroundColor: accent }} />

          <StickerCanvasOverlay
            stickers={wish.stickers || []}
            isEditable={false}
          />
        </div>
      </div>
    </div>
  );
};
