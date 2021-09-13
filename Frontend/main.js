// Simplify fetch
async function simpleFetch (url) {
  return await(await fetch(url)).json();
}


async function start () {
  // Get some data from the backend and write to screen 
  let products = await simpleFetch('/api/products');
    // Build html from product data
    let html = '';
    for (let {id, name, decription, price} of products) {
      html += `
      <tr>
         <td>${id}</td>
         <td>${name}</td>
         <td>${decription}</td>
         <td>${price}</td>
      `;
    }
    // Create a table and add the html and add the div to the body
    let table = document.createElement('table');
    table.innerHTML = html;
    document.body.append(table);
}

start();