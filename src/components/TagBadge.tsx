
import React from 'react';

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  onClick?: () => void;
}

const TagBadge: React.FC<TagBadgeProps> = ({ tag, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-full transition-colors ${
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted hover:bg-muted/80 text-foreground'
      }`}
    >
      {tag}
    </button>
  );
};

export default TagBadge;
