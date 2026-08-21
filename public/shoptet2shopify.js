(function () {
  "use strict";

  var ENDPOINT = "https://shoptet2shopify.aethero.workers.dev/api/deliver";

  /* ---------- jazyk ----------
     ÚPRAVA aethero 2026-08-02: widget je dvojjazyčný. Jazyk se bere z <html lang>,
     takže stačí stránku založit v /cs/ nebo /en/ a nic se nekonfiguruje.
     Texty jsou na jednom místě — nikde jinde v souboru už nesmí být natvrdo. */
  var LANG = (document.documentElement.lang || "cs").slice(0, 2) === "en" ? "en" : "cs";
  var P = LANG === "en" ? "/en" : "/cs";
  var I18N = {
    cs: {
      title: "Převaděč Shoptet Produkty → Shopify",
      sub: "Nahrajte XML export produktů ze Shoptetu, my ho převedeme na CSV připravené pro import do Shopify. Konverze probíhá ve vašem prohlížeči.",
      dropA: "Přetáhněte sem ", dropB: "XML export", dropC: " ze Shoptetu<br>nebo klikněte pro výběr souboru",
      note: "Zvládne i velké katalogy — 5 000 produktů převede do vteřiny. Shopify import má limit 15 MB na soubor (zhruba 10 000 produktů), větší e-shopy s vámi rádi vyřešíme napřímo.",
      nProd: "produktů", nVar: "variant", nImg: "obrázků",
      gateText: "Nebo v\u00e1m odkaz ke sta\u017een\u00ed po\u0161leme e-mailem (plat\u00ed 7 dn\u00ed):",
      infoText: "E-mail pou\u017eijeme jen k zasl\u00e1n\u00ed odkazu. ",
      emailPh: "vas@email.cz",
      newsLabel: " Chci ob\u010das dost\u00e1vat novinky od Aethero. ",
      gdprLabel: "Zásady zpracování osobních údajů",
      send: "Poslat odkaz e-mailem", sending: "Odesílám…", download: "Stáhnout CSV",
      footA: "Nástroj od ", footB: " — migrace e-shopů na Shopify. Potřebujete převést celý e-shop včetně objednávek a zákazníků? ",
      footLink: "Ozvěte se nám",
      errXml: "Soubor není platné XML.",
      errNoItems: "V souboru nejsou žádné položky <SHOPITEM> — je to produktový export ze Shoptetu?",
      errRead: "Soubor se nepodařilo přečíst.",
      warnNoName: function (i) { return "Položka #" + i + " nemá NAME — přeskočena."; },
      warnParams: function (n, c) { return "„" + n + "“: varianta má " + c + " parametrů, Shopify podporuje max 3 — použity první 3."; },
      warnMore: function (n) { return "… a dalších " + n + " upozornění."; },
      okDownload: "CSV staženo. Ve Shopify: Products → Import.",
      errEmail: "Zadejte platný email.",
      
      errServer: function (c) { return "Server vrátil chybu (" + c + "). Zkuste to prosím znovu."; },
      okSent: function (e) { return "Hotovo! Odkaz ke stažení CSV jsme poslali na " + e + ". Platí 7 dní."; }
    },
    en: {
      title: "Shoptet Products → Shopify converter",
      sub: "Upload your Shoptet product XML export and we will turn it into a CSV ready for Shopify import. The conversion runs in your browser.",
      dropA: "Drop your ", dropB: "XML export", dropC: " from Shoptet here<br>or click to choose a file",
      note: "Handles large catalogues — 5,000 products in a second. Shopify limits imports to 15 MB per file (roughly 10,000 products); for bigger stores we are happy to help directly.",
      nProd: "products", nVar: "variants", nImg: "images",
      gateText: "Or we can e-mail you the download link (valid 7 days):",
      infoText: "We use your e-mail only to send the link. ",
      emailPh: "you@email.com",
      newsLabel: " I\u2019d also like occasional news from Aethero. ",
      gdprLabel: "Privacy policy",
      send: "E-mail me the link", sending: "Sending…", download: "Download CSV",
      footA: "A tool by ", footB: " — e-shop migrations to Shopify. Need to move a whole store including orders and customers? ",
      footLink: "Get in touch",
      errXml: "The file is not valid XML.",
      errNoItems: "No <SHOPITEM> entries found — is this a Shoptet product export?",
      errRead: "The file could not be read.",
      warnNoName: function (i) { return "Item #" + i + " has no NAME — skipped."; },
      warnParams: function (n, c) { return "\u201C" + n + "\u201D: variant has " + c + " parameters, Shopify supports max 3 — first 3 used."; },
      warnMore: function (n) { return "… and " + n + " more warnings."; },
      okDownload: "CSV downloaded. In Shopify: Products → Import.",
      errEmail: "Please enter a valid email.",
      
      errServer: function (c) { return "The server returned an error (" + c + "). Please try again."; },
      okSent: function (e) { return "Done! We have sent the CSV download link to " + e + ". It is valid for 7 days."; }
    }
  };
  var T = I18N[LANG];
 // ostrý režim: URL Cloudflare Workeru, např. https://convert.aethero.cz/api/deliver

  /* ---------- styly ---------- */
  var css = [
    "#ae-s2s{--bg:#000326;--card:#0C0C42;--cyan:#0DD4CD;--purple:#CB00D7;--mid:#55289E;--off:#F7F7F5;",
    "font-family:'Montserrat',system-ui,sans-serif;background:var(--bg);color:var(--off);",
    "border-radius:16px;padding:32px;max-width:720px;margin:0 auto;box-sizing:border-box}",
    "#ae-s2s *{box-sizing:border-box}",
    "#ae-s2s h2{font-family:'Kanit','Montserrat',sans-serif;font-weight:600;font-size:1.6rem;margin:0 0 4px}",
    "#ae-s2s .ae-sub{color:#C9CBE0!important;font-size:.9rem;margin:0 0 24px}",
    "#ae-s2s .ae-drop{border:2px dashed rgba(13,212,205,.45);border-radius:12px;padding:40px 24px;",
    "text-align:center;cursor:pointer;transition:all .15s;background:var(--card)}",
    "#ae-s2s .ae-drop:hover,#ae-s2s .ae-drop.ae-over{border-color:var(--cyan);background:#101055}",
    "#ae-s2s .ae-drop strong{color:var(--cyan)}",
    "#ae-s2s .ae-stats{display:flex;gap:12px;flex-wrap:wrap;margin:20px 0}",
    "#ae-s2s .ae-stat{background:var(--card);border-radius:10px;padding:14px 18px;flex:1;min-width:120px;text-align:center}",
    "#ae-s2s .ae-stat b{display:block;font-family:'Kanit',sans-serif;font-size:1.5rem;color:var(--cyan)}",
    "#ae-s2s .ae-stat span{font-size:.75rem;opacity:.7}",
    "#ae-s2s .ae-warn{background:rgba(203,0,215,.12);border-left:3px solid var(--purple);",
    "border-radius:6px;padding:10px 14px;font-size:.82rem;margin:6px 0}",
    "#ae-s2s .ae-btn{display:inline-block;background:var(--cyan);color:#000326;font-weight:700;",
    "border:none;border-radius:999px;padding:14px 32px;font-size:1rem;cursor:pointer;",
    "font-family:'Montserrat',sans-serif;transition:transform .1s}",
    "#ae-s2s .ae-btn:hover{transform:translateY(-1px)}",
    "#ae-s2s .ae-btn:disabled{opacity:.4;cursor:not-allowed;transform:none}",
    "#ae-s2s input[type=email]{width:100%;padding:13px 16px;border-radius:10px;border:1px solid var(--mid);",
    "background:var(--card);color:var(--off);font-size:1rem;font-family:inherit;margin:0 0 12px}",
    "#ae-s2s input[type=email]:focus{outline:none;border-color:var(--cyan)}",
    "#ae-s2s .ae-gdpr{display:flex;gap:8px;align-items:flex-start;font-size:.84rem;color:#C9CBE0!important;margin:0 0 16px}",
    "#ae-s2s .ae-gdpr input{margin-top:2px;accent-color:#0DD4CD;width:16px;height:16px;flex:none}",
    "#ae-s2s .ae-ok{background:rgba(13,212,205,.12);border-left:3px solid var(--cyan);border-radius:6px;",
    "padding:14px 16px;font-size:.9rem}",
    "#ae-s2s .ae-err{background:rgba(255,80,80,.12);border-left:3px solid #ff5050;border-radius:6px;",
    "padding:14px 16px;font-size:.9rem}",
    "#ae-s2s .ae-hidden{display:none}",
    "#ae-s2s .ae-foot{margin-top:24px;font-size:.78rem;color:#A9ABC4!important}",
    "#ae-s2s .ae-note{font-size:.78rem;color:#C9CBE0!important;margin:10px 0 0;text-align:center}",
    "#ae-s2s h2{color:#F7F7F5!important}",
    "#ae-s2s .ae-drop{color:#F7F7F5!important}",
    "#ae-s2s .ae-warn,#ae-s2s .ae-ok,#ae-s2s .ae-err{color:#F7F7F5!important}",
    "#ae-s2s #ae-gate p{color:#F7F7F5!important}",
    "#ae-s2s a{color:var(--cyan)}"
  ].join("");
  // ÚPRAVA aethero 2026-08-02: vlastní CSS widgetu se NEVKLÁDÁ.
  // Vzhled řídí design systém webu (styly u stránky /cs/migrace-shoptet-na-shopify).
  // Původní `css` je ponechané jen jako reference k tomu, jak widget vypadal na aethero.cz.
  void css;

  /* ---------- pomocné ---------- */
  function slugify(s) {
    return (s || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
      .slice(0, 100) || "produkt";
  }
  function csvCell(v) {
    v = v == null ? "" : String(v);
    return /[",\n\r]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
  }
  function num(s) {
    if (s == null) return "";
    var n = parseFloat(String(s).replace(/\s/g, "").replace(",", "."));
    return isNaN(n) ? "" : n;
  }
  // case-insensitive výběr přímých potomků podle seznamu možných názvů
  function kids(el, names) {
    var out = [], want = names.map(function (n) { return n.toUpperCase(); });
    for (var i = 0; i < el.children.length; i++) {
      if (want.indexOf(el.children[i].tagName.toUpperCase()) !== -1) out.push(el.children[i]);
    }
    return out;
  }
  function text(el, names) {
    var k = kids(el, names);
    return k.length ? k[0].textContent.trim() : "";
  }

  /* ---------- konverze ---------- */
  var COLUMNS = ["Handle", "Title", "Body (HTML)", "Vendor", "Type", "Tags", "Published",
    "Option1 Name", "Option1 Value", "Option2 Name", "Option2 Value", "Option3 Name", "Option3 Value",
    "Variant SKU", "Variant Grams", "Variant Inventory Tracker", "Variant Inventory Qty",
    "Variant Inventory Policy", "Variant Fulfillment Service", "Variant Price",
    "Variant Compare At Price", "Variant Requires Shipping", "Variant Taxable", "Variant Barcode",
    "Image Src", "Image Position", "Image Alt Text", "Variant Image", "SEO Title", "SEO Description", "Status"];

  function parseVariant(vEl, warnings, productName) {
    var params = [];
    kids(vEl, ["PARAMETERS"]).forEach(function (ps) {
      kids(ps, ["PARAMETER"]).forEach(function (p) {
        params.push({ name: text(p, ["NAME"]), value: text(p, ["VALUE"]) });
      });
    });
    if (params.length > 3) {
      warnings.push(T.warnParams(productName, params.length));
      params = params.slice(0, 3);
    }
    var price = num(text(vEl, ["PRICE_VAT", "PRICEVAT", "PRICE"]));
    var compareAt = num(text(vEl, ["STANDARD_PRICE", "STANDARDPRICE"]));
    var weightKg = num(text(vEl, ["WEIGHT"]));
    var stockEl = kids(vEl, ["STOCK"])[0];
    var qty = stockEl ? num(text(stockEl, ["AMOUNT"]) || stockEl.textContent) : "";
    return {
      params: params,
      sku: text(vEl, ["CODE"]),
      ean: text(vEl, ["EAN"]),
      price: price,
      compareAt: (compareAt !== "" && compareAt > price) ? compareAt : "",
      grams: weightKg !== "" ? Math.round(weightKg * 1000) : "",
      qty: qty,
      imageRef: text(vEl, ["IMAGE_REF", "IMAGEREF"])
    };
  }

  function convert(xmlText) {
    var doc = new DOMParser().parseFromString(xmlText, "text/xml");
    if (doc.querySelector("parsererror")) throw new Error(T.errXml);
    var root = doc.documentElement;
    var items = root.getElementsByTagName("SHOPITEM");
    if (!items.length) throw new Error(T.errNoItems);

    var rows = [], warnings = [], usedHandles = {}, stats = { products: 0, variants: 0, images: 0 };

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      var name = text(it, ["NAME"]);
      if (!name) { warnings.push(T.warnNoName(i + 1)); continue; }
      stats.products++;

      var handle = slugify(name);
      if (usedHandles[handle]) { usedHandles[handle]++; handle += "-" + usedHandles[handle]; }
      else usedHandles[handle] = 1;

      var categories = [];
      kids(it, ["CATEGORIES"]).forEach(function (c) {
        kids(c, ["CATEGORY"]).forEach(function (cat) {
          var leaf = cat.textContent.trim().split(/\s*[>|]\s*/).pop();
          if (leaf && categories.indexOf(leaf) === -1) categories.push(leaf);
        });
      });
      var defaultCat = text(it, ["DEFAULT_CATEGORY", "DEFAULTCATEGORY"]);
      var type = defaultCat ? defaultCat.split(/\s*[>|]\s*/).pop() : (categories[0] || "");

      var images = [];
      kids(it, ["IMAGES"]).forEach(function (imgs) {
        kids(imgs, ["IMAGE", "IMGURL"]).forEach(function (im) {
          var u = im.textContent.trim();
          if (u) images.push(u);
        });
      });
      stats.images += images.length;

      var visibility = text(it, ["VISIBILITY"]).toLowerCase();
      var hidden = visibility === "hidden" || visibility === "0" || visibility === "false";

      var variants = [];
      kids(it, ["VARIANTS"]).forEach(function (vs) {
        kids(vs, ["VARIANT"]).forEach(function (v) {
          variants.push(parseVariant(v, warnings, name));
        });
      });
      if (!variants.length) variants = [parseVariant(it, warnings, name)]; // produkt bez variant
      stats.variants += variants.length;

      var optionNames = [];
      variants.forEach(function (v) {
        v.params.forEach(function (p) {
          if (optionNames.indexOf(p.name) === -1 && optionNames.length < 3) optionNames.push(p.name);
        });
      });

      var body = text(it, ["DESCRIPTION"]) || text(it, ["SHORT_DESCRIPTION", "SHORTDESCRIPTION"]);
      var maxRows = Math.max(variants.length, images.length, 1);

      for (var r = 0; r < maxRows; r++) {
        var v = variants[r];
        var row = {};
        row["Handle"] = handle;
        if (r === 0) {
          row["Title"] = name;
          row["Body (HTML)"] = body;
          row["Vendor"] = text(it, ["MANUFACTURER"]);
          row["Type"] = type;
          row["Tags"] = categories.join(", ");
          row["Published"] = hidden ? "FALSE" : "TRUE";
          row["SEO Title"] = text(it, ["SEO_TITLE", "SEOTITLE"]);
          row["SEO Description"] = text(it, ["META_DESCRIPTION", "METADESCRIPTION"]);
          row["Status"] = hidden ? "draft" : "active";
        }
        if (v) {
          for (var o = 0; o < optionNames.length; o++) {
            var pv = "";
            for (var pp = 0; pp < v.params.length; pp++) {
              if (v.params[pp].name === optionNames[o]) { pv = v.params[pp].value; break; }
            }
            if (r === 0 || variants.length > 1) {
              row["Option" + (o + 1) + " Name"] = r === 0 ? optionNames[o] : "";
              row["Option" + (o + 1) + " Value"] = pv;
            }
          }
          if (!optionNames.length && r === 0) {
            row["Option1 Name"] = "Title"; row["Option1 Value"] = "Default Title";
          }
          row["Variant SKU"] = v.sku;
          row["Variant Grams"] = v.grams;
          row["Variant Inventory Tracker"] = v.qty !== "" ? "shopify" : "";
          row["Variant Inventory Qty"] = v.qty !== "" ? v.qty : "";
          row["Variant Inventory Policy"] = "deny";
          row["Variant Fulfillment Service"] = "manual";
          row["Variant Price"] = v.price;
          row["Variant Compare At Price"] = v.compareAt;
          row["Variant Requires Shipping"] = "TRUE";
          row["Variant Taxable"] = "TRUE";
          row["Variant Barcode"] = v.ean;
          row["Variant Image"] = v.imageRef;
        }
        if (images[r]) {
          row["Image Src"] = images[r];
          row["Image Position"] = r + 1;
          row["Image Alt Text"] = r === 0 ? name : "";
        }
        rows.push(row);
      }
    }

    var csv = "\uFEFF" + COLUMNS.map(csvCell).join(",") + "\n" +
      rows.map(function (row) {
        return COLUMNS.map(function (c) { return csvCell(row[c]); }).join(",");
      }).join("\n");

    if (csv.length > 15 * 1024 * 1024) {
      warnings.push("V\u00FDsledn\u00E9 CSV m\u00E1 " + (csv.length / 1048576).toFixed(1) +
        " MB \u2014 Shopify import m\u00E1 limit 15 MB na soubor. P\u0159ed importem ho rozd\u011Blte " +
        "po cel\u00FDch produktech (v\u0161echny \u0159\u00E1dky se stejn\u00FDm Handle mus\u00ED z\u016Fstat spolu), " +
        "nebo se n\u00E1m ozv\u011Bte, s velk\u00FDmi katalogy pom\u016F\u017Eeme.");
    }

    return { csv: csv, stats: stats, warnings: warnings };
  }

  /* ---------- čtení souboru vč. windows-1250 ---------- */
  function readXmlFile(file, cb, errCb) {
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var buf = new Uint8Array(fr.result);
        var head = "";
        for (var i = 0; i < Math.min(buf.length, 200); i++) head += String.fromCharCode(buf[i]);
        var m = head.match(/encoding=["']([^"']+)["']/i);
        var enc = m ? m[1].toLowerCase() : "utf-8";
        cb(new TextDecoder(enc).decode(fr.result));
      } catch (e) { errCb(e); }
    };
    fr.onerror = function () { errCb(new Error(T.errRead)); };
    fr.readAsArrayBuffer(file);
  }

  /* ---------- UI ---------- */
  var host = document.getElementById("ae-s2s");
  host.innerHTML =
    '<h2 class="h2-mini">' + T.title + '</h2>' +
    '<p class="ae-sub">' + T.sub + '</p>' +
    '<div class="ae-drop" id="ae-drop">' + T.dropA + '<strong>' + T.dropB + '</strong>' + T.dropC +
    '<input type="file" id="ae-file" accept=".xml,text/xml" style="display:none"></div>' +
    '<p class="ae-note">' + T.note + '</p>' +
    '<div id="ae-result" class="ae-hidden">' +
    '  <div class="ae-stats">' +
    '    <div class="ae-stat"><b id="ae-n-prod">0</b><span>' + T.nProd + '</span></div>' +
    '    <div class="ae-stat"><b id="ae-n-var">0</b><span>' + T.nVar + '</span></div>' +
    '    <div class="ae-stat"><b id="ae-n-img">0</b><span>' + T.nImg + '</span></div>' +
    '  </div>' +
    '  <div id="ae-warnings"></div>' +
    '  <div id="ae-download" class="ae-hidden">' +
    '    <button class="ae-btn" id="ae-dl">' + T.download + '</button>' +
    '  </div>' +
    '  <div id="ae-gate">' +
    '    <p style="font-size:.9rem;margin-top:20px">' + T.gateText + '</p>' +
    '    <input type="email" id="ae-email" placeholder="' + T.emailPh + '">' +
    '    <p class="ae-gdpr" style="display:block">' + T.infoText +
    '<a href="' + P + '/gdpr" target="_blank">' + T.gdprLabel + '</a></p>' +
    '    <label class="ae-gdpr"><input type="checkbox" id="ae-news">' + T.newsLabel + '</label>' +
    '    <button class="ae-btn" id="ae-send">' + T.send + '</button>' +
    '  </div>' +
    '  <div id="ae-done" class="ae-ok ae-hidden" style="margin-top:12px"></div>' +
    '</div>' +
    '<div id="ae-error" class="ae-err ae-hidden" style="margin-top:16px"></div>' +
    '<p class="ae-foot">' + T.footA + '<a href="' + P + '/" target="_blank">AETHERO</a>' + T.footB +
    '<a href="' + P + '/kontakt" target="_blank">' + T.footLink + '</a>.</p>';

  var state = { csv: null, filename: null };
  var drop = document.getElementById("ae-drop");
  var fileInput = document.getElementById("ae-file");

  function showError(msg) {
    var e = document.getElementById("ae-error");
    e.textContent = msg; e.classList.remove("ae-hidden");
  }
  function handleFile(file) {
    document.getElementById("ae-error").classList.add("ae-hidden");
    readXmlFile(file, function (xml) {
      try {
        var res = convert(xml);
        state.csv = res.csv;
        state.filename = file.name.replace(/\.xml$/i, "") + "-shopify.csv";
        document.getElementById("ae-n-prod").textContent = res.stats.products;
        document.getElementById("ae-n-var").textContent = res.stats.variants;
        document.getElementById("ae-n-img").textContent = res.stats.images;
        var w = document.getElementById("ae-warnings");
        w.innerHTML = "";
        res.warnings.slice(0, 10).forEach(function (msg) {
          var d = document.createElement("div"); d.className = "ae-warn"; d.textContent = msg; w.appendChild(d);
        });
        if (res.warnings.length > 10) {
          var d2 = document.createElement("div"); d2.className = "ae-warn";
          d2.textContent = T.warnMore(res.warnings.length - 10);
          w.appendChild(d2);
        }
        document.getElementById("ae-result").classList.remove("ae-hidden");
        // CSV vznikl lokálně -> stažení HNED; e-mail je jen volitelná cesta
        // (rozdělení souhlasů dle GPT crosscheck + EDPB, DK 2026-08-22).
        document.getElementById("ae-download").classList.remove("ae-hidden");
        if (ENDPOINT) document.getElementById("ae-gate").classList.remove("ae-hidden");
        else document.getElementById("ae-gate").classList.add("ae-hidden");
      } catch (e) { showError(e.message); }
    }, function (e) { showError(e.message); });
  }

  drop.addEventListener("click", function () { fileInput.click(); });
  fileInput.addEventListener("change", function () { if (fileInput.files[0]) handleFile(fileInput.files[0]); });
  drop.addEventListener("dragover", function (e) { e.preventDefault(); drop.classList.add("ae-over"); });
  drop.addEventListener("dragleave", function () { drop.classList.remove("ae-over"); });
  drop.addEventListener("drop", function (e) {
    e.preventDefault(); drop.classList.remove("ae-over");
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  });

  document.getElementById("ae-dl").addEventListener("click", function () {
    var blob = new Blob([state.csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = state.filename;
    a.click();
    URL.revokeObjectURL(a.href);
    var done = document.getElementById("ae-done");
    done.textContent = T.okDownload;
    done.classList.remove("ae-hidden");
  });

  document.getElementById("ae-send").addEventListener("click", function () {
    var email = document.getElementById("ae-email").value.trim();
    var news = document.getElementById("ae-news").checked;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { showError(T.errEmail); return; }
    document.getElementById("ae-error").classList.add("ae-hidden");
    var btn = document.getElementById("ae-send");
    btn.disabled = true; btn.textContent = T.sending;
    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, filename: state.filename, csv: state.csv, newsletter: news })
    }).then(function (r) {
      if (!r.ok) throw new Error(T.errServer(r.status));
      return r.json();
    }).then(function (data) {
      document.getElementById("ae-gate").classList.add("ae-hidden");
      var done = document.getElementById("ae-done");
      if (data.emailed) {
        done.textContent = T.okSent(email);
      } else {
        done.innerHTML = 'Hotovo! CSV si stáhněte zde: <a href="' + data.link + '">stáhnout CSV</a> (odkaz platí 7 dní).';
      }
      done.classList.remove("ae-hidden");
    }).catch(function (e) {
      showError(e.message);
      btn.disabled = false; btn.textContent = T.send;
    });
  });
})();