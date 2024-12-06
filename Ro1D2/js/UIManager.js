class UIManager {
    /**
     * @param {Object} game - The main Game instance.
     */
    constructor(game) {
        this.game = game;

        // Cache frequently accessed UI elements
        this.inventoryElement = document.getElementById('inventory');
        this.statsElement = document.getElementById('stats');
        this.helpWindowElement = document.getElementById('helpWindow');
        this.bestiaryElement = document.getElementById('bestiary');
        this.questLogElement = document.getElementById('questLog');
        this.skillTreeElement = document.getElementById('skillTree');
        this.adminConsoleElement = document.getElementById('adminConsole');
        this.fullscreenMapElement = document.getElementById('fullscreenMap');

        // Track states of UI windows
        this.inventoryOpen = false;
        this.statsOpen = false;
        this.helpOpen = false;
        this.bestiaryOpen = false;
        this.questLogOpen = false;
        this.skillTreeOpen = false;
        this.adminConsoleOpen = false;
        this.fullscreenMapOpen = false;
    }

    init() {
        // Initialize default UI states if needed
        this.hideAllUI();
    }

    hideAllUI() {
        if (this.inventoryElement) this.inventoryElement.style.display = 'none';
        if (this.statsElement) this.statsElement.style.display = 'none';
        if (this.helpWindowElement) this.helpWindowElement.style.display = 'none';
        if (this.bestiaryElement) this.bestiaryElement.style.display = 'none';
        if (this.questLogElement) this.questLogElement.style.display = 'none';
        if (this.skillTreeElement) this.skillTreeElement.style.display = 'none';
        if (this.adminConsoleElement) this.adminConsoleElement.style.display = 'none';
        if (this.fullscreenMapElement) this.fullscreenMapElement.style.display = 'none';

        this.inventoryOpen = false;
        this.statsOpen = false;
        this.helpOpen = false;
        this.bestiaryOpen = false;
        this.questLogOpen = false;
        this.skillTreeOpen = false;
        this.adminConsoleOpen = false;
        this.fullscreenMapOpen = false;
    }

    toggleInventory() {
        if (!this.inventoryElement) return;
        this.inventoryOpen = !this.inventoryOpen;
        this.inventoryElement.style.display = this.inventoryOpen ? 'block' : 'none';
    }

    toggleStats() {
        if (!this.statsElement) return;
        this.statsOpen = !this.statsOpen;
        this.statsElement.style.display = this.statsOpen ? 'block' : 'none';
    }

    toggleHelpWindow() {
        if (!this.helpWindowElement) return;
        this.helpOpen = !this.helpOpen;
        this.helpWindowElement.style.display = this.helpOpen ? 'block' : 'none';
    }

    toggleBestiary() {
        if (!this.bestiaryElement) return;
        this.bestiaryOpen = !this.bestiaryOpen;
        this.bestiaryElement.style.display = this.bestiaryOpen ? 'block' : 'none';
    }

    toggleQuestLog() {
        if (!this.questLogElement) return;
        this.questLogOpen = !this.questLogOpen;
        this.questLogElement.style.display = this.questLogOpen ? 'block' : 'none';
    }

    toggleSkillTree() {
        if (!this.skillTreeElement) return;
        this.skillTreeOpen = !this.skillTreeOpen;
        this.skillTreeElement.style.display = this.skillTreeOpen ? 'block' : 'none';
    }

    toggleAdminConsole() {
        if (!this.adminConsoleElement) return;
        this.adminConsoleOpen = !this.adminConsoleOpen;
        this.adminConsoleElement.style.display = this.adminConsoleOpen ? 'block' : 'none';

        // If admin console requires login logic, handle it here
    }

    toggleFullscreenMap() {
        if (!this.fullscreenMapElement) return;
        this.fullscreenMapOpen = !this.fullscreenMapOpen;
        this.fullscreenMapElement.style.display = this.fullscreenMapOpen ? 'block' : 'none';

        if (this.fullscreenMapOpen) {
            // If your game has a method to render the map, call it here
            // e.g. this.game.renderMap();
        }
    }

    closeAllMenus() {
        this.hideAllUI();
    }
}

export default UIManager;
