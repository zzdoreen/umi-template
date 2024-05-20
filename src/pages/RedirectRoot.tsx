import { NavLink } from "@umijs/max";
import { useEffect, useRef } from "react";

export default function RedirectRoot() {
    const navRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => {
        if (navRef.current)
            navRef.current?.click()
    }, [])

    // 根据token和权限 动态重定向路由地址
    return <NavLink to='travel' ref={navRef} />
}