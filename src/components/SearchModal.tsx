'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, CornerDownLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { sidebarData } from '@/lib/docs-data';
import { fuzzySearch, SearchResult } from '@/lib/docs-search';

const searchableData = sidebarData.flatMap(group => group.links);

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (results.length || 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + (results.length || 1)) % (results.length || 1));
      }
      if (e.key === 'Enter' && results[selectedIndex]) {
        handleSelect(results[selectedIndex].href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  const handleSearch = (val: string) => {
    setQuery(val);
    if (!val) {
      setResults([]);
      return;
    }
    const filtered = fuzzySearch(val, searchableData);
    setResults(filtered);
    setSelectedIndex(0);
  };

  const handleSelect = (href: string) => {
    router.push(href);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="search-modal animate-scale-in" 
        onClick={e => e.stopPropagation()}
      >
        <div className="search-modal-header">
          <Search size={18} className="search-icon" />
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Search documentation..." 
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          <button className="search-close-btn" onClick={onClose}>
            <kbd>ESC</kbd>
          </button>
        </div>

        <div className="search-modal-body">
          {query && results.length === 0 ? (
            <div className="search-no-results">
              No results for "<strong>{query}</strong>"
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-list">
              {results.map((result, index) => (
                <div 
                  key={result.href}
                  className={`search-result-item ${index === selectedIndex ? 'active' : ''}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => handleSelect(result.href)}
                >
                  <FileText size={16} className="item-icon" />
                  <div className="item-content">
                    <div className="item-title">{result.title}</div>
                    <div className="item-path">{result.href.replace('/docs/', '').replace(/\//g, ' > ')}</div>
                  </div>

                  {index === selectedIndex && (
                    <CornerDownLeft size={14} className="item-enter-icon" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="search-placeholder">
              Try searching for "Extensions", "Tracking", or "API"...
            </div>
          )}
        </div>

        <div className="search-modal-footer">
          <div className="footer-command">
            <kbd>↑↓</kbd> <span>Navigate</span>
          </div>
          <div className="footer-command">
            <kbd>↵</kbd> <span>Select</span>
          </div>
          <div className="footer-command">
            <kbd>ESC</kbd> <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
