import Image from "next/image";
import PageHero from "@/components/PageHero";
import HomeAchievements from "@/components/HomeAchievements";
import HomeWhyChoose from "@/components/HomeWhyChoose";
import HomeContact from "@/components/HomeContact";

const FOUNDER_DESCRIPTION = [
  "I've spent over 10 years working in Dubai real estate, both as an investor and as a broker. Having lived in Dubai for more than 30 years, I've seen firsthand how this city has grown into one of the world's most exciting property markets.",
  "My focus is on luxury villas and mansions across Dubai's most prestigious communities. But beyond transactions, I care about people. The market here moves fast, and my goal is to guide every client personally, making sure they feel confident, informed, and never miss the right opportunity.",
  "For me, it's not just about closing deals. It's about building long-term relationships and delivering an experience that truly reflects the standard of Dubai real estate.",
];

export default function AboutPage() {
  return (
    <main className="bg-black text-white font-sans">
      <PageHero
        title={
          <>
            About <span className="text-[#e0b973]">Sartawi</span>
          </>
        }
        subtitle="Trust, resilience, and ambition: from a village of hope to a city of dreams."
      />

      {/* Who Are We */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-16 border-b border-zinc-800/60">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
            <div className="w-full lg:w-[52%] order-2 lg:order-1">
              <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Who we are
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 tracking-tight">
                From a Village of Hope to a City of Dreams
              </h2>
              <div className="text-gray-400 leading-relaxed space-y-5 text-base sm:text-lg">
                <p>
                  Sartawi Properties was born from the dreams of two brothers from a
                  small village in Palestine, a name that stands for{" "}
                  <strong className="text-white">Trust, Resilience and Ambition</strong>.
                </p>
                <p>
                  With over two decades of combined experience, they have witnessed
                  the city&apos;s transformation firsthand and developed a unique
                  understanding of its market dynamics.
                </p>
                <p>
                  They transformed their local expertise into a global real estate
                  company, helping international investors navigate the city&apos;s
                  dynamic and booming property market.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] order-1 lg:order-2">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/founder.jpeg"
                  alt="Sartawi Properties founders"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Purpose */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-16 border-b border-zinc-800/60 bg-zinc-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-14 lg:gap-20">
            <div className="w-full lg:w-[52%] order-2 lg:order-2">
              <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                Our purpose
              </p>
              <h2 className="text-3xl sm:text-4xl font-light text-white mb-6 tracking-tight">
                Beyond transactions, we help shape futures
              </h2>
              <div className="text-gray-400 leading-relaxed space-y-5 text-base sm:text-lg">
                <p>
                  At Sartawi Properties, our purpose goes beyond transactions: we help
                  shape futures. As trusted real estate brokers, we guide
                  international investors through Dubai&apos;s dynamic property market
                  with transparency, tailored support, and reliable results.
                </p>
                <p>
                  Our mission is to build lasting relationships by offering
                  personalized solutions that meet each client&apos;s unique goals.
                </p>
                <p>
                  With a profound understanding of the local market and a global
                  perspective, we are well equipped to navigate the complexities of
                  Dubai&apos;s real estate landscape and deliver outstanding results.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-[48%] order-1 lg:order-1">
              <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src="/team.jpeg"
                  alt="Sartawi Properties team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder: Mohammed Younis */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-16 border-b border-zinc-800/60">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#e0b973] text-xs font-semibold uppercase tracking-[0.2em] mb-4 text-center">
            Founder
          </p>
          <h2 className="text-3xl sm:text-4xl font-light text-white mb-14 tracking-tight text-center">
            Mohammed Younis
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-2 border-[#e0b973]/40 shadow-xl ring-2 ring-zinc-800/50">
                <Image
                  src="/founder2.webp"
                  alt="Mohammed Younis, Founder, Sartawi Properties"
                  width={208}
                  height={208}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-white font-semibold text-lg">Mohammed Younis</p>
              <p className="text-[#e0b973] text-sm font-medium">Founder</p>
            </div>
            <div className="flex-1 space-y-6 text-gray-400 leading-relaxed text-base sm:text-lg">
              {FOUNDER_DESCRIPTION.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HomeAchievements />
      <HomeWhyChoose />
      <HomeContact />
    </main>
  );
}
