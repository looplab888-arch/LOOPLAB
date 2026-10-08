export default function TermsOfService() {
  return (
    <div className="bg-surface-container-low min-h-screen py-20 md:py-28 font-body">
      <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-3xl shadow-sm p-8 md:p-12 border border-outline-variant/30">
        <h1 className="text-[clamp(2rem,5vw,3rem)] font-headline font-bold text-on-surface mb-4 tracking-[-0.025em] text-balance">
          Terms of Service
        </h1>
        <p className="text-on-surface-variant mb-12 text-sm">
          Last Updated: April 2026
        </p>

        <div className="space-y-10 text-on-surface-variant leading-relaxed text-pretty">
          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">1. Agreement to Terms</h2>
            <p>
              By accessing our website and using our services, you agree to be bound by these Terms of Service
              and all applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using or accessing this site. The materials contained in this website are protected
              by applicable copyright and trademark law.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">2. Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily download one copy of the materials on LoopLab website for
              personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer
              of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-5 space-y-2 marker:text-primary">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display;</li>
              <li>Attempt to decompile or reverse engineer any software contained on LoopLab website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or mirror the materials on any other server.</li>
            </ul>
            <p className="mt-4">
              This license shall automatically terminate if you violate any of these restrictions and may be
              terminated by LoopLab at any time.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">3. Disclaimer</h2>
            <p>
              The materials on LoopLab website are provided on an as-is basis. LoopLab makes no warranties,
              expressed or implied, and hereby disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability, fitness for a particular purpose,
              or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">4. Limitations</h2>
            <p>
              In no event shall LoopLab or its suppliers be liable for any damages (including, without limitation,
              damages for loss of data or profit, or due to business interruption) arising out of the use or
              inability to use the materials on LoopLab website, even if LoopLab or an authorized representative
              has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">5. Revisions and Errata</h2>
            <p>
              The materials appearing on LoopLab website could include technical, typographical, or photographic
              errors. LoopLab does not warrant that any of the materials on its website are accurate, complete or
              current. LoopLab may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="font-headline text-xl font-bold text-on-surface mb-3 tracking-[-0.01em]">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Sri Lanka
              and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
