export const sessions: Map<
  string,
  {
    userStories: Map<string, string>;
    resolved: boolean;
  }
> = new Map();