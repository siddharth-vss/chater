import React from 'react'
import { AspectRatio } from '@chakra-ui/react'
const garbage = () => {
  return (
    <div>
    <h1>{document.title}</h1>
    <p>Welcome to {document.title} </p>
    <AspectRatio maxW='400px' ratio={4 / 3}>
      <img src='https://bit.ly/naruto-sage' alt='naruto' objectFit='cover' />
    </AspectRatio>


    <AspectRatio ratio={16 / 9}>

    <iframe title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1163.0286577265767!2d70.78656797206004!3d22.263367972014983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca5dbe7afda3%3A0x6d8e1af5be0f4126!2sR.K.%20Empire!5e0!3m2!1sen!2sin!4v1698661512104!5m2!1sen!2sin"></iframe>
    </AspectRatio>
  </div>
  )
}

export default garbage
