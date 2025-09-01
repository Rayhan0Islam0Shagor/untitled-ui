import { CirclePlay } from 'lucide-react';
import Button from '../ui/button';
import Wrapper from '../ui/Wrapper';

const HeroSection = () => {
  return (
    <section className="md:min-h-[calc(100vh-68px)] overflow-hidden bg-background text-white relative">
      <Wrapper className="pt-20 lg:pt-10 w-full max-w-3xl px-2 text-left lg:text-center space-y-3 lg:space-y-6">
        <p className="text-[#E9D7FE] text-sm md:text-base leading-6 font-semibold">
          Super. Simple. Banking
        </p>
        <h1 className="font-semibold text-4xl lg:text-7xl lg:leading-[90px] text-white -tracking-[2%]">
          Banking technology that has your back.
        </h1>
        <p className="text-lg md:text-xl md:leading-[30px] text-[#E9D7FE]">
          Simple, transparent banking. No hidden fees and free overdrafts.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-3">
          <Button
            className="bg-white text-black w-full md:w-fit"
            icon={CirclePlay}
            iconPosition="left"
          >
            Demo
          </Button>
          <Button className="bg-[#7F56D9] text-white w-full md:w-fit">
            Sign up
          </Button>
        </div>
      </Wrapper>

      <div className="flex items-center justify-center w-full mt-12">
        <img
          src="/bank-cards.png"
          alt="Bank Cards"
          className="w-[140%] max-w-none lg:max-w-7xl h-auto object-cover"
        />
      </div>
    </section>
  );
};

export default HeroSection;
