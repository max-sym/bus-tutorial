import React from "react"
import tw from "tailwind-styled-components"
import { Text } from "@bus/ui"
import { Link } from "gatsby"
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook"
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"

const Container = tw.div`flex flex-col mt-48 px-24 pb-4 pt-12 bg-gray-900 dark:bg-gray-800`

const footerItems = {
  left: [
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Help",
      link: "/help",
    },
  ],
  right: [
    {
      title: "Privacy",
      link: "/privacy",
    },
    {
      title: "Terms",
      link: "/terms",
    },
    {
      title: "Cookies",
      link: "/cookies",
    },
  ],
}

const socialMediaLinks = [
  {
    name: "Facebook",
    link: "https://www.facebook.com/bus.technologies",
    icon: FaFacebook,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/bus.technologies",
    icon: FaInstagram,
  },
  {
    name: "Twitter",
    link: "https://www.twitter.com/bus.technologies",
    icon: FaTwitter,
  },
]

const Column = ({ title, items }) => (
  <div>
    <Text color="white" variant="button">
      {title}
    </Text>
    <div className="mt-4">
      {items.map(item => (
        <Link key={item.link} to={item.link}>
          <Text color="white" className="py-1">
            {item.title}
          </Text>
        </Link>
      ))}
    </div>
  </div>
)

const CopyrightText = () => (
  <Text color="none" className="text-gray-400" variant="subtitle">
    &copy; {new Date().getFullYear()} Bus Booking Website Tutorial. All rights
    reserved.
  </Text>
)

export const Footer = () => (
  <Container>
    <div className="flex justify-evenly">
      <Column items={footerItems.left} title={"General"} />
      <Column items={footerItems.right} title={"Legal"} />
    </div>
    <div className="mt-8">
      <Text color="white" variant="button" className="text-center">
        {"Social Media"}
      </Text>
      <div className="flex justify-center mt-4 gap-x-4">
        {socialMediaLinks.map(item => (
          <a key={item.link} href={item.link}>
            {<item.icon className="w-8 h-8 text-white" />}
          </a>
        ))}
      </div>
    </div>
    <div className="mt-12 text-center">
      <CopyrightText />
    </div>
  </Container>
)
