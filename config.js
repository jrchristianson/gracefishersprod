// Grace Fishers Gear Inventory — settings
// Fill these in after you register the app in Microsoft Entra (see README.md).
// None of these values are secrets; it's safe for them to sit in a public GitHub repo.
// While tenantId, clientId or siteUrl is blank, the app runs in DEMO MODE with sample data.

window.GF_CONFIG = {
  // Microsoft Entra admin center > App registrations > your app > Overview
  tenantId: "8cc836c7-3843-4a1a-9616-09a1b35c044e",   // "Directory (tenant) ID", e.g. "3f2c9e1a-...."
  clientId: "c0a4e459-e6e5-44e3-87af-8d2fa0d5647b",   // "Application (client) ID", e.g. "a81b44d0-...."

  // The SharePoint site that holds the inventory lists (no trailing slash)
  siteUrl: "gracefishers.sharepoint.com/productioninventory/SitePages/Home",    // e.g. "https://gracefishers.sharepoint.com/sites/Production"

  // List names. Only change these if you renamed the lists in SharePoint.
  lists: {
    equipment: "GF Equipment",
    equipmentLog: "GF Equipment Log",
    supplies: "GF Supplies",
    supplyLog: "GF Supply Log",
  },

  // Asset tags look like GF-0001, GF-0002, ...
  tagPrefix: "GF-",

  // Optional. The web address people use to open the app. Leave blank to use
  // whatever address the page is opened from. Set it if you later move the app
  // to a custom domain, so new QR labels point at the right place.
  appUrl: "",
};
