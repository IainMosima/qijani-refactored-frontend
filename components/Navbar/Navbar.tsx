'use client';
import { store } from '@/redux/store'
import React from 'react'
import { Provider } from 'react-redux'
import Top from './Top'

const Navbar = () => {
  return (
    <Provider store={store}>
        <Top/>
    </Provider>
  )
}

export default Navbar