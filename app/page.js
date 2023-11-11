'use client'
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function Home() {
  const controls = useAnimation();

  useEffect(() => {
    const updateStanzaVisibility = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      const totalScrollHeight = document.body.scrollHeight;
      const scrollProgress = scrollY / (totalScrollHeight - screenHeight); // Normalized scroll progress [0,1]

      // Calculate which stanza should be visible based on scroll progress
      const stanzaHeight = 1 / poemLines.length; // Height per stanza (as a fraction of total scroll length)
      const currentStanzaIndex = Math.floor(scrollProgress / stanzaHeight);

      // Trigger animation for the current stanza
      controls.start((i) => {
        return i === currentStanzaIndex ? { opacity: 1 } : { opacity: 0 };
      });
    };

    // Listen to scroll events
    window.addEventListener('scroll', updateStanzaVisibility);

    // Cleanup listener
    return () => window.removeEventListener('scroll', updateStanzaVisibility);
  }, [controls]);

  return (
    <>
      <style jsx>{`
        @font-face {
          font-family: 'LEDLIGHT';
          src: url('/LEDLIGHT.otf') format('opentype');
        }
      `}</style>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6">
        <div className="w-full max-w-xl mx-auto text-center">
          {/* Your component content here, using the custom font */}
          {poemLines.map((stanza, index) => (
            <motion.div
              custom={index}
              animate={controls}
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              key={index}
              className="my-20 stanza"
              style={{ fontFamily: 'LEDLIGHT' }} // Apply the font to the stanza
            >
              <p className="text-xl lg:text-3xl text-white leading-relaxed">
                {stanza.split('\n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {lineIndex !== 0 && <br />}
                    {line}
                  </React.Fragment>
                ))}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
    </>
  );

}

// poemLines array as before

const poemLines = [
  `I know, oh no,\nYou've fallen from grace,\nTumbling from the sun, through the sky's embrace.\nI see you dimming fast, burning through your flight,\nAnd I know, oh yes,\nI've hidden my own plight.`,
  `But perhaps, just this time,\nAllow me this one bet,\nOn a losing dog, where others see regret.`,
  `Yes, it's all okay,\nI'll whisper to the night,\nMy heart's an empty room, but still, I'll find the light.`,
  `I've given everyone I love a good reason to go, let them walk out the door,\nSet ablaze my past, won't haunt me anymore.\nI'll call back all my loves, to learn to live with all the stupid shit I've been doing since ninety five`,
  `I promise to fight, not to fade away,\nTo mend my mistakes since those youthful days.`,
  `And I know I can be more clever,\nAnd I know I can be more strong,\nI've learned that my scars are part of it all.`,
  `There'll come a time when everything's past,\nWhen what I am fades into photographs.\nMy errors echo in rooms once alive,\nYet the glass remains whole, my spirit survives.`,
  `Invite me inside, I'll be your dawn,\nErase the cold night, I am who I've drawn.\nLet's not dwell on the sorrows that were,\nI'll be the bet on the 'losing dog's' cure.`,
  `Just open your heart, let healing begin,\nFrom one losing dog to another, we're kin.`
];
