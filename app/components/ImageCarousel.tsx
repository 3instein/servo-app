'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getPromoImages } from '../../lib/services';

export default function ImageCarousel() {
  const [images, setImages] = useState<{ imageUrl: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch images on component mount
    const fetchImages = async () => {
      try {
        const fetchedImages = await getPromoImages();
        setImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    // Update current index every 5 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">Loading...</div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-lg">No images available</div>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  return (
    <div className="w-full h-full relative overflow-hidden">
      <Image
        src={currentImage.imageUrl}
        alt={`Promo image ${currentIndex + 1}`}
        fill
        className="object-cover"
        priority
      />
    </div>
  );
} 