# Change Log

## [1.0.1]

- Fixed duplicate renaming from Module -> Emmet i.e `<div className={`${module.foo} foo`}></div>` will not be transformed into `<div class="foo"></div>` instead of `<div class="foo foo"></div>`

## [1.0.0]

### Added

- Conversion back to emmet classes (i.e. from jsx/tsx -> html)
- Simple tests for code validation

### Fixed

- Now the extensin could handle refactoring of more than 1 class pointer in one class at the time

## [0.0.1]

- Initial release

