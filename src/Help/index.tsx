import { faComment, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'flowbite-react/components/Button'
import React from 'react'

const Help = () => {
    return (
        <article className='flex flex-col justify-center items-center pt-4'>
            <img src="./helpline.jpeg" className='w-1/2 h-1/2'></img>
            <h1 className='text-3xl font-bold'>I am here to help!</h1>
            <div className='flex flex-row mt-4 gap-4'>
                <FontAwesomeIcon size='lg' icon={faEnvelope} color='rgb(6 182 212)' border className='cursor-pointer' />
                <FontAwesomeIcon size='lg' icon={faComment} color='rgb(6 182 212)' border className='cursor-pointer' />
                <FontAwesomeIcon size='lg' icon={faPhone} color='rgb(6 182 212)' border className='cursor-pointer' />
            </div>



        </article>
    )
}

export default Help