import React, { useState, useEffect } from "react";
import {
  SentimentNeutral,
  ThumbUp,
  ThumbDown,
  Share
} from "@mui/icons-material";
import VanillaTilt from "vanilla-tilt";
import { IconButton } from "@mui/material";
import "./style.css";
import BadDad1 from "./bad-dad.png";
import BadDad2 from "./bad-dad02.png";

export default function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [joke, setCurrentJoke] = useState(null);
  const [userReaction, setUserReaction] = useState(null);
  const URL = "https://official-joke-api.appspot.com/random_joke";

  async function handleAPICall() {
    const res = await fetch(URL);
    const json = await res.json();
    setCurrentJoke(json);
  }

  function handleFlip(event) {
    event.preventDefault();
    setIsFlipped((prevState) => !prevState);
  }
  function handleReaction(reaction) {
    setUserReaction(reaction);
    // Make API call to persist the reaction
  }

  useEffect(() => {
    if (!joke) {
      handleAPICall();
    }
  }, [joke, isFlipped]);

  useEffect(() => {
    if (joke) {
      const setup = document.querySelector(".joke-setup");
      document.querySelector(".setup-background").style.height = `${setup.clientHeight * 1.5}px`
    }
  }, [joke]);

  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 15,
      speed: 400,
      // glare: true,
      startY: 8,
      startX: 4,
      perspective: 1500
      // "max-glare": 0.55,
    });
  });

  return (
    <div className="container">
      <div className="card">
        <div className={isFlipped ? "card-inner is-flipped" : "card-inner"}>
          <div className="card-face" id="background-img">
            <img
              src={BadDad2}
              className="background-img"
              alt="bad-dad-artwork"
            />
            <span className="joke-number joke-number--top-right">
              id:{joke?.id}
            </span>
            <span className="joke-number joke-number--bottom-left">
              id:{joke?.id}
            </span>
            <h2 className="joke-setup">{joke?.setup}</h2>
            {/* {console.log(
              "what is this",
              document.querySelector(".joke-setup")?.attributes
            )} */}
            <div
              className="setup-background"
              // style={{ height: document.querySelector(".joke-setup") }}
            ></div>
          </div>
          <div className="card-face card-face--back">
            <img
              src={BadDad2}
              className="background-img background-img--back"
              alt="bad-dad-artwork"
            />
            <div className="rating" style={{ border: "2px solid black" }}>
              <span className="percent">32%</span>
              <div
                className="rating-bar"
                style={{
                  width: "2px",
                  height: "100%",
                  background: "black",
                  marginLeft: "-18%"
                }}
              ></div>
              <span className="percent">68%</span>
            </div>
            <p>{joke?.punchline}</p>
            <div className="action-buttons">
              <IconButton className="action-btn" onClick={handleReaction}>
                <ThumbUp htmlColor="rgba(255, 255, 255, 0.8)" />
              </IconButton>
              <IconButton className="action-btn">
                <Share htmlColor="rgba(255, 255, 255, 0.8)" />
              </IconButton>
              <IconButton className="action-btn" onClick={handleReaction}>
                <ThumbDown htmlColor="rgba(255, 255, 255, 0.8)" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="btn-flip top-left" onClick={handleFlip}></div>
        <div className="btn-flip top-right" onClick={handleFlip}></div>
        <div className="btn-flip bottom-left" onClick={handleFlip}></div>
        <div className="btn-flip btn-flip--bottom-right" onClick={handleFlip}></div>
      </div>
    </div>
  );
}
