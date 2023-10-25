const goku = {
    // altura: "200",
    poder: "150",
    color_cabello: "negro",
}

const vegeta = {
    altura: "300",
    // poder: "120",
    color_cabello: "negroo",
}

const vegita = {...vegeta,  ...goku};

console.log(vegita);



