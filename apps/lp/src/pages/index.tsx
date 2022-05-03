import React from "react"
import { Layout, Seo } from "components"
import {
  BottomHeroSection,
  FaqSection,
  HeroSection,
  MidSection,
  StatsSection,
} from "sections"
import { GiSlashedShield } from "@react-icons/all-files/gi/GiSlashedShield"
import { GiAlarmClock } from "@react-icons/all-files/gi/GiAlarmClock"
import { GiMoneyStack } from "@react-icons/all-files/gi/GiMoneyStack"
import { BiNetworkChart } from "@react-icons/all-files/bi/BiNetworkChart"
import { FaLeaf } from "@react-icons/all-files/fa/FaLeaf"
import { ReviewsSection } from "sections/home/reviews"

const sections = {
  features: {
    title: "A Better Way To Travel",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
    featuresTitle: "Features",
    imageUrl: "https://source.unsplash.com/eGA5dZG4sCw",
    imageAlt: "Bus",
    direction: "left",
    features: [
      {
        title: "Safety",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: GiSlashedShield,
      },
      {
        title: "Reliability",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: GiAlarmClock,
      },
      {
        title: "Affordable",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: GiMoneyStack,
      },
      {
        title: "Environmentally Friendly",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: BiNetworkChart,
      },
      {
        title: "Largest Network in the U.S.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: FaLeaf,
      },
    ],
  },
  features2: {
    title: "A Better Way To Travel",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
    featuresTitle: "Features",
    imageUrl: "https://source.unsplash.com/eGA5dZG4sCw",
    imageAlt: "Bus",
    features: [
      {
        title: "Safety",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: GiSlashedShield,
      },
      {
        title: "Reliability",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: GiAlarmClock,
      },
      {
        title: "Affordable",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: GiMoneyStack,
      },
      {
        title: "Environmentally Friendly",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: BiNetworkChart,
      },
      {
        title: "Largest Network in the U.S.",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: FaLeaf,
      },
    ],
  },
}

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <HeroSection />
    {/* <MidSection section={sections.features} />
    <MidSection section={sections.features2} />
    <StatsSection />
    <ReviewsSection />
    <FaqSection />
    <BottomHeroSection /> */}
  </Layout>
)

export default IndexPage
