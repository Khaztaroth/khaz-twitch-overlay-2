
# Khaz's updated overlays
Custom overlay and chat implementation for twitch channel khaztaroth315, written in NextJS with typescript




## Usage

#### Chat:
Chat defaults to "khaztaroth315" for the channel. It can be set by adding the header `?channel=CHANNEL_NAME` to the url

#### Overlays:
Overlays are configured through SVGs. Each folder inside `overlay` shows its own overlay. Setting the overlay boxes can be done by modifying the `path` property inside `rectangles.tsx`. To figure out the path I created an SVG, oppened it in a text editor and copied the `path` property from it. I got best results if my image contained a single curves layer. You can use multiple paths, however I didn't test how that would work.

#### Routing and adding more options:
NextJS automatically routes pages based on the folder structure, so adding more overlay options is as simple as adding more folders. Someone more experienced could use headers to select each one or something. However that's outside of what I was trying to accomplish.

#### Hosting:
The build is configured to use static pages instead of NextJS' default multi-segmet pages. This was done to easily host it in Cloufare Pages. If you intend to go that route make sure you follow their guides to host NextJs applications

#### Staring:
To run the code just run `yarn install` to fetch the packages and then run `yarn dev` to run it. View the page by going to `localhost:3000`