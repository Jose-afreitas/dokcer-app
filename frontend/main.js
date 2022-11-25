
const api = axios.create({
    baseURL: process.env.PUBLIC_URL
});


// const url = "http://localhost:3000/produtos";
// const newProd = {
//     nome: "Pao de mel",
//     preco: 5
// }


function getProdutos() {
    axios.get(baseURL).then(response => {
        // console.log(response)
        const data = response.data
        renderResults.textContent = JSON.stringify(data)
    })
        .catch(error =>
            console.log(error))
}
getProdutos();


// function addProdutos() {
//     axios.post(url, newProd)
//         .then(response => {

//             console.log(response.data)

//         }).catch(error =>
//             console.log(error))
// }
// addProdutos();


// axios.get(url).then(function (response) {
//     console.log(response.data)
// }).catch(function (error) {
//     if (error) {
//         console.log(error);
//     }
// })

