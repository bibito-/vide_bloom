import React, { useState, useEffect } from 'react';
import { Slide } from './Slide';
import { slides } from '../data/slides';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Deck: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

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
        <div className="w-screen h-screen bg-lol-dark text-white overflow-hidden relative flex items-center justify-center">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-lol-blue/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-lol-gold/5 rounded-full blur-[100px]" />
            </div>

            {/* Main Content */}
            <div className="z-10 w-full h-full relative">
                <Slide data={slides[currentSlide]} isActive={true} />
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 flex items-center space-x-4 z-20">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-all"
                >
                    <ChevronLeft size={24} />
                </button>
                <span className="text-gray-400 font-mono">
                    {currentSlide + 1} / {slides.length}
                </span>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 disabled:opacity-30 transition-all"
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
