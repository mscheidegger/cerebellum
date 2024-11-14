import { Builder, Browser } from 'selenium-webdriver';

import { AnthropicPlanner, BrowserAgent, pauseForInput } from 'cerebellum-ai';


(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    await driver.get('https://www.google.com');
    
    // Define your goal
    const goal = 'Show me the wikipedia page of the creator of Bitcoin';
    
    // Create the Cerebellum browser agent
    const planner = new AnthropicPlanner({ 
      apiKey: process.env.ANTHROPIC_API_KEY as string,
      debugImagePath: './llmView.png'
    });
    const agent = new BrowserAgent(driver, planner, goal, {
      pauseAfterEachAction: true,
    });

    // Have Cerebellum takeover website navigation
    await agent.start();

    // Goal has now been reached, you may interact with the Selenium driver any way you want
    await pauseForInput();
    
  } finally {
    await driver.quit();
  }
})();