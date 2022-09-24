
import { useLocation } from "react-router-dom";
import RenderEditItem from "../RenderEditItem"
import {useEffect,useState} from "react"
import axios from "axios";
function EditItem(){
	const location = useLocation();
	const id =parseInt(location.state);
	const [product,setProduct] = useState({})
	const [check,setCheck] = useState(false) //chua co data
	useEffect(()=>{
		async function fetchData() {
		try {
			const res = await axios.get('http://localhost:8080/product/detail'
			,
			{ 
			params:{
				id: id
			}
			}
			)
			setProduct(res.data)
			setCheck(true);
			console.log(res.data)
		  } catch (error) {
			console.log(error.message)
		  }
		}
		fetchData()
	},[])
	let productData;
	let url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzuDh9Fdpo9ntG5_YunFM2Wd_g_Kt4CyR8Q&usqp=CAU";
	if(check){
		productData={
			id: product.product.Id,
			textName: product.product.Product_Name,
			textType: product.product.Product_Type,
			textColor: product.product.Color,
			txtBattery: product.product.battery,
			txtOs: product.product.Os, 
			txtDisplaySize: product.product.DisplaySize, 
			txtChip: product.product.chip, 
			txtInStock: product.product.InStock,
			textDiscount: product.product.Discount,

			txtMemory: product.memory[0].Ram_Capacity,
			txtRom: product.memory.map((memory,index)=>{
				let string = memory.Rom_Capacity + " - " + memory.Price +", "
				return string
			}).reduce((total,current)=>{
				return total + current;
			}).slice( 0, -2),

			image: product.image[0] ? product.image[0].Url : url,
			image1: product.image[1] ? product.image[1].Url : url,
			image2: product.image[2] ? product.image[2].Url : url,
			image3: product.image[3] ? product.image[3].Url : url,
			image4: product.image[4] ? product.image[4].Url : url,
			
			Id_Discount : null,
			Price : null
		  };
		  if(product.discountCode){
			  productData.Id_Discount = product.discountCode.Id_Discount;
			  productData.Price = product.discountCode.Price
		  }
		//   console.log(product)
	}

	if(productData){
		return(
			<RenderEditItem productData={productData}/>
		)
	}
	else{
			return <></>
		}
		
}
export default EditItem;