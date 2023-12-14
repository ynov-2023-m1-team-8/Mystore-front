export async function getProducts(take) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products?take=${take}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function getProductFiltered(min,max) {
    try {
    console.log(min,'apio')
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/filtered-products?min=${min}&max=${max}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function getProduct(id) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/products/${id}`, {
            cache: "no-store",
        });
        const data = await res.json();
        console.log(data)
        return data;
    }
    catch (err) {
        return err;
    }
}


export async function getRecoList(){
   const data = [{id : 1, name : 'alexis', price : '126', thumbnail: "uploads/product1.webp", packshot: "/uploads/product1_packshot.jpeg"},
            {id : 2, name : 'alexis1', price : '116', thumbnail: "uploads/product2.webp", packshot: "/uploads/product2_packshot.jpeg"},
            {id : 3, name : 'alexis2', price : '106', thumbnail: "uploads/product3.webp", packshot: "/uploads/product3_packshot.jpeg"}]
            return data
}

