import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../svg/search.svg?react'
import WishList from '../svg/price.svg?react'
import SearchBox from './SearchBox';
import Money from '../svg/money.svg?react'
import UserDefaultImage from '../svg/user.svg'
import { useState } from 'react';
import "./style/Navbar.css"
import CoinsPopup from './CoinsPopup';
import WishListPopup from './WishListPopup';
import LogOut from '../svg/logout.svg?react'
import Edit from '../svg/edit.svg?react'
import { useDispatch,useSelector } from 'react-redux';
import { getUserAction, updateUserAction } from '../actions/userActions';
import { jwtDecode } from 'jwt-decode'
import { API_URL } from '../index'
function Header() {
    const [navbarSelected,setNavbarSelected] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open,setOpen] = useState(false);
    const [wishList,setWishList] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [pictureView, setPictureView] = useState('closed'); // 'closed' | 'opening-start' | 'opening-end' | 'closing'
    const [avatarRect, setAvatarRect] = useState(null);
    const avatarRef = useRef(null);
    const profileMenuRef = useRef(null);
    const editImageInputRef = useRef(null);
    const userCredentials = useSelector((state) => state.getUserReducer);
    const {loading,error,userDetails} = userCredentials
    const [user, setUser] = useState(localStorage.getItem("access") ? jwtDecode(localStorage.getItem("access")) : null)

    useEffect(() => {
        if (user&&user?.user_id) {
          dispatch(getUserAction(user.user_id));
        }

      }, [dispatch, user]);

    useEffect(() => {
        if (!profileMenuOpen) return;
        const handleClickOutside = (e) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [profileMenuOpen]);

    const handleAvatarClick = (e) => {
        e.stopPropagation();
        setProfileMenuOpen((prev) => !prev);
    };

    const handleOpenPicture = () => {
        const rect = avatarRef.current.getBoundingClientRect();
        setAvatarRect(rect);
        setProfileMenuOpen(false);
        setPictureView('opening-start');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => setPictureView('opening-end'));
        });
    };

    const handleClosePicture = () => {
        setPictureView('closing');
    };

    const handlePictureTransitionEnd = () => {
        if (pictureView === 'closing') {
            setPictureView('closed');
            setAvatarRect(null);
        }
    };

    const handleEditPictureClick = (e) => {
        e.stopPropagation();
        editImageInputRef.current?.click();
    };

    const handleEditPictureFileChange = (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        const formData = new FormData();
        formData.append('image', file);
        dispatch(updateUserAction({ user: userDetails?.id, data: formData, navigate }));
    };

    const handleOpenProfile = () => {
        setProfileMenuOpen(false);
        navigate('/updateUser');
    };

    const handleLogOut = () => {
        setProfileMenuOpen(false);
        setUser(null);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/signin');
    };

    const isPictureExpanded = pictureView !== 'closed';
    const isPictureCentered = pictureView === 'opening-end';

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


                        <Nav.Link className="p-0" ref={profileMenuRef} style={{position:'relative'}}>
                            <img
                                ref={avatarRef}
                                src={userDetails?.image || UserDefaultImage}
                                alt="Profile"
                                onError={(e) => {
                                    e.currentTarget.src = UserDefaultImage;
                                }}
                                onClick={handleAvatarClick}
                                className="navbar-avatar"
                                style={{cursor:'pointer', opacity: isPictureExpanded ? 0 : 1}}
                            />

                            {profileMenuOpen && (
                                <div className="profile-menu">
                                    <button type="button" className="profile-menu-item" onClick={handleOpenPicture}>
                                        Picture
                                    </button>
                                    <button type="button" className="profile-menu-item" onClick={handleOpenProfile}>
                                        Profile
                                    </button>
                                    <button type="button" className="profile-menu-item profile-menu-item-danger" onClick={handleLogOut}>
                                        <LogOut style={{color:"#ff6b6b", width:'1rem', height:'1rem'}}/>
                                        Log Out
                                    </button>
                                </div>
                            )}
                        </Nav.Link>

                        </Container>

                    </Nav>
                </Navbar.Collapse>
            </Container>
            <CoinsPopup setOpen={setOpen} open = {open}/>
            <WishListPopup wishList = {wishList} setWishList = {setWishList}/>

            {isPictureExpanded && avatarRect && createPortal(
                <div
                    className={`profile-picture-backdrop${isPictureCentered ? ' visible' : ''}`}
                    onClick={handleClosePicture}
                >
                    <img
                        src={userDetails?.image || UserDefaultImage}
                        alt="Profile"
                        onError={(e) => {
                            e.currentTarget.src = UserDefaultImage;
                        }}
                        onClick={(e) => { e.stopPropagation(); handleClosePicture(); }}
                        onTransitionEnd={handlePictureTransitionEnd}
                        className="profile-picture-expanded"
                        style={{
                            top: isPictureCentered ? '50vh' : `${avatarRect.top}px`,
                            left: isPictureCentered ? '50vw' : `${avatarRect.left}px`,
                            width: isPictureCentered ? 'min(80vmin, 560px)' : `${avatarRect.width}px`,
                            height: isPictureCentered ? 'min(80vmin, 560px)' : `${avatarRect.height}px`,
                            transform: isPictureCentered ? 'translate(-50%, -50%)' : 'translate(0, 0)',
                        }}
                    />

                    <button
                        type="button"
                        className="profile-picture-edit-btn"
                        onClick={handleEditPictureClick}
                        style={{ opacity: isPictureCentered ? 1 : 0, pointerEvents: isPictureCentered ? 'auto' : 'none' }}
                        aria-label="Change profile picture"
                        title="Change profile picture"
                    >
                        <Edit />
                    </button>

                    <input
                        ref={editImageInputRef}
                        type="file"
                        accept="image/*"
                        onClick={(e) => e.stopPropagation()}
                        onChange={handleEditPictureFileChange}
                        style={{ display: 'none' }}
                    />
                </div>,
                document.body
            )}
        </Navbar>
    );
}

export default Header;
