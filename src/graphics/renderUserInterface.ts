import { UserInterface } from './ui/UserInterface.ts';

export const renderUserInterface = (userInterface: UserInterface): void => {
  const graphics = userInterface.getGraphics();
  graphics.clear();
  for (const uiElement of userInterface.getUIElements()) {
    uiElement.render(graphics);
  }
};
