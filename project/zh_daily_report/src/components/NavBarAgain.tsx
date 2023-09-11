import React from "react";
import PropTypes from "prop-types";
import { NavBar } from 'antd-mobile';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import './NavBarAgain.scss';

const NavBarAgain = function NavBarAgain(props:any) {
    let { title } = props;
    const navigate = useNavigate(),
        location = useLocation(), //路径 隐式参数
        [usp] = useSearchParams(); //问号参数

    const handleBack = () => {
        // 特殊:登录页 & to的值是/deatil/xxx
        let to = usp.get('to') as string;
        if (location.pathname === '/login' && /^\/detail\/\d+$/.test(to)) {
            navigate(to, { replace: true }); //替换写法
            return;
        }
        navigate(-1); //后退
    };

    return <NavBar className="navbar-again-box"
        onBack={handleBack}>
        {title}
    </NavBar>
};
NavBarAgain.defaultProps = {
    title: '个人中心'
};
NavBarAgain.propTypes = {
    title: PropTypes.string
};

export default NavBarAgain;