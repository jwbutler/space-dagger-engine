export type Seconds = number;

export const getCurrentTimeSeconds = (): Seconds => performance.now() / 1000;
