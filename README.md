# Grace Fishers Gear Inventory

A web app for tracking AV and IT equipment (asset tags, check-in/out, maintenance) and consumable supplies (batteries, tape, foamies) at Grace Fishers Church.

- **The page** is hosted free on GitHub Pages.
- **The data** lives in four SharePoint lists on your Microsoft 365 site.
- **Sign-in** uses each person's Grace Fishers Microsoft 365 account.

The repository only holds the app's code. No inventory data is stored on GitHub.

---

## What's in this folder

| File | What it is |
|---|---|
| `index.html` | The inventory app |
| `config.js` | Your settings (tenant ID, app ID, SharePoint site). The only file you edit. |
| `setup.html` | Run once to create the SharePoint lists |
| `vendor/` | Microsoft's sign-in library (MSAL) and a QR code generator. Both are MIT-licensed. |

While `config.js` is blank, the app runs in **demo mode** with sample data, so you can open it and click around before anything is connected.

---

## Setup (about 30–45 minutes, once)

You'll need:

- a **GitHub account**, and
- **admin rights in Microsoft 365**, or someone who has them, for step 3.

### 1. Pick or create the SharePoint site

1. Choose the site that should hold the inventory, such as an existing "Production" or "Tech" team site, or create a new one in SharePoint.
2. Add the people who will use the app as **Members** of that site.
   - Members can add and edit inventory.
   - Visitors can only look.
3. Copy the site's address, for example `https://gracefishers.sharepoint.com/sites/Production`.

### 2. Put the app on GitHub Pages

1. Sign in at github.com. Consider creating an organization such as `gracefishers`, so the app isn't tied to one person's account.
2. Click **New repository**.
   - Name it `inventory`.
   - Set it to **Public**. GitHub Pages is free for public repositories, and the code holds no secrets or data.
   - Click **Create repository**.
3. Click **uploading an existing file**. Drag in every file and the `vendor` folder from this package, then click **Commit changes**.
4. Go to **Settings → Pages**.
   - Under **Branch**, choose `main` and `/ (root)`.
   - Click **Save**.
5. After a minute, the page shows your address, for example `https://gracefishers.github.io/inventory/`. Open it: you should see the demo.

### 3. Register the app with Microsoft (needs a 365 admin)

1. Go to **entra.microsoft.com**, then **Identity → Applications → App registrations → New registration**.
2. Fill in the registration:
   - **Name:** `Gear Inventory`
   - **Supported account types:** *Accounts in this organizational directory only*
   - **Redirect URI:** platform **Single-page application (SPA)**, with your Pages address exactly, including the trailing slash, for example `https://gracefishers.github.io/inventory/`
   - Click **Register**.
3. On the app's **Overview** page, copy:
   - **Application (client) ID**
   - **Directory (tenant) ID**
4. Open **Authentication**. Under *Single-page application*, click **Add URI** and add the setup page, for example `https://gracefishers.github.io/inventory/setup.html`. Click **Save**.
5. Open **API permissions → Add a permission → Microsoft Graph → Delegated permissions**, and add:
   - `Sites.ReadWrite.All`, which lets the app read and write list items
   - `Sites.Manage.All`, which lets `setup.html` create the lists. You can remove this one after setup.
6. Click **Grant admin consent for Grace Fishers Church** and confirm.

These are *delegated* permissions. The app acts as the signed-in person and can only reach SharePoint sites that person can already open. It doesn't get access to anything new.

### 4. Fill in `config.js`

1. In your GitHub repository, open `config.js` and click the pencil icon to edit.
2. Fill in the three values:

   ```js
   tenantId: "your-directory-tenant-id",
   clientId: "your-application-client-id",
   siteUrl: "https://gracefishers.sharepoint.com/sites/Production",
   ```

3. Click **Commit changes**. GitHub Pages updates within a minute or two.

### 5. Create the lists

1. Open `https://<your-pages-address>/setup.html`.
2. Click **Sign in and create lists**, and sign in as someone who owns the SharePoint site.
3. It creates:
   - **GF Equipment**
   - **GF Equipment Log**
   - **GF Supplies**
   - **GF Supply Log**

   It's safe to run again: lists that already exist are left alone, and missing columns are added.

### 6. Start using it

1. Open the app address and sign in.
2. Share the link with your team.
3. On phones, open the link and choose **Add to Home Screen**, so it opens like an app.

---

## Day-to-day

- **Equipment.** Each item gets an asset tag like `GF-0001`. From an item you can check it out (who has it and when it's due back), check it in, log maintenance, edit or delete it. Overdue items turn red.
- **Consumables.** Counted by quantity. Use the − and + buttons for one at a time, or open a supply to take out or restock a larger amount. Set a reorder level and the tab shows how many supplies are low. To get a shopping list, filter to **Low or out** and click **Export CSV**.
- **Labels.** Tick items, or use whatever is filtered, and click **Labels** or **Bin labels**. A printable sheet opens in a new tab, sized for **Avery 5160 / 8160** (30 per page). Print at 100% scale with margins set to None.
  - Put equipment labels on the gear.
  - Put supply labels on the bin or shelf, not on each roll.
  - Scanning a label with a phone camera opens that item.
- **History.** Every change records who made it and when, using people's Microsoft 365 names.
- **Updates.** The page refreshes from SharePoint every 45 seconds and whenever you switch back to it. There's also a Refresh link in the header.

## Working in SharePoint directly

You can open the four lists in SharePoint to view them, make your own views, or export to Excel.

- Don't rename or delete the columns.
- Don't change **Asset tag** or **Bin code**. The app and the QR labels depend on them.

## Customizing

- **Asset tag prefix:** change `tagPrefix` in `config.js`. This only affects new items.
- **Category choices:** edit the `CATEGORIES` and `CONS_CATEGORIES` lists near the top of the script in `index.html`.
- **Custom domain:** if you later point something like `inventory.gracefishers.church` at GitHub Pages, do three things:
  - add that address as another SPA redirect URI in Entra (plus `/setup.html`),
  - set `appUrl` in `config.js`,
  - reprint any labels you want to point at the new address.

## Troubleshooting

| You see | What to do |
|---|---|
| **AADSTS50011** (redirect URI mismatch) | The address in Entra → Authentication must match the page address exactly, including `https://` and the trailing `/`. Add both `.../inventory/` and `.../inventory/setup.html`. |
| **AADSTS65001** or "needs admin approval" | An admin hasn't clicked **Grant admin consent** in API permissions yet. |
| **Lists not set up** | Run `setup.html` once. |
| **No access** | Add the person as a Member of the SharePoint site. |
| "You don't have permission to change the inventory" | They're a Visitor on the site. Make them a Member. |
| The page still shows **Demo mode** | `config.js` isn't filled in, or GitHub Pages hasn't updated yet. Wait a minute and reload. |
