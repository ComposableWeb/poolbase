import puppeteer from 'puppeteer';

type ScrapeData = {
  status: number | string | null;
  metaKeywords: string[] | null;
  metaDescription: string | null;
  metaTitle: string | null;
};
export const scrapeHTML = async (url: string): Promise<ScrapeData> => {
  let data: ScrapeData = {
    metaKeywords: null,
    metaDescription: null,
    metaTitle: null,
    status: null,
  };
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const page = await browser.newPage();
  try {
    const response = await page.goto(url);
    data['status'] = response?.status() || 'failed';
  } catch (e) {
    console.log(e);
    await browser.close();
    data['status'] = 'failed';
    return data;
  }
  try {
    await page.waitForSelector('head > title');
    const extractedFromHEAD = await page.evaluate(() => {
      return {
        ...(!!document.querySelector('title') && { metaTitle: document?.querySelector('title')?.innerText.trim() }),
        ...(!!document.querySelector('meta[name=keywords]') && {
          metaKeywords: document?.querySelector('meta[name=author]')?.getAttribute('content'),
        }),
        ...(!!document.querySelector('meta[name=author]') && {
          metaAuthor: document?.querySelector('meta[name=author]')?.getAttribute('content'),
        }),
      };
    });
    data = {
      ...data,
      ...extractedFromHEAD,
    };
  } catch (e) {
    console.log(e);
  }

  return data;
};
