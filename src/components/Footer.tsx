'use client'

import Image from 'next/image'
import Link from 'next/link'

import { footerLinks } from '@/constants'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_links_container">
        <div className="footer_rights">
          <Image
            src="/logo.svg"
            alt="Car hub logo"
            width={118}
            height={18}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            Car Hub 2023
            <br />
            All rights reserved &copy;
          </p>
        </div>

        <div className="footer_links">
          {footerLinks.map(link => (
            <div key={link.title} className="footer_link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map(item => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="text-gray-500"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer_copyrights">
        <p>@2023 Car Hub. All Rights Reserved</p>
        <div className="footer_copyrights_link">
          <Link href="/" className="text-gray-500">
            Privacy Policy
          </Link>
          <Link href="/" className="text-gray-500">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
