import { useContext } from 'react'
import SelectUser from '../SelectUser/SelectUser'
import './Header.css'
import { UserContext } from '../../context/user.context'

function Header() {
  const { userId } = useContext(UserContext)
  return (
    <>
      <img className="logo" src="/logo.svg" alt="Logo" />
      <SelectUser />
    </>
  )
}

export default Header
