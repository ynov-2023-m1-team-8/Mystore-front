import { noSSR } from "next/dynamic";

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
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_FILTER_ENDPOINT}/products/filtered-products?min=${min}&max=${max}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log('okok',data)
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
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function getPostFilter(min,max) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_FILTER_ENDPOINT}/products/filtered-products?min=${min}&max=${max}`, {
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


export async function getRecoList(localStorageFilter,id){
        const ok = localStorageFilter
        console.log('okokokkoko',ok[1])
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_FILTER_ENDPOINT}/products/filtered-products?min=${ok[0]}&max=${ok[1]}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        console.log(data)
        if(data){
            const dataFilteredForReco = data.data.filter((e) => e.id !== Number(id))
            console.log('okokooko',data.data)
            if(dataFilteredForReco.length >= 3){
                const slicedData = dataFilteredForReco.slice(0, 3);
                return slicedData;
            }else{
                return dataFilteredForReco
            }
        }   

    }


