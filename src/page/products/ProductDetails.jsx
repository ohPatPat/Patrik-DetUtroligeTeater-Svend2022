import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentsForm, CommentsList } from "../../comp/Comments.jsx";
import { Meta, MetaDetails } from "../../comp/Meta.jsx";

export const ProductDetails = (props) => {
	const { product_id } = useParams();
	const [ productData, setProductData ] = useState({});

	useEffect(() => {
		const getProductData = async () => {
			try {
				const result = await axios.get(`https://api.mediehuset.net/detutroligeteater/events/${product_id}`)
				setProductData(result.data.item);
			}
			catch(err) {
				console.error(err)
			}
		}
		getProductData();
	}, [product_id])

	return (
		<MetaDetails title={productData.title}>
			<CommentsList />
			<CommentsForm />
		</MetaDetails>
	)
}