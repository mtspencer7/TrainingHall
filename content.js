let iframeId = window.frameElement ? window.frameElement.id : ''; // Get the iframe's ID if it exists

const badgeSound = new Audio(chrome.runtime.getURL('sounds/badge_sound.mp3'));
const nextBackSound = new Audio(chrome.runtime.getURL('sounds/next_back.mp3'));
nextBackSound.volume = 0.05;
badgeSound.volume = 0.03;
let tutorial = 'default';
let reportName
let currentPageLabel = 'undefined';
let newVal = '';
let popupsEnabled = false; // Toggleable setting to enable/disable popups
let gifClicked = false;
let bwClassic = (iframeId === 'iframe4681-5055721' || document.querySelector('#webiViewFrame') || iframeId === 'iframeHome-5055721' || document.querySelector('#ListingURE_content'))

    let targetDomain = 'bo42corpsysbhp.example.com'; // Replace with your desired domain
    let currentDomain = window.location.hostname; // Get the current domain
    let correctDomain = ((currentDomain === 'bocorpsysbhr.example.com') || (currentDomain === 'portal.example.com'));

      let reportPrompt = document.querySelector('#webiViewFrame');
      let bwHome = document.querySelector('#id_93_3sl5j068');
      //let bwFolders = document.querySelector('#__item12-__tree0-2-content');
      let bwFolders = document.querySelector('#ListingURE_content');
      let bwFavorites = document.querySelector('#MyDocs_treeView_treeNode1_name');
      let bwSchedule = document.querySelector('#dlgNavFrame');
      let bwInbox = document.querySelector('#theForm');
      let activeAdvanceContext = null;

var intervalId = setInterval(() => {
  if (!chrome.runtime?.id) {
    // The extension was reloaded and this script is orphaned
    clearInterval(intervalId);
    // Display a message to the user
    showExtensionReloadMessage(); // A custom function to show a UI message
    return;
  }
  // ... your other interval logic
}, 45000); // Check every 45 seconds or so

let hallScheduleOverrideUnlockedForSession = false;

// Load session-only override on startup
if (chrome.storage?.session) {
  chrome.storage.session.get(['hallScheduleOverrideUnlockedForSession'], (res) => {
    hallScheduleOverrideUnlockedForSession = !!res.hallScheduleOverrideUnlockedForSession;
  });
}

function createPoHelpButton(poContainer, guideUrl) {
  if (document.getElementById('traininghall-po-help-btn')) return;

  const helpBtn = document.createElement('button');
  helpBtn.id = 'traininghall-po-help-btn';
  helpBtn.textContent = '?';
  helpBtn.title = 'What is Training Hall?';

  Object.assign(helpBtn.style, {
    position: 'absolute',
    top: '30px',
    right: '10px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    border: '1.5px solid #8b6a3f',
    background: 'linear-gradient(180deg, #f7e6bf 0%, #e6c98f 100%)',
    color: '#5a3c1e',
    fontFamily: "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif",
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(70, 40, 10, 0.18)',
    zIndex: '2147483648',
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0',
    lineHeight: '1',

    /* Fade animation setup */
    opacity: '0',
    transform: 'scale(0.85)',
    transition: 'opacity 240ms ease-out, transform 240ms cubic-bezier(.22,1,.36,1)'
  });

  helpBtn.addEventListener('mouseenter', () => {
    helpBtn.style.transform = 'scale(1.1)';
    helpBtn.style.boxShadow = '0 7px 16px rgba(70, 40, 10, 0.24)';
  });

  helpBtn.addEventListener('mouseleave', () => {
    helpBtn.style.transform = 'scale(1)';
    helpBtn.style.boxShadow = '0 4px 10px rgba(70, 40, 10, 0.18)';
  });

  helpBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_help_clicked",
      data: {
        source: "Po"
      }
    });

    showTrainingHallOnboardingBubble(guideUrl, false);
  });

  poContainer.appendChild(helpBtn);

  /* Delay so it appears after Po */
  setTimeout(() => {
    helpBtn.style.opacity = '1';
    helpBtn.style.transform = 'scale(1)';
  }, 150);
}

function showTrainingHallOnboardingBubble(guideUrl, oneTimeOnly = true) {
  const ONBOARDING_DISMISSED_KEY = "trainingHall_onboarding_dismissed";

  if (
    oneTimeOnly &&
    localStorage.getItem(ONBOARDING_DISMISSED_KEY) === "true"
  ) {
    return;
  }

  if (document.getElementById("traininghall-onboarding-bubble")) return;

  const poWrapper = document.getElementById("poHelper");
  if (!poWrapper) return;

  const bubble = document.createElement("div");
  bubble.id = "traininghall-onboarding-bubble";

  Object.assign(bubble.style, {
    position: "absolute",
    right: "100px",
    bottom: "88px",
    width: "340px",
    maxWidth: "calc(100vw - 40px)",
    background: "linear-gradient(180deg, #f8edd3 0%, #f1dfb7 100%)",
    border: "2px solid #8b6a3f",
    borderRadius: "18px",
    boxShadow: "0 18px 40px rgba(45, 28, 10, 0.28)",
    padding: "18px 18px 16px 18px",
    color: "#4b341d",
    fontFamily: "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif",
    zIndex: "2147483648",
    pointerEvents: "auto",
    opacity: "0",
    transition: "opacity 220ms ease, transform 220ms ease",
    userSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
  });

  // Tail pointing toward Po
  const tail = document.createElement("div");
  Object.assign(tail.style, {
    position: "absolute",
    right: "22px",
    bottom: "-12px",
    width: "20px",
    height: "20px",
    background: "#f1dfb7",
    borderRight: "2px solid #8b6a3f",
    borderBottom: "2px solid #8b6a3f",
    transform: "rotate(45deg)",
    zIndex: "0"
  });

const closeBtn = document.createElement("button");
closeBtn.textContent = "✕";

Object.assign(closeBtn.style, {
  position: "absolute",
  top: "4px",
  right: "6px",
  width: "32px",
  height: "32px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "15px",
  color: "#6f5431",
  fontFamily: "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  zIndex: "2",
  lineHeight: "1",
  padding: "0"
});

closeBtn.addEventListener("mouseenter", () => {
  closeBtn.style.background = "rgba(111, 84, 49, 0.10)";
});

closeBtn.addEventListener("mouseleave", () => {
  closeBtn.style.background = "transparent";
});

  const title = document.createElement("div");
  title.textContent = "Hi, I’m Po.";
  Object.assign(title.style, {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#5b3d1f",
    position: "relative",
    zIndex: "2"
    
  });

  const body = document.createElement("div");
  body.innerHTML = `
    <div style="margin-bottom: 10px; line-height: 1.5; font-size: 14px; color: #6d4e2b; position: relative; z-index: 2;">
      I can help guide you through HR reporting workflows in Business Warehouse (BW).
    </div>
    <div style="margin-bottom: 12px; line-height: 1.5; font-size: 14px; color: #6d4e2b; position: relative; z-index: 2;">
      You can click me to:
    </div>
    <ul style="margin: 0 0 14px 18px; padding: 0; color: #6d4e2b; line-height: 1.6; font-size: 13px; position: relative; z-index: 2;">
      <li>Get help navigating the BW reporting platform</li>
      <li>Learn how to schedule and edit reports</li>
      <li>Earn badges as you explore Training Hall</li>
    </ul>
  `;

  const buttonRow = document.createElement("div");
  Object.assign(buttonRow.style, {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "10px",
    position: "relative",
    zIndex: "2"
  });

  const takeTourBtn = document.createElement("button");
  takeTourBtn.textContent = "Take a Tour";
  stylePrimaryButton(takeTourBtn);

  const gotItBtn = document.createElement("button");
  gotItBtn.textContent = "Got it";
  styleSecondaryButton(gotItBtn);

  closeBtn.addEventListener("click", () => {
    localStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_onboarding_dismissed",
      data: {
        source: "Po",
        dismiss_method: "x_button"
      }
    });
    bubble.remove();
  });

  gotItBtn.addEventListener("click", () => {
    localStorage.setItem(ONBOARDING_DISMISSED_KEY, "true");
    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_onboarding_dismissed",
      data: {
        source: "Po",
        dismiss_method: "got_it"
      }
    });
    bubble.remove();
  });

  takeTourBtn.addEventListener("click", () => {
  localStorage.setItem("trainingHall_onboarding_dismissed", "true");

  chrome.runtime.sendMessage({
    type: "LOG_EVENT",
    event: "po_tour_started",
    data: {
      source: "Po",
      entry_point: "onboarding_bubble"
    }
  });

  bubble.remove();
  injectTourHighlightStyles();
  startTrainingHallTour();
});

buttonRow.appendChild(gotItBtn);
  buttonRow.appendChild(takeTourBtn);

  bubble.appendChild(tail);
  bubble.appendChild(closeBtn);
  bubble.appendChild(title);
  bubble.appendChild(body);
  bubble.appendChild(buttonRow);

  poWrapper.appendChild(bubble);

  requestAnimationFrame(() => {
    bubble.style.opacity = "1";
    bubble.style.transform = "translateY(0)";
  });

  chrome.runtime.sendMessage({
    type: "LOG_EVENT",
    event: "po_onboarding_shown",
    data: {
      source: "Po",
      one_time_only: oneTimeOnly ? "true" : "false"
    }
  });
}

function stylePrimaryButton(btn) {
  btn.style.padding = "11px 16px";
  btn.style.border = "1.5px solid #7b572b";
  btn.style.borderRadius = "12px";
  btn.style.background = "linear-gradient(180deg, #c79343 0%, #a9742b 100%)";
  btn.style.color = "#fff6e8";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "14px";
  btn.style.fontWeight = "700";
  btn.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
  btn.style.boxShadow = "0 6px 14px rgba(90, 55, 20, 0.18)";
}

function styleSecondaryButton(btn) {
  btn.style.padding = "11px 16px";
  btn.style.border = "1.5px solid #8b6a3f";
  btn.style.borderRadius = "12px";
  btn.style.background = "#fff7e6";
  btn.style.color = "#5b3d1f";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "14px";
  btn.style.fontWeight = "700";
  btn.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
  btn.style.boxShadow = "0 4px 10px rgba(90, 55, 20, 0.10)";
}

function showExtensionReloadMessage() {
  // 1. Prevent multiple messages if the interval triggers again
  if (document.getElementById('ext-reload-overlay')) return;

  // 2. Create the container
  const banner = document.createElement('div');
  banner.id = 'ext-reload-overlay';
  
  // 3. Apply Styles directly via JS (CSS files may be inaccessible now)
  Object.assign(banner.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    backgroundColor: '#fff3cd', // Warning yellow
    color: '#856404',
    textAlign: 'center',
    padding: '15px 20px',
    zIndex: '2147483647', // Max possible z-index
    borderBottom: '2px solid #ffeeba',
    fontFamily: 'sans-serif',
    fontSize: '14px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px'
  });

  // 4. Set Content
  banner.innerHTML = `
    <span><strong> Training Hall Updated:</strong> Please refresh the page to continue using Training Hall features.</span>
    <button id="ext-reload-btn" style="
      background: #856404; 
      color: white; 
      border: none; 
      padding: 5px 15px; 
      border-radius: 4px; 
      cursor: pointer;
      font-weight: bold;
    ">Refresh Now</button>
  `;

  // 5. Add Functionality
  document.body.appendChild(banner);

  document.getElementById('ext-reload-btn').addEventListener('click', () => {
    window.location.reload();
  });
}


function simulateLegacyClick(el) {
  if (!el) return;

  ["mousedown", "mouseup", "click"].forEach(type => {
    el.dispatchEvent(
      new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );
  });
}

function showPublicFolderWarning(actionLabel = "Schedule") {
  const isEmail = actionLabel === "Email";

  // Overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0, 0, 0, 0.55)";
  overlay.style.zIndex = "999999";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";

  // Modal
  const modal = document.createElement("div");
  modal.style.width = "420px";
  modal.style.background = "#fdf7e3";
  modal.style.border = "4px solid #3b2f1c";
  modal.style.borderRadius = "12px";
  modal.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
  modal.style.fontFamily = "'Rock Sans', system-ui, sans-serif";
  modal.style.padding = "20px";
  modal.style.textAlign = "center";
  modal.style.position = "relative";
  modal.classList.add("fade-in", "popup");

  // Copy + tutorial routing
  const titleEmoji = isEmail ? "📧⚠️" : "🐼⚠️";
  const headline = isEmail
    ? `Exporting to Email from Business Warehouse is not secure`
    : `You’re about to schedule a report from the Public Folder`;

  const subtext = isEmail
    ? `It’s recommended to send reports within BW using the <b>BI Inbox</b> instead of email.`
    : `This can expose sensitive data. Please only schedule reports from your <b>Favorites folder</b>.`;

  const learnBtnText = isEmail
    ? "🥋 Open BI Inbox Tutorial"
    : "🥋 Open BW Basic Tutorial";

  const tutorialToLaunch = isEmail ? "bi-inbox" : "basic"; // <-- change these ids as needed

  modal.innerHTML = `
    <button
      id="hallCloseX"
      aria-label="Close warning"
      style="
        position: absolute;
        top: 8px;
        right: 10px;
        background: transparent;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: #3b2f1c;
        opacity: 0.7;
      "
    >✕</button>

    <div style="font-size: 36px; margin-bottom: 8px;">${titleEmoji}</div>

    <p style="font-size: 15px; line-height: 1.5; margin-bottom: 10px;">
      <strong>${headline}</strong>
    </p>

    <p style="color: #3a342cff; font-size: 12px; line-height: 1.5; margin-bottom: 12px;">
      ${subtext}
    </p>

    <div style="display: flex; gap: 10px; justify-content: center;">
      <button id="hallConfirmBtn"
        style="
          background: #3b2f1c;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 14px;
          cursor: pointer;
          opacity: 0.9;
        ">
        Got it
      </button>

      <button id="hallLearnBtn"
        style="
          background: transparent;
          color: #3b2f1c;
          border: 2px solid #3b2f1c;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 14px;
          cursor: pointer;
        ">
        ${learnBtnText}
      </button>
    </div>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  const confirmBtn = document.getElementById("hallConfirmBtn");
  const learnBtn = document.getElementById("hallLearnBtn");
  const closeX = document.getElementById("hallCloseX");

  confirmBtn.onclick = () => overlay.remove();
  closeX.onclick = () => overlay.remove();

  learnBtn.onclick = () => {
    overlay.remove();
    closeAllPopups();
    displayPopups();

    console.log("Launch tutorial:", tutorialToLaunch);
    chrome.storage.sync.set({
      popupsEnabled: true,
      activeTutorial: tutorialToLaunch
    });
  };
}

const BLOCK_LABELS = new Set(["Schedule", "History", "More Actions", "BI Inbox", "Email"]);

document.addEventListener("pointerdown", (e) => {
  if (e.target.closest("#hallPublicFolderOverlay")) return;

  const label = getMenuLabelFromEvent(e);
  if (!label) {chrome.storage.sync.set({ menuClicked: 'none' });}
    if (!BLOCK_LABELS.has(label)) return;

  chrome.storage.sync.set({ menuClicked: label });

  const el = document.querySelector(".yui-accordion-content");
  if (!el) return;

  const isEmail = label === "Email";
  const isSchedule = label === "Schedule";

// Allow Schedule during current browser session if unlocked via secret code
if (isSchedule && hallScheduleOverrideUnlockedForSession) return;

  // If NOT email and accordion is open, allow
  if (!isEmail && el.offsetHeight > 0) return;

  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();

  showPublicFolderWarning(label); // ✅ pass label
}, true);

function getMenuLabelFromEvent(e) {
  // 1) If they clicked the span itself (or something inside it)
  const direct = e.target.closest?.('span[role="menuitem"][title], span[role="menuitem"][aria-label]');
  if (direct) {
    return (direct.getAttribute("title") || direct.getAttribute("aria-label") || direct.textContent || "").trim();
  }

  // 2) If they clicked icon/td/arrow/etc inside the row, climb to the row then query inside it
  const row = e.target.closest?.('tr[id^="iconMenu_menu_"]');
  if (row) {
    const span = row.querySelector('span[role="menuitem"]');
    if (span) {
      return (span.getAttribute("title") || span.getAttribute("aria-label") || span.textContent || "").trim();
    }

    // extra fallback: some variants put the title on the icon div
    const icon = row.querySelector('[title]');
    if (icon) return (icon.getAttribute("title") || "").trim();
  }

  // 3) YUI menus (your other case)
  const yui = e.target.closest?.('a.yuimenuitemlabel[role="menuitem"]');
  if (yui) return (yui.textContent || "").trim();

  return null;
}

/*document.addEventListener("pointerdown", (e) => {
  const label = getMenuLabelFromEvent(e);
  if (!label) return;

  if (label !== "Schedule" && label !== "History" && label !== "More Actions" && label !== "BI Inbox" && label !== "Email" && !hallScheduleOverrideUnlockedForSession) return;

  console.log("[TD] Menu click detected:", label);
  chrome.storage.sync.set({ menuClicked: label });

  const el = document.querySelector(".yui-accordion-content");
  if (!el) return;
  if (el.offsetHeight > 0) return;

  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  showPublicFolderWarning(label);
}, true);*/


// User Clicks Reports
document.addEventListener('click', (e) => {
  const reportItem = e.target.closest('tr.selectedFocusedRow[role="option"]');
  if (!reportItem) return;

  const label = reportItem.textContent.trim();

  console.log('Report clicked:', label);

});

// Format as MM/DD/YYYY
function formatMDY(d = new Date()) {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function updatePageLabel(newVal) {
currentPageLabel = newVal
}

function getPageLabel() {
  return currentPageLabel;
}

function checkPage() {
  if (bwClassic) { return;} else {
  const waitForPageLabel = setInterval(() => {
    const pageLabel = document.getElementById("__button13-BDI-content");
    if (pageLabel) {
      clearInterval(waitForPageLabel);
      const observer = new MutationObserver(() => {
        console.log("Text changed to:", pageLabel.textContent.trim());
        updatePageLabel(pageLabel.textContent.trim());
        closeAllPopups();
        displayPopups(currentPageLabel);
      });

      observer.observe(pageLabel, {
        characterData: true,
        subtree: true,
        childList: true
      });
      console.log("Observer is now watching __button13-BDI-content for text changes.");
    }

      const disclaimerButton = document.getElementById("__button15")
        if (disclaimerButton) {
          disclaimerButton.addEventListener('click', function() {
            closeAllPopups();
            updatePageLabel(pageLabel.textContent.trim());
            showRelevantPopupSeries(getPageLabel(), tutorial);
          });
          }
  }, 500);

};
}

const glowStyle = document.createElement("style");
glowStyle.innerHTML = `
  @keyframes glow {
    0% { box-shadow: 0 0 5px 2px yellow; }
    50% { box-shadow: 0 0 20px 8px yellow; }
    100% { box-shadow: 0 0 5px 2px yellow; }
  }

  .glow-effect {
    animation: glow 1.5s ease-in-out infinite;
    border-radius: 4px;
  }
`;
document.head.appendChild(glowStyle);

let activeIndicatorEl = null;

function removeActiveIndicator() {
  if (activeIndicatorEl) {
    activeIndicatorEl.remove();
    activeIndicatorEl = null;
  }
}

function createArrowIndicator(targetEl, opts = {}) {
  const {
    arrowSide = 'right',
    arrowEmoji = '👉',
    arrowOffsetPx = 10
  } = opts;

  const arrow = document.createElement('div');
  arrow.className = 'hall-arrow-indicator';
  arrow.textContent = arrowEmoji;
  arrow.style.position = 'fixed';
  arrow.style.zIndex = '9999999';
  arrow.style.pointerEvents = 'none';

  function positionArrow() {
    const rect = targetEl.getBoundingClientRect();

    // Default center alignment
    let top = rect.top + rect.height / 2;
    let left = rect.left + rect.width / 2;

    // Adjust based on side
    switch (arrowSide) {
      case 'left':
        left = rect.left - arrowOffsetPx;
        top = rect.top + rect.height / 2;
        arrow.textContent = '👉';
        break;
      case 'right':
        left = rect.right + arrowOffsetPx;
        top = rect.top + rect.height / 2;
        arrow.textContent = '👈';
        break;
      case 'top':
        left = rect.left + rect.width / 2;
        top = rect.top - arrowOffsetPx;
        arrow.textContent = '👇';
        break;
      case 'bottom':
        left = rect.left + rect.width / 2;
        top = rect.bottom + arrowOffsetPx;
        arrow.textContent = '👆';
        break;
    }

    // Convert to pixel positions and center the emoji
    arrow.style.left = `${left}px`;
    arrow.style.top = `${top}px`;
    arrow.style.transform = 'translate(-50%, -50%)';
  }

  positionArrow();

  // Keep positioned on scroll/resize
  const onScrollResize = () => positionArrow();
  window.addEventListener('scroll', onScrollResize, true);
  window.addEventListener('resize', onScrollResize);

  // attach cleanup hook to arrow element
  arrow._cleanup = () => {
    window.removeEventListener('scroll', onScrollResize, true);
    window.removeEventListener('resize', onScrollResize);
  };

  document.body.appendChild(arrow);
  return arrow;
}

function setActiveIndicatorEl(el) {
  removeActiveIndicator();
  activeIndicatorEl = el;
}

const hallBadges = [
  {
    id: "reporting-rookie",
    name: "Reporting Rookie",
    description: "Completed your first report tutorial.",
    icon: chrome.runtime.getURL(`badges/reporting-rookie.png`),
    unlocked: false,
    new: false
  },
  {
    id: "inbox-sage",
    name: "Inbox Sage",
    description: "Finished all beginner tutorials.",
    icon: chrome.runtime.getURL(`badges/inbox-sage.png`),
    unlocked: false,
    new: false
  },
    {
    id: "schedule-master",
    name: "Schedule Master",
    description: "Finished all beginner tutorials.",
    icon: chrome.runtime.getURL(`badges/schedule-master.png`),
    unlocked: false,
    new: false
  },
    {
    id: "design-scholar",
    name: "Design Scholar",
    description: "Finished all beginner tutorials.",
    icon: chrome.runtime.getURL(`badges/design-scholar.png`),
    unlocked: false,
    new: false
  },
  {
    id: "dojo-founder",
    name: "Hall Founder",
    description: "Finished all beginner tutorials.",
    icon: chrome.runtime.getURL(`badges/dojo-founder.png`),
    unlocked: false,
    new: false
  },
  {
    id: "hall-explorer",
    name: "Hall Explorer",
    description: "Completed the Hall Tour.",
    icon: chrome.runtime.getURL(`badges/hall-explorer.png`),
    unlocked: false,
    new: false
  }
];

function normalizeHallBadges(savedBadges = []) {
  const merged = [...savedBadges];

  hallBadges.forEach(defaultBadge => {
    const exists = merged.some(b => b.id === defaultBadge.id);
    if (!exists) {
      merged.push({
        ...defaultBadge,
        unlocked: false,
        new: false
      });
    }
  });

  return merged;
}

function displayPopups(currentPageLabel, gifClicked) {
  if (!currentPageLabel) currentPageLabel = getPageLabel();
  console.log("Page: ", currentPageLabel);

  chrome.storage.sync.get(
    [
      "activeTutorial",
      "reportName",
      "menuClicked",
      "publicFolderVisible",
      "reportingOnlyUser",
    ],
    function (result) {
      const tutorial = result.activeTutorial || "default";
      const reportName = result.reportName || "generic_report";
      const menuLabel = result.menuClicked || "none";
      const publicFolderVisible = result.publicFolderVisible || 1;
      const reportingOnlyUser = result.reportingOnlyUser || false;

      setTimeout(function () {
        const welcomeMessageElement = document.querySelector("#welcome_message");

        if (welcomeMessageElement) {
          const navNodeAnchor = document.querySelector("#navNodeAnchor_1_1");

          if (navNodeAnchor) {
            navNodeAnchor.addEventListener("click", function () {
              closeAllPopups();
              console.log("navNodeAnchor_1_1 clicked");
              setTimeout(() => showRelevantPopupSeries("landingPage2", tutorial), 1100);
            });
          } else {
            console.warn("navNodeAnchor_1_1 element not found.");
          }

          showRelevantPopupSeries("landingPage1", tutorial);
        } else if (currentDomain === targetDomain) {
          // Listen for report name from injected script
          window.addEventListener("message", (event) => {
            // 1️⃣ Validate origin
            if (event.origin !== "https://bo42corpsysbhp.example.com") return;

            console.log(event.data);

            // 2️⃣ Validate message shape
            if (
              !event.data ||
              event.data.type !== "FROM_PAGE" ||
              typeof event.data.reportName !== "string"
            ) {
              return;
            }

            // 3️⃣ Original logic (unchanged)
            const receivedReportName = event.data.reportName.split("(")[0].trim();

            const reports = {
              Person: () => console.log("GAL Report"),
              "Flexible employee Report - NON SA": () => console.log("Flex EE Non-SA"),
              "Flexible Employee Data": () => console.log("Flex EE SA"),
              "Flexible Actions Report": () => console.log("Flexible Actions Report"),
              "Employee Detail Census": () => console.log("Employee Detail Census"),
              "Compensation Report": () => console.log("Compensation Ad Hoc Report"),
              "Reward & Recognition": () => console.log("GEM Report"),
              SAP: () => console.log("SAP Salary History Report"),
              OHR: () => console.log("OHR Salary History Report"),
              "Diversity Movement Summary (Actions)": () =>
                console.log("Diversity Movement Summary (Actions)"),
              "Diversity Worforce Summary - PIT": () =>
                console.log("Diversity Workforce Summary - PIT"),
              "Employee Headcount Rollup Summary": () =>
                console.log("Employee Headcount Rollup Summary"),
              Query1: () => console.log("Employee Terminations OR Promotions"),
              "Position Status Report": () => console.log("Position Status Report"),
            };

            if (reports[receivedReportName]) {
              reports[receivedReportName]();
            } else {
              console.log("No match found");
              setTimeout(() => showRelevantPopupSeries("generic_report", tutorial), 1100);
            }

            setTimeout(() => showRelevantPopupSeries(receivedReportName, tutorial), 1100);
          });

          // Inject helper script
          const script = document.createElement("script");
          script.src = chrome.runtime.getURL("inject.js");
          (document.head || document.documentElement).appendChild(script);
            console.log("MENUCLICK IS:",menuLabel)
          if (reportPrompt && gifClicked) {
            setTimeout(() => showRelevantPopupSeries(reportName, tutorial), 1800);
          } else if (bwHome) {
            showRelevantPopupSeries("bw_landingPage", tutorial);
          } else if (bwFolders) {
            showRelevantPopupSeries("bw_reporting_1", tutorial);
          } else if (bwFavorites) {
            showRelevantPopupSeries("bw_reporting_3", tutorial);
          } else if (bwSchedule && menuLabel === 'none') {
            setTimeout(() => showRelevantPopupSeries("preferencesPage", tutorial), 1100);
          } else if (menuLabel === "Schedule" && publicFolderVisible > 0) {
            setTimeout(() => showRelevantPopupSeries("schedulePage", tutorial), 1100);
          } else if (menuLabel === "BI Inbox") {
            setTimeout(() => showRelevantPopupSeries("inboxPage", tutorial), 1100);
          }
          else if ((menuLabel === 'none') && (!reportPrompt)) {
            setTimeout(() => showRelevantPopupSeries("historyPage", tutorial), 1100);
            }
        } else {
          // Fallback if not BW domain
          setTimeout(() => showRelevantPopupSeries(reportName, tutorial), 1100);
        }
      }, 550);
    }
  );
}

function showRelevantPopupSeries(currentPageLabel, tutorial) {
    closeAllGifs();
    console.log(`Showing pop-ups for ${currentPageLabel}, tutorial: ${tutorial}`);
  chrome.storage.sync.get(['popupsEnabled', 'activeTutorial'], function(result) {
    let popupsEnabled = result.popupsEnabled;
    const activeTutorial = tutorial || result.activeTutorial;
    console.log("Resolved active tutorial:", activeTutorial);
    console.log('PopupsEnabled = ' + popupsEnabled);
    if (popupsEnabled === false) return;
  const pageConfig = {
    'preferencesPage': {
      identifiers: ['#dlgContainer'],
      tutorials: {
        'bw-schedule': [
        {  position: { top: '30', left: '55%' }, message: `First, Click <b>Locales and Time Zone</b>.`, glowTarget: {type: 'id',
  value: 'ygtvcontentel3',
  scope: 'iframe',
advanceOnClick: true}},
    {  position: { top: '30', left: '60%' }, message: `Great! Now, Click the dropdown and select your current <b>Time Zone</b>.`, glowTarget: {type: 'text',
  value: 'Current Time Zone',
  scope: 'iframe',
advanceOnClick: true}},
{  position: { top: '30', left: '55%' }, message: `Finally, Click <b>Save & Close</b> on the bottom right to apply and continue with the Scheduling tutorial.`, glowTarget: {type: 'button',
  value: 'Save & Close',
  scope: 'iframe',
advanceOnClick: true}},
      ]
    }},
    'historyPage': {
      identifiers: ['#historyComponent_HistoryExplorer_listPane'],
      tutorials: {
        'bw-schedule': [
        {  position: { top: '135px', left: '250px' }, message: `This <b>History</b> menu is where you can find your latest <b>5 scheduled report runs</b> and their statuses.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_4', tutorial: 'bw-schedule'},             
        {  position: { top: '135px', left: '250px' }, message: `Once your report run is complete, you can click on the <b>Instance Time </b> on the left side to open a report and view the data.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_4', tutorial: 'bw-schedule'},
        {  position: { top: '135px', left: '250px' }, message: `Close this menu using the <b>X</b> on the top right of the window.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_4', tutorial: 'bw-schedule'},
      ]
    }},
    'schedulePage': {
      identifiers: ['#dlgContainer'],
      tutorials: {
        'bw-schedule': [
        {  position: { top: '135px', left: '250px' }, message: `Select <b>Recurrence</b> on the left side.`, tutorial: 'bw-schedule', glowTarget: {type: 'id',
  value: 'ygtvlabelel3',
  scope: 'iframe',
advanceOnClick: true}}, 
        {  position: { top: '135px', left: '250px' }, message: `Next, use the <b>dropdown</b> to indicate your desired cadence.`, tutorial: 'bw-schedule', glowTarget: {type: 'id',
          value: 'ygtvlabelel3',
          scope: 'iframe',
        advanceOnClick: false}}, 
        {  position: { top: '2px', left: '55%' }, message: `Choose a <b>Start Time</b>. Avoid 8pm-4am EST since it would conflict with the nightly load process.<br>Leave the <b>End Time</b> as-is.`, tutorial: 'bw-schedule', glowTarget: {type: 'id',
  value: 'ygtvlabelel3',
  scope: 'iframe',
advanceOnClick: true}}, 
        {  position: { top: '135px', left: '250px' }, message: `Select <b>Prompts</b> on the left side.`, tutorial: 'bw-schedule', glowTarget: {type: 'id',
  value: 'ygtvlabelel4',
  scope: 'iframe',
advanceOnClick: true}},
        {  position: { top: '25px', left: '350px' }, message: `Select <b>Dynamic Value</b> or <b>Constant Value</b> on the right side.<br><br><u><b>Dynamic</b></u> sets the report's effective date to the day the report is run. <u><b>Constant</b></u> allows you to specify a fixed, static date.`, tutorial: 'bw-schedule', glowTarget: {type: 'id',
  value: 'ygtvlabelel4',
  scope: 'iframe',
advanceOnClick: false}},
        {  position: { top: '135px', left: '250px' }, message: `Now, click <b>Modify</b> to choose prompt filters for your report. It may take a minute to load. `, tutorial: 'bw-schedule', glowTarget: {type: 'id',
  value: 'ygtvlabelel4',
  scope: 'iframe',
advanceOnClick: false}},
        {  position: { top: '65px', left: '350px' }, message: `<b>Maximize</b> the window using the <img src="${chrome.runtime.getURL('icons/maximize.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Maximize Icon"> button on the top right of the scheduling window.`, tutorial: 'bw-schedule', glowTarget: {type: 'id',
  value: 'OK_BTN_promptsDlg',
  scope: 'iframe',
advanceOnClick: true}}, 
{  position: { top: '65px', left: '350px' }, message: `<b>Drag</b> the prompt window higher, if needed, and Click <b>Apply</b> to save your report filters.`, tutorial: 'bw-schedule', glowTarget: {type: 'id',
  value: 'OK_BTN_promptsDlg',
  scope: 'iframe',
advanceOnClick: true}}, 
        {  position: { top: '135px', left: '250px' }, message: `Finally, Click <b>Schedule</b> on the bottom right.`, tutorial: 'bw-schedule', glowTarget: {type: 'button',
  value: 'Schedule',
  scope: 'iframe',
advanceOnClick: true}}
      ]
    }},
    'inboxPage': {
    identifiers: ['#theForm'],
    tutorials: {
      'bi-inbox': [
        {  position: { top: '30%', left: '35%' }, message: `First, <b>type your own SSO in the search bar </b> at the top of the window.`, glowTarget: {
        type: 'id',
        value: 'URE_Inbox_List_selector_available_toolbarItem0_2_searchText',
        advanceOnClick: true
        }},  
        {  position: { top: '30%', left: '35%' }, message: `Next, Click the <b> binoculars icon </b> to Submit.`, glowTarget: {
        type: 'id',
        value: 'URE_Inbox_List_selector_available_toolbarItem0_2_searchButton',
        advanceOnClick: true
      }},  
        {  position: { top: '30%', left: '35%' }, message: `Now, Click the <b>record with your name and SSO</b> to select it.`, glowTarget: {
          type: 'id',
          value: 'URE_Inbox_List_selector_available_detailView_listMainTable',
        advanceOnClick: true
        }},
        {  position: { top: '30%', left: '15%' }, message: `Click the <b>right-facing arrow</b> ("<b>></b>")to bring your selection to the right side.`, glowTarget: {
          type: 'id',
          value: 'URE_Inbox_List_selector_IC_addInput',
        advanceOnClick: true
        }},  
        {  position: { top: '30%', left: '15%' }, message: `Finally, Click <b>Send</b> on the bottom right to send your report.`, glowTarget: 'input[value="Send"]'}
    ]
  }},
    'landingPage1': {
      identifiers: ['#navNodeAnchor_1_1'],
      tutorials: {
        'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ],
          'basic': [
        {  position: { top: '45%', left: '35%' }, message: `Hi there, Welcome to this BW tutorial! `, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.remove('auto-unfurl');
  }},
        {  position: { top: '45%', left: '35%' }, message: `This basic tutorial will teach you to:<br><b>1.</b> Access the BW environment</br><b>2.</b> Save a report to your Favorites<br><b>3.</b> Run and Export a report.`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.remove('auto-unfurl');
  } }, 
        {  position: { top: '45%', left: '35%' }, message: `Follow the instructions on the pop ups and click <b>Next</b> when you're ready to move on! ` },
        {  position: { top: '150px', left: '175px' }, message: `First, Click the dropdown labeled<br><b>SAP Applications</b>`, glowTarget: 'navNodeAnchor_1_1' }
      ],
          'bi-inbox': [
        {  position: { top: '45%', left: '35%' }, message: `Hi there, Welcome to this BW tutorial! `, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.remove('auto-unfurl');
  } },      
        {  position: { top: '45%', left: '35%' }, message: `This basic tutorial will teach you how to use the <b>BI Inbox</b>` },       
        {  position: { top: '45%', left: '35%' }, message: `Follow the instructions on the pop ups and click <b>Next</b> when you're ready to move on! ` },
        {  position: { top: '150px', left: '175px' }, message: `First, Click the dropdown labeled<br><b>SAP Applications</b>`, glowTarget: 'navNodeAnchor_1_1' }
      ],
        'bw-schedule': [
        {  position: { top: '45%', left: '35%' }, message: `Hi there, Welcome to this BW tutorial! `, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.remove('auto-unfurl');
  } },      
        {  position: { top: '45%', left: '35%' }, message: `This basic tutorial will teach you how to <b>Schedule </b> your reports to run in the background.` },       
        {  position: { top: '45%', left: '35%' }, message: `Follow the instructions on the pop ups and click <b>Next</b> when you're ready to move on! ` },
        {  position: { top: '150px', left: '175px' }, message: `First, Click the dropdown labeled<br><b>SAP Applications</b>`, glowTarget: 'navNodeAnchor_1_1' }
      ],
        'bw-design': [
        {  position: { top: '45%', left: '35%' }, message: `Hi there, Welcome to this BW tutorial! `, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.remove('auto-unfurl');
  } },      
        {  position: { top: '45%', left: '35%' }, message: `This basic tutorial will teach you how to use <b>Design Mode</b> to customize your reports` },       
        {  position: { top: '45%', left: '35%' }, message: `Follow the instructions on the pop ups and click <b>Next</b> when you're ready to move on! ` },
        {  position: { top: '150px', left: '175px' }, message: `First, Click the dropdown labeled<br><b>SAP Applications</b>`, glowTarget: 'navNodeAnchor_1_1' }
      ]
    }},
    'landingPage2': {
      identifiers: ['#navNodeAnchor_2_1'],
      tutorials: {
                'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
        {  position: { top: '45%', left: '35%' }, message: `Master Shifu sent you a message. Click the <b>Dragon Scroll </b> to open it! `, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.remove('auto-unfurl');
  } }
      ],
        'basic': [
        {  position: { top: '200px', left: '250px' }, message: `Next, click the dropdown labeled<br><b>BW HCM Reporting</b> to enter the BW Reporting Environment.`, glowTarget: 'navNodeAnchor_2_1' },
        //{  position: { top: '200px', left: '250px' }, message: `<i> <b>Note:</b> If you do not see this tab, you may not have access to BW and will need to contact the Security team to be granted access.</i>`, glowTarget: 'navNodeAnchor_2_1' },
        {  position: { top: '20px', left: '60%' }, message: `<i> <b>Note:</b> If BW did not open in a new tab, please enable popups using the icon above <img style="max-width: 100%; height: auto;" src="${chrome.runtime.getURL('images/PopupBlocker.png')}">` } 
      ],
      'bi-inbox': [
        {  position: { top: '200px', left: '250px' }, message: `Next, click the dropdown labeled<br><b>BW HCM Reporting</b> to enter the BW Reporting Environment.`, glowTarget: 'navNodeAnchor_2_1' },
        //{  position: { top: '200px', left: '250px' }, message: `<i> <b>Note:</b> If you do not see this tab, you may not have access to BW and will need to contact the Security team to be granted access.</i>`, glowTarget: 'navNodeAnchor_2_1' },
        {  position: { top: '20px', left: '60%' }, message: `<i> <b>Note:</b> If BW did not open in a new tab, please enable popups using the icon above <img style="max-width: 100%; height: auto;" src="${chrome.runtime.getURL('images/PopupBlocker.png')}">` } 
      ],
      'bw-schedule': [
        {  position: { top: '200px', left: '250px' }, message: `Next, click the dropdown labeled<br><b>BW HCM Reporting</b> to enter the BW Reporting Environment.`, glowTarget: 'navNodeAnchor_2_1' },
        //{  position: { top: '200px', left: '250px' }, message: `<i> <b>Note:</b> If you do not see this tab, you may not have access to BW and will need to contact the Security team to be granted access.</i>`, glowTarget: 'navNodeAnchor_2_1' },
        {  position: { top: '20px', left: '60%' }, message: `<i> <b>Note:</b> If BW did not open in a new tab, please enable popups using the icon above <img style="max-width: 100%; height: auto;" src="${chrome.runtime.getURL('images/PopupBlocker.png')}">` } 
      ],
      'bw-design': [
        {  position: { top: '200px', left: '250px' }, message: `Next, click the dropdown labeled<br><b>BW HCM Reporting</b> to enter the BW Reporting Environment.`, glowTarget: 'navNodeAnchor_2_1' },
        //{  position: { top: '200px', left: '250px' }, message: `<i> <b>Note:</b> If you do not see this tab, you may not have access to BW and will need to contact the Security team to be granted access.</i>`, glowTarget: 'navNodeAnchor_2_1' },
        {  position: { top: '20px', left: '60%' }, message: `<i> <b>Note:</b> If BW did not open in a new tab, please enable popups using the icon above <img style="max-width: 100%; height: auto;" src="${chrome.runtime.getURL('images/PopupBlocker.png')}">` } 
      ]
    }},
    'landingPage3': {
      identifiers: ['#navNodeAnchor_2_1'],
      tutorials: {
        'basic': [
        {  position: { top: '375px', left: '700px' }, message: `BW should have opened in a new tab/window. If nothing opened, be sure you have disabled your pop-up blocker.` },
        {  position: { top: '375px', left: '700px' }, message: `This is the <b>portal home page</b>.<br>Here, you will see notifications regarding scheduled downtime for BW. If you don't see a message, BW is running as expected!` },
        {  position: { top: '375px', left: '700px' }, message: `You may now proceed to the newly opened tab/window to continue the tutorial within the BW reporting environment` },     
      ]
    }},
    'bw_landingPage': {
      identifiers: ['#id_93_3sl5j068'],
      tutorials: {
        'basic': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab to enter the BW Reporting Environment`}
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab to enter the BW Reporting Environment` }
      ],
      'bw-design': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab to enter the BW Reporting Environment` }
      ],
      'bi-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab to enter the BW Reporting Environment` }
      ]
    }},
    'bw_reporting_1': {
      identifiers: ['#accordionNavigationView_drawer1_treeView_treeNode1_name'],
      tutorials: {
        'basic': [
        {  position: { top: '135px', left: '200px' }, message: `<b>Welcome to Business Warehouse (BW)!</b> `, badgeId: 5 },
        {  position: { top: '135px', left: '200px' }, message: `You are now viewing the <b>Public Folders</b>. `, glowTarget: '#accordionNavigationView_drawer1_treeView_treeNode1_name' },
        {  position: { top: '135px', left: '200px' }, message: ` These folders are accessible to many users. To avoid a data breach: <br><b><u> Please do not schedule reports directly from the Public Folders</u></b>.` },
        {  position: { top: '135px', left: '200px' }, message: `Instead, you will now learn how to copy reports to your <b>Favorites</b> folder before running them.` },
        {  position: { top: '135px', left: '50px' }, message: `To access the reports, <b>Double-Click</b> through the folders one at a time until the report names are visible.`, glowTarget: '#ListingURE_detailView_listNode1_0' },
        {  position: { top: '135px', left: '50px' }, message: `Once you've found a report, Click the report and then Click <b> Organize</b> on the top bar`, glowTarget: {type: 'id', value: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_2', advanceOnClick: true  } },
        {  position: { top: '135px', left: '50px' }, message: `Now, Click <br><b> Copy.</b>`, glowTarget: {
        type: 'text',
        value: 'Copy',
        advanceOnClick: true  
      }},
        {  position: { top: '40px', left: '350px' }, message: `Next, Click the dropdown labeled <b>My Documents</b> on the top left corner of your screen.`, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }},
        {  position: { top: '40px', left: '250px' }, message: `Now that you are in your Favorites folder, Click <b> Organize</b> once again.`, glowTarget: {type: 'id', value: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_2',advanceOnClick: true } },
        {  position: { top: '135px', left: '50px' }, message: `Finally, Click <br><b> Paste.</b>`, glowTarget: {
        type: 'text',
        value: 'Paste',
        advanceOnClick: true  
      }},
        {  position: { top: '135px', left: '250px' }, message: `Your desired report should now appear here in your <b>Favorites</b>. Hooray!`, },
        {  position: { top: '135px', left: '250px' }, message: `You can now double click your report to <b>open</b> it.` }
      ],
      'bi-inbox': [
        {  position: { top: '135px', left: '200px' }, message: `<b>Welcome to Business Warehouse (BW)!</b>` },
        {  position: { top: '135px', left: '200px' }, message: `This tutorial will teach you how to send and receive reports within BW via the <b>BI Inbox</b>.` },
        {  position: { top: '135px', left: '200px' }, message: `<b> Note: </b>Reports should only be sent to <b>members of of your own team with equivalent access</b> to prevent any potential data breaches.` },
        {  position: { top: '135px', left: '200px' }, message: `First, Click the dropdown labeled <b>My Documents</b> on the top left corner of your screen.`, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }},
        {  position: { top: '135px', left: '200px' }, message: `Next, Click a report from your <b>Favorites</b> folder.`, glowTarget: {
        type: 'id',
        value: 'ListingURE_listPane',
        advanceOnClick: true  
      }},
        {  position: { top: '135px', left: '250px' }, message: `Now, Click <b>Send</b> on the top bar.`, glowTarget: {
        type: 'id',
        value: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3',
        advanceOnClick: true  
      }}, 
        {  position: { top: '135px', left: '250px' }, message: `Finally, Click <b>BI Inbox</b> to proceed to the Send menu`, glowTarget: {
        type: 'text',
        value: 'BI Inbox',
        advanceOnClick: true
        }},  
        {  position: { top: '135px', left: '200px' }, message: `To view the report you just sent, Click <b>Inbox</b>.`, glowTarget: {
        type: 'id',
        value: 'MyDocs_treeView_treeNode2_name',
        advanceOnClick: true
      }},
        {  position: { top: '135px', left: '250px' }, message: `This is where you will find any reports that were sent to your <b>BI Inbox</b>. You can then copy them to your Favorites folder and run them as you wish!` },
        {  position: { top: '135px', left: '250px' }, message: `Congratulations! You've completed this tutorial on the <b>BI Inbox</b>`,  badgeId: 2, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  }}
      ],
      'bw-schedule': [
        {  position: { top: '135px', left: '200px' }, message: `<b>Welcome to Business Warehouse (BW)!</b> ` },
        {  position: { top: '135px', left: '200px' }, message: `You are now viewing the <b>Public Folders</b>. `, glowTarget: '#accordionNavigationView_drawer1_treeView_treeNode1_name' },
        {  position: { top: '135px', left: '200px' }, message: ` These folders are accessible to many users. To avoid a data breach: <br><b><u> Please do not schedule reports directly from the Public Folders</u></b>.` },

        {  position: { top: '40px', left: '350px' }, message: `Instead, Click the dropdown labeled <b>My Documents</b> on the top left corner of your screen.`, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }},
      {  position: { top: '115px', left: '60%' }, message: `<b>Important:</b> Before Scheduling your first report, Click <b> Preferences</b> <img src="${chrome.runtime.getURL('icons/preferences.png')}" style="width:80px; height:auto; vertical-align:middle;" alt="Preferences Icon"> on the top of your screen to set your <b>Time Zone</b>.`},
        {  position: { top: '135px', left: '200px' }, message: `Now that you have set your <b>Time Zone</b>, Click a report from your <b>Favorites</b> folder.`, glowTarget: {
        type: 'id',
        value: 'ListingURE_listPane',
        advanceOnClick: true  
      }},
        {  position: { top: '135px', left: '250px' }, message: `Now, Click <b>More Actions</b> on the top bar.`, glowTarget: {
        type: 'id',
        value: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_4',
        advanceOnClick: true  
      }}, 
        {  position: { top: '135px', left: '250px' }, message: `Finally, Click <b>Schedule</b> to proceed to the Scheduling menu`, glowTarget: {
        type: 'text',
        value: 'Schedule',
        advanceOnClick: true
        }}, 
        {  position: { top: '135px', left: '250px' }, message: `To re-access the <b>History</b> menu, Click your report and then click <b>More Actions > History</b>`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_4', tutorial: 'bw-schedule'},
        {  position: { top: '135px', left: '250px' }, message: `Congratulations! You've completed this tutorial on <b>scheduling reports!</b>`, badgeId: 3, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  }} 
      ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `<b>Welcome to Business Warehouse (BW)!</b> ` },
        {  position: { top: '135px', left: '200px' }, message: `First, Click the dropdown labeled <b>My Documents</b> on the top left corner of your screen.`, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }},
        {  position: { top: '135px', left: '200px' }, message: ` Next, <b>Double-Click</b> a report within your Favorites folder to open it.`, glowTarget: '#ListingURE_listPane' }      
      ],        
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ],
      }},
    'generic_report': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  }  }
      ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: {
        type: 'roleButton',
        value: 'Cancel',
        advanceOnClick: true  
      }},
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `,  glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`},
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Refresh Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },         {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true  
      }}
      ],
      'bw-schedule': [
        {  position: { top: '40px', left: '5%' }, message: `If you would like to <b>Export</b> a finished scheduled report to Excel, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true  
      }}
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'report_prompt': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `To filter by <b>Employee Type</b>, Select the value '<b>Employee</b>', and click the right arrow to bring it to the box on the right side.` },
        {  position: { top: '35%', left: '72%' }, message: `Next, Click '<b>Enter value(s) for State</b>'. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of values for State. Select <b>New York</b> from the list and click the right arrow.`, glowTarget: '#div_input_lovWidgetpromptLovZone_searchTxt' },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1},
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Flexible employee Report - NON SA': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Flexible Employee Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.`},
        {  position: { top: '35%', left: '72%' }, message: `To filter by Employment Status, Select '<b>Enter values for Employment Status</b>', ` },
        {  position: { top: '35%', left: '72%' }, message: `Next, type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of possible values for Employment Status. Select <b>Active</b> and <b>Inactive</b> from the list and click the right arrow to bring it to the box on the right side.` },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. `, glowTarget: 'IconImg__dhtmlLib_309' },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: { type: "roleButton", scope: "iframe", value: "Design", advanceOnClick: true }
      },    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Flexible Employee Data': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Flexible Employee Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `To filter by Employment Status, Select '<b>Enter values for Employment Status</b>', ` },
        {  position: { top: '35%', left: '72%' }, message: `Next, type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of possible values for Employment Status. Select <b>Active</b> and <b>Inactive</b> from the list and click the right arrow to bring it to the box on the right side.` },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Employee Detail Census': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Employee Detail Census! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `The <b>Employee Detail Census</b> will only show results for Active or Inactive (LOA) employees.` },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Person': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the GAL report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `To filter by <b>Employee Type</b>, Select the value '<b>Employee</b>', and click the right arrow to bring it to the box on the right side.` },
        {  position: { top: '35%', left: '72%' }, message: `Next, Click '<b>Enter value(s) for State</b>'. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. You should see the list of values for State. Select <b>New York</b> from the list and click the right arrow.`, glowTarget: '#div_input_lovWidgetpromptLovZone_searchTxt' },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ]
    }},
    'Flexible Actions Report': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Flexible Actions Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `First, filter by your desired date range using <b>Action Start Date (Start)</b> and <b>Action Start Date (End)</b>. ` },
        {  position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Query1': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `First, filter by your desired date range using <b>Action Start Date (Start)</b> and <b>Action Start Date (End)</b>. ` },
        {  position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Compensation Report': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Compensation Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Performance Status SF': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the <a href="https://example.sharepoint.com/sites/thrivelibrary/SitePages/HR Operations %26 Systems - Reporting Training.aspx?web=1" target="_blank">Performance Status Report</a>! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Position Status Report': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Position Status Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `To set filter criteria, Click one of the criteria under <b>Prompts Summary</b>. Type an asterisk (<b>*</b>) into the bottom search bar and hit Enter on your keyboard. Select your desired value(s) from the list and click the right arrow.` },
        {  position: { top: '35%', left: '72%' }, message: `Click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Diversity Movement Summary': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Diversity Movement Summary (Actions) Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `First, filter by your desired date ranges using <b>Previous Action Effective Date (Start)</b> and <b>Current Action Effective Date (End)</b>. ` },
        {  position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 15
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    'Diversity Worforce Summary - PIT': {
      identifiers: ['#webiViewFrame'],
      tutorials: {
        'basic': [
        {  position: { top: '35%', left: '72%' }, message: `This is the Diversity Worforce Summary - PIT Report! The <b>Prompt</b> window allows you to set filter criteria for your report. Red arrows on the left side indicate required fields.` },
        {  position: { top: '35%', left: '72%' }, message: `First, filter by your desired dates using <b>Prior Point in Time Reporting Date (Start)</b> and <b>Point in Time Reporting Date</b>. ` },
        {  position: { top: '35%', left: '72%' }, message: `Next, click <b>OK</b> to run the report` },
        {  position: { top: '40px', left: '5%' }, message: `Once the report is done loading, Click the <img src="${chrome.runtime.getURL('images/export.PNG')}" style="width:30px; height:auto; vertical-align:middle;" alt="Export Icon"> Icon above to <b>Export</b> your report to Excel. ` },
        {  position: { top: '25%', left: '72%' }, message: `Select File Type <b>Excel (.xlsx)</b> and Click <b>OK</b>. After the export completes, your report will appear in your Downloads.` },
        {  position: { top: '25%', left: '65%' }, message: `<b>Congratulations, You've completed this BW tutorial! :)</b>`, badgeId: 1  },
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'bi-inbox': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
      ],
      'bw-schedule': [
        {  position: { top: '20px', left: '150px' }, message: `Click the <b>Documents</b> Tab on the top left to return to your Folders `, glowTarget: {
        type: 'id',
        value: 'yui-gen0-1-label',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: -190
      }}
    ],
      'bw-design': [
        {  position: { top: '135px', left: '200px' }, message: `First, Click the <b>Cancel</b> button to dismiss the report prompt `, glowTarget: 'IconImg_Txt_iconMenu_icon__dhtmlLib_351' },
        {  position: { top: '135px', left: '200px' }, message: `Next, Click the button labeled <b>Design</b> on the top right of your screen to enter Design Mode. `, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Design',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'left', 
        arrowOffsetPx: 15
      }},    
        {  position: { top: '135px', left: '200px' }, message: `Now, Click the dropdown labeled <b>Available Objects</b> <img src="${chrome.runtime.getURL('icons/available-objects.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Available Objects Icon"> on the left side of your screen.`, glowTarget: {
        type: 'roleButton',
        scope: 'iframe',
        value: 'Available Objects',
        advanceOnClick: true,
        indicator: 'arrow', 
        arrowSide: 'right', 
        arrowOffsetPx: 20
      }},
        {  position: { top: '135px', left: '250px' }, message: `You should see a list of available <b>fields</b> that you can add to your report.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '135px', left: '250px' }, message: `Click one of the fields and <b>Drag</b> it in between two columns in the header your report. You should see a <b>tall blue rectangle</b> before you let go of the drag.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' },  
        {  position: { top: '30px', left: '45%' }, message: `You may now Click the <b>dropdown</b> next to the <img src="${chrome.runtime.getURL('icons/save.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> icon on the top left of your report and select <b>Save As</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Choose a name for your custom report and click <b>Save</b>.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `If you would like to run your report, you can click the <b>Refresh</b> <img src="${chrome.runtime.getURL('icons/refresh.png')}" style="width:30px; height:auto; vertical-align:middle;" alt="Save Icon"> button on the top left.`, glowTarget: 'IconImg_Txt_iconMenu_icon_ListingURE_toolbarItem0_3' }, 
        {  position: { top: '1px', left: '45%' }, message: `Congratulations! You've completed this tutorial on <b>Design Mode</b> :)`, badgeId: 4},
        {  position: { top: '25%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner to open the Hall menu and check out your new badge!`,
        glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } }, 
      ],
      'default': [
        {  position: { top: '45%', left: '35%' }, message: `Click <b>Documents</b> on the top left of your screen and then Click the <b>Dragon Scroll</b> on the top right corner of your screen to open the Hall menu`, glowTarget: function () {
          const panda = document.getElementById('dragon-scroll');
          panda.classList.add('auto-unfurl');
          return panda;
  } },
      ]
    }},
    
  };

let matchedKey = Object.keys(pageConfig).find(key =>
  currentPageLabel && currentPageLabel.toLowerCase().includes(key.toLowerCase())
);

if (!matchedKey) {
  console.warn(`No matching pageConfig found for "${currentPageLabel}"`);
  matchedKey = 'generic_report'; // fallback
}
    const page = pageConfig[matchedKey];

    if (!page) {
      console.warn(`No page config found for matched key: ${matchedKey}`);
      return;
    }

    // Pull the popups from the right structure
    let tutorialPopups = [];

    if (page.tutorials && page.tutorials[activeTutorial]) {
      tutorialPopups = page.tutorials[activeTutorial];
    } else if (page.popups) {
      tutorialPopups = page.popups.filter(p => !p.tutorial || p.tutorial === activeTutorial);
    } else {
      console.warn(`No popups found for tutorial "${activeTutorial}" on page "${currentPageLabel}"`);
      return;
    }

    console.log(`Showing popups for ${matchedKey}, tutorial: ${activeTutorial}`);
    console.log("Tutorial popups loaded:", tutorialPopups.length);

    waitForAnyElement(page.identifiers, function (element) {
      if (element) {
        setTimeout(() => showPopupSeries(tutorialPopups, 0, []), 250);
      } else {
        console.warn(`Identifier element not found for ${currentPageLabel}`);
      }
    });
  });
}

function showPopupSeries(popupSteps, currentIndex, history) {
  chrome.storage.sync.get(['popupsEnabled'], function(result) {
    let popupsEnabled = result.popupsEnabled;
  if (popupsEnabled === false) return;
  if (currentIndex >= popupSteps.length) return;
  const step = popupSteps[currentIndex];
  const { position, message, glowTarget, badgeId, tutorial} = step;
  history.push(currentIndex);
 displayPopupAtPosition(position, message, currentIndex, popupSteps.length,
  () => {
    setTimeout(() => showPopupSeries(popupSteps, currentIndex + 1, history), 500);
  },
  () => {
    if (history.length > 1) {
      history.pop();
      const previousIndex = history.pop();
      setTimeout(() => showPopupSeries(popupSteps, previousIndex, history), 500);
    }
  },
  glowTarget, badgeId, tutorial
);
})}

function makeHallDraggable(menu, handle) {
  if (!menu || !handle) return;

  let isDown = false;
  let startX = 0, startY = 0;
  let startLeft = 0, startTop = 0;

  const onDown = (e) => {
  if (e.button !== 0) return;
  if (e.target.closest?.('button, input, textarea, a, select')) return;

  isDown = true;
  handle.classList.add("dragging");

  chrome.storage.sync.get(['activeTutorial'], function(result) {
  chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "hall_drag",
      data: {
        tutorial: result.activeTutorial
      }
    })});

  const rect = menu.getBoundingClientRect();
  startX = e.clientX;
  startY = e.clientY;
  startLeft = rect.left;
  startTop = rect.top;

  // Freeze popup exactly where it is before dragging
  menu.style.transition = "none";
  menu.style.left = `${rect.left}px`;
  menu.style.top = `${rect.top}px`;
  menu.style.right = "auto";
  menu.style.bottom = "auto";
  menu.style.transform = "none";

  e.preventDefault();
};

  const onMove = (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    menu.style.left = `${startLeft + dx}px`;
    menu.style.top = `${startTop + dy}px`;

    const margin = 8;
const rect = menu.getBoundingClientRect();
let nextLeft = startLeft + dx;
let nextTop = startTop + dy;

nextLeft = Math.min(Math.max(nextLeft, margin), window.innerWidth - rect.width - margin);
nextTop  = Math.min(Math.max(nextTop, margin), window.innerHeight - rect.height - margin);

menu.style.left = `${nextLeft}px`;
menu.style.top  = `${nextTop}px`;

  };

  const onUp = () => {
    if (!isDown) return;
    isDown = false;
    handle.classList.remove("dragging");
  };

  handle.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}
    // ---- Training Hall UI (Dragon Scroll + menu) ----
(function initTrainingHallUI() {
  if ((bwFolders || targetDomain) && !(currentDomain === 'portal.example.com')) {if (window === window.top || window.frames.length !== 0) {return}} 
  if (!bwFolders) if (window.frames.length === 0) {return};
  const rootDoc = document; 
  if (rootDoc.getElementById('dragon-scroll')) return;

  // ------------------------
  // Data models
  // ------------------------
  const hallInboxMessages = [
  ];


// --- helpers: share url + clipboard copy (HTML + plain) ---

function getBadgeShareUrl(badgeId) {
  return `https://example.sharepoint.com/:i:/r/sites/PeopleAnalyticsTeam/Shared%20Documents/People%20Analytics/Reporting/BW%20Training%20Hall/badges/${badgeId}.png?csf=1&web=1&e=h6KJVT`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function copyBadgeShareToClipboard(badgeName, badgeId) {
  const url = getBadgeShareUrl(badgeId);
  const url2 = "https://portal.example.com/irj/portal"

  const plainText =
    `Check out my new Training Hall badge! \n\n` +
    `${badgeName}: ${url}`;

  const htmlText =
    `Check out my new Training Hall badge! 🐼🥋<br><br>` +
    `<a href="${url}">${escapeHtml(badgeName)}</a><br><br>` +
    `You can earn badges in Training Hall: <a href="${url2}">${"Portal Page"}</a>`

  if (navigator.clipboard && window.ClipboardItem) {
    const item = new ClipboardItem({
      "text/plain": new Blob([plainText], { type: "text/plain" }),
      "text/html": new Blob([htmlText], { type: "text/html" }),
    });
    await navigator.clipboard.write([item]);
    return;
  }

  // Fallback: plain only
  await navigator.clipboard.writeText(plainText);
}

function closeAllSharePills() {
  document.querySelectorAll(".hall-share-pill").forEach(el => el.remove());
}

// Optional: tiny “Copied!” pill near the icon (no extra button)
function showCopiedPillNear(el, text = "Copied Badge to Clipboard! ✅<br>Feel free to paste it in <b>Teams</b> to show it off :)") {

    closeAllSharePills(); // ✅ closes any existing pills
  const r = el.getBoundingClientRect();
  const pill = document.createElement("div");
  pill.className = "hall-share-pill"; // ✅ so we can find/remove it later
  pill.innerHTML = text;

Object.assign(pill.style, {
  position: "fixed",
  zIndex: "2147483647",
  top: `${Math.round(r.top - 10)}px`,
  left: `${Math.round(r.left + r.width + 10)}px`,

  // Layout
  display: "inline-block",
  boxSizing: "border-box",
  maxWidth: "210px",
  padding: "12px 16px",

  // Text
  whiteSpace: "pre-line",
  lineHeight: "1.35",
  textAlign: "left",

  // Visuals
  background: "#FEF5B1",
  border: "2px solid #000",
  borderRadius: "18px", // key change (instead of 999px)
  boxShadow: "0 10px 22px rgba(0,0,0,0.22)",

  fontFamily: "Rock Sans, Arial, sans-serif",
  fontSize: "12px",

  pointerEvents: "none",
  opacity: "0",
  transition: "opacity 160ms ease, transform 160ms ease",
  transform: "translateY(2px)",
});

  document.body.appendChild(pill);
  requestAnimationFrame(() => (pill.style.opacity = "1"));
  pill.style.transform = "translateY(0)";
  setTimeout(() => {
    pill.style.opacity = "0";
    setTimeout(() => pill.remove(), 5200);
  }, 6200);
}

  // ------------------------
  // Styles
  // ------------------------
  const style = rootDoc.createElement('style');
  style.id = 'td-styles';
  style.textContent = `
    #hall-menu, #hall-menu * { box-sizing: border-box; }
    /* Panda tab same as before... */
#dragon-scroll {
  position: fixed;
  top: -50px;
  right: 20px;
  width: 80px;
  height: 120px; /* size of rolled scroll */
  z-index: 2147483647;
}

/* Rolled scroll = default visible */
#dragon-scroll .rolled {
  width: 80px;
  height: 120px;
  background: url("${chrome.runtime.getURL('menu-ui/hall-dragon-scroll-rolled.png')}") no-repeat center/contain;
  transition: opacity 0.6s ease;
  position: relative;
  z-index: 2;
  cursor: pointer;
  pointer-events: auto; /* unfurled part can't be hovered/clicked */
}

/* Unfurled scroll + logo = hidden until hover */
#dragon-scroll .unfurled {
  position: absolute;
  top: 45%;   /* directly below rolled scroll */
  left: 0;
  width: 80px;
  height: 200px; /* adjust to your unfurled scroll image */
  background: url("${chrome.runtime.getURL('menu-ui/hall-dragon-scroll-unfurled.png')}") no-repeat top center/contain;
  opacity: 1;
  clip-path: inset(0 0 100% 0);
  transition: opacity 2s ease, clip-path 0.6s ease;
  z-index: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  pointer-events: none; /* unfurled part can't be hovered/clicked */
}

#dragon-scroll .td-notif {
  position: relative;
  top: 17px;
  right: -48px;
  height: 16px;
  width: 5px;
  padding: 0 5px;
  background: red;
  color: white;
  font-size: 10px;
  font-weight: 700;
  border-radius: 999999px;
  line-height: 16px;
  text-align: center;
  white-space: nowrap;
}

#dragon-scroll:hover .unfurled,
#dragon-scroll.has-new .unfurled,
#dragon-scroll.auto-unfurl .unfurled {
  opacity: 1;
  clip-path: inset(0 0 0 0);
}


    #hall-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.35);
      z-index: 2147483646; display: none; }

    #hall-menu {
      display:none; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
      width:720px; height:460px;   background: url("${chrome.runtime.getURL('menu-ui/hall-background.png')}") no-repeat center center;
  background-size: cover; border-radius:16px; border-color: browm;
      box-shadow:0 18px 48px rgba(0,0,0,0.35); z-index:2147483647;
      font-family:'Rock Sans',sans-serif; overflow:hidden; color:#1a1a1a;
    }
#hall-header {
  height: 75px; /* set a fixed height that fits your image */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  padding: 0;
  margin-bottom: 0px; /* space between logo and tabs */
}

/* Draggable header */
#hall-header{
  cursor: grab;
  user-select: none;
}
#hall-header.dragging{
  cursor: grabbing;
}

#hall-header img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  display: block;
}

    #hall-close { position:absolute; right:10px; top:8px; background:none; border:none;
      font-size:18px; cursor:pointer;color: #ddac84ff; }
    #hall-body {
  display: flex;
  height: calc(100% - 56px);
  padding: 0 24px;         
  column-gap: 24px;        
  box-sizing: border-box;
}
    #hall-tabs {
    display: flex;
    flex-direction: column; 
    gap: 10px;             
    padding: 10px;          
    width: 160px;           
    box-sizing: border-box;
    flex-shrink: 0; 
    justify-content: center; 
  transform: translateY(5px); 
  transform: translateX(20px); 
  }
    .hall-tab { padding:10px; border:none; background: url("${chrome.runtime.getURL('menu-ui/hall-tab.png')}") no-repeat center center;
  background-size: contain; text-align:center;
      cursor:pointer; font-size:22px; border-radius:10px; font-weight:600; }
    .hall-tab.active { background:#e6d8a7; border:1px solid #8b5e3c; }
    #hall-content { flex:1; padding:32px 32px; overflow:hidden; }
    
    /* Make the content area a stacking context */
#hall-content {
  position: relative;
  flex: 1;
  padding: 32px;
  overflow: hidden;            /* outer stays still; inner slots can scroll */
}

/* All tabs stacked on top of each other, faded out & non-interactive */
.tab-content {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 250ms ease;  /* <- fade duration */
}

/* The visible tab fades in and is clickable/scrollable */
.tab-content.active {
  opacity: 1;
  pointer-events: auto;
}

/* Remove your old hidden rule (no display:none anymore) */
/* .tab-content.hidden { display: none; }  <-- delete */

/* Inbox manages its own inner scroll; keep outer pane from scrolling */
#tab-inbox { overflow: hidden; }
    .tab-content h3 { margin:0 0 12px; font-size:18px; font-weight:800; }

/* Mailbox = fixed frame */
#tab-inbox {
  position: relative;
  height: 100%;                  /* ← fixed to the pane height */
  padding: 0;                    /* we'll control padding inside */
  margin-right: 0;
  justify-content: center;       /* center the frame */
  align-items: left;

  background: url("${chrome.runtime.getURL('menu-ui/mailbox.png')}") no-repeat center center;
  background-size: contain;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

/* Optional: if your pane has extra padding, ensure #hall-body/#hall-content let
   #tab-inbox actually use the full height. You can keep your existing values,
   just make sure #hall-content has room. */

/* Inner fixed-ratio frame (keeps the mailbox proportion on resize) */
#tab-inbox .mailbox-frame {
  position: relative;
  width: min(700px, 95%);
  aspect-ratio: 4 / 3;           /* adjust to your mailbox art ratio */
  /* No background here since it's already on #tab-inbox */
}

/* Scrollable content "slot" inside the mailbox opening */
#tab-inbox .mailbox-slot {
  position: absolute;

  /* TUNE THESE to match the parchment opening on your art */
  inset: 28% 20% 12% 26%;        /* top right bottom left */

  overflow: auto;                 /* ← only this scrolls */
  padding: 8px 16px;
  box-sizing: border-box;
  color: #5b3a29;
  font-size: 12.5px;
  line-height: 1.35;
  text-align: left;
  /* Keep long lists contained vertically */
  max-height: 100%;               /* bounded by the frame */
}

/* Your existing list styles work; just ensure no backgrounds */
.inbox-list { list-style: none; margin: 0; padding: 0; }
.inbox-item { padding: 5px 25px; border-bottom: 1px solid #492507; background: transparent; cursor: pointer; }
.inbox-item.unread { font-weight: bold; animation: pulseGlow 1.5s infinite;
  border-radius: 4px; /* optional, to soften the edges */}
.inbox-detail { white-space: pre-wrap; background: transparent; font-size: 10px; padding: 5px 20px; }

/* Back button + detail header (you already added, included for completeness) */
#tab-inbox .inbox-content #inbox-back { all: unset; color:#5b3a29; font-size:12px; font-weight:600; cursor:pointer; }
#tab-inbox .inbox-content #inbox-back:hover { text-decoration: underline; }
#tab-inbox .inbox-content.view-detail h3 { color:#4a2c1c; font-size:14px; font-weight:700; margin:6px 5px 8px; }

/* ---- Themed Scrollbar ---- */
#tab-inbox .mailbox-slot::-webkit-scrollbar {
  width: 10px;
}

/* Scrollbar track (background) */
#tab-inbox .mailbox-slot::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0); /* parchment tone */
  border-radius: 8px;
}

/* Scrollbar thumb (the draggable part) */
#tab-inbox .mailbox-slot::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #8b5e3c 0%, #5b3a29 100%);
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0); /* subtle parchment border */
}

/* Hover effect for thumb */
#tab-inbox .mailbox-slot::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #a46b45 0%, #6a3f28 100%);
}

/* Optional: scrollbar corner if both axes appear */
#tab-inbox .mailbox-slot::-webkit-scrollbar-corner {
  background: rgba(255, 255, 255, 0);
}

/* Firefox support */
#tab-inbox .mailbox-slot {
  scrollbar-color: #8b5e3c rgba(255, 255, 255, 0); /* thumb, track */
  scrollbar-width: thin;
}


/* Inline CTA button inside inbox messages */
.hall-link-btn {
  all: unset;
  cursor: pointer;
  color: #6a3f28;               /* brown */
  font-weight: 700;
  padding: 2px 4px;
  border-radius: 4px;
  text-decoration: underline;
}
.hall-link-btn:hover {
  background: rgba(139, 94, 60, 0.15);
}


/* ========== Shared panel container for non-Inbox tabs ========== */
#tab-resources,
#tab-tutorials,
#tab-settings {
  position: absolute;
  height: 100%;
  overflow: hidden; /* outer pane doesn't scroll; inner slot does */
  background: url("${chrome.runtime.getURL('menu-ui/menu.png')}") no-repeat center center;
  background-size: contain;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

/* Fixed-ratio inner frame (keeps art proportional) */
#tab-resources .panel-frame,
#tab-tutorials .panel-frame,
#tab-settings .panel-frame {
  position: relative;
  width: min(700px, 95%);
  aspect-ratio: 4 / 3; /* adjust if your menu art has diff ratio */
  margin: 0 auto;      /* keep centered horizontally */
  inset: 0 5% 5% 5%; 
}

/* Scrollable content “slot” within the menu image */
#tab-resources .panel-slot,
#tab-tutorials .panel-slot,
#tab-settings .panel-slot {
  position: absolute;
  /* TUNE these to match the opening area of your menu art */
  inset: 20% 12% 14% 12%; /* top right bottom left */
  overflow: auto;
  padding: 10px 16px;
  box-sizing: border-box;
  color: #5b3a29;
  font-size: 14px;
  line-height: 1.5;
  max-height: 100%;
  margin-bottom: 6px;
}

/* Optional sticky header inside the slot */
#tab-resources .slot-header,
#tab-tutorials .slot-header,
#tab-settings .slot-header {
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 6px 0 8px;
  margin: 0 0 8px;
  font-weight: 800;
  font-size: 14px;
  color: #4a2c1c;
  border-bottom: 1px solid rgba(73,37,7,0.25);
}

/* Themed scrollbar (optional, matches Inbox) */
#tab-resources .panel-slot::-webkit-scrollbar,
#tab-tutorials .panel-slot::-webkit-scrollbar,
#tab-settings .panel-slot::-webkit-scrollbar { width: 10px; }
#tab-resources .panel-slot::-webkit-scrollbar-track,
#tab-tutorials .panel-slot::-webkit-scrollbar-track,
#tab-settings .panel-slot::-webkit-scrollbar-track { background: rgba(238,220,189,0.5); border-radius: 8px; }
#tab-resources .panel-slot::-webkit-scrollbar-thumb,
#tab-tutorials .panel-slot::-webkit-scrollbar-thumb,
#tab-settings .panel-slot::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #8b5e3c, #5b3a29);
  border-radius: 8px;
  border: 2px solid rgba(238,220,189,0.7);
}
#tab-resources .panel-slot,
#tab-tutorials .panel-slot,
#tab-settings .panel-slot { scrollbar-color: #8b5e3c rgba(238,220,189,0.5); scrollbar-width: thin; }

/* Parchment-style buttons inside Resources, Tutorials, and Settings slots */
#tab-resources .panel-slot button,
#tab-settings .panel-slot button {
  all: unset; /* strip default button look */
  display: block;
  width: auto;
  text-align: center;
  margin-bottom: 6px;
  font-size: 14px;
  color: #4a2c1c; /* matches header */
  cursor: pointer;
  border-radius: 1px;
  transition: background 0.2s ease, color 0.2s ease;
}

#tab-tutorials .panel-slot button {
  all: unset; /* strip default button look */
  display: block;
  width: auto;
  text-align: left;
  margin-bottom: 6px;
  font-size: 14px;
  color: #4a2c1c; /* matches header */
  cursor: pointer;
  border-radius: 1px;
  transition: background 0.2s ease, color 0.2s ease;
}


/* Hover: subtle parchment darkening */
#tab-resources .panel-slot button:hover,
#tab-tutorials .panel-slot button:hover,
#tab-settings .panel-slot button:hover {
  background: rgba(139, 94, 60, 0.15);
  color: #3a1e12;
  text-decoration: underline;
}

/* Optional active state: pressed feel */
#tab-resources .panel-slot button:active,
#tab-tutorials .panel-slot button:active,
#tab-settings .panel-slot button:active {
  background: rgba(139, 94, 60, 0.25);
  transform: translateY(1px);
}

#tab-badges {
  position: absolute;
  height: 100%;
  overflow: hidden;
  background: url("${chrome.runtime.getURL('menu-ui/badgemenu.png')}") no-repeat center center;
  background-size: contain;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
}

#tab-badges .panel-frame {
  position: relative;
  width: min(700px, 95%);
  aspect-ratio: 4 / 3;
  margin: 0 auto;
  inset: 10% 5% 5% 5%;
}

#tab-badges .panel-slot {
  position: absolute;
  inset: 14% 25% 14% 15%;  /* Adjust to match visible parchment space */
  overflow: auto;
  padding: 5px 5px;
  box-sizing: border-box;
  color: #3a1e12;
  font-size: 18px;
  font-weight: 900;
  max-height: 100%;
}

.badge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(65px, 1fr));
  column-gap: 1px; /* Reduce horizontal spacing */
  row-gap: 8px;    /* Optional: for vertical breathing room */
  justify-content: center;
  margin-top: 10px;
}
  .badge { 
    position: relative;
    text-align: center;
    background: none;
    border: none;
    padding: 0;
  }
  .badge.locked img {
  opacity: 1;
  }
  .badge img {
    width: 65px;
    height: 65px;
    object-fit: contain;
    transition: filter 0.3s, box-shadow 0.3s;
  }
  .badge img:hover {
    filter: brightness(1.2);
  }
  .badge.new img {
    box-shadow: 0 0 15px 4px gold;
    border-radius: 50%;
  }
    /* Share overlay */
  .badge .share-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .badge:hover .share-overlay {
    opacity: 0.9;
    pointer-events: auto;
  }
  .badge .share-overlay img {
    width: 32px;
    height: 32px;
    background: none;
    border-radius: 50%;
  }
  .resource-link {
    display: inline-block;
    padding: 5px 2px;
    color: #5b3a29;
    text-decoration: none;
    border-radius: 8px;
    margin-bottom: 2px;
    transition: text-decoration 0.2s;
  }

  .resource-link:hover {
    text-decoration: underline;
  }

/* =========================
   Make menu feel "app-like"
   ========================= */

/* Prevent text selection inside the menu (professional feel) */
#hall-menu, #hall-menu * {
  -webkit-user-select: none;
  user-select: none;
}

/* Prevent native dragging of images/links (no ghost drag) */
#hall-menu img,
#hall-menu a {
  -webkit-user-drag: none;
  user-drag: none;
  -webkit-user-select: none;
  user-select: none;
}

/* Optional: prevent the "blue highlight" on tap/click in some browsers */
#hall-menu {
  -webkit-tap-highlight-color: transparent;
}

/* BUT: allow selection inside areas where it makes sense (optional) */
#hall-menu .inbox-detail,
#hall-menu .mailbox-slot,
#hall-menu .panel-slot {
  -webkit-user-select: text;
  user-select: text;
}

/* If you want: still prevent dragging images even inside selectable areas */
#hall-menu .mailbox-slot img,
#hall-menu .panel-slot img {
  -webkit-user-drag: none;
  user-drag: none;
}


.tutorials-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  text-align: left;
}

.tutorial-selector.hall-link-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 12px 14px;
  border: 1.5px solid #8b6a3f;
  border-radius: 12px;
  background: linear-gradient(180deg, #f8edd3 0%, #edd8af 100%);
  color: #5a3c1e;
  font-family: "Rock Sans", "Trebuchet MS", "Verdana", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.3;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(70, 40, 10, 0.12);
  transition:
    transform 0.14s ease,
    box-shadow 0.14s ease,
    background 0.14s ease,
    border-color 0.14s ease;
  appearance: none;
  -webkit-appearance: none;
}

.tutorial-selector.hall-link-btn:hover {
  background: linear-gradient(180deg, #fbf2dc 0%, #f0ddb8 100%);
  border-color: #7a5526;
  box-shadow: 0 7px 16px rgba(70, 40, 10, 0.18);
  transform: translateY(-1px);
}

.tutorial-selector.hall-link-btn:active {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(70, 40, 10, 0.14);
  background: linear-gradient(180deg, #ead3a4 0%, #dfc18c 100%);
}

.tutorial-selector.hall-link-btn:focus-visible {
  outline: 2px solid rgba(199, 147, 67, 0.65);
  outline-offset: 2px;
}

`;

  rootDoc.head.appendChild(style);
  updatePandaCounter();
  // ------------------------
  // Core Elements
  // ------------------------
const panda = rootDoc.createElement('div');

panda.id = 'dragon-scroll';
panda.innerHTML = `
  <div class="rolled"></div>
  <div class="unfurled">
    <div id="panda-counter" class="td-notif">0</div>
  </div>
`;
rootDoc.body.appendChild(panda);

function openMenu() { chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "scroll_clicked", data: { scroll_clicked: "scroll_clicked",current_page: currentDomain} }); menu.style.display='block'; backdrop.style.display='block'; renderInbox(); renderBadges(); }

// Create and preload hover sound
const scrollHoverSound = new Audio(chrome.runtime.getURL('sounds/hall-scroll-hover.mp3'));
const scrollClickSound = new Audio(chrome.runtime.getURL('sounds/hall-scroll-hover.mp3'));
scrollClickSound.volume = 0.05; // optional, 0–1 range
scrollHoverSound.volume = 0.05; // optional, 0–1 range

let audioUnlocked = false;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function unlockAudioOnce() {
  if (audioUnlocked) return Promise.resolve();
  return new Promise(resolve => {
    const unlock = async () => {
      try {
        if (audioCtx.state === 'suspended') await audioCtx.resume();

        // play a 1-sample silent buffer to satisfy autoplay policy
        const buf = audioCtx.createBuffer(1, 1, audioCtx.sampleRate);
        const src = audioCtx.createBufferSource();
        src.buffer = buf;
        src.connect(audioCtx.destination);
        src.start(0);

        audioUnlocked = true;
      } finally {
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
        resolve();
      }
    };

    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true });
  });
}

// Play once per hover
const rolledScroll = panda.querySelector('.rolled');
let clickCooldown = false;
 rolledScroll.addEventListener('click', async () => {
    if (!isDragging) {
      
      openMenu(); // ⬅️ make sure THIS is not triggered elsewhere
    };
  if (clickCooldown) return;
  clickCooldown = true;

  await unlockAudioOnce();              // ensures audio allowed
  scrollClickSound.currentTime = 0;
  scrollClickSound.play().catch(() => {}); // ignore if user hasn't interacted yet

  setTimeout(() => (clickCooldown = false), 3000); // debounce rapid replays
   
});

let isDragging = false;
let startX, startY;
let hasMoved = false;

const scroll = document.getElementById('dragon-scroll');

function onpointerMoveScroll(e) {
    if (!isDragging) {
      openMenu(); // ⬅️ make sure THIS is not triggered elsewhere
    };
  hasMoved = true;
  scroll.style.cursor = 'grab';

  requestAnimationFrame(() => {
    const wrapperWidth = scroll.offsetWidth;
    const wrapperHeight = scroll.offsetHeight;

    let newLeft = e.clientX - startX;
    let newTop = e.clientY - startY;

    // Adjust constraints to allow slight overflow
    const topBuffer = 40;   // allow dragging 40px above viewport
    const leftBuffer = 40;  // allow dragging 40px past left edge

    newLeft = Math.max(-leftBuffer, Math.min(newLeft, window.innerWidth - wrapperWidth + leftBuffer));
    newTop = Math.max(-topBuffer, Math.min(newTop, window.innerHeight - wrapperHeight + topBuffer));


    // Convert to vw/vh for responsive positioning
    const leftPercent = (newLeft / window.innerWidth) * 100;
    const topPercent = (newTop / window.innerHeight) * 100;

    scroll.style.left = leftPercent + 'vw';
    scroll.style.top = topPercent + 'vh';
  });
}

function onpointerUpScroll(e) {
          if (!hasMoved) {
      openMenu(); // ⬅️ make sure THIS is not triggered elsewhere
    };
  isDragging = false;
  scroll.style.position = 'fixed';
  scroll.style.cursor = 'pointer';
  setTimeout(() => { hasMoved = false }, 0);

  scroll.releasePointerCapture(e.pointerId);

  scroll.removeEventListener('pointermove', onpointerMoveScroll);
  scroll.removeEventListener('pointerup', onpointerUpScroll);

}

scroll.addEventListener('pointerdown', function (e) {
  // Capture current visual position BEFORE overriding styles
  const rect = scroll.getBoundingClientRect();
  const scrollWidth = scroll.offsetWidth;
  const scrollHeight = scroll.offsetHeight;

  // Override any conflicting styles
  scroll.style.right = 'unset';
  scroll.style.bottom = 'unset';
  scroll.style.position = 'fixed';

  // Set left and top using real screen position (not style values!)
  scroll.style.left = `${rect.left}px`;
  scroll.style.top = `${rect.top}px`;

  // Now begin drag setup
  isDragging = true;
  hasMoved = false;

  chrome.storage.sync.get(['activeTutorial'], function(result) {

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "scroll_drag",
      data: {
        tutorial: result.activeTutorial
      }
    });})

  // Calculate offset between pointer and element origin
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;

  scroll.setPointerCapture(e.pointerId);

  scroll.addEventListener('pointermove', onpointerMoveScroll);
  scroll.addEventListener('pointerup', onpointerUpScroll);

  e.preventDefault(); // Prevent text selection while dragging
});

  const backdrop = rootDoc.createElement('div');
  backdrop.id = 'hall-backdrop';
  rootDoc.body.appendChild(backdrop);

  const menu = rootDoc.createElement('div');
  menu.id = 'hall-menu';
  menu.innerHTML = `
    <div id="hall-header">
  <img src="${chrome.runtime.getURL('menu-ui/centerpiece.png')}" />
</div>
      <button id="hall-close">✖</button>
    </div>
    <div id="hall-body">
      <div id="hall-tabs">
        <button class="hall-tab active" data-tab="inbox">Inbox</button>
        <button class="hall-tab" data-tab="tutorials">Tutorials</button>
        <button class="hall-tab" data-tab="badges">Badges</button>
        <button class="hall-tab" data-tab="resources">Resources</button>
        <button class="hall-tab" data-tab="settings">Settings</button>
      </div>
      <div id="hall-content">
        <div class="tab-content" id="tab-inbox"></div>
        <div class="tab-content hidden" id="tab-tutorials"><h3>Tutorials</h3></div>
        <div class="tab-content hidden" id="tab-badges">
  <div class="panel-frame">
    <div class="panel-slot">
      <div class="slot-header">Badges</div>
      <div class="badge-grid" id="hall-badge-grid"></div>
    </div>
  </div>
</div>
        <div class="tab-content hidden" id="tab-resources">
          <h3>Resources</h3>
          <a class="resource-link" href="https://example.sharepoint.com/sites/thrivelibrary/Shared%20Documents/..." target="_blank">- tHRive Library</a><br/>
          <a class="resource-link" href="https://example.sharepoint.com/sites/HROpsCentral/SitePages/Reporting.aspx" target="_blank">- Submit a Report Request</a><br/>
          </div>
        <div class="tab-content hidden" id="tab-settings">
          <h3>Settings</h3>
          <button>Hide Po</button><br/>
        </div>
      </div>
    </div>
  `;
  rootDoc.body.appendChild(menu);
  const hallMenu = rootDoc.getElementById("hall-menu");
const hallHeader = rootDoc.getElementById("hall-header");
makeHallDraggable(hallMenu, hallHeader);

  loadState();
  updatePandaCounter();
// Ensure exactly one pane starts active (e.g., Inbox)
menu.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));
menu.querySelector('#tab-inbox')?.classList.add('active');
renderInbox();  // initial render for the active pane

// Global-ish event bridge
document.addEventListener('hall:inboxMessage', (e) => {
  const payload = e.detail || {};
  if (payload && payload.id && payload.title && payload.body) {
    addInboxMessage(payload);
  }
});

/**
 * Persist a new inbox message (id must be unique).
 * If a message with the same id exists, we skip (idempotent).
 */
function addInboxMessage({ id, title, body, date = formatMDY(), read = false }) {
  if (hallInboxMessages.some(m => m.id === id)) return false;  // already added

  hallInboxMessages.unshift({ id, title, body, date, read });  // newest first
  saveState();

  // live-update the UI if Inbox is visible
  const inboxPane = menu.querySelector('#tab-inbox');
  const isActive = inboxPane?.classList.contains('active');
  if (isActive) renderInbox();

  updateTabNotifications();
  updatePandaCounter();

  // give a brief unfurl nudge for new content
  if (typeof peekUnfurl === 'function') peekUnfurl('has-new', 1600);

  return true;
}


  // ------------------------
  // Rendering Functions
  // ------------------------
function updateTabNotifications() {
  menu.querySelectorAll('.hall-tab .tab-bubble').forEach(el => el.remove());

  // Inbox count
  const unreadCount = hallInboxMessages.filter(m => !m.read).length;
  if (unreadCount > 0) addTabCounter("inbox", unreadCount);

  // Badges count
  const newBadges = hallBadges.filter(b => b.new).length;
  if (newBadges > 0) addTabCounter("badges", newBadges);

  // Tutorials count (you’ll wire later)
  const newTutorials = 0;
  if (newTutorials > 0) addTabCounter("tutorials", newTutorials);
}

function addTabCounter(tabName, count) {
  const btn = menu.querySelector(`.hall-tab[data-tab="${tabName}"]`);
  if (!btn) return;
  const bubble = document.createElement('span');
  bubble.className = 'tab-bubble';
  bubble.textContent = count;
  bubble.style.cssText = `
    background:red; color:white; font-size:11px; font-weight:bold;
    margin-left:6px; padding:1px 6px; border-radius:999px;
  `;
  btn.appendChild(bubble);
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") {
    if (changes.hallBadges) {
      hallBadges.splice(0, hallBadges.length, ...changes.hallBadges.newValue);
      renderBadges();
      updateTabNotifications();
      updatePandaCounter();
    }
if (changes.hallInboxMessages) {
  hallInboxMessages.splice(0, hallInboxMessages.length, ...changes.hallInboxMessages.newValue);
  const container = menu.querySelector('#tab-inbox');
  const inDetailView = container.querySelector('#inbox-back');
  if (!inDetailView) {
    renderInbox();
  }
      updateTabNotifications();
      updatePandaCounter();
    }
  }
});

function saveState() {
  chrome.storage.sync.set({
    hallInboxMessages,
    hallBadges
  });
}

function loadState(callback) {
  chrome.storage.sync.get(['hallInboxMessages', 'hallBadges'], (res) => {
    if (res.hallInboxMessages) {
      hallInboxMessages.splice(0, hallInboxMessages.length, ...res.hallInboxMessages);
    }

    const normalizedBadges = normalizeHallBadges(res.hallBadges || []);

    hallBadges.splice(0, hallBadges.length, ...normalizedBadges);

    // Save back only if storage was missing any badges
    chrome.storage.sync.set({
      hallBadges: normalizedBadges
    });

    updateTabNotifications();
    updatePandaCounter();

    callback?.();
  });
}

function renderInbox() {
  const container = menu.querySelector('#tab-inbox');
  container.innerHTML = `
    <div class="mailbox-frame">
      <div class="mailbox-slot">
        <h3>Inbox</h3>
        <ul class="inbox-list"></ul>
      </div>
    </div>
  `;

  const list = container.querySelector('.inbox-list');
  hallInboxMessages.forEach(msg => {
    const li = document.createElement('li');
    li.className = 'inbox-item' + (msg.read ? '' : ' unread');
    const dateStr = new Date(msg.date).toLocaleDateString(undefined, { year: '2-digit', month: 'numeric', day: 'numeric' });
    li.innerHTML = `
      <span >${msg.title}</span>
      <span style="float:right; font-size:8px; color:#5b3a29;">${dateStr}</span>
    `;
    li.addEventListener('click', () => { msg.read = true; openInboxMessage(msg.id); });
    list.appendChild(li);
  });

  updateTabNotifications();
  updatePandaCounter();
}

function renderResources() {
  const pane = menu.querySelector('#tab-resources');
  pane.innerHTML = `
    <div class="panel-frame">
      <div class="panel-slot">
        <div class="slot-header">Resources</div>

        <div class="resources-list">

          <div class="resource-row">
            <a class="resource-link"
              href="https://example.sharepoint.com/sites/thrivelibrary/SitePages/HR Operations %26 Systems - Reporting Training.aspx?web=1"
              target="_blank" rel="noopener noreferrer">
              - tHRive Library
            </a>
          </div>

          <div class="resource-row">
            <a class="resource-link"
              href="https://example.sharepoint.com/sites/HROpsCentral/SitePages/Reporting.aspx"
              target="_blank" rel="noopener noreferrer">
              - Submit a Report Request
            </a>
          </div>

          <div class="resource-row">
            <a class="resource-link"
              href="https://forms.office.com/Pages/ResponsePage.aspx?id=-SY1T9aXLUGTOk4wpzEQ9LrkhnRyP7dDouWFm-ZBx7VUM0tMN0JVNVJGWUFXOUFVRUlFNlBUOE44Ty4u"
              target="_blank" rel="noopener noreferrer">
              - Submit Feedback
            </a>
          </div>

          <div class="resource-row">
            <a class="resource-link"
              href="mailto:peopleanalyticsreporting@example.com?subject=Training%20Hall"
              target="_blank" rel="noopener noreferrer">
              - Questions or Suggestions? 
            </a>
          </div>

        </div>
      </div>
    </div>
  `;
}

function renderTutorials() {
  const pane = menu.querySelector('#tab-tutorials');
  pane.innerHTML = `
    <div class="panel-frame">
      <div class="panel-slot">
        <div class="slot-header">Choose a Tutorial</div>
        <div class="tutorials-list">
          <button class="tutorial-selector hall-link-btn" data-tutorial="basic">1. BW Basic Tutorial</button>
          <button class="tutorial-selector hall-link-btn" data-tutorial="bi-inbox">2. BI Inbox</button>
          <button class="tutorial-selector hall-link-btn" data-tutorial="bw-schedule">3. Scheduling Reports</button>
          <button class="tutorial-selector hall-link-btn" data-tutorial="bw-design">4. Design Mode</button>
        </div>
      </div>
    </div>
  `;

  const tutorialButtons = pane.querySelectorAll('.tutorial-selector');
  tutorialButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedTutorial = button.getAttribute('data-tutorial');

      chrome.storage.sync.set(
        { popupsEnabled: true, activeTutorial: selectedTutorial },
        () => {
          console.log(`Tutorial set to "${selectedTutorial}"`);
          chrome.runtime.sendMessage({
            type: "LOG_EVENT",
            event: "tutorial_start",
            data: {
              tutorial_start: "tutorial_started",
              source: "Hall Menu",
              tutorial: selectedTutorial
            }
          });

          closeAllPopups();
          displayPopups();
          closeMenu();
        }
      );
    });
  });
}

function renderSettings() {
  const pane = menu.querySelector('#tab-settings');
  pane.innerHTML = `
    <div class="panel-frame">
      <div class="panel-slot">
        <div class="slot-header">Settings</div>

        <div class="settings-list">
          <div class="settings-row">
            <span>Hide Po</span>
            <label class="hall-switch">
              <input type="checkbox" id="toggle-hide-po" />
              <span class="hall-slider"></span>
            </label>
          </div>

          <div class="settings-row" style="display:block; margin-top: 14px;">
            <div style="font-weight:700; margin-bottom:6px; color:#4a2c1c;">Session Access Code</div>

            <div class="secret-code-row" style="display:flex; gap:8px; align-items:center; justify-content:flex-start;">
              <input
                id="hallSecretCodeInput"
                type="text"
                placeholder="Enter code"
                style="
                  width: 170px;
                  max-width: 60%;
                  padding:10px 12px;
                  border:1.5px solid #8b6a3f;
                  border-radius:10px;
                  background:#fff9ec;
                  color:#4b341d;
                  font-family:'Rock Sans','Trebuchet MS','Verdana',sans-serif;
                  font-size:13px;
                  outline:none;
                  box-sizing:border-box;
                "
              />
              <button
                id="hallSecretCodeSubmit"
                style="
                  padding:10px 10px;
                  border:1.5px solid #7b572b;
                  border-radius:10px;
                  background:linear-gradient(180deg, #c79343 0%, #a9742b 100%);
                  color:#fff6e8;
                  cursor:pointer;
                  font-size:13px;
                  font-weight:700;
                  font-family:'Rock Sans','Trebuchet MS','Verdana',sans-serif;
                  width:auto;
                  flex:0 0 auto;
                  white-space:nowrap;
                  box-sizing:border-box;
                "
              >
                Unlock
              </button>
            </div>

            <div
              id="hallSecretCodeMessage"
              style="
                margin-top:10px;
                font-size:10px;
                color:#6d4e2b;
                min-height:16px;
                display:block;
                line-height:1.4;
              "
            ></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize toggle from storage (default: show Po = true)
  chrome.storage.sync.get(['showPo'], (res) => {
    const showPo = res.showPo !== false; // treat undefined as true
    const cb = pane.querySelector('#toggle-hide-po');
    if (cb) cb.checked = !showPo;       // checked means "Hide Po"

    // Apply initial visibility right away
    applyPoVisibility(showPo);
  });

  // Toggle behavior
  pane.querySelector('#toggle-hide-po')?.addEventListener('change', (e) => {
    const hidePo = e.target.checked;
    const showPo = !hidePo;

    applyPoVisibility(showPo);
    
    chrome.storage.sync.set({ showPo }, () => {
      applyPoVisibility(showPo);
    });
  });


  // Secret code wiring
  const input = pane.querySelector('#hallSecretCodeInput');
  const submit = pane.querySelector('#hallSecretCodeSubmit');
  const message = pane.querySelector('#hallSecretCodeMessage');

  function submitCode() {
    const entered = (input.value || "").trim().toUpperCase();

    if (!entered) {
      message.textContent = "Please enter a code.";
      message.style.color = "#8b5f25";
      return;
    }

    if (entered === "PARADMIN") {
      hallScheduleOverrideUnlockedForSession = true;

      if (chrome.storage?.session) {
        chrome.storage.session.set({
          hallScheduleOverrideUnlockedForSession: true
        });
      }

      message.textContent = "Public Folder scheduling unlocked for this browser session.";
      message.style.color = "#2f6b3b";
      input.value = "";

      chrome.runtime.sendMessage({
        type: "LOG_EVENT",
        event: "hall_secret_code_accepted",
        data: {
          source: "Hall Menu",
          code_type: "schedule_session_unlock"
        }
      });

      return;
    }

    if (entered === "PILOT2025") {
      input.value = "";
      message.textContent = "Hall founder badge granted.";
      message.style.color = "#2f6b3b";

      chrome.runtime.sendMessage({
        type: "LOG_EVENT",
        event: "hall_secret_code_accepted",
        data: {
          source: "Hall Menu",
          code_type: "dojo_founder_badge_unlock"
        }
      });

      unlockHallBadgeById(5, {
        source: "secret_code",
        bypassDateLock: true
      });

      return;
    }

    message.textContent = "That code wasn’t recognized.";
    message.style.color = "#9b3d2f";

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "hall_secret_code_rejected",
      data: {
        source: "Hall Menu"
      }
    });
  }

  submit.addEventListener('click', submitCode);

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitCode();
  });

  if (hallScheduleOverrideUnlockedForSession) {
    message.textContent = "Public Folder scheduling is unlocked for this browser session.";
    message.style.color = "#2f6b3b";
  }
}

function applyPoVisibility(showPo) {
  const ensurePo = () => {
    let mw = document.getElementById('poHelper');
    if (!mw && showPo) {
      // Recreate Po if needed
      addGifToggle(); // your existing builder
      mw = document.getElementById('poHelper');
    }
    return mw;
  };

  const showPoNow = () => {
    const mw = ensurePo();
    if (!mw) return;
    mw.style.display = '';       // restore
    requestAnimationFrame(() => {
      mw.style.transition = 'opacity 200ms ease';
      mw.style.opacity = '1';    // visible
    });
  };

  const hidePoWithSmoke = () => {
    const mw = document.getElementById('poHelper');
    if (!mw) return;             // nothing to hide
    // If it’s already hidden, bail early
    if (mw.style.display === 'none') return;

    playSmokeAndHidePo(() => {
      // Optional: also fully remove from DOM if you prefer recreating later
      // mw.remove();
    });
  };

  if (showPo) {
    showPoNow();
  } else {
    hidePoWithSmoke();  // <- 🔥 smoke + hide
  }
}

function openInboxMessage(id) {
  const msg = hallInboxMessages.find(m => m.id === id);
  if (!msg) return;
  msg.read = true;

  const container = menu.querySelector('#tab-inbox');
  container.innerHTML = `
    <div class="mailbox-frame">
      <div class="mailbox-slot inbox-content view-detail">
        <button id="inbox-back">← Back</button>
        <h3>${msg.title}</h3>
        <div class="inbox-detail">${msg.body}</div>
      </div>
    </div>
  `;
  container.querySelector('#inbox-back').addEventListener('click', renderInbox);
  saveState();
}

function getTotalNotifications() {
  const inboxCount  = (hallInboxMessages || []).filter(m => !m.read).length;
  const badgeCount  = (hallBadges || []).filter(b => b.new).length;
  const tutorialCount = 0;
  return inboxCount + badgeCount + tutorialCount;
}

function peekUnfurl(flagClass, duration = 2000) {
  const panda = document.getElementById('dragon-scroll');
  // clear any previous timers
  clearTimeout(panda._unfurlTimer);
  panda.classList.add(flagClass);
  panda._unfurlTimer = setTimeout(() => {
    panda.classList.remove(flagClass);
  }, duration);
}

function afterStateLoaded() {
  updateTabNotifications();
  updatePandaCounter();

  const panda = document.getElementById('dragon-scroll');
  // clear any leftover flags from a prior page/session
  panda.classList.remove('has-new', 'auto-unfurl');

  // Only unfurl on first load if there is at least one notification
  if (getTotalNotifications() > 0) {
    peekUnfurl('auto-unfurl', 800);
  }
}

// call after loadState
loadState(() => afterStateLoaded());

function updatePandaCounter() {
  const total   = getTotalNotifications();
  const counter = document.getElementById('panda-counter');
  const panda   = document.getElementById('dragon-scroll');
  if (!counter) return;

  const oldVal = parseInt(counter.textContent) || 0;

  if (total > 0) {
    counter.textContent = total;
    counter.style.display = 'flex';

    // only on INCREASE do a transient unfurl
    if (total > oldVal) {
      counter.classList.add('pulse');
      setTimeout(() => counter.classList.remove('pulse'), 700);
      //peekUnfurl('has-new', 1800);  // transient — auto removed
    }
  } else {
    counter.style.display = 'none';
    // ensure flags removed when there are zero notifs
    panda.classList.remove('has-new', 'auto-unfurl');
  }
}

function renderBadges() {
  const container = menu.querySelector('#tab-badges');
  container.innerHTML = `
    <div class="panel-frame">
      <div class="panel-slot">
        <div class="slot-header">Badges</div>
        <div class="badge-grid" id="hall-badge-grid"></div>
      </div>
    </div>
  `;

  const grid = container.querySelector('.badge-grid');

hallBadges.forEach(b => {
      // 🟡 Skip showing locked version of the Hall Founder badge
    if (b.id === 'dojo-founder' && !b.unlocked) {
      return; // skip rendering entirely
    }
  const card = document.createElement('div');
  card.className = 'badge' 
    + (b.unlocked ? '' : ' locked') 
    + (b.new ? ' new' : '');

  const img = document.createElement('img');
  img.src = b.unlocked
    ? b.icon
    : chrome.runtime.getURL('badges/locked-badge.png');
  img.alt = b.name;

  if (b.new) {
    img.addEventListener('mouseenter', () => {
      b.new = false;
      saveState();
      renderBadges();
      updateTabNotifications();
      updatePandaCounter();
    });
  }

  card.appendChild(img);

  if (b.unlocked) {
    const overlay = document.createElement('div');
    overlay.className = 'share-overlay';

    const iconImg = document.createElement('img');
    iconImg.src = chrome.runtime.getURL('icons/teamsIcon.png');
    iconImg.alt = 'Share on Teams';
    iconImg.addEventListener('contextmenu', e => e.preventDefault());

    overlay.appendChild(iconImg);
    card.appendChild(overlay);

    overlay.addEventListener('click', async (e) => {
        closeAllSharePills(); // ✅ closes any existing pills
  chrome.runtime.sendMessage({
    type: "LOG_EVENT",
    event: "teams_shared",
    data: { teams_shared: "teams_shared", source: "Hall Menu", badge_id: b.id }
  });

  e.stopPropagation();

  try {
    await copyBadgeShareToClipboard(b.name, b.id);
    showCopiedPillNear(
      overlay,
      "Copied Badge to Clipboard! ✅ \n\n Feel free to paste it in <b>Teams</b> to show it off 🙂"
    );
  } catch (err) {
    console.error("Clipboard copy failed:", err);
    showCopiedPillNear(overlay, "Copy failed");
  }
});
  }

  grid.appendChild(card);
});
}


  // ------------------------
  // Event Logic
  // ------------------------
  function closeMenu() { menu.style.display='none'; backdrop.style.display='none'; }

  menu.querySelector('#hall-close').addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  // Tab switching
function switchTab(tab) {
  // tabs
  menu.querySelectorAll('.hall-tab').forEach(b => b.classList.remove('active'));
  menu.querySelector(`.hall-tab[data-tab="${tab}"]`).classList.add('active');

  // panes
  const panes = menu.querySelectorAll('.tab-content');
  panes.forEach(p => p.classList.remove('active'));
  const pane = menu.querySelector(`#tab-${tab}`);
  if (!pane) return;
  pane.classList.add('active');

  // render on demand
  if (tab === 'inbox') renderInbox();
  if (tab === 'badges') { saveState(); renderBadges(); }
  if (tab === 'resources') renderResources();
  if (tab === 'tutorials') renderTutorials();
  if (tab === 'settings') renderSettings();
}
menu.querySelectorAll('.hall-tab').forEach(btn =>
  btn.addEventListener('click', () => switchTab(btn.dataset.tab))
);


  menu.querySelectorAll('.hall-tab').forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

// Handle digest CTA: enable popups + close the Hall menu
menu.addEventListener('click', (e) => {
  const cta = e.target.closest('#digest-cta');
  if (!cta) return;
  
  chrome.storage.sync.set({ popupsEnabled: true, activeTutorial: 'basic'}, () => {
    // immediately start your popups logic:
    closeAllPopups()
    displayPopups();
    closeMenu();
  });
});

})();

function unlockHallBadgeById(badgeId, options = {}) {
  const {
    bypassDateLock = false,
    showCelebration = true,
    afterClose = null
  } = options;

  const tutorialToBadge = {
    1: "reporting-rookie",
    2: "inbox-sage",
    3: "schedule-master",
    4: "design-scholar",
    5: "dojo-founder"
  };

  const IdtoBadgeName = {
    1: "Reporting Rookie",
    2: "Inbox Sage",
    3: "Schedule Master",
    4: "Design Scholar",
    5: "Hall Founder"
  };

  const badgeKey = tutorialToBadge[badgeId];
  if (!badgeKey) return;

  chrome.storage.sync.get(['hallBadges'], (res) => {
    let badges = res.hallBadges || [];

    let badge = badges.find(b => b.id === badgeKey);
    if (!badge) {
      console.warn("Badge missing from hallBadges, adding it:", badgeKey);
      badge = {
        id: badgeKey,
        name: IdtoBadgeName[badgeId],
        description: "",
        icon: chrome.runtime.getURL(`badges/${badgeKey}.png`),
        unlocked: false,
        new: false
      };
      badges.push(badge);
    }

    // Keep your existing date guard unless explicitly bypassed
    if (!bypassDateLock && badgeId === 5 && (new Date()) > (new Date('03/01/2026'))) {
      return;
    }

    // If already unlocked, don’t celebrate again
    if (badge.unlocked) {
      console.log("Badge already unlocked:", badgeKey);
      return;
    }

    badge.unlocked = true;
    badge.new = true;

    chrome.storage.sync.set({ hallBadges: badges }, () => {
      console.log("BADGE UNLOCKED:", badgeKey);

      chrome.runtime.sendMessage({
        type: "LOG_EVENT",
        event: "badge_unlocked",
        data: {
          badge_id: badgeKey,
          badge_name: IdtoBadgeName[badgeId],
          source: options.source || "unknown"
        }
      });

      if (!showCelebration) {
        afterClose?.();
        return;
      }

      const badgeUrl = chrome.runtime.getURL(`badges/${badgeKey}.png`);

      if (typeof badgeSound !== "undefined" && badgeSound) {
        try {
          badgeSound.play();
        } catch (e) {
          console.warn("Badge sound failed:", e);
        }
      }

      const overlay = document.createElement('div');
      overlay.id = 'hall-achievement-overlay';
      overlay.innerHTML = `
        <div class="hall-achievement-content">
          <div class="hall-ray-wrapper">
            <div class="hall-ray-rotator">
              ${Array.from({ length: 12 }).map((_, i) =>
                `<div class="hall-light-ray" style="--i:${i};"></div>`
              ).join('')}
            </div>
          </div>
          <img src="${badgeUrl}" class="hall-badge-img" alt="${IdtoBadgeName[badgeId]}">
          <div class="hall-badge-text">🏅 Badge Unlocked! 🏅</div>
          <button class="hall-ok-btn">OK</button>
        </div>
      `;
      document.body.appendChild(overlay);

      const styleId = "hall-achievement-styles";
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          #hall-achievement-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999999999999;
            animation: fadeIn 0.4s ease forwards;
          }

          .hall-achievement-content {
            position: relative;
            text-align: center;
            animation: popIn 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
          }

          .hall-badge-img {
            position: relative;
            z-index: 2;
            width: 130px;
            height: 130px;
            object-fit: contain;
            filter: drop-shadow(0 0 30px gold);
            animation: growBadge 0.8s ease-out forwards;
          }

          .hall-badge-text {
            margin-top: 18px;
            color: #fff;
            font-size: 26px;
            font-weight: 800;
            text-shadow: 0 0 15px gold, 0 0 30px orange;
            animation: textBounce 0.8s ease-out forwards 0.3s;
          }

          .hall-ok-btn {
            margin-top: 24px;
            padding: 12px 36px;
            font-size: 18px;
            font-weight: bold;
            font-family: Rock Sans;
            background: linear-gradient(90deg, gold, orange);
            color: #222;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 0 25px gold;
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 9999999999999;
          }

          .hall-ok-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 0 35px orange;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes popIn {
            from { transform: scale(0.6); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          @keyframes growBadge {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(10deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); }
          }

          @keyframes textBounce {
            0% { transform: translateY(30px); opacity: 0; }
            60% { transform: translateY(-5px); opacity: 1; }
            100% { transform: translateY(0); }
          }

          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      overlay.querySelector('.hall-ok-btn').addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
          overlay.remove();
          afterClose?.();
        }, 300);
      });
    });
  });
}

function displayPopupAtPosition(position, message, currentIndex, totalSteps, onNext, onBack, glowTarget, badgeId, tutorial) {
  closeAllPopups();
  clearAllGlowEffects();
  removeActiveIndicator(); 
  const popup = createPopup(message, currentIndex, totalSteps, onNext, onBack);

  if (position.top.endsWith('%')) {
    const topPercentage = parseFloat(position.top) / 100;
    const topPixels = window.innerHeight * topPercentage;
    popup.style.top = `${topPixels}px`;
  } else {
    popup.style.top = position.top;
  }
  if (position.left.endsWith('%')) {
    const leftPercentage = parseFloat(position.left) / 100;
    const leftPixels = window.innerWidth * leftPercentage;
    popup.style.left = `${leftPixels}px`;
  } else {
    popup.style.left = position.left;
  }

  if (glowTarget) {
  let glowEl = null;
  let advanceOnClick = false; 

  // 1️⃣ Function-based glowTarget (unchanged)
  if (typeof glowTarget === "function") {
    try {
      glowEl = glowTarget();
    } catch (e) {
      console.error("Error executing glowTarget function:", e);
    }

  // 2️⃣ Object-based glowTarget (NEW)
  } else if (typeof glowTarget === "object") {
  advanceOnClick = glowTarget.advanceOnClick
  if (glowTarget.type === "text") {
    glowEl =
      glowTarget.scope === "iframe"
        ? findElementByTextInIframes(glowTarget.value)
        : [...document.querySelectorAll('*')]
            .find(el => el.textContent?.trim() === glowTarget.value);

  } else if (glowTarget.type === "id") {
    glowEl =
      glowTarget.scope === "iframe"
        ? findElementByIdInIframes(glowTarget.value)
        : document.getElementById(glowTarget.value);
  }
    else if (glowTarget.type === 'button') {
  glowEl =
    glowTarget.scope === 'iframe'
      ? findButtonByValue(glowTarget.value)
      : [...document.querySelectorAll('input[type="button"], input[type="submit"]')]
          .find(b => b.value?.trim() === glowTarget.value);
}
else if (glowTarget.type === "roleButton") {
  glowEl = glowTarget.scope === "iframe"
    ? findRoleButtonByLabelDeep(glowTarget.value)
    : document.querySelector(`[role="button"][aria-label="${glowTarget.value}"]`)
      || document.querySelector(`[role="button"][title="${glowTarget.value}"]`);
}

else if (glowTarget.type === 'tab' && glowTarget.value === 'Documents') {
  glowEl = findTabByTextInIframes(glowTarget.value)

}

} else {
  glowEl =
    document.getElementById(glowTarget) ||
    document.querySelector(glowTarget);
}

  if (glowEl) {
    glowEl.classList.add('glow-effect');

    if (typeof glowTarget === "object" && glowTarget.indicator === "arrow") {
      const arrow = createArrowIndicator(glowEl, {
        arrowSide: glowTarget.arrowSide,
        arrowEmoji: glowTarget.arrowEmoji,
        arrowOffsetPx: glowTarget.arrowOffsetPx
      });
      setActiveIndicatorEl(arrow);
    }

    // your existing special-case logic stays untouched
    if (glowEl.textContent?.trim() === "Public Folders") {
      simulateLegacyClick(document.getElementById("yui-gen0-2-label"));

      setTimeout(() => {
        simulateLegacyClick(glowEl);
      }, 350);
      if (document.getElementById("accordionNavigationView_drawer1_treeView_treeNode3_name")){
if (document.getElementById("ygtvt3").classList.contains('ygtvlp')) {
      setTimeout(() => {
              simulateLegacyClick(document.getElementById("ygtvt3"));
            }, 1250);
          }
      setTimeout(() => {
        const visibleFolders = getVisibleBwFolders();
        console.log(visibleFolders);
        console.log('Folder count:', visibleFolders.length);
        const reportingOnlyUser = visibleFolders.length < 5;
      chrome.storage.sync.set({ reportingOnlyUser }, () => {
          console.log(`reportingOnlyUser=${reportingOnlyUser} (visibleFolders.length=${visibleFolders.length})`);
        });

        const hasCustomReports = visibleFolders.some(name =>
          name.toLowerCase().includes('custom reports')
        );

        chrome.storage.sync.set({ hasCustomReports: hasCustomReports }, () => {
          console.log('Set hasCustomReports to',hasCustomReports);
        });
      }, 1450);
        
      }}

    // --- Conditionally attach click listener ---
    if (advanceOnClick) {
      const onGlowClick = () => {
        clearAllGlowEffects();
        removeActiveIndicator(); 
        popup.remove();
        onNext();
      };

      glowEl.addEventListener('click', () => {
  console.log("Glow clicked");

  chrome.storage.sync.get(['activeTutorial'], function(result) {
    console.log("Storage callback ran", result);

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "tutorial_glow_click",
      data: {
        tutorial: result.activeTutorial
      }
    });

    console.log("LOG_EVENT message sent");

    onGlowClick();
  });
}, { once: true });
      
    }
        
  } else {
    console.warn(`Glow target not found:`, glowTarget);
  }
}

function getVisibleBwFolders() {
  const items = document.querySelectorAll('#ygtvc0 .ygtvitem');
  
  return Array.from(items)
    .map(item => item.textContent?.trim())
    .filter(Boolean);
}

function findTabByTextInIframes(label) {
  const iframes = document.querySelectorAll('iframe');

  for (const iframe of iframes) {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) continue;

      const el = [...doc.querySelectorAll('a.TabTitle[role="tab"][title="Documents"]')]
        .find(a => a.textContent.trim() === label);

      if (el) return el;
    } catch {
      // cross-origin iframe, ignore
    }
  }

  return null;
}

function findButtonByValue(value) {
  // 1️⃣ Check current document first
  const localBtn = [...document.querySelectorAll('input[type="button"], input[type="submit"]')]
    .find(btn => btn.value?.trim() === value);

  if (localBtn) return localBtn;

  // 2️⃣ Check same-origin iframes
  const iframes = document.querySelectorAll('iframe');

  for (const iframe of iframes) {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) continue;

      const btn = [...doc.querySelectorAll('input[type="button"], input[type="submit"]')]
        .find(b => b.value?.trim() === value);

      if (btn) return btn;
    } catch {
      // cross-origin iframe, ignore
    }
  }

  return null;
}

function findElementByTextInIframes(text) {
  const iframes = document.querySelectorAll('iframe');

  for (const iframe of iframes) {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      const el = [...doc.querySelectorAll('*')]
        .find(node =>
          node.textContent &&
          node.textContent.trim() === text
        );

      if (el) return el;
    } catch {
      // cross-origin iframe, ignore
    }
  }

  return null;
}

function getAllSameOriginDocs(rootDoc = document) {
  const docs = [rootDoc];
  const iframes = rootDoc.querySelectorAll("iframe");

  for (const iframe of iframes) {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc) continue;
      docs.push(...getAllSameOriginDocs(doc)); // recurse nested iframes
    } catch {
      // cross-origin iframe; can't access
    }
  }
  return docs;
}

function findElementByIdDeep(id) {
  for (const doc of getAllSameOriginDocs(document)) {
    const el = doc.getElementById(id);
    if (el) return el;
  }
  return null;
}

function findRoleButtonByLabelDeep(label) {
  const norm = (s) => (s || "").trim().toLowerCase();

  for (const doc of getAllSameOriginDocs(document)) {
    // Matches: <table role="button" aria-label="Design" title="Design">...
    const el =
      doc.querySelector(`[role="button"][aria-label="${label}"]`) ||
      doc.querySelector(`[role="button"][title="${label}"]`) ||
      [...doc.querySelectorAll('[role="button"]')].find(n =>
        norm(n.getAttribute("aria-label")) === norm(label) ||
        norm(n.getAttribute("title")) === norm(label) ||
        norm(n.textContent) === norm(label)
      );

    if (el) return el;
  }

  return null;
}

function findElementByIdInIframes(id) {
  const iframes = document.querySelectorAll('iframe');

  for (const iframe of iframes) {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const el = doc.getElementById(id);
      if (el) return el;
    } catch {
      // cross-origin iframe, ignore
    }
  }

  return null;
}
    
function clearAllGlowEffects() {
  // 1️⃣ Clear in the current document
  document.querySelectorAll('.glow-effect').forEach(el => {
    el.classList.remove('glow-effect');
  });

  // 2️⃣ Clear in all same-origin iframes
  document.querySelectorAll('iframe').forEach(iframe => {
    try {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc) return;

      doc.querySelectorAll('.glow-effect').forEach(el => {
        el.classList.remove('glow-effect');
      });
    } catch {
      // Cross-origin iframe — ignore safely
    }
  });
}

if (badgeId) {
  unlockHallBadgeById(badgeId, {
    source: tutorial || "tutorial_popup",
    afterClose: () => {
      setTimeout(() => {
        thShowFeedbackCardAfterBadge({ badgeId });
      }, 900);
    }
  });
}

  document.body.appendChild(popup);
}

function startTrainingHallTour() {
  const steps = [
    {
      targetSelector: "#poElement",
      title: "Hi! I’m Po.",
      body: `
Welcome to <strong>Training Hall</strong>.<br><br>

I’m here to guide you through BW reporting tutorials. When you're working through a tutorial, click me anytime to jump back in where you left off.<br><br>

You can also <strong>drag me</strong> to move me around your screen, or temporarily hide me from the <strong>Settings</strong> menu.<br><br>

To choose a different tutorial, open the <strong>Dragon Scroll</strong>.
`,
    bubblePosition: {
    left: "65%",
    top: "70%"
  }},
    {
      targetSelector: "#dragon-scroll",
      title: "The Dragon Scroll",
body: `
See this scroll?<br><br>

That’s the <strong>Dragon Scroll</strong>. Click it to open the Training Hall Menu.<br><br>

From here you can browse tutorials, check your messages, and view the badges you've earned along the way.
`,
    bubblePosition: {
    left: "75%",
    top: "30%"
  }},
    {
      targetSelector: ".hall-tab[data-tab='inbox']",
      title: "The Training Hall Inbox",
body: `
This is your <strong>Training Hall Inbox</strong>.<br><br>

From time to time, Master Shifu may leave helpful tips, announcements, or guidance here to help you sharpen your reporting skills.
`
    ,
    bubblePosition: {
    left: "80%",
    top: "50%"
  }},
    {
      targetSelector: ".hall-tab[data-tab='tutorials']",
      title: "Choose Your Tutorial",
body: `
This is where you can select a <strong>tutorial</strong>.<br><br>

Each tutorial walks you step-by-step through common BW tasks so you can learn while working directly in the system.<br><br>

Pick one to begin your training.
`
    ,
    bubblePosition: {
    left: "80%",
    top: "50%"
  }},
    {
      targetSelector: ".hall-tab[data-tab='badges']",
title: "Earn Your Badges",
body: `
As you complete tutorials and explore Training Hall, you'll start earning <strong>badges</strong>.<br><br>

They’re a fun way to track your progress and show off the skills you've picked up along the way.
`,
        bubblePosition: {
      left: "80%",
    top: "50%"
    }
  },
  {
      targetSelector: null,
      title: "You Earned the Hall Explorer Badge! 🏅",
body: `
Nice work! You've completed the Training Hall tour and earned your first badge.<br><br>

You can view it anytime in the <strong>Badges</strong> tab — and if you're feeling proud, click your badge to copy it and share it in Teams.
`,
      badgeStep: true
    ,
    bubblePosition: {
    left: "80%",
    top: "50%"
  }},
    {
      targetSelector: null,
      title: "Your Training Begins",
body: `
Great job completing the tour.<br><br>

You can open the <strong>Dragon Scroll</strong> anytime to explore Training Hall, or jump straight into your first tutorial and start building your BW skills.
`,
      finalStep: true
    ,
    bubblePosition: {
    left: "80%",
    top: "50%"
  }}
  ];

  clearTourHighlights();
  showTourStep(0, steps);
}

function clearTourHighlights() {
  const highlighted = document.querySelectorAll(".traininghall-tour-highlight");
  highlighted.forEach(el => {
    el.classList.remove("traininghall-tour-highlight");
    el.classList.remove("glow-effect");
  });

  const existingBubble = document.getElementById("traininghall-tour-bubble");
  if (existingBubble) existingBubble.remove();
}

function applyBubblePosition(bubble, step) {
  const pos = step.bubblePosition || {
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  };

  bubble.style.left = pos.left ?? "50%";
  bubble.style.top = pos.top ?? "50%";
  bubble.style.right = pos.right ?? "auto";
  bubble.style.bottom = pos.bottom ?? "auto";
  bubble.style.transform = pos.transform ?? "translate(-50%, -50%)";
}

function showTourStep(stepIndex, steps) {
  clearTourHighlights();

  const step = steps[stepIndex];
  const bubble = document.createElement("div");
  bubble.id = "traininghall-tour-bubble";

Object.assign(bubble.style, {
  position: "fixed",
  width: "360px",
  maxWidth: "calc(100vw - 40px)",
  background: "linear-gradient(180deg, #f8edd3 0%, #f1dfb7 100%)",
  border: "2px solid #8b6a3f",
  borderRadius: "18px",
  boxShadow: "0 18px 40px rgba(45, 28, 10, 0.28)",
  padding: "18px 18px 16px 18px",
  color: "#4b341d",
  fontFamily: "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif",
  zIndex: "2147483648",
  pointerEvents: "auto",
  opacity: "0",
  transition: "opacity 220ms ease, transform 220ms ease",
  userSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none"
});

applyBubblePosition(bubble, step);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  Object.assign(closeBtn.style, {
    position: "absolute",
    top: "4px",
    right: "6px",
    width: "32px",
    height: "32px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "15px",
    color: "#6f5431",
    fontFamily: "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    zIndex: "2",
    lineHeight: "1",
    padding: "0"
  });

  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.background = "rgba(111, 84, 49, 0.10)";
  });

  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.background = "transparent";
  });

  closeBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "tour_closed",
      data: {
        step_index: stepIndex,
        step_title: step.title
      }
    });
    clearTourHighlights();
  });

  const title = document.createElement("div");
  title.textContent = step.title;
  Object.assign(title.style, {
    fontSize: "22px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#5b3d1f"
  });

const dragHandle = document.createElement("div");
dragHandle.style.cursor = "grab";
dragHandle.style.margin = "-18px -18px 12px -18px";
dragHandle.style.padding = "16px 18px 8px 18px";
dragHandle.style.borderTopLeftRadius = "18px";
dragHandle.style.borderTopRightRadius = "18px";
dragHandle.style.userSelect = "none";

dragHandle.appendChild(title);

  const body = document.createElement("div");
  body.innerHTML = step.body;
  Object.assign(body.style, {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#6d4e2b",
    marginBottom: "16px"
  });

  const buttonRow = document.createElement("div");
  Object.assign(buttonRow.style, {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  });

if (step.targetSelector === '#poElement') {
simulateLegacyClick(document.querySelector('#poElement'));
}

if (step.targetSelector === '#dragon-scroll') {
  const menu = document.getElementById('hall-menu');
const backdrop = document.getElementById('hall-backdrop');
  menu.style.display='none'; backdrop.style.display='none';
  const panda = document.getElementById('dragon-scroll');
  panda.classList.add('auto-unfurl');
}

if (step.targetSelector === ".hall-tab[data-tab='inbox']") {
  const menu = document.getElementById('hall-menu');
  const backdrop = document.getElementById('hall-backdrop');

  // prep hidden state
  menu.style.display = 'block';
  backdrop.style.display = 'block';

  menu.style.opacity = '0';
  menu.style.transition = 'opacity 180ms ease, transform 180ms ease';

  backdrop.style.opacity = '0';
  backdrop.style.transition = 'opacity 180ms ease';

  // force paint, then fade in
  requestAnimationFrame(() => {
    backdrop.style.opacity = '1';
    menu.style.opacity = '1';
  });

  menu.querySelectorAll('.hall-tab').forEach(b => b.classList.remove('active'));
  menu.querySelector(`.hall-tab[data-tab="inbox"]`).classList.add('active');
  simulateLegacyClick(document.querySelector(".hall-tab[data-tab='inbox']"));
}

if (step.targetSelector === ".hall-tab[data-tab='tutorials']") {
const menu = document.getElementById('hall-menu');
const backdrop = document.getElementById('hall-backdrop');
  menu.style.display='block'; backdrop.style.display='block';
  simulateLegacyClick(document.querySelector(".hall-tab[data-tab='tutorials']"))
}

if (step.targetSelector === ".hall-tab[data-tab='badges']") {
const menu = document.getElementById('hall-menu');
const backdrop = document.getElementById('hall-backdrop');
  menu.style.display='block'; backdrop.style.display='block';
  menu.querySelectorAll('.hall-tab').forEach(b => b.classList.remove('active'));
  menu.querySelector(`.hall-tab[data-tab="badges"]`).classList.add('active');
  simulateLegacyClick(document.querySelector(".hall-tab[data-tab='badges']"))
}

if (step.badgeStep) {
const badgeId = 6;

  const tutorialToBadge = {
  1: "reporting-rookie",
  2: "inbox-sage",
  3: "schedule-master",
  4: "design-scholar",
  5: "dojo-founder",
  6: "hall-explorer"
};

const IdtoBadgeName = {
  1: "Reporting Rookie",
  2: "Inbox Sage",
  3: "Schedule Master",
  4: "Design Scholar",
  5: "Hall Founder",
  6: "Hall Explorer"
};

const badgeUrl = chrome.runtime.getURL(`badges/${tutorialToBadge[badgeId]}.png`);

  if (tutorialToBadge[badgeId]) {
    chrome.storage.sync.get(['hallBadges'], (res) => {
      let badges = res.hallBadges || [];
      console.log(tutorialToBadge[badgeId])
      const badge = badges.find(b => b.id === tutorialToBadge[badgeId]);

      if (badge && !badge.unlocked) {
        badge.unlocked = true;
        badge.new = true;
        chrome.storage.sync.set({ hallBadges: badges });
        badgeSound.play();
        console.log("BADGE UNLOCKED!!!!");
        // Overlay + Achievement container
        const overlay = document.createElement('div');
        overlay.id = 'hall-achievement-overlay';
        overlay.innerHTML = `
          <div class="hall-achievement-content">
            <div class="hall-ray-wrapper">
            <div class="hall-ray-rotator">
              ${Array.from({ length: 12 }).map((_, i) => 
                `<div class="hall-light-ray" style="--i:${i};"></div>`
              ).join('')}
            </div>
          </div>
            <img src="${badgeUrl}" class="hall-badge-img" alt="${IdtoBadgeName[badgeId]}">
            <div class="hall-badge-text">🏅 Badge Unlocked! 🏅</div>
            <button class="hall-ok-btn">OK</button>
          </div>
        `;
        document.body.appendChild(overlay);

        // Styles
        const style = document.createElement('style');
        style.textContent = `
          #hall-achievement-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999999999999;
            animation: fadeIn 0.4s ease forwards;
          }

          .hall-achievement-content {
            position: relative;
            text-align: center;
            animation: popIn 0.6s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards;
          }

/* Keep badge centered above */
.hall-badge-img {
  position: relative;
  z-index: 2;
  width: 130px;
  height: 130px;
  object-fit: contain;
  filter: drop-shadow(0 0 30px gold);
  animation: growBadge 0.8s ease-out forwards;
            }

          .hall-badge-text {
            margin-top: 18px;
            color: #fff;
            font-size: 26px;
            font-weight: 800;
            text-shadow: 0 0 15px gold, 0 0 30px orange;
            animation: textBounce 0.8s ease-out forwards 0.3s;
          }

          .hall-ok-btn {
            margin-top: 24px;
            padding: 12px 36px;
            font-size: 18px;
            font-weight: bold;
            font-family: Rock Sans;
            background: linear-gradient(90deg, gold, orange);
            color: #222;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            box-shadow: 0 0 25px gold;
            transition: transform 0.2s, box-shadow 0.2s;
            z-index: 9999999999999;
          }

          .hall-ok-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 0 35px orange;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes popIn {
            from { transform: scale(0.6); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          @keyframes growBadge {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            60% { transform: scale(1.2) rotate(10deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); }
          }

          @keyframes textBounce {
            0% { transform: translateY(30px); opacity: 0; }
            60% { transform: translateY(-5px); opacity: 1; }
            100% { transform: translateY(0); }
          }

          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }
        `;
        document.head.appendChild(style);

        // Dismiss logic (REPLACE your existing listener with this)
overlay.querySelector('.hall-ok-btn').addEventListener('click', async () => {
  overlay.style.animation = 'fadeOut 0.3s ease forwards';

  // Wait for fade out, then remove overlay
  setTimeout(() => {
    overlay.remove();

  }, 300);
});

      }
    });
  }
}

  if (step.finalStep) {
    simulateLegacyClick(document.querySelector(".hall-tab[data-tab='tutorials']"))
    const closeTourBtn = document.createElement("button");
    closeTourBtn.textContent = "Close";
    styleSecondaryButton(closeTourBtn);

    closeTourBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        type: "LOG_EVENT",
        event: "tour_completed",
        data: {
          completion_state: "closed_on_final_step"
        }
      });
      clearTourHighlights();
    });

    const startBasicBtn = document.createElement("button");
    startBasicBtn.textContent = "Start Your First Tutorial";
    stylePrimaryButton(startBasicBtn);

    startBasicBtn.addEventListener("click", () => {
      chrome.runtime.sendMessage({
        type: "LOG_EVENT",
        event: "tour_completed",
        data: {
          completion_state: "started_basic_tutorial"
        }
      });

      clearTourHighlights();
      startBasicBWTutorial();
    });
    buttonRow.appendChild(closeTourBtn);
    buttonRow.appendChild(startBasicBtn);

  } else {
    const backBtn = document.createElement("button");
    backBtn.textContent = "Back";
    styleSecondaryButton(backBtn);
    backBtn.disabled = stepIndex === 0;

    if (stepIndex === 0) {
      backBtn.style.opacity = "0.45";
      backBtn.style.cursor = "default";
    }

    backBtn.addEventListener("click", () => {
      if (stepIndex > 0) {
        showTourStep(stepIndex - 1, steps);
      }
    });

    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    stylePrimaryButton(nextBtn);

    nextBtn.addEventListener("click", () => {
      const nextStep = steps[stepIndex + 1];
      showTourStep(stepIndex + 1, steps);
    });

    buttonRow.appendChild(backBtn);
    buttonRow.appendChild(nextBtn);
  }
  bubble.appendChild(dragHandle);
  bubble.appendChild(closeBtn);
  bubble.appendChild(body);
  bubble.appendChild(buttonRow);
  document.body.appendChild(bubble);

  makeHallDraggable(bubble, dragHandle);

  if (step.targetSelector) {
    // Delay slightly for elements that may appear after a click/open action
    waitForElement(step.targetSelector, 800).then((target) => {
      if (!target) return;

      // Only auto-click when the step explicitly wants it
      if (step.autoClickTarget) {
        simulateLegacyClick(target);
      }

      // For tabs, make sure the hall menu is open
      if (
        step.targetSelector === ".hall-tab[data-tab='inbox']" ||
        step.targetSelector === ".hall-tab[data-tab='badges']"
      ) {
          const visibleTarget = document.querySelector(step.targetSelector);
          if (visibleTarget) {
            visibleTarget.classList.add("traininghall-tour-highlight");
            visibleTarget.classList.add("glow-effect");
          }
      } else {
        target.classList.add("traininghall-tour-highlight");
        target.classList.add("glow-effect");
      }
    });
  }

const finalTransform = bubble.style.transform || "translate(-50%, -50%)";
bubble.style.transform = `${finalTransform} translateY(8px)`;

requestAnimationFrame(() => {
  bubble.style.opacity = "1";
  bubble.style.transform = finalTransform;
});

  chrome.runtime.sendMessage({
    type: "LOG_EVENT",
    event: "tour_step_viewed",
    data: {
      step_index: stepIndex,
      step_title: step.title
    }
  });
}

function waitForElement(selector, timeout = 800) {
  return new Promise((resolve) => {
    const found = document.querySelector(selector);
    if (found) {
      resolve(found);
      return;
    }

    const start = Date.now();
    const interval = setInterval(() => {
      const el = document.querySelector(selector);
      if (el) {
        clearInterval(interval);
        resolve(el);
      } else if (Date.now() - start > timeout) {
        clearInterval(interval);
        resolve(null);
      }
    }, 50);
  });
}

function simulateLegacyClick(element) {
  if (!element) return;

  try {
    element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, view: window }));
    element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, view: window }));
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
  } catch (e) {
    element.click();
  }
}


function startBasicBWTutorial() {
  const hallClose = document.getElementById('hall-close');

if (!hallClose) return
  simulateLegacyClick(hallClose);

  chrome.storage.sync.set({ popupsEnabled: true, activeTutorial: "basic" }, () => {
    closeAllPopups();
        displayPopups();
    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "basic_tutorial_tour",
      data: {
        source: "tour_final_step"
      }
    });
  });
}

function injectTourHighlightStyles() {
  if (document.getElementById("traininghall-tour-styles")) return;

  const style = document.createElement("style");
  style.id = "traininghall-tour-styles";
  style.textContent = `
    .traininghall-tour-highlight {
      z-index: 2147483646 !important;
      border-radius: 12px !important;
    }
  `;
  document.head.appendChild(style);
}

// === Feedback card helpers (drop these somewhere once, above your badge code) ===
const TH_RATED_KEY = "th_rated_tutorials_v1"; // { [tutorialKey]: { type, rating?, submittedAt, badgeId } }
const TH_FORM_URL = "https://forms.office.com/Pages/ResponsePage.aspx?id=-SY1T9aXLUGTOk4wpzEQ9LrkhnRyP7dDouWFm-ZBx7VUM0tMN0JVNVJGWUFXOUFVRUlFNlBUOE44Ty4u"; // optional

function thGetTutorialKeyFromBadge(badgeId) {
  // Use a stable key for "this tutorial". If you already have a tutorialId, use that instead.
  // For now we'll tie it to the badgeId (since each tutorial earns a badge once).
  return `badge_${badgeId}`;
}

function thBuildFeedbackFormUrl({ badgeId, tutorialKey, rating }) {
  // If your form supports prefill, append params; otherwise it’ll just ignore them.
  const u = new URL(TH_FORM_URL);
  u.searchParams.set("tutorial", tutorialKey);
  u.searchParams.set("badgeId", String(badgeId));
  if (rating != null) u.searchParams.set("rating", String(rating));
  return u.toString();
}

async function thHasRatedOrSkipped(tutorialKey) {
  const data = await chrome.storage.sync.get(TH_RATED_KEY);
  return Boolean(data?.[TH_RATED_KEY]?.[tutorialKey]);
}

async function thPersistRating({ tutorialKey, badgeId, rating }) {
  const data = await chrome.storage.sync.get(TH_RATED_KEY);
  const rated = data[TH_RATED_KEY] || {};
  rated[tutorialKey] = {
    type: "rating",
    rating,
    badgeId,
    submittedAt: new Date().toISOString(),
  };
  await chrome.storage.sync.set({ [TH_RATED_KEY]: rated });
}

async function thPersistSkip({ tutorialKey, badgeId }) {
  const data = await chrome.storage.sync.get(TH_RATED_KEY);
  const rated = data[TH_RATED_KEY] || {};
  rated[tutorialKey] = {
    type: "skip",
    badgeId,
    submittedAt: new Date().toISOString(),
  };
  await chrome.storage.sync.set({ [TH_RATED_KEY]: rated });
}

// OPTIONAL: plug in your GA call here (safe no-op if you don't have GA wired in this context)
function thSendFeedbackToGA({ tutorialKey, badgeId, rating }) {
  try {
    chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "badge_earned", data: { badge_id: badgeId, feedback_rating: rating} });
  } catch (e) {
    // ignore
  }
}

function thInjectFeedbackStylesOnce() {
  if (document.getElementById("th-feedback-style")) return;
  const style = document.createElement("style");
  style.id = "th-feedback-style";
  style.textContent = `
    #th-feedback-card {
      position: fixed;
      right: 18px;
      bottom: 18px;
      width: 280px;
      padding: 12px 14px;
      background: #fdf7e3;
      border: 2px solid #c9a96b;
      border-radius: 14px;
      z-index: 9999999999999;
      box-shadow: 0 12px 30px rgba(0,0,0,0.22);
      transform: translateY(16px);
      opacity: 0;
      transition: transform 180ms ease, opacity 180ms ease;
      font-family: Rock Sans, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
      color: #2b2417;
    }

    #th-feedback-card.th-in {
      transform: translateY(0);
      opacity: 1;
    }

    #th-feedback-card .th-fb-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
    }

    #th-feedback-card .th-fb-title {
      font-weight: 800;
      font-size: 14px;
      line-height: 1.2;
    }

    #th-feedback-card .th-fb-close {
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
      opacity: 0.7;
    }

    #th-feedback-card .th-fb-close:hover { opacity: 1; }

    #th-feedback-card .th-stars {
      margin-top: 8px;
      font-size: 22px;
      user-select: none;
      display: flex;
      gap: 6px;
    }

    #th-feedback-card .th-star {
      cursor: pointer;
      opacity: 0.35;
      transform: scale(1);
      transition: transform 120ms ease, opacity 120ms ease;
    }

    #th-feedback-card .th-star.th-on {
      opacity: 1;
      transform: scale(1.08);
    }

    #th-feedback-card .th-fb-subtext {
      margin-top: 8px;
      font-size: 12px;
      opacity: 0.85;
      line-height: 1.25;
    }

    #th-feedback-card .th-fb-link {
      display: inline-block;
      margin-top: 8px;
      font-size: 12px;
      text-decoration: underline;
      cursor: pointer;
      opacity: 0.9;
      color: #2b2417;
    }
    #th-feedback-card .th-fb-link:hover { opacity: 1; }

    #th-feedback-card .th-fb-thanks {
      margin-top: 10px;
      font-size: 13px;
      font-weight: 700;
      display: none;
    }
  `;
  document.head.appendChild(style);
}

async function thShowFeedbackCardAfterBadge({ badgeId }) {
  const tutorialKey = thGetTutorialKeyFromBadge(badgeId);

  // Only show once per tutorial
  if (await thHasRatedOrSkipped(tutorialKey)) return;

  // Avoid duplicate cards if something fires twice
  if (document.getElementById("th-feedback-card")) return;

  thInjectFeedbackStylesOnce();

  const card = document.createElement("div");
  card.id = "th-feedback-card";
  card.innerHTML = `
    <div class="th-fb-top">
      <div class="th-fb-title">Was this tutorial helpful?</div>
      <button class="th-fb-close" aria-label="Close">✕</button>
    </div>

    <div class="th-stars" aria-label="Star rating">
      ${[1,2,3,4,5].map(n => `<span class="th-star" data-star="${n}" role="button" aria-label="${n} stars">★</span>`).join("")}
    </div>

    <div class="th-fb-subtext">Tap a star to rate. (One-time)</div>

    <a class="th-fb-link" href="#">Share more detailed feedback</a>

    <div class="th-fb-thanks">Thanks — you’re helping improve Training Hall.</div>
  `;

  document.body.appendChild(card);

  // Animate in
  requestAnimationFrame(() => card.classList.add("th-in"));

  const closeBtn = card.querySelector(".th-fb-close");
  const stars = Array.from(card.querySelectorAll(".th-star"));
  const thanks = card.querySelector(".th-fb-thanks");
  const link = card.querySelector(".th-fb-link");
  const subtext = card.querySelector(".th-fb-subtext");

  function setStars(n) {
    stars.forEach(s => {
      const v = Number(s.dataset.star);
      s.classList.toggle("th-on", v <= n);
    });
  }

  function dismiss() {
    card.classList.remove("th-in");
    setTimeout(() => card.remove(), 180);
  }

  closeBtn.addEventListener("click", async () => {
    await thPersistSkip({ tutorialKey, badgeId });
    dismiss();
  });

  stars.forEach(s => {
    s.addEventListener("mouseenter", () => setStars(Number(s.dataset.star)));
    s.addEventListener("mouseleave", () => setStars(0));

    s.addEventListener("click", async () => {
      const rating = Number(s.dataset.star);

      // Persist once
      await thPersistRating({ tutorialKey, badgeId, rating });

      // Analytics (optional)
      thSendFeedbackToGA({ tutorialKey, badgeId, rating });

      // UX: thank you + keep link (but slightly de-emphasize on high ratings)
      subtext.style.display = "none";
      thanks.style.display = "block";
      if (rating >= 4) link.style.opacity = "0.65";

      // If you want to funnel low ratings to the form more strongly:
      // if (rating <= 3) link.textContent = "Tell us what was confusing (1 min)";

      // Disable further clicks
      stars.forEach(x => (x.style.pointerEvents = "none"));

      setTimeout(dismiss, 3500);
    });
  });

  link.addEventListener("click", (e) => {
    e.preventDefault();
    if (!TH_FORM_URL || TH_FORM_URL.includes("PASTE_YOUR_OVERALL_FEEDBACK_FORM_URL_HERE")) return;

    // Open form (optionally with params)
    window.open(thBuildFeedbackFormUrl({ badgeId, tutorialKey, rating: null }), "_blank");
  });
}

function handlePoFeedbackPrompt(activeTutorial = "default") {

  const CLICK_KEY = "traininghall_po_click_count";
  const PROMPT_SHOWN_KEY = "traininghall_po_feedback_prompt_shown";
  const FEEDBACK_SUBMITTED_KEY = "traininghall_po_feedback_submitted";

  // increment Po click count
  let poClickCount = parseInt(localStorage.getItem(CLICK_KEY) || "0", 10);
  poClickCount++;
  localStorage.setItem(CLICK_KEY, poClickCount);

  const promptShown = localStorage.getItem(PROMPT_SHOWN_KEY) === "true";
  const feedbackSubmitted = localStorage.getItem(FEEDBACK_SUBMITTED_KEY) === "true";

  // Send telemetry for Po click
  chrome.runtime.sendMessage({
    type: "LOG_EVENT",
    event: "po_click",
    data: {
      po_click_count: poClickCount,
      source: "Po",
      tutorial: activeTutorial
    }
  });

  // Trigger condition
  if (
    poClickCount >= 5 &&
    activeTutorial !== "default" &&
    !promptShown &&
    !feedbackSubmitted
  ) {
    localStorage.setItem(PROMPT_SHOWN_KEY, "true");
    showPoFeedbackPopup(activeTutorial);
  }
}

function incrementPoClickCountOnly(activeTutorial, keyName) {
  let clickCount = parseInt(localStorage.getItem(keyName) || "0", 10);
  clickCount += 1;
  localStorage.setItem(keyName, String(clickCount));

  chrome.runtime.sendMessage({
    type: "LOG_EVENT",
    event: "po_click",
    data: {
      source: "Po",
      tutorial: activeTutorial || "unknown",
      po_click_count: clickCount
    }
  });

  return clickCount;
}

function showPoFeedbackPopup(activeTutorial, config = {}) {
  if (document.getElementById("traininghall-po-feedback-overlay")) return;

  const submittedKey = config.submittedKey || "trainingHall_po_feedback_submitted";

  const overlay = document.createElement("div");
  overlay.id = "traininghall-po-feedback-overlay";
  overlay.style.position = "fixed";
  overlay.style.inset = "0";
  overlay.style.background = "rgba(25, 18, 10, 0.22)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "999999";
  
  const modal = document.createElement("div");
  modal.id = "traininghall-po-feedback-modal";
  modal.style.width = "min(92vw, 460px)";
  modal.style.background = "linear-gradient(180deg, #f8edd3 0%, #f1dfb7 100%)";
  modal.style.border = "2px solid #8b6a3f";
  modal.style.borderRadius = "18px";
  modal.style.boxShadow = "0 18px 40px rgba(45, 28, 10, 0.28)";
  modal.style.padding = "22px 22px 18px 22px";
  modal.style.color = "#4b341d";
  modal.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
  modal.style.position = "relative";

 const closeBtn = document.createElement("button");
closeBtn.textContent = "✕";
closeBtn.style.position = "absolute";
closeBtn.style.top = "10px";
closeBtn.style.right = "12px";
closeBtn.style.border = "none";
closeBtn.style.background = "transparent";
closeBtn.style.cursor = "pointer";
closeBtn.style.fontSize = "16px";
closeBtn.style.color = "#6f5431";
closeBtn.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
closeBtn.title = "Close";

  closeBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_feedback_prompt_dismissed",
      data: {
        source: "Po",
        tutorial: activeTutorial || "unknown"
      }
    });
    overlay.remove();
  });

  const title = document.createElement("div");
  title.textContent = "Po is still learning...";
  title.style.fontSize = "23px";
  title.style.fontWeight = "700";
  title.style.marginBottom = "8px";
  title.style.padding = "2px";
  title.style.color = "#5b3d1f";
  title.style.userSelect = "none";

  const subtitle = document.createElement("div");
  subtitle.textContent = "Is my guidance helping you so far?";
  subtitle.style.fontSize = "16px";
  subtitle.style.lineHeight = "1.4";
  subtitle.style.marginBottom = "18px";
  subtitle.style.color = "#6d4e2b";
  subtitle.style.userSelect = "none";

  const buttonRow = document.createElement("div");
  buttonRow.style.display = "flex";
  buttonRow.style.gap = "12px";
  buttonRow.style.marginBottom = "16px";

  const thumbsUpBtn = createStyledFeedbackButton("👍 Yes", "#fff7e4", "#8b6a3f");
  const thumbsDownBtn = createStyledFeedbackButton("👎 Not really", "#fff7e4", "#8b6a3f");

  buttonRow.appendChild(thumbsUpBtn);
  buttonRow.appendChild(thumbsDownBtn);

  const negativeSection = document.createElement("div");
  negativeSection.style.display = "none";
  negativeSection.style.marginTop = "4px";

  const negativeTitle = document.createElement("div");
  negativeTitle.textContent = "What could Po do better?";
  negativeTitle.style.fontSize = "15px";
  negativeTitle.style.fontWeight = "700";
  negativeTitle.style.marginBottom = "10px";
  negativeTitle.style.color = "#5b3d1f";

  const chipContainer = document.createElement("div");
  chipContainer.style.display = "flex";
  chipContainer.style.flexWrap = "wrap";
  chipContainer.style.gap = "8px";
  chipContainer.style.marginBottom = "12px";

  const options = [
    "Couldn't find the right tutorial",
    "Instructions unclear",
    "Too many steps",
    "Something else"
  ];

  let selectedReason = "";

  const chips = options.map((option) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.textContent = option;
    chip.dataset.value = option;
    chip.style.padding = "8px 12px";
    chip.style.borderRadius = "999px";
    chip.style.border = "1.5px solid #a98656";
    chip.style.background = "#f8ecd0";
    chip.style.color = "#6a4a28";
    chip.style.cursor = "pointer";
    chip.style.fontSize = "13px";
    chip.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
    chip.style.transition = "all 0.18s ease";
    chip.style.boxShadow = "0 2px 6px rgba(80, 50, 20, 0.08)";

    chip.addEventListener("mouseenter", () => {
      if (selectedReason !== option) chip.style.background = "#f2ddb5";
    });

    chip.addEventListener("mouseleave", () => {
      if (selectedReason !== option) chip.style.background = "#f8ecd0";
    });

    chip.addEventListener("click", () => {
      selectedReason = option;
      chips.forEach((c) => {
        c.style.background = "#f8ecd0";
        c.style.borderColor = "#a98656";
        c.style.color = "#6a4a28";
        c.style.transform = "scale(1)";
      });

      chip.style.background = "#d8b06a";
      chip.style.borderColor = "#8b5f25";
      chip.style.color = "#3e2813";
      chip.style.transform = "scale(1.02)";
    });

    return chip;
  });

  chips.forEach((chip) => chipContainer.appendChild(chip));

  const textarea = document.createElement("textarea");
  textarea.placeholder = "Type a quick suggestion (optional)...";
  textarea.style.width = "100%";
  textarea.style.minHeight = "88px";
  textarea.style.resize = "vertical";
  textarea.style.borderRadius = "12px";
  textarea.style.border = "1.5px solid #b48a59";
  textarea.style.padding = "12px";
  textarea.style.background = "#fff9ec";
  textarea.style.color = "#4e341d";
  textarea.style.fontSize = "14px";
  textarea.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
  textarea.style.boxSizing = "border-box";
  textarea.style.outline = "none";
  textarea.style.marginBottom = "14px";

  textarea.addEventListener("focus", () => {
    textarea.style.borderColor = "#8e6229";
    textarea.style.boxShadow = "0 0 0 3px rgba(180, 138, 89, 0.18)";
  });

  textarea.addEventListener("blur", () => {
    textarea.style.borderColor = "#b48a59";
    textarea.style.boxShadow = "none";
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit Feedback";
  submitBtn.style.padding = "11px 16px";
  submitBtn.style.border = "1.5px solid #7b572b";
  submitBtn.style.borderRadius = "12px";
  submitBtn.style.background = "linear-gradient(180deg, #c79343 0%, #a9742b 100%)";
  submitBtn.style.color = "#fff6e8";
  submitBtn.style.cursor = "pointer";
  submitBtn.style.fontSize = "14px";
  submitBtn.style.fontWeight = "700";
  submitBtn.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
  submitBtn.style.boxShadow = "0 6px 14px rgba(90, 55, 20, 0.18)";
  submitBtn.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";

  submitBtn.addEventListener("mouseenter", () => {
    submitBtn.style.transform = "translateY(-1px)";
    submitBtn.style.boxShadow = "0 10px 20px rgba(90, 55, 20, 0.24)";
  });

  submitBtn.addEventListener("mouseleave", () => {
    submitBtn.style.transform = "translateY(0)";
    submitBtn.style.boxShadow = "0 6px 14px rgba(90, 55, 20, 0.18)";
  });

  negativeSection.appendChild(negativeTitle);
  negativeSection.appendChild(chipContainer);
  negativeSection.appendChild(textarea);
  negativeSection.appendChild(submitBtn);

  thumbsUpBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_feedback_submitted",
      data: {
        source: "Po",
        tutorial: activeTutorial || "unknown",
        po_helpful_rating: "positive",
        po_feedback_reason: "",
        po_feedback_text: ""
      }
    });

    localStorage.setItem(submittedKey, "true");
    showPoFeedbackThankYou(modal, overlay);
  });

  thumbsDownBtn.addEventListener("click", () => {
    thumbsUpBtn.style.opacity = "0.85";
    thumbsDownBtn.style.background = "linear-gradient(180deg, #d8b06a 0%, #b8853b 100%)";
    thumbsDownBtn.style.borderColor = "#8b5f25";
    thumbsDownBtn.style.color = "#442a14";

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_feedback_negative_opened",
      data: {
        source: "Po",
        tutorial: activeTutorial || "unknown",
        po_helpful_rating: "negative"
      }
    });

    negativeSection.style.display = "block";
  });

  submitBtn.addEventListener("click", () => {
    const freeResponse = textarea.value.trim();

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_feedback_submitted",
      data: {
        source: "Po",
        tutorial: activeTutorial || "unknown",
        po_helpful_rating: "negative",
        po_feedback_reason: selectedReason || "",
        po_feedback_text: freeResponse || ""
      }
    });

    localStorage.setItem(submittedKey, "true");
    showPoFeedbackThankYou(modal, overlay);
  });
modal.style.transform = "translateY(14px) scale(0.985)";
modal.style.opacity = "0";
modal.style.transition = "opacity 350ms ease, transform 350ms ease";

overlay.style.opacity = "0";
overlay.style.transition = "opacity 350ms ease";

modal.appendChild(closeBtn);
modal.appendChild(title);
modal.appendChild(subtitle);
modal.appendChild(buttonRow);
modal.appendChild(negativeSection);
overlay.appendChild(modal);

document.body.appendChild(overlay);

// Force layout so the initial hidden state is painted first
modal.getBoundingClientRect();

requestAnimationFrame(() => {
  overlay.style.opacity = "1";
  modal.style.opacity = "1";
  modal.style.transform = "translateY(0) scale(1)";
});

  chrome.runtime.sendMessage({
    type: "LOG_EVENT",
    event: "po_feedback_prompt_shown",
    data: {
      source: "Po",
      tutorial: activeTutorial || "unknown"
    }
  });
}

function createStyledFeedbackButton(label, bgColor, borderColor) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.style.flex = "1";
  btn.style.padding = "14px 14px";
  btn.style.borderRadius = "14px";
  btn.style.border = `1.5px solid ${borderColor}`;
  btn.style.background = bgColor;
  btn.style.color = "#5d3f20";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "15px";
  btn.style.fontWeight = "700";
  btn.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";
  btn.style.boxShadow = "0 6px 14px rgba(80, 45, 15, 0.12)";
  btn.style.transition = "all 0.18s ease";

  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-1px)";
    btn.style.background = "linear-gradient(180deg, #f7e7c4 0%, #edd4a6 100%)";
    btn.style.boxShadow = "0 10px 20px rgba(80, 45, 15, 0.16)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)";
    btn.style.background = bgColor;
    btn.style.boxShadow = "0 6px 14px rgba(80, 45, 15, 0.12)";
  });

  return btn;
}

function showPoFeedbackThankYou(modal, overlay) {
  modal.innerHTML = "";

  const thankYouTitle = document.createElement("div");
  thankYouTitle.textContent = "Thank you!";
  thankYouTitle.style.fontSize = "24px";
  thankYouTitle.style.fontWeight = "700";
  thankYouTitle.style.marginBottom = "10px";
  thankYouTitle.style.color = "#5a3c1e";
  thankYouTitle.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";

  const thankYouText = document.createElement("div");
  thankYouText.textContent = "Your feedback will help improve Training Hall for everyone.";
  thankYouText.style.fontSize = "15px";
  thankYouText.style.lineHeight = "1.5";
  thankYouText.style.color = "#6f4e2d";
  thankYouText.style.marginBottom = "16px";
  thankYouText.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.style.padding = "11px 16px";
  doneBtn.style.border = "1.5px solid #7b572b";
  doneBtn.style.borderRadius = "12px";
  doneBtn.style.background = "linear-gradient(180deg, #c79343 0%, #a9742b 100%)";
  doneBtn.style.color = "#fff6e8";
  doneBtn.style.cursor = "pointer";
  doneBtn.style.fontSize = "14px";
  doneBtn.style.fontWeight = "700";
  doneBtn.style.fontFamily = "'Rock Sans', 'Trebuchet MS', 'Verdana', sans-serif";

  doneBtn.addEventListener("click", () => overlay.remove());

  modal.appendChild(thankYouTitle);
  modal.appendChild(thankYouText);
  modal.appendChild(doneBtn);
}

function createPopup(message, currentIndex, totalSteps, onNext, onBack) {
  const popup = document.createElement('div');
  popup.classList.add('fade-in', 'popup');
  popup.style.position = 'fixed';
  popup.style.padding = '10px';
  popup.style.backgroundColor = '#FEF5B1';
  popup.style.border = '2.5px solid #000000';
  popup.style.borderradius = '25px';
  popup.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  popup.style.zIndex = 10000;
  popup.style.width = '300px';
  popup.style.height = 'auto';
  popup.style.textAlign = 'center';
  popup.style.fontFamily = 'Rock sans, sans-serif';
  popup.style.fontWeight = '525'; 
  popup.style.fontSize = '18px';
  popup.style.display = 'inline-block';
  popup.style.borderRadius = '20px';

  let isDragging = false;
  let startX, startY;
  
  // pointer down event to start dragging
  popup.addEventListener('pointerdown', function(e) {
    chrome.storage.sync.get(['activeTutorial'], function(result) {
    console.log("Storage callback ran", result);

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "popup_drag",
      data: {
        tutorial: result.activeTutorial,
        current_index: currentIndex,
        total_steps: totalSteps
      }
    });})
    
    isDragging = true;
    startX = e.clientX - popup.offsetLeft;
    startY = e.clientY - popup.offsetTop;
    document.addEventListener('pointermove', onpointerMove);
    document.addEventListener('pointerup', onpointerUp);
    e.preventDefault(); // Prevent text selection during drag
  });

  function onpointerMove(e) {
    if (isDragging) {
      requestAnimationFrame(() => {
        popup.style.left = e.clientX - startX + 'px';
        popup.style.top = e.clientY - startY + 'px';
      });
    }
  }

  function onpointerUp() {
    isDragging = false;
    document.removeEventListener('pointermove', onpointerMove);
    document.removeEventListener('pointerup', onpointerUp);
  }

// Inject button styles once
if (!document.getElementById("td-nav-btn-styles")) {
  const s = document.createElement("style");
  s.id = "td-nav-btn-styles";
  s.textContent = `
    .td-nav-btn {
      all: unset;
      font-family: "Rock Sans", sans-serif;
      font-size: 16px;
      font-weight: 700;
      padding: 8px 14px;
      border-radius: 10px;
      cursor: pointer;
      user-select: none;
      transition: 
        transform 120ms ease, 
        background 120ms ease, 
        box-shadow 120ms ease, 
        color 120ms ease;
    }

    /* Back = secondary / parchment */
    .td-nav-btn.back {
      color: #2b1a10;
      background: #ececec;
      border: 1px solid rgba(139, 94, 60, 0.35);
    }

    .td-nav-btn.back:hover {
      background: #b9b9b9v;
      box-shadow: 0 2px 4px rgba(0,0,0,0.12);
    }

    /* Next = primary / hall gold */
    .td-nav-btn.next {
      color: #2b1a10;
      background: #ececec;
      border: 1px solid rgba(73,37,7,0.45);
      box-shadow: 0 1px 2px rgba(0,0,0,0.18);
    }

    .td-nav-btn.next:hover {
      background: #e4e4e4;
      box-shadow: 0 2px 4px rgba(0,0,0,0.22);
    }

    /* Pressed feel */
    .td-nav-btn:active {
      transform: translateY(1px);
      box-shadow: 0 3px 5px rgba(0,0,0,0.2) inset;
    }
    /* ---- Popup fade ---- */
.hall-popup {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 180ms ease, transform 180ms ease;
  will-change: opacity, transform;
}
.hall-popup.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.hall-popup.is-hiding {
  opacity: 0;
  transform: translateY(6px);
}

/* ---- Nav buttons (light grey base, visible on yellow) ---- */
.td-nav-btn {
  all: unset;
  font-family: "Rock Sans", sans-serif;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;

  background: #f2f2f2;                 /* same for both */
  border: 1px solid rgba(0,0,0,0.25);
  color: #2b1a10;
  box-shadow: 0 6px 14px rgba(0,0,0,0.18);
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;
}

.td-nav-btn:hover {
  background: #fafafa;
  box-shadow: 0 10px 22px rgba(0,0,0,0.22);
  transform: translateY(-1px);
}

.td-nav-btn:active {
  transform: translateY(0px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.20) inset;
}

/* Subtle differentiation without changing background color */
.td-nav-btn.back {
  opacity: 0.92;
}

.td-nav-btn.next {
  border-color: rgba(73,37,7,0.45); /* slightly warmer border */
}

  `;
  document.head.appendChild(s);
}
const messageElement = document.createElement('p');
messageElement.style.marginTop = '30px';
messageElement.style.marginBottom = '15px';
messageElement.innerHTML = message;
popup.appendChild(messageElement);

const buttonContainer = document.createElement('div');
buttonContainer.style.display = 'flex';
buttonContainer.style.justifyContent = 'space-between';
buttonContainer.style.alignItems = 'center';

if (currentIndex > 0) {
  const backButton = document.createElement('button');
  backButton.textContent = 'Back';
  backButton.className = 'td-nav-btn back';
  backButton.addEventListener('click', () => {
    chrome.storage.sync.get(['activeTutorial','reportName'], function (result) {
    chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "tutorial_back", data: { tutorial: result.activeTutorial, report_name: result.reportName, current_index: currentIndex, total_steps: totalSteps} });
    });
    nextBackSound.play();
    popup.remove();
    onBack();
  });
  buttonContainer.appendChild(backButton);
}

const nextButton = document.createElement('button');
nextButton.textContent = currentIndex === totalSteps - 1 ? 'Close' : 'Next';
nextButton.className = 'td-nav-btn next';
nextButton.addEventListener('click', () => {
  nextBackSound.play();
  popup.remove();
  onNext();
chrome.storage.sync.get(['activeTutorial','reportName'], function (result) {
    chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "tutorial_next", data: { tutorial: result.activeTutorial, report_name: result.reportName, current_index: currentIndex, total_steps: totalSteps} });
    });  
    if (currentIndex === totalSteps - 1) {
    addGifToggle();
    document.querySelectorAll('.auto-unfurl').forEach(el =>
      el.classList.remove('auto-unfurl')
    );
  }
});

buttonContainer.appendChild(nextButton);
popup.appendChild(buttonContainer);

  const exitButton = document.createElement('button');
  exitButton.style.position = 'absolute';
  exitButton.innerHTML = '&times;';
  exitButton.style.top = '1px';
  exitButton.style.right = '1px';
  exitButton.style.backgroundColor = '#e02d2d';
  exitButton.style.color = 'white';
  exitButton.style.fontSize = '21px';
  exitButton.style.fontWeight = 'bold';
  exitButton.style.padding = '0 5px';
  exitButton.style.cursor = 'pointer';
  exitButton.style.width = '25px';
  exitButton.style.height = '25px';
  exitButton.style.lineHeight = '15px'; 
  exitButton.style.textAlign = 'center';
  exitButton.style.marginBottom = '5px';
  exitButton.style.marginRight = '10px';
  exitButton.style.marginTop = '10px';
  exitButton.style.borderRadius = '5px';
  exitButton.style.fontFamily = 'Rock sans, sans-serif';
  exitButton.onpointerover = function() {
    exitButton.style.background = '#ff7575'; 
  };
  exitButton.onpointerout = function() {
    exitButton.style.background = '#e02d2d'; 
  };
     // Confirm before exiting the tutorial
  exitButton.onclick = function() {
        chrome.storage.sync.get(['activeTutorial','reportName'], function (result) {
    chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "tutorial_exit1", data: { tutorial: result.activeTutorial, report_name: result.reportName, current_index: currentIndex, total_steps: totalSteps} });
    });
    openConfirmationPopup();
  };

  buttonContainer.appendChild(exitButton);

// Function to create a custom confirmation popup
function openConfirmationPopup(popup) {
  // Inject styles once
  if (!document.getElementById("td-confirm-styles")) {
    const s = document.createElement("style");
    s.id = "td-confirm-styles";
    s.textContent = `
      .td-confirm-overlay{
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.55);
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .td-confirm-modal{
        width: min(420px, calc(100vw - 32px));
        border-radius: 14px;
        background: #fdf7e3; /* parchment */
        border: 3px solid #3b2f1c; /* dark wood */
        box-shadow: 0 18px 48px rgba(0,0,0,0.45);
        font-family: "Rock Sans", sans-serif;
        color: #2b1a10;
        position: relative;
        overflow: hidden;
      }

      /* subtle inner frame */
      .td-confirm-modal::before{
        content: "";
        position: absolute;
        inset: 10px;
        border-radius: 10px;
        border: 2px solid rgba(139, 94, 60, 0.45);
        pointer-events: none;
      }

      .td-confirm-header{
        padding: 14px 18px 10px;
        border-bottom: 1px solid rgba(73,37,7,0.18);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .td-confirm-title{
        font-size: 16px;
        font-weight: 900;
        letter-spacing: 0.2px;
        margin: 0;
      }

      .td-confirm-x{
        all: unset;
        cursor: pointer;
        font-size: 16px;
        font-weight: 900;
        line-height: 1;
        padding: 6px 10px;
        border-radius: 10px;
        color: #5b3a29;
      }
      .td-confirm-x:hover{
        background: rgba(139,94,60,0.12);
      }

      .td-confirm-body{
        padding: 14px 18px 4px;
      }

      .td-confirm-message{
        margin: 0;
        font-size: 14px;
        line-height: 1.45;
        color: #3a1e12;
      }

      .td-confirm-sub{
        margin: 10px 0 0;
        font-size: 12px;
        line-height: 1.4;
        color: rgba(58,30,18,0.75);
      }

      .td-confirm-actions{
        padding: 14px 18px 18px;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
      }

      .td-btn{
        all: unset;
        cursor: pointer;
        font-weight: 900;
        font-size: 13px;
        padding: 10px 14px;
        border-radius: 12px;
        user-select: none;
        transition: transform 120ms ease, background 120ms ease, box-shadow 120ms ease;
      }
      .td-btn:active{
        transform: translateY(1px);
      }

      .td-btn-secondary{
        color: #4a2c1c;
        background: rgba(139,94,60,0.10);
        border: 1px solid rgba(139,94,60,0.35);
      }
      .td-btn-secondary:hover{
        background: rgba(139,94,60,0.16);
      }

      .td-btn-primary{
        color: #2b1a10;
        background: #e6d8a7; /* hall gold */
        border: 1px solid rgba(73,37,7,0.45);
        box-shadow: 0 6px 16px rgba(0,0,0,0.18);
      }
      .td-btn-primary:hover{
        background: #efe2b6;
      }
    `;
    document.head.appendChild(s);
  }

  // Build overlay
  const overlay = document.createElement("div");
  overlay.className = "td-confirm-overlay";

  // Build modal
  const modal = document.createElement("div");
  modal.className = "td-confirm-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Confirm exit tutorial");

  modal.innerHTML = `
    <div class="td-confirm-header">
      <p class="td-confirm-title">Exit tutorial?</p>
      <button class="td-confirm-x" aria-label="Close">✕</button>
    </div>
    <div class="td-confirm-body">
      <p class="td-confirm-message">Are you sure you want to exit the tutorial?</p>
      <p class="td-confirm-sub">Your progress will be saved, but the guidance will stop.</p>
    </div>
    <div class="td-confirm-actions">
      <button class="td-btn td-btn-secondary" data-action="cancel">Cancel</button>
      <button class="td-btn td-btn-primary" data-action="ok">Exit</button>
    </div>
  `;

  // Helpers
  const close = () => {
    overlay.remove();
  };

  const exitTutorial = () => {

    chrome.storage.sync.get(['activeTutorial','reportName'], function (result) {
    chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "tutorial_exit2", data: { tutorial: result.activeTutorial, report_name: result.reportName, current_index: currentIndex, total_steps: totalSteps} });
    });    
    close();
    const panda = document.getElementById("dragon-scroll");
    if (panda) panda.classList.remove("auto-unfurl");
    closeAllPopups();
    popupsEnabled = false;
    chrome.storage.sync.set({ popupsEnabled: false });
    addGifToggle();
  };

  // Click handlers
  overlay.addEventListener("click", (e) => {
    // Clicking outside the modal closes (cancel)
    if (e.target === overlay) close();
  });

  modal.querySelector('[data-action="cancel"]').addEventListener("click", close);
  modal.querySelector(".td-confirm-x").addEventListener("click", close);
  modal.querySelector('[data-action="ok"]').addEventListener("click", exitTutorial);

  // Esc to close
  const onKey = (e) => {
    if (e.key === "Escape") {
      document.removeEventListener("keydown", onKey);
      close();
    }
    if (e.key === "Enter") {
      // Enter = Exit (optional)
      // exitTutorial();
    }
  };
  document.addEventListener("keydown", onKey);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Focus the primary action for keyboard users
  modal.querySelector('[data-action="ok"]').focus();
}


function isWebm(filename) {
  return /\.webm$/i.test(filename);
}

function createGifEmote(gifEmote) {
  const url = chrome.runtime.getURL("gifs/" + gifEmote);

  if (isWebm(gifEmote)) {
    const v = document.createElement("video");
    v.src = url;
    v.autoplay = true;
    v.loop = true;
    v.muted = true;       // required for autoplay
    v.playsInline = true; // keeps it inline
    v.style.width = "200px";
    v.style.height = "auto";
    v.style.right = "20px";
    v.style.position = "absolute"; // only if you were positioning the img this way
    return v;
  }

  const img = document.createElement("img");
  img.src = url;
  img.style.width = "200px";
  img.style.height = "auto";
  img.style.right = "20px";
  img.style.position = "absolute"; // only if you were positioning the img this way
  return img;
}

function wireGifInteractions(el, gifEmote) {
  // WebM: true pause/resume
  if (el.tagName === "VIDEO") {
    el.addEventListener("pointerenter", () => el.pause());
    el.addEventListener("pointerleave", () => el.play());
    el.addEventListener("click", () => (el.paused ? el.play() : el.pause()));
    return;
  }

  // GIF: can't pause; keep your "restart on hover" behavior
  el.addEventListener("pointerover", () => {
    const url = chrome.runtime.getURL("gifs/" + gifEmote);
    el.src = ""; // force reload
    el.src = url + (url.includes("?") ? "&" : "?") + "t=" + Date.now();
  });
}

  popup.appendChild(buttonContainer);

  const minionGuide = document.createElement('img');
  var randomNumber = Math.floor(Math.random() * 11) + 1;

// Set the variable based on the random number
var gifEmote;

switch (randomNumber) {
  case 1:  gifEmote = "poawesome.webm"; break;
  case 2:  gifEmote = "pospin.webm"; break;
  case 3:  gifEmote = "podumplingbackpack.webm"; break;
  case 4:  gifEmote = "podumpling.webm"; break;
  case 5:  gifEmote = "pobow.webm"; break;
  case 6:  gifEmote = "pohighfive.webm"; break;
  case 7:  gifEmote = "dumpling.webm"; break;
  case 8:  gifEmote = "bunnytrio.webm"; break;
  case 9:  gifEmote = "shifupleased.webm"; break;
  case 10: gifEmote = "babypo.webm"; break;
  case 11: gifEmote = "babytigress.webm"; break;
}

function isWebm(filename) {
  return /\.webm$/i.test(filename);
}

function createGifEmote(gifEmote) {
  const url = chrome.runtime.getURL("gifs/" + gifEmote);

  if (isWebm(gifEmote)) {
    const v = document.createElement("video");
    v.src = url;
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.playsInline = true;
    v.style.width = "200px";
    v.style.height = "auto";
    v.style.right = "20px";
    return v;
  }

  const img = document.createElement("img");
  img.src = url;
  img.style.width = "200px";
  img.style.height = "auto";
  img.style.right = "20px";
  return img;
}

function wireGifInteractions(el, gifEmote) {
  if (el.tagName === "VIDEO") {
    el.addEventListener("click", () => (el.paused ? el.play() : el.pause()));
    return;
  }

  el.addEventListener("pointerover", () => {
    const url = chrome.runtime.getURL("gifs/" + gifEmote);
    el.src = "";
    el.src = url + (url.includes("?") ? "&" : "?") + "t=" + Date.now();
  });
}

console.log(gifEmote);
const gifEl = createGifEmote(gifEmote);
popup.appendChild(gifEl);
wireGifInteractions(gifEl, gifEmote);

return popup;


}

function closeAllPopups() {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => popup.remove());
  document.querySelectorAll('.glow-effect').forEach(el => el.classList.remove('glow-effect'));
}

function closeAllGifs() {
  const gifs = document.querySelectorAll('.webm')
  gifs.forEach(gif => gif.remove());
  const gifs2 = document.querySelectorAll('.gif')
  gifs2.forEach(gif2 => gif2.remove());
}

const chatBubble = document.createElement('div');

chatBubble.style.position = 'absolute';
chatBubble.style.width = '12vw';
chatBubble.style.height = '100px';
chatBubble.style.top = '-35%';
chatBubble.style.left = '-100%';
chatBubble.style.backgroundImage = `url(${chrome.runtime.getURL('images/speech-bubble1.png')})`;
chatBubble.style.backgroundSize = 'contain';
chatBubble.style.backgroundRepeat = 'no-repeat';
chatBubble.style.zIndex = 10001;
chatBubble.style.opacity = '0';
chatBubble.style.transition = 'opacity 0.5s ease-in-out';
chatBubble.style.pointerEvents = 'auto';

chatBubble.addEventListener('click', () => {

  chrome.storage.local.set({ showPo: true });

  chatBubble.style.opacity = '0';
  chatBubble.style.pointerEvents = 'none';

});

// Function to inject the script and set up the event listener
function injectScriptAndSetupListener() {
  console.log("heres the iframe:" + iframeId);
  console.log("Running Script Listener 1", reportName);
  console.log("Running Script Listener 2", reportName);

  // Allowlist the origins you EXPECT BW to run on.
  // Add your real BW hosts here (prod, test, etc.)
  const ALLOWED_ORIGINS = new Set([
    window.location.origin, // same-origin as the page you're on
    "https://bo42corpsysbhp.example.com/*",
    "https://portal.example.com/irj/portal/*"
  ]);

  // Make this a named handler so you can remove it later if needed
  function onMessage(event) {
    // ✅ 1) Origin check (Snyk requirement)
    if (!ALLOWED_ORIGINS.has(event.origin)) return;

    // ✅ 2) Optional but recommended: ensure the sender is this page (not another window)
    // For content scripts + injected page script, event.source is typically window.
    if (event.source !== window) return;

    // ✅ 3) Validate payload shape
    const data = event.data;
    if (!data || typeof data !== "object") return;
    if (data.type !== "FROM_PAGE") return;
    if (typeof data.reportName !== "string") return;

    console.log("Running Script Listener 3", reportName);
    console.log("Running Script Listener 4", reportName);

    const cleanedReportName = data.reportName.split("(")[0].trim();
    reportName = cleanedReportName;

    chrome.storage.sync.set({ reportName });
    console.log("Report Name from DS:", reportName + iframeId);

    const reports = {
      Person: () => console.log("GAL Report"),
      "Flexible employee Report - NON SA": () => console.log("Flex EE"),
      "Flexible Actions Report": () => console.log("Flexible Actions Report"),
      "Employee Detail Census": () => console.log("Employee Detail Census"),
      "Compensation Report": () => console.log("Compensation Ad Hoc Report"),
      "Reward & Recognition": () => console.log("GEM Report"),
      SAP: () => console.log("SAP Salary History Report"),
      OHR: () => console.log("OHR Salary History Report"),
      "Diversity Movement Summary (Actions)": () =>
        console.log("Diversity Movement Summary (Actions)"),
      "Diversity Worforce Summary - PIT": () =>
        console.log("Diversity Worforce Summary - PIT"),
      "Employee Headcount Rollup Summary": () =>
        console.log("Employee Headcount Rollup Summary"),
      Query1: () => console.log("Employee Terminations OR Promotions"),
      "Performance Status SF": () => console.log("Performance Status Report"),
    };

    if (reports[reportName]) {
      reports[reportName]();
    } else {
      console.log("GIF Clicked: No match found");
      setTimeout(() => showRelevantPopupSeries("generic_report", tutorial), 100);
    }

    console.log("GIF Clicked Report Listener");
    setTimeout(() => showRelevantPopupSeries(reportName, tutorial), 100);
  }

  // Set up the event listener for the injected script
  window.top.addEventListener("message", onMessage);

  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("inject.js");
  (document.head || document.documentElement).appendChild(script);
}


let smokeInProgress = false;
const SMOKEBOMB_URL = chrome.runtime.getURL('gifs/smokebomb.webp');

// Tune these three to taste
const SMOKEBOMB_MS          = 1000;  // total smoke duration
const PO_FADE_START_MS     = 600;   // when Po starts fading (late)
const PO_FADE_DURATION_MS  = 220;   // fade length
const SMOKE_TAIL_BUFFER_MS = 120;   // extra buffer after smoke ends before hide

const SMOKE_Z = 2147483647;
const PO_BELOW_SMOKE_Z = SMOKE_Z - 1;

// Add these constants somewhere near your other constants
const PO_HIDE_TIP_STORAGE_KEY = 'hidePoDismissTip'; // true = never show again
const PO_HIDE_TIP_ID = 'po-hide-tip';

// Add this helper (content-script safe)
function showPoHideTipMessage() {
  if (document.getElementById(PO_HIDE_TIP_ID)) return;

  const readPref = (cb) => {
    try {
      if (chrome?.storage?.sync) {
        chrome.storage.sync.get([PO_HIDE_TIP_STORAGE_KEY], (res) =>
          cb(!!res?.[PO_HIDE_TIP_STORAGE_KEY])
        );
        return;
      }
    } catch (_) {}
    cb(localStorage.getItem(PO_HIDE_TIP_STORAGE_KEY) === 'true');
  };

  const writePref = (val) => {
    try {
      if (chrome?.storage?.sync) {
        chrome.storage.sync.set({ [PO_HIDE_TIP_STORAGE_KEY]: !!val });
        return;
      }
    } catch (_) {}
    localStorage.setItem(PO_HIDE_TIP_STORAGE_KEY, String(!!val));
  };

  readPref((dontShowAgain) => {
    if (dontShowAgain) return;

    const toast = document.createElement('div');
    toast.id = PO_HIDE_TIP_ID;
    Object.assign(toast.style, {
      position: 'fixed',
      right: '16px',
      bottom: '16px',
      width: '280px',
      maxWidth: 'calc(100vw - 32px)',
      zIndex: '999999',
      background: '#FEF5B1',
      border: '2.5px solid #000',
      borderRadius: '14px',
      boxShadow: '0 8px 18px rgba(0,0,0,0.25)',
      fontFamily: '"Rock Sans", sans-serif',
      color: '#111',
      padding: '10px 10px 9px 10px',
      lineHeight: '1.2',
      opacity: '0',
      transform: 'translateY(8px)',
      transition: 'opacity 220ms ease, transform 220ms ease',
    });

    const topRow = document.createElement('div');
    Object.assign(topRow.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
      marginBottom: '6px',
    });

    const title = document.createElement('div');
    title.textContent = 'Po is hidden';
    Object.assign(title.style, {
      fontWeight: '800',
      fontSize: '12px',
    });

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.textContent = '✕';
    Object.assign(closeBtn.style, {
      cursor: 'pointer',
      border: '2px solid #000',
      background: '#f2f2f2',
      borderRadius: '8px',
      width: '22px',
      height: '22px',
      fontWeight: '800',
      lineHeight: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      fontFamily: '"Rock Sans", sans-serif',
      fontSize: '11px',
    });

    topRow.appendChild(title);
    topRow.appendChild(closeBtn);

    const msg = document.createElement('div');
    msg.innerHTML = `
      You can bring Po back anytime via <b>Settings</b> by clicking the <b>Dragon Scroll</b>.
    `;
    Object.assign(msg.style, {
      fontSize: '11px',
      marginBottom: '8px',
    });

    const checkboxRow = document.createElement('label');
    Object.assign(checkboxRow.style, {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '10.5px',
      userSelect: 'none',
      cursor: 'pointer',
    });

    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = false;
    cb.style.transform = 'scale(0.95)';

    const cbText = document.createElement('span');
    cbText.textContent = "Don't show again";

    checkboxRow.appendChild(cb);
    checkboxRow.appendChild(cbText);

    const actionRow = document.createElement('div');
    Object.assign(actionRow.style, {
      marginTop: '8px',
      display: 'flex',
      justifyContent: 'flex-end',
    });

    const dismissBtn = document.createElement('button');
    dismissBtn.type = 'button';
    dismissBtn.textContent = 'Dismiss';
    Object.assign(dismissBtn.style, {
      cursor: 'pointer',
      border: '2px solid #000',
      background: '#ffffff',
      borderRadius: '10px',
      padding: '5px 10px',
      fontWeight: '800',
      fontSize: '11px',
      fontFamily: '"Rock Sans", sans-serif',
    });

    actionRow.appendChild(dismissBtn);

    const removeToast = () => {
      if (cb.checked) writePref(true);
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      setTimeout(() => toast.remove(), 220);
    };

    closeBtn.addEventListener('click', removeToast);
    dismissBtn.addEventListener('click', removeToast);

    toast.appendChild(topRow);
    toast.appendChild(msg);
    toast.appendChild(checkboxRow);
    toast.appendChild(actionRow);

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });
  });
}

// ✅ Updated function: only change is calling showPoHideTipMessage() after Po hides
function playSmokeAndHidePo(doneCb) {
  const mw = document.getElementById('poHelper');
  if (!mw || smokeInProgress) { doneCb?.(); return; }
  smokeInProgress = true;

  const rect = mw.getBoundingClientRect();
  const scale = 2.3;
  const boxW = rect.width * scale;
  const boxH = rect.height * scale;

  const smoke = new Image();
  smoke.src = SMOKEBOMB_URL;
  smoke.alt = '';
  Object.assign(smoke.style, {
    position: 'fixed',
    zIndex: String(SMOKE_Z),
    pointerEvents: 'none',
    userSelect: 'none',
    willChange: 'transform, opacity',
  });

  smoke.onload = () => {
    const iw = smoke.naturalWidth || 1;
    const ih = smoke.naturalHeight || 1;
    const ratio = iw / ih;

    let w, h;
    if (boxW / boxH < ratio) {
      w = boxW;
      h = w / ratio;
    } else {
      h = boxH;
      w = h * ratio;
    }

    const left = rect.left + (rect.width - w) / 2;
    const top  = rect.top  + (rect.height - h) / 2;

    smoke.style.left = `${left}px`;
    smoke.style.top  = `${top}px`;
    smoke.style.width = `${w}px`;
    smoke.style.height = `${h}px`;

    document.body.appendChild(smoke);

    const prevZ = mw.style.zIndex;
    mw.style.zIndex = String(PO_BELOW_SMOKE_Z);
    mw.style.transition = '';
    mw.style.opacity = '1';

    const fadeTimer = setTimeout(() => {
      mw.style.transition = `opacity ${PO_FADE_DURATION_MS}ms ease`;
      mw.style.opacity = '0';
    }, PO_FADE_START_MS);

    const hideTimer = setTimeout(() => {
      mw.style.display = 'none';
      mw.style.opacity = '1';
      mw.style.zIndex = prevZ || '';
      smoke.remove();
      smokeInProgress = false;

      showPoHideTipMessage();
      doneCb?.();
    }, SMOKEBOMB_MS + SMOKE_TAIL_BUFFER_MS);

    const observer = new MutationObserver(() => {
      if (!document.body.contains(mw)) {
        clearTimeout(fadeTimer);
        clearTimeout(hideTimer);
        smoke.remove();
        smokeInProgress = false;
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  setTimeout(() => {
    if (!document.body.contains(smoke)) {
      smokeInProgress = false;
      doneCb?.();
    }
  }, SMOKEBOMB_MS + SMOKE_TAIL_BUFFER_MS + 250);
}

function addGifToggle() {
  chrome.storage.sync.get(['reportName'], function (result) {
chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "po_loaded", data: { current_page: currentDomain}});
})
function prettyTutorialName(raw) {
    if (!raw) return 'Intro';

    const s = String(raw).trim().toLowerCase();

    const exact = {
      'bi-inbox': 'Inbox',
      'bw-schedule': 'Scheduling',
      'basic': 'Basic',
      'default': 'Intro',
      'design': 'Design',
    };
    if (exact[s]) return exact[s];

    const last = s.split('-').pop() || s;
    return last.charAt(0).toUpperCase() + last.slice(1);
  }

  // Keep a stable reference so removeListener works
  function onActiveTutorialChanged(changes, areaName) {
    if (areaName !== 'sync') return;
    if (!changes.activeTutorial) return;

    const pretty = prettyTutorialName(changes.activeTutorial.newValue);
    const label = document.getElementById('poTutorialLabel');
    if (label) label.setAttribute('data-tooltip', `Start ${pretty} Tutorial`);
  }

  chrome.storage.sync.get(['showPo', 'activeTutorial'], function (result) {
    const showPo = result.showPo;
    const activeTutorial = result.activeTutorial;
    const currentDomain = window.location.hostname;

    if (
      (window !== window.top) ||
      (window === window.top && currentDomain === 'portal.example.com' && showPo === true)
    ) {
      closeAllGifs();

      /* ===============================
         Po Wrapper
      =============================== */
      const poWrapper = document.createElement('div');
      poWrapper.id = 'poHelper';
      poWrapper.classList.add('gif');
      Object.assign(poWrapper.style, {
        position: 'fixed',
        left: 'calc(100% - 175px)',
        top: 'calc(100% - 152px)',
        zIndex: 2147483647,
        pointerEvents: 'none',
      });

      /* ===============================
        Po GIF
      =============================== */
      const gifElement = document.createElement('img');
      gifElement.src = chrome.runtime.getURL('gifs/minimized.gif');
      gifElement.id = 'poElement';

      Object.assign(gifElement.style, {
        position: 'relative',
        width: '130px',
        cursor: 'pointer',
        pointerEvents: 'auto',
        transition: 'opacity 0.3s ease',
      });

  // Append the minion and chat bubble to the wrapper
    poWrapper.appendChild(gifElement);
    chrome.storage.local.get(['showPo'], (result) => {
  if (result.showPo) {
    return; // Do not show the bubble
  }
    if (document.querySelector('#ListingURE_content') || (document.querySelector('#navNodeAnchor_1_1'))) {
    poWrapper.appendChild(chatBubble);
    }
chatBubble.style.transition = 'opacity 0.3s ease';

// Fade in
setTimeout(() => {
  chatBubble.style.opacity = '1';
  chatBubble.style.pointerEvents = 'auto';
}, 500);

// Fade out
setTimeout(() => {
  chatBubble.style.opacity = '0';
  chatBubble.style.pointerEvents = 'none';

  setTimeout(() => {
    if (chatBubble.parentNode) {
      chatBubble.parentNode.removeChild(chatBubble);
    }
  }, 300); // match transition duration
}, 5000);
    });

createPoHelpButton(poWrapper, "YOUR_INTRANET_GUIDE_URL");

      /* ===============================
        GIF replay cooldown logic
      =============================== */
      let poGifLocked = false;
      const PO_GIF_COOLDOWN_MS = 3000;

      function playPoGifOnce() {
        if (poGifLocked) return;
        poGifLocked = true;

        const src = gifElement.src;
        gifElement.src = '';
        gifElement.src = src;

        setTimeout(() => {
          poGifLocked = false;
        }, PO_GIF_COOLDOWN_MS);
      }

      /* ===============================
        Hover behavior
      =============================== */
      gifElement.addEventListener('pointerenter', () => {
chrome.storage.sync.get(['activeTutorial','reportName'], function (result) {
    chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "po_hover", data: { tutorial: result.activeTutorial, report_name: result.reportName} });
    });  
        playPoGifOnce();
      });

      gifElement.addEventListener('pointerleave', () => {
        gifElement.style.opacity = '0.9';
      });

      // --- Po radial menu container ---
      const poMenu = document.createElement('div');
      poMenu.className = 'po-radial-wrapper';

      // Build menu first (label must exist before we set its tooltip)
      poMenu.innerHTML = `
        <div class="po-subs">
          <button class="po-sub-circle" data-action="tutorials">
            <label id="poTutorialLabel" data-tooltip="Start Tutorial"><span>🎓</span></label>
          </button>
          <button class="po-sub-circle" data-action="tools">
            <label data-tooltip="Settings"><span>⚙️</span></label>
          </button>
        </div>
      `;

      // IMPORTANT: wrapper must accept clicks
      poWrapper.style.pointerEvents = 'auto';

      // Assemble ONCE
      poWrapper.appendChild(gifElement);
      poWrapper.appendChild(poMenu);
      document.body.appendChild(poWrapper);

      // Set initial tooltip text using synced activeTutorial
      (function setInitialTutorialTooltip() {
        const pretty = prettyTutorialName(activeTutorial);
        const label = document.getElementById('poTutorialLabel');
        if (label) label.setAttribute('data-tooltip', `Start ${pretty} Tutorial`);
      })();

      // Live update tooltip if activeTutorial changes later
      chrome.storage.onChanged.removeListener(onActiveTutorialChanged);
      chrome.storage.onChanged.addListener(onActiveTutorialChanged);

      /* ===============================
         Outside-click handling
      =============================== */
      function closePoMenu() {
        poMenu.classList.remove('open');
        document.removeEventListener('click', handleOutsideClick, true);
      }

      function handleOutsideClick(e) {
        if (poWrapper.contains(e.target)) return;
        closePoMenu();
      }

      /* ===============================
         Drag Logic (UNCHANGED)
      =============================== */
      let isDragging = false;
      let hasMoved = false;
      let startX, startY;

      function onPointerMove(e) {
        if (!isDragging) return;
        hasMoved = true;

        const wrapperWidth = poWrapper.offsetWidth;
        const wrapperHeight = poWrapper.offsetHeight;

        let newLeft = e.clientX - startX;
        let newTop = e.clientY - startY;

        newLeft = Math.max(-40, Math.min(newLeft, window.innerWidth - wrapperWidth + 40));
        newTop = Math.max(-40, Math.min(newTop, window.innerHeight - wrapperHeight + 40));

        poWrapper.style.left = (newLeft / window.innerWidth) * 100 + 'vw';
        poWrapper.style.top = (newTop / window.innerHeight) * 100 + 'vh';
    
      }

      function onPointerUp(e) {
        isDragging = false;

        poWrapper.releasePointerCapture(e.pointerId);
        poWrapper.removeEventListener('pointermove', onPointerMove);
        poWrapper.removeEventListener('pointerup', onPointerUp);

        if (!hasMoved) {
          togglePoMenu();
          chrome.storage.local.set({ showPo: true });
          chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "po_click", data: { po_click: "po_click"} });

  setTimeout(() => { handlePoFeedbackPrompt(activeTutorial); }, 450);
        }

        setTimeout(() => (hasMoved = false), 0);
      }

      gifElement.addEventListener('pointerdown', (e) => {
        chrome.storage.sync.get(['activeTutorial'], function(result) {

    chrome.runtime.sendMessage({
      type: "LOG_EVENT",
      event: "po_drag",
      data: {
        tutorial: result.activeTutorial
      }
    });})
        isDragging = true;
        hasMoved = false;
        startX = e.clientX - poWrapper.offsetLeft;
        startY = e.clientY - poWrapper.offsetTop;
        poWrapper.setPointerCapture(e.pointerId);
        poWrapper.addEventListener('pointermove', onPointerMove);
        poWrapper.addEventListener('pointerup', onPointerUp);
        e.preventDefault();
      });

 
      /* ===============================
         Click Po → Toggle Menu
      =============================== */
      function togglePoMenu() {
        const isOpening = !poMenu.classList.contains('open');

        poMenu.classList.toggle('open');

        if (isOpening) {
          setTimeout(() => {
            document.addEventListener('click', handleOutsideClick, true);
          }, 0);
        } else {
          closePoMenu();
        }
      }

      gifElement.addEventListener('click', () => {
        if (hasMoved) return;
        togglePoMenu();
        chrome.storage.local.set({ showPo: true });
  setTimeout(() => { handlePoFeedbackPrompt(activeTutorial); }, 450);
      });

      /* ===============================
         Menu Actions
      =============================== */
      poMenu.addEventListener('click', (e) => {
        const btn = e.target.closest('.po-sub-circle');
        if (!btn) return;

        e.stopPropagation();
        closePoMenu();

        const action = btn.dataset.action;

        if (action === 'tutorials') {
          gifClicked = true;
          console.log('Launching tutorial flow');
          chrome.storage.sync.set({ popupsEnabled: true }, () => {
            closeAllPopups();

            chrome.storage.sync.get(['reportName','activeTutorial'], (r) => {
              if (r.reportName) {
                chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "tutorial_start", data: { source: "Po", tutorial: r.activeTutorial, report_name: r.reportName} });
                displayPopups(r.reportName, true);
              } else {
                chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "tutorial_start", data: { source: "Po", tutorial: r.activeTutorial, report_name: "none"} });
                displayPopups(null, true);
              }
              gifClicked = false;
            });
          });
        }

        if (action === 'tools') {
  toggleSettingsDropdown(e);
    chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "settings_click", data: { source: "Po", tutorial: activeTutorial} });

  function settingsMenu() {
    (function () {
      // Remove existing widget if already created
      let oldWidget = document.getElementById("id-converter-widget");
      if (oldWidget) oldWidget.remove();

      // Create container
      const container = document.createElement("div");
      container.id = "id-converter-widget";
      container.style.position = "fixed";
      container.style.top = "250px";
      container.style.right = "20px";
      container.style.zIndex = "999999";
      container.style.background = "white";
      container.style.border = "1px solid #ccc";
      container.style.padding = "10px";
      container.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      container.style.fontFamily = "sans-serif";
      container.style.width = "250px";

      // Textarea
      const textarea = document.createElement("textarea");
      textarea.placeholder = "Paste IDs here...";
      textarea.style.width = "100%";
      textarea.style.height = "100px";

      // Create close button
      const closeBtn = document.createElement("div");
      closeBtn.textContent = "✖";
      closeBtn.style.position = "absolute";
      closeBtn.style.padding = "10px";
      closeBtn.style.top = "5px";
      closeBtn.style.right = "8px";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.fontSize = "14px";
      closeBtn.style.color = "#555";
      closeBtn.title = "Close";

      closeBtn.onclick = () => {
        container.remove();
      };

      // Button
      const button = document.createElement("button");
      button.textContent = "Convert & Copy";
      button.style.width = "100%";
      button.style.padding = "6px";
      button.style.cursor = "pointer";

      // Result message
      const msg = document.createElement("div");
      msg.style.marginTop = "8px";
      msg.style.fontSize = "12px";
      msg.style.color = "green";

      // Add elements
      container.appendChild(textarea);
      container.appendChild(closeBtn);
      container.appendChild(button);
      container.appendChild(msg);
      document.body.appendChild(container);

      button.onclick = async () => {
        const input = textarea.value.trim();
        if (!input) {
          msg.textContent = "Please paste some IDs first.";
          msg.style.color = "red";
          return;
        }

        const converted = input.split(/\s+/).join(";");

        try {
          await navigator.clipboard.writeText(converted);
          msg.textContent = "Converted & copied to clipboard!";
          msg.style.color = "green";
        } catch (err) {
          msg.textContent = "Failed to copy. Check clipboard permissions.";
          msg.style.color = "red";
        }
      };
    })();
  }

  // --- Settings dropdown -----------------------------

  // Helper: close any existing dropdown
  function closeSettingsDropdown() {
    const existing = document.getElementById("hall-settings-dropdown");
    if (existing) existing.remove();
    document.removeEventListener("click", outsideClickClose, true);
    document.removeEventListener("keydown", escClose, true);
    window.removeEventListener("scroll", closeSettingsDropdown, true);
  }

  function outsideClickClose(e) {
    const dd = document.getElementById("hall-settings-dropdown");
    if (!dd) return;
    // If click is outside the dropdown and not the settings button, close
    if (!dd.contains(e.target) && e.target !== poWrapper) closeSettingsDropdown();
  }

  function escClose(e) {
    if (e.key === "Escape") closeSettingsDropdown();
  }

  function positionDropdownRelativeToButton(dropdown) {
    const rect = poWrapper.getBoundingClientRect();
    // position just below-right of the settings button
    dropdown.style.position = "fixed";
    dropdown.style.top = `${Math.round(rect.top - 60)}px`;
    dropdown.style.left = `${Math.round(rect.left - 120)}px`;
  }

  // Create / toggle dropdown
  function toggleSettingsDropdown(e) {
    // Prevent accidental open after a drag:
    if (typeof hasMoved !== "undefined" && hasMoved) return;

    const existing = document.getElementById("hall-settings-dropdown");
    if (existing) {
      closeSettingsDropdown();
      return;
    }

    const menu = document.createElement("div");
    menu.id = "hall-settings-dropdown";
    menu.setAttribute("role", "menu");

    // Basic styling (tweak as you like)
    Object.assign(menu.style, {
      zIndex: "100005",
      minWidth: "220px",
      background: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      borderRadius: "8px",
      fontFamily: "Rock Sans",
      fontSize: "14px",
      padding: "6px",
    });

    const itemBase = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      padding: "8px 2px",
      borderRadius: "6px",
      cursor: "pointer",
      userSelect: "none",
    };

    function makeItem(label, onClick) {
      const el = document.createElement("div");
      Object.assign(el.style, itemBase);
      el.setAttribute("role", "menuitem");
      el.textContent = label;

      // hover/focus styles
      el.addEventListener("mouseenter", () => (el.style.background = "rgba(0,0,0,0.06)"));
      el.addEventListener("mouseleave", () => (el.style.background = "transparent"));

      el.addEventListener("click", (evt) => {
        evt.stopPropagation();
        closeSettingsDropdown();
        onClick();
      });

      el.tabIndex = 0;
      el.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          evt.preventDefault();
          el.click();
        }
      });

      return el;
    }

    // Items
    const hidePoItem = makeItem("Hide Po", () => {
      console.log("Hide Po");
      chrome.storage.sync.set({ showPo: false }, () => {
        chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "po_hide_click", data: { source: "Po", showPo: showPo} });
        playSmokeAndHidePo();
      });
    });

    const idFormatterItem = makeItem("Multiple ID Formatter", () => {
      // Calls your existing widget launcher
      chrome.runtime.sendMessage({ type: "LOG_EVENT", event: "po_multiple_id_formatter_click", data: { source: "Po"} });
      settingsMenu();
    });

    menu.appendChild(hidePoItem);
    menu.appendChild(idFormatterItem);

    document.body.appendChild(menu);
    positionDropdownRelativeToButton(menu);

    // Close on outside click / Esc / scroll
    setTimeout(() => {
      document.addEventListener("click", outsideClickClose, true);
      document.addEventListener("keydown", escClose, true);
      window.addEventListener("scroll", closeSettingsDropdown, true);
    }, 0);
  }

  // If your UI reflows or button moves (e.g., window resize), keep dropdown aligned
  window.addEventListener("resize", () => {
    const dd = document.getElementById("hall-settings-dropdown");
    if (!dd) return;
    positionDropdownRelativeToButton(dd);
  });
}

if (action === 'settings') {
  toggleSettingsDropdown(e);

  function settingsMenu() {
    (function () {
      // Remove existing widget if already created
      let oldWidget = document.getElementById("id-converter-widget");
      if (oldWidget) oldWidget.remove();

      // Create container
      const container = document.createElement("div");
      container.id = "id-converter-widget";
      container.style.position = "fixed";
      container.style.top = "250px";
      container.style.right = "20px";
      container.style.zIndex = "999999";
      container.style.background = "white";
      container.style.border = "1px solid #ccc";
      container.style.padding = "10px";
      container.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
      container.style.fontFamily = "sans-serif";
      container.style.width = "250px";

      // Textarea
      const textarea = document.createElement("textarea");
      textarea.placeholder = "Paste IDs here...";
      textarea.style.width = "100%";
      textarea.style.height = "100px";

      // Create close button
      const closeBtn = document.createElement("div");
      closeBtn.textContent = "✖";
      closeBtn.style.position = "absolute";
      closeBtn.style.padding = "10px";
      closeBtn.style.top = "5px";
      closeBtn.style.right = "8px";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.fontSize = "14px";
      closeBtn.style.color = "#555";
      closeBtn.title = "Close";

      closeBtn.onclick = () => {
        container.remove();
      };

      // Button
      const button = document.createElement("button");
      button.textContent = "Convert & Copy";
      button.style.width = "100%";
      button.style.padding = "6px";
      button.style.cursor = "pointer";

      // Result message
      const msg = document.createElement("div");
      msg.style.marginTop = "8px";
      msg.style.fontSize = "12px";
      msg.style.color = "green";

      // Add elements
      container.appendChild(textarea);
      container.appendChild(closeBtn);
      container.appendChild(button);
      container.appendChild(msg);
      document.body.appendChild(container);

      button.onclick = async () => {
        const input = textarea.value.trim();
        if (!input) {
          msg.textContent = "Please paste some IDs first.";
          msg.style.color = "red";
          return;
        }

        const converted = input.split(/\s+/).join(";");

        try {
          await navigator.clipboard.writeText(converted);
          msg.textContent = "Converted & copied to clipboard!";
          msg.style.color = "green";
        } catch (err) {
          msg.textContent = "Failed to copy. Check clipboard permissions.";
          msg.style.color = "red";
        }
      };
    })();
  }

  // --- Settings dropdown -----------------------------

  // Helper: close any existing dropdown
  function closeSettingsDropdown() {
    const existing = document.getElementById("hall-settings-dropdown");
    if (existing) existing.remove();
    document.removeEventListener("click", outsideClickClose, true);
    document.removeEventListener("keydown", escClose, true);
    window.removeEventListener("scroll", closeSettingsDropdown, true);
  }

  function outsideClickClose(e) {
    const dd = document.getElementById("hall-settings-dropdown");
    if (!dd) return;
    // If click is outside the dropdown and not the settings button, close
    if (!dd.contains(e.target) && e.target !== poWrapper) closeSettingsDropdown();
  }

  function escClose(e) {
    if (e.key === "Escape") closeSettingsDropdown();
  }

  function positionDropdownRelativeToButton(dropdown) {
    const rect = poWrapper.getBoundingClientRect();
    // position just below-right of the settings button
    dropdown.style.position = "fixed";
    dropdown.style.top = `${Math.round(rect.top - 60)}px`;
    dropdown.style.left = `${Math.round(rect.left - 120)}px`;
  }

  // Create / toggle dropdown
  function toggleSettingsDropdown(e) {
    // Prevent accidental open after a drag:
    if (typeof hasMoved !== "undefined" && hasMoved) return;

    const existing = document.getElementById("hall-settings-dropdown");
    if (existing) {
      closeSettingsDropdown();
      return;
    }

    const menu = document.createElement("div");
    menu.id = "hall-settings-dropdown";
    menu.setAttribute("role", "menu");

    // Basic styling (tweak as you like)
    Object.assign(menu.style, {
      zIndex: "100005",
      minWidth: "220px",
      background: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      borderRadius: "8px",
      fontFamily: "Rock Sans",
      fontSize: "14px",
      padding: "6px",
    });

    const itemBase = {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      width: "100%",
      padding: "8px 2px",
      borderRadius: "6px",
      cursor: "pointer",
      userSelect: "none",
    };

    function makeItem(label, onClick) {
      const el = document.createElement("div");
      Object.assign(el.style, itemBase);
      el.setAttribute("role", "menuitem");
      el.textContent = label;

      // hover/focus styles
      el.addEventListener("mouseenter", () => (el.style.background = "rgba(0,0,0,0.06)"));
      el.addEventListener("mouseleave", () => (el.style.background = "transparent"));

      el.addEventListener("click", (evt) => {
        evt.stopPropagation();
        closeSettingsDropdown();
        onClick();
      });

      el.tabIndex = 0;
      el.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          evt.preventDefault();
          el.click();
        }
      });

      return el;
    }

    // Items
    const hidePoItem = makeItem("Hide Po", () => {
      console.log("Hide Po");
      chrome.storage.sync.set({ showPo: false }, () => {
        playSmokeAndHidePo();
      });
    });

    const idFormatterItem = makeItem("Multiple ID Formatter", () => {
      // Calls your existing widget launcher
      settingsMenu();
    });

    menu.appendChild(hidePoItem);

    document.body.appendChild(menu);
    positionDropdownRelativeToButton(menu);

    // Close on outside click / Esc / scroll
    setTimeout(() => {
      document.addEventListener("click", outsideClickClose, true);
      document.addEventListener("keydown", escClose, true);
      window.addEventListener("scroll", closeSettingsDropdown, true);
    }, 0);
  }

  // If your UI reflows or button moves (e.g., window resize), keep dropdown aligned
  window.addEventListener("resize", () => {
    const dd = document.getElementById("hall-settings-dropdown");
    if (!dd) return;
    positionDropdownRelativeToButton(dd);
  });
}
      });
    }
  });
}

window.onload = function() {
    if (window !== window.top) {
  checkPage();
    }
  // Retrieve the value of 'popupsEnabled' from chrome.storage.sync
  chrome.storage.sync.get(['popupsEnabled', 'showPo'], function(result) {
    let showPo = result.showPo;
    let popupsEnabled = result.popupsEnabled;
    console.log('popupsEnabled = ' + popupsEnabled);
    console.log(currentDomain + " " + correctDomain + " " + targetDomain);

    if (popupsEnabled !== undefined) { // If popupsEnabled exists
      console.log("Window loaded");
      console.log('popupsEnabled = ' + popupsEnabled);

      if (popupsEnabled) {
        if (reportPrompt) {
          console.log("HERE IS THE IFRAME ID: " + iframeId);
          setTimeout(() => {
    chrome.storage.sync.get('reportName', function(result) {
      if (result.reportName) {
        reportName = result.reportName;
        //displayPopups(reportName);
      } else {
        console.warn('No reportName found in storage at load.');
      }
    });
  }, 800); // Give the message listener a moment
        }
        popupsEnabled = true;
        displayPopups(currentPageLabel);
        console.log('Displaying Pop-ups');
      } else {
                  if ((bwClassic) && (showPo)) {
            addGifToggle(); // Initialize the gif toggle on load
            console.log('Displaying Minion in Classic BW');
          } else
        if (correctDomain) {
          console.log('BW Environment Loaded');
          console.log(iframeId);
            addGifToggle(); // Initialize the gif toggle on load
            console.log('Displaying Minion');
        } else {
          console.log('Domain not BW');
        }
      }
    } else { // First-time run or no value found
      console.log('popupsEnabled was undefined...first time run');
      popupsEnabled = false; // Default to false
      showPo = true;
      console.log('Popups disabled');

       if ((new Date()) < (new Date('03/01/2026'))) {
   document.dispatchEvent(new CustomEvent('hall:inboxMessage', {
      detail: {
        id: 'bw-pilot',
        title: 'Dear Pilot Tester',
        body: 'Thank you for helping bring the <b>Training Hall</b> to life.<br><br> Enter BW to begin your journey and receive your exclusive <b>Hall Founder Badge</b>.<br><br> Click the <b>Tutorials</b> tab to activate other lessons and earn more badges!<br><br>- Master Shifu',
        date: formatMDY() // optional; defaults to today
      }
    }
  ))};

    document.dispatchEvent(new CustomEvent('hall:inboxMessage', {
      detail: {
        id: 'bw-welcome',
        title: 'Welcome to BW!',
        body: `Welcome, <b>Po's Pupil!</b> <br><br> Your journey to mastery begins now. <br><br>Start by completing the <button id="digest-cta" class="hall-link-btn">BW Basic Tutorial!</button> <br><br>It will guide you through the fundamentals of BW reporting and set the foundation for your growth in the <b>Hall</b>.<br><br> - Master Shifu`,
        date: formatMDY() // optional; defaults to today
      }
    }
  ));
      if (bwClassic)  {
            chrome.storage.sync.set({ 'showPo': true }, function() {
              addGifToggle(); // Initialize the gif toggle on load
        console.log("Initial showPo value saved as true");
      });
            console.log('Displaying Minion in Classic BW');
          } else if (correctDomain) {
            chrome.storage.sync.set({ 'showPo': true }, function() {
              addGifToggle(); // Initialize the gif toggle on load
        console.log("Initial showPo value saved as true");
      });
      console.log('Displaying Minion in BW 4.3');
          }
      // Save the default value to storage
      chrome.storage.sync.set({ 'popupsEnabled': false }, function() {
        console.log("Initial popupsEnabled value saved as false");
      });
chrome.storage.sync.set({ 'showPo': true }, function() {
        console.log("Initial showPo value saved as true");
      });
    }
  });
};

function waitForAnyElement(selectors, callback) {
  const intervalId = setInterval(() => {
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(intervalId);
        callback(element);
        return;
      }
    }


  }, 500);
}
