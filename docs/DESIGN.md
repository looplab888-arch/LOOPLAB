# LoopLab design system

Last updated: 2026-10-25

## Direction
Editorial software studio. LoopLab's loop identity connects the wordmark, brand artwork, and collaborative process. Preserve the purple and blue identity, Space Grotesk display face, and Manrope body face.

## Tokens
- Primary: #613380; hover: #7A4B9A; pale accent: #F3DAFF.
- Secondary: #3C6184; pale blue: #B0D5FD.
- Ink: #150C1C; soft ink: #281E31.
- Paper: #FBF9FD; quiet surface: #F2EFF5.
- Body ink: #171C21; secondary ink: #4C444F; outline: #CEC3D0.
- Display: Space Grotesk, weight 500, tracking -0.04em. Body: Manrope, line height 1.65.
- Hero: fluid 47 to 144px. Section headings: 36 to 64px. Body: 16 to 23px. Metadata: minimum 13px.
- Wrapper: maximum 1440px, fluid 24 to 88px horizontal padding.
- Media corners: 14 to 16px. Primary actions: pill shape, minimum 52px height.

## Composition and behavior
Homepage: balanced two-column hero with headline, description, and actions grouped on the left. The taller loop artwork occupies the right visual field with contained sizing, a quiet caption, and restrained scroll motion. A compact project chooser spans the row below. Mobile stacks copy, artwork, caption, and chooser in that order. Followed by studio introduction, staggered project gallery, service rows, interactive process, and package entry points.
Projects: filterable gallery with native expandable descriptions.
Packages: seven products, category filters, monthly/full-project preference, contextual contact links, FAQ. Mobile app design and development offers Without AI and With AI radio choices, passed into the enquiry subject.
Header and footer unify public routes. Existing account and recruitment flows are retained.

## Motion
CSS transforms and opacity, ease cubic-bezier(.16,1,.3,1). Section entries: 650ms, 24px rise, starts visibly at 55 percent opacity. Button feedback: 250ms; project image hover: 650ms, scale 1.035. Process changes: 350ms. No scroll hijacking or new WebGL runtime. Reduced-motion preference removes animation and smooth scrolling.

## Brand assets
Original logo remains in src/assets/logo1.webp. Refined transparent raster logo: public/images/looplab-refined.png. This is a proposed visual refinement, not a vector trademark master.
The user rejected the ribbon as an inline logo replacement, then approved it as standalone artwork. Use it once in the hero visual field, with no overlap over copy or controls. Do not use it as the company logo.

## Content rules
Do not invent testimonials, customers, metrics, delivery guarantees, or prices. Concept images are labelled illustrative where they are not interface captures. Existing project status is retained, including the sales incentive platform being in development.

## Maintenance
Update this file for token or component changes. Update docs/IMPLEMENTATION.md for behavior and checks. Update docs/PACKAGES_DISCUSSION.md when commercial decisions are approved.

## Completed page refinement
Services uses a capability selector with relevant work and scope. The Studio explains principles and collaboration. Packages provides category and payment-preference controls without amounts. Careers prioritizes direct CV applications by email while the IMS feed is unavailable. Insights clearly labels planned topics and unpublished content. Contact shares the public typography and surfaces while preserving the existing submission flow.

Services includes all 25 tools from the supplied personal portfolio skills code, plus existing Flutter and MongoDB entries. Local marks are grouped by backend, frontend, AI and ML, data and mobile, and cloud and deployment. AWS reveals EC2, Lambda, S3, and Amplify on hover and supports touch and keyboard toggling. Its hidden panel explicitly uses display:none so grid styles cannot keep it expanded.

Artwork has no clip paths. The hero caption reads "Precision in every cycle." in 12px text at the lower right of the image, inside a translucent rounded pill with a subtle shadow. Legal pages follow the supplied document layout reference: centered legal header, document navigation, a readable main column, and section links. Mobile stacks the navigation above the document.

The footer retains the requested registered mark. Its decorative wordmark does not receive pointer events, so navigation remains clickable.

## Contact, navigation, and recovery
Contact uses a compact split introduction, direct channels, and an enquiry panel with selectable starting topics. Inputs retain visible labels and 16px type. Submission states preserve the draft on failure.
Navigation switches to a custom two-stroke menu icon through 1024px. Route entry uses a 280ms opacity and 8px rise transition. Reduced motion disables this animation. Lazy loading uses a drawn loop and indeterminate purple bar, with no invented percentage.
The custom 404 uses route linework and clear Home and Projects recovery links. The favicon is a simplified loop and orbital mark on a purple rounded square, with SVG, PNG, and ICO versions.
Hero artwork fills a larger, natural-ratio frame. Artwork and caption share the same scroll transform. The caption overlaps the lower-right image area, 12px from the bottom on larger screens and 8px on phones.
Careers has its own generated architectural collaboration illustration. Project screenshots use natural ratios to avoid blank framing space.
