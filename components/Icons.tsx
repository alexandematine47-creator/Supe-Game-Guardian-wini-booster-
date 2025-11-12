
import React from 'react';

export const RobuxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 17l10 5 10-5"></path>
    <path d="M2 12l10 5 10-5"></path>
  </svg>
);

export const DiamondIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2.7 10.3a2.4 2.4 0 0 0-1.5 4.3l7.9 7.9a2.4 2.4 0 0 0 3.4 0l7.9-7.9a2.4 2.4 0 0 0-1.5-4.3l-3.3 3.3-1.6-1.6a2.4 2.4 0 0 0-3.4 0l-1.6 1.6zM12 2l3.3 3.3-1.6 1.6a2.4 2.4 0 0 1-3.4 0L8.7 5.3z"></path>
  </svg>
);

export const MinimizeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 14H4v-4h16v4z" />
  </svg>
);

export const RestoreIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4v6h6V4zm2 2v2h4v4h2V6h-6zM8 14H6v4h6v-2H8v-2z" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
  </svg>
);
