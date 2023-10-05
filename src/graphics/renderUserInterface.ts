import { UserInterface } from './ui/UserInterface';

export const renderUserInterface = (userInterface: UserInterface): void => {
  const graphics = userInterface.getGraphics();
  graphics.clear();
  for (const uiElement of userInterface.getUIElements()) {
    uiElement.render(graphics);
  }
};
