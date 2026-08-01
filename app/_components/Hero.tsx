

export const Hero = () => {
  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Trusted home services,
            <br className="hidden sm:block" /> booked in minutes
          </h1>

          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Verified technicians for plumbing, electrical, cleaning, and more
            — upfront pricing, no surprises.
          </p>

          {/* Trust row */}
          <dl className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4">
            <div>
              <dt className="sr-only">Verified technicians</dt>
              <dd className="text-xl font-semibold sm:text-2xl">500+</dd>
              <p className="mt-1 text-xs text-muted-foreground">
                Verified pros
              </p>
            </div>
            <div>
              <dt className="sr-only">Bookings completed</dt>
              <dd className="text-xl font-semibold sm:text-2xl">10k+</dd>
              <p className="mt-1 text-xs text-muted-foreground">
                Bookings done
              </p>
            </div>
            <div>
              <dt className="sr-only">Average rating</dt>
              <dd className="text-xl font-semibold sm:text-2xl">4.8★</dd>
              <p className="mt-1 text-xs text-muted-foreground">
                Average rating
              </p>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Hero;