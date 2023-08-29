import Link from "next/link";
import Image from "next/image";


interface FeatureProps {
  title: string;
  description: string;
  url: string;
}

function Feature({ title, description, url }: FeatureProps) {
  return (
    <div className="flex flex-col mb-10 lg:items-start items-center">
      
      <div className="flex-grow">
        <h2 className="text-pink-900 text-lg title-font font-medium mb-3">{title}</h2>
        <p className="leading-relaxed text-base">{description}</p>
        <Link href={url} className="mt-3 text-indigo-500 inline-flex items-center">
          Learn More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            {/* Add the SVG path here */}
          </svg>
        </Link>
      </div>
    </div>
  );
}

interface FeaturesProps {
  data: {
    heading: string;
    description: string;
    feature: FeatureProps[];
  };
}

export default function Features({ data }: FeaturesProps) {
  return (
    <section className="text-white-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-col flex-wrap mx-auto mb-10 lg:mb-0 lg:w-2/3 text-center">
          <h2 className="text-3xl font-bold mb-4">{data.heading}</h2>
          <p className="text-lg mb-8">{data.description}</p>
        </div>
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <img 
            alt="feature"
            className="object-cover object-center w-auto max-h-full"
            src="https://kodesolution.com/html/2018/martialarts-html/demo/images/about/3.png"
            
         
          />
        </div>
        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          {data.feature.map((feature: FeatureProps, index: number) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
