import { Button, Card } from 'flowbite-react'

const TechIdeas = [
    {
        title: 'V1 Release',
        description: 'Minimalist changes with PWA in mind. Have a PWA React App with an Install Prompt.',
        image: './react-pwa.png',
        externalLink: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps',
    },
    {
        title: 'V2 Release',
        description: 'Exploit PWA features- Local Storage, Service Worker, and more.',
        image: './pwa-superhero.jpeg',
        externalLink: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps'
    },
    {
        title: 'The Forgotten - Bit Component',
        description: 'Wish to include Bit Component in this App. Version controlled components.',
        image: './bit-component.png',
        externalLink: 'https://bit.dev/'
    },
    {
        title: 'The Impossible',
        description: 'Most opinionated CSS framework - TailwindCSS.',
        image: './tailwindcss.png',
        externalLink: 'https://tailwindcss.com/'
    }

]
const Dreams = () => {
    return (
        <article className='flex flex-col gap-4 p-4'>
            {TechIdeas.map((techIdea) => {
                return <Card className='max-w-sm mx-auto' imgAlt="PWA Logo" imgSrc={techIdea.image}>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {techIdea.title}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {techIdea.description}
                    </p>
                    <Button onClick={() => window.open(techIdea.externalLink, '_blank')}>
                        Learn more
                        <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </Button>
                </Card>
            })}
        </article>)
}

export default Dreams