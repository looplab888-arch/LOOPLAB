# README device mockups

The README embeds only framed device mockups, not the standalone capture.

- Source: `raw/home.png`, copied unchanged from the homepage image supplied by the user.
- Outputs: `looplab-laptop.png`, `looplab-desktop.png`, `looplab-iPhone-17-Pro-Max.png`, and `looplab-iPhone-Duo-fold.png`.
- Renderer: [tools/make-mockups.js](../../tools/make-mockups.js).

Run from the repository root:

```bash
node tools/make-mockups.js
```

Or provide a different input and destination:

```bash
node tools/make-mockups.js path/to/capture.png docs/mockups
```

The LoopLab adaptation reuses PNG decoding, encoding and rounded rectangle coverage from the supplied AllInOrder mobile mockup script. It adds laptop and desktop monitor frames, a lavender backdrop and proportional screen areas. The original AllInOrder file is unchanged.

Supported input is an 8-bit, non-interlaced PNG in grayscale, RGB, grayscale-alpha or RGBA form. Indexed PNG, JPEG and other formats are not supported by this smaller adaptation. It requires only Node's built-in modules.

The complete screenshot is copied into each frame at native resolution. Device proportions follow the source image to avoid stretching or cropping. These are presentation frames, not exact hardware replicas or independent responsive captures. Output files are overwritten when regenerated.
