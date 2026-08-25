# Price Table Block

> Instantly create a beautiful pricing menu for your eCommerce website.

Price Table Block is a WordPress Gutenberg block that lets you build fully customizable
pricing tables — plans, prices, feature lists, ribbons and call-to-action buttons — from
the block editor, without writing any CSS.

- **Plugin URI:** https://essential-blocks.com
- **WordPress.org:** https://wordpress.org/plugins/price-table-block/
- **Author:** [WPDeveloper](https://wpdeveloper.com)
- **License:** GPL-3.0-or-later

## Features

- **Completely customizable** — content, pricing, feature lists, colors, spacing and typography.
- **Super light-weight** — no extra resources loaded, optimized for fast loading and instant live editing.
- **Native block editor experience** — full inspector controls with responsive (desktop/tablet/mobile) settings.
- **Dedicated support** — via the [plugin support forum](https://wordpress.org/support/plugin/price-table-block).

## Requirements

| | Minimum | Tested up to |
|---|---|---|
| WordPress | 6.0 | 7.0 |
| PHP | 7.4 | 8.5 |

## Installation

**From WordPress admin**

1. Go to *Plugins → Add New* and search for **Pricing Table**.
2. Install and activate.
3. Add the **Pricing Table** block from the block inserter in the editor.

**Manually**

1. Upload the `price-table-block` folder to `/wp-content/plugins/`.
2. Activate the plugin through the *Plugins* menu in WordPress.
3. Follow the [documentation](https://essential-blocks.com/docs/).

## Development

Clone with submodules — `controls/` and `lib/style-handler/` are git submodules and the
plugin does not build (or run) without them:

```bash
git clone --recurse-submodules git@github.com:EssentialBlocks/price-table-block.git
# already cloned?
git submodule update --init --recursive
```

The block is built with [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/).

```bash
npm install
npm run start     # development build with watch
npm run build     # production build into dist/
npm run format:js # format JavaScript
npm run lint:js   # lint JavaScript
npm run lint:css  # lint styles
```

Source lives in `src/`, shared controls in `controls/`, the PHP entry point is
`price-table-block.php`, and compiled assets are written to `dist/`.

### `dist/` is a committed build artifact

`dist/` is committed to the repository. `npm run build` at the repo root emits
`dist/index.js` and `dist/style.css`; the remaining files — `dist/modules.js`,
`dist/frontend.js`, `dist/modules.css`, `dist/style-modules.css` — come from a second
build inside the `controls/` submodule.

The pinned `controls` commit matches the committed `dist/modules.js`. **Do not bump the
`controls` submodule without rebuilding and committing the `dist/` output**, or the
release will ship a stale bundle against newer source.

### Release

`.github/workflows/deploy.yml` deploys to WordPress.org on any pushed tag. It runs on
Node 14 and needs the `EB_PAT`, `SVN_USERNAME` and `SVN_PASSWORD` repository secrets.

## Branches

| Branch | Purpose |
|---|---|
| `master` | Stable, released code. Default branch. |
| `latest` | Staging for the next release. |
| `dev` | Active development. Open pull requests against this branch. |

## Contributing

Issues and pull requests are welcome at
[EssentialBlocks/price-table-block](https://github.com/EssentialBlocks/price-table-block).
Please branch off `dev` and target `dev` with your pull request.

## Contributors

- [wpdevteam](https://profiles.wordpress.org/wpdevteam/) — WPDeveloper
- [re_enter_rupok](https://profiles.wordpress.org/re_enter_rupok/)
- [Asif2BD](https://profiles.wordpress.org/asif2bd/)
- [rahat89](https://profiles.wordpress.org/rahat89/)
- [fencermonir](https://profiles.wordpress.org/fencermonir/)
- [RahatSheikhLeon](https://github.com/RahatSheikhLeon)

## Support & Documentation

- Documentation: https://essential-blocks.com/docs/
- Support forum: https://wordpress.org/support/plugin/price-table-block
- Report an issue: https://github.com/EssentialBlocks/price-table-block/issues

## License

Licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).
