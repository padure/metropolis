const Card = ({ id, nume, img, pret, categorie }) => {
  return `
    <div class="row mb-4 d-flex justify-content-between align-items-center card-cos pb-3" data-id="${id}">
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img
          src="${img}"
          class="img-fluid rounded-3 my-card-img" alt="${nume}">
        </div>
        <div class="col-md-4 col-lg-4 col-xl-4">
          <h6 class="text-muted my-3">${categorie}</h6>
          <h6 class="text-black my-3 title-item-card">${nume}</h6>
        </div>
        <div class="col-md-3 col-lg-3 col-xl-3 d-flex">
          <button class="btn btn-link px-2 text-white"
            id="step-down"
            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
            <i class="fas fa-minus"></i>
          </button>
          <input min="0" name="quantity" id="quantity-input" value="1" type="number"
            class="form-control form-control-sm" />
          <button class="btn btn-link px-2 text-white"
            id="step-up"
            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="col-md-2 col-lg-2 col-xl-2">
          <h6 class="my-3" id="product-price">${pret} mdl</h6>
        </div>
        <div class="col-md-1 col-lg-1 col-xl-1 text-end">
          <a href="#!" class="text-muted" id="close-btn"><i class="fas fa-times text-white"></i></a>
        </div>
    </div>
  </div>`;
};

export { Card };
