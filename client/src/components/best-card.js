// AROUND line 117 in the PlayerComputer, look for guessBestCategory

// this.playerTwoCards[0].playableProperties as currentCard
// this.maxCardValues[0].playableProperties as knownBestCardValues
export function guessBestCategory(currentCard, knownBestCardValues) {
  const categories = getCardCategories(currentCard);
  let highestRatio = 0;
  let bestCategory = null;
  categories.forEach((category) => {
    const value = currentCard[category];
    const ratio = value / knownBestCardValues[category];
    if (highestRatio < ratio) {
      highestRatio = ratio;
      bestCategory = category;
    }
  });
  return bestCategory;
}

function getCardCategories(currentCard) {
  return Object.keys(currentCard);
}
