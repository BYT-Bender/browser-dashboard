const rootDir = "images/link-card/";
const defaultIcon = `${rootDir}globe.svg`;

// Default link cards
const defaultLinks = [
    {
        title: "VS Code",
        icon: "visual-studio-code-icon.svg",
        url: "https://vscode.dev/",
        bg: "#242525"
    },
    {
        title: "GitHub",
        icon: "github-icon.svg",
        url: "https://github.com/",
        bg: "#22262a"
    },
    {
        title: "G-Drive",
        icon: "google-drive-color-icon.svg",
        url: "https://drive.google.com/",
        bg: null
    },
    {
        title: "Gmail",
        icon: "gmail-icon.svg",
        url: "https://mail.google.com/",
        bg: null
    },
    {
        title: "LinkedIn",
        icon: "linkedin-app-icon.svg",
        url: "https://www.linkedin.com/",
        bg: "#0a66c2"
    },
    // {
    //     title: "Stack Overflow",
    //     icon: "stackoverflow-color-icon.svg",
    //     url: "https://stackoverflow.com/",
    //     bg: null
    // },
    {
        title: "YouTube",
        icon: "YouTube_full-color_icon.svg",
        url: "https://www.youtube.com/",
        bg: "#fff"
    },
    {
        title: "Chat-GPT",
        icon: "openai-icon.svg",
        url: "https://chat.openai.com/",
        bg: "#10a37f"
    },
    {
        title: "Discord",
        icon: "discord-color-icon.svg",
        url: "https://discord.com/channels/@me",
        bg: "#5865f2"
    },
    {
        title: "WhataApp",
        icon: "whatsapp-color-icon.svg",
        url: "https://web.whatsapp.com/",
        bg: "#25d366"
    }
    // {
    //     title: "Yahoo",
    //     icon: "yahoo-icon.svg",
    //     url: "https://mail.yahoo.com/",
    //     bg: "#5f01d1"
    // }
];

const links = JSON.parse(localStorage.getItem("quickAccessLinks")) || defaultLinks;

const quickAccessWrapper = document.getElementById("quick-access-wrapper");
const AddLinkCardMenu = document.getElementById("add-card-form");
const linkCardMenuCloseBtn = document.getElementById("link-card-menu-close-btn");
const muteBgEffect = document.getElementsByClassName("mute-bg-effect")[0];

// Utility function to toggle classes and attributes
function toggleMenu(menu, state) {
    const isActive = state === "show";
    menu.querySelectorAll("input, button").forEach(item => {
        item.disabled = !isActive;
    });
    menu.classList.toggle("active", isActive);
    muteBgEffect.classList.toggle("active", isActive);
}

function resetAddLinkCardMenu() {
    AddLinkCardMenu.reset();
    AddLinkCardMenu.removeAttribute("data-edit-index");
}

function saveToStorage() {
    try {
        localStorage.setItem("quickAccessLinks", JSON.stringify(links));
    } catch (e) {
        alert("Failed to save data. Local storage might be full.");
    }
}

// Show add/edit link card menu
function showAddLinkCardMenu() {
    const isEdit = AddLinkCardMenu.dataset.hasOwnProperty("editIndex");
    AddLinkCardMenu.querySelector("header span").textContent = isEdit ? "Edit Quick Access Card" : "Add Quick Access Card";
    AddLinkCardMenu.querySelector('button[type="submit"]').textContent = isEdit ? "Edit Card" : "Add Card";
    toggleMenu(AddLinkCardMenu, "show");
}

// Hide add/edit link card menu
function hideAddLinkCardMenu() {
    resetAddLinkCardMenu();
    toggleMenu(AddLinkCardMenu, "hide");
}

// Close add/edit link card menu on outside clicks
document.addEventListener("click", (e) => {
    const clickedOutsideMenu = !AddLinkCardMenu.contains(e.target) && !e.target.closest("#add-link-card-btn") && !e.target.closest(".context-menu") && !e.target.closest("#link-card-menu-close-btn");
    if (clickedOutsideMenu) hideAddLinkCardMenu();
    if (currentContextMenu && !currentContextMenu.contains(e.target)) closeContextMenu();
});

let currentContextMenu = null;

document.addEventListener("click", closeContextMenu);
linkCardMenuCloseBtn.addEventListener("click", hideAddLinkCardMenu);

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (!AddLinkCardMenu.classList.contains("active")) return;

    if (e.key === "Enter") {
        e.preventDefault();
        AddLinkCardMenu.dispatchEvent(new Event("submit"));
    } else if (e.key === "Escape") {
        hideAddLinkCardMenu();
    }
});

// Right-click context menu
function showContextMenu(e, index) {
    e.preventDefault();
    if (currentContextMenu) currentContextMenu.remove();

    // Set the current card index for further operations
    currentCardIndex = index;

    // Create the context menu
    const contextMenu = document.createElement("div");
    contextMenu.classList.add("context-menu");
    contextMenu.style.left = `${e.pageX}px`;
    contextMenu.style.top = `${e.pageY}px`;

    contextMenu.innerHTML = `
        <ul>
            <li id="edit-card">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                </div>
                <span>Edit Card</span>
            </li>
            <li id="delete-card">
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </div>
                <span>Delete Card</span>
            </li>
        </ul>
    `;

    document.body.appendChild(contextMenu);

    currentContextMenu = contextMenu;

    // Edit and delete actions
    document.getElementById("edit-card").addEventListener("click", () => {
        editCard(index);
        closeContextMenu();
    });
    document.getElementById("delete-card").addEventListener("click", () => {
        deleteCard(index);
        closeContextMenu();
    });
}

function closeContextMenu() {
    if (currentContextMenu) {
        currentContextMenu.remove();
        currentContextMenu = null;
    }
}

function editCard(index) {
    const card = links[index];
    document.getElementById("title").value = card.title;
    document.getElementById("icon").value = card.icon;
    document.getElementById("url").value = card.url;
    document.getElementById("bg").value = card.bg || "";

    AddLinkCardMenu.setAttribute("data-edit-index", index);
    showAddLinkCardMenu();
}

function deleteCard(index) {
    links.splice(index, 1);
    saveToStorage();
    renderCards();
}

function renderCards() {
    quickAccessWrapper.innerHTML = "";
    
    links.forEach((link, index) => {
        const element = document.createElement('a');
        element.setAttribute("target", "_blank");
        element.href = link.url;
        element.innerHTML = `
                    <div class="card" oncontextmenu="showContextMenu(event, ${index})">
                        <div class="icon">
                            <img src="${rootDir + link.icon}" alt="${link.title}" onerror="this.src='${defaultIcon}'">
                        </div>
                        <span>${link.title}</span>
                    </div>
                `;
        quickAccessWrapper.appendChild(element);
    });

    // Add "Add Link Card" button if space is available
    if (links.length < 10) {
        const addCard = document.createElement('div');
        addCard.classList.add("card");
        addCard.id = "add-link-card-btn";
        addCard.addEventListener("click", showAddLinkCardMenu);
        addCard.innerHTML = `
            <div class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                </svg>
            </div>
        `;
        quickAccessWrapper.appendChild(addCard);
    }
}

AddLinkCardMenu.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const icon = document.getElementById("icon").value;
    const url = document.getElementById("url").value;
    const bg = document.getElementById("bg").value;    

    const editIndex = AddLinkCardMenu.getAttribute("data-edit-index");

    if (links.length >= 10 && !editIndex) {
        alert("You cannot add more than 10 cards.");
        return;
    }

    if (title && icon && url) {
        if (editIndex) {
            links[editIndex] = { title, icon, url, bg: bg || null };
        } else {
            links.push({ title, icon, url, bg: bg || null });
        }

        saveToStorage();
        hideAddLinkCardMenu();
        renderCards();
    }
});

renderCards();