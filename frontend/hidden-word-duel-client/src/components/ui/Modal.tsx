// src/components/ui/Modal.tsx
'use client';

import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // Optional size prop
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 animate-fadeIn"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      <div
        className={`bg-gray-custom-800 p-6 rounded-lg shadow-xl w-full ${sizeClasses[size]} animate-slideInUp mx-4`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {title && (
          <div className="mb-4">
            <h2 id="modal-title" className="text-2xl font-semibold text-primary">
              {title}
            </h2>
            <hr className="border-gray-custom-700 mt-2"/>
          </div>
        )}
        <div>{children}</div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-custom-600 hover:bg-gray-custom-500 text-lightText rounded-md transition-colors"
            aria-label="Close modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;