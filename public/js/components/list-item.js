const ListItem = (category) => {
  return `
    <li class="nav-item rounded px-2">
        <a href="#${category.toLowerCase()}" class="nav-link" id="category-${category}">${category}</a>
    </li>
    `;
};

export default ListItem;
