import * as puppeteer from 'puppeteer';

export const scrapImageFromResponse = async (searchQuery: string): Promise<string> => {

  const query = `https://www.google.com/search?safe=active&source=lnms&tbm=isch&sa=X&tbs=""&q=${searchQuery}`

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(query);

  await browser.close();
  return '';
}
