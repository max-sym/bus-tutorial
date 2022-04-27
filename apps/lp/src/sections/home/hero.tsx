import React from "react"
import tw from "tailwind-styled-components"
import { Section, Text, Button } from "components"
import { HeroFeatures } from "./hero-features"
import { BookingForm } from "./booking-form"
import { InView } from "react-cool-inview"

const Container = tw.div`mt-16 flex justify-between items-center gap-x-8`
const Column = tw.div`w-1/2`

const Separator = tw.div`w-12 h-1 bg-blue-500 mt-4 transform transition duration-1000 delay-[1500ms] origin-left`
const Gradient = tw.div`absolute inset-0 bg-gradient-radial-hero`

const SmallHeadingText = tw(Text)`delay-500 duration-1000 ease-in-out`
const BigHeadingText = tw(Text)`mt-1 delay-1000 duration-1000 ease-in-out`
const DescriptionText = tw(
  Text
)`mt-6 delay-[1500ms] duration-[2000ms] ease-in-out w-2/3`
const ButtonContainer = tw.div`delay-[1500ms] transition duration-[2000ms] mt-8`

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

const TextSection = ({ observe, inView }: any) => (
  <div ref={observe}>
    <div className="space-y-6">
      <LogoTitle inView={inView} />
      <DescriptionText
        variant="bodyBig"
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
    <div className="mt-32">
      <HeroFeatures inView={inView} />
    </div>
  </div>
)

const GradientBackground = () => (
  <div className="absolute left-0 right-0 top-0 h-[900px] z-0">
    <Gradient />
  </div>
)
const BookingFormWrapper = tw.div`transform transition duration-1000`

const WrappedBookingForm = ({
  observe,
  inView,
}: {
  observe?: any
  inView?: boolean
}) => (
  <BookingFormWrapper
    ref={observe}
    className={`${inView ? "" : "translate-y-5 opacity-0"}`}
  >
    <BookingForm />
  </BookingFormWrapper>
)

const ImageContainer = tw.div`rounded-3xl shadow-lg overflow-hidden transition ease-in-out delay-500 duration-[2000ms]`
const MainImage = tw.img`w-full h-full object-cover transition transform ease-out duration-[14s]`

const HeroImage = ({ observe, inView }: any) => (
  <ImageContainer ref={observe} className={`${inView ? "" : "opacity-0"}`}>
    <MainImage
      className={`${inView ? "" : "scale-[1.15] rotate-2 translate-y-4"}`}
      src="https://source.unsplash.com/T5jzpRTVF1U"
      alt="Bus"
    />
  </ImageContainer>
)

export const HeroSection = () => (
  <>
    <GradientBackground />
    <Section className="h-[900px]">
      <div className="flex justify-center mt-16">
        <InView unobserveOnEnter>
          <WrappedBookingForm />
        </InView>
      </div>
      <Container>
        <Column>
          <InView unobserveOnEnter>
            <TextSection />
          </InView>
        </Column>
        <Column>
          <InView unobserveOnEnter>
            <HeroImage />
          </InView>
        </Column>
      </Container>
    </Section>
  </>
)
