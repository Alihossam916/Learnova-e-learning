import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
        <nav>
            <ul className="flex items-center justify-between p-4 capitalize">
                <div className="flex items-center gap-3">
                    <Link href={"/"}>
                        <li>learnova</li>
                    </Link>
                    <Link href={"/courses"}>
                        <li>courses</li>
                    </Link>
                    <Link href={"/dashboard"}>
                        <li>dashboard</li>
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <Link href={"/auth/login"}>
                        <li>sign in</li>
                    </Link>
                    <Link href={"/auth/sign-up"}>
                        <li>get started</li>
                    </Link>
                </div>
            </ul>
        </nav>
    </header>
  )
}

export default Header