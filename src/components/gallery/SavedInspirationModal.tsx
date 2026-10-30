import React from 'react';
import { X, Trash2, Calendar, ArrowRight, Heart } from 'lucide-react';
import { EVENT_IMAGES } from '../../config/images';

interface SavedInspirationModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onClearAll: () => void;
  onPlanWithInspirations: (savedTitles: string[]) => void;
}

export const SavedInspirationModal: React.FC<SavedInspirationModalProps> = ({
  isOpen,
  onClose,
  savedIds,
  onToggleSave,
  onClearAll,
  onPlanWithInspirations,
}) => {
  if (!isOpen) return null;

  // Find image items corresponding to saved IDs
  const savedItems = EVENT_IMAGES.gallery.filter((img) => savedIds.includes(img.id));

  const handlePlanClick = () => {
    const titles = savedItems.map((item) => `${item.category}: ${item.title}`);
    onClose();
    onPlanWithInspirations(titles);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-cream-50 rounded-2xl shadow-2xl border border-cream-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200 bg-cream-100/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold-dark">
              <Heart className="w-4 h-4 fill-gold text-gold" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-charcoal-900">
                Your Saved Inspiration
              </h3>
              <p className="text-xs text-charcoal-500">
                {savedItems.length} {savedItems.length === 1 ? 'setup' : 'setups'} shortlisted
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {savedItems.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-charcoal-400 hover:text-red-700 transition-colors p-2"
                title="Clear all saved inspirations"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-charcoal-500 hover:text-charcoal-900 rounded-full hover:bg-cream-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content list */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {savedItems.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-full bg-cream-200/70 flex items-center justify-center mx-auto text-charcoal-400">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-display text-base font-semibold text-charcoal-800">
                No inspiration saved yet
              </h4>
              <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                Explore our Interactive Gallery or Featured Events and click the heart icon on any stage or floral arrangement to save ideas for your event.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-cream-100/50 rounded-xl p-3 border border-cream-200 flex items-center space-x-3.5 relative group"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 pr-6">
                    <span className="text-[10px] uppercase font-semibold text-gold-dark tracking-wider block">
                      {item.category}
                    </span>
                    <h5 className="font-display text-xs font-semibold text-charcoal-900 truncate">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-charcoal-400">Addanki style concept</p>
                  </div>

                  <button
                    onClick={() => onToggleSave(item.id)}
                    className="absolute top-3 right-3 text-charcoal-400 hover:text-red-600 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {savedItems.length > 0 && (
          <div className="p-5 border-t border-cream-200 bg-cream-100/50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-charcoal-500">
              These inspirations will be attached to your enquiry for Ram.
            </span>
            <button
              onClick={handlePlanClick}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-md transition-all active:scale-95"
            >
              <Calendar className="w-4 h-4 text-gold" />
              <span>Plan an Event Like These</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
