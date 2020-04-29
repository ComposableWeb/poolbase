import puppeteer, { ConsoleMessage } from 'puppeteer';
import { bucket } from '../initFirebaseAdmin';

import { PageData } from '../interfaces';

interface ScrapeData extends Partial<PageData> {
  'processed.html': boolean;
}

export const scrapeHTML = async (url: string, pageId: string): Promise<ScrapeData> => {
  const saveScreenShot = async (imageBuffer: string | Buffer, pageId: string, size = 'preview'): Promise<string> => {
    if (!imageBuffer || imageBuffer === '') {
      throw new Error('No screenshot data provided');
    }
    if (!pageId || pageId === '') {
      throw new Error('No pageId provided');
    }

    // Create a file object
    const file = bucket.file(`/screenshots/${size}/${pageId}.png`);

    // Save the image
    await file.save(imageBuffer);

    return 'saved screenshot!';
  };

  const urlObject = new URL(url);
  let data: ScrapeData = {
    metaKeywords: null,
    metaDescription: null,
    metaTitle: null,
    metaAuthor: null,
    metaPublisher: null,
    mainText: null,
    status: null,
    mainImageUrl: null,
    metaIconUrl: `${urlObject.protocol}//${urlObject.host}/favicon.ico`,
    'processed.html': true,
  };
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768 });
  function logMessage(msg: ConsoleMessage): void {
    if (msg.type() === 'log') {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    console.debug(`PAGE ${msg.type().toUpperCase()} : ${msg.text()}`);
  }
  page.on('console', logMessage);
  try {
    const response = await page.goto(url, { waitUntil: 'networkidle2' });
    data['status'] = response?.status() || 'failed';
  } catch (err) {
    console.error(err);
    await browser.close();
    data['status'] = 'failed';
    return data;
  }

  try {
    await page.waitForSelector('head > title');
    const extractedFromHEAD = await page.evaluate(() => {
      console.debug('extractedFromHEAD');
      return {
        ...(!!document.querySelector('title') && { metaTitle: document?.querySelector('title')?.innerText.trim() }),
        ...(!!document.querySelector('meta[name="keywords"]') && {
          metaKeywords: document
            ?.querySelector('meta[name="keywords"]')
            ?.getAttribute('content')
            ?.split(',')
            .map((keyword) => keyword.trim()),
        }),
        ...(!!document.querySelector('meta[name="author"]') && {
          metaAuthor: document?.querySelector('meta[name="author"]')?.getAttribute('content'),
        }),
        ...(!!document.querySelector('meta[name="publisher"]') && {
          metaPublisher: document?.querySelector('meta[name="publisher"]')?.getAttribute('content'),
        }),
        ...(!!document.querySelector('meta[name="description"]') && {
          metaDescription: document?.querySelector('meta[name="description"]')?.getAttribute('content'),
        }),
        ...(!!document.querySelector('head > link[rel*="icon"]') && {
          metaIconUrl: (document?.querySelector('head > link[rel*="icon"]') as HTMLLinkElement)?.href,
        }),
      };
    });
    data = {
      ...data,
      ...extractedFromHEAD,
    };
  } catch (err) {
    console.error(err);
  }
  try {
    await page.waitForSelector('body');

    await page.waitFor(2000); // give page 2 seconds to load/render (SPA)
    const extractedFromBody = await page.evaluate(() => {
      const findMainContentElement = (): HTMLElement | null => {
        console.debug('findMainContentElement' + ' ' + document.querySelector('body')?.innerText.substring(0, 120));
        const body = document.querySelector('body');
        const bodyText = document.querySelector('body')?.innerText;
        let main = document.querySelector('main');
        if (main) {
          return main;
        }
        main = document.querySelector('#main');
        if (main && bodyText && main.innerText.length >= bodyText?.length * 0.3) {
          return main;
        }
        main = document.querySelector('.main');
        if (main && bodyText && main.innerText.length >= bodyText?.length * 0.3) {
          return main;
        }
        main = document.querySelector('#content');
        if (main && bodyText && main.innerText.length >= bodyText?.length * 0.3) {
          return main;
        }
        return body;
      };
      const main = findMainContentElement();
      const getMainText = (): string | null => {
        console.debug('getMainText' + ' ' + main?.innerText.substring(0, 100));
        return main?.innerText || null;
      };
      const mainText = getMainText();
      const getMainImageUrlFromMainElement = (): string | null => {
        if (!main) {
          return null;
        }
        console.debug('getMainImageUrlFromMainElement' + ' ' + main.getElementsByTagName('img').length);
        const _score = (image: HTMLImageElement): number => {
          let score = 0;
          let src;
          if (image.getAttribute('src')) {
            src = image.getAttribute('src');
          }
          if (!src) {
            return -10000;
          }

          const rules = [
            { pattern: /(large|big)/, score: 1 },
            { pattern: /static/, score: 1 },
            { pattern: /upload/, score: 1 },
            { pattern: /media/, score: 1 },
            { pattern: /gravatar.com/, score: -1 },
            { pattern: /feeds.feedburner.com/, score: -1 },
            { pattern: /icon/i, score: -1 },
            { pattern: /logo/i, score: -1 },
            { pattern: /spinner/i, score: -1 },
            { pattern: /loading/i, score: -1 },
            { pattern: /badge/, score: -1 },
            { pattern: /1x1/, score: -1 },
            { pattern: /pixel/, score: -1 },
            { pattern: /ads/i, score: -1 },
            { pattern: /doubleclick/i, score: -1 },
          ];

          for (let i = 0, l = rules.length; i < l; i++) {
            if (rules[i].pattern.exec(src)) {
              score += rules[i].score;
            }
          }
          return score;
        };
        const img = main.getElementsByTagName('img');
        const images = [];
        if (img.length) {
          for (let i = 0, l = img.length; i < l; i++) {
            //Look for lazy loaded images
            if (img[i].getAttribute('data-src')) {
              img[i].setAttribute('src', img[i].getAttribute('data-src') || '');
            }
            if (img[i].getAttribute('data-lazy-src')) {
              img[i].setAttribute('src', img[i].getAttribute('data-lazy-src') || '');
            }

            //Compute surface
            const w = +(img[i].naturalWidth || img[i].getAttribute('width') || 1);
            const h = +(img[i].naturalHeight || img[i].getAttribute('height') || 1);
            const surface = w * h;

            const score = _score(img[i]);

            //Filter by size and minimum score
            if (score >= 0 && surface > 100 * 100) {
              images.push({ img: img[i], surface, score });
            }
          }

          if (images.length > 0) {
            //Sort by score
            images.sort((a, b) => {
              if (a.surface === b.surface) {
                return b.score - a.score;
              } else {
                return b.surface - a.surface;
              }
            });

            return images[0].img.src;
          }
        }
        return null;
      };
      const getMainImageUrl = (): string | null => {
        let mainImage = document.querySelector('meta[property="og:image"]');
        if (mainImage) {
          console.debug('getMainImageUrl' + ' ' + mainImage.getAttribute('content')?.trim());
          return mainImage.getAttribute('content')?.trim() || null;
        }
        mainImage = document.querySelector('meta[name="twitter:image"]');
        if (mainImage) {
          console.debug('getMainImageUrl' + ' ' + mainImage.getAttribute('content')?.trim());
          return mainImage.getAttribute('content')?.trim() || null;
        }
        if (main) {
          const mainImageUrl = getMainImageUrlFromMainElement();
          if (mainImageUrl) {
            console.debug('getMainImageUrl' + ' ' + mainImageUrl);
            return mainImageUrl;
          }
        }
        return null;
      };

      const mainImageUrl = getMainImageUrl();
      return {
        ...(mainText?.length && { mainText }),
        ...(mainImageUrl && { mainImageUrl }),
      };
    });
    data = {
      ...data,
      ...extractedFromBody,
    };
  } catch (err) {
    console.error(err);
  }
  try {
    let imageBuffer: string | Buffer = await page.screenshot();
    await saveScreenShot(imageBuffer, pageId);
    imageBuffer = await page.screenshot({ fullPage: true });
    await saveScreenShot(imageBuffer, pageId, 'full');
  } catch (err) {
    console.error(err);
  }
  await browser.close();
  return data;
};
