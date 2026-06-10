'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import styles from './selectOptions.module.css';

export default function SelectOptions({
  label = 'Recherche',
  options = ['Statut', 'test'],
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        selectOption(selectedIndex);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const selectOption = (index) => {
    setSelectedIndex(index);
    setIsOpen(false);
    if (onSelect) onSelect(options[index]);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('noScroll', isOpen);
    return () => document.documentElement.classList.remove('noScroll');
  }, [isOpen]);

  return (
    <div className={styles.container}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-activedescendant={`option-${selectedIndex}`}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen(!isOpen)}
        className={`${styles.listBoxButton} ${isOpen ? styles.buttonOpen : ''}`}
      >
        <span className={styles.label}>{options[selectedIndex] || label}</span>

        <FontAwesomeIcon
          icon={isOpen ? faChevronUp : faChevronDown}
          className={styles.chevron}
        />
      </button>

      {isOpen && (
        <ul role="listbox" className={styles.list}>
          {options.map((option, index) => (
            <li
              key={option}
              id={`option-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              className={`${styles.listItem} ${index === selectedIndex ? styles.activeOption : ''}`}
              onClick={() => selectOption(index)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
