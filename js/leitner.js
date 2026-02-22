class LeitnerSystem {
    constructor() {
        this.storageKey = "buzzcut_learning_data";
        this.cards = JSON.parse(localStorage.getItem(this.storageKey)) || [];
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cards));
    }

    
    getDecks() {
        
        const decks = [...new Set(this.cards.map(c => c.deck || "Default"))];
        if (decks.length === 0) return ["Default"];
        return decks;
    }

    addCard(front, back, deckName) {
        const newCard = {
            id: Date.now(),
            front: front.trim(),
            back: back.trim(),
            box: 1,
            nextReview: Date.now(),
            deck: deckName || "Default"
        };
        this.cards.push(newCard);
        this.save();
    }

    getNextCard(deckName) {
        const now = Date.now();
        
        const deckCards = this.cards.filter(c => (c.deck || "Default") === deckName);
        const dueCards = deckCards.filter(c => c.nextReview <= now);

        if (dueCards.length === 0) return null;

        dueCards.sort((a, b) => a.box - b.box);
        return dueCards[0]; 
    }

    recordResult(cardId, success) {
        const card = this.cards.find(c => c.id === cardId);
        if (!card) return;

        const ONE_DAY = 24 * 60 * 60 * 1000;
        const intervals = {
            1: 0,           
            2: 1 * ONE_DAY, 
            3: 3 * ONE_DAY, 
            4: 7 * ONE_DAY, 
            5: 14 * ONE_DAY 
        };

        if (success) {
            card.box = Math.min(card.box + 1, 5);
        } else {
            card.box = 1;
        }

        card.nextReview = Date.now() + intervals[card.box];
        this.save();
    }

    
    deleteDeck(deckName) {
        
        this.cards = this.cards.filter(c => (c.deck || "Default") !== deckName);
        this.save();
    }
    
    exportData() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.cards));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "buzzcut_learning_backup.json");
        document.body.appendChild(downloadAnchorNode); 
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    importData(jsonString) {
        try {
            const parsed = JSON.parse(jsonString);
            if (Array.isArray(parsed)) {
                this.cards = parsed.map(c => ({
                    ...c,
                    nextReview: c.nextReview || Date.now(),
                    deck: c.deck || "Default" 
                }));
                this.save();
                return true;
            }
        } catch (e) {
            console.error("Invalid JSON file");
        }
        return false;
    }
}
