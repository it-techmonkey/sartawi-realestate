import Hero from "@/components/Hero";
import DeveloperLogoCarousel from "@/components/DeveloperLogoCarousel";
import HomeAchievements from "@/components/HomeAchievements";
import HomeExpertise from "@/components/HomeExpertise";
import HomeWhyChoose from "@/components/HomeWhyChoose";
import HomeFeaturedSection from "@/components/HomeFeaturedSection";
import SellPropertyForm from "@/components/SellPropertyForm";
import HomeBlogs from "@/components/HomeBlogs";
import HomeFAQ from "@/components/HomeFAQ";
import HomeContact from "@/components/HomeContact";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <DeveloperLogoCarousel />

      <HomeAchievements />
      <HomeExpertise />
      <HomeWhyChoose />
      <HomeFeaturedSection />

      <SellPropertyForm />
      <HomeBlogs />
      <HomeFAQ />
      <HomeContact />
    </div>
  );
}
