let products = [
    { 
        id: 1,
        name: 'Producto 1',
        price: 100 
    },
    {
        id: 2,
        name: 'Producto 2',
        price: 200 
    }];


export async function GET(request) {
    return new Response(
      JSON.stringify(products),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
}

export async function POST(request) {
    const body = await request.json();
    const productoNuevo = { id: products.length + 1,
                         name: body.name,
                         price: body.price };
    products.push(productoNuevo);

    return new Response(
      JSON.stringify(productoNuevo),
      { headers: { "Content-Type": "application/json" } }
    );
}