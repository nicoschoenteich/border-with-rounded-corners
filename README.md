# border-with-rounded-corners

Adds a border with rounded corners to all PNG images in a folder. Uses [GraphicsMagick](http://www.graphicsmagick.org/) via the `gm` npm package.

## How it works

For each `.png` in the target folder:

1. Creates a rounded-corner mask matching the image dimensions
2. Applies the mask (clips corners to transparent)
3. Adds a 1px black border
4. Applies a larger rounded-corner mask to clip the border corners too

## Prerequisites

GraphicsMagick must be installed:

```sh
# macOS
brew install graphicsmagick

# Ubuntu/Debian
apt-get install graphicsmagick
```

## Setup

```sh
npm install
```

Create a `.env` file:

```
folderPath=/path/to/your/images/
```

The path must end with a `/`.

## Usage

```sh
node index.js
```

All `.png` files in `folderPath` are modified in place.

## Configuration

Edit `index.js` to adjust:

| Variable | Default | Description |
|---|---|---|
| `borderColor` | `"black"` | Border and mask fill color |
| `borderWidth` | `1` | Border thickness in pixels |
| `borderRadius` | `31` | Corner radius in pixels |
