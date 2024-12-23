/*
  banned.js
  Key Changes:
  - Date still defaults to today's date in openAddModal()
  - NEW: automatically focus on nameInput after opening the modal
*/

/* ----- Local Storage Initialization ----- */
let bannedList = [];
try {
  bannedList = JSON.parse(localStorage.getItem("bannedList")) || [];
} catch (error) {
  console.error("Error parsing banned list:", error);
}

/* ----- Utility: Sanitize input to prevent HTML injection ----- */
function sanitize(input) {
  const div = document.createElement("div");
  div.innerText = input;
  return div.innerHTML;
}

/* Sort the bannedList in place. 'type' can be 'name' or 'date'. */
function sortBannedList(type) {
  if (type === "name") {
    bannedList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (type === "date") {
    // Sort by date in ascending order (oldest first)
    bannedList.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}

/* ----- Render the Cards ----- */
function renderCards(data) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = "";

  data.forEach((person, index) => {
    // Create card
    const card = document.createElement("div");
    card.className = "card";
    if (person.emergency) {
      card.classList.add("card-emergency");
    }

    // Photo with fallback
    const photo = document.createElement("img");
    photo.src = person.photo
      ? person.photo
      : "https://via.placeholder.com/300?text=No+Photo";
    photo.alt = person.photo
      ? `Photo of ${person.name}`
      : `No Photo Provided: ${person.name}`;
    card.appendChild(photo);

    // Content
    const contentDiv = document.createElement("div");
    contentDiv.className = "card-content";

    if (person.name) {
      const nameElem = document.createElement("h2");
      nameElem.textContent = person.name;
      contentDiv.appendChild(nameElem);
    }
    if (person.reason) {
      const reasonElem = document.createElement("p");
      reasonElem.textContent = `Reason: ${person.reason}`;
      contentDiv.appendChild(reasonElem);
    }
    if (person.notes) {
      const notesElem = document.createElement("p");
      notesElem.textContent = `Notes: ${person.notes}`;
      contentDiv.appendChild(notesElem);
    }
    if (person.date) {
      const dateElem = document.createElement("p");
      dateElem.textContent = `Date Banned: ${person.date}`;
      contentDiv.appendChild(dateElem);
    }
    if (person.apartments) {
      const apartmentsElem = document.createElement("p");
      apartmentsElem.textContent = `Apartments: ${person.apartments}`;
      contentDiv.appendChild(apartmentsElem);
    }

    card.appendChild(contentDiv);

    // Actions
    const actionsDiv = document.createElement("div");
    actionsDiv.className = "card-actions";

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () => openEditModal(index));
    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteBannedIndividual(index));
    actionsDiv.appendChild(deleteButton);

    card.appendChild(actionsDiv);
    cardsContainer.appendChild(card);
  });
}

/* ----- Add a new Banned Individual ----- */
function addBannedIndividual() {
  const name = sanitize(document.getElementById("nameInput").value.trim());
  const reason = sanitize(document.getElementById("reasonInput").value.trim());
  const notes = sanitize(document.getElementById("notesInput").value.trim());
  const date = document.getElementById("dateInput").value;
  const photo = sanitize(document.getElementById("photoInput").value.trim());
  const apartments = sanitize(
    document.getElementById("apartmentsInput").value.trim()
  );
  const emergency = document.getElementById("emergencyCheckbox").checked;

  // No required fields, simply push
  bannedList.push({ name, reason, notes, date, photo, apartments, emergency });

  localStorage.setItem("bannedList", JSON.stringify(bannedList));
  renderCards(bannedList);

  // Clear fields
  document.getElementById("nameInput").value = "";
  document.getElementById("reasonInput").value = "";
  document.getElementById("notesInput").value = "";
  document.getElementById("dateInput").value = "";
  document.getElementById("photoInput").value = "";
  document.getElementById("apartmentsInput").value = "";
  document.getElementById("emergencyCheckbox").checked = false;

  closeAddModal();
}

/* ----- Delete a Banned Individual by Index ----- */
function deleteBannedIndividual(index) {
  if (confirm("Are you sure you want to delete this entry?")) {
    bannedList.splice(index, 1);
    localStorage.setItem("bannedList", JSON.stringify(bannedList));
    renderCards(bannedList);
  }
}

/* ----- EDITING ENTRIES ----- */
function openEditModal(index) {
  const person = bannedList[index];

  // Fill in the form fields with existing data or empty
  document.getElementById("editId").value = index;
  document.getElementById("editName").value = person.name || "";
  document.getElementById("editReason").value = person.reason || "";
  document.getElementById("editNotes").value = person.notes || "";
  document.getElementById("editDate").value = person.date || "";
  document.getElementById("editPhoto").value = person.photo || "";
  document.getElementById("editApartments").value = person.apartments || "";
  document.getElementById("editEmergency").checked = !!person.emergency;

  document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
  document.getElementById("editModal").style.display = "none";
}

/* Save the edited entry */
function saveEdit() {
  const index = document.getElementById("editId").value;
  const name = sanitize(document.getElementById("editName").value.trim());
  const reason = sanitize(document.getElementById("editReason").value.trim());
  const notes = sanitize(document.getElementById("editNotes").value.trim());
  const date = document.getElementById("editDate").value;
  const photo = sanitize(document.getElementById("editPhoto").value.trim());
  const apartments = sanitize(
    document.getElementById("editApartments").value.trim()
  );
  const emergency = document.getElementById("editEmergency").checked;

  bannedList[index] = { name, reason, notes, date, photo, apartments, emergency };
  localStorage.setItem("bannedList", JSON.stringify(bannedList));
  
  renderCards(bannedList);
  closeEditModal();
}

/* ----- ADDING ENTRIES ----- */
function openAddModal() {
  // Show the Add Modal
  document.getElementById("addModal").style.display = "flex";

  // Default date to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dateInput").value = today;

  // NEW: Set focus on the name field
  setTimeout(() => {
    document.getElementById("nameInput").focus();
  }, 50);
}

function closeAddModal() {
  document.getElementById("addModal").style.display = "none";
}

/* ----- Searching by Name or Reason ----- */
document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  const filteredList = bannedList.filter((person) =>
    (person.name || "").toLowerCase().includes(query) ||
    (person.reason || "").toLowerCase().includes(query)
  );
  renderCards(filteredList);
});

/* ----- Sorting ----- */
function applySort() {
  const sortOption = document.getElementById("sortSelect").value;
  if (sortOption) {
    sortBannedList(sortOption);
  }
  renderCards(bannedList);
}

/* ----- Close modals when clicking outside them ----- */
window.onclick = function (event) {
  const addModal = document.getElementById("addModal");
  const editModal = document.getElementById("editModal");

  if (event.target === addModal) {
    closeAddModal();
  }
  if (event.target === editModal) {
    closeEditModal();
  }
};

/* ----- Initial Rendering ----- */
renderCards(bannedList);
