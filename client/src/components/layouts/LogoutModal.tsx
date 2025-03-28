import React, { useEffect, useRef } from "react";

interface LogoutModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    const modal = modalRef.current;
    const focusableEls =
      modal?.querySelectorAll<HTMLElement>(focusableSelectors);
    const firstEl = focusableEls?.[0];
    const lastEl = focusableEls?.[focusableEls.length - 1];

    // Autofokus på Cancel (sista i HTML men först i tabbflödet)
    firstEl?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }

      if (e.key === "Tab" && focusableEls && firstEl && lastEl) {
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed top-4 right-4 flex items-center justify-center z-50 bg-container p-4 rounded-xl border-4 border-border"
      role="dialog"
      aria-modal="true"
      aria-label="Logout confirmation"
    >
      <div className="flex flex-col-reverse md:flex-row justify-center gap-2">
        <button
          onClick={onConfirm}
          className="border-4 border-border bg-button hover:bg-hoveredButton text-text py-1.5 px-3 rounded-2xl transition-opacity duration-200 ease-in-out"
        >
          Logout
        </button>
        <button
          onClick={onCancel}
          className="border-4 border-border bg-activeButton hover:bg-hoveredButton text-black py-1.5 px-3 rounded-2xl transition-opacity duration-200 ease-in-out"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;
