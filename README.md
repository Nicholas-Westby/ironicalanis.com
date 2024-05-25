# Website / Overview

https://ironicalanis.com/

This repo is the code for the above website.

It projects the "Ironic" Alanis Morissette music video onto a sphere, and has clickable 3D models that move across the sphere in sync with the song lyrics. Clicking them shows details about the corresponding lyrics. There is also a moving star field behind the sphere that brightens near the mouse pointer.

![IronicAlanis.com Video Capture](/supporting/ironicalanis.mp4?raw=true)

I have open sourced this so others interested in Three.js can learn from what I've done here.

Here are some things I used to build this:

* Three.js for the 3D rendering.
* Blender to create 3D models.
* Affinity Photo/Designer for image creation/editing.
* WebStorm for coding.

# Build

Run `npm run dev` and click the link that appears in the terminal.

# File Structure

* `src` - most of the code. The `main.ts` file is the entry point.
* `assets` - images and such. Includes the design files. I also put the shaders here since I load them like other assets.

# Architecture / Build

This is a simple static site that is automatically deployed from this repo with Cloudflare Pages.

The code is largely TypeScript, with a bit of HTML and CSS.

Vite is used for bundling, and the `build` folder contains a custom build step.

If you want to navigate the 3D space a bit with Orbit Controls, see the comment in `/src/orbit.ts`.

# Author

Learn more about me here: https://www.linkedin.com/in/csharply/
