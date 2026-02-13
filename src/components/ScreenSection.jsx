import elephantLogo from '../assets/Main El&Moi.png'

const BlobIllustration = () => (
  <div className="flex justify-center my-8">
    <div className="relative w-48 h-48 sm:w-56 sm:h-56">
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-2xl scale-150" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-very-light to-primary-light/30 border border-primary/10" />
      <div className="absolute inset-4 rounded-full bg-white/80 dark:bg-surface-dark/80" />
    </div>
  </div>
)

export default function ScreenSection({ title, text, illustrationVariant = 'none', image, id, altBg = false }) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${altBg ? 'bg-primary-very-light/40 dark:bg-primary-very-light/5' : 'bg-white dark:bg-surface-dark'}`}
    >
      <div className="max-w-[1040px] mx-auto px-4 sm:px-6 text-center">
        {image && (
          <div className="flex justify-center mb-8">
            <img
              src={image}
              alt=""
              className="w-full max-w-md sm:max-w-lg h-auto rounded-2xl"
              aria-hidden
            />
          </div>
        )}
        {illustrationVariant === 'elephant' && !image && (
          <div className="flex justify-center mb-8">
            <img
              src={elephantLogo}
              alt=""
              className="h-32 sm:h-40 w-auto opacity-90"
              aria-hidden
            />
          </div>
        )}
        {illustrationVariant === 'blob' && <BlobIllustration />}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          {title}
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          {text}
        </p>
      </div>
    </section>
  )
}
