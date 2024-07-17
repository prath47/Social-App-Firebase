import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFirbase } from '../context/FirebaseContext'

const ViewImage = () => {
    const [uploadedBy, setUploadedBy] = useState(null)
    const [img, setImg] = useState('')
    const { imgName } = useParams()
    const firebase = useFirbase()
    const [data, setData] = useState(null)

    const getImgUrl = async () => {
        const { querySnapshot, url } = await firebase.getImgUrl(imgName);
        console.log(querySnapshot.docs[0].data())
        setImg(url)
        console.log(url)
        setUploadedBy(querySnapshot.docs[0].data().userName)
    }

    useEffect(() => {
        getImgUrl()
    }, [])
    return (
        <div className='w-full flex items-center justify-center'>
            <div className="group block">
                <img
                    src={img}
                    alt="loading..."
                    className="aspect-square w-[40rem] rounded object-cover"
                />

                <div className="mt-3">
                    <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Uploaded By : {uploadedBy}
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default ViewImage