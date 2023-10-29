import { Seconds } from '../utils/time';

export type UpdateEvent = Readonly<{
  updateTime: Seconds;
}>;
