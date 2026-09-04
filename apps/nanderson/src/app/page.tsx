import { Button } from '@repo/ui/button'

export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <a
        href="#"
        className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs hover:bg-neutral-secondary-medium"
      >
        <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
          This will eventually be my website
        </h5>
        <p className="text-body">I'm tired grandpa.</p>
      </a>
      <div className="flex gap-4">
        <Button href="/page2">Go to Page 2</Button>
        <Button href="/input">Go to my Input Demo</Button>
      </div>
    </main>
  )
}
