import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
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
    const TextPrimary = "#dcdedc"
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
        <Navbar style={{position:'absolute',top:'0',zIndex:'10',width:'100vw',height:'5rem',backgroundColor:'rgba(255, 255, 255, 0.52) !important',backdropFilter:'blur(8px)'}} expand="lg" className="navbar">
            
            <Container>
                <Link style={{ color: 'white',textDecoration:'none',fontWeight:'650',marginRight:'0.5em'}} to="/">Crush Games</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav  className="me-auto" >
                        <Nav.Item style={{position:'relative',marginRight:'1em'}} className='d-flex align-items-center justify-content-center'>
                            <SearchBox onClick = {(e) => (handleSearch)}/>
                    
                        </Nav.Item>
                        <Link
                           to={'/store'}
                            style={{
                                fontWeight: navbarSelected === "NAV_DISCOVER" ? 'bolder' : '400',
                                color: navbarSelected !== "NAV_DISCOVER" ? TextPrimary : 'white', margin: '1rem'

                            }}
                            onClick={() => setNavbarSelected("NAV_DISCOVER")}
                        >
                            Discover
                        </Link>
                        <Link
                        to={'/listGame'}
                            style={{
                                fontWeight: navbarSelected === "NAV_BROWSE" ? 'bolder' : '400',
                                color: navbarSelected !== "NAV_BROWSE" ? TextPrimary : 'white',
                                margin:'1rem'
                            }}
                            onClick={() => setNavbarSelected("NAV_BROWSE")}
                        >
                            Browse
                        </Link>
                        <Link
                            href="#home"
                            style={{
                                fontWeight: navbarSelected === "NAV_NEWS" ? 'bolder' : '400',
                                color: navbarSelected !== "NAV_NEWS" ? TextPrimary : 'white', margin: '1rem'

                            }}
                            onClick={() => setNavbarSelected("NAV_NEWS")}
                        >
                            
                        </Link>
                       
                       
                    </Nav>
                    <Nav>
                        <Container style ={{
                           display:"flex",
                           justifyContent:"space-between",
                           alignItems:"center",
                            }}>
                        <Nav.Link>
                            {user ?
                            <>      
                                    
                                    <Link  style={{textDecoration: 'none', color: 'white' ,display:"flex"}} onClick = {(e) =>{e.stopPropagation();setOpen(true)}}>
                                        
                                        <Money style = {{marginRight:"0.3rem",color:"#f5d547"}}/>
                                        {userDetails?.coins} Coins
                  
                                    </Link>  
                                    <Link style={{color:'white',textDecoration:'none'}}>
                                        <small style={{fontWeight:'bolder'}}>
                                            {user?.totalPoints}
                                        </small>
                                    </Link>
                            </>
                               
                                :
                                <Link to={'/signin'} style={{ textDecoration: 'none', color: 'white' }}>
                                    Sign in
                                </Link>  
                            }
                        </Nav.Link>
                        
                        <Nav.Link href="#link" style={{ fontWeight: 'bold', color: "white" }}>
                            <Row style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
                                <Col>
                                
                                    <Link to = "#" onClick = {(e) =>{e.stopPropagation();setWishList(true)}} style={{textDecoration:'none',color:'white',display:"flex"}}>
                                        <WishList style = {{width:"2rem",color:"#6D435A"}}/>
                                        WishList
                                    </Link>
                                </Col>
                            </Row>
                        </Nav.Link>


                        <Nav.Link href="#link" style={{ fontWeight: 'bold', color: "white" }}>
                            <Row style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Col>
                                    <Link onClick={()=>{
                                        setUser(null)
                                        localStorage.removeItem('access');
                                        localStorage.removeItem('refresh');
                                        }} to={'/signin'} style={{ textDecoration: 'none', color: 'white'}}>
                                        <LogOut style = {{color:"#FF0000",height:"2rem",width:"auto"}}/>
                                        LogOut
                                    </Link>
                                </Col>
                            </Row>
                        </Nav.Link>
                        
                        <Nav.Link href="#link" style={{ fontWeight: 'bold', color: "white"}}>
                            <Row style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Col>
                                    <Link style={{ textDecoration: 'none', color: 'white'}} to = "/updateUser"> 
                                         
                                         <img src={`/static/images/${userDetails?.image}`}   
                                        alt = "Couldn't open"
                                        style={{
                                            height:"2.5rem",
                                            width:"2.5rem",
                                            borderRadius:"50%"
                                        }} ></img>
                                    </Link>
                                </Col>
                            </Row>
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