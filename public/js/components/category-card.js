const CategoryCard = ({ categorie, img }) => {
  return `
    <div class="col rounded p-0 d-flex align-items-end category-card bg-cover position-relative" style="background-image: url(${img});">
        <a href="#${categorie.toLowerCase()}" class="z-2 text-white text-decoration-none stretched-link m-2 font-second-bold">${categorie}</a>
    </div>
    `;
};

export default CategoryCard;
