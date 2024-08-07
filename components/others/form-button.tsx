"use client"

import React from 'react'
import { useFormStatus } from 'react-dom'
// components
import { Button } from '../ui/button'
import Spinner from './Spinner'

const FormButton = () => {
    const {pending} = useFormStatus()
  return (
    <Button className='w-full' type="submit" disabled={pending}>
        {pending ? <Spinner/> : 'Submit'}
    </Button>
  )
}

export default FormButton