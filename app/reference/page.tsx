'use client'
import React, { useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EnhancedSectionDivider } from '@/components/ui/enhanced-section-divider'
import {
  MapPin,
  Calendar,
  Star,
  Award,
  CheckCircle,
  ArrowRight,
  Users,
  ChevronLeft,
  ChevronRight,
  Phone,
} from 'lucide-react'
import { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { client } from '@/lib/sanity.client'
import {
  featuredReferencesQuery,
  projectReferencesQuery,
  referenceHeroVideoQuery,
} from '@/lib/sanity.queries'
import { BackgroundVideo } from '@/components/ui/background-video'

type FeaturedReference = {
  id: string
  title: string
  description?: string
  image: string // odkladat na server
  gallery?: Array<{ url: string; alt?: string }>
  category: string
  location?: string
  year?: string
  rating?: number
  highlights?: string[]
  savings?: string
}

type ListReference = {
  id: string
  title: string
  description?: string
  image: string
  gallery?: Array<{ url: string; alt?: string }>
  category: string
  location?: string
  year?: string
  createdAt?: string
  rating?: number
}

// Custom arrow components for carousel
const CustomPrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
  >
    <ChevronLeft className="h-6 w-6 text-gray-700" />
  </button>
)

const CustomNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
  >
    <ChevronRight className="h-6 w-6 text-gray-700" />
  </button>
)

export default function ReferencePage() {
  const [featuredReferences, setFeaturedReferences] = useState<FeaturedReference[]>([])
  const [otherReferences, setOtherReferences] = useState<ListReference[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroVideo, setHeroVideo] = useState<{
    videoWebm?: string
    videoMp4?: string
    posterImage?: string
    videoOpacity?: number
  } | null>(null)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [featured, other, heroSettings] = await Promise.all([
          client.fetch(featuredReferencesQuery),
          client.fetch(projectReferencesQuery),
          client.fetch(referenceHeroVideoQuery),
        ])

        // Map data to match expected types
        interface SanityRef {
          _id: string
          slug?: { current: string }
          title: string
          description?: string
          image: string
          gallery?: Array<{ url: string; alt?: string }>
          category: string
          location?: string
          year?: string
          rating?: number
          highlights?: string[]
          savings?: string
          _createdAt?: string
        }
        const mappedFeatured = featured.map((ref: SanityRef) => ({
          id: ref.slug?.current || ref._id,
          title: ref.title,
          description: ref.description,
          image: ref.image,
          gallery: ref.gallery,
          category: ref.category,
          location: ref.location,
          year: ref.year,
          rating: ref.rating,
          highlights: ref.highlights,
          savings: ref.savings,
        }))

        const mappedOther = other.map((ref: SanityRef) => ({
          id: ref.slug?.current || ref._id,
          title: ref.title,
          description: ref.description,
          image: ref.image,
          gallery: ref.gallery,
          category: ref.category,
          location: ref.location,
          year: ref.year,
          rating: ref.rating,
          createdAt: ref._createdAt,
        }))

        setFeaturedReferences(mappedFeatured)
        setOtherReferences(mappedOther)
        if (heroSettings) {
          setHeroVideo(heroSettings)
        }
      } catch (error) {
        console.error('Error fetching references:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const categoryStyles = useMemo(() => {
    return (category: string) => {
      switch (category) {
        case 'Klimatizace':
          return { bg: 'bg-blue-50', text: 'text-blue-600' }
        case 'Tepelná čerpadla':
        case 'tepelna-cerpadla':
          return { bg: 'bg-green-50', text: 'text-green-600' }
        case 'Rekuperace':
          return { bg: 'bg-purple-50', text: 'text-purple-600' }
        case 'Elektroinstalace':
          return { bg: 'bg-orange-50', text: 'text-orange-600' }
        default:
          return { bg: 'bg-gray-50', text: 'text-gray-700' }
      }
    }
  }, [])

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    customPaging: (i: number) => (
      <div
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === currentSlide ? 'bg-blue-600' : 'bg-white/50'
        }`}
      />
    ),
    appendDots: (dots: React.ReactNode) => (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <ul className="flex space-x-2">{dots}</ul>
      </div>
    ),
  }

  // Loading states
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Načítání...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - konzistentní s hlavní stránkou */}
      <section className="relative h-[70vh] md:h-[90vh] min-h-[700px] md:min-h-[600px] flex items-center bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600">
        {heroVideo?.videoWebm || heroVideo?.videoMp4 ? (
          <BackgroundVideo
            videoWebm={heroVideo.videoWebm}
            videoMp4={heroVideo.videoMp4}
            posterImage={heroVideo.posterImage || '/images/hero_reference.png'}
            opacity={heroVideo.videoOpacity}
          />
        ) : (
          <div className="absolute inset-0">
            <Image
              src="/images/hero_reference.png"
              alt="Naše reference"
              fill
              className="object-cover opacity-20"
            />
          </div>
        )}
        <div className="relative z-10 container px-4 md:px-6">
          <div className="grid lg:grid-cols-12 gap-4 md:gap-8 items-center">
            {/* Left side - Content */}
            <div className="lg:col-span-8 text-white flex flex-col justify-center">
              <Badge className="bg-white/20 text-white border-white/20 text-sm px-4 py-2 mb-6 inline-block">
                Naše reference
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                Úspěšné projekty po celé ČR
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed drop-shadow-lg max-w-3xl">
                Podívejte se na naše realizace klimatizací, tepelných čerpadel a rekuperací. Každý
                projekt je důkazem naší odbornosti a spokojenosti zákazníků.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg"
                  asChild
                >
                  <Link href="/kontakt">
                    <ArrowRight className="h-5 w-5 mr-2" />
                    Nezávazná poptávka
                  </Link>
                </Button>
                {featuredReferences && featuredReferences.length > 0 && (
                  <Button
                    size="lg"
                    className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all"
                    asChild
                  >
                    <Link href={`/reference/${featuredReferences[0].id}`}>
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Zobrazit nejnovější referenci
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Right side - Logo */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full scale-110 animate-pulse"></div>
                <div className="relative bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30 shadow-2xl"></div>
                {/* Floating elements */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider positioned at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <EnhancedSectionDivider
            variant="wave"
            animated={true}
            height="xl"
            fromColor="from-blue-600"
            toColor="to-white"
            particles={false}
          />
        </div>
      </section>

      {/* Map Section - Modernized */}
      <section
        id="reference-mapa"
        className="py-10 bg-gradient-to-br from-[#f8f9fa] via-white to-blue-50/30 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-100 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-blue-600 mr-3" />
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">Naše pokrytí</Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Naše působnost v regionu
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Působíme v Moravskoslezském, Olomouckém a Zlínském kraji. Naše reference jsou důkazem
              kvality napříč celým regionem.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mt-8"></div>
          </div>

          {/* Mapa s pokrytím */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Levý sloupec - Text */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Naše působnost v regionu
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Působíme v Moravskoslezském, Olomouckém a Zlínském kraji. Ostrava je naším
                    hlavním centrem, odkud pokrýváme celý region a realizujeme projekty pro
                    spokojené zákazníky.
                  </p>
                </div>

                {/* Klíčové oblasti */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Moravskoslezský kraj</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Olomoucký kraj</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Zlínský kraj</span>
                  </div>
                </div>

                {/* Statistiky */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">120+</div>
                    <div className="text-sm text-gray-600">Spokojených zákazníků</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Kraje pokrytí</div>
                  </div>
                </div>
              </div>

              {/* Pravý sloupec - Mapa */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 md:p-6 border border-blue-100 shadow-lg">
                  <Image
                    src="/mapa/mapa2.jpg"
                    alt="Mapa pokrytí - Ostrava, Olomoucký a Zlínský kraj"
                    width={600}
                    height={360}
                    className="max-w-[60%] md:max-w-[60%] h-auto rounded-xl mx-auto"
                  />
                </div>

                {/* Dekorativní prvky */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Hledáte kvalitní řešení a spolehlivou firmu?
              </h3>
              <p className="text-gray-600 mb-6">
                Jsme připraveni realizovat váš projekt s maximální profesionalitou.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/kontakt">
                    <Phone className="h-4 w-4 mr-2" />
                    Nezávazná poptávka
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  asChild
                >
                  <Link href="#top-reference">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Zobrazit reference
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Reference Carousel */}
      <section id="top-reference" className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-8 w-8 text-yellow-500 mr-3" />
              <Badge className="bg-yellow-100 text-yellow-800 px-4 py-2">TOP reference</Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Naše nejlepší projekty</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tyto projekty jsou naši pýchou.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {featuredReferences && featuredReferences.length > 0 ? (
                <Slider {...carouselSettings}>
                  {featuredReferences.map((reference) => (
                    <div key={reference.id} className="px-4">
                      <Link
                        href={`/reference/${reference.id}`}
                        className="block bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-full hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="grid lg:grid-cols-2 gap-0 flex-grow">
                          {/* Hlavní fotka */}
                          <div className="relative w-full overflow-hidden aspect-[5/4]">
                            <Image
                              src={reference.image}
                              alt={reference.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-yellow-500 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                TOP
                              </Badge>
                            </div>
                            <div className="absolute top-4 right-4">
                              <div className="flex items-center bg-white/90 rounded-full px-3 py-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                                ))}
                                {reference.rating && (
                                  <span className="ml-2 text-xs font-medium">
                                    {reference.rating}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Hlavní text */}
                          <div className="p-8 lg:p-12 flex flex-col justify-center flex-grow">
                            <div className="flex items-center justify-between mb-4">
                              <Badge
                                className={`${categoryStyles(reference.category).bg} ${categoryStyles(reference.category).text} border-0`}
                              >
                                {reference.category}
                              </Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 mr-1" />
                                {reference.location}
                                <Calendar className="h-4 w-4 ml-3 mr-1" />
                                {reference.year}
                              </div>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{reference.title}</h3>
                            <p className="text-muted-foreground mb-6 leading-relaxed overflow-hidden [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                              {reference.description}
                            </p>

                            <div className="mb-6">
                              <h4 className="font-semibold mb-3">Klíčové vlastnosti:</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {(reference.highlights || []).map((highlight, index) => (
                                  <div key={index} className="flex items-center text-sm">
                                    <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                                    <span>{highlight}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {reference.savings && (
                              <div className="bg-green-50 rounded-lg p-4 mb-6">
                                <div className="flex items-center">
                                  <Award className="h-5 w-5 text-green-600 mr-2" />
                                  <span className="font-semibold text-green-800">
                                    {reference.savings}
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-auto py-3 px-4 rounded-md text-center font-medium transition-colors duration-200">
                              Zobrazit detail projektu
                              <ArrowRight className="h-4 w-4 ml-2 inline" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </Slider>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Načítání referencí...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mx-8"></div>

      {/* Ostatní reference */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Co o nás říkají naši zákazníci?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Každý projekt je pro nás důležitý a zaslouží si naši veškerou a plnou pozornost. Také
              i proto se všechny projekty u nás zůstávají v našem paměti. Vy si je můžete
              prohlédnout níže.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherReferences && otherReferences.length > 0 ? (
              otherReferences.map((reference) => (
                <Link
                  key={reference.id}
                  href={`/reference/${reference.id}`}
                  className="block group hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden flex flex-col h-full rounded-lg"
                >
                  <div className="p-0 flex flex-col h-full">
                    {/* Hlavní fotka */}
                    <div className="relative w-full overflow-hidden aspect-[5/4]">
                      <Image
                        src={reference.image}
                        alt={reference.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center bg-white/90 rounded-full px-2 py-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                          {reference.rating && (
                            <span className="text-xs font-medium">{reference.rating}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Hlavní text */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <Badge
                          className={`${categoryStyles(reference.category).bg} ${categoryStyles(reference.category).text} border-0 text-xs`}
                        >
                          {reference.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {reference.location}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {reference.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed overflow-hidden [display:-webkit-box] [-webkit-line-clamp:5] [-webkit-box-orient:vertical]">
                        {reference.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {reference.year}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-3 w-3 text-blue-600 mr-1" />
                          <span className="text-xs text-blue-600 font-medium">Realizováno</span>
                        </div>
                      </div>

                      <div className="w-full border border-gray-300 group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors mt-auto py-2 px-4 rounded-md text-center text-sm font-medium text-gray-700 group-hover:text-blue-700">
                        Zobrazit detail
                        <ArrowRight className="h-3 w-3 ml-2 inline" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Načítání projektů...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0"></div>
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <Badge className="bg-white/20 text-white border-white/20 px-4 py-2 mb-6">
                Děkujeme našim klientům za hodnocení.
              </Badge>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Staňte se naší další referencí
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-3xl mx-auto">
              Máte projekt, který by mohl být naší další úspěšnou referencí? Kontaktujte nás a
              společně vytvoříme řešení přesně pro vaše potřeby.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold shadow-lg"
                asChild
              >
                <Link href="/kontakt">
                  <ArrowRight className="h-5 w-5 mr-2" />
                  Nezávazná poptávka
                </Link>
              </Button>
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-blue-700 transition-all font-semibold"
                asChild
              >
                <Link href="/sluzby">Naše služby</Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Garantovaná kvalita</h3>
                <p className="text-blue-100 text-sm">
                  Každý projekt se zárukou na práci i materiál
                </p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Zkušený tým</h3>
                <p className="text-blue-100 text-sm">
                  Náš tým se účastní pravidelných školení a přezkoušení z oboru
                </p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">Nejlepší v okolí</h3>
                <p className="text-blue-100 text-sm">
                  Jsme nejlepší v oboru v našem regionu. Vyzkoušejte nás!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
