import { Builder, Browser } from 'selenium-webdriver';

import { AnthropicPlanner, BrowserAgentOptions, BrowserAgent, pauseForInput } from 'cerebellum-ai';

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();

  try {
    // Set your starting page
    await driver.get('https://en.wikipedia.org/wiki/Special:Random');
    
    // Define your goal
    const goal = 'You have been dropped on a random wikipedia page, navigate to the wikipedia page for California using only links inside articles.';

    const options: BrowserAgentOptions = {
        additionalInstructions: [
            'Do not search or use the search bar on any websites.'
        ],
        pauseAfterEachAction: true
    }
    
    // Create the Cerebellum browser agent
    const planner = new AnthropicPlanner({ apiKey: process.env.ANTHROPIC_API_KEY as string});
    const agent = new BrowserAgent(driver, planner, goal, options);

    // Have Cerebellum takeover website navigation
    await agent.start();

    // Goal has now been reached, you may interact with the Selenium driver any way you want
    await pauseForInput();
  } finally {
    await driver.quit();
  }
})();