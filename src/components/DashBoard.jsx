import { RedirectToSignIn, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { useFirbase } from '../context/FirebaseContext'
import { Link } from 'react-router-dom'

const DashBoard = () => {
  const { user } = useUser()
  const [images, setImages] = useState([])
  const firebase = useFirbase()

  const getImagesData = async () => {
    const temp = await firebase.getAllImages()
    setImages(temp)
    console.log(temp)
  }

  useEffect(() => {
    if (user) getImagesData()
  }, [user])
  if (!user) return <RedirectToSignIn />
  return (
    <div className='w-full flex items-center justify-center p-8 flex-wrap'>
      <div className='flex flex-wrap gap-4 items-center justify-center'>
        {images.map((image, ind) => (
          <a href={`http://localhost:5173/view/${image.imgName}`} className="flex flex-col w-[32rem]" key={ind}>
            <img
              alt="loading...."
              src={image.url}
              className="h-64 w-full object-cover sm:h-80 lg:h-96"
            />

            <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">Views : {image.views}</h3>

            <p className="mt-2 max-w-sm text-gray-700">
              {/* URL: {image.url} */}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default DashBoard