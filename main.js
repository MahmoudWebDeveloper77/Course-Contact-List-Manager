// Contact Constructor
function Contact(name, phone, email, address) {
  this.name = name;
  this.phone = phone;
  this.email = email;
  this.address = address;
}

// Contact List Array
const contactList = [];

// Function to create a new row element
const createNewRow = (name, phone, email, address, index) => {
  // Create the row
  const row = document.createElement("li");
  row.classList.add("row");

  // Create the columns
  const firstCell = document.createElement("div");
  firstCell.innerText = name;

  const secondCell = document.createElement("div");
  secondCell.innerText = phone;

  const thirdCell = document.createElement("div");
  thirdCell.innerText = email;

  const fourthCell = document.createElement("div");
  fourthCell.innerText = address;

  // Append the columns to the row
  row.appendChild(firstCell);
  row.appendChild(secondCell);
  row.appendChild(thirdCell);
  row.appendChild(fourthCell);

  // If the row is not the header, add the remove button
  if (index !== -1) {
    const removeButton = document.createElement("button");
    removeButton.innerText = "X";
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", () => {
      removeContact(index);
    });
    row.appendChild(removeButton);
  }

  return row;
};

// Function to remove a contact
const removeContact = (index) => {
  // Remove the contact from the list
  contactList.splice(index, 1);

  // Display the updated contacts
  displayContacts();
};

const clearContacts = () => {
  const contactListElement = document.getElementById("contact-list");
  while (contactListElement.firstChild) {
    contactListElement.removeChild(contactListElement.firstChild);
  }
};

const displayContacts = () => {
  // Get the list item by id
  const contactListElement = document.getElementById("contact-list");

  // Clear the existing contacts
  clearContacts();

  // Append the title row
  contactListElement.appendChild(
    createNewRow("Name", "Phone", "Email", "Address", -1)
  );

  // Append the contact rows
  contactList.forEach((contact, index) => {
    contactListElement.appendChild(
      createNewRow(
        contact.name,
        contact.phone,
        contact.email,
        contact.address,
        index
      )
    );
  });
};

// Function to add the new contact
const addContact = () => {
  // Get the values from the form
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  // Validate that name doesn't contain numbers
  if (/\d/.test(name)) {
    document.getElementById("title").innerText = "Name can't contain numbers.";
    document.getElementById("title").style.color = "red";
    return;
  }

  if (/[a-zA-Z]/.test(phone)) {
    document.getElementById("title").innerText = "Phone field can't contain letters.";
    document.getElementById("title").style.color = "red";
    return;
  }

  // Create a new contact object
  const contact = new Contact(name, phone, email, address);

  // Add the new contact to the list
  contactList.push(contact);

  // Display the contacts
  displayContacts();
};

// Function to setup event listeners
const setupEventListeners = () => {
  const form = document.getElementById("addContactForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    addContact();
  });
};

document.addEventListener("DOMContentLoaded", setupEventListeners);
