import { RedirectToSignIn, SignInButton, useUser } from '@clerk/clerk-react'
import React, { useState } from 'react'
import { redirect } from 'react-router-dom'

const Home = () => {
    const [img, setImg] = useState(null)
    const { user } = useUser()

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='w-full flex items-center justify-center h-96'>
            <div className='flex gap-10 flex-col h-full items-center justify-center w-full'>
                <input className='border-4 rounded-md p-4 w-[50%]' type="file" onChange={(e) => setImg(e.target.files[0])} />
                {user ?
                    <button
                        className="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                        onClick={handleSubmit}>Upload</button>
                    : <div className='text-xl flex flex-col gap-5'>Sign in to upload image <SignInButton
                        class="inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500" />
                    </div>}
            </div>
        </div>
    )
}

export default Home