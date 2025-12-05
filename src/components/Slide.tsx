import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { SlideData } from '../data/slides';
import { ExternalLink, PlayCircle, Quote } from 'lucide-react';

interface SlideProps {
    data: SlideData;
    isActive: boolean;
}

export const Slide: React.FC<SlideProps> = ({ data, isActive }) => {
    const variants: Variants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, x: -100, transition: { duration: 0.3 } }
    };

    // twitch側のAPI Policyでハイフンは使えないので、独自ドメインを取得ました。
    // その為、ドメインの直書きをやめました。
    const getParentDomain = () => {
        if (typeof window !== 'undefined') {
            return window.location.hostname;
        }
        return 'localhost';
    };


    if (!isActive) return null;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="w-full h-full flex flex-col justify-start items-center p-6 pt-16 md:p-12 md:pt-20 text-center max-w-6xl mx-auto overflow-y-auto"
        >
            {data.type === 'title' && (
                <div className="space-y-6 md:space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lol-gold to-lol-blue">
                        {data.title}
                    </h1>
                    {data.highlight && (
                        <h2 className="text-xl md:text-2xl lg:text-4xl text-gray-300 font-light">
                            {data.highlight}
                        </h2>
                    )}
                    <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
                        {data.content?.map((text, i) => (
                            <p key={i} className="text-base md:text-xl text-gray-400">{text}</p>
                        ))}
                    </div>
                </div>
            )}

            {data.type === 'content' && (
                <div className="w-full text-left space-y-6 md:space-y-8">
                    <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-lol-gold border-b border-gray-700 pb-2 md:pb-4">
                        {data.title}
                    </h2>
                    <div className="space-y-4 md:space-y-6">
                        {data.content?.map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="flex items-start space-x-3 md:space-x-4"
                            >
                                <span className="text-lol-blue mt-1 text-sm md:text-base">➤</span>
                                <p className="text-lg md:text-2xl lg:text-3xl text-gray-200 leading-relaxed">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {data.type === 'video' && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 md:space-y-8">
                    <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-1 md:mb-2">
                        {data.title}
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
                        {data.matchTime && (
                            <h3 className="text-lg md:text-xl lg:text-2xl text-lol-gold font-medium">
                                {data.matchTime}
                            </h3>
                        )}
                        {data.videoTitle && (
                            <h3 className="text-base md:text-lg lg:text-xl text-gray-300 font-normal">
                                {data.videoTitle}
                            </h3>
                        )}
                    </div>
                    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 w-full max-w-4xl shadow-2xl shadow-lol-blue/10 aspect-video">
                        {(() => {
                            const getTwitchSlug = (url: string) => {
                                const match = url.match(/(?:clip\/|clips\.twitch\.tv\/)([^/?]+)/);
                                return match ? match[1] : null;
                            };
                            const slug = data.videoUrl ? getTwitchSlug(data.videoUrl) : null;

                            if (slug) {
                                return (
                                    <iframe
                                        src={`https://clips.twitch.tv/embed?clip=${slug}&parent=${getParentDomain()}`}
                                        height="100%"
                                        width="100%"
                                        allowFullScreen={true}
                                        scrolling="no"
                                        frameBorder="0"
                                        title={data.videoTitle}
                                    ></iframe>
                                );
                            } else {
                                return (
                                    <div className="flex flex-col items-center justify-center h-full space-y-4 md:space-y-6 p-4 md:p-8">
                                        <PlayCircle size={48} className="text-lol-gold md:w-16 md:h-16" />
                                        <h3 className="text-xl md:text-2xl font-semibold text-center">{data.videoTitle}</h3>
                                        <a
                                            href={data.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 bg-lol-blue text-black px-4 py-2 md:px-6 md:py-3 rounded-full font-bold hover:bg-white transition-colors text-sm md:text-base"
                                        >
                                            <span>Watch Clip on Twitch</span>
                                            <ExternalLink size={16} className="md:w-5 md:h-5" />
                                        </a>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                    <div className="space-y-2 text-left w-full max-w-4xl hidden md:block">
                        {data.content?.map((text, i) => (
                            <p key={i} className="text-lg md:text-xl text-gray-400 border-l-4 border-lol-gold pl-4">{text}</p>
                        ))}
                    </div>
                </div>
            )}

            {data.type === 'quote' && (
                <div className="w-full flex flex-col items-center justify-center space-y-8 md:space-y-12">
                    <Quote size={60} className="text-lol-gold opacity-50 md:w-20 md:h-20" />
                    <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                        {data.highlight}
                    </h2>
                    <div className="space-y-3 md:space-y-4">
                        {data.content?.map((text, i) => (
                            <p key={i} className="text-lg md:text-2xl text-gray-400">{text}</p>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};
