
import React from 'react';
import { motion } from 'framer-motion';

type HeroTitleProps = {
  titleText: string;
  brandText: string;
};

const HeroTitle: React.FC<HeroTitleProps> = ({ titleText, brandText }) => {
  const titleWords = titleText.split(" ");

  return (
    <>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        {titleWords.map((word, wordIndex) => (
          <span
            key={wordIndex}
            className="inline-block mr-2 last:mr-0"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={`${wordIndex}-${letterIndex}`}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: wordIndex * 0.1 + letterIndex * 0.03,
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                }}
                className="inline-block text-foreground"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
        <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
          {brandText.split("").map((letter, index) => (
            <motion.span
              key={`brand-${index}`}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: titleWords.length * 0.1 + index * 0.05,
                type: "spring",
                stiffness: 150,
                damping: 25,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      </h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: (titleWords.length + brandText.length) * 0.05, duration: 0.6 }}
        className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0"
      >
        Eliminate decision fatigue and create stunning outfit combinations from your wardrobe using AI-powered matching technology.
      </motion.p>
    </>
  );
};

export default HeroTitle;
