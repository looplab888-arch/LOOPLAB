export default function PrivacyPolicy() {
  return (
    <div className="bg-surface-container-low min-h-screen py-20 md:py-28 font-body">
      <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-3xl shadow-sm p-8 md:p-12 border border-outline-variant/30">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-headline font-bold text-on-surface mb-4 tracking-[-0.025em] text-balance">
          Privacy Policy
        </h1>
        <p className="text-on-surface-variant mb-12 text-sm">
          Last Updated: April 2026
        </p>

        <div className="space-y-10 text-on-surface-variant leading-relaxed text-pretty">
          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">1. Introduction</h2>
            <p>
              Welcome to LoopLab. We respect your privacy and are committed to protecting your personal data.
              This privacy policy will inform you how we look after your personal data when you visit our website
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">2. The Data We Collect</h2>
            <p className="mb-4">
              We may collect, use, store and transfer different kinds of personal data about you which we have
              grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-primary">
              <li>Identity Data: first name, last name, username or similar identifier.</li>
              <li>Contact Data: billing address, delivery address, email address and telephone numbers.</li>
              <li>Technical Data: internet protocol address, login data, browser type and version, time zone setting, operating system and platform.</li>
              <li>Usage Data: information about how you use our website, products and services.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">3. How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your
              personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 mt-4 space-y-2 marker:text-primary">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
              <li>Where it is necessary for our legitimate interests and your fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">4. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal
              data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">5. Your Legal Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection laws in relation to your personal data,
              including the right to request access, correction, erasure, restriction, transfer, to object to processing,
              to portability of data and to withdraw consent where applicable.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">6. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us
              at looplab888@gmail.com or visit our Contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
