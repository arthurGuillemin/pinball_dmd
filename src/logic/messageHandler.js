export const getScoreFromSocket = (data) => {
  let score = null;
  if (data?.state?.score != null) {
    score = data.state.score.toString();
  }
  return score;
};

export const getBallsFromSocket = (data) => {
  let balls = null;
  if (data.state?.balls != null) {
    balls = data.state.balls;
  }
  return balls;
};
