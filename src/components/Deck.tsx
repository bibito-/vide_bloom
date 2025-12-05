import React, { useState, useEffect } from 'react';
import { Slide } from './Slide';
import { slides } from '../data/slides';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Deck: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const [touchStartY, setTouchStartY] = useState<number | null>(null);
    const [touchEndY, setTouchEndY] = useState<number | null>(null);

    // モバイル環境でスクロールを終えるアクションでスライドがされて不快なので、閾値少し大きく設定。
    const minSwipeDistance = 70;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setTouchEndY(null);
        setTouchStartY(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
        setTouchEndY(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const xDistance = touchStart - touchEnd;
        const yDistance = (touchStartY && touchEndY) ? touchStartY - touchEndY : 0;

        const isLeftSwipe = xDistance > minSwipeDistance;
        const isRightSwipe = xDistance < -minSwipeDistance;

        // Only swipe if horizontal distance is greater than vertical distance (to avoid scrolling triggering swipe)
        if (Math.abs(xDistance) > Math.abs(yDistance)) {
            if (isLeftSwipe) {
                nextSlide();
            } else if (isRightSwipe) {
                prevSlide();
            }
        }
    };

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    return (
        <div
            className="w-screen h-[100dvh] bg-lol-dark text-white overflow-hidden relative flex"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lol-blue/5 rounded-full blur-[60px] md:blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lol-gold/5 rounded-full blur-[60px] md:blur-[100px]" />
            </div>

            {/* Main Content */}
            <div className="z-10 w-full h-full relative">
                <Slide key={currentSlide} data={slides[currentSlide]} isActive={true} />
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-center space-x-4 z-20">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-3 md:p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-all active:scale-95"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>
                <span className="text-gray-400 font-mono text-sm md:text-base">
                    {currentSlide + 1} / {slides.length}
                </span>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="p-3 md:p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-all active:scale-95"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-gray-800 w-full z-20">
                <div
                    className="h-full bg-lol-gold transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
            </div>
        </div>
    );
};
