const puppeteer = require("puppeteer");
const faker = require("faker");

const LINK = "https://chaturbate.com/in/?tour=LQps&campaign=bYW1B&track=default&room=king143901";

async function register() {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  try {
    await page.setViewport({ width: 1280, height: 800 });

    // Simulation de navigation humaine
    await page.goto(LINK, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(8000); // attendre un peu
    await page.mouse.move(300, 400);
    await page.waitForTimeout(2000);
    await page.click('a[href="/signup/"]');
    await page.waitForNavigation();

    // Délai supplémentaire
    await page.waitForTimeout(5000);

    // Génération de données
    const username = faker.internet.userName().toLowerCase() + Math.floor(Math.random() * 1000);
    const password = faker.internet.password(10);
    const email = faker.internet.email();

    await page.type('#signup_username', username, { delay: 100 });
    await page.type('#signup_password', password, { delay: 100 });
    await page.type('#signup_email', email, { delay: 100 });

    await page.click('#age_confirmation');
    await page.click('#terms_confirmation');
    await page.waitForTimeout(1000);
    await page.click('button[type="submit"]');

    await page.waitForTimeout(10000);
    console.log(`[✅] Inscription simulée : ${username}`);
  } catch (error) {
    console.error("[❌] Erreur pendant l'inscription:", error);
  } finally {
    await browser.close();
  }
}

// Boucle toutes les 60 minutes
register();
setInterval(register, 60 * 60 * 1000);
