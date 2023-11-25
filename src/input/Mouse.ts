import { Engine } from '../core/Engine';
import { check, checkNotNull } from '../utils';

export enum MouseButton {
  LEFT = 'LEFT',
  MIDDLE = 'MIDDLE',
  RIGHT = 'RIGHT'
}

export interface Mouse {
  mouseDown: (event: MouseEvent) => void;
  mouseUp: (event: MouseEvent) => void;
  touchStart: (event: TouchEvent) => void;
  touchEnd: (event: TouchEvent) => void;
  registerEventHandlers: (window: Window, engine: Engine) => void;
  getHeldButtons: () => MouseButton[];
}

const createMouseImpl = (): Mouse => {
  let engine: Engine | null = null;
  const heldButtons: Set<MouseButton> = new Set();

  const mouseDown = (event: MouseEvent) => {
    checkNotNull(engine);
    const buttons = getMouseButtons(event);
    for (const button of buttons) {
      heldButtons.add(button);
    }
    for (const button of buttons) {
      engine!.mouseDown({ button });
    }
  };

  const mouseUp = (event: MouseEvent) => {
    checkNotNull(engine);
    const buttons = getMouseButtons(event);
    for (const button of buttons) {
      heldButtons.delete(button);
    }
    for (const button of buttons) {
      engine!.mouseUp({ button });
    }
  };

  const touchStart = () => {
    checkNotNull(engine);
    engine!.mouseDown({ button: MouseButton.LEFT });
  };

  const touchEnd = () => {
    checkNotNull(engine);
    engine!.mouseUp({ button: MouseButton.LEFT });
  };

  const registerEventHandlers = (window: Window, _engine: Engine) => {
    check(engine === null);
    engine = _engine;
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('touchstart', touchStart);
    window.addEventListener('touchend', touchEnd);
  };

  const getHeldButtons = () => [...heldButtons];

  return {
    registerEventHandlers,
    mouseDown,
    mouseUp,
    touchStart,
    touchEnd,
    getHeldButtons
  };
};

const getMouseButtons = (event: MouseEvent): MouseButton[] => {
  const buttons = [];
  if ((event.buttons & 1) > 0) {
    // support Apple's bullshit
    if (event.ctrlKey) {
      buttons.push(MouseButton.RIGHT);
    } else {
      buttons.push(MouseButton.LEFT);
    }
  }
  if ((event.buttons & 1) > 0 && event.ctrlKey) buttons.push(MouseButton.RIGHT);
  if ((event.buttons & 2) > 0) buttons.push(MouseButton.RIGHT);
  if ((event.buttons & 4) > 0) buttons.push(MouseButton.MIDDLE);
  return buttons;
};

export namespace Mouse {
  export const create = (): Mouse => createMouseImpl();
}
