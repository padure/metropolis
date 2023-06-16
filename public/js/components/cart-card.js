const Card = ({ id, nume, img, pret, categorie, quantity }) => {
  return `
    <div class="row mb-4 d-flex justify-content-between align-items-center border-bottom pb-3" data-id="${id}">
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img
          src="${img}"
          class="rounded-3 w-100 object-cover h-15 h-md-5 ratio-4x3" alt="${nume}">
        </div>
        <div class="col-md-3 col-lg-3 col-xl-4">
          <div class="d-flex justify-content-between d-md-block">
            <h6 class="text-muted my-3">${categorie}</h6>
            <h6 class="text-black my-3 text-white fw-bold">${nume}</h6>
          </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2 d-flex">
          <button class="btn btn-link px-2 text-white"
            id="step-down"
            onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
            <i class="fas fa-minus"></i>
          </button>
          <input min="1" name="quantity" id="quantity-input" value="${quantity}" type="number"
            class="form-control form-control-sm" />
          <button class="btn btn-link px-2 text-white"
            id="step-up"
            onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <div class="col-6 col-md-2 col-lg-2 col-xl-2">
          <h6 class="my-3" id="product-price">${pret} mdl</h6>
        </div>
        <div class="col-md-1 col-lg-2 text-end">
          <button class="btn btn-link text-muted fs-7" id="close-btn">
          Elimina
          </button>
        </div>
    </div>
  </div>`;
};

export { Card };
