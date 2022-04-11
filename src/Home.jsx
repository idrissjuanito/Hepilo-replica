import Button from './components/Button'
import { BsCheckCircleFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <Hero />
      <MobVersion />
      <GithubSection />
    </>
  )
}

function GithubSection() {
  return (
    <section className="w-full bg-neutral-900 text-white py-8">
      <div className="w-container container mx-auto md:px-8 flex flex-col justify-center items-center md:flex-row md:gap-x-4">
        <div className="md:basis-2/5 text-center md:text-left">
          <h4 className="text-4xl font-medium p-4">
            {' '}
            Transparent and 100% open source
          </h4>
          <p className=" text-lg font-semibold text-gray-400">
            Our source code is available on GitHub under the MIT License. Feel
            free to fork it, twist it, flip it or review it to verify that our
            actions match with our words.
          </p>
        </div>
        <div className="bg-home-github bg-center bg-contain bg-no-repeat w-full md:basis-3/5 min-h-[40vh] h-full md:h-[40vw] md:px-12"></div>
      </div>
    </section>
  )
}

function Hero() {
  return (
    <section className="w-full bg-neutral-900 text-white py-12">
      <div className="w-container container mx-auto flex flex-col justify-between items-center md:flex-row ">
        <div className="md:basis-30 flex flex-col justify-center gap-y-3 text-center md:text-left py-4">
          <h2 className="text-6xl font-medium">
            {' '}
            <span className="text-accent">Ultimate</span>
            <br />
            Shopping List
          </h2>
          <p className=" text-lg font-semibold text-gray-400">
            Easily create and organize multiple shopping lists all in one place.
          </p>
          <ul className="flex flex-auto gap-x-3 justify-center md:justify-start py-2">
            <Link to={'/login'}>
              <Button className="bg-blue-500" text="GET STARTED" />
            </Link>
            <Link to={'lists/YhLtRhkf1deiaLzHQzKN'}>
              <Button className="bg-gray-500" text="LIVE DEMO" />
            </Link>
          </ul>
          <ul className="flex my-2 flex-auto gap-x-6 justify-center md:justify-start">
            <li className="flex items-center gap-2">
              <span className="text-accent text-xl inline-block">
                <BsCheckCircleFill />
              </span>{' '}
              Free to use
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent text-xl inline-block">
                <BsCheckCircleFill />
              </span>{' '}
              No credit Card required
            </li>
          </ul>
          <span className=" block h-px w-4/5 bg-accent mx-auto md:mx-0"></span>
        </div>
        <div className="bg-hero-dark bg-center bg-contain bg-no-repeat w-full md:basis-70 h-60 md:h-[80vh] md:max-h-[38rem]"></div>
      </div>
    </section>
  )
}

function MobVersion() {
  return (
    <section className="w-full bg-gray-800 text-white py-12">
      <div className="w-container container mx-auto md:px-8 flex flex-col justify-center items-center md:flex-row-reverse gap-y-6 md:gap-x-24">
        <div className="md:basis-1/2 text-center md:text-left">
          <h4 className="text-4xl font-medium py-4">
            {' '}
            Stay on top of your budget
          </h4>
          <p className=" text-lg font-semibold text-gray-400">
            Easily track the cost of your shopping list items so you don't go
            above budget.
          </p>
        </div>
        <div className="bg-home-budget bg-center bg-contain bg-no-repeat w-full md:basis-1/2 min-h-[70vh] h-full md:h-[65vw] md:px-12"></div>
      </div>
    </section>
  )
}
