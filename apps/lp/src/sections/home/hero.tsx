import React from "react"
import tw from "tailwind-styled-components"
import { Section, Text, Button } from "components"
import { HeroFeatures } from "./hero-features"
import { BookingForm } from "./booking-form"
import { InView } from "react-cool-inview"

const Container = tw.div`mt-16 flex justify-between items-center gap-x-8`
const Column = tw.div`md:w-1/2`

const SmallHeadingText = tw(Text)`delay-500 duration-1000 ease-in-out`
const BigHeadingText = tw(Text)`mt-1 delay-1000 duration-1000 ease-in-out`
const DescriptionText = tw(
  Text
)`mt-6 delay-[1500ms] duration-[2000ms] ease-in-out md:w-2/3`
const ButtonContainer = tw.div`delay-[1500ms] transition duration-[2000ms] mt-8`
const Separator = tw.div`w-12 h-1 bg-blue-500 mt-4 transform transition duration-1000 delay-[1500ms] origin-left`

const GradientBackgroundContainer = tw.div`hidden md:block absolute left-0 right-0 top-0 h-[900px] z-0 transition duration-700`
const Gradient = tw.div`absolute inset-0 bg-gradient-radial-hero dark:opacity-0 transition z-0`
const GradientDark = tw.div`absolute inset-0 bg-gradient-to-r w-2/3 from-black to-transparent opacity-0 dark:opacity-100 transition z-0`
const Glow = tw.div`absolute z-20 bg-[radial-gradient(#06f4,transparent,transparent)] transition dark:opacity-100 opacity-0`

export const LogoTitle = ({ inView }) => (
  <div>
    <div>
      <SmallHeadingText variant="h5" className={`${inView ? "" : "opacity-0"}`}>
        {"The Private"}
      </SmallHeadingText>
      <BigHeadingText variant="h3" className={`${inView ? "" : "opacity-0"}`}>
        <span className="text-blue-500">{"Bus"}</span>
        <span className="ml-3 text-green-500">{"Company"}</span>
      </BigHeadingText>
    </div>
    <Separator className={`${inView ? "" : "opacity-80 scale-x-0"}`} />
  </div>
)

const TextSection = ({ inView }: any) => (
  <div>
    <div className="space-y-6">
      <LogoTitle inView={inView} />
      <DescriptionText
        variant="bodyBig"
        color="gray-light"
        className={`${inView ? "" : "opacity-0"}`}
      >
        {
          "This is a private bus company that takes you from point A to point B within the Continental US."
        }
      </DescriptionText>
      <ButtonContainer className={`${inView ? "" : "opacity-0"}`}>
        <Button>{"Create Account"}</Button>
      </ButtonContainer>
    </div>
    <div className="mt-10 md:mt-32">
      <HeroFeatures inView={inView} />
    </div>
  </div>
)

const GradientBackground = ({ inView }) => (
  <GradientBackgroundContainer className={`${inView ? "" : "opacity-0"}`}>
    <Gradient />
    <GradientDark />
    <Glow
      className={`top-[10%] left-[-10%] w-[1000px] h-[700px] ${
        inView ? "" : "opacity-0"
      }`}
      style={{
        backfaceVisibility: "hidden",
      }}
    />
    <Glow
      className={`top-[-20%] left-[30%] w-[1000px] h-[700px] ${
        inView ? "" : "opacity-0"
      }`}
      style={{
        backfaceVisibility: "hidden",
      }}
    />
  </GradientBackgroundContainer>
)

const BookingFormWrapper = tw.div`transform transition duration-1000`
const WrappedBookingForm = ({ inView }: { inView?: boolean }) => (
  <BookingFormWrapper className={`${inView ? "" : "translate-y-5 opacity-0"}`}>
    <BookingForm />
  </BookingFormWrapper>
)

const ImageContainer = tw.div`rounded-3xl shadow-lg overflow-hidden transition ease-in-out delay-500 duration-[2000ms]`
const MainImage = tw.img`w-full h-full object-cover transition transform ease-out duration-[14s]`

const HeroImage = ({ inView }: any) => (
  <ImageContainer className={`${inView ? "" : "opacity-0"}`}>
    <MainImage
      className={`${inView ? "" : "scale-[1.15] rotate-2 translate-y-4"}`}
      src="https://source.unsplash.com/T5jzpRTVF1U"
      alt="Bus"
    />
  </ImageContainer>
)

export const HeroSectionCore = ({ observe, inView }: any) => (
  <div ref={observe}>
    <GradientBackground inView={inView} />
    <Section className="md:h-[740px]">
      <div className="justify-center hidden mt-16 md:flex">
        <WrappedBookingForm inView={inView} />
      </div>
      <Container>
        <Column>
          <TextSection inView={inView} />
        </Column>
        <Column className="hidden md:block">
          <HeroImage inView={inView} />
        </Column>
      </Container>
    </Section>
  </div>
)

export const HeroSection = () => (
  <InView unobserveOnEnter>
    <HeroSectionCore />
  </InView>
)
