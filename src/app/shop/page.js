import Link from "next/link";
import { getProducts, getProductFiltered } from "@/services/api/product.api.js";
import Alert from "@/components/UI/Alert";
import ProductsGrid from "@/components/products/ProductsGrid";
import TitlePage from "@/components/UI/TitlePage";
import ProductsCounter from "@/components/products/ProductsCounter";
import PriceRange from "@/components/UI/PriceRange"

export default async function Page({
    searchParams,
}) {
    let products;

    const { take = 8 } = searchParams || {};
    const { min, max} = searchParams || {}
    if(min && max){
         products = await getProductFiltered(min,max)
    }else{
        products = await getProducts(take);
    }
    //await seachParams du query depuis mon boutton client filter

    if (!products.data || products.success === false) return <Alert message={products.message} type="error" />;

    return (
        <div className="container mx-auto">
            <TitlePage title="Shop" />
            <PriceRange products={products.data} />
            <ProductsCounter productsLength={products.data.length} />
            <ProductsGrid products={products.data} />
            <div className="flex justify-center mb-24">

                {
                    Number(take) <= products.data.length && (
                        <Link
                            className="transition ease-in-out delay-150 mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                            href={`/shop?take=${(Number(take) + 8)}`}
                        >
                            See more
                        </Link>
                    )
                }
            </div>
        </div>
    )
}
