## 1.0.1 / 2020-11-15
- [HOTFIX] Fixed incorrect value for typings in package.json.

## 1.0.0 / 2020-11-15
- [FEATURE] Made Audio2D a named export.
- [DOCS] Updated usage documentation to account for named export and updated table of contents.
- [MISC] Updated out-of-date dependencies to their latest versions.

## 0.2.2 / 2020-04-17
- [MISC] Updated out-of-date dependencies to their latest versions which also fixed all possible fixed security vulnerabilities.

## 0.2.1/ 2020-04-02
- [MISC] Updated out-of-date dependencies to their latest versions.

## 0.2.0/ 2020-02-19
- [FEATURE] Added ability to seek through an audio clip.
- [DOCS] Updated README with seek method.
- [DOCS] Fixed a bad link in one of the badges.
- [MISC] Updated rollup to latest version.
- [MISC] Swapped out rollup-plugin-commonjs and rollup-plugin-node-resolve for @rollup/plugin-commonjs and @rollup/plugin-node-resolve.
- [MISC] Changed CHANGELOG format.

## 0.1.1 / 2020-02-07
- [MISC] Fixed type in README in the installation section.

## 0.1.0 / 2020-02-07
- [MISC] Removed audioworklet-polyfill and deltaframe dependencies.
- [MISC] Expanded tests.
- [MISC] Published initial version to npm.

## 0.0.8 / 2020-02-06
- [FEATURE] Added a `trigger` option to audio clips that allows you to specify the id or classname of a dom element that when clicked will trigger the clip to play.
- [FEATURE] Added ability to add any node to audio clips through an easy to use API.
- [MISC] Removed `addFilter` method in support of the method defined above.
- [MISC] Added jsdoc examples to audio clip methods.
- [MISC] Updated musk-ox to latest version.

## 0.0.7 / 2020-02-05
- [FEATURE] Added ability to play audio clips on loop.
- [FEATURE] Added filter.

## 0.0.6 / 2020-02-04
- [TEST] Fixed a failing test after adding gain to each audio clip.

## 0.0.5 / 2020-02-02
- [DOCS] Expanded documentation for audio clip methods.

## 0.0.4 / 2020-01-30
- [FEATURE] Made resume work more naturally within the application.
- [FEATURE] Added option to mute and unmute tracks.
- [MISC] Updated rollup to its latest version.

## 0.0.3 / 2020-01-30
- [FEATURE] Added ability to pause, resume, and stop.
- [FEATURE] Added adjustable volume to each audio clip.

## 0.0.2 / 2020-01-29
- [FEATURE] Added the following methods to the base API: `getAudio`, `removeAudio`, `removeAllAudio`.]
- [FEATURE] Added AudioClipState enum to prepare for adding pause/resume functionality next update.
- [DOCS] Added new methods to README.

## 0.0.1 / 2020-01-28
- Initial commit
