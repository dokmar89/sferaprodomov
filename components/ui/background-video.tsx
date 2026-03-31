'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface BackgroundVideoProps {
  videoWebm?: string
  videoMp4?: string
  posterImage: string
  opacity?: number
}

export function BackgroundVideo({
  videoWebm,
  videoMp4,
  posterImage,
  opacity = 20,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const handleCanPlay = () => setIsVideoReady(true)
    const handleError = () => setHasError(true)

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [])

  const hasVideo = videoWebm || videoMp4

  return (
    <div className="absolute inset-0">
      {/* Poster image - fades out once video is ready */}
      <Image
        src={posterImage}
        alt=""
        fill
        className="object-cover transition-opacity duration-1000"
        style={{ opacity: isVideoReady && !hasError ? 0 : opacity / 100 }}
        priority
      />

      {/* Video - fades in over poster when loaded */}
      {hasVideo && !hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterImage}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: isVideoReady ? opacity / 100 : 0 }}
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          {videoMp4 && <source src={videoMp4} type="video/mp4" />}
        </video>
      )}
    </div>
  )
}
