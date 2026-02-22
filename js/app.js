document.addEventListener("DOMContentLoaded", () => {
    const leitner = new LeitnerSystem();


    const cardText = document.getElementById("card-text");
    const cardBadge = document.getElementById("card-box-badge");
    const btnReveal = document.getElementById("btn-reveal");
    const actionButtons = document.getElementById("action-buttons");
    const btnSuccess = document.getElementById("btn-success");
    const btnFail = document.getElementById("btn-fail");


    const inputFront = document.getElementById("input-front");
    const inputBack = document.getElementById("input-back");
    const btnAdd = document.getElementById("btn-add");


    const deckSelect = document.getElementById("deck-select");
    const btnNewDeck = document.getElementById("btn-new-deck");
    const btnDeleteDeck = document.getElementById("btn-delete-deck");


    const btnExport = document.getElementById("btn-export");
    const inputImport = document.getElementById("input-import");


    const btnViewList = document.getElementById("btn-view-list");
    const reviewSection = document.getElementById("review-section");
    const addSection = document.getElementById("add-section");
    const listSection = document.getElementById("list-section");
    const btnCloseList = document.getElementById("btn-close-list");
    const cardsGrid = document.getElementById("cards-grid");
    const listDeckName = document.getElementById("list-deck-name");

    let currentCard = null;
    let showingFront = true;
    let currentDeck = "Default";

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js").catch(err => console.error("SW Config:", err));
    }


    function updateDeckList() {
        const decks = leitner.getDecks();
        if (currentDeck && !decks.includes(currentDeck)) decks.push(currentDeck);

        deckSelect.innerHTML = "";
        decks.forEach(deck => {
            const option = document.createElement("option");
            option.value = deck;
            option.textContent = deck;
            if (deck === currentDeck) option.selected = true;
            deckSelect.appendChild(option);
        });
    }

    deckSelect.addEventListener("change", (e) => {
        currentDeck = e.target.value;
        loadNextCard();
        if (!listSection.classList.contains("hidden")) renderList();
    });

    btnNewDeck.addEventListener("click", () => {
        const newDeckName = prompt("Enter new folder name (e.g., English, C++):");
        if (newDeckName && newDeckName.trim() !== "") {
            currentDeck = newDeckName.trim();
            updateDeckList();
            loadNextCard();
        }
    });

    btnDeleteDeck.addEventListener("click", () => {
        if (confirm(`⚠️ Are you sure you want to delete the deck "${currentDeck}" and ALL its cards?`)) {
            leitner.deleteDeck(currentDeck);
            currentDeck = "Default";
            updateDeckList();
            loadNextCard();
            if (!listSection.classList.contains("hidden")) renderList();
        }
    });


    function renderList() {
        listDeckName.innerText = currentDeck;
        cardsGrid.innerHTML = "";

        const deckCards = leitner.cards.filter(c => (c.deck || "Default") === currentDeck);

        if (deckCards.length === 0) {
            cardsGrid.innerHTML = "<p>No cards in this deck yet.</p>";
            return;
        }

        deckCards.forEach(card => {
            const cardEl = document.createElement("div");
            cardEl.className = "mini-card";
            cardEl.innerHTML = `
                <div class="mini-badge">Box ${card.box}</div>
                <strong>${card.front}</strong>
                <span>${card.back}</span>
                <button class="btn-delete-mini" data-id="${card.id}"><i class="fa-solid fa-trash"></i> Delete</button>
            `;


            cardEl.querySelector('.btn-delete-mini').addEventListener('click', function () {
                if (confirm("Delete this card?")) {
                    leitner.deleteCard(card.id);
                    renderList();
                    loadNextCard();
                }
            });

            cardsGrid.appendChild(cardEl);
        });
    }

    btnViewList.addEventListener("click", () => {
        reviewSection.classList.add("hidden");
        addSection.classList.add("hidden");
        listSection.classList.remove("hidden");
        renderList();
    });

    btnCloseList.addEventListener("click", () => {
        listSection.classList.add("hidden");
        reviewSection.classList.remove("hidden");
        addSection.classList.remove("hidden");
    });


    function loadNextCard() {
        currentCard = leitner.getNextCard(currentDeck);
        showingFront = true;

        if (currentCard) {
            cardText.innerText = currentCard.front;
            cardBadge.innerText = `Box ${currentCard.box}`;
            cardBadge.classList.remove("hidden");
            btnReveal.classList.remove("hidden");
            actionButtons.classList.add("hidden");
        } else {
            const deckCardsCount = leitner.cards.filter(c => (c.deck || "Default") === currentDeck).length;
            if (deckCardsCount === 0) {
                cardText.innerText = `No cards in "${currentDeck}". Please add some!`;
            } else {
                cardText.innerText = `🎉 All done for "${currentDeck}"! Come back tomorrow.`;
            }
            cardBadge.classList.add("hidden");
            btnReveal.classList.add("hidden");
            actionButtons.classList.add("hidden");
        }
    }

    btnReveal.addEventListener("click", () => {
        if (!currentCard) return;
        cardText.innerText = currentCard.back;
        showingFront = false;
        btnReveal.classList.add("hidden");
        actionButtons.classList.remove("hidden");
    });

    btnSuccess.addEventListener("click", () => {
        leitner.recordResult(currentCard.id, true);
        loadNextCard();
    });

    btnFail.addEventListener("click", () => {
        leitner.recordResult(currentCard.id, false);
        loadNextCard();
    });

    btnAdd.addEventListener("click", () => {
        const front = inputFront.value;
        const back = inputBack.value;
        if (front && back) {
            leitner.addCard(front, back, currentDeck);
            inputFront.value = "";
            inputBack.value = "";
            updateDeckList();
            if (!currentCard) loadNextCard();
            if (!listSection.classList.contains("hidden")) renderList();

            btnAdd.innerText = "Added!";
            setTimeout(() => btnAdd.innerText = "Add", 1000);
        }
    });
    inputBack.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            btnAdd.click();
            inputFront.focus();
        }
    });


    btnExport.addEventListener("click", () => leitner.exportData());

    inputImport.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = function (evt) {
            if (leitner.importData(evt.target.result)) {
                alert("Data imported successfully!");
                updateDeckList();
                loadNextCard();
            } else {
                alert("Error importing data.");
            }
        };
        reader.readAsText(file);
    });


    updateDeckList();
    loadNextCard();
});
