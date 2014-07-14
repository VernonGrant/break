# [break;](https://atom.io/packages/break)

[![Gitter chat](https://badges.gitter.im/Frozenfire92/break.png)](https://gitter.im/Frozenfire92/break)

> An [Atom](https://atom.io/) package to remind you to [get up](https://www.youtube.com/watch?v=X2W3aG8uizA), move around, and take a break. Inspired by [Workrave](http://www.workrave.org/), [countless articles](https://www.google.ca/#q=sitting+harmful), and my sore hips.

![break screenshot](https://github.com/Frozenfire92/break/raw/master/screenshot.png)

-----


## Install

Command Line
```bash
apm install break
```

Or through atom
```
Command Palette ➔ Settings View: Install Packages ➔ Break
```


## Features

- [x] Customizable micro and macro break schedule. Micro are shorter breaks that occur more often. Macro are longer that occur less.
- [x] Full screen break message that prevents you from further coding
- [ ] [Warns you before a break so that you can save and prepare](https://github.com/Frozenfire92/break/issues/1)
- [x] Displays the current micro break count and time to next break in status bar. ![Status Bar Screenshot](https://github.com/Frozenfire92/break/raw/master/screenshot1.png)


## Package Settings

- `Macro Break Interval In Micro Amount`:
    The amount of micro breaks to occur before a macro break is next.
    Default is 8 (macro break occurs on 9th break)
- `Macro Break Length In Seconds`
    Duration of the macro break.
    Default is 5 minutes
- `Micro Break Interval In Seconds`:
    Period between micro breaks.
    Default is 5 minutes
- `Micro Break Length In Seconds`:
    Duration of the micro break.
    Default is 15 seconds
