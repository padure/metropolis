const Card = ({ nume, img, pret, cantitate }) => {
  const priceFormatter = Intl.NumberFormat("ro", {
    style: "currency",
    currency: "MDL",
  });
  const quantityFormatter = Intl.NumberFormat("ro", {
    style: "unit",
    unit: "gram",
  });

  return `
    <div class="card bg-dark text-white p-2" style="width: 16rem;">
            <div class="card-image" style="height: 300px; overflow: hidden;">
                <img src="${img}" class="card-img-top rounded w-100 h-100 bg-cover" alt="${nume}">
            </div>
            <div class="card-body p-0">
                <h5 class="card-title my-2 fw-bold lh-lg">${nume}</h5>
                <div class="row my-2">
                <div class="col text-start">
                    <h6>${priceFormatter.format(pret)}</h6>
                </div>
                    <div class="col text-end">
                        <p class="card-text mb-2">${quantityFormatter.format(
                          cantitate
                        )}</p>
                    </div>
                </div>
                <a href="#" class="btn background-primary text-white w-100">
                Comanda
                <i class="fal fa-cart-plus fa-flip-horizontal" style="font-family: 'font-awesome';></i>
                </a>
            </div>
        </div>
    `;
};

export default Card;
