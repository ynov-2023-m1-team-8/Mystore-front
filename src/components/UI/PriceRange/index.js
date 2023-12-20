"use client"
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Importez les styles du curseur
import { useState } from 'react';
import ProductsGrid from "@/components/products/ProductsGrid";
import { useRouter } from 'next/navigation'
import { getPostFilter } from "@/services/api/product.api.js";




const Index = ({products}) => {

const [rangeValues, setRangeValues] = useState([0, 500]);
const [saveFilterArray, setSaveFilterArray] = useState()
const router = useRouter()

const handleRangeChange = (values) => {
  setRangeValues(values);
};



const handleRangeClick = async () => {
  router.push(`/shop?min=${rangeValues[0]}&max=${rangeValues[1]}`)
  let postfilter = await getPostFilter(rangeValues[0],rangeValues[1])
  if (postfilter){
    console.log('postok')
  }

  console.log('gg')
}
  return (
    <div className='grid grid-cols-2 gap-8 my-12'>
    <div> 
    <Slider
      min={0}
      max={400}
      range
      value={rangeValues}
      onChange={handleRangeChange}
      trackStyle={{backgroundColor :'black'}}
      handleStyle={{backgroundColor : 'grey', borderColor :'black'}}
    />
    
    <div className='grid grid-cols-2'>
    <div>
    <label>{rangeValues[0]}€</label>
    </div>
    <div style={{display : 'flex', flexDirection : 'row-reverse'}}>
    <label>{rangeValues[1]}€</label>
    </div>
    </div>
    </div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleRangeClick}>
      Filter
    </button>
    <div>
    </div>
    </div>
  );
}

export default Index;
