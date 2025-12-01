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

    if (!isActive) return null;

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="w-full h-full flex flex-col justify-center items-center p-12 text-center max-w-6xl mx-auto"
        >
            {data.type === 'title' && (
                <div className="space-y-8">
                    <h1 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lol-gold to-lol-blue">
                        {data.title}
                    </h1>
                    {data.highlight && (
                        <h2 className="text-2xl md:text-4xl text-gray-300 font-light">
                            {data.highlight}
                        </h2>
                    )}
                    <div className="mt-12 space-y-4">
                        {data.content?.map((text, i) => (
                            <p key={i} className="text-xl text-gray-400">{text}</p>
                        ))}
                    </div>
                </div>
            )}

            {data.type === 'content' && (
                <div className="w-full text-left space-y-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-lol-gold border-b border-gray-700 pb-4">
                        {data.title}
                    </h2>
                    <div className="space-y-6">
                        {data.content?.map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="flex items-start space-x-4"
                            >
                                <span className="text-lol-blue mt-1">➤</span>
                                <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed">{text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {data.type === 'video' && (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        {data.title}
                    </h2>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
                        {data.matchTime && (
                            <h3 className="text-xl md:text-2xl text-lol-gold font-medium">
                                {data.matchTime}
                            </h3>
                        )}
                        {data.videoTitle && (
                            <h3 className="text-lg md:text-xl text-gray-300 font-normal">
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
                                        src={`https://clips.twitch.tv/embed?clip=${slug}&parent=bibito-.github.io`}
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
                                    <div className="flex flex-col items-center justify-center h-full space-y-6 p-8">
                                        <PlayCircle size={64} className="text-lol-gold" />
                                        <h3 className="text-2xl font-semibold">{data.videoTitle}</h3>
                                        <a
                                            href={data.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2 bg-lol-blue text-black px-6 py-3 rounded-full font-bold hover:bg-white transition-colors"
                                        >
                                            <span>Watch Clip on Twitch</span>
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                    <div className="space-y-2 text-left w-full max-w-4xl">
                        {data.content?.map((text, i) => (
                            <p key={i} className="text-xl text-gray-400 border-l-4 border-lol-gold pl-4">{text}</p>
                        ))}
                    </div>
                </div>
            )}

            {data.type === 'quote' && (
                <div className="w-full flex flex-col items-center justify-center space-y-12">
                    <Quote size={80} className="text-lol-gold opacity-50" />
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        {data.highlight}
                    </h2>
                    <div className="space-y-4">
                        {data.content?.map((text, i) => (
                            <p key={i} className="text-2xl text-gray-400">{text}</p>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
};
