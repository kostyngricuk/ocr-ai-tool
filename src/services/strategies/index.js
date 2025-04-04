const STRATEGIES = {
  mistral: await import("./mistral"),
};

export const getStrategy = (strategy) => {
  if (!STRATEGIES[strategy]) {
    throw new Error(`Strategy ${strategy} not found`);
  }

  return STRATEGIES[strategy];
};