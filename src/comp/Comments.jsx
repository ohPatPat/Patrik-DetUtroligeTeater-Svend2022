import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../page/login/Auth"

const CommentsForm = ({ product_id }) => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { loginData } = useAuth()

  const submitForm = async (data, e) => {
    const endpoint = "https://api.mediehuset.net/detutroligeteater/reviews"
    const options = {
      headers: {
        Authorization: `Bearer ${loginData.access_token}`,
      },
    }

    const formData = new FormData(e.target)
    console.log(...formData)
    const result = await axios.post(endpoint, formData, options)
    if (result.data.status) {
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input type="hidden" value={product_id} {...register("event_id")} />
      <div>
        <label htmlFor="subject">Emne</label>
        <input type="text" {...register("subject", { required: true })} />
        {errors.subject && <span>Du skal skrive en titel</span>}
      </div>
      <div>
        <label htmlFor="comment">Kommentar</label>
        <textarea {...register("comment", { required: true })} />
        {errors.comment && <span>Du skal skrive en kommentar</span>}
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  )
}

const CommentsList = () => {
  const { product_id } = useParams()
  const { event_id } = useParams()
  const [commentData, setCommentData] = useState([])
  const { loginData } = useAuth()

  useEffect(() => {
    const getData = async () => {
      const endpoint = `https://api.mediehuset.net/detutroligeteater/reviews?event_id=${product_id}`
      const options = {
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
        },
      }  
      const result = await axios.get(endpoint, options)
      setCommentData(result.data.items)
      console.log(product_id);
    }
    getData()
  }, [product_id])

  return (
  	<div>
	{commentData && commentData.map((apiRoute, i) => {
		return (
			<li key={i}>{apiRoute.subject}</li>
		)
	})}
  	</div>
  )
}

const CommentsResponse = () => {
  return (
    <>
      <h1>Tak for din kommentar</h1>
      <CommentsList />
    </>
  )
}

export { CommentsForm, CommentsList, CommentsResponse }
