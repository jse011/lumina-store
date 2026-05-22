"use client";

import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Hologram } from "../../models/Hologram";

interface Props {
  hologram: Hologram;
  onClose: () => void;
}

export default function HologramPlayerModal({ hologram, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleEnded = () => setIsPlaying(false);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * (videoRef.current.duration || 0);
  };

  const handleDownload = () => {
    if (!hologram.videoUrl) return;
    window.open(hologram.videoUrl, "_blank", "noopener,noreferrer");
    /**
     *  const a = document.createElement("a");
    a.href = hologram.videoUrl;
    a.download = `${hologram.name}.mp4`;
    a.click();
     */
  };

  const modalContent = (
    <div className="glass-panel max-w-lg w-full rounded-[2rem] p-8 border border-white/10 bg-surface shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative">
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/5 blur-[80px] pointer-events-none" />
      <div className="px-8 pt-8 pb-4 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-bold text-white leading-tight truncate max-w-[260px]">
            {hologram.name}
          </h2>
          <p className="text-xs text-on-surface-variant">
            {hologram.duration} · {hologram.musicName}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>
      </div>
      <div className="px-8 pb-8 flex flex-col gap-6">
        <div
          className="aspect-video w-full rounded-3xl bg-black overflow-hidden relative group shadow-2xl shadow-tertiary/10 border border-tertiary/20 cursor-pointer"
          onClick={togglePlay}
        >
          {hologram.videoUrl ? (
            <video
              ref={videoRef}
              src={hologram.videoUrl}
              className="w-full h-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              playsInline
            />
          ) : (
            hologram.thumbnailUrl && (
              <img
                src={hologram.thumbnailUrl}
                alt={hologram.name}
                className="w-full h-full object-cover"
              />
            )
          )}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
              }`}
          >
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <span
                className="material-symbols-outlined text-4xl text-white"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none scan-line opacity-20" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2">
            <div
              className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative"
              onClick={(e) => {
                e.stopPropagation();
                handleSeek(e);
              }}
            >
              <div
                className="absolute left-0 top-0 bottom-0 bg-tertiary rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="text-white hover:text-tertiary transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {isPlaying ? "pause" : "play_arrow"}
                  </span>
                </button>
                <span className="text-[10px] text-white/70">
                  {currentTime} / {duration}
                </span>
              </div>
              <span className="material-symbols-outlined text-white/60 text-lg">
                hdr_on
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">music_note</span>
            {hologram.musicName || "—"}
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">timer</span>
            {hologram.duration}
          </span>
          <span className="px-3 py-1 rounded-full bg-surface-container-highest text-xs text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">toll</span>
            {hologram.creditsUsed} crédito{hologram.creditsUsed !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={handleDownload}
            disabled={!hologram.videoUrl}
            className="flex-1 py-4 rounded-2xl border border-outline-variant/30 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-xl">download</span>
            Descargar video
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl bg-white text-background font-bold text-sm hover:bg-white/90 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {modalContent}
    </div>,
    document.body
  );
}
