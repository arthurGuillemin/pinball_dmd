const DMD_MESSAGES = {
  gameOver: "GAME OVER",
  bravo: "BRAVO",
  ready: "READY?",
  go: "GO ?",
  jackpot: "JACKPOT",
  pressStart: "PRESS START",
  ball_lost: ["OOPS", "BAD"],
};

const getDMDRandomMessage = (category) => {
  if (typeof DMD_MESSAGES.category == "string") {
    return DMD_MESSAGES.category;
  }
  const choices = DMD_MESSAGES[category];
  const randomValue = choices[Math.floor(Math.random() * choices.length)];
  return randomValue;
};

export { DMD_MESSAGES, getDMDRandomMessage };
