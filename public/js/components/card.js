const Card = (
  { id, nume, img, pret, cantitate },
  { priceFormatter, quantityFormatter }
) => {
  return `
    <div class="card bg-dark text-white p-2 cursor-pointer" style="width: 16rem;" data-id="${id}" data-bs-toggle="tooltip" data-bs-placement="top" title="${nume}">
            <div class="card-image h-sm" >
                <img src="${img}" class="card-img-top rounded w-100 h-100" alt="${nume}" style="object-fit: cover;">
            </div>
            <div class="card-body p-0">
                <h5 class="card-title my-2 fw-bold lh-lg">${
                  nume.length < 18 ? nume : `${nume.substring(0, 18)} ...`
                }</h5>
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
