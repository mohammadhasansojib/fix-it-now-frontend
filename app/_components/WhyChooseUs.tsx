import { ShieldCheck, Tag, CalendarClock, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";


type ValueProp = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const VALUE_PROPS: ValueProp[] = [
  {
    title: "Verified technicians",
    description:
      "Every pro is background-checked and identity-verified before they join the platform.",
    icon: ShieldCheck,
  },
  {
    title: "Upfront pricing",
    description:
      "See the cost before you book. No hidden fees, no surprises at your doorstep.",
    icon: Tag,
  },
  {
    title: "Flexible booking",
    description:
      "Reschedule or cancel with ease. Book for today or plan ahead — your call.",
    icon: CalendarClock,
  },
  {
    title: "Rated & reviewed",
    description:
      "Real reviews from real customers, so you know who you're inviting in.",
    icon: Star,
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="w-full border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Why choose FixItNow
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Built to make hiring a technician feel safe and simple.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-3 rounded-lg border border-border p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;