const colorEscape = '\x1b[97;103m';
const resetEscape = '\x1b[0m';

function colorize(text) {
  return `${colorEscape}${text}${resetEscape}`;
}

const lines = [
  '#------------------------------------------------------------------------------------------#',
  '#                             Storybook Addon React Router v6                              #',
  '#                                                                                          #',
  "#   The package has been renamed 'storybook-addon-remix-react-router'.                     #",
  '#   This is to better reflect the content of this addon.                                   #',
  '#                                                                                          #',
  '#   If you want to use this addon with Storybook 8. You have to use the new package.       #',
  '#                                                                                          #',
  '#   npm uninstall storybook-addon-react-router-v6                                          #',
  '#   npm i -D storybook-addon-remix-react-router                                            #',
  '#------------------------------------------------------------------------------------------#',
];

lines.forEach((line) => console.log(colorize(line)));
