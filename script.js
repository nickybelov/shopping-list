const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Add an item to a shopping list
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);

  checkUI();

  itemInput.value = '';
}

// Remove an item from a shopping list
function removeItem(e) {
  if (confirm('Are you sure?')) {
    if (e.target.parentElement.classList.contains('remove-item')) {
      e.target.parentElement.parentElement.remove();
    }
    checkUI();
  }
}

// Remove all items from a shopping list
function clearItems(e) {
  if (confirm('Are you sure?')) {
    const itemListLength = itemList.children.length;
    for (let i = 0; i < itemListLength; i++) {
      itemList.children[0].remove();
    }
    checkUI();
  }
}

// Create a remove button for a list item
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// Create an icon for a remove button
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// Filter items in a list
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');

  items.forEach((item) => {
    const itemName = item.innerText.toLowerCase();

    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Toggle display for Filter and Clear All options depending on whether shopping list is empty or not
function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
