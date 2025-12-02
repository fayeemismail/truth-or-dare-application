import React from "react";
import Button from "./Layout/Button";
import { Home } from "lucide-react";

const About = ({ onHome }) => {
  return (
    <div className="min-h-screen bg-royal-dark flex items-center justify-center p-4">
      <div className="bg-royal-mid rounded-2xl p-8 w-full max-w-md shadow-2xl border border-royal-border animate-bounce-in">

        <h1 className="text-3xl font-bold text-royal-light mb-4 text-center">
          About This App
        </h1>

        <p className="text-royal-muted mb-6 text-center">
          This Truth or Dare app was created to bring fun, excitement, and memorable moments to any gathering!
          Add players, start the game, and enjoy a smooth and stylish experience.
        </p>

        <p className="text-royal-light mb-6 text-center">
          Built with React, TailwindCSS, and passion.
        </p>
        <p className="text-center">
            Authorine kurich parayuvanel:- <br /> Kooduthal onnum parayanilla ini ariyanam enn aanel thaye link ond
        </p>
        {/* Social Links */}
        <div className="text-center space-y-2 mt-6">
          <a
            href="https://github.com/fayeemismail"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-royal-accent hover:text-royal-light transition"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/faheemismail/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-royal-accent hover:text-royal-light transition"
          >
            LinkedIn
          </a>

          <a
            href="https://instagram.com/faheem_ismail_/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-royal-accent hover:text-royal-light transition"
          >
            Instagram
          </a>

          <a
            href="https://faheem-ismail.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-royal-accent hover:text-royal-light transition"
          >
            Portfolio
          </a>
        </div>

        <Button
          onClick={onHome}
          variant="transparent"
          className="text-royal-light border border-royal-light text-sm py-2 px-4 rounded-lg bg-transparent hover:bg-royal-mid hover:border-royal-accent transition-colors w-full mt-6"
        >
          <Home size={14} className="inline-block mr-1" /> Home
        </Button>

      </div>
    </div>
  );
};

export default About;
