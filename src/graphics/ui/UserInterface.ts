import { Graphics } from '../Graphics.ts';
import { UIElement } from './UIElement.ts';

export interface UserInterface {
  getGraphics: () => Graphics;
  getUIElements: () => UIElement[];
  addUIElement: (element: UIElement) => void;
}

type Props = Readonly<{
  graphics: Graphics;
}>;

class UserInterfaceImpl implements UserInterface {
  private readonly graphics: Graphics;
  private readonly uiElements: UIElement[];

  constructor({ graphics }: Props) {
    this.graphics = graphics;
    this.uiElements = [];
  }

  addUIElement = (element: UIElement): void => {
    this.uiElements.push(element);
  };

  getGraphics = (): Graphics => this.graphics;

  getUIElements = (): UIElement[] => this.uiElements;
}

export namespace UserInterface {
  export const create = (props: Props): UserInterface => new UserInterfaceImpl(props);
}
