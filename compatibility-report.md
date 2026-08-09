# Price Table Block — Compatibility Report

**Plugin:** Price Table Block (`price-table-block`)
**Version:** 1.2.7 → **1.5.0**
**Branch:** `price-table-block-dev` (branched off `latest`)
**Date of audit:** 2026-08-09
**Nothing committed or pushed — all changes left in the working tree.**

---

## 1. Detected original baseline

Header/readme claims were cross-checked against the actual code.

| | Declared before | Real, inferred from code |
|---|---|---|
| PHP | *(not declared at all)* | **5.6** originally written for, but silently raised to **8.0** by a later commit |
| WordPress | `Requires at least: 5.6`, `Tested up to: 6.5` | **5.6** intended; code paths actually assumed **5.8+** |

Code evidence for the PHP floor:

- `includes/font-loader.php:24-27` — `get_instance( ...$args )` / `new static( ...$args )`: **variadics ⇒ PHP 5.6+**.
- `price-table-block.php:44` — `[ ... ]` short array syntax ⇒ PHP 5.4+.
- `price-table-block.php:37` — `throw new Error(...)`: the `Error` class only exists in **PHP 7.0+**. On PHP 5.x this line is itself a fatal (`Class 'Error' not found`).
- `includes/helpers.php:47` — `str_contains()` is a **PHP 8.0** function, introduced by commit `5929cf4` ("compatibility support with wordpress 6.5"). WP core only polyfills it from **WP 5.9**. So the shipped plugin hard-fataled on any PHP 7.x site running WP 5.6–5.8, despite the readme advertising WP 5.6 support.
- No return types, no `??`, no nullable types, no arrow functions, no `match`, no typed properties, no enums ⇒ nothing above 7.0 is required once `str_contains` is removed.

Code evidence for the WP floor:

- `register_block_type` + `block.json` with `"apiVersion": 2` ⇒ **WP 5.6+** (apiVersion 2 landed in 5.6).
- `Price_Table_Helper::get_block_register_path()` passes a **directory** to `register_block_type()` — that signature only exists from **WP 5.8**.
- `includes/helpers.php:69` — `site-editor.php` handling ⇒ WP 5.9-era code.
- `render_block` filter ⇒ WP 5.0+.
- No REST routes, no `$wpdb` queries, no nonce-guarded/state-changing endpoints, no admin forms, no translation calls in PHP ⇒ the usual REST `permission_callback`, `$wpdb->prepare()`, nonce/capability and WP 6.7 early-textdomain classes of issue do not apply here.

**Conclusion:** the plugin's real, intended range is PHP 5.6+ / WP 5.6+, but as shipped it was broken below PHP 8.0 and below WP 5.8.

---

## 2. Target range

Live version check performed **2026-08-09**:

- `https://www.php.net/releases/index.php?json&max=3` → latest stable **PHP 8.5.9**; actively supported branches: 8.2, 8.3, 8.4, 8.5.
- `https://api.wordpress.org/core/version-check/1.7/` → current release **WordPress 7.0.3**.
- [WordPress 7.0 Field Guide](https://make.wordpress.org/core/2026/05/14/wordpress-7-0-field-guide/) — WP Core minimum PHP is now **7.4**; the iframed post editor is only enforced when **every** block on the post is Block API **v3 or higher**, so `apiVersion: 2` blocks stay supported and simply keep the non-iframed editor.
- [PHP 8.5 deprecated features](https://www.php.net/manual/en/migration85.deprecated.php) — new deprecations are backtick shell operator, non-canonical casts `(integer)`/`(boolean)`, `null` as an array offset or `array_key_exists()` key, output inside output handlers, `xml_parser_free()`, `__sleep`/`__wakeup`. Checked: the plugin uses none of these except the `null`-array-offset pattern, which is fixed below. `(float)` is a canonical cast and is unaffected.

**Verified target range: PHP 7.0 → 8.5, WordPress 5.6 → 7.0.**

Per-version checklist walked: PHP 7.0, 7.1, 7.2, 7.3, 7.4, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5 · WP 5.6, 5.7, 5.8, 5.9, 6.0–6.9, 6.10, 7.0.

---

## 3. Issues found

Line numbers refer to the code **before** the fixes (`git diff` shows the after state).

| # | File:line | Issue | Breaks on | Severity |
|---|---|---|---|---|
| 1 | `includes/helpers.php:47` | `str_contains()` — PHP 8.0 function, WP polyfills it only from 5.9 | Fatal on PHP < 8.0 with WP < 5.9 | **Critical** |
| 2 | `price-table-block.php:27` | `require_once .../lib/style-handler/style-handler.php` unguarded; `lib/style-handler` is an **uninitialised git submodule** (empty dir in this checkout) | Fatal on every PHP/WP version whenever the submodule is missing | **Critical** |
| 3 | `includes/helpers.php:49,54,55,87` | `$controls_dependencies = include_once …` — `include_once` returns `bool true` when already loaded; `array_merge(true, …)` is a `TypeError` | Fatal on PHP 8.0+ (silent warnings on 7.x) | **High** |
| 4 | `includes/helpers.php:94` | `(float) get_bloginfo('version') <= 5.6` chooses the block-name vs block-path form; the path form needs WP 5.8. WP 5.7 got the path and failed to register. Float casts are also lossy — `"6.10"` → `6.1` | Block never registers on WP 5.7; version logic wrong on any x.10+ release | **High** |
| 5 | `includes/helpers.php:49` | No `file_exists()` before reading `dist/modules.asset.php` | Warning + downstream fatal when `dist/` is absent | **High** |
| 6 | `price-table-block.php:44,57` | `$script_asset['dependencies']` / `['version']` used without checking the generated asset file returned a well-formed array | `TypeError` on PHP 8 with a stale/partial `index.asset.php` | **Medium** |
| 7 | `price-table-block.php:96,111` | `filemtime()` called with no `file_exists()` guard | `filemtime(): stat failed` warning on PHP 8; version silently becomes `false` | **Medium** |
| 8 | `includes/helpers.php:47` | `$_SERVER['QUERY_STRING']` read raw — no `wp_unslash()` / `sanitize_text_field()` | All versions (hygiene / WPCS) | **Medium** |
| 9 | `includes/font-loader.php:68` | `$googleFontFamily[$attributes[$key]]` — a `null` attribute value becomes a `null` array key | Deprecated in PHP 8.5; empty-key silently in earlier versions | **Medium** |
| 10 | `includes/font-loader.php:94` | `trim( $font )` with a possibly-`null` font name | `Passing null to parameter` deprecation on PHP 8.1+ | **Medium** |
| 11 | `includes/font-loader.php:51` | `$block['blockName']` accessed without `isset()`; `$block['attrs']` not verified as an array | Undefined-key warning on PHP 8 for blocks with no `blockName` | **Medium** |
| 12 | `includes/font-loader.php:82` | `$eb_settings['googleFont']` — array offset used without confirming `get_option()` returned an array | Warning on PHP 7.4+/8 if the option is corrupt | **Low** |
| 13 | `price-table-block.php:1` | No `if ( ! defined( 'ABSPATH' ) ) exit;` guard in the main plugin file | All versions (direct-access hardening) | **Low** |
| 14 | `price-table-block.php:29` | Global function `create_block_pricing_table_block_init()` declared with no `function_exists()` guard | Fatal redeclare if a sibling EB plugin ever ships the same name | **Low** |
| 15 | `includes/helpers.php:53,85` | `PRICE_TABLE_BLOCKS_ADMIN_URL . '/dist/…'` — constant already ends in `/`, producing `…plugins/price-table-block//dist/modules.js` | Cosmetic; some CDNs/security plugins reject the double slash | **Low** |
| 16 | `includes/post-meta.php:11` | `add_filter( 'init', … )` used to register an action callback | Works (aliases), but wrong API | **Low** |
| 17 | `price-table-block.php:31`, `package.json:3` | Version literals contain a leading space: `" 1.2.7"`. Constant is used as an asset `?ver=` value | Cosmetic; produces `?ver=%201.2.7` | **Low** |
| 18 | `includes/helpers.php:41` | `enqueues()` dereferences `PRICE_TABLE_BLOCKS_ADMIN_PATH`/`_URL` without a `defined()` guard | Fatal if the file is loaded outside the normal init order | **Low** |
| 19 | `price-table-block.php:81,88,103` | Three `wp_register_style()` calls omit the `$ver` argument, so WP stamps the **WordPress** version instead of the plugin's | Stale CSS after a plugin update | **Low** |

Checked and found **clean**: no `mysql_*`, `create_function()`, `each()`, `ereg*`, `split()`, `money_format()`, `strftime()`, `utf8_encode/decode`, `FILTER_SANITIZE_STRING`, `${var}` interpolation, curly-brace string offsets, implicit nullable parameters, dynamic property creation, `ArrayAccess`/`Iterator`/`JsonSerializable` implementations needing `#[\ReturnTypeWillChange]`, optional-before-required parameters, `$wpdb` usage, REST routes, unescaped output, or deprecated jQuery/jQuery-Migrate patterns (`assets/js/eb-animation-load.js` is vanilla JS).

---

## 4. Fixes applied

| Issue | Fix |
|---|---|
| 1 | `str_contains($qs, 'gutenberg-edit-site')` → `strpos($qs, 'gutenberg-edit-site') !== false`. Identical semantics, works on PHP 5.x → 8.5. |
| 2 | The `style-handler` require is now wrapped in `file_exists()`. When the submodule is present nothing changes; when it is missing the site stays up instead of white-screening. |
| 3, 5 | `include_once` → `file_exists()` + `include`, result normalised through `is_array()`; `dependencies` and `version` read via `isset()` into `$controls_deps` / `$controls_version`, which the register/enqueue calls now use. |
| 4 | `get_block_register_path()` rewritten to `version_compare( get_bloginfo('version'), '5.8', '>=' )` — path form on WP 5.8+, block name below. **WP 5.6 and 5.8+ behaviour is unchanged; WP 5.7 changes from broken to working.** |
| 6 | `$script_asset` normalised the same way; `$asset_dependencies` / `$asset_version` fall back to an empty array and the plugin version. |
| 7 | Both `filemtime()` calls guarded with `file_exists()`, falling back to `PRICE_TABLE_BLOCKS_VERSION`. |
| 8 | `$_SERVER['QUERY_STRING']` now read through `isset()` + `wp_unslash()` + `sanitize_text_field()` into `$query_string`. |
| 9 | `get_fonts_family()` skips attribute values that are unset, non-string, or empty — those produced no usable font name anyway. Also returns early when `$attributes` is not an array. |
| 10 | `trim( (string) $font )`. |
| 11 | `get_fonts_on_render_block()` verifies `$block` and `$block['attrs']` are arrays and reads `blockName` through `isset()`. |
| 12 | `get_option('eb_settings', [])` result coerced with `is_array()`. |
| 13 | `ABSPATH` guard added to the main plugin file. |
| 14 | Init function wrapped in `if ( ! function_exists( … ) )`. |
| 15 | Removed the duplicated leading slash on the two `dist/` URLs. |
| 16 | `add_filter('init', …)` → `add_action('init', …)`. |
| 17 | Version literals cleaned and bumped to `1.5.0` in the header, `PRICE_TABLE_BLOCKS_VERSION`, `readme.txt` `Stable tag`, and `package.json`. |
| 18 | `enqueues()` returns early unless both plugin constants are defined. |
| 19 | The three `wp_register_style()` calls now pass `PRICE_TABLE_BLOCKS_VERSION`. |

Metadata updated:

- `price-table-block.php` header — `Version: 1.5.0`, added `Requires at least: 6.0` and `Requires PHP: 7.4`.
- `readme.txt` — `Tested up to: 7.0`, added `Requires PHP: 7.4`, `Requires at least: 6.0`, `Stable tag: 1.5.0`, new `= 1.5.0 - 09/08/2026 =` changelog entry.
- `package.json` — `"version": "1.5.0"`.

No feature, UI, block markup, attribute, option name, hook name, or public API was changed.

---

## 5. Flagged — not changed, needs your decision

1. **`eb_wp_version` is still a lossy float** (`includes/helpers.php`). The bundled controls bundle does `n >= 5.8 ? registerBlockType({name, …}) : registerBlockType(name, …)`, so the value has to stay numerically comparable — sending a string would make the comparison `NaN` and take the wrong branch. `(float) "6.10"` is `6.1`, which happens to stay `>= 5.8`, so nothing breaks today, but the encoding is fragile. Proper fix is to send both a raw version string and switch the JS to a real comparison — that requires rebuilding the `controls` submodule, so it is out of scope here.

2. **`throw new Error(...)` when `dist/index.asset.php` is missing** (`price-table-block.php`). This runs on `init` and takes the whole site down rather than just the block. Recommendation: replace with an `admin_notice` + early `return`. Not done because it changes user-visible failure behaviour.

3. **`block.json` is `"apiVersion": 2`.** Confirmed still supported in WP 7.0 — no fatal, no deprecation. The trade-off is that a v2 block on a post disables the iframed editor for that post. Bumping to v3 is a real editor-rendering change (styles must be enqueued into the iframe) and needs QA, so it is left alone.

4. **`dist/` was built with `@wordpress/scripts` ^19.2.2** and lists `react` / `react-dom` as dependencies. WP 7.0 ships React 19 in the editor. Nothing in the audited PHP breaks, but the JS bundle should be rebuilt against current `@wordpress/scripts` and smoke-tested in the WP 7.0 editor before release. Out of scope for a PHP compatibility pass.

5. **Adding `$ver` to three stylesheets** (issue 19) changes the `?ver=` query string on those asset URLs from the WordPress version to `1.5.0`. Behaviour is identical; visitors get one cache-bust on upgrade. Say the word if you want those reverted.

6. ~~**`Requires at least: 5.6` was kept**~~ — **resolved 2026-08-09: the floor was raised to WP 6.0 on request.** One consequence remains open: `Price_Table_Helper::get_block_register_path()` exists solely to hand a block *name* rather than a *directory* to `register_block_type()` on WP 5.6/5.7. At a 6.0 floor its `version_compare( …, '5.8', '>=' )` is always true, so the fallback branch is now dead code. It is harmless and was left in place — say the word to delete the helper and inline `PRICE_TABLE_BLOCKS_ADMIN_PATH` at the call site.

7. ~~**`Requires PHP: 7.0` is the honest code floor**~~ — **resolved 2026-08-09: raised to PHP 7.4 on request**, matching WP Core's own minimum. Note the code still avoids `str_contains()` in favour of `strpos()`: `str_contains()` is PHP **8.0**, so it stays off-limits at a 7.4 floor. Do not "modernise" that line back.

---

## 6. Old-vs-new conflicts

None that could not be reconciled. The one genuine tension — PHP 8's `str_contains()` versus PHP 7.x support — was resolved with `strpos()`, which is correct on the entire range with no trade-off. The WP 5.7 registration gap was closed by moving the boundary to the version where the API actually changed (5.8) rather than the version the old code guessed (5.6).

---

## 7. Declared compatibility after this pass

```
Requires at least: 6.0
Tested up to:      7.0
Requires PHP:      7.4
Stable tag:        1.5.0
```

---

## 7b. Functional investigation — "background colour not showing on frontend" (2026-08-09)

### Root cause: the style pipeline had no server-side half

The block does **not** emit its own `<style>` tag in `save.js`; the saved markup carries
only `blockId` classes. The real chain is:

1. `edit.js` renders `<Style {...props} />` → `StyleComponent` (from the `controls`
   submodule) generates the CSS and stores it in the block's **`blockMeta` attribute**.
2. On `save_post` — and on frontend load via the `wp` hook — `lib/style-handler`
   parses the post content, collects every block's `blockMeta`, and writes
   `wp-content/uploads/eb-style/eb-style-<post-id>.min.css`.
3. `enqueue_frontend_assets()` enqueues that file on `wp_enqueue_scripts`.

`lib/style-handler` is a **git submodule and was never initialised** in this checkout,
so step 2 never existed. No CSS file was written and none was enqueued. This is why
*every* styling control — background, typography, padding, border, ribbon — had no
frontend effect, not just background colour. Step 1 still ran, which is why the editor
preview looked correct: the two halves fail independently.

Fixed with `git submodule update --init --recursive`. Note style-handler is
block-name agnostic (it keys off `blockMeta`, not the block name), so the
`price-table-block/` vs `essential-blocks/` namespace difference is not a factor.

### Bug found and fixed: responsive styles dead in the editor preview

`StyleComponent` builds the editor's media queries from
`EssentialBlocksLocalize.responsiveBreakpoints.tablet` / `.mobile`, but
`includes/helpers.php` localised only `eb_wp_version`, `rest_rootURL` and
`fontAwesome`. Verified in the **shipped** `dist/modules.js`, not just source:

```
"@media all and (max-width: ".concat(…EssentialBlocksLocalize.responsiveBreakpoints…?.tablet,"px) {
```

With the key absent this emitted `@media all and (max-width: undefinedpx)`, an invalid
query, so every tablet and mobile rule was discarded **in the editor preview**. The
frontend was unaffected because the style handler builds those media queries in PHP.

Fix: added `Price_Table_Helper::get_responsive_breakpoints()`, which mirrors
`EbStyleHandlerParseCss::get_responsive_breakpoints()` — same `eb_settings`
option, same 1024/767 defaults, same JSON-string handling — and localised it.
It is deliberately read-only, unlike the style handler, which writes the option back.

All five sibling plugins (`button-group`, `number-counter`, `image-gallery-block`,
`infobox`, `flipbox`) have the identical omission and need the same fix.

### Observations, not fixed

- `dist/frontend.js` (icon helpers, `window.eb_frontend`) is built but **never
  registered or enqueued** by any PHP. `save.js` bakes icons into static markup, so
  nothing needs it. Dead build output.
- The Google Fonts URL ends with a trailing `|` separator. Google ignores it; cosmetic.
- `EssentialBlocksLocalize` is a single global shared by every EB-family plugin, so the
  last-enqueued plugin's payload wins. The bundle also reads `all_blocks`, which this
  plugin does not localise; it is unreachable here because the guard is
  `/^essential-blocks\//` and this block is `price-table-block/pricing-table`.
  Deliberately **not** added — supplying an empty `all_blocks` could clobber real data
  from the main Essential Blocks plugin and break its block-visibility filtering.

## 8. Verification performed

- `php -l` on every PHP file in the plugin (excluding `node_modules`) — **7/7 clean**, including the generated `dist/*.asset.php` files.
- **Runtime smoke harness** (WordPress functions stubbed, `error_reporting(E_ALL)`, PHP **8.5.8**) executing `create_block_pricing_table_block_init()`, `Price_Table_Helper::enqueues()` on both the `post.php` and the `themes.php?page=gutenberg-edit-site` branches, and `Price_Table_Font_Loader` fed deliberately hostile attributes (`null`, integer, missing `blockName`, `null` `attrs`). Run against WP versions **5.6, 5.7, 5.8, 6.5, 6.10, 7.0.3**.
  - **Zero warnings, zero notices, zero deprecations** on every combination.
  - Registration path verified: block **name** on 5.6/5.7, block **directory** on 5.8+.
  - The empty `lib/style-handler` submodule in this checkout no longer fatals — proof that the `file_exists()` guard works.
- PHP 7.0–8.4 could not be executed (only PHP 8.5.8 is installed locally); compatibility on those versions is established by static inspection — no syntax or function above the PHP 7.0 baseline remains in the codebase.
- `phpcs` is **not installed** on this machine (`phpcs -i` unavailable), so the WordPress Coding Standards sweep was skipped rather than installed without asking.
