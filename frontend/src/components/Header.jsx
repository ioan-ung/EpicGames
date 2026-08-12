import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../svg/search.svg?react'
import WishList from '../svg/price.svg?react'
import SearchBox from './SearchBox';
import Money from '../svg/money.svg?react'
import { useState } from 'react';
import "./style/Navbar.css"
import CoinsPopup from './CoinsPopup';
import WishListPopup from './WishListPopup';
import LogOut from '../svg/logout.svg?react'
import { useDispatch,useSelector } from 'react-redux';
import { getUserAction } from '../actions/userActions';
import { jwtDecode } from 'jwt-decode'
function Header() {
    const avatarFallback = "https://ui-avatars.com/api/?name=Epic+User&background=0f172a&color=f8fafc"
    const [navbarSelected,setNavbarSelected] = useState("")
    const dispatch = useDispatch()
    const [open,setOpen] = useState(false);
    const [wishList,setWishList] = useState(false);
    const userCredentials = useSelector((state) => state.getUserReducer);
    const {loading,error,userDetails} = userCredentials
    const [user, setUser] = useState(localStorage.getItem("access") ? jwtDecode(localStorage.getItem("access")) : null)

    useEffect(() => {
        if (user&&user?.user_id) {
          dispatch(getUserAction(user.user_id));
        }

      }, [dispatch, user]);

    const handleSearch = () =>{
    <div style={{widt:'1.5em',height:'1.5em',color:'white',position:'absolute',left:'1em'}} className='HeaderSvg'>
        <Search />
    </div>
    }

    return (user&&
        <Navbar style={{position:'absolute',top:'0',zIndex:'10',width:'100vw',height:'5rem'}} expand="lg" className="navbar">

            <Container>
                <Link className="navbar-brand-link" to="/">Epic Games</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav  className="me-auto align-items-lg-center" >
                        <Nav.Item style={{position:'relative',marginRight:'1em'}} className='d-flex align-items-center justify-content-center'>
                            <SearchBox onClick = {(e) => (handleSearch)}/>

                        </Nav.Item>
                        <Link
                           to={'/store'}
                            className={`nav-link-item${navbarSelected === "NAV_DISCOVER" ? ' active' : ''}`}
                            onClick={() => setNavbarSelected("NAV_DISCOVER")}
                        >
                            Discover
                        </Link>
                        <Link
                        to={'/listGame'}
                            className={`nav-link-item${navbarSelected === "NAV_BROWSE" ? ' active' : ''}`}
                            onClick={() => setNavbarSelected("NAV_BROWSE")}
                        >
                            Browse
                        </Link>
                    </Nav>
                    <Nav className="align-items-lg-center">
                        <Container style ={{
                           display:"flex",
                           justifyContent:"space-between",
                           alignItems:"center",
                            }}>
                        <Nav.Link className="p-0">
                            {user ?
                                <Link className="navbar-action-pill" onClick = {(e) =>{e.stopPropagation();setOpen(true)}}>
                                    <Money style = {{color:"#f5d547"}}/>
                                    {userDetails?.coins} Coins
                                </Link>
                                :
                                <Link to={'/signin'} className="navbar-action-pill">
                                    Sign in
                                </Link>
                            }
                        </Nav.Link>

                        <Nav.Link className="p-0">
                            <Link to = "#" onClick = {(e) =>{e.stopPropagation();setWishList(true)}} className="navbar-action-pill">
                                <WishList style = {{color:"#a78bfa"}}/>
                                WishList
                            </Link>
                        </Nav.Link>


                        <Nav.Link className="p-0">
                            <Link onClick={()=>{
                                setUser(null)
                                localStorage.removeItem('access');
                                localStorage.removeItem('refresh');
                                }} to={'/signin'} className="navbar-action-pill">
                                <LogOut style = {{color:"#ff6b6b"}}/>
                                LogOut
                            </Link>
                        </Nav.Link>

                        <Nav.Link className="p-0">
                            <Link to = "/updateUser">
                                 <img
                                    src={userDetails?.image ? `/static/images/${userDetails.image}` : avatarFallback}
                                    alt="Profile"
                                    onError={(e) => {
                                        e.currentTarget.src = avatarFallback;
                                    }}
                                    className="navbar-avatar"
                                />
                            </Link>
                        </Nav.Link>

                        </Container>

                    </Nav>
                </Navbar.Collapse>
            </Container>
            <CoinsPopup setOpen={setOpen} open = {open}/>
            <WishListPopup wishList = {wishList} setWishList = {setWishList}/>
        </Navbar>
    );
}

export default Header;
