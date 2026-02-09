import React from 'react';
import './Overlay.css';

interface OverlayProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function Overlay({ onClick }: OverlayProps) {
  return <div className="overlay" onClick={onClick}></div>;
}
