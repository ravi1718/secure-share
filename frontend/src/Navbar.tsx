import React from 'react'
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { SignInButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <>
    <Menubar >
    <MenubarMenu className="justify-items-end">
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarTrigger>File</MenubarTrigger>
    </MenubarMenu>
      <div className='flex justify-end'>
      <SignInButton />
      </div>
  </Menubar>
  </>
  )
}

export default Navbar