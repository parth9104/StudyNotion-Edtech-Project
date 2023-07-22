
import React from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom';
import {NavbarLinks} from "../../data/navbar-links";
import { useLocation } from 'react-router-dom';
const Navbar = () => {
    const matchRoute = ()=>{ 
        const location = useLocation();
        return matchPath({path:route},location.pathname);
    }
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
    <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Images */}
        <Link to="/">
            <img src={logo} width={160} height={42} loading='lazy'/>
         </Link>
        {/* Nav links */}
        <nav>
            <ul className='flex gap-x-6 text-richblack-25'>{
                NavbarLinks.map((Link,index)=>(
                <li key={index}>
                    {
                        Link.title === "Catalog"?(<div></div>):(
                            <Link to={Link?.path}>
                            <p className={`${matchRoute(Link?.path)? "text-yelloe-25": "text-richblack-25"}`}>
                                {Link.title}
                            </p>
                            </Link>

                        )
                    }
                </li>
                ))
            }

            </ul>
        </nav>
    </div>
    </div>
  )
}

export default Navbar;
