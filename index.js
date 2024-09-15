const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes.js');

function generateSVG(text, textColor, shape, shapeColor) {
  let shapeInstance;
  switch (shape.toLowerCase()) {
    case 'triangle':
      shapeInstance = new Triangle();
      break;
    case 'circle':
      shapeInstance = new Circle();
      break;
    case 'square':
      shapeInstance = new Square();
      break;
  }
  shapeInstance.setColor(shapeColor);

  return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shapeInstance.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
  `.trim();
}

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the logo:',
      validate: input => input.length <= 3 || 'Please enter up to three characters only.'
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (keyword or hexadecimal):'
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['Circle', 'Triangle', 'Square']
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (keyword or hexadecimal):'
    }
  ]);

  const svg = generateSVG(answers.text, answers.textColor, answers.shape, answers.shapeColor);
  
  fs.writeFileSync('logo.svg', svg);
  console.log('Generated logo.svg');
}

promptUser();
